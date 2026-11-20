# App screens on the website

Phone visuals on the site come from the **GalenAI mobile UI kit** (Varun, Nov 2026:
`Sources/Context for webpage/GalenAI Mobile App (17).html` in the Marketing Team project; the clinical case and guided lesson screens are from version 18).
That file is the app's real UI as a runnable React prototype.

Two ways the site uses it:

| What | Where | How |
|---|---|---|
| Static screens | `public/app/*.webp` (600 x 1245, frame and notch included, transparent corners), rendered with `<AppScreen name=…>` | Captured from the kit, dark theme |
| Interactive tutor | `TutorPhone`, `HeroTutor`, `TutorDemo` in `app/components/v2/TutorDemo.tsx` | Coded to the kit's dark tokens; answers from `content/site/demos.ts` (real app output) |

**Never wrap an `AppScreen` in `PhoneFrame`**: the capture already has its notch. `PhoneFrame` only draws a notch for coded UI or screens without one (how-to `s_*` screenshots carry their own).

## Content rules for captures

The kit's sample data names textbooks (Harrison's, Barash, Miller's) and uses unreviewed questions. `prepare-kit.py` replaces the tutor, question bank and flashcard samples with approved content before capture. Do not capture any kit screen that shows medical content not on the approved list. Clinical cases use three screens from the kit's own sample case (the case list, the case introduction and the first History / Examination step, before any answer is revealed): have faculty check that case before it is relied on. Voice viva is captured, but the site always labels it "Coming soon".

## Recapture (when the app UI changes)

```bash
py -I scripts/app-screens/prepare-kit.py "<path>/GalenAI Mobile App (N).html" .kit
cd .kit && py -m http.server 8765 --bind 127.0.0.1     # leave running
# from the repo root, one line per screen:
py scripts/app-screens/capture.py k_home         "theme=dark"
py scripts/app-screens/capture.py k_tutor_iso    "theme=dark&demo=iso"
py scripts/app-screens/capture.py k_tutor_s2     "theme=dark&demo=s2"
py scripts/app-screens/capture.py k_tutor_trop   "theme=dark&demo=trop"
py scripts/app-screens/capture.py k_history      "theme=dark&demo=iso" "css:button[aria-label='Chat history']|wait:900"
py scripts/app-screens/capture.py k_modes        "theme=dark" "nth:0:Default|wait:700|Tutor Mode|wait:800"
py scripts/app-screens/capture.py k_qbank        "theme=dark&nav=qbank"
py scripts/app-screens/capture.py k_mcq          "theme=dark&nav=qbank" "Anaesthesiology|wait:500|Airway management|wait:600|nth:0:Try again|wait:1200|Closure of semilunar valves|Submit answer|wait:1200"
py scripts/app-screens/capture.py k_flash        "theme=dark&nav=flash"
py scripts/app-screens/capture.py k_flash_front  "theme=dark&nav=flash" "Anaesthesiology|wait:500|Cardiac cycle|wait:700|nth:0:Start|wait:1200"
py scripts/app-screens/capture.py k_flash_back   "theme=dark&nav=flash" "Anaesthesiology|wait:500|Cardiac cycle|wait:700|nth:0:Start|wait:1200|Flip card|wait:900"
py scripts/app-screens/capture.py k_dash         "theme=dark&nav=dash"
py scripts/app-screens/capture.py k_case_list    "theme=dark&nav=cases" "General Medicine|wait:600|Cardiology|wait:900"
py scripts/app-screens/capture.py k_case_intro   "theme=dark&nav=cases" "General Medicine|wait:600|Cardiology|wait:600|Acute breathlessness|wait:1500"
py scripts/app-screens/capture.py k_case_step    "theme=dark&nav=cases" "General Medicine|wait:600|Cardiology|wait:600|Acute breathlessness|wait:1500|Start Case|wait:1500|Irregular, rapid palpitations|Breathlessness on exertion|wait:600"
py scripts/app-screens/capture.py k_guided       "theme=dark" "Start a guided lesson|wait:1800"
py scripts/app-screens/capture.py k_viva         "theme=dark&nav=viva"
```

Then convert each PNG in `app-captures/` to `public/app/<name>.webp` at 600 px wide (sharp: `resize({width:600}).webp({quality:86})`), using the names in `AppScreen.tsx`. `.kit/` and `app-captures/` are scratch folders; do not commit them.
