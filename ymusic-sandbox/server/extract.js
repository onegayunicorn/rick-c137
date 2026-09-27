/**
 * YMusic Sandbox — Real YouTube Audio Extraction Backend
 * ========================================================
 * Streams high-quality MP3 (320 kbps) from YouTube video IDs.
 *
 * GET /api/extract?id=VIDEO_ID  → streams MP3
 * GET /api/info?id=VIDEO_ID     → metadata JSON
 *
 * Requires: ffmpeg on PATH (or ffmpeg-static)
 */

import express from 'express';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

const app = express();
app.use(express.json());

// CORS for local Vite frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// GET /api/extract?id=VIDEO_ID → streams MP3 directly
app.get('/api/extract', async (req, res) => {
  const { id } = req.query;
  if (!id || !ytdl.validateID(id)) {
    return res.status(400).json({ error: 'Invalid video ID' });
  }

  try {
    const info = await ytdl.getInfo(id);
    const title = (info.videoDetails.title || 'track').replace(/[^\w\s\-.]/g, "'");
    const audioStream = ytdl.downloadFromInfo(info, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');

    // Pipe through ffmpeg → MP3 320 kbps / 44.1 kHz
    ffmpeg(audioStream)
      .format('mp3')
      .audioBitrate(320)
      .audioFrequency(44100)
      .on('error', (err) => {
        console.error('ffmpeg error:', err.message);
        if (!res.headersSent) res.status(500).json({ error: err.message });
      })
      .pipe(res, { end: true });
  } catch (err) {
    console.error('Extract error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || 'Extraction failed' });
    }
  }
});

// GET /api/info?id=VIDEO_ID → metadata only
app.get('/api/info', async (req, res) => {
  const { id } = req.query;
  if (!id || !ytdl.validateID(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const info = await ytdl.getBasicInfo(id);
    res.json({
      id,
      title: info.videoDetails.title,
      channel: info.videoDetails.author?.name,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails?.at(-1)?.url,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8799;
app.listen(PORT, () => {
  console.log(`🎵 YMusic Extractor running on http://localhost:${PORT}`);
  console.log(`   GET /api/info?id=VIDEO_ID`);
  console.log(`   GET /api/extract?id=VIDEO_ID`);
});
