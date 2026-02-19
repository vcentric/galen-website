import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Metrics from "./components/Metrics";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Comparison from "./components/Comparison";
import WhatsAppContact from "./components/WhatsAppContact";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Metrics />
      <Features />
      <Testimonials />
      <Comparison />
      <WhatsAppContact />
      <FAQ />
      <FinalCTA />
    </>
  );
}
