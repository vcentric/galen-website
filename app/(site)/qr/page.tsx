import DownloadPanel from "@/app/components/v2/DownloadPanel";
import StoreRedirect from "@/app/components/v2/StoreRedirect";

/**
 * Target of printed QR codes (brochures, standee, pamphlets). Keep the URL stable.
 * Phone: store with attribution. Desktop: straight to the web app, as before.
 * noindex via qr/layout.tsx.
 */
export default function QrPage() {
  return (
    <div className="v2">
      <StoreRedirect source="qr_fulfillment" desktopFallback="web" />
      <DownloadPanel source="qr_page" />
    </div>
  );
}
