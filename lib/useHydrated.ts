"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false on the server and during hydration, true afterwards. For values that depend on the browser (the page URL). */
export const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false);
