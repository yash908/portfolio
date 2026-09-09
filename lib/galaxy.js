/**
 * Galaxy renderer — a plain module with no React in it.
 *
 * Kept separate from the component because the two concerns are genuinely
 * different: this owns pixels, geometry and a frame budget; the component owns
 * scroll position and DOM. Splitting them keeps the canvas code readable and
 * means the scene can be driven by anything that can supply a speed value.
 *
 * The scene renders across two canvases that together form one continuous
 * image, so the curtain can part down the middle without a visible seam.
 */

/**
 * Star colours by rough temperature. A single-colour field reads as a screensaver;
 * the spread of blue-white through to amber is what makes it read as a galaxy.
 */
const STAR_COLOURS = [
  { weight: 0.5, rgb: "200,220,255" }, // blue-white
  { weight: 0.28, rgb: "255,255,255" }, // white
  { weight: 0.13, rgb: "255,214,170" }, // amber
  { weight: 0.09, rgb: "120,175,255" }, // accent
];

const NEBULA_COLOURS = [
  "38,70,150",
  "88,48,140",
  "20,90,120",
  "130,60,110",
];

/** Deep space stays dark in both themes — a galaxy on a white page is nonsense. */
const BACKGROUND = "#08080c";

const FOV = 340;

const pickColour = () => {
  let roll = Math.random();
  for (const entry of STAR_COLOURS) {
    if (roll < entry.weight) return entry.rgb;
    roll -= entry.weight;
  }
  return STAR_COLOURS[0].rgb;
};

/**
 * Places a star in normalised space. Respawns land on the far plane so they
 * stream outward from the centre; the initial fill spreads across the whole
 * depth range, because a field seeded entirely at z≈1 projects into a tight
 * cluster around the vanishing point and leaves the screen edges empty.
 */
const spawn = (star, isInitialFill = false) => {
  const spread = 1.8;
  star.x = (Math.random() * 2 - 1) * spread;
  star.y = (Math.random() * 2 - 1) * spread;
  star.z = isInitialFill ? 0.04 + Math.random() * 0.96 : 0.4 + Math.random() * 0.6;
  star.colour = pickColour();
  return star;
};

/**
 * @param {object} options
 * @param {HTMLCanvasElement[]} options.canvases Left and right halves, in order.
 */
