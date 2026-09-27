/**
 * Frontend hook → real YMusic extractor backend
 */
import { useState } from 'react';

const API_BASE = import.meta.env.VITE_EXTRACTOR_URL || 'http://localhost:8799/api';

export function useAudioExtract() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getInfo(videoId) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/info?id=${encodeURIComponent(videoId)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  function getDownloadUrl(videoId) {
    return `${API_BASE}/extract?id=${encodeURIComponent(videoId)}`;
  }

  return { loading, error, getInfo, getDownloadUrl };
}
