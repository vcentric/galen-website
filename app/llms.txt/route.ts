import { specPages, howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import { SITE, LINKS, CONTACT } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-language map of the site for AI engines, generated from the same
 * registry as the sitemap, so it never drifts. Only live pages are listed.
 * Cheap to keep; there is no solid evidence yet that it changes citations, so do not
 * spend time polishing it.
 */
export function GET() {
  const live = specPages.filter((p) => p.status === "live");
  const line = (title: string, path: string, desc: string) => `- [${title}](${SITE.url}${path}): ${desc}`;
  const group = (heading: string, prefix: string) => {
    const rows = live.filter((p) => p.path.startsWith(prefix));
    return rows.length ? [`## ${heading}`, ...rows.map((p) => line(p.title, p.path, p.description)), ""] : [];
  };

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.defaultDescription}`,
    "",
    `${SITE.name} (${SITE.legalName}, Bengaluru, India) makes two products built around the National Medical Commission's competency-based medical education (CBME) curriculum: a student app (AI tutor, question bank, flashcards, clinical cases, guided lessons, dashboard) and a faculty and institution workspace (CBME timetable, lesson planning, AI Workspace, assessments, cohort analytics). Voice viva is coming soon.`,
    "",
    "## Core pages",
    line("Student home", "", "What GalenAI is for MBBS students and how to get the app."),
    line("For medical colleges", "/institutions", "Students, faculty and college administration on one CBME platform."),
    line("Blog", "/blog", "Articles on exam preparation, CBME and AI in medicine."),
    "",
    ...group("Features", "/features/"),
    ...group("For exams and students", "/for/"),
    ...group("Comparisons", "/vs/"),
    ...group("For institutions", "/institutions/"),
    ...(HOW_TO_LIVE
      ? [
          "## How to use",
          ...howToRoleKeys.map((r) => line(howToRoles[r].title, `/how-to-use/${r}`, howToRoles[r].description)),
          "",
        ]
      : []),
    "## Apps",
    `- Student web app: ${LINKS.app}`,
    `- Faculty platform: ${LINKS.faculty}`,
    `- iOS: ${LINKS.appStore}`,
    `- Android: ${LINKS.playStore}`,
    "",
    "## Contact",
    `- ${CONTACT.corporate} · ${CONTACT.phone} · ${CONTACT.address}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
