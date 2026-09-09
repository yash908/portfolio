"use client";

import { motion } from "framer-motion";
import { VIEWPORT, staggerContainer, maskedWord } from "@/lib/motion";

/**
 * Word-by-word masked heading reveal — each word slides up from behind a clipped
 * box, staggered.
 *
 * Accessibility: splitting into spans would otherwise make a screen reader
 * announce disconnected fragments, so the wrapper carries the full string as its
 * accessible name and the split spans are removed from the accessibility tree.
 * The text stays real text — selectable, translatable, and crawlable.
 *
 * Motion is never branched on `prefers-reduced-motion` here: the markup must be
 * byte-identical on server and client. The CSS override in globals.css strips
 * the transform for users who ask for reduced motion.
 */
export default function SplitText({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 0.055,
  active,
}) {
  const words = text.split(" ");

  /* By default the heading reveals when it scrolls into view. Pass `active` to
     drive it from elsewhere instead — the hero uses it so the name holds still
     until the curtain has actually opened, rather than animating unseen behind
     it and being already settled by the time it is revealed. */
  const trigger =
    active === undefined
      ? { whileInView: "visible", viewport: VIEWPORT }
      : { animate: active ? "visible" : "hidden" };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        variants={staggerContainer(stagger, delay)}
        initial="hidden"
        {...trigger}
        className="inline"
      >
        {words.map((word, index) => (
          // The mask. Vertical padding with a matching negative margin stops
          // descenders (g, y, p) being clipped by `overflow: hidden`.
          <span
            key={`${word}-${index}`}
            data-split-mask=""
            className="inline-block overflow-hidden py-[0.12em] -my-[0.12em] mr-[0.25em] align-bottom"
          >
            <motion.span className="inline-block" variants={maskedWord}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
