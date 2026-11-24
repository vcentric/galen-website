"""
Port the approved How to Use page into per-guide content for /how-to-use/{role}/{guide}.

Source: docs/v2/reference/how-to-use-source/index.html (Claude Web, approved by Varun).
Outputs (commit both; re-run only when the source page changes):
  content/howto/generated.json   one entry per <section id>: html, toc, text
  app/how-to.css                 the source page CSS, scoped under .htu

Run:  py -I scripts/build-howto.py   (from the repo root)

Copy is ported verbatim except the edits in STUDENT_EDITS (Varun, Nov 2026: student
pages must not cite "uploaded textbook" or "lecture slide").
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs/v2/reference/how-to-use-source/index.html"
OUT_JSON = ROOT / "content/howto/generated.json"
OUT_CSS = ROOT / "app/how-to.css"

sys.path.insert(0, str(ROOT))
html = SRC.read_text(encoding="utf-8")

# guide slug per source section id, mirrored from content/site/howto.ts
ROLE_OF = {"st": "students", "fa": "faculty", "ad": "administration"}
SLUGS = {
    "st-start": "", "st-signin": "sign-in", "st-tutor": "ai-tutor", "st-modes": "tutor-modes",
    "st-extras": "profiles-notes-sources", "st-guided": "guided-lessons", "st-lessons": "faculty-lessons",
    "st-qbank": "question-bank", "st-flash": "flashcards", "st-cases": "clinical-cases",
    "st-dashboard": "dashboard", "st-viva": "voice-viva", "st-integrity": "use-ai-the-right-way",
    "st-faq": "faq", "st-ref": "quick-reference",
    "fa-start": "", "fa-calendar": "calendar", "fa-lessons": "lesson-planning", "fa-workspace": "ai-workspace",
    "fa-bank": "content-bank", "fa-assess": "assessments", "fa-analytics": "cohort-analytics", "fa-faq": "faq",
    "fa-ref": "quick-reference",
    "ad-start": "", "ad-roles": "roles", "ad-settings": "settings", "ad-courses": "courses-years-batches",
    "ad-people": "faculty-and-secretaries", "ad-students": "students", "ad-timetable": "cbme-timetable",
    "ad-curriculum": "lessons-and-content", "ad-analytics": "cbme-analytics", "ad-faq": "faq", "ad-ref": "quick-reference",
}

STUDENT_EDITS = [
    ("which uploaded textbook page or lecture slide it used", "which reference or college material it used"),
    ("to see the uploaded textbook chapter and page, or the faculty slide, behind the answer",
     "to see the reference or college material behind the answer"),
    ('data-img="s_explain"', 'data-img="s_explain_web"'),
    ('src="img/s_explain.webp"', 'src="img/s_explain_web.webp"'),
]

# 1. sections
sections = {}
for m in re.finditer(r'<section\b([^>]*)\bid="([a-z]{2}-[a-z0-9-]+)"([^>]*)>(.*?)</section>', html, re.S):
    sid, body = m.group(2), m.group(4)
    attrs = (m.group(1) + m.group(3))
    cls = re.search(r'class="([^"]*)"', attrs)
    sections[sid] = {"cls": cls.group(1) if cls else "guide", "body": body}

missing = set(SLUGS) - set(sections)
if missing:
    raise SystemExit(f"source sections missing: {sorted(missing)}")

# map every id (section ids and inner ids) to the section that contains it
owner = {}
for sid, s in sections.items():
    owner[sid] = sid
    for inner in re.findall(r'\bid="([a-z]{2}-[a-z0-9-]+)"', s["body"]):
        owner[inner] = sid


def url_for(target_id):
    sid = owner.get(target_id)
    if not sid:
        return None
    base = f"/how-to-use/{ROLE_OF[sid[:2]]}" + (f"/{SLUGS[sid]}" if SLUGS[sid] else "")
    return base if target_id == sid else f"{base}#{target_id}"


def rewrite(sid, body):
    if sid.startswith("st-"):
        for a, b in STUDENT_EDITS:
            body = body.replace(a, b)
    body = body.replace('src="img/', 'src="/how-to-use/img/')

    def link(m):
        u = url_for(m.group(1))
        return f'href="{u}"' if u else m.group(0)

    body = re.sub(r'href="#([a-z]{2}-[a-z0-9-]+)"', link, body)
    # one H1 per page: the guide's first h2 becomes the page H1 (hero sections already have one)
    if "<h1" not in body:
        body = re.sub(r"<h2(\b[^>]*)>(.*?)</h2>", r"<h1\1>\2</h1>", body, count=1, flags=re.S)
    if "—" in body:
        print(f"warning: em dash in {sid}", file=sys.stderr)
    return body


out = {}
for sid, slug in SLUGS.items():
    s = sections[sid]
    body = rewrite(sid, s["body"])
    toc = [{"id": i, "label": l} for i, l in re.findall(r'id="([a-z]{2}-[a-z0-9-]+)"[^>]*data-toc-sub="([^"]+)"', body)]
    text = re.sub(r"<[^>]+>", " ", body)
    text = re.sub(r"\s+", " ", text).replace("&amp;", "&").strip()
    out[sid] = {
        "role": ROLE_OF[sid[:2]],
        "slug": slug,
        "html": f'<section class="{s["cls"]}" id="{sid}">{body}</section>',
        "toc": toc,
        "text": text,
    }

OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
OUT_JSON.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

# 2. CSS, scoped under .htu
css = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)

SKIP = re.compile(
    r"^(html|body|body::before|\*|\.wrap|\.top|\.toprow|\.brand|\.search|\.results|\.roles|\.role|\.shell|\.rail|\.help-card|footer|\.copy)\b"
)


def scope_rules(block):
    res = []
    for m in re.finditer(r"([^{}]+)\{([^{}]*)\}", block):
        sel, decl = m.group(1).strip(), m.group(2).strip()
        parts = []
        for s in sel.split(","):
            s = s.strip()
            if s == ":root":
                parts.append(".htu")
            elif SKIP.match(s):
                continue
            else:
                parts.append(f".htu {s}")
        if parts:
            res.append(f"{','.join(parts)}{{{decl}}}")
    return "\n".join(res)


chunks, i = [], 0
for m in re.finditer(r"@media[^{]*\{((?:[^{}]*\{[^{}]*\})*)\s*\}", css):
    chunks.append(("plain", css[i:m.start()]))
    chunks.append(("media", m.group(0)))
    i = m.end()
chunks.append(("plain", css[i:]))

out_css = [
    "/* GENERATED by scripts/build-howto.py from the approved How to Use page. Do not edit by hand. */",
    "/* Scoped under .htu. Light theme only (the marketing site has no dark mode). */",
]
for kind, text in chunks:
    if kind == "plain":
        # drop dark-theme blocks
        text = re.sub(r":root\[data-theme=\"dark\"\]\{[^}]*\}", "", text)
        out_css.append(scope_rules(text))
    else:
        head = text[: text.index("{")].strip()
        if "prefers-color-scheme" in head:
            continue
        inner = text[text.index("{") + 1 : text.rindex("}")]
        scoped = scope_rules(inner)
        if scoped:
            out_css.append(f"{head}{{\n{scoped}\n}}")

OUT_CSS.write_text("\n".join(out_css) + "\n", encoding="utf-8")
print(f"{len(out)} guides -> {OUT_JSON.relative_to(ROOT)}; css -> {OUT_CSS.relative_to(ROOT)}")
