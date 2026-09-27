#!/usr/bin/env python3
"""
Rick C-137 ↔ DroidBridge MCP Client
===================================
Thin async client that talks to the on-device DroidBridge MCP server
(http://127.0.0.1:8765/mcp) so the Rick entity can drive the phone.

DroidBridge tools (from upstream README):
  context, visual, android, filesystem, command, network, automation, task_control

Typical deployment:
  1. Install DroidBridge APK on the phone
  2. Enable Accessibility + Notification access (+ optional Shizuku/Magisk)
  3. In the app: Agent connection → Local MCP → copy bearer token
  4. From Termux / host:  adb forward tcp:8765 tcp:8765
  5. Export DROIDBRIDGE_TOKEN=<token>
  6. python droidbridge_client.py --list-tools
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
from typing import Any, Dict, List, Optional

try:
    import httpx
except ImportError:
    raise SystemExit("httpx required: pip install httpx")


class DroidBridgeClient:
    def __init__(
        self,
        base_url: str = "http://127.0.0.1:8765/mcp",
        token: Optional[str] = None,
        timeout: float = 30.0,
    ):
        self.base_url = base_url.rstrip("/")
        self.token = token or os.environ.get("DROIDBRIDGE_TOKEN", "")
        self.timeout = timeout
        self._id = 0

    def _headers(self) -> Dict[str, str]:
        h = {"Content-Type": "application/json"}
        if self.token:
            h["Authorization"] = f"Bearer {self.token}"
        return h

    async def _rpc(self, method: str, params: Optional[Dict] = None) -> Any:
        self._id += 1
        payload = {
            "jsonrpc": "2.0",
            "id": self._id,
            "method": method,
            "params": params or {},
        }
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            r = await client.post(self.base_url, headers=self._headers(), json=payload)
            r.raise_for_status()
            data = r.json()
            if "error" in data:
                raise RuntimeError(f"MCP error: {data['error']}")
            return data.get("result")

    # ------------------------------------------------------------------
    # Core MCP helpers
    # ------------------------------------------------------------------
    async def list_tools(self) -> List[Dict]:
        result = await self._rpc("tools/list")
        return result.get("tools", [])

    async def call_tool(self, name: str, arguments: Optional[Dict] = None) -> Any:
        return await self._rpc(
            "tools/call",
            {"name": name, "arguments": arguments or {}},
        )

    # ------------------------------------------------------------------
    # Convenience wrappers around DroidBridge tool groups
    # ------------------------------------------------------------------
    async def screenshot(self, format: str = "jpeg", quality: int = 70) -> bytes:
        """visual.take_screenshot → base64 or raw bytes."""
        res = await self.call_tool("visual", {"action": "screenshot", "format": format, "quality": quality})
        # Upstream may return base64; adapt as needed
        if isinstance(res, dict) and "image_b64" in res:
            import base64
            return base64.b64decode(res["image_b64"])
        return res

    async def tap(self, x: int, y: int) -> Any:
        return await self.call_tool("visual", {"action": "tap", "x": x, "y": y})

    async def swipe(self, x1: int, y1: int, x2: int, y2: int, duration_ms: int = 300) -> Any:
        return await self.call_tool(
            "visual",
            {"action": "swipe", "x1": x1, "y1": y1, "x2": x2, "y2": y2, "duration_ms": duration_ms},
        )

    async def type_text(self, text: str) -> Any:
        return await self.call_tool("visual", {"action": "type", "text": text})

    async def press_key(self, key: str) -> Any:
        """key examples: back, home, recents, enter, volume_up …"""
        return await self.call_tool("visual", {"action": "key", "key": key})

    async def ui_hierarchy(self) -> Any:
        return await self.call_tool("visual", {"action": "hierarchy"})

    async def launch_app(self, package: str) -> Any:
        return await self.call_tool("android", {"action": "launch", "package": package})

    async def shell(self, cmd: str, identity: str = "app") -> Any:
        """identity: app | shell (Shizuku) | root"""
        return await self.call_tool("command", {"cmd": cmd, "identity": identity})

    async def notify(self, title: str, body: str, channel: str = "rick_voice") -> Any:
        return await self.call_tool(
            "android",
            {"action": "notify", "title": title, "body": body, "channel": channel},
        )

    async def context(self) -> Any:
        return await self.call_tool("context", {})


# ----------------------------------------------------------------------
# CLI for quick testing
# ----------------------------------------------------------------------
async def _cli() -> None:
    parser = argparse.ArgumentParser(description="DroidBridge MCP client for Rick C-137")
    parser.add_argument("--url", default="http://127.0.0.1:8765/mcp")
    parser.add_argument("--token", default=None)
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("list-tools")
    p_ctx = sub.add_parser("context")
    p_tap = sub.add_parser("tap")
    p_tap.add_argument("x", type=int)
    p_tap.add_argument("y", type=int)
    p_type = sub.add_parser("type")
    p_type.add_argument("text")
    p_key = sub.add_parser("key")
    p_key.add_argument("key")
    p_shell = sub.add_parser("shell")
    p_shell.add_argument("cmd")
    p_shell.add_argument("--identity", default="app")

    args = parser.parse_args()
    client = DroidBridgeClient(base_url=args.url, token=args.token)

    if args.cmd == "list-tools":
        tools = await client.list_tools()
        for t in tools:
            print(f"- {t.get('name')}: {t.get('description', '')[:80]}")
    elif args.cmd == "context":
        print(json.dumps(await client.context(), indent=2))
    elif args.cmd == "tap":
        print(await client.tap(args.x, args.y))
    elif args.cmd == "type":
        print(await client.type_text(args.text))
    elif args.cmd == "key":
        print(await client.press_key(args.key))
    elif args.cmd == "shell":
        print(await client.shell(args.cmd, args.identity))


if __name__ == "__main__":
    asyncio.run(_cli())
