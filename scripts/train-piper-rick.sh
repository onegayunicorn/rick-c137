#!/usr/bin/env bash
# RICK C-137 — FULL PIPER VOICE TRAINING LAUNCH SCRIPT
# =====================================================
# End-to-end: preprocess → train → export ONNX → optional burp test
#
# Prerequisites:
#   - Dataset ready at audio/rick_c137_dataset/ (wavs/ + metadata.csv)
#   - Python 3.10+, CUDA recommended (or CPU for small runs)
#   - piper-train / piper installed  (pip install piper-train piper-tts)
#   - espeak-ng
#
# Usage:
#   bash scripts/train-piper-rick.sh              # full pipeline
#   bash scripts/train-piper-rick.sh --preprocess-only
#   bash scripts/train-piper-rick.sh --export-only
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

# ---------- config ----------
DATASET_DIR="${DATASET_DIR:-$ROOT/audio/rick_c137_dataset}"
CACHE_DIR="${CACHE_DIR:-$ROOT/training_cache/rick_c137}"
CHECKPOINT_DIR="${CHECKPOINT_DIR:-$ROOT/checkpoints/rick_c137}"
EXPORT_DIR="${EXPORT_DIR:-$ROOT/models/tts}"
VOICE_NAME="${VOICE_NAME:-en_US-rick-c137-medium}"
SAMPLE_RATE=22050
MAX_EPOCHS="${MAX_EPOCHS:-2000}"
BATCH_SIZE="${BATCH_SIZE:-32}"
QUALITY="${QUALITY:-medium}"   # x-low | medium | high

PREPROCESS_ONLY=0
EXPORT_ONLY=0
for arg in "$@"; do
  case "$arg" in
    --preprocess-only) PREPROCESS_ONLY=1 ;;
    --export-only)     EXPORT_ONLY=1 ;;
  esac
done

echo "⚛️  RICK C-137 PIPER TRAINING LAUNCH"
echo "===================================="
echo "Dataset:     $DATASET_DIR"
echo "Cache:       $CACHE_DIR"
echo "Checkpoints: $CHECKPOINT_DIR"
echo "Export:      $EXPORT_DIR/$VOICE_NAME"
echo ""

# ---------- dependency checks ----------
check() { command -v "$1" &>/dev/null || { echo "❌ Missing: $1"; exit 1; }; }
check python3
check espeak-ng || check espeak

python3 -c "import piper_train" 2>/dev/null || {
  echo "❌ piper-train not installed"
  echo "   pip install 'piper-train'  (or follow https://github.com/rhasspy/piper)"
  exit 1
}

# ---------- layout ----------
mkdir -p "$CACHE_DIR" "$CHECKPOINT_DIR" "$EXPORT_DIR"
META="$DATASET_DIR/metadata.csv"
WAVS="$DATASET_DIR/wavs"

if [[ ! -f "$META" ]]; then
  echo "❌ Missing $META — run scripts/record-dataset.sh first"
  exit 1
