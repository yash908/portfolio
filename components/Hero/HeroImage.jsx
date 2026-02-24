"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function HeroImage() {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-center p-4"
    >
      {/* Main Image Container */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-2xl overflow-hidden z-10 transition-shadow duration-500
          ${isDark 
            ? "shadow-2xl border-2 border-white/5 bg-gray-900" 
            : "shadow-2xl border-2 border-black/5 bg-white"
          }`}
      >
        <Image
          src="/hero.png"
          alt="Yash Sarda"
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          priority
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
