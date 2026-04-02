"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/lib/blogUtils";
import BlogCard from "../../components/blog/BlogCard";

interface TOCItem {
  id: string;
  text: string;
  level: string;
}

export default function BlogPostClient() {
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
        if (rect.top <= 120) {
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
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-primary text-2xl font-bold text-dark mb-4">
            Post not found
          </h2>
          <Link href="/blog" className="text-orange font-bold flex items-center gap-2 justify-center no-underline hover:underline">
            <ArrowLeftIcon className="w-4 h-4" /> Back to blog
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
        // We could use a toast here
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
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
    <div className="min-h-screen bg-bg-primary">
      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-md border-b border-black/5 px-8 py-5 pt-28 max-[768px]:px-6 max-[768px]:pt-24">
        <div className="max-w-[1240px] mx-auto flex items-center gap-3 font-primary text-[0.85rem] font-bold uppercase tracking-wider text-text-muted">
          <Link href="/blog" className="text-text-muted no-underline transition-colors duration-200 hover:text-orange">
            Blog
          </Link>
          <span className="text-black/10">/</span>
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-text-muted no-underline transition-colors duration-200 hover:text-orange"
          >
            {post.category}
          </Link>
          <span className="text-black/10">/</span>
          <span className="text-orange whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-[400px]">
            {post.title}
          </span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-[clamp(1.5rem,5vw,3rem)] py-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        <article className="min-w-0">
          {/* Header */}
          <header className="mb-12">
            <span className="inline-block bg-orange/10 text-orange font-primary text-[0.7rem] font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-8 border border-orange/10">
              {post.category}
            </span>
            <h1 className="font-primary text-[clamp(2rem,5vw,3.5rem)] font-medium text-dark leading-[1.1] mb-8 tracking-[-0.03em]">
              {post.title}
            </h1>
            <p className="font-secondary text-[clamp(1.1rem,2vw,1.35rem)] text-text-secondary leading-[1.6] mb-8 italic">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 font-secondary text-[0.9rem] text-text-muted font-medium">
              <span className="text-dark font-bold underline decoration-orange/30 decoration-2 underline-offset-4">{post.author}</span>
              <span className="text-black/10">•</span>
              <span>{formatDate(post.date)}</span>
              <span className="text-black/10">•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* Cover Image */}
          <div className="rounded-[2.5rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5">
            <img src={post.coverImage} alt={post.title} className="w-full h-auto block" />
          </div>

          {/* Content Body */}
          <div
            className="blog-content font-secondary text-[1.15rem] text-dark leading-[1.8] max-w-[800px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Buttons */}
          <div className="mt-20 pt-12 border-t border-black/5">
            <h4 className="font-primary text-[1rem] font-bold text-dark uppercase tracking-widest mb-6">Share this insights</h4>
            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'copy', label: 'Copy Link', icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )},
                { id: 'linkedin', label: 'LinkedIn', icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                  </svg>
                )},
                { id: 'twitter', label: 'Twitter', icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => handleShare(btn.id)}
                  className="flex items-center gap-2.5 font-primary text-[0.8rem] font-bold text-text-secondary bg-white border border-black/5 rounded-xl px-5 py-3 hover:border-orange/30 hover:text-orange transition-all duration-300 shadow-sm"
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:block">
          <div className="sticky top-28 flex flex-col gap-8">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
                <h4 className="font-primary text-[0.7rem] font-bold text-dark uppercase tracking-widest mb-6 pb-4 border-b border-black/5">
                  Table of Contents
                </h4>
                <nav className="flex flex-col gap-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`font-primary text-[0.85rem] no-underline py-2.5 px-4 rounded-xl transition-all duration-300 ${
                        item.level === "h3" ? "ml-4 text-[0.8rem]" : ""
                      } ${
                        activeHeading === item.id
                          ? "bg-orange/5 text-orange font-bold"
                          : "text-text-muted hover:text-orange hover:bg-orange/5"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          window.scrollTo({ top: element.offsetTop - 120, behavior: "smooth" });
                        }
                      }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Premium CTA Card */}
            <div className="relative group overflow-hidden bg-dark rounded-[2rem] p-8 text-center border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange/20 to-transparent opacity-50"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center mb-6">
                  <ArrowUpRightIcon className="w-7 h-7 text-orange" strokeWidth={2.5} />
                </div>
                <h4 className="font-primary text-[1.4rem] font-medium text-white mb-3">Master Medicine <br/> with GalenAI</h4>
                <p className="font-secondary text-[0.95rem] leading-relaxed text-white/60 mb-8">
                  Get personalized guidance and understanding for your medical journey.
                </p>
                <Link
                  href="/qr"
                  className="w-full bg-orange text-white font-primary text-[0.95rem] font-bold py-4 rounded-2xl no-underline transition-all duration-300 hover:bg-orange/90 hover:scale-[1.02] shadow-xl shadow-orange/20"
                >
                  Try GalenAI Free
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white border-t border-black/5 px-8 py-24 mt-16 max-[768px]:px-6">
          <div className="max-w-[1240px] mx-auto">
            <h3 className="font-primary text-[2rem] font-medium text-dark mb-12 tracking-[-0.02em]">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
