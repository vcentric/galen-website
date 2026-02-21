import type { Metadata } from "next";
import { Space_Grotesk, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const space = Space_Grotesk({
  variable: "--font-space-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GalenAI - Your Personal AI Medical Companion",
  description:
    "GalenAI is your AI medical mentor that explains, tests, and guides you, so you spend less time planning and more time understanding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${space.variable} ${raleway.variable} antialiased`}
      >
        <ScrollToTop />
        <div className="min-h-screen w-full ">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
