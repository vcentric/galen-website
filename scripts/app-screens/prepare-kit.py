"""
Unpack the GalenAI mobile UI kit (a single bundled HTML export) into a folder that
can be served locally, and patch it for website captures.

usage:  py -I scripts/app-screens/prepare-kit.py "<path to GalenAI Mobile App (N).html>" <out_dir>
then:   py -m http.server 8765 --bind 127.0.0.1   (run inside <out_dir>)
        py scripts/app-screens/capture.py ...     (see docs/v2/APP_SCREENS.md)

Patches (website copy only, the source file is never modified):
  - URL params: ?app=1 (skip login) &theme=dark &nav=qbank|flash|cases|dash|viva
                &demo=iso|s2|trop|explain|socratic|case|quick (preload a tutor conversation)
                &mode=explain|socratic|case_based|quick_qa (Tutor Mode on) &clean=1 (hide dev panel)
  - Tutor, question bank and flashcard sample data replaced with approved content
    (the kit's samples cite textbooks by name, which the website must never show).
"""
import base64
import gzip
import json
import re
import shutil
import sys
from pathlib import Path

src, out = Path(sys.argv[1]), Path(sys.argv[2])
html = src.read_text(encoding="utf-8")
manifest = json.loads(re.search(r'<script type="__bundler/manifest">(.*?)</script>', html, re.S).group(1))
template = json.loads(re.search(r'<script type="__bundler/template">(.*?)</script>', html, re.S).group(1))

if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True)
files = {}
for uid, entry in manifest.items():
    data = base64.b64decode(entry["data"])
    if entry.get("compressed"):
        data = gzip.decompress(data)
    (out / uid).write_bytes(data)
    files[uid] = data

def find(marker: str) -> Path:
    for uid, data in files.items():
        if marker.encode() in data[:400]:
            return out / uid
    raise SystemExit(f"kit file not found: {marker}")

# ── App shell: URL params + preloaded demo conversation ──
DEMO = r"""
    const QS = new URLSearchParams(location.search);
    const DEMOS = {
      iso: { q: 'Why does volume stay the same during isovolumetric contraction?',
        a: 'During <strong>isovolumic contraction</strong>, ventricular volume remains constant because all heart valves are closed.<br/><br/>The mitral valve has closed and the aortic valve has not yet opened, so blood cannot enter or leave. Pressure rises rapidly with no change in chamber volume.<br/><br/>It is depicted as a vertical line on the left ventricular pressure-volume loop.',
        f: ['Quiz me on pressure-volume loops', 'What happens to the loop when afterload increases?'] },
      s2: { q: 'What produces the second heart sound (S2)?',
        a: 'The <strong>second heart sound</strong> (S2) is produced by vibrations of the cardiac structures and great vessels at the end of ventricular systole.<br/><br/>They are triggered when the semilunar valves, the <strong>aortic valve</strong> and the <strong>pulmonary valve</strong>, close to prevent diastolic reflux into the ventricles.<br/><br/>S2 has two components: <strong>A2</strong> (aortic closure) and <strong>P2</strong> (pulmonary closure). Normally A2 comes first.',
        f: ['Explain splitting of S2', 'Quiz me on heart sounds'] },
      trop: { q: 'How long does cardiac troponin T stay raised after an MI?',
        a: 'Cardiac troponin T (cTnT) typically remains elevated for <strong>10 to 14 days</strong> after an acute myocardial infarction (MI).<br/><br/>Depending on the assay and the size of the infarct, it can sometimes be detected for 5 to 21 days.',
        f: ['Compare troponin and CK-MB', 'Quiz me on cardiac markers'] },
      // One reply per tutor mode: wording from the approved How to Use screens (public/how-to-use/img/s_*.webp).
      explain: { q: 'Explain the phases of the cardiac cycle simply',
        a: 'Think of one heartbeat as four steps:<br/><br/>1. <strong>Isovolumetric contraction</strong>: mitral closes (S1), pressure rises, volume stays the same.<br/>2. <strong>Ejection</strong>: aortic valve opens once LV pressure passes aortic pressure (~80 mmHg).<br/>3. <strong>Isovolumetric relaxation</strong>: aortic closes (S2), pressure falls, volume stays the same.<br/>4. <strong>Filling</strong>: mitral reopens and the ventricle fills.<br/><br/><strong>Quick check:</strong> in which two phases are both valves closed?',
        f: [], r: 2 },
      socratic: { r: 2, msgs: [
        { user: true, text: 'Why does volume stay the same during isovolumetric contraction?' },
        { user: false, text: 'Good question. Let\'s reason it out together.<br/><br/>At the very start of systole the ventricle begins to contract. <strong>Which two valves are closed at that moment?</strong> Think about which way blood would have to go to leave the ventricle.', references: ['Standard medical reference', 'Standard medical reference'], followups: ['Give me a hint', 'Show me the answer'] },
        { user: true, text: 'Mitral and aortic? Mitral just shut and aortic has not opened yet.' },
        { user: false, text: 'Exactly. Both exits are shut, so blood has nowhere to go. Pressure climbs, but <strong>volume cannot change</strong>.' },
      ] },
      case: { q: 'Give me a case on chest pain',
        a: '<strong>Case:</strong> A 55-year-old smoker arrives with 40 minutes of crushing central chest pain radiating to the jaw. He is sweaty. BP 100/70 mmHg, pulse 104/min.<br/><br/><strong>Step 1:</strong> What is the first investigation you order, and why?',
        f: ['Give me a hint', 'Reveal the next step'], r: 2 },
      quick: { q: 'Normal GFR in adults?',
        a: '<strong>About 90 to 120 mL/min/1.73 m<sup>2</sup></strong> in healthy young adults.<br/><br/>&bull; Falls gradually with age<br/>&bull; Below 60 for 3 months or more = CKD stage 3<br/>&bull; Usually estimated from serum creatinine (eGFR)',
        f: ['Why does GFR fall with age?', 'Quiz me on CKD staging'], r: 2 },
    };
    const DEMO = DEMOS[QS.get('demo')];
    const DEMO_REFS = ['Standard medical reference', 'Standard medical reference', 'Standard medical reference'];
"""
t = template.replace("    const AI_REPLY = `", DEMO + "    const AI_REPLY = `", 1)
t = t.replace("React.useState('light');", "React.useState(QS.get('theme') || 'light');", 1)
t = t.replace("const [screen, setScreen] = React.useState(() => {", "const [screen, setScreen] = React.useState(() => { if (QS.get('app')) return 'app';", 1)
t = t.replace("const [nav, setNav] = React.useState('tutor');", "const [nav, setNav] = React.useState(QS.get('nav') || 'tutor');", 1)
t = t.replace("const [messages, setMessages] = React.useState([]);",
              "const [messages, setMessages] = React.useState(DEMO ? (DEMO.msgs || [{ user: true, text: DEMO.q }, { user: false, text: DEMO.a, references: DEMO_REFS.slice(0, DEMO.r || 3), followups: DEMO.f }]) : []);", 1)
