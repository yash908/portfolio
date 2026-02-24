"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";

const sections = [
  { id: "hero", label: "Home" },
  { id: "current-role", label: "Experience" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "subscribe", label: "Subscribe" },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");
  const [hoveredId, setHoveredId] = useState(null);
  const { isDark } = useTheme();

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
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const accent = isDark ? "#60a5fa" : "#059669";
  const dimColor = isDark ? "#374151" : "#d1d5db";
  const activeIdx = sections.findIndex((s) => s.id === active);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
    >
      {sections.map(({ id, label }, idx) => {
        const isActive = active === id;
        const isHovered = hoveredId === id;
        const isPast = idx < activeIdx;

        return (
          <div key={id} className="flex flex-col items-center relative">
            {/* Top connector line (not for first item) */}
            {idx > 0 && (
              <div
                className="w-px"
                style={{
                  height: 20,
                  background: isPast || isActive ? accent : dimColor,
                  opacity: isPast || isActive ? 1 : 0.35,
                  transition: "background 0.5s, opacity 0.5s",
                }}
              />
            )}

            {/* Node button */}
            <button
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
              }
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center justify-center focus:outline-none"
              style={{ width: 24, height: 24 }}
              title={label}
            >
              {/* Active glow ring */}
              {isActive && (
                <motion.span
                  layoutId="journey-ring"
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 0 2px ${accent}, 0 0 10px ${accent}88`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Node shape: diamond when active, circle otherwise */}
              <motion.span
                animate={{
                  width: isActive ? 10 : isHovered ? 7 : 5,
                  height: isActive ? 10 : isHovered ? 7 : 5,
                  borderRadius: isActive ? "2px" : "50%",
                  rotate: isActive ? 45 : 0,
                  backgroundColor: isActive ? accent : isPast ? accent : dimColor,
                  opacity: isPast ? 0.6 : 1,
                  boxShadow: isActive ? `0 0 8px ${accent}` : "none",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="block"
              />

              {/* Hover/active label — positioned to the LEFT, away from content */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-full mr-3 whitespace-nowrap pointer-events-none"
                  >
                    <span
                      className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full ${
                        isDark
                          ? "bg-gray-900/90 text-blue-300 border border-blue-500/25"
                          : "bg-white/90 text-emerald-700 border border-emerald-400/25"
                      }`}
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      {label}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Bottom connector line (not for last item) */}
            {idx < sections.length - 1 && (
              <div
                className="w-px"
                style={{
                  height: 20,
                  background: isPast ? accent : dimColor,
                  opacity: isPast ? 1 : 0.35,
                  transition: "background 0.5s, opacity 0.5s",
                }}
              />
            )}
          </div>
        );
      })}
    </motion.nav>
  );
}
