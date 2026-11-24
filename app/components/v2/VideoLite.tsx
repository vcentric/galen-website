"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Lite YouTube embed: shows a poster and loads the player only on click.
 * Keeps the YouTube player script off the initial load, so LCP and INP stay fast.
 * Always pair it with a visible transcript or summary below (crawlable text)
 * and with videoLd() from lib/seo.ts.
 */
export default function VideoLite({
  youtubeId,
  title,
  poster,
}: {
  youtubeId?: string;
  title: string;
  poster?: string;
}) {
  const [play, setPlay] = useState(false);
  if (!youtubeId) {
    return (
      <div className="blueprint aspect-video grid place-items-center text-center">
        <span>
          <b>Video slot</b>
          <br />
          {title}. YouTube link pending from Varun.
        </span>
      </div>
    );
  }
  return (
    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#2e2e2e]">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            trackEvent("video_start", { video_title: title.slice(0, 100), video_id: youtubeId });
            setPlay(true);
          }}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster ?? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#eb602d] text-3xl text-white">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
