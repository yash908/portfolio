"use client";

import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { VIEWPORT, fadeUp, staggerContainer } from "@/lib/motion";

/**
 * The eyebrow-plus-heading pair that opens every section.
 *
 * Extracted because it appeared in five sections with slightly drifting markup.
 * It also fixes a subtler problem: wrapping the pair in a <Reveal> *and* masking
 * the heading meant two transforms fighting over the same pixels, which read as
 * mush. Here the block itself never moves — the eyebrow fades up, then the
 * heading's words unmask behind it.
 */
export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "mb-14",
  titleClassName = "text-3xl md:text-4xl",
}) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`${className} ${align === "center" ? "text-center" : ""}`}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="eyebrow mb-3">
          {eyebrow}
        </motion.p>
      )}
      <SplitText text={title} as="h2" className={titleClassName} delay={0.12} />
    </motion.div>
  );
}
