"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isCollegePath, isSharedPath } from "@/lib/audience";

const KEY = "galen_side";
const EVENT = "galen-side";

const read = () => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const subscribe = (fn: () => void) => {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
};

/**
 * Is this page shown in its college version? Student and college pages answer for themselves.
 * Shared pages (team, contact, legal) keep the side the visitor was last on in this tab,
 * so someone who opens Team from the colleges navbar stays on the college side.
 */
export function useIsCollege(pathname: string): boolean {
  const last = useSyncExternalStore(subscribe, read, () => null);
  useEffect(() => {
    if (isSharedPath(pathname)) return;
    try {
      sessionStorage.setItem(KEY, isCollegePath(pathname) ? "college" : "student");
      window.dispatchEvent(new Event(EVENT));
    } catch {
      /* storage unavailable: shared pages fall back to the student side */
    }
  }, [pathname]);
  return isSharedPath(pathname) ? last === "college" : isCollegePath(pathname);
}
