# Rick C-137 — Piper Burp Injection + Android Bridge Integration

## 1. Piper Burp Injection

Canonical Rick speech inserts a short burp roughly every 12–18 words (mid-sentence or mid-word).  
The training data rarely contains enough natural burps, so we inject them post-synthesis.

### Files
| Path | Role |
|------|------|
| `voice/burp_injector.py` | Core post-processor |
| `voice/tts_pipeline.py` | High-level Piper → burp → WAV pipeline |
| `voice/burp_samples/` | Drop short 16-bit mono WAVs here (optional) |

### Quick usage
```bash
# After Piper has produced speech.wav
python voice/burp_injector.py -i speech.wav -o rick_speech.wav --burp-prob 0.08

# Or end-to-end
python voice/tts_pipeline.py "Morty, we gotta go — now!" -o out.wav
```

### Tuning knobs
- `--burp-prob` (default 0.08) — higher = more frequent burps  
- `--seed` — reproducible placement for testing  
- Place real recorded burps in `voice/burp_samples/*.wav` (80–220 ms, mono, 22.05 kHz).  
  If the folder is empty the script synthesises plausible noise+formant burps.

### Integration into the entity
In the FastAPI voice router (or Termux daemon) replace the plain Piper call with:

```python
from voice.tts_pipeline import synthesize
audio_bytes = synthesize(text, burp_prob=0.08)
```

---

## 2. DroidBridge MCP Tools (explored)

**Repo**: https://github.com/zephyr7030/DroidBridge  
**Type**: On-device MCP server (no PC, no permanent ADB required)

### Tool groups
| Tool | Capabilities |
|------|--------------|
| `context` | Status, capabilities, tool catalog |
| `visual` | Screenshot, UI hierarchy, tap, long-press, swipe, type, key events |
| `android` | Package list, launch app/intent, clipboard, notifications |
| `filesystem` | Read/write/edit/move/delete/zip files |
| `command` | Shell as app / Shizuku / root |
| `network` | DNS/TCP/TLS diagnostics + capture (root) |
| `automation` | Scheduled automations |
| `task_control` | List / cancel background tasks |

### Privilege levels
- **No root** — Accessibility + Notification access is enough for visual + android tools  
- **+ Shizuku** — shell identity  
- **+ Magisk/KernelSU** — root identity + network capture + persistent after reboot

### Connection (Local MCP – preferred for sovereign Rick)
```bash
# On host / Termux after one-time USB
adb forward tcp:8765 tcp:8765

# In DroidBridge app → Agent connection → Local MCP → copy token
export DROIDBRIDGE_TOKEN="<token>"
python device/android_bridge/droidbridge_client.py list-tools
```

Endpoint: `http://127.0.0.1:8765/mcp`  
Auth: `Authorization: Bearer <token>`

---

## 3. Android Bridge Starter Scripts

| Script | Purpose |
|--------|---------|
| `scripts/setup_android_bridge.sh` | One-shot Termux / host setup (packages, adb tcpip, port-forward, env file) |
| `device/android_bridge/droidbridge_client.py` | Async MCP client with convenience methods |
| `device/android_bridge/adb_bridge.py` | Classic ADB fallback with matching high-level API |

### Recommended flow for the entity
1. Prefer DroidBridge (lower latency, richer UI tree, no constant ADB).  
2. Fall back to `ADBBridge` when the MCP endpoint is unreachable.  
3. Both expose the same surface (`tap`, `swipe`, `type_text`, `screenshot`, `shell`, `launch` …) so the orchestration layer stays backend-agnostic.

### Example – Rick decides to open the portal (metaphorically)
```python
from device.android_bridge.droidbridge_client import DroidBridgeClient
client = DroidBridgeClient()
await client.notify("Portal Gun", "Opening a portal to the Citadel…")
await client.launch_app("com.android.settings")   # or any package
```

---

## 4. Drop-in checklist for the main repo

```
rick-c137/
├── voice/
│   ├── burp_injector.py
│   ├── tts_pipeline.py
│   └── burp_samples/          # optional real samples
├── device/
│   └── android_bridge/
│       ├── droidbridge_client.py
│       └── adb_bridge.py
├── scripts/
│   └── setup_android_bridge.sh
└── docs/
    └── PIPER_BURP_AND_ANDROID_BRIDGE.md
```

1. Copy the tree above into the existing Project C-137 repo.  
2. Run `bash scripts/setup_android_bridge.sh`.  
3. Install DroidBridge APK, grant permissions, paste token.  
4. Point the TTS layer at `tts_pipeline.synthesize`.  
5. Wire the orchestration layer to `DroidBridgeClient` (with ADB fallback).

Wubba lubba dub-dub — the Citadel now has both a proper voice and hands.
