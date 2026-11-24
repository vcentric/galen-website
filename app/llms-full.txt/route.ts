import { buildLlms } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms-full.txt: the llms.txt map with each page's answer paragraph, FAQs and lesson summaries inline. */
export async function GET() {
  return new Response(await buildLlms(true), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
