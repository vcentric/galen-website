"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/lib/blogUtils";
import BlogCard from "../../components/blog/BlogCard";

interface TOCItem {
  id: string;
  text: string;
  level: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeHeading, setActiveHeading] = useState("");
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) {
      const content = document.querySelector(".blog-content");
      if (content) {
        const headings = content.querySelectorAll("h2, h3");
        headings.forEach((heading, index) => {
          heading.id = `heading-${index}`;
        });
      }
    }

    const handleScroll = () => {
      const headings = document.querySelectorAll(".blog-content h2, .blog-content h3");
      let current = "";
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });
      setActiveHeading(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-bold text-foreground mb-4">
            Post not found
          </h2>
          <Link href="/blog" className="text-cta font-semibold">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = post.title;

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
    }
  };

  const generateTOC = (): TOCItem[] => {
    if (typeof window === "undefined") return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    const headings = doc.querySelectorAll("h2, h3");
    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent || "",
      level: heading.tagName.toLowerCase(),
    }));
  };

  const toc = generateTOC();

  return (
    <div className="min-h-screen bg-surface-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-black/[0.06] px-8 py-5 pt-24 max-[768px]:px-6 max-[768px]:py-4 max-[768px]:pt-20">
        <div className="max-w-[1200px] mx-auto flex items-center gap-3 font-sans text-[0.9rem] max-[768px]:text-[0.85rem]">
          <Link
            href="/blog"
            className="text-foreground/60 no-underline transition-colors duration-200 hover:text-cta"
          >
            Blog
          </Link>
          <span className="text-foreground/20">→</span>
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-foreground/60 no-underline transition-colors duration-200 hover:text-cta"
          >
            {post.category}
          </Link>
          <span className="text-foreground/20">→</span>
          <span className="text-foreground font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]">
            {post.title}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-12 grid grid-cols-[1fr_300px] gap-16 max-[1024px]:grid-cols-1 max-[1024px]:gap-12 max-[768px]:px-6 max-[768px]:py-10">
        <article>
          {/* Header */}
          <header className="mb-10">
            <span className="inline-block bg-white/90 backdrop-blur-[12px] text-cta font-sans text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-[0.05em] mb-6 border border-cta/20 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              {post.category}
            </span>
            <h1 className="font-sans text-[3rem] font-semibold text-foreground leading-[1.2] mb-5 tracking-[-0.02em] max-[768px]:text-[2.25rem] max-[480px]:text-[1.875rem]">
              {post.title}
            </h1>
            <p className="font-sans text-[1.25rem] text-foreground/60 leading-[1.7] mb-6 max-[768px]:text-[1.125rem] max-[480px]:text-base">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 font-sans text-[0.95rem] text-foreground/40">
              <span>{post.author}</span>
              <span className="text-foreground/20">•</span>
              <span>{formatDate(post.date)}</span>
              <span className="text-foreground/20">•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden mb-12 shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto block"
            />
          </div>

          {/* Content Body */}
          <div
            className="blog-content font-sans text-[1.125rem] text-foreground leading-[1.8] max-[768px]:text-[1.05rem] max-[480px]:text-base"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Buttons */}
          <div className="mt-16 pt-12 border-t border-[#e5e5e5]">
            <h4 className="font-sans text-[1.125rem] font-bold text-foreground mb-4">
              Share this article
            </h4>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-2 font-sans text-[0.95rem] font-medium text-foreground/60 bg-white border border-[#e5e5e5] rounded-[0.625rem] px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-surface hover:border-cta hover:text-cta max-[480px]:text-[0.875rem] max-[480px]:px-4 max-[480px]:py-[0.625rem]"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="9"
                    y="9"
                    width="13"
                    height="13"
                    rx="2"
                    ry="2"
                  />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Link
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center gap-2 font-sans text-[0.95rem] font-medium text-foreground/60 bg-white border border-[#e5e5e5] rounded-[0.625rem] px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-surface hover:border-cta hover:text-cta max-[480px]:text-[0.875rem] max-[480px]:px-4 max-[480px]:py-[0.625rem]"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 font-sans text-[0.95rem] font-medium text-foreground/60 bg-white border border-[#e5e5e5] rounded-[0.625rem] px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-surface hover:border-cta hover:text-cta max-[480px]:text-[0.875rem] max-[480px]:px-4 max-[480px]:py-[0.625rem]"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="sticky top-8 h-fit max-[1024px]:static max-[1024px]:grid max-[1024px]:grid-cols-2 max-[1024px]:gap-8 max-[768px]:grid-cols-1">
          {/* Table of Contents */}
          {toc.length > 0 && (
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.06]">
              <h4 className="font-sans text-[0.95rem] font-bold text-foreground uppercase tracking-[0.05em] mb-4 pb-3 border-b-2 border-[#f0f0f0]">
                Table of Contents
              </h4>
              <nav className="flex flex-col">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`font-sans text-[0.9rem] no-underline py-3 px-3 border-l-[3px] border-b border-b-surface transition-all duration-200 hover:text-cta hover:border-l-cta last:border-b-0 ${
                      item.level === "h3" ? "pl-6 text-[0.85rem]" : ""
                    } ${
                      activeHeading === item.id
                        ? "text-cta border-l-cta font-semibold"
                        : "text-foreground/60 border-l-transparent"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        const yOffset = -120;
                        const y = element.offsetTop + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* CTA Card */}
          <div className="bg-cta/15 backdrop-blur-[20px] border border-cta/25 rounded-[1.25rem] p-8 text-center shadow-[0_8px_24px_rgba(235,96,45,0.12),inset_0_1px_0_rgba(255,255,255,0.3)]">
            <h4 className="font-sans text-[1.25rem] font-bold text-cta mb-3">
              Try GalenAI
            </h4>
            <p className="font-sans text-[0.95rem] leading-relaxed text-foreground/60 mb-6">
              Master medicine with AI-powered learning tailored to your needs.
            </p>
            <Link
              href="/"
              className="inline-block bg-cta text-white font-sans text-base font-semibold px-7 py-[0.875rem] rounded-xl no-underline transition-all duration-200 hover:bg-cta-hover hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(235,96,45,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white px-8 py-16 mt-16 max-[768px]:px-6 max-[768px]:py-12">
          <div className="max-w-[1200px] mx-auto">
            <h3 className="font-sans text-[2rem] font-bold text-foreground mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-3 gap-8 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
