import DownloadPanel from "@/app/components/v2/DownloadPanel";
import StoreRedirect from "@/app/components/v2/StoreRedirect";

/**
 * Every in-page "download" CTA lands here.
 * Phone: redirected to its store with attribution. Desktop: QR, badges, web link.
 * (Old behaviour sent desktop visitors back to the home page.)
 */
export default function DownloadPage() {
  return (
    <div className="v2">
      <StoreRedirect source="download_page" />
      <DownloadPanel source="download_page" />
    </div>
  );
}
