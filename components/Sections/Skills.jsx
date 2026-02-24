"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";

const skillCategories = [
  {
    title: "Programming & Data Science",
    skills: ["Python", "Pandas & NumPy", "Scikit-Learn", "Matplotlib & Seaborn", "SQL"],
  },
  {
    title: "Machine Learning & NLP",
    skills: ["Classification / Regression", "Feature Engineering", "Text Preprocessing", "TF-IDF & Semantic Search", "Document QA System"],
  },
  {
    title: "Engineering & Tools",
    skills: ["Web Scraping (Scrapy, BS4)", "Flask & REST APIs", "Apache Superset", "Grafana", "Docker & AWS", "MySQL / MongoDB"],
  },
];

export default function Skills() {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", stiffness: 100, damping: 10 
      } 
    },
  };

  return (
    <section
      id="skills"
      className="min-h-screen max-w-7xl mx-auto px-8 py-24 flex items-center"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? "text-gradient-blue" : "text-gradient-emerald"}>
              TECHNICAL ARSENAL
            </span>
          </h2>
          <div className={`h-1 w-24 mx-auto ${isDark ? "bg-blue-500" : "bg-emerald-500"} rounded`} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`p-6 rounded-2xl ${
                isDark ? "glass-panel hover:border-blue-500/50" : "glass-panel-light hover:border-emerald-500/50"
              } transition-colors duration-300 group`}
            >
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isDark ? "text-white" : "text-black"}`}>
                <span className={`w-8 h-8 rounded flex items-center justify-center ${
                  isDark ? "bg-blue-900/50 text-blue-400" : "bg-emerald-100 text-emerald-600"
                }`}>
                  {/* Just an icon placeholder visually */}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`px-3 py-1.5 text-sm rounded-full transition-transform duration-300 hover:scale-105 cursor-default ${
                      isDark
                        ? "bg-gray-800 text-gray-300 hover:bg-blue-900/40 hover:text-blue-300 border border-gray-700 hover:border-blue-500/50"
                        : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
