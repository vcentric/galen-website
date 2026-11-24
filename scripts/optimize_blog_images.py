"""optimize_blog_images.py: shrink blog images. Run from the repo root after adding posts with large PNG or JPG images:
    python scripts/optimize_blog_images.py
For every PNG/JPG under public/blog-images it writes a WebP (max 1600 px wide) beside it, rewrites the references
in content/posts, deletes the original, and writes <name>.og.jpg (1200 px wide) for social previews, which some
platforms will not read from WebP. Needs Pillow (pip install pillow). Safe to run again: finished files are skipped.
"""
import os, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "public", "blog-images")
POSTS = os.path.join(ROOT, "content", "posts")

renamed, saved = {}, 0
for p in glob.glob(os.path.join(IMG, "**", "*.*"), recursive=True):
    base, ext = os.path.splitext(p)
    if ext.lower() not in (".png", ".jpg", ".jpeg") or base.endswith(".og"):
        continue
    im = Image.open(p)
    has_alpha = im.mode in ("RGBA", "LA", "P") and "transparency" in im.info or im.mode in ("RGBA", "LA")
    im = im.convert("RGBA" if has_alpha else "RGB")
    web = im.copy()
    if web.width > 1600:
        web = web.resize((1600, round(web.height * 1600 / web.width)), Image.LANCZOS)
    web.save(base + ".webp", "WEBP", quality=82, method=6)
    og = im.convert("RGB")
    if og.width > 1200:
        og = og.resize((1200, round(og.height * 1200 / og.width)), Image.LANCZOS)
    og.save(base + ".og.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    saved += os.path.getsize(p) - os.path.getsize(base + ".webp")
    rel = lambda x: "/" + os.path.relpath(x, os.path.join(ROOT, "public")).replace(os.sep, "/")
    renamed[rel(p)] = rel(base + ".webp")
    os.remove(p)

n = 0
for f in glob.glob(os.path.join(POSTS, "*", "index.mdoc")):
    s = open(f, encoding="utf-8").read()
    t = s
    for a, b in renamed.items():
        t = t.replace(a, b)
    if t != s:
        open(f, "w", encoding="utf-8", newline="\n").write(t)
        n += 1
print(f"converted {len(renamed)} images, saved {saved // 1024} KB, updated {n} posts")
