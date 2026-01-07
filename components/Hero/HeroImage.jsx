"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function HeroImage() {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
        className={`absolute inset-[-12px] rounded-full border ${
          isDark ? "border-cyan-400/40" : "border-amber-500/40"
        }`}
      />
      <div
        className="w-[300px] h-[300px] rounded-full overflow-hidden
              drop-shadow-[0_0_35px_rgba(0,255,255,0.35)]"
      >
        <Image
          src="/hero.png"
          alt="Yash Sarda"
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}
