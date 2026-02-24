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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-gradient-to-tr from-blue-500 to-blue-600 dark:opacity-10" />

      
      <div className="max-w-7xl mx-auto w-full px-8 grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          onViewportEnter={() => setTypingKey((k) => k + 1)}
          className="flex flex-col items-start"
        >
          <motion.p
            className={`uppercase tracking-[0.4em] font-extrabold text-sm mb-6 inline-block py-1 px-3 rounded-full border border-opacity-30 backdrop-blur-sm ${
              isDark 
                ? "text-blue-400 border-blue-400 bg-blue-900/10" 
                : "text-emerald-700 border-emerald-500 bg-emerald-100/30"
            }`}
          >
            Yash Sarda
          </motion.p>

          <div className="mb-6 drop-shadow-lg max-w-2xl">
            {/* 🔁 Typing restarts */}
            <TypingTitle key={typingKey} text="DATA SCIENTIST & PYTHON ENGINEER" />
          </div>

          <motion.p
            className={`text-lg md:text-xl mt-4 mb-10 max-w-xl leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Building intelligent systems, scalable data pipelines, and real-world ML impact. Transforming complex problems into elegant solutions.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href="#projects"
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.1)] ${
                isDark
                  ? "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  : "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(5,150,105,0.5)]"
              }`}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={`px-8 py-3 rounded-full font-bold border-2 transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? "border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  : "border-emerald-600/50 text-emerald-700 hover:bg-emerald-600/10"
              }`}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE (scroll-based) */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="hidden md:flex justify-center md:justify-end"
        >
          <HeroImage />
        </motion.div>
      </div>
    </section>
  );
}
