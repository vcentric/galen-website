// Blog Posts Content Collection — TypeScript version

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readingTime: number;
  featured: boolean;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to study Pharmacology without drowning",
    slug: "study-pharmacology-without-drowning",
    excerpt:
      "A calm system to build drug reasoning using active recall and clinical anchors. Learn how to master pharmacology without memorizing thousands of drug names.",
    coverImage: "/blog-images/pharma.svg",
    category: "Study Systems",
    tags: ["pharmacology", "active-recall", "study-methods"],
    author: "Team GalenAI",
    date: "2026-01-20",
    readingTime: 8,
    featured: true,
    content: `
      <h2>The real problem with pharmacology</h2>
      <p>Most medical students approach pharmacology as a memorization marathon. They try to cram drug names, mechanisms, side effects, and interactions into their brain through sheer repetition. This approach leads to burnout, confusion, and poor retention.</p>

      <h2>A better approach: Clinical anchors</h2>
      <p>Instead of memorizing isolated facts, anchor each drug to a clinical scenario. When you learn about ACE inhibitors, don't just memorize "lisinopril inhibits ACE." Instead, picture a patient with hypertension and heart failure, understand why blocking ACE helps, and connect it to the dry cough side effect.</p>

      <div class="callout callout-tip">
        <strong>Clinical Pearl:</strong> Always ask "Why would I prescribe this?" before memorizing mechanism of action.
      </div>

      <h2>Active recall over passive reading</h2>
      <p>After reading about a drug class, close your textbook and try to explain it to yourself. Use flashcards with clinical scenarios, not just drug names. GalenAI's adaptive flashcard system does exactly this - it presents drugs in clinical contexts and tests your reasoning, not just your memory.</p>

      <h2>The 3-step pharmacology system</h2>
      <ol>
        <li><strong>Understand the pathophysiology first</strong> - Know the disease before the drug</li>
        <li><strong>Learn drug classes, not individual drugs</strong> - Master beta-blockers as a concept</li>
        <li><strong>Practice with clinical cases</strong> - Apply knowledge in realistic scenarios</li>
      </ol>

      <h2>Common mistakes to avoid</h2>
      <ul>
        <li>Starting with drug lists instead of disease understanding</li>
        <li>Passive reading without active recall</li>
        <li>Ignoring side effects until exam time</li>
        <li>Not connecting drugs to clinical decision-making</li>
      </ul>

      <div class="callout callout-summary">
        <strong>Summary:</strong> Pharmacology becomes manageable when you build clinical reasoning frameworks instead of memorizing isolated facts. Use active recall, clinical anchors, and spaced repetition to build lasting understanding.
      </div>
    `,
  },
  {
    id: 2,
    title: "CBME Curriculum Guide: What changed in 2025",
    slug: "cbme-curriculum-2025-changes",
    excerpt:
      "A comprehensive breakdown of the latest CBME curriculum updates and what they mean for your medical education journey.",
    coverImage: "/blog-images/cbme.svg",
    category: "CBME Guide",
    tags: ["cbme", "curriculum", "medical-education"],
    author: "Dr. Priya Sharma",
    date: "2026-01-15",
    readingTime: 10,
    featured: false,
    content: `
      <h2>Understanding CBME 2025 updates</h2>
      <p>The Competency-Based Medical Education (CBME) curriculum has undergone significant revisions in 2025. These changes reflect evolving healthcare needs and aim to produce more clinically competent doctors.</p>

      <h2>Key changes at a glance</h2>
      <ul>
        <li>Increased emphasis on clinical reasoning over rote memorization</li>
        <li>New assessment patterns focusing on competency milestones</li>
        <li>Integration of AI-assisted learning tools in curriculum</li>
        <li>Enhanced focus on communication skills and patient counseling</li>
      </ul>

      <h2>What this means for you</h2>
      <p>The shift towards competency-based assessment means your study approach needs to evolve. Focus on understanding clinical scenarios, developing diagnostic reasoning, and practicing patient communication.</p>

      <div class="callout callout-tip">
        <strong>Pro Tip:</strong> Start maintaining a clinical case diary to track your competency development across different domains.
      </div>

      <h2>How GalenAI aligns with CBME 2025</h2>
      <p>GalenAI's learning system is built around CBME principles. Our platform helps you track competencies, practice clinical reasoning, and prepare for the new assessment patterns.</p>
    `,
  },
  {
    id: 3,
    title: "Active Recall vs Passive Reading: The science behind effective learning",
    slug: "active-recall-vs-passive-reading",
    excerpt:
      "Discover why active recall is scientifically proven to be more effective than passive reading, and how to implement it in your medical studies.",
    coverImage: "/blog-images/active-recall.svg",
    category: "Study Systems",
    tags: ["active-recall", "learning-science", "study-methods"],
    author: "Team GalenAI",
    date: "2026-01-10",
    readingTime: 6,
    featured: false,
    content: `
      <h2>The illusion of passive reading</h2>
      <p>Reading your textbook multiple times feels productive, but research shows it's one of the least effective study methods. You might feel like you're learning, but you're actually just becoming familiar with the text.</p>

      <h2>What is active recall?</h2>
      <p>Active recall is the practice of retrieving information from memory without looking at your notes. Instead of re-reading, you actively try to remember and explain concepts.</p>

      <h2>The science behind it</h2>
      <p>Studies show that active recall strengthens neural pathways and improves long-term retention by up to 50% compared to passive reading. The effort of retrieval is what makes learning stick.</p>

      <div class="callout callout-tip">
        <strong>Try this:</strong> After reading a topic, close your book and write everything you remember. Then check what you missed.
      </div>

      <h2>Implementing active recall in medicine</h2>
      <ul>
        <li>Use flashcards with clinical scenarios</li>
        <li>Practice explaining concepts to peers</li>
        <li>Solve MCQs without looking at notes first</li>
        <li>Use spaced repetition systems like GalenAI</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: "Clinical reasoning frameworks for MBBS students",
    slug: "clinical-reasoning-frameworks-mbbs",
    excerpt:
      "Master the art of clinical reasoning with proven frameworks that help you think like an experienced clinician.",
    coverImage: "/blog-images/clinical-reasoning.svg",
    category: "Clinical Reasoning",
    tags: ["clinical-reasoning", "diagnosis", "mbbs"],
    author: "Dr. Rajesh Kumar",
    date: "2026-01-05",
    readingTime: 12,
    featured: false,
    content: `
      <h2>Why clinical reasoning matters</h2>
      <p>Clinical reasoning is the cognitive process that allows doctors to make accurate diagnoses and treatment decisions. It's not just about knowing facts - it's about applying knowledge in real patient scenarios.</p>

      <h2>The SNAPPS framework</h2>
      <p>SNAPPS is a structured approach to clinical case presentation:</p>
      <ol>
        <li><strong>S</strong>ummarize the case</li>
        <li><strong>N</strong>arrow the differential</li>
        <li><strong>A</strong>nalyze the differential</li>
        <li><strong>P</strong>robe preceptor about uncertainties</li>
        <li><strong>P</strong>lan management</li>
        <li><strong>S</strong>elect case-related issues for self-study</li>
      </ol>

      <div class="callout callout-tip">
        <strong>Practice tip:</strong> Use SNAPPS for every clinical case you encounter, even in textbooks.
      </div>

      <h2>Pattern recognition vs analytical reasoning</h2>
      <p>Experienced clinicians use both. Pattern recognition comes with exposure to many cases. Analytical reasoning helps when patterns don't fit. GalenAI helps you develop both through varied case presentations.</p>

      <h2>Common reasoning errors to avoid</h2>
      <ul>
        <li>Premature closure - stopping after first diagnosis</li>
        <li>Anchoring bias - fixating on initial impression</li>
        <li>Availability bias - overweighting recent cases</li>
        <li>Confirmation bias - seeking only supporting evidence</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "How GalenAI helps with NEET PG preparation",
    slug: "galenai-neet-pg-preparation",
    excerpt:
      "A comprehensive guide to using GalenAI's AI-powered platform to ace your NEET PG exam with smart study strategies.",
    coverImage: "/blog-images/neet-pg.svg",
    category: "Exam Strategy",
    tags: ["neet-pg", "exam-prep", "galenai"],
    author: "Team GalenAI",
    date: "2025-12-28",
    readingTime: 9,
    featured: false,
    content: `
      <h2>The NEET PG challenge</h2>
      <p>NEET PG is one of India's most competitive medical entrance exams. With thousands of aspirants and limited seats, smart preparation is essential. Traditional methods of reading textbooks and solving random MCQs often fall short.</p>

      <h2>How GalenAI transforms NEET PG prep</h2>
      <p>GalenAI uses AI to create a personalized study plan based on your strengths, weaknesses, and exam timeline. Instead of generic study schedules, you get adaptive learning that focuses on your gaps.</p>

      <h3>Key features for NEET PG</h3>
      <ul>
        <li><strong>Subject-wise weak area identification</strong> - Know exactly what to focus on</li>
        <li><strong>Previous year pattern analysis</strong> - Understand question trends</li>
        <li><strong>Adaptive MCQ practice</strong> - Questions adjust to your level</li>
        <li><strong>Spaced repetition</strong> - Review topics at optimal intervals</li>
        <li><strong>Clinical case-based learning</strong> - Build reasoning, not just recall</li>
      </ul>

      <div class="callout callout-tip">
        <strong>Success Strategy:</strong> Start with GalenAI's diagnostic test to identify your baseline, then follow the AI-generated study plan consistently.
      </div>

      <h2>Study timeline recommendations</h2>
      <table>
        <thead>
          <tr>
            <th>Timeline</th>
            <th>Focus Areas</th>
            <th>GalenAI Features to Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>6+ months</td>
            <td>Concept building + MCQs</td>
            <td>Learning paths + Flashcards</td>
          </tr>
          <tr>
            <td>3-6 months</td>
            <td>Revision + Practice</td>
            <td>Adaptive MCQs + Weak areas</td>
          </tr>
          <tr>
            <td>1-3 months</td>
            <td>Mock tests + Revision</td>
            <td>Full-length tests + Quick revision</td>
          </tr>
        </tbody>
      </table>

      <h2>Success stories</h2>
      <p>Students using GalenAI have reported 30-40% improvement in mock test scores within 2 months. The key is consistent daily practice with AI-guided focus on weak areas.</p>

      <div class="callout callout-summary">
        <strong>Bottom line:</strong> GalenAI's AI-powered approach helps you study smarter, not harder. Focus on your weak areas, build clinical reasoning, and track progress systematically.
      </div>
    `,
  },
];

export const getAllCategories = (): string[] => {
  const categories = [...new Set(blogPosts.map((post) => post.category))];
  return categories.sort();
};

export const getAllTags = (): string[] => {
  const tags = [...new Set(blogPosts.flatMap((post) => post.tags))];
  return tags.sort();
};
