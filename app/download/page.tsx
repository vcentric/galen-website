"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DownloadRedirect() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    // Check for Android
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      window.location.href = "https://apps.apple.com/us/app/galenai/id6755653561";
    } else if (isAndroid) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.galenai.galenai";
    } else {
      // Fallback for Desktop and unknown devices
      window.location.href = "/";
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center font-primary selection:bg-orange/20 selection:text-orange text-dark">
      <div className={`transition-opacity duration-500 flex flex-col items-center gap-6 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src="/galenai-icon.webp"
          alt="GalenAI"
          width={80}
          height={80}
          className="w-20 h-20 object-contain animate-pulse"
        />
        <h1 className="text-xl font-semibold text-dark tracking-tight">
          Redirecting...
        </h1>
      </div>
    </main>
  );
}
