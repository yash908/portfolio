"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server cannot know the user's preference. Assuming "not reduced" keeps the
// server and client markup identical; React then re-renders with the real value
// straight after hydration. This is exactly what useSyncExternalStore's
// three-argument form exists for — reading matchMedia during render, or
// correcting it in an effect, both cause a hydration mismatch.
const getServerSnapshot = () => false;

/** `prefers-reduced-motion: reduce`, hydration-safe. */
export default function useReducedMotionSafe() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
