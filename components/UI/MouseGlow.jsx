"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
    // MotionValues are stable across renders; listed to satisfy exhaustive-deps.
  }, [x, y]);

  return (
    <motion.div
      style={{ left: smoothX, top: smoothY }}
      className="pointer-events-none fixed z-0 w-[480px] h-[480px]
        -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]
        bg-accent/[0.07]"
    />
  );
}
