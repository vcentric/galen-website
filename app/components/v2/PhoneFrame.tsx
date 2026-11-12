import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Phone frame from the design system: charcoal body, rounded, notch pill, soft shadow.
 * Fixed aspect ratio (600 x 1281 screens) so nothing shifts while images load.
 * Pass `src` for a raw app screen (public/how-to-use/img/*), or children for coded UI.
 * Note: public/brand/ui/phone_*.webp already include a frame; render those with <Image>.
 */
export default function PhoneFrame({
  src,
  alt = "",
  priority = false,
  width = 300,
  className = "",
  notch,
  children,
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  width?: number;
  className?: string;
  /** Draw the notch pill. Default: only for coded UI; how-to screenshots (s_*) carry their own. */
  notch?: boolean;
  children?: ReactNode;
}) {
  const showNotch = notch ?? !(src && /\/s_[a-z_]+\.webp$/.test(src));
  return (
    <div
      className={`relative shrink-0 rounded-[44px] bg-[#111] p-[10px] shadow-[0_30px_80px_rgba(46,46,46,0.28)] ${className}`}
      style={{ width }}
    >
      <div className="relative overflow-hidden rounded-[34px] bg-[#0f0f10]" style={{ aspectRatio: "600 / 1281" }}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={`${width}px`} priority={priority} className="object-cover object-top" />
        ) : (
          children
        )}
        {showNotch && (
          <span aria-hidden className="absolute left-1/2 top-2.5 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        )}
      </div>
    </div>
  );
}
