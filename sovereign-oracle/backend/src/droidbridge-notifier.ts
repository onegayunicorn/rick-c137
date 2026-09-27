/**
 * DroidBridge → Nexus Engine notification bridge
 * ==============================================
 * Uses the real MCP JSON-RPC endpoint (tools/call) so notifications
 * land on the phone via the DroidBridge Android tool group.
 *
 * Env:
 *   DROIDBRIDGE_URL   default http://127.0.0.1:8765/mcp
 *   DROIDBRIDGE_TOKEN bearer token from the DroidBridge app
 */

import type { NexusState } from './nexus-math.js';

const DROIDBRIDGE_MCP_URL =
  process.env.DROIDBRIDGE_URL || 'http://127.0.0.1:8765/mcp';
const DROIDBRIDGE_TOKEN = process.env.DROIDBRIDGE_TOKEN || '';

interface NotifyOpts {
  title: string;
  body: string;
  channel?: string;
  priority?: 'normal' | 'high';
}

class DroidBridgeNotifier {
  private connected = false;
  private rpcId = 0;
  private lastNotifyAt = 0;
  private readonly minIntervalMs = 8000; // rate-limit spam

  async connect(): Promise<boolean> {
    try {
      const result = await this.rpc('tools/call', {
        name: 'context',
        arguments: {},
      });
      this.connected = !!result;
      console.log(
        this.connected
          ? '✅ DroidBridge MCP connected'
          : '⚠️ DroidBridge unreachable'
      );
      return this.connected;
    } catch {
      this.connected = false;
      console.warn('⚠️ DroidBridge connect failed — notifications disabled');
      return false;
    }
  }

  private async rpc(method: string, params: Record<string, unknown>) {
    this.rpcId += 1;
    const res = await fetch(DROIDBRIDGE_MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(DROIDBRIDGE_TOKEN
          ? { Authorization: `Bearer ${DROIDBRIDGE_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: this.rpcId,
        method,
        params,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    return data.result;
  }

  async notify(opts: NotifyOpts): Promise<void> {
    if (!this.connected) return;
    const now = Date.now();
    if (now - this.lastNotifyAt < this.minIntervalMs) return;
    this.lastNotifyAt = now;

    try {
      await this.rpc('tools/call', {
        name: 'android',
        arguments: {
          action: 'notify',
          title: opts.title,
          body: opts.body,
          channel: opts.channel || 'rick_nexus',
          priority: opts.priority || 'normal',
        },
      });
    } catch (err) {
      console.warn('DroidBridge notify failed:', err);
    }
  }

  /**
   * Called on every Nexus tick (≈20 Hz). Apply threshold rules.
   */
  async onNexusTick(state: NexusState): Promise<void> {
    // High Ricci curvature → temporal flux warning
    if (state.em005_ricciCurvature > 0.051) {
      await this.notify({
        title: '⚠️ TEMPORAL FLUX HIGH',
        body: `Curvature: ${state.em005_ricciCurvature.toFixed(4)} — Portal instability detected`,
        priority: 'high',
      });
    }

    // Low photonic bandgap → suppression alert
    if (state.em007_bandgap < 0.3) {
      await this.notify({
        title: '🔵 PHOTONIC SUPPRESSION',
        body: `Bandgap: ${state.em007_bandgap.toFixed(2)} — Optical signal weakening`,
        priority: 'normal',
      });
    }

    // Strong decoherence → system alert
    if (state.em001_decoherence > 0.055) {
      await this.notify({
        title: '🟡 QUANTUM DECOHERENCE',
        body: `Γ = ${state.em001_decoherence.toFixed(4)} — State divergence accelerating`,
        priority: 'normal',
      });
    }
  }
}

export const droidBridge = new DroidBridgeNotifier();
export default droidBridge;
