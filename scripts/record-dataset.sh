#!/usr/bin/env bash
# RICK C-137 — DATASET RECORDING WORKFLOW
# Captures → normalizes → segments → indexes → preps for Piper training
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DATASET_ROOT="${DATASET_ROOT:-$ROOT/audio/rick_c137_dataset}"
RAW_DIR="$DATASET_ROOT/raw_clips"
WAV_DIR="$DATASET_ROOT/wavs"
META_FILE="$DATASET_ROOT/metadata.csv"
SCRIPT_FILE="${SCRIPT_FILE:-$ROOT/voice-capture-script.txt}"

mkdir -p "$RAW_DIR" "$WAV_DIR"

echo "🎙️  RICK C-137 DATASET RECORDING WORKFLOW"
echo "=========================================="
echo "Source script: $SCRIPT_FILE"
echo "Output dir:    $WAV_DIR"
echo ""

# Step 1 — Check dependencies
check_dep() { command -v "$1" &>/dev/null || { echo "❌ Missing: $1"; exit 1; }; }
check_dep ffmpeg
check_dep sox
# whisper is optional but recommended
if ! command -v whisper &>/dev/null; then
  echo "⚠️  whisper not found — transcription step will be skipped (install openai-whisper)"
fi

# Step 2 — List existing
echo "📂 Existing clips in $WAV_DIR:"
ls -1 "$WAV_DIR"/*.wav 2>/dev/null | wc -l | xargs echo "   Found:"

# Step 3 — Record new session
echo ""
echo "📋 Ready to record? Open '$SCRIPT_FILE' and read along."
echo "   Press Enter to start recording (Ctrl+C when done)..."
read -r

SESSION_FILE="$RAW_DIR/session_$(date +%Y%m%d_%H%M%S).wav"
echo "🎤 Recording to: $SESSION_FILE"
echo "   (max 10 min — Ctrl+C to stop early)"

# Prefer PulseAudio / default; fall back to ALSA
if command -v arecord &>/dev/null && [[ -n "${ALSA_DEVICE:-}" ]]; then
  ffmpeg -f alsa -i "${ALSA_DEVICE:-default}" -t 600 -ar 44100 -ac 1 "$SESSION_FILE" || true
else
  ffmpeg -f pulse -i default -t 600 -ar 44100 -ac 1 "$SESSION_FILE" 2>/dev/null \
    || ffmpeg -f alsa -i default -t 600 -ar 44100 -ac 1 "$SESSION_FILE" || true
fi

if [[ ! -f "$SESSION_FILE" ]]; then
  echo "❌ Recording failed — no file written"
  exit 1
fi
echo "✅ Saved: $SESSION_FILE"

# Step 4 — Normalize & convert to Piper format (22.05 kHz mono 16-bit)
echo "🔄 Normalizing to 22050 Hz mono…"
BASE=$(basename "$SESSION_FILE" .wav)
sox "$SESSION_FILE" -r 22050 -c 1 -b 16 "$WAV_DIR/${BASE}_norm.wav" norm -0.3

# Step 5 — Split on pauses (>0.7 s silence = new clip)
echo "✂️  Splitting on pauses…"
python3 "$SCRIPT_DIR/split-on-pauses.py" "$WAV_DIR/${BASE}_norm.wav" --out-dir "$WAV_DIR"

# Step 6 — Transcribe with Whisper (if available)
if command -v whisper &>/dev/null; then
  echo "📝 Transcribing with Whisper…"
  whisper "$WAV_DIR/${BASE}_norm.wav" \
    --model small --language en \
    --output_format txt \
    --output_dir "$WAV_DIR" || true
else
  echo "⚠️  Skipping Whisper — run generate-metadata.py with manual transcripts later"
fi

# Step 7 — Build / update metadata.csv
echo "📋 Updating metadata index…"
python3 "$SCRIPT_DIR/generate-metadata.py" --dir "$WAV_DIR" --out "$META_FILE"

# Step 8 — Summary
CLIP_COUNT=$(ls -1 "$WAV_DIR"/*.wav 2>/dev/null | wc -l)
echo ""
echo "✅ SESSION COMPLETE"
echo "   Total clips: $CLIP_COUNT"
echo "   Metadata:    $META_FILE"
echo ""
echo "Next steps:"
echo "  1. Review / edit $META_FILE (LJSpeech format: filename|transcript)"
echo "  2. Run training launch:"
echo "       bash scripts/train-piper-rick.sh"
echo ""
