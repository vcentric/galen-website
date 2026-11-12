import Hero from "@/app/components/Hero";
import TrustedBy from "@/app/components/TrustedBy";
import Features from "@/app/components/Features";
import Testimonials from "@/app/components/Testimonials";
import Comparison from "@/app/components/Comparison";
import FAQ from "@/app/components/FAQ";
import { FinalCTA } from "@/app/components/FinalCTA";
import JsonLd from "@/app/components/v2/JsonLd";
import { buildMetadata, softwareAppLd } from "@/lib/seo";

// Legacy home, still rendering the v1 sections. Rebuild from docs/v2/PAGE_BLUEPRINTS.md (task P1).
export const metadata = buildMetadata({
  title: "GalenAI: AI Tutor and Study App for MBBS Students",
  description:
    "Ask any MBBS doubt and get it explained in seconds. AI tutor, question bank, flashcards and clinical cases in one app, built around the NMC CBME curriculum.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={softwareAppLd()} />
      <Hero />
      <Features />
      <Testimonials />
      <Comparison />
      <FAQ />
      <FinalCTA />
    </>
  );
}
