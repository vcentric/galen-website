import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

// Server layout so this client-rendered route gets its own title, description and canonical.
export const metadata = buildMetadata({
  title: "Download GalenAI for iPhone and Android",
  description:
    "Get the GalenAI app on the App Store or Google Play, or try it on the web. AI tutor, question bank, flashcards and clinical cases for MBBS students.",
  path: "/download",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
