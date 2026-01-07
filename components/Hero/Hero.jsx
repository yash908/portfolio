"use client";

import { motion } from "framer-motion";
import TypingTitle from "./TypingTitle";
import HeroImage from "./HeroImage";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useState } from "react";

export default function Hero() {
  const { isDark } = useTheme();
  const [typingKey, setTypingKey] = useState(0);

  return (
    <section
      id="hero"
      className="min-h-screen max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center"
    >
      {/* LEFT */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.6 }}
        onViewportEnter={() => setTypingKey((k) => k + 1)}
      >
        <motion.p
          className={`uppercase tracking-[0.35em] font-extrabold text-sm mb-4 ${
            isDark ? "text-cyan-400" : "text-amber-700"
          }`}
        >
          Yash Sarda
        </motion.p>

        {/* 🔁 Typing restarts */}
        <TypingTitle key={typingKey} text="DATA SCIENCE ENGINEER" />

        <motion.p
          className={`text-lg mt-6 max-w-xl ${
            isDark ? "text-gray-400" : "text-[#5A4A2E]"
          }`}
        >
          Building intelligent systems from large-scale data, machine learning,
          and real-world impact.
        </motion.p>
      </motion.div>

      {/* RIGHT IMAGE (scroll-based) */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="hidden md:flex justify-center"
      >
        <HeroImage />
      </motion.div>
    </section>
  );
}
