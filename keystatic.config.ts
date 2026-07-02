import { config, fields, collection } from "@keystatic/core";
import { wrapper, block } from "@keystatic/core/content-components";
import { BLOG_CATEGORIES } from "./content/categories";

// Storage: local filesystem in dev, GitHub in prod. The override var is
// NEXT_PUBLIC_* so it resolves identically in the server reader and the client
// admin bundle (a mismatch would break the editor). Set
// NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=local to preview local mode in a prod build.
const storageKind =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND ??
  (process.env.NODE_ENV === "development" ? "local" : "github");

export default config({
  storage:
    storageKind === "local"
      ? { kind: "local" }
      : { kind: "github", repo: { owner: "vcentric", name: "galen-website" } },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*/",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publish_date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({
          label: "Subtitle",
          description: "Optional deck shown under the title on the article page.",
          multiline: true,
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Card + SEO summary. Max 160 characters.",
          multiline: true,
          validation: { isRequired: true, length: { max: 160 } },
        }),
        category: fields.select({
          label: "Category",
          options: BLOG_CATEGORIES.map((c) => ({ label: c, value: c })),
          defaultValue: BLOG_CATEGORIES[0],
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),

        // ── Author (split byline) ──
        author_name: fields.text({
          label: "Author name",
          defaultValue: "Team GalenAI",
          validation: { isRequired: true },
        }),
        author_role: fields.text({
          label: "Author role",
          description: 'Optional. e.g. "Dept of Medicine", "3rd Year MBBS, AIIMS Delhi".',
        }),
        author_type: fields.select({
          label: "Author type",
          options: [
            { label: "GalenAI Team", value: "galenai_team" },
            { label: "Founder", value: "founder" },
            { label: "Faculty", value: "faculty" },
            { label: "Student", value: "student" },
            { label: "Senior", value: "senior" },
            { label: "Guest", value: "guest" },
          ],
          defaultValue: "galenai_team",
        }),

        publish_date: fields.date({
          label: "Publish date",
          validation: { isRequired: true },
        }),
        read_time_minutes: fields.integer({
          label: "Read time (minutes)",
          description: "Leave empty to auto-calculate from content. Set to override.",
          validation: { min: 1 },
        }),

        // ── Hero ──
        hero_image: fields.image({
          label: "Hero image",
          description: "Optional. Recommended 1200×630. PNG, JPG or WebP.",
          directory: "public/blog-images",
          publicPath: "/blog-images",
        }),
        hero_image_caption: fields.text({ label: "Hero caption" }),
        hero_image_source: fields.text({ label: "Hero source / credit" }),

        // ── Flags ──
        is_editors_choice: fields.checkbox({
          label: "Editor's Choice",
          description: "Show in the featured strip above the tabs (max 2 display).",
          defaultValue: false,
        }),
        is_published: fields.checkbox({
          label: "Published",
          description: "Off = draft. Unpublished posts are hidden from the blog.",
          defaultValue: false,
        }),

        // ── Category-specific (optional; fill only when relevant) ──
        case_study_institution: fields.text({
          label: "Case study — institution",
          description: 'Case Studies only. e.g. "St. John\'s Medical College, Bengaluru".',
        }),
        case_study_outcome: fields.text({
          label: "Case study — outcome stat",
          description: "Case Studies only. One-line result. Max 100 chars.",
          validation: { length: { max: 100 } },
        }),
        partner_name: fields.text({
          label: "Partner name",
          description: "Case Studies / Company Updates. Partner organisation.",
        }),
        is_press_release: fields.checkbox({
          label: "Press release",
          description: 'Company Updates only. Shows a "Press Release" label.',
          defaultValue: false,
        }),
        is_b2b: fields.checkbox({
          label: "B2B (show Download as PDF)",
          description: "For Institutions only. Adds a Download-as-PDF button.",
          defaultValue: false,
        }),

        // ── Sources (rendered at article bottom) ──
        sources: fields.array(fields.text({ label: "Source" }), {
          label: "Sources",
          description: "One reference per line; rendered at the end of the article.",
          itemLabel: (props) => props.value,
        }),

        // ── SEO overrides ──
        meta_title: fields.text({
          label: "Meta title (SEO)",
          description: "Defaults to the post title if empty.",
        }),
        meta_description: fields.text({
          label: "Meta description (SEO)",
          description: "Defaults to the excerpt if empty.",
          multiline: true,
        }),

        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/blog-images",
              publicPath: "/blog-images",
            },
          },
          components: {
            callout: wrapper({
              label: "Callout",
              schema: {
                type: fields.select({
                  label: "Type",
                  options: [
                    { label: "Tip", value: "tip" },
                    { label: "Summary", value: "summary" },
                  ],
                  defaultValue: "tip",
                }),
              },
            }),
            statCallout: block({
              label: "Stat callout",
              description: "Big number + label in a dark box.",
              schema: {
                number: fields.text({
                  label: "Number",
                  description: 'e.g. "722", "50%", "3x".',
                  validation: { isRequired: true },
                }),
                label: fields.text({
                  label: "Label",
                  multiline: true,
                  validation: { isRequired: true },
                }),
              },
            }),
            actionBox: wrapper({
              label: "Action box",
              description: 'Titled callout box, e.g. "What you should do this week".',
              schema: {
                title: fields.text({
                  label: "Title",
                  validation: { isRequired: true },
                }),
              },
            }),
            cta: wrapper({
              label: "CTA box",
              description: "Inline call-to-action box at the end of a section.",
              schema: {},
            }),
            imageWithCaption: block({
              label: "Image with caption",
              schema: {
                src: fields.image({
                  label: "Image",
                  directory: "public/blog-images",
                  publicPath: "/blog-images",
                  validation: { isRequired: true },
                }),
                alt: fields.text({ label: "Alt text" }),
                caption: fields.text({ label: "Caption" }),
                source: fields.text({ label: "Source / credit" }),
              },
            }),
          },
        }),
      },
    }),
  },
});
