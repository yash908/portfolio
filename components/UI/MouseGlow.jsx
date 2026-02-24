"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function MouseGlow() {
  const { isDark } = useTheme();
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
  }, []);

  return (
    <motion.div
      style={{ left: smoothX, top: smoothY }}
      className={`pointer-events-none fixed
        w-[420px] h-[420px]
        -translate-x-1/2 -translate-y-1/2
        rounded-full blur-[120px]
        ${isDark ? "bg-blue-500/25" : "bg-emerald-300/40"}`}
    />
  );
}
