# Rick C-137 — Dataset Recording + Piper Training

## Quick path

```bash
# 1. Record (8–10 min script)
chmod +x scripts/record-dataset.sh scripts/train-piper-rick.sh
./scripts/record-dataset.sh

# 2. Review / fix transcripts in audio/rick_c137_dataset/metadata.csv

# 3. Full train + export
./scripts/train-piper-rick.sh
```

## Dataset layout (LJSpeech-compatible)

```
audio/rick_c137_dataset/
├── raw_clips/          # original long takes
├── wavs/               # 22.05 kHz mono 16-bit utterance clips
└── metadata.csv        # id|transcript
```

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/record-dataset.sh` | Record → normalize → split → Whisper → metadata |
| `scripts/split-on-pauses.py` | Silence-based segmentation |
| `scripts/generate-metadata.py` | Build / refresh metadata.csv |
| `scripts/train-piper-rick.sh` | Preprocess → train → export ONNX |

## Training knobs (env)

```bash
MAX_EPOCHS=2000
BATCH_SIZE=32
QUALITY=medium          # x-low | medium | high
DATASET_DIR=...
CHECKPOINT_DIR=...
```

## After export

```bash
# Point the TTS pipeline at the new model
export RICK_TTS_MODEL=models/tts/en_US-rick-c137-medium.onnx
python voice/tts_pipeline.py "Morty, we gotta go!" -o /tmp/rick.wav
```

## YMusic extraction (optional source material)

```bash
cd ymusic-sandbox
npm install
npm run server          # :8799
# separate terminal
npm run dev             # :5173
```

Paste a YouTube URL → real 320 kbps MP3. Useful for reference audio or extra training material (still needs transcription + alignment).

## DroidBridge Nexus triggers

`sovereign-oracle/backend/src/droidbridge-notifier.ts` watches Nexus EM fields and fires phone notifications:

| Condition | Notification |
|-----------|--------------|
| EM-005 (Ricci) > 0.051 | ⚠️ TEMPORAL FLUX HIGH |
| EM-007 (bandgap) < 0.3 | 🔵 PHOTONIC SUPPRESSION |
| EM-001 (decoherence) > 0.055 | 🟡 QUANTUM DECOHERENCE |

Requires `DROIDBRIDGE_TOKEN` in `.env` and port-forward `8765`.
