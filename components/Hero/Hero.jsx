"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import SplitText from "@/components/motion/SplitText";
import Parallax from "@/components/motion/Parallax";
import { EASE, DURATION, staggerContainer, fadeUp } from "@/lib/motion";
import { useCurtain } from "@/components/Effects/GalaxyCurtain";

const stats = [
  { value: "2+", label: "Years experience" },
  { value: "10M+", label: "Users impacted" },
  { value: "1M+", label: "Records processed" },
];

export default function Hero() {
  const { isOpen } = useCurtain();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      {/* Canvas texture, drifting slower than the content in front of it. */}
      <Parallax speed={-40} className="absolute inset-0 pointer-events-none">
        <div className="dot-grid absolute inset-0" />
      </Parallax>

      <div className="max-w-6xl mx-auto w-full px-6 grid md:grid-cols-[1.15fr_1fr] gap-14 md:gap-20 items-center relative z-10">
        {/* LEFT */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="flex flex-col items-start"
        >
          <motion.span variants={fadeUp} className="chip">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            Yash Sarda
          </motion.span>

          <SplitText
            text="Data Scientist & Python Engineer"
            as="h1"
            className="mt-6 mb-5 max-w-2xl text-4xl md:text-6xl leading-[1.05]"
            delay={0.15}
            active={isOpen}
          />

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-fg-muted max-w-xl leading-relaxed"
          >
            Building intelligent systems, scalable data pipelines, and real-world ML
            impact. Transforming complex problems into elegant solutions.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-9">
            <a href="#projects" className="btn btn-primary">
              View projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact me
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.dl
            variants={staggerContainer(0.09, 0.5)}
            className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-12 pt-8 border-t border-line-subtle w-full max-w-xl"
          >
            {stats.map(({ value, label }) => (
              <motion.div key={label} variants={fadeUp}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-tight">
                    {value}
                  </span>
                  <span aria-hidden="true" className="block text-xs text-fg-subtle mt-0.5">
                    {label}
                  </span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: DURATION.reveal, ease: EASE.inOutExpo, delay: 0.25 }}
          className="hidden md:flex justify-center md:justify-end"
        >
          <Parallax speed={44}>
            <HeroImage />
          </Parallax>
        </motion.div>
      </div>
    </section>
  );
}
