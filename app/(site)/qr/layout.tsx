import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

// Server layout so this client-rendered route gets its own title, description and canonical.
export const metadata = buildMetadata({
  title: "Opening GalenAI",
  description:
    "Redirecting you to GalenAI.",
  path: "/qr",
  noindex: true,
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
