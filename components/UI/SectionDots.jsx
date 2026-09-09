"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { EASE, DURATION } from "@/lib/motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "current-role", label: "Experience" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo } = useSmoothScroll();

  // Hide on scroll down, reveal on scroll up. The 120px floor keeps the bar
  // pinned near the top of the page so it never flickers on small movements.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = current - previous;
    if (current < 120 || delta < -4) setIsHidden(false);
    else if (delta > 4) setIsHidden(true);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: isHidden ? -64 : 0, opacity: 1 }}
      transition={{ duration: DURATION.base, ease: EASE.inOutQuart }}
      className="fixed top-0 inset-x-0 z-50 border-b border-line-subtle
        bg-canvas/80 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-tight link-wipe"
        >
          yash<span className="text-accent-text">.</span>
        </button>

        <nav aria-label="Sections" className="hidden md:flex items-center gap-1">
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-current={isActive ? "true" : undefined}
                className="relative px-3 py-1.5 text-sm rounded-md transition-colors duration-500"
                style={{ color: isActive ? "var(--fg)" : "var(--fg-subtle)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-glass-heavy"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => scrollTo("subscribe")}
            className="btn btn-primary !py-1.5 !px-3"
          >
            Subscribe
          </button>
        </div>
      </div>
    </motion.header>
  );
}
