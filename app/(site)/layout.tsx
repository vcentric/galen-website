import Navbar from "@/app/components/v2/Navbar";
import Footer from "@/app/components/v2/Footer";

/** Chrome for the main site. Ad landing pages in app/(go) do not use this. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
