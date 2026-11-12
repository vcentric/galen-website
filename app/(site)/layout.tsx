import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

/** Chrome for the main site. Ad landing pages in app/(go) do not use this. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen">
        {children}
        <Footer />
      </main>
    </>
  );
}
