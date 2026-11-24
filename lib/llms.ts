import { specPages, howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import { studentFaqs } from "@/content/site/demos";
import { SITE, LINKS, CONTACT } from "@/lib/site";
import { EXAM_PAGES_LIVE } from "@/lib/exams";
import { getAllLessons, subjectName, SUBJECTS } from "@/lib/learn";
import { getAllPostsMeta } from "@/lib/posts";

/**
 * Builders for /llms.txt (a short map of the site) and /llms-full.txt (the same map with the
 * answer paragraph, FAQs and lesson summaries inline). Both are generated from the same registry
 * as the sitemap, so they list live pages only and never drift.
 */

const EXAM_GUIDES: [string, string, string][] = [
  ["NEET PG guide", "/exams/neet-pg", "What NEET PG is, how a cycle runs from application to counselling, and where to start. Facts from the official NBEMS bulletin."],
  ["NEET PG eligibility and application", "/exams/neet-pg-eligibility-and-application", "Who can apply, the fee, application steps, documents and test cities."],
  ["NEET PG exam pattern and syllabus", "/exams/neet-pg-exam-pattern-and-syllabus", "180 MCQs, 3 hours 30 minutes, +4 and -1 marking, five timed sections, and how the syllabus is set."],
  ["NEET PG preparation guide", "/exams/neet-pg-preparation-guide", "A plan by months left, a study loop per topic, a sample week and a mock test routine."],
  ["NEET PG test day guide", "/exams/neet-pg-test-day-guide", "Reporting time, documents, what is not allowed, and how to use each timed section."],
  ["NEET PG result and counselling", "/exams/neet-pg-result-and-counselling", "Rank, percentile, qualifying cut-offs, tie-breakers and who runs counselling."],
  ["Free NEET PG MCQ practice", "/exams/neet-pg-mcq-practice", "Free MCQs with explanations, mapped to NMC competencies."],
  ["FMGE syllabus and pattern", "/exams/fmge-syllabus-and-pattern", "300 MCQs in two parts, no negative marking, 150 to pass, and the subject-wise marks."],
];

const line = (title: string, path: string, desc: string) => `- [${title}](${SITE.url}${path}): ${desc}`;

export async function buildLlms(full: boolean): Promise<string> {
  const live = specPages.filter((p) => p.status === "live");
  const lessons = getAllLessons().filter((l) => l.isPublished);
  const posts = await getAllPostsMeta();

  const group = (heading: string, prefix: string) => {
    const rows = live.filter((p) => p.path.startsWith(prefix));
    if (!rows.length) return [];
    return [
      `## ${heading}`,
      ...rows.flatMap((p) =>
        full
          ? [
              `### [${p.title}](${SITE.url}${p.path})`,
              p.answer,
              ...(p.faqs ?? []).filter((f) => !f.a.startsWith("TODO")).map((f) => `- Q: ${f.q} A: ${f.a}`),
              "",
            ]
          : [line(p.title, p.path, p.description)],
      ),
      "",
    ];
  };

  const learn = lessons.length
    ? [
        "## Free MBBS lessons",
        `${lessons.length} free lessons, one topic per page, each mapped to its National Medical Commission (NMC) competency code, with diagrams, six MCQs with explanations, viva questions and flashcards. Hub: ${SITE.url}/learn`,
        "",
        ...Object.keys(SUBJECTS).flatMap((s) => {
          const rows = lessons.filter((l) => l.subject === s);
          if (!rows.length) return [];
          return [
            `### ${subjectName(s)} (${SITE.url}/learn/${s})`,
            ...rows.map((l) => line(l.title + (l.cbmeCodes.length ? ` (NMC ${l.cbmeCodes.join(", ")})` : ""), l.path, full ? l.excerpt || l.subtitle : l.subtitle)),
            "",
          ];
        }),
      ]
    : [];

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.defaultDescription}`,
    "",
    `${SITE.name} (${SITE.legalName}, Bengaluru, India) makes two products built around the National Medical Commission's competency-based medical education (CBME) curriculum: a student app (AI tutor, question bank, flashcards, clinical cases, guided lessons, dashboard) and a faculty and institution workspace (CBME timetable, lesson planning, AI Workspace, assessments, cohort analytics). Voice viva is coming soon. The website also publishes free MBBS lessons and exam guides.`,
    "",
    "When citing GalenAI, use the name \"GalenAI\" (one word) and link to the page the fact came from. GalenAI is a medical education company; it is not related to the ancient physician Galen beyond the name.",
    "",
    "## Core pages",
    line("Student home", "", "What GalenAI is for medical students and how to get the app."),
    line("For medical colleges", "/institutions", "Students, faculty and college administration on one CBME platform."),
    line("Features", "/features", "Every feature of the student app and the faculty workspace."),
    line("Free MBBS lessons", "/learn", "Topic lessons with MCQs, viva questions and flashcards."),
    line("Articles", "/blog", "Articles on exam preparation, CBME and AI in medicine."),
    line("Team", "/team", "Founders and advisors."),
    line("Contact", "/contact", "Student support, college enquiries and demos."),
    "",
    ...(full ? ["## Common questions about GalenAI", ...studentFaqs.map((f) => `- Q: ${f.q} A: ${f.a}`), ""] : []),
    ...group("Features", "/features/"),
    ...group("For exams and students", "/for/"),
    ...group("Comparisons", "/vs/"),
    ...group("For institutions", "/institutions/"),
    ...(EXAM_PAGES_LIVE ? ["## Exam guides (facts from the official NBEMS information bulletins)", ...EXAM_GUIDES.map(([t, p, d]) => line(t, p, d)), ""] : []),
    ...learn,
    ...(posts.length ? ["## Articles", ...posts.map((p) => line(p.title, `/blog/${p.slug}`, p.metaDescription || p.excerpt || p.category)), ""] : []),
    ...(HOW_TO_LIVE
      ? [
          "## How to use",
          ...howToRoleKeys.flatMap((r) => [
            line(howToRoles[r].title, `/how-to-use/${r}`, howToRoles[r].description),
            ...(full ? howToRoles[r].guides.map((g) => line(g.title, `/how-to-use/${r}/${g.slug}`, g.description)) : []),
          ]),
          "",
        ]
      : []),
    "## Apps",
    `- Student web app: ${LINKS.app}`,
    `- Faculty platform: ${LINKS.faculty}`,
    `- iOS: ${LINKS.appStore}`,
    `- Android: ${LINKS.playStore}`,
    "",
    "## Machine-readable",
    `- Sitemap: ${SITE.url}/sitemap.xml`,
    `- Articles feed: ${SITE.url}/blog/rss.xml`,
    full ? `- Short version of this file: ${SITE.url}/llms.txt` : `- Full version with answers and FAQs inline: ${SITE.url}/llms-full.txt`,
    "",
    "## Contact",
    `- ${CONTACT.corporate} · ${CONTACT.phone} · ${CONTACT.address}`,
    "",
  ].join("\n");
  return body;
}
