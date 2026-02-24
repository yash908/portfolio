"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Web Scraping & Document QA System",
    description: "Developed a scalable web scraper extracting structured data and a document-based QA system supporting PDFs and docs with semantic search using NLP and Cosine Similarity.",
    tags: ["Python", "Scrapy", "NLP", "Flask", "Scikit-Learn"],
    github: "https://github.com/yash908",
    live: "#",
  },
  {
    title: "Student Dropout Prediction Pipeline",
    description: "Built an end-to-end supervised ML pipeline predicting dropout probability. Executed EDA, handled class imbalance, and exposed Logistic Regression models via Flask APIs.",
    tags: ["Python", "Pandas", "Scikit-Learn", "Matplotlib"],
    github: "https://github.com/yash908",
    live: "#",
  }
];

export default function Projects() {
  const { isDark } = useTheme();

  return (
    <section
      id="projects"
      className="min-h-screen max-w-7xl mx-auto px-8 py-24 flex items-center"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? "text-gradient-blue" : "text-gradient-emerald"}>
              FEATURED PROJECTS
            </span>
          </h2>
          <div className={`h-1 w-24 ${isDark ? "bg-blue-500" : "bg-emerald-500"} rounded`} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, rotateX: 90, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.7, 
                delay: idx * 0.15,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{ y: -10 }}
              style={{ transformOrigin: "bottom" }}
              className={`p-6 rounded-2xl flex flex-col h-full relative group overflow-hidden ${
                isDark ? "glass-panel" : "glass-panel-light"
              }`}
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                  isDark
                    ? "bg-gradient-to-br from-blue-500 to-blue-500"
                    : "bg-gradient-to-br from-emerald-500 to-red-500"
                }`}
              />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                  {project.title}
                </h3>
                <div className={`flex gap-3 ${isDark ? "text-blue-400" : "text-emerald-600"}`}>
                  <a href={project.github} className="hover:scale-110 transition-transform">
                    <Github size={20} />
                  </a>
                  <a href={project.live} className="hover:scale-110 transition-transform">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <p className={`mb-6 flex-grow ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      isDark
                        ? "bg-gray-800 text-blue-300"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
