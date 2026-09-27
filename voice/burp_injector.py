#!/usr/bin/env python3
"""
Rick C-137 Piper Burp Injection Post-Processor
================================================
Injects probabilistic mid-sentence / mid-word burps into Piper TTS output
to match the canonical speech signature (every 12–18 words, vocal-fry grit).

Usage:
  python burp_injector.py --input speech.wav --output rick_speech.wav
  python burp_injector.py --input speech.wav --output rick_speech.wav --burp-prob 0.12 --seed 42

Requires: numpy, soundfile (or scipy.io.wavfile), pydub (optional for easier mixing)
"""

from __future__ import annotations

import argparse
import random
import struct
import wave
from pathlib import Path
from typing import List, Tuple

try:
    import numpy as np
except ImportError:
    raise SystemExit("numpy is required: pip install numpy")

# ---------------------------------------------------------------------------
# Configuration defaults matching the blueprint voice profile
# ---------------------------------------------------------------------------
DEFAULT_BURP_PROB = 0.08          # ~1 burp per 12–18 words (tuned empirically)
DEFAULT_BURP_DIR = Path(__file__).parent / "burp_samples"
SAMPLE_RATE = 22050
MAX_BURP_GAIN = 0.85              # avoid clipping when overlaying


def load_wav(path: Path) -> Tuple[np.ndarray, int]:
    """Load mono 16-bit WAV → float32 [-1, 1] + sample rate."""
    with wave.open(str(path), "rb") as wf:
        nch, sw, sr, nframes, _, _ = wf.getparams()
        raw = wf.readframes(nframes)
    if sw != 2:
        raise ValueError(f"Only 16-bit PCM supported (got {sw*8}-bit)")
    samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    if nch > 1:
        samples = samples.reshape(-1, nch).mean(axis=1)
    return samples, sr


def save_wav(path: Path, samples: np.ndarray, sr: int = SAMPLE_RATE) -> None:
    """Write float32 [-1,1] mono → 16-bit PCM WAV."""
    clipped = np.clip(samples, -1.0, 1.0)
    pcm = (clipped * 32767.0).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


def load_burp_library(burp_dir: Path) -> List[np.ndarray]:
    """Load all short .wav burp samples from directory (resampled to 22050 if needed)."""
    burps = []
    if not burp_dir.exists():
        print(f"[warn] No burp samples found at {burp_dir} — generating synthetic ones")
        # Generate a few synthetic short burps (noise burst + formant-ish)
        for i in range(4):
            dur = random.uniform(0.08, 0.22)
            t = np.linspace(0, dur, int(SAMPLE_RATE * dur), endpoint=False)
            noise = np.random.randn(len(t)) * 0.4
            # simple low-pass envelope
            env = np.exp(-t * random.uniform(8, 18))
            tone = 0.3 * np.sin(2 * np.pi * random.uniform(80, 140) * t)
            burp = (noise + tone) * env
            burps.append(burp.astype(np.float32))
        return burps

    for p in sorted(burp_dir.glob("*.wav")):
        data, sr = load_wav(p)
        if sr != SAMPLE_RATE:
            # crude linear resample
            ratio = SAMPLE_RATE / sr
            new_len = int(len(data) * ratio)
            data = np.interp(
                np.linspace(0, len(data) - 1, new_len),
                np.arange(len(data)),
                data,
            ).astype(np.float32)
        # normalize peak
        peak = np.max(np.abs(data)) or 1.0
        data = data / peak * 0.9
        burps.append(data)
    return burps


def estimate_word_boundaries(samples: np.ndarray, sr: int = SAMPLE_RATE) -> List[int]:
    """
    Crude energy-based word-boundary detector.
    Returns sample indices that roughly correspond to word starts.
    Good enough for probabilistic injection; not a full ASR aligner.
    """
    frame = int(0.025 * sr)          # 25 ms
    hop = int(0.010 * sr)            # 10 ms
    energy = []
    for i in range(0, len(samples) - frame, hop):
        chunk = samples[i : i + frame]
        energy.append(np.sqrt(np.mean(chunk ** 2)))
    energy = np.array(energy)

    # adaptive threshold
    thr = np.percentile(energy, 30) * 1.8
    voiced = energy > thr

    boundaries = [0]
    in_silence = True
    for i, v in enumerate(voiced):
        if v and in_silence:
            boundaries.append(i * hop)
            in_silence = False
        elif not v:
            in_silence = True
    return boundaries


def inject_burps(
    speech: np.ndarray,
    burps: List[np.ndarray],
    sr: int = SAMPLE_RATE,
    burp_prob: float = DEFAULT_BURP_PROB,
    seed: int | None = None,
) -> np.ndarray:
    """
    Walk estimated word boundaries and with probability `burp_prob`
    overlay a random burp sample (slightly pitch-shifted / gain-varied).
    """
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)

    boundaries = estimate_word_boundaries(speech, sr)
    out = speech.copy()

    # Skip first 2 and last 2 boundaries (avoid start/end of utterance)
    candidates = boundaries[2:-2] if len(boundaries) > 4 else boundaries

    for idx in candidates:
        if random.random() > burp_prob:
            continue
        burp = random.choice(burps).copy()

        # random pitch shift via simple resampling (±8 %)
        ratio = random.uniform(0.92, 1.08)
        new_len = int(len(burp) * ratio)
        burp = np.interp(
            np.linspace(0, len(burp) - 1, new_len),
            np.arange(len(burp)),
            burp,
        ).astype(np.float32)

        gain = random.uniform(0.55, MAX_BURP_GAIN)
        burp *= gain

        # place slightly after the boundary (mid-word feel)
        offset = idx + int(random.uniform(0.02, 0.09) * sr)
        end = offset + len(burp)
        if end >= len(out):
            continue

        # soft cross-fade
        fade = min(int(0.015 * sr), len(burp) // 3)
        env = np.ones(len(burp))
        env[:fade] = np.linspace(0, 1, fade)
        env[-fade:] = np.linspace(1, 0, fade)
        out[offset:end] += burp * env

    # final soft clip
    peak = np.max(np.abs(out)) or 1.0
    if peak > 0.98:
        out = out / peak * 0.98
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Rick C-137 Piper burp injector")
    parser.add_argument("--input", "-i", required=True, type=Path, help="Input WAV from Piper")
    parser.add_argument("--output", "-o", required=True, type=Path, help="Output WAV with burps")
    parser.add_argument("--burp-dir", type=Path, default=DEFAULT_BURP_DIR)
    parser.add_argument("--burp-prob", type=float, default=DEFAULT_BURP_PROB)
    parser.add_argument("--seed", type=int, default=None)
    args = parser.parse_args()

    speech, sr = load_wav(args.input)
    if sr != SAMPLE_RATE:
        print(f"[warn] sample rate {sr} != {SAMPLE_RATE}; results may drift")
    burps = load_burp_library(args.burp_dir)
    print(f"Loaded {len(burps)} burp sample(s)")

    result = inject_burps(speech, burps, sr=sr, burp_prob=args.burp_prob, seed=args.seed)
    save_wav(args.output, result, sr=sr)
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
