import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

// Server layout so this client-rendered route gets its own title, description and canonical.
export const metadata = buildMetadata({
  title: "Team",
  description:
    "Meet the team behind GalenAI: doctors, medical educators and engineers building AI for medical colleges in India.",
  path: "/team",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
