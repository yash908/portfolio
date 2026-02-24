"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function About() {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className="min-h-screen max-w-7xl mx-auto px-8 py-24 flex items-center"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? "text-gradient-blue" : "text-gradient-emerald"}>
              ABOUT ME
            </span>
          </h2>
          <div className={`h-1 w-24 ${isDark ? "bg-blue-500" : "bg-emerald-500"} rounded`} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`space-y-6 text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p>
              I am a <strong>Data Scientist and Python Engineer</strong> with 2+ years of experience building end-to-end data pipelines, machine learning models, and analytics platforms for large-scale education systems impacting 10M+ users. 
            </p>
            <p>
              My expertise lies in Python, SQL, NLP, and data visualization. Whether it's web scraping, ETL automation, predictive modeling, or deploying ML/NLP systems via REST APIs, I thrive on turning complex problems into scalable solutions.
            </p>
            <p>
              As an IBM-certified Data Scientist, I constantly explore advancements in machine learning, particularly in document-based question answering systems and scalable architectures.
            </p>
          </motion.div>

          {/* Right Side: Visual/Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`p-8 rounded-2xl ${
              isDark ? "glass-panel" : "glass-panel-light"
            } relative overflow-hidden group`}
          >
            {/* Decorative Glow */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 transition-all duration-500 group-hover:opacity-50 group-hover:scale-125 ${
                isDark ? "bg-blue-500" : "bg-emerald-500"
              }`}
            />
            <div
              className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-125 ${
                isDark ? "bg-blue-500" : "bg-red-500"
              }`}
            />
            
            <div className="relative z-10 flex flex-col justify-center h-full min-h-[300px]">
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                Education & Path
              </h3>
              <ul className={`space-y-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <li className="flex items-start gap-4">
                  <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${isDark ? "bg-blue-400" : "bg-emerald-500"}`} />
                  <div>
                    <strong className={isDark ? "text-gray-200" : "text-gray-800"}>B.Tech in Computer Science</strong>
                    <br />
                    SRM University, Sonipat, Haryana (Aug 2018 - Aug 2022)
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${isDark ? "bg-blue-400" : "bg-emerald-500"}`} />
                  <div>
                    <strong className={isDark ? "text-gray-200" : "text-gray-800"}>Certifications</strong>
                    <br />
                    IBM Data Science Professional Certificate <br />
                    Coding Ninjas: DSA & Java Programming
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
