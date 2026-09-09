"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/motion/SectionHeading";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

const skillCategories = [
  {
    title: "Programming & Data Science",
    skills: ["Python", "Pandas & NumPy", "Scikit-Learn", "Matplotlib & Seaborn", "SQL"],
  },
  {
    title: "Machine Learning & NLP",
    skills: [
      "Classification / Regression",
      "Feature Engineering",
      "Text Preprocessing",
      "TF-IDF & Semantic Search",
      "Document QA System",
    ],
  },
  {
    title: "Engineering & Tools",
    skills: [
      "Web Scraping (Scrapy, BS4)",
      "Flask & REST APIs",
      "Apache Superset",
      "Grafana",
      "Docker & AWS",
      "MySQL / MongoDB",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="Capabilities" title="Technical stack" />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid md:grid-cols-3 gap-5"
      >
        {skillCategories.map(({ title, skills }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="surface surface-hover p-6"
          >
            <h3 className="text-sm font-medium mb-5 text-fg">{title}</h3>
            {/* Chips cascade after their parent card has landed. */}
            <motion.div
              variants={staggerContainer(0.04, 0.15)}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <motion.span key={skill} variants={fadeUp} className="chip">
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
