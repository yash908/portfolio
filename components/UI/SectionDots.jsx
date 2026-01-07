"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

const sections = [
  { id: "hero", label: "Home" },
  { id: "current-role", label: "Role" },
  // future-ready
  // { id: "projects", label: "Projects" },
  // { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5">
      {sections.map(({ id, label }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-3"
          >
            {/* DOT */}
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${
                  isActive
                    ? isDark
                      ? "bg-cyan-400 scale-110"
                      : "bg-amber-600 scale-110"
                    : isDark
                    ? "bg-gray-500"
                    : "bg-gray-400"
                }
                group-hover:scale-125`}
            />

            {/* LABEL (hidden until hover) */}
            <span
              className={`text-[11px] uppercase tracking-[0.35em]
                whitespace-nowrap
                transition-all duration-300
                ${
                  isActive
                    ? "opacity-80"
                    : "opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
                }
                ${isDark ? "text-cyan-400" : "text-amber-700"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
