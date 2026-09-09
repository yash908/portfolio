"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "@/components/motion/SectionHeading";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

const projects = [
  {
    title: "Web Scraping & Document QA System",
    description:
      "Developed a scalable web scraper extracting structured data and a document-based QA system supporting PDFs and docs with semantic search using NLP and Cosine Similarity.",
    tags: ["Python", "Scrapy", "NLP", "Flask", "Scikit-Learn"],
    github: "https://github.com/yash908",
    live: "#",
  },
  {
    title: "Student Dropout Prediction Pipeline",
    description:
      "Built an end-to-end supervised ML pipeline predicting dropout probability. Executed EDA, handled class imbalance, and exposed Logistic Regression models via Flask APIs.",
    tags: ["Python", "Pandas", "Scikit-Learn", "Matplotlib"],
    github: "https://github.com/yash908",
    live: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="Work" title="Featured projects" />

      {/* Panels share the row; hovering one widens it and narrows its sibling.
          Falls back to a plain stacked column below 768px. */}
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="panel-row flex-col md:flex-row"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            className="panel surface surface-hover p-7 flex flex-col"
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-lg leading-snug">{project.title}</h3>
              <div className="flex gap-1 text-fg-subtle flex-shrink-0">
                <a
                  href={project.github}
                  aria-label={`${project.title} source`}
                  className="btn btn-ghost !p-1.5 rounded-md"
                >
                  <Github size={16} />
                </a>
                <a
                  href={project.live}
                  aria-label={`${project.title} live site`}
                  className="btn btn-ghost !p-1.5 rounded-md"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <p className="text-sm text-fg-muted leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
