import type { ReactNode } from "react";

/**
 * App screens drawn in CSS in the app's dark theme, for screens the mobile kit cannot supply
 * (the college calendar, and the inside of a guided lesson). All wording is from the approved
 * How to Use screenshots (public/how-to-use/img/d_*.webp). Sized by `width`; everything inside scales with it.
 */
export function DrawPhone({ width = 260, label, children }: { width?: number; label: string; children: ReactNode }) {
  return (
    <div className="dphone" role="img" aria-label={label} style={{ "--w": `${width}px` } as React.CSSProperties}>
      <div className="dphone-screen" aria-hidden>
        <i className="dphone-island" />
        {children}
      </div>
    </div>
  );
}

const Codes = ({ codes }: { codes: string[] }) => (
  <p className="dp-codes">
    {codes.map((c) => (
      <span key={c}>{c}</span>
    ))}
  </p>
);

function LessonHead({ active }: { active: 0 | 1 }) {
  return (
    <>
      <p className="dp-back">‹ Calendar</p>
      <span className="dp-pill">Lecture</span>
      <p className="dp-h">Cardiac cycle and pressure-volume loops</p>
      <p className="dp-meta">Mon 28 Sep · 9:00 AM · Dr. Meera Iyer</p>
      <p className="dp-seg">
        {["Must know", "Good to know", "Nice to know"].map((t, i) => (
          <span key={t} data-on={i === active ? "" : undefined}>
            {t}
          </span>
        ))}
      </p>
    </>
  );
}

export function LessonMustScreen() {
  return (
    <>
      <LessonHead active={0} />
      <div className="dp-card">
        <p className="dp-eyebrow">Must know</p>
        <p className="dp-card-h">Phases of the cardiac cycle</p>
        <p className="dp-text">
          Isovolumetric contraction begins with mitral valve closure (S1). Pressure rises with no change in volume until it passes aortic pressure
          (~80 mmHg) and the aortic valve opens.
        </p>
        <ul className="dp-list">
          <li>Name the four phases in order</li>
          <li>Link S1 and S2 to valve events</li>
          <li>Read pressures off the Wiggers diagram</li>
        </ul>
        <Codes codes={["PY5.1", "PY5.4", "PY5.7"]} />
      </div>
    </>
  );
}

export function LessonGoodScreen() {
  return (
    <>
      <LessonHead active={1} />
      <div className="dp-card">
        <p className="dp-eyebrow">Good to know</p>
        <p className="dp-card-h">The pressure-volume loop</p>
        <p className="dp-text">One heartbeat traced as LV pressure against LV volume. Loop width is stroke volume; the area inside is stroke work.</p>
        <ul className="dp-list">
          <li>Mark the four valve events on the loop</li>
          <li>Predict shifts with preload and afterload</li>
        </ul>
        <Codes codes={["PY5.4"]} />
      </div>
      <p className="dp-sec">From today&apos;s class</p>
      <div className="dp-rows">
        <p>
          <b>Cardiac cycle · 12 slides</b>
          <span>Slides · from Dr. Meera Iyer</span>
          <em>New</em>
        </p>
        <p>
          <b>Valve events mind map</b>
          <span>Mind map · 24 nodes</span>
        </p>
      </div>
    </>
  );
}

export function LessonQuizScreen() {
  return (
    <>
      <p className="dp-quiz-top">
        <span>✕</span>
        <b>Cardiac cycle self check</b>
        <span>3 / 20</span>
      </p>
      <i className="dp-progress" />
      <p className="dp-quiz-tag">
        <span>PY5.7</span> Heart sounds
      </p>
      <p className="dp-quiz-q">The second heart sound (S2) is produced by:</p>
      <ul className="dp-opts">
        <li>Closure of AV valves</li>
        <li>Opening of semilunar valves</li>
        <li>Closure of semilunar valves</li>
        <li>Rapid ventricular filling</li>
      </ul>
    </>
  );
}

const DAYS: [string, string][] = [
  ["Mon", "28"],
  ["Tue", "29"],
  ["Wed", "30"],
  ["Thu", "1"],
  ["Fri", "2"],
  ["Sat", "3"],
];

export function CalendarScreen() {
  return (
    <>
      <p className="dp-cal-h">Calendar</p>
      <p className="dp-meta">MBBS · 1st Year · Batch A</p>
      <p className="dp-days">
        {DAYS.map(([d, n], i) => (
          <span key={d} data-on={i === 0 ? "" : undefined}>
            {d}
            <b>{n}</b>
          </span>
        ))}
      </p>
      <p className="dp-sec">Today</p>
      <div className="dp-cal">
        <p data-new="">
          <time>9:00</time>
          <b>Cardiac cycle</b>
          <span>Lecture · LT-2 · Dr. Meera Iyer</span>
          <span className="dp-cal-att">12 slides · 20 Qs · 3 files</span>
          <em>New</em>
        </p>
        <p>
          <time>11:00</time>
          <b>Cardiac output and venous return</b>
          <span>SGD · Room 114 · Dr. Meera Iyer</span>
        </p>
        <p>
          <time>2:00</time>
          <b>Regulation of blood pressure</b>
          <span>Lecture · Room 114 · Dr. Leela George</span>
        </p>
        <p>
          <time>3:00</time>
          <b>ECG basics, bedside</b>
          <span>Clinical · Ward 3</span>
        </p>
      </div>
    </>
  );
}
