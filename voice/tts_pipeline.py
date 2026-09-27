#!/usr/bin/env python3
"""
Rick C-137 TTS Pipeline (Piper + Burp + Prosody)
================================================
High-level wrapper used by the entity core:

  text → Piper → burp_injector → optional prosody shaping → WAV / stream

Example:
  python tts_pipeline.py "Morty, we gotta go — now!" -o out.wav
"""

from __future__ import annotations

import argparse
import subprocess
import tempfile
from pathlib import Path

from burp_injector import inject_burps, load_burp_library, load_wav, save_wav, SAMPLE_RATE

# Default model paths (adjust to your deployment)
DEFAULT_MODEL = Path("models/tts/en_US-rick-c137-medium.onnx")
DEFAULT_CONFIG = Path("models/tts/en_US-rick-c137-medium.onnx.json")


def run_piper(text: str, model: Path, config: Path, out_wav: Path) -> None:
    """Call the piper CLI (or python -m piper)."""
    cmd = [
        "piper",
        "--model", str(model),
        "--config", str(config),
        "--output_file", str(out_wav),
        "--",
        text,
    ]
    # Fallback to python module form if binary not in PATH
    try:
        subprocess.run(cmd, check=True, capture_output=True)
    except FileNotFoundError:
        cmd = [
            "python3", "-m", "piper",
            "--model", str(model),
            "--config", str(config),
            "--output_file", str(out_wav),
            "--",
            text,
        ]
        subprocess.run(cmd, check=True, capture_output=True)


def synthesize(
    text: str,
    model: Path = DEFAULT_MODEL,
    config: Path = DEFAULT_CONFIG,
    burp_prob: float = 0.08,
    seed: int | None = None,
) -> bytes:
    """Return raw 16-bit mono WAV bytes ready for playback / streaming."""
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        raw = tmp / "raw.wav"
        final = tmp / "final.wav"

        run_piper(text, model, config, raw)
        speech, sr = load_wav(raw)
        burps = load_burp_library(Path(__file__).parent / "burp_samples")
        result = inject_burps(speech, burps, sr=sr, burp_prob=burp_prob, seed=seed)
        save_wav(final, result, sr=sr)
        return final.read_bytes()


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("text")
    p.add_argument("-o", "--output", type=Path, required=True)
    p.add_argument("--model", type=Path, default=DEFAULT_MODEL)
    p.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    p.add_argument("--burp-prob", type=float, default=0.08)
    p.add_argument("--seed", type=int, default=None)
    args = p.parse_args()

    data = synthesize(args.text, args.model, args.config, args.burp_prob, args.seed)
    args.output.write_bytes(data)
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
