import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

// Server layout so this client-rendered route gets its own title, description and canonical.
export const metadata = buildMetadata({
  title: "AI for Medical Colleges: Students, Faculty and CBME Reports",
  description:
    "GalenAI brings students, faculty and college administration onto one platform built around the NMC CBME framework. Students learn smarter. Faculty teach easier.",
  path: "/institutions",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
