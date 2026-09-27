#!/usr/bin/env python3
"""
Build / update LJSpeech-style metadata.csv for Piper training.

Format (pipe-separated):
  filename|transcript
  filename|normalized_transcript   (optional second line style)

Looks for matching .txt files next to each .wav (from Whisper) or
leaves a placeholder so you can fill transcripts manually.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--dir", required=True, help="Directory containing wavs/ and optional .txt")
    p.add_argument("--out", required=True, help="Output metadata.csv path")
    args = p.parse_args()

    wav_dir = Path(args.dir)
    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    rows: list[tuple[str, str]] = []
    for wav in sorted(wav_dir.glob("*.wav")):
        # Prefer Whisper .txt with same stem
        txt = wav.with_suffix(".txt")
        if txt.exists():
            transcript = txt.read_text(encoding="utf-8").strip().replace("\n", " ")
        else:
            # Placeholder — edit later
            transcript = f"[TODO: transcribe {wav.name}]"
        # LJSpeech convention: relative path without extension as id
        uid = wav.stem
        rows.append((uid, transcript))

    with out_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter="|", quoting=csv.QUOTE_MINIMAL)
        for uid, text in rows:
            # Piper expects: id|text   (and sometimes id|text|normalized)
            writer.writerow([uid, text])

    print(f"Wrote {len(rows)} entries → {out_path}")


if __name__ == "__main__":
    main()
