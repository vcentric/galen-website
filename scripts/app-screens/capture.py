"""Capture one screen from the patched GalenAI UI kit (run prepare-kit.py and serve it first).
usage: py scripts/app-screens/capture.py <name> "<query>" "<steps>" [out_dir]   steps like kit_explore (text clicks, wait:ms, css:sel, scroll:sel:px)
Saves a PNG of the whole phone (frame + notch, transparent corners) at 2x."""
import sys
from playwright.sync_api import sync_playwright

name, query = sys.argv[1], sys.argv[2]
steps = sys.argv[3].split("|") if len(sys.argv) > 3 and sys.argv[3] else []
OUT = sys.argv[4] if len(sys.argv) > 4 else "app-captures"
import os
os.makedirs(OUT, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 1000}, device_scale_factor=2)
    pg.goto(f"http://127.0.0.1:8765/index.html?app=1&clean=1&{query}", wait_until="networkidle")
    pg.wait_for_timeout(3500)
    for s in steps:
        s = s.strip()
        if s.startswith("wait:"):
            pg.wait_for_timeout(int(s[5:]))
        elif s.startswith("css:"):
            pg.locator(s[4:]).first.click(); pg.wait_for_timeout(900)
        elif s.startswith("scroll:"):
            _, sel, px = s.split(":")
            pg.evaluate(f"document.querySelectorAll('{sel}').forEach(e=>e.scrollTop={px})"); pg.wait_for_timeout(500)
        elif s.startswith("nth:"):
            _, idx, txt = s.split(":", 2)
            pg.get_by_text(txt, exact=False).nth(int(idx)).click(); pg.wait_for_timeout(900)
        else:
            pg.get_by_text(s, exact=False).first.click(); pg.wait_for_timeout(900)
    pg.add_style_tag(content="html,body{background:transparent!important}")
    pg.locator(".phone").screenshot(path=f"{OUT}\\{name}.png", omit_background=True)
    open(f"{OUT}\\{name}.txt", "w", encoding="utf-8").write(pg.locator(".screen").inner_text())
    b.close()
print(f"{OUT}\\{name}.png")
