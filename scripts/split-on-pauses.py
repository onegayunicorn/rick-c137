#!/usr/bin/env python3
"""
Smart silence-based segmentation for Rick C-137 dataset.
Splits a long WAV on pauses > min_silence so each clip is utterance-length.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path

import numpy as np

try:
    import librosa
    import soundfile as sf
except ImportError:
    raise SystemExit("Install: pip install librosa soundfile")


def detect_silence(
    audio: np.ndarray,
    sr: int,
    min_silence: float = 0.7,
    threshold_db: float = -35.0,
) -> list[float]:
    """Return mid-points of silence regions longer than min_silence (seconds)."""
    frame_length = int(sr * 0.025)
    hop_length = int(sr * 0.01)
    rms = librosa.feature.rms(y=audio, frame_length=frame_length, hop_length=hop_length)[0]
    db = 20 * np.log10(np.maximum(rms, 1e-10))

    is_silence = db < threshold_db
    # transitions in sample index space
    diffs = np.diff(is_silence.astype(int))
    starts = np.where(diffs == 1)[0]   # silence begins
    ends = np.where(diffs == -1)[0]    # silence ends

    splits: list[float] = []
    for s, e in zip(starts, ends):
        duration = (e - s) * hop_length / sr
        if duration >= min_silence:
            mid = ((s + e) / 2) * hop_length / sr
            splits.append(mid)
    return splits


def main() -> None:
    p = argparse.ArgumentParser(description="Split WAV on long pauses")
    p.add_argument("input", help="Input WAV file")
    p.add_argument("--out-dir", default="wavs")
    p.add_argument("--min-clip", type=float, default=1.5, help="Minimum clip length (s)")
    p.add_argument("--min-silence", type=float, default=0.7)
    p.add_argument("--threshold-db", type=float, default=-35.0)
    args = p.parse_args()

    audio, sr = librosa.load(args.input, sr=22050, mono=True)
    splits = detect_silence(audio, sr, min_silence=args.min_silence, threshold_db=args.threshold_db)
    boundaries = [0.0] + splits + [len(audio) / sr]

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    base = Path(args.input).stem

    count = 0
    for idx, (t0, t1) in enumerate(zip(boundaries, boundaries[1:])):
        if t1 - t0 < args.min_clip:
            continue
        start_samp = int(t0 * sr)
        end_samp = int(t1 * sr)
        out_path = out_dir / f"{base}_clip{idx:03d}.wav"
        sf.write(str(out_path), audio[start_samp:end_samp], sr)
        print(f"  → {out_path}  ({t1 - t0:.1f}s)")
        count += 1

    print(f"Wrote {count} clips to {out_dir}")


if __name__ == "__main__":
    main()
