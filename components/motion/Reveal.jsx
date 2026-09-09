"use client";

import { motion } from "framer-motion";
import { EASE, VIEWPORT, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Declarative scroll reveal — the equivalent of Akuko's `data-scroll` attribute.
 *
 * One wrapper instead of a hand-rolled `initial`/`whileInView`/`viewport` triple
 * repeated in every section, so timing stays consistent across the page.
 *
 * Deliberately branch-free: it renders identical markup on the server and on the
 * client. Reduced motion is handled by <MotionConfig reducedMotion="user"> plus
 * a CSS override in globals.css, neither of which can cause a hydration
 * mismatch. Reading `prefers-reduced-motion` during render would, because the
 * server has no way to know the answer.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 44,
  duration = 0.9,
  once = false,
  className,
  ...rest
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once ? VIEWPORT_ONCE : VIEWPORT}
      transition={{ duration, delay, ease: EASE.out }}
      {...rest}
    >
      {children}
    </Component>
  );
}
