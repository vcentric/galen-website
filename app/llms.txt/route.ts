import { buildLlms } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms.txt: a plain-language map of the live site for AI engines. Built in lib/llms.ts from the page registry. */
export async function GET() {
  return new Response(await buildLlms(false), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
