import Navbar from "@/app/components/v2/Navbar";
import Footer from "@/app/components/v2/Footer";
import NotFound from "./(site)/not-found";

export const metadata = { title: "Page not found | GalenAI", robots: { index: false, follow: true } };

/**
 * An address that matches no route never reaches the (site) layout, so without this file the
 * framework shows its bare default 404. This gives it the designed page with the site's navbar and footer.
 */
export default function RootNotFound() {
  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