fi
CLIP_COUNT=$(ls -1 "$WAVS"/*.wav 2>/dev/null | wc -l)
echo "📂 Found $CLIP_COUNT clips"
if [[ "$CLIP_COUNT" -lt 20 ]]; then
  echo "⚠️  Very small dataset (<20 clips). Expect limited quality."
fi

# ---------- 1. Preprocess ----------
if [[ $EXPORT_ONLY -eq 0 ]]; then
  echo ""
  echo "🔄 Step 1/3 — Preprocess (espeak + cache)"
  python3 -m piper_train.preprocess \
    --language en-us \
    --input-dir "$DATASET_DIR" \
    --output-dir "$CACHE_DIR" \
    --dataset-format ljspeech \
    --single-speaker \
    --sample-rate "$SAMPLE_RATE" \
    --max-workers 4

  echo "✅ Preprocess complete → $CACHE_DIR"
fi

if [[ $PREPROCESS_ONLY -eq 1 ]]; then
  echo "Stopping after preprocess (--preprocess-only)"
  exit 0
fi

# ---------- 2. Train ----------
if [[ $EXPORT_ONLY -eq 0 ]]; then
  echo ""
  echo "🔥 Step 2/3 — Train ($QUALITY, max $MAX_EPOCHS epochs)"
  # Resume from last checkpoint if present
  RESUME_ARGS=()
  LATEST=$(ls -1t "$CHECKPOINT_DIR"/*.ckpt 2>/dev/null | head -1 || true)
  if [[ -n "$LATEST" ]]; then
    echo "   Resuming from $LATEST"
    RESUME_ARGS=(--resume_from_checkpoint "$LATEST")
  fi

  python3 -m piper_train \
    --dataset-dir "$CACHE_DIR" \
    --accelerator auto \
    --devices 1 \
    --batch-size "$BATCH_SIZE" \
    --checkpoints-dir "$CHECKPOINT_DIR" \
    --quality "$QUALITY" \
    --max_epochs "$MAX_EPOCHS" \
    --checkpoint-epochs 50 \
    "${RESUME_ARGS[@]}"

  echo "✅ Training finished (or interrupted) — checkpoints in $CHECKPOINT_DIR"
fi

# ---------- 3. Export ONNX ----------
echo ""
echo "📦 Step 3/3 — Export ONNX"
LATEST_CKPT=$(ls -1t "$CHECKPOINT_DIR"/*.ckpt 2>/dev/null | head -1 || true)
if [[ -z "$LATEST_CKPT" ]]; then
  echo "❌ No checkpoint found in $CHECKPOINT_DIR"
  exit 1
fi

python3 -m piper_train.export_onnx \
  "$LATEST_CKPT" \
  "$EXPORT_DIR/${VOICE_NAME}.onnx"

# Config JSON is usually written alongside; ensure it exists
if [[ ! -f "$EXPORT_DIR/${VOICE_NAME}.onnx.json" ]]; then
  echo "⚠️  No .onnx.json found — generating minimal config"
  cat > "$EXPORT_DIR/${VOICE_NAME}.onnx.json" <<EOF
{
  "audio": { "sample_rate": $SAMPLE_RATE },
  "espeak": { "voice": "en-us" },
  "inference": { "noise_scale": 0.667, "length_scale": 1.0, "noise_w": 0.8 },
  "num_speakers": 1
}
EOF
fi

echo "✅ Exported:"
echo "   $EXPORT_DIR/${VOICE_NAME}.onnx"
echo "   $EXPORT_DIR/${VOICE_NAME}.onnx.json"

# ---------- 4. Quick smoke test (optional) ----------
if command -v piper &>/dev/null; then
  echo ""
  echo "🧪 Smoke test synthesis…"
  TEST_WAV="$EXPORT_DIR/test_rick.wav"
  echo "Wubba lubba dub dub. Morty, we gotta go — now!" | \
    piper --model "$EXPORT_DIR/${VOICE_NAME}.onnx" \
          --config "$EXPORT_DIR/${VOICE_NAME}.onnx.json" \
          --output_file "$TEST_WAV" || true
  if [[ -f "$TEST_WAV" ]]; then
    echo "   Wrote $TEST_WAV"
    if [[ -f "$ROOT/voice/burp_injector.py" ]]; then
      python3 "$ROOT/voice/burp_injector.py" \
        -i "$TEST_WAV" -o "$EXPORT_DIR/test_rick_burped.wav" --burp-prob 0.1 || true
      echo "   Burped version: $EXPORT_DIR/test_rick_burped.wav"
    fi
  fi
fi

echo ""
echo "🎉 DONE — Rick voice ready"
echo "   Point tts_pipeline.py at:"
echo "     models/tts/${VOICE_NAME}.onnx"
echo "     models/tts/${VOICE_NAME}.onnx.json"
echo ""
echo "   Or in entity config:"
echo "     RICK_TTS_MODEL=$EXPORT_DIR/${VOICE_NAME}.onnx"
echo ""
