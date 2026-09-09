/**
 * Shared motion tokens.
 *
 * The easing curves are lifted from akukolabs.com's stylesheet so the whole site
 * shares one motion signature. Keeping them here (rather than inline per
 * component) means a timing tweak is a one-line change, not a find-and-replace.
 */

/** Akuko's three curves, in order of how often they appear in their CSS. */
export const EASE = {
  /** easeInOutQuart — the workhorse. Interactions, hovers, colour changes. */
  inOutQuart: [0.76, 0, 0.24, 1],
  /** easeInOutExpo — heavier. Large elements travelling a long distance. */
  inOutExpo: [0.87, 0, 0.13, 1],
  /** Fast-out/slow-in. Layout changes: width, height, position. */
  out: [0.25, 0.5, 0, 1],
};

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 1,
  reveal: 1.2,
};

/**
 * Mirrors Akuko's `data-scroll` config: `data-scroll-offset="70%, 30%"` plus
 * `data-scroll-repeat="true"` — every element on their page re-animates on
 * every pass, not just the first.
 *
 * `amount: 0.25` is the important half. A negative bottom margin alone fires as
 * soon as an element's *top* edge crosses the line, which for a tall card means
 * the animation runs and finishes while the card is still mostly below the fold
 * — you scroll down and the content is simply already there. Requiring a
 * quarter of the element to be visible ties the trigger to the element's size
 * instead of just its top edge.
 */
export const VIEWPORT = {
  once: false,
  amount: 0.25,
  margin: "0px 0px -10% 0px",
};

/** For anything that should settle permanently after its first reveal. */
export const VIEWPORT_ONCE = { ...VIEWPORT, once: true };

export const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/**
 * Parent variant that cascades children. `staggerChildren` is what gives the
 * sequenced feel; without it grids pop in as one flat block.
 */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/**
 * Media reveal — Akuko scales images from 1.2 down to rest as they enter, which
 * is what makes their cards feel like they are settling into place rather than
 * fading in.
 */
export const revealMedia = {
  hidden: { scale: 1.18, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE.inOutExpo },
  },
};

/** Word-level mask reveal used by <SplitText />. */
export const maskedWord = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.reveal, ease: EASE.inOutExpo },
  },
};
