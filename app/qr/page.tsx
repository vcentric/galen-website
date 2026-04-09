"use client";

import { useEffect } from "react";
import { trackCTAClick } from "../../lib/analytics";
import { decorateUrl } from "../../lib/utm";

export default function QRPage() {
  useEffect(() => {
    const userAgent = (window.navigator.userAgent || "").toLowerCase();

    // Store Links
    const iosLink = "https://apps.apple.com/us/app/galenai/id6755653561";
    const androidLink = "https://play.google.com/store/apps/details?id=com.galenai.galenai";
    const desktopLink = "https://app.galenai.io";

    // Detect Android
    if (/android/i.test(userAgent)) {
      trackCTAClick("play_store");
      window.location.href = decorateUrl(androidLink);
      return;
    }

    // Detect iOS (iPhone, iPad, iPod)
    if (/iphone|ipad|ipod/i.test(userAgent)) {
      trackCTAClick("app_store");
      window.location.href = decorateUrl(iosLink);
      return;
    }

    // Default to desktop web app
    trackCTAClick("web_app");
    window.location.href = decorateUrl(desktopLink);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mb-4" />
      <h1 className="text-xl font-semibold mb-2 tracking-tight">Redirecting to GalenAI...</h1>
      <p className="text-gray-500 text-sm">Detecting your device to provide the best experience.</p>
      <div className="mt-8">
        <p className="text-xs text-gray-400 mb-2">Not redirected? Click a link below:</p>
        <div className="flex flex-col gap-3">
          <a
            href="https://apps.apple.com/us/app/galenai/id6755653561"
            className="text-orange hover:underline text-sm font-medium"
            onClick={() => trackCTAClick("app_store")}
          >
            App Store (iOS)
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.galenai.galenai"
            className="text-orange hover:underline text-sm font-medium"
            onClick={() => trackCTAClick("play_store")}
          >
            Google Play (Android)
          </a>
          <a
            href="https://app.galenai.io"
            className="text-orange hover:underline text-sm font-medium"
            onClick={() => trackCTAClick("web_app")}
          >
            Web Application
          </a>
        </div>
      </div>
    </div>
  );
}