# &mode=explain|socratic|case_based|quick_qa|auto turns Tutor Mode on, so the composer pill shows the mode.
t = t.replace("const [tutorEnabled, setTutorEnabled] = React.useState(false);", "const [tutorEnabled, setTutorEnabled] = React.useState(!!QS.get('mode'));", 1)
t = t.replace("const [tutorMode, setTutorMode] = React.useState('auto');", "const [tutorMode, setTutorMode] = React.useState(QS.get('mode') || 'auto');", 1)
t = t.replace("const devPanel = ReactDOM.createPortal(", "const devPanel = QS.get('clean') ? null : ReactDOM.createPortal(", 1)
if t.count("QS.get") < 7:
    raise SystemExit("App shell patch did not apply; the kit structure changed. Re-check the replacements.")
(out / "index.html").write_text(t, encoding="utf-8")

# ── Question bank: approved S2 question (How to Use page, PY5.7) ──
qb = find("Question Bank (§ QUESTION_BANK_DESIGN_SPEC)")
s = qb.read_text(encoding="utf-8").replace("'AS1.1'", "'PY5.7'")
s += """
QB_QUESTIONS.splice(0, QB_QUESTIONS.length, {
  stem: 'The second heart sound (S2) is produced by:',
  options: ['Closure of semilunar valves', 'Closure of AV valves', 'Opening of semilunar valves', 'Rapid ventricular filling'],
  correct: 0,
  summary: 'S2 marks the end of systole: the aortic and pulmonary (semilunar) valves close as ventricular pressure falls below arterial pressure.',
  steps: ['S2 occurs at the end of ventricular systole.', 'Ventricular pressure falls below aortic and pulmonary pressure.', 'The semilunar valves close, producing S2.'],
  distractors: { 2: 'Closure of the AV (mitral and tricuspid) valves produces S1, at the start of systole.', 3: 'Opening of the semilunar valves is silent and marks the start of ejection.', 4: 'Rapid ventricular filling can produce S3, not S2.' },
  clinical: 'S2 has two components, A2 and P2. Physiological splitting widens on inspiration.',
  refs: ['Standard medical reference'],
});
"""
qb.write_text(s, encoding="utf-8")

# ── Flashcards: approved facts only ──
fc = find("Flashcards v2 (§ FLASHCARDS_DESIGN_SPEC v2)")
s = fc.read_text(encoding="utf-8")
s = re.sub(r"Barash Clinical Anesthesia", "Standard medical reference", s)
s = s.replace("'AS1.1'", "'PY5.7'").replace("Describe the evolution and scope of anaesthesiology as a specialty.", "Describe the events of the cardiac cycle.")
s = s.replace("Anaesthesia as a specialty", "Cardiac cycle")
s += """
FC_CARDS.splice(0, FC_CARDS.length,
  { id: 'w1', style: 'Basic', q: 'How long does cardiac troponin T stay raised after an acute myocardial infarction?', a: '10 to 14 days.', topic: 'Cardiac cycle', reps: 2, interval: 4, due: true, ease: 2.5, refs: ['Standard medical reference'] },
  { id: 'w2', style: 'Cloze', clozeText: 'The second heart sound (S2) is produced by closure of the {{c1::semilunar}} valves.', a: 'semilunar', topic: 'Cardiac cycle', reps: 1, interval: 1, due: true, ease: 2.5, refs: ['Standard medical reference'] }
);
"""
fc.write_text(s, encoding="utf-8")
print(f"kit ready in {out} ({len(files)} files)")
