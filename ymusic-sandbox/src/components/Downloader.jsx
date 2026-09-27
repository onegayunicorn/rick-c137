/**
 * YMusic Sandbox — Real MP3 Downloader component
 * Uses the extractor backend (no simulation).
 */
import { useState } from 'react';
import { useAudioExtract } from '../hooks/useAudioExtract';

export default function Downloader({ video, onComplete }) {
  const { getDownloadUrl, getInfo, loading, error } = useAudioExtract();
  const [status, setStatus] = useState('idle');

  async function startDownload() {
    if (!video?.videoId) return;
    setStatus('fetching');

    // Optional: refresh metadata
    const info = await getInfo(video.videoId);
    const title = info?.title || video.title || 'track';

    setStatus('downloading');
    const downloadUrl = getDownloadUrl(video.videoId);

    // Trigger browser download
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${title.replace(/[^\w\s\-.]/g, '_')}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setStatus('done');
    onComplete?.({
      id: video.videoId,
      title,
      format: 'MP3',
      bitrate: '320kbps',
      downloadUrl,
      savedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="downloader">
      <button
        onClick={startDownload}
        disabled={loading || status === 'downloading'}
      >
        {status === 'downloading'
          ? 'Downloading 320 kbps MP3…'
          : status === 'done'
          ? 'Downloaded ✓'
          : 'Download Real MP3'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
