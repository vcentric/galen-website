/**
 * QR block from the design system: rounded white box with charcoal border, a specific
 * payoff line, and the hand-drawn orange arrow pointing at the code.
 * QR SVGs live in public/qr/ and are generated with segno (error level M, #2e2e2e).
 * Every QR must promise a specific payoff ("Scan. Ask anything."), never "Scan me".
 */
export default function QrBlock({
  src = "/qr/download.svg",
  lead = "Scan.",
  payoff = "anything.",
  payoffPrefix = "Ask",
  size = 148,
  big = false,
  className = "",
}: {
  src?: string;
  lead?: string;
  payoffPrefix?: string;
  payoff?: string;
  size?: number;
  big?: boolean; // hero treatment: larger payoff line and arrow to match a larger code
  className?: string;
}) {
  return (
    <div className={`flex items-center ${big ? "gap-6" : "gap-4"} ${className}`}>
      <p className={`h3 !leading-[1] ${big ? "!text-[2rem]" : "!text-[1.35rem]"}`}>
        {lead}
        <br />
        {payoffPrefix} <span className="acc">{payoff}</span>
      </p>
      {/* Hand-drawn curved arrow */}
      <svg width={big ? 76 : 54} height={big ? 56 : 40} viewBox="0 0 54 40" fill="none" aria-hidden className="shrink-0">
        <path d="M3 8c10-6 26-6 36 6 4 5 6 11 6 17" stroke="#eb602d" strokeWidth="3" strokeLinecap="round" />
        <path d="M37 26l8 8 6-10" stroke="#eb602d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className={`shrink-0 border-[3px] border-[#2e2e2e] bg-white ${big ? "rounded-[22px] p-4" : "rounded-[18px] p-3"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="QR code to download GalenAI" width={size} height={size} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
