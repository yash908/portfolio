"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

const SmoothScrollContext = createContext({ scrollTo: null });

/**
 * Inertial smooth scrolling.
 *
 * Akuko uses Locomotive Scroll v4, which hijacks the page by transforming a
 * wrapper element. That breaks `position: sticky`, native anchor focus, browser
 * find-in-page, and IntersectionObserver offsets — and v4 is no longer
 * maintained. Lenis (by the same lineage; Locomotive v5 is built on it) instead
 * smooths the *native* scroll position via rAF. The real scrollbar, sticky
 * positioning, `useScroll` and `whileInView` all keep working untouched.
 *
 * Disabled entirely under `prefers-reduced-motion`, and re-evaluated live if the
 * user flips that setting.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = null;

    const start = () => {
      if (lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.1,
        // Exponential ease-out: quick to respond, long settle. Matches the
        // weight of Akuko's scroll without feeling floaty or laggy.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Never smooth touch — it fights the platform's own momentum scrolling
        // and is the single most common cause of "janky on mobile".
        syncTouch: false,
      });

      lenisRef.current = lenis;
      setIsReady(true);

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setIsReady(false);
    };

    const sync = () => (query.matches ? stop() : start());

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  /**
   * Single scroll entry point. Falls back to the native API when Lenis is off
   * (reduced motion), so callers never need to branch.
   */
  const scrollTo = useCallback((target, options = {}) => {
    const element =
      typeof target === "string" ? document.getElementById(target) : target;
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -56, ...options });
    } else {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, isReady }}>
      {/* `reducedMotion="user"` makes framer-motion skip transform and layout
          animations for users who ask for it, while still allowing opacity and
          colour fades — which WCAG treats as safe. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
