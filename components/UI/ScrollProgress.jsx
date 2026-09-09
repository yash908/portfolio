"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress bar. The spring is what stops it feeling mechanical — it
 * trails the scroll position slightly instead of tracking it 1:1.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-px bg-accent z-[60] origin-left"
    />
  );
}
