"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

const education = [
  {
    title: "B.Tech in Computer Science",
    detail: "SRM University, Sonipat, Haryana · Aug 2018 – Aug 2022",
  },
  {
    title: "Certifications",
    detail:
      "IBM Data Science Professional Certificate · Coding Ninjas: DSA & Java Programming",
  },
];

const paragraphs = [
  <>
    I am a <strong className="text-fg font-medium">Data Scientist and Python
    Engineer</strong> with 2+ years of experience building end-to-end data pipelines,
    machine learning models, and analytics platforms for large-scale education systems
    impacting 10M+ users.
  </>,
  <>
    My expertise lies in Python, SQL, NLP, and data visualization. Whether it&apos;s web
    scraping, ETL automation, predictive modeling, or deploying ML/NLP systems via REST
    APIs, I thrive on turning complex problems into scalable solutions.
  </>,
  <>
    As an IBM-certified Data Scientist, I constantly explore advancements in machine
    learning, particularly in document-based question answering systems and scalable
    architectures.
  </>,
];

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="About" title="Turning data into systems" />

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="space-y-5 text-fg-muted leading-relaxed"
        >
          {paragraphs.map((paragraph, index) => (
            <motion.p key={index} variants={fadeUp}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        <Reveal delay={0.15} className="surface p-7">
          <h3 className="text-base mb-6">Education &amp; path</h3>
          <motion.ul
            variants={staggerContainer(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-6"
          >
            {education.map(({ title, detail }) => (
              <motion.li key={title} variants={fadeUp} className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">{title}</div>
                  <div className="text-sm text-fg-subtle mt-1 leading-relaxed">
                    {detail}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}
