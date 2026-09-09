"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Scroll parallax. `speed` is the total travel in pixels across the element's
 * full pass through the viewport — positive drifts up, negative drifts down.
 *
 * The spring smooths the raw scroll value, which matters because Lenis emits
 * interpolated positions; binding transforms straight to them can read as
 * slightly stepped on low-refresh displays.
 *
 * The transform is always applied, so server and client markup match. Reduced
 * motion is neutralised in CSS (`transform: none !important`), which outranks
 * the inline style framer-motion writes.
 */
export default function Parallax({ children, speed = 60, className, ...rest }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      data-parallax=""
      className={className}
      style={{ y }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
