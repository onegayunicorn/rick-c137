#!/usr/bin/env python3
"""
Rick C-137 ADB Bridge (fallback / hybrid)
=========================================
Classic ADB-based control used when DroidBridge is unavailable
or when running from a host PC / Termux with adb tcpip.

Provides a compatible high-level API so the entity core can swap
backends without code changes.
"""

from __future__ import annotations

import argparse
import subprocess
import time
from pathlib import Path
from typing import List, Optional, Tuple


class ADBBridge:
    def __init__(self, serial: Optional[str] = None, adb_path: str = "adb"):
        self.serial = serial
        self.adb = adb_path

    def _cmd(self, *args: str, check: bool = True) -> str:
        base = [self.adb]
        if self.serial:
            base += ["-s", self.serial]
        result = subprocess.run(
            base + list(args),
            capture_output=True,
            text=True,
            check=check,
        )
        return result.stdout.strip()

    def devices(self) -> List[str]:
        out = self._cmd("devices")
        lines = [l for l in out.splitlines()[1:] if l.strip() and "device" in l]
        return [l.split()[0] for l in lines]

    def shell(self, cmd: str) -> str:
        return self._cmd("shell", cmd)

    def tap(self, x: int, y: int) -> None:
        self.shell(f"input tap {x} {y}")

    def swipe(self, x1: int, y1: int, x2: int, y2: int, duration_ms: int = 300) -> None:
        self.shell(f"input swipe {x1} {y1} {x2} {y2} {duration_ms}")

    def type_text(self, text: str) -> None:
        # Escape spaces and special chars for `input text`
        safe = text.replace(" ", "%s").replace("'", "\\'").replace('"', '\\"')
        self.shell(f'input text "{safe}"')

    def key(self, keycode: str | int) -> None:
        self.shell(f"input keyevent {keycode}")

    def screenshot(self, dest: Path) -> Path:
        remote = "/sdcard/rick_screen.png"
        self.shell(f"screencap -p {remote}")
        self._cmd("pull", remote, str(dest))
        self.shell(f"rm {remote}")
        return dest

    def launch(self, package: str, activity: Optional[str] = None) -> None:
        if activity:
            self.shell(f"am start -n {package}/{activity}")
        else:
            self.shell(f"monkey -p {package} -c android.intent.category.LAUNCHER 1")

    def ui_dump(self) -> str:
        remote = "/sdcard/window_dump.xml"
        self.shell(f"uiautomator dump {remote}")
        return self.shell(f"cat {remote}")

    def wait_for_device(self, timeout: float = 30.0) -> bool:
        start = time.time()
        while time.time() - start < timeout:
            if self.devices():
                return True
            time.sleep(1)
        return False


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--serial")
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("devices")
    t = sub.add_parser("tap")
    t.add_argument("x", type=int)
    t.add_argument("y", type=int)
    s = sub.add_parser("swipe")
    s.add_argument("x1", type=int)
    s.add_argument("y1", type=int)
    s.add_argument("x2", type=int)
    s.add_argument("y2", type=int)
    ty = sub.add_parser("type")
    ty.add_argument("text")
    k = sub.add_parser("key")
    k.add_argument("keycode")
    sc = sub.add_parser("screenshot")
    sc.add_argument("dest", type=Path)
    args = p.parse_args()

    bridge = ADBBridge(serial=args.serial)
    if args.cmd == "devices":
        print("\n".join(bridge.devices()))
    elif args.cmd == "tap":
        bridge.tap(args.x, args.y)
    elif args.cmd == "swipe":
        bridge.swipe(args.x1, args.y1, args.x2, args.y2)
    elif args.cmd == "type":
        bridge.type_text(args.text)
    elif args.cmd == "key":
        bridge.key(args.keycode)
    elif args.cmd == "screenshot":
        print(bridge.screenshot(args.dest))


if __name__ == "__main__":
    main()