export function createGalaxyScene({ canvases }) {
  const stars = [];
  const nebula = { canvas: null, blobs: [] };
  const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 };
  let viewport = { width: 0, height: 0, dpr: 1 };
  let rotation = 0;

  /**
   * Star count scales with viewport area rather than being a fixed number, so a
   * phone isn't asked to run a field sized for a 5K display.
   */
  const targetStarCount = (width, height) =>
    Math.round(Math.max(260, Math.min(950, (width * height) / 2400)));

  /**
   * The nebula is drawn once into an offscreen canvas and then blitted with a
   * transform each frame. Re-rendering half a dozen large radial gradients every
   * frame is the single most expensive thing this scene could do.
   */
  const buildNebula = (width, height) => {
    const canvas = document.createElement("canvas");
    const size = Math.max(width, height) * 1.6;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "lighter";
    nebula.blobs = Array.from({ length: 6 }, (_, index) => ({
      x: Math.random() * size,
      y: Math.random() * size,
      radius: size * (0.16 + Math.random() * 0.22),
      colour: NEBULA_COLOURS[index % NEBULA_COLOURS.length],
    }));

    for (const blob of nebula.blobs) {
      const gradient = ctx.createRadialGradient(
        blob.x,
        blob.y,
        0,
        blob.x,
        blob.y,
        blob.radius
      );
      gradient.addColorStop(0, `rgba(${blob.colour},0.30)`);
      gradient.addColorStop(0.45, `rgba(${blob.colour},0.11)`);
      gradient.addColorStop(1, `rgba(${blob.colour},0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    nebula.canvas = canvas;
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    viewport = { width, height, dpr };

    for (const canvas of canvases) {
      canvas.width = Math.max(1, Math.round((width / 2) * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // One opaque clear, so the trail effect below always composites onto
        // solid pixels and never lets the content behind bleed through.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(0, 0, width / 2, height);
      }
    }

    const desired = targetStarCount(width, height);
    while (stars.length < desired) stars.push(spawn({}, true));
    stars.length = desired;

    buildNebula(width, height);
  };

  /** Pointer position in -1..1, used to drift the camera. */
  const setPointer = (normalisedX, normalisedY) => {
    pointer.targetX = normalisedX;
    pointer.targetY = normalisedY;
  };

  /**
   * @param {object} frame
   * @param {number} frame.delta Seconds since the previous frame.
   * @param {number} frame.speed Travel speed multiplier.
   * @param {number} frame.flash 0..1 white bloom, peaks as the curtain parts.
   */
  const render = ({ delta, speed, flash }) => {
    const { width, height, dpr } = viewport;
    if (!width || !height) return;

    const halfWidth = width / 2;
    const travel = speed * delta * 0.55;

    // Ease the camera toward the pointer instead of snapping — an unsmoothed
    // pointer offset makes the whole field jitter with every mouse event.
    pointer.x += (pointer.targetX - pointer.x) * Math.min(1, delta * 3.5);
    pointer.y += (pointer.targetY - pointer.y) * Math.min(1, delta * 3.5);
    rotation += delta * 0.012;

    const driftX = pointer.x * 46;
    const driftY = pointer.y * 34;

    // Faster travel leaves more of the previous frame behind, which is what
    // produces motion blur on the streaks. A full clear at rest keeps the
    // stationary field crisp.
    const clearAlpha = 1 - Math.min(0.74, Math.max(0, speed - 0.3) * 0.34);

    canvases.forEach((canvas, index) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(8,8,12,${clearAlpha})`;
      ctx.fillRect(0, 0, halfWidth, height);

      // Projection centre is the middle of the *full* viewport; each canvas
      // holds one half of that single continuous image.
      const cx = halfWidth - index * halfWidth + driftX;
      const cy = height / 2 + driftY;

      ctx.globalCompositeOperation = "lighter";

      if (nebula.canvas) {
        const size = nebula.canvas.width;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.globalAlpha = 0.5 + Math.min(0.4, speed * 0.14);
        const scale = 1 + Math.min(0.5, speed * 0.16);
        ctx.drawImage(nebula.canvas, (-size / 2) * scale, (-size / 2) * scale, size * scale, size * scale);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      // Galactic core, brightening with speed.
      const coreRadius = Math.max(120, height * 0.34);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      const coreAlpha = 0.06 + Math.min(0.3, speed * 0.11);
      core.addColorStop(0, `rgba(190,215,255,${coreAlpha})`);
      core.addColorStop(1, "rgba(190,215,255,0)");
      ctx.fillStyle = core;
      ctx.fillRect(cx - coreRadius, cy - coreRadius, coreRadius * 2, coreRadius * 2);

      for (const star of stars) {
        const previousZ = star.z;
        const z = previousZ - travel;
        if (z <= 0.02) continue;

        const scale = FOV / z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;
        if (x < -80 || x > halfWidth + 80 || y < -80 || y > height + 80) continue;

        const previousScale = FOV / previousZ;
        const depth = Math.min(1, (1 - z) * 1.5);
        const alpha = 0.1 + depth * 0.8;
        const thickness = 0.4 + depth * 1.7;

        if (speed > 0.5) {
          ctx.strokeStyle = `rgba(${star.colour},${alpha})`;
          ctx.lineWidth = thickness;
          ctx.beginPath();
          ctx.moveTo(cx + star.x * previousScale, cy + star.y * previousScale);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${star.colour},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, thickness * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Warp bloom. Deliberately composited source-over rather than additively:
      // if the viewer parks mid-flash, an additive fill would accumulate frame
      // after frame and burn the canvas to solid white with no way back.
      ctx.globalCompositeOperation = "source-over";
      if (flash > 0.001) {
        ctx.fillStyle = `rgba(226,238,255,${flash * 0.6})`;
        ctx.fillRect(0, 0, halfWidth, height);
      }

      // Vignette, to seat the field in the frame.
      const vignette = ctx.createRadialGradient(
        halfWidth / 2,
        height / 2,
        0,
        halfWidth / 2,
        height / 2,
        Math.max(halfWidth, height) * 0.85
      );
      vignette.addColorStop(0.55, "rgba(8,8,12,0)");
      vignette.addColorStop(1, "rgba(8,8,12,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, halfWidth, height);
    });

    // Advance once, after both halves have drawn from identical state —
    // stepping per canvas would desynchronise the two sides and show the seam.
    for (const star of stars) {
      star.z -= travel;
      if (star.z <= 0.02) spawn(star);
    }
  };

  return { resize, render, setPointer };
}
