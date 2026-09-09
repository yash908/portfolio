"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { revealMedia } from "@/lib/motion";
import { useCurtain } from "@/components/Effects/GalaxyCurtain";

export default function HeroImage() {
  const { isOpen } = useCurtain();

  return (
    <div className="surface surface-hover p-2 bg-surface group">
      <div className="relative w-[260px] h-[300px] sm:w-[320px] sm:h-[380px] rounded-[0.75rem] overflow-hidden bg-surface-raised">
        {/* Scales down from 1.18 as it enters, so the portrait settles into its
            frame rather than simply appearing. */}
        <motion.div
          variants={revealMedia}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="absolute inset-0"
        >
          <Image
            src="/hero.png"
            alt="Yash Sarda"
            fill
            sizes="(max-width: 768px) 0px, 320px"
            className="object-cover panel-media"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
