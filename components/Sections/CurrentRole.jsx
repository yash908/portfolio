"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";

/* ---------------- Animation Variants ---------------- */

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const imageFloat = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function CurrentRole() {
  const { isDark } = useTheme();

  return (
    <section
      id="current-role"
      className={`relative min-h-screen transition-colors duration-700 ${
        isDark ? "bg-black text-white" : "bg-[#FFF7E6] text-[#1A1A1A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center min-h-screen">
        {/* LEFT CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
        >
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className={`inline-flex items-center gap-2 px-4 py-1 mb-6
              text-xs uppercase tracking-widest rounded-full border
              ${
                isDark
                  ? "border-cyan-400/40 text-cyan-400"
                  : "border-amber-500/40 text-amber-700"
              }`}
          >
            Current Role
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="text-5xl font-semibold leading-tight mb-6"
          >
            Software Developer <br /> & Data Engineer
          </motion.h2>

          {/* Company */}
          <motion.p
            variants={fadeUp}
            className={`text-xl mb-4 ${
              isDark ? "text-cyan-400" : "text-amber-700"
            }`}
          >
            Samarth eGov
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className={`leading-relaxed max-w-xl mb-6 ${
              isDark ? "text-gray-400" : "text-[#5A4A2E]"
            }`}
          >
            Working with the Ministry of Education to deliver national-level
            data platforms that serve universities across India. Building robust
            infrastructure that supports educational institutions in making
            data-driven decisions for improved student outcomes and
            institutional performance.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className={`leading-relaxed max-w-xl ${
              isDark ? "text-gray-400" : "text-[#5A4A2E]"
            }`}
          >
            Leading development of scalable data solutions that integrate
            multiple university systems, enabling real-time insights and
            analytics for educational administrators and policymakers
            nationwide.
          </motion.p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={imageFloat}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Glow */}
            <div
              className={`absolute inset-0 rounded-2xl blur-2xl ${
                isDark ? "bg-cyan-500/20" : "bg-amber-300/30"
              }`}
            />

            {/* Card */}
            <div className="relative bg-white rounded-2xl p-10 shadow-2xl">
              <Image
                src="/gov-building.png"
                alt="Government Building"
                width={360}
                height={360}
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
