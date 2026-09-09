"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { createGalaxyScene } from "@/lib/galaxy";

/**
 * Lets the revealed content know when the curtain has opened, so it can hold its
 * entrance animation until it is actually visible. Defaults to open, so any
 * consumer still works when rendered outside a curtain.
 */
const CurtainContext = createContext({ isOpen: true });
export const useCurtain = () => useContext(CurtainContext);

/** Fraction of the scroll spent travelling before the curtain starts parting. */
const TRAVEL_END = 0.72;
const SPLIT_END = 0.96;

export default function GalaxyCurtain({ children }) {
  const trackRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const percentRef = useRef(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const [hasParted, setHasParted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Travel speed ramps up, then eases off as we arrive.
  const warp = useTransform(
    scrollYProgress,
    [0, TRAVEL_END * 0.55, TRAVEL_END, SPLIT_END],
    [0.16, 1.1, 2.8, 0.5]
  );
  const flash = useTransform(
    scrollYProgress,
    [TRAVEL_END - 0.07, TRAVEL_END + 0.01, TRAVEL_END + 0.13],
    [0, 1, 0],
    { clamp: true }
  );
  const split = useTransform(scrollYProgress, [TRAVEL_END, SPLIT_END], [0, 1], {
    clamp: true,
  });

  const leftX = useTransform(split, (value) => `${-100 * value}%`);
  const rightX = useTransform(split, (value) => `${100 * value}%`);
  const seamOpacity = useTransform(split, [0, 0.12, 0.75, 1], [0, 1, 0.8, 0]);
  const seamWidth = useTransform(split, [0, 1], [2, 26]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const readoutOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, TRAVEL_END + 0.08, SPLIT_END],
    [0, 1, 1, 0]
  );
  const progressScale = useTransform(scrollYProgress, [0, SPLIT_END], [0, 1], {
    clamp: true,
  });

  // Open once the halves are mostly clear, so the content behind starts its own
  // reveal as the gap widens rather than after it finishes.
  useMotionValueEvent(split, "change", (value) => setHasParted(value > 0.55));

  /* Written straight to the DOM node rather than through state. A percentage
     that ticks on every scroll frame would otherwise re-render this subtree
     (and the whole hero with it) sixty times a second. */
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const node = percentRef.current;
    if (!node) return;
    const percent = Math.round(Math.min(1, Math.max(0, value / SPLIT_END)) * 100);
    node.textContent = String(percent).padStart(2, "0");
  });

  // Derived, not stored — there is no curtain to wait for under reduced motion.
  const isOpen = prefersReducedMotion || hasParted;

  const skip = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    window.scrollTo({
      top: track.offsetTop + track.offsetHeight - window.innerHeight,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvases = [leftCanvasRef.current, rightCanvasRef.current].filter(Boolean);
    if (canvases.length < 2) return;

    const scene = createGalaxyScene({ canvases });
    let rafId = null;
    let isVisible = true;
    let lastTime = 0;

    const frame = (time) => {
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0.016;
      lastTime = time;
      scene.render({ delta, speed: warp.get(), flash: flash.get() });
      rafId = isVisible ? requestAnimationFrame(frame) : null;
    };

    const start = () => {
      if (rafId === null) {
        lastTime = 0;
        rafId = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    const handlePointer = (event) => {
      scene.setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1
      );
    };

    const handleTouch = (event) => {
      const touch = event.touches?.[0];
      if (touch) {
        scene.setPointer(
          (touch.clientX / window.innerWidth) * 2 - 1,
          (touch.clientY / window.innerHeight) * 2 - 1
        );
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") skip();
    };

    // Don't burn a rAF loop on a canvas that has scrolled off screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 }
    );
    if (trackRef.current) observer.observe(trackRef.current);

    scene.resize();
    start();

    window.addEventListener("resize", scene.resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", scene.resize);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("keydown", handleKey);
    };
  }, [prefersReducedMotion, warp, flash, skip]);

  return (
    <CurtainContext.Provider value={{ isOpen }}>
      <section
        ref={trackRef}
        data-curtain-track
        aria-label="Intro"
        className="relative h-[250vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* The reveal target. Always in the DOM and in the accessibility tree,
              so the content is crawlable and reachable even while covered. */}
          <div className="absolute inset-0 z-0">{children}</div>

          {/* The curtain: one continuous starfield split down the middle. */}
          <motion.div
            aria-hidden="true"
            style={{ x: leftX }}
            data-curtain-panel
            className="absolute inset-y-0 left-0 w-1/2 z-10 will-change-transform"
          >
            <canvas ref={leftCanvasRef} className="block w-full h-full" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ x: rightX }}
            data-curtain-panel
            className="absolute inset-y-0 right-0 w-1/2 z-10 will-change-transform"
          >
            <canvas ref={rightCanvasRef} className="block w-full h-full" />
          </motion.div>

          {/* Light spilling through the parting seam. */}
          <motion.div
            aria-hidden="true"
            data-curtain-panel
            style={{ opacity: seamOpacity, width: seamWidth }}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none
              bg-[linear-gradient(90deg,transparent,rgba(226,238,255,0.95),transparent)]
              blur-[2px]"
          />

          {/* Scroll cue, before the journey starts. */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: hintOpacity }}
            data-curtain-hint
            className="absolute inset-x-0 bottom-24 z-30 flex flex-col items-center gap-2
              text-[rgba(226,238,255,0.75)]"
          >
            <span className="eyebrow !text-[rgba(226,238,255,0.75)]">Scroll to enter</span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </motion.div>

          {/* Journey readout — makes it unambiguous that scrolling is doing
              something, and how much of the intro is left. */}
          <motion.div
            style={{ opacity: readoutOpacity }}
            data-curtain-hint
            className="absolute inset-x-0 bottom-10 z-30 flex items-center justify-center gap-4
              text-[rgba(226,238,255,0.6)]"
          >
            <span className="eyebrow !text-[rgba(226,238,255,0.6)]">Entering</span>
            <span
              aria-hidden="true"
              className="relative block h-px w-32 sm:w-56 bg-[rgba(226,238,255,0.2)] overflow-hidden"
            >
              <motion.span
                style={{ scaleX: progressScale }}
                className="absolute inset-0 origin-left bg-[rgba(226,238,255,0.85)]"
              />
            </span>
            <span className="font-mono text-xs tabular-nums">
              <span ref={percentRef}>00</span>%
            </span>
          </motion.div>

          <button
            onClick={skip}
            data-curtain-skip
            className="absolute top-20 right-6 z-30 rounded-md border px-3 py-1.5 text-xs
              border-[rgba(226,238,255,0.25)] text-[rgba(226,238,255,0.8)]
              hover:bg-[rgba(226,238,255,0.1)] transition-colors duration-500"
          >
            Skip intro <span aria-hidden="true" className="opacity-50">Esc</span>
          </button>
        </div>
      </section>
    </CurtainContext.Provider>
  );
}
