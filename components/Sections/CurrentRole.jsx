"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";
import { EASE, DURATION } from "@/lib/motion";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "Jan 2024 – Present",
    type: "Remote",
    description:
      "Designed and developed scalable full-stack web applications using modern JavaScript frameworks. Collaborated with clients to translate business requirements into technical solutions.",
    highlights: [
      "Built responsive, accessible user interfaces using Next.js, React, and Tailwind CSS.",
      "Developed robust REST APIs and backend services using Node.js and Express.",
      "Integrated third-party services, payment gateways, and managed database schemas in PostgreSQL and MongoDB.",
    ],
    tags: ["Next.js", "React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
  },
  {
    role: "Software Developer & Data Engineer",
    company: "Samarth eGov, Ministry of Education (MoE)",
    period: "Apr 2024 – Present",
    type: "Remote",
    description:
      "Designed and maintained Python-based ETL pipelines to ingest, clean, and normalize large-scale student and institutional datasets (1M+ records). Engaged in the development of data models impacting 10M+ users across India.",
    highlights: [
      "Built interactive dashboards in Apache Superset and Grafana backed by optimized SQL queries.",
      "Automated data validation and reporting workflows, reducing data inconsistencies by 40%.",
      "Created REST APIs to expose analytics-ready datasets for downstream tools.",
    ],
    tags: ["Python", "SQL", "Apache Superset", "Grafana", "REST APIs"],
  },
  {
    role: "Software Developer Trainee",
    company: "Invas Technologies",
    period: "Oct 2023 – Apr 2024",
    type: "Gurgaon",
    description:
      "Developed Smart Kheti applications for agricultural data analysis using JSP, Servlets, and MySQL. Implemented backend logic for serving data to crop recommendation systems.",
    highlights: [
      "Built Flask-based REST APIs to serve soil and weather data for ML-driven systems.",
      "Optimized backend SQL queries and data processing logic, improving response times by 25%.",
    ],
    tags: ["Python", "Flask", "MySQL", "JSP"],
  },
  {
    role: "IoT Intern",
    company: "DCS",
    period: "Jul 2020 – Sep 2020",
    type: "Remote",
    description:
      "Prototyped an IoT-based Smart Water Management System using Raspberry Pi and real-time sensor telemetry.",
    highlights: [
      "Built data ingestion pipelines to collect, process, and visualize sensor data on dashboards.",
    ],
    tags: ["Python", "IoT", "Raspberry Pi", "Sensors"],
  },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: (dir) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE.inOutQuart },
  }),
};

export default function CurrentRole() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + experiences.length) % experiences.length);
  };

  const exp = experiences[current];

  return (
    <section id="current-role" className="max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="Career" title="Experience" />

      <Reveal className="surface overflow-hidden" delay={0.1}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid md:grid-cols-2 gap-10 md:gap-14 p-7 md:p-10"
          >
            {/* LEFT: Role info */}
            <div className="flex flex-col gap-6 justify-between">
              <div>
                <h3 className="text-xl mb-1.5 leading-tight">{exp.role}</h3>
                <p className="text-sm text-accent-text font-medium mb-3">
                  {exp.company}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} />
                    {exp.type}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="flex flex-col gap-5">
              <p className="text-sm text-fg-muted leading-relaxed">
                {exp.description}
              </p>
              <ul className="space-y-3">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-fg-muted leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between px-7 md:px-10 py-4 border-t border-line-subtle">
          <div className="flex items-center gap-2">
            {experiences.map((item, i) => (
              <button
                key={item.role}
                aria-label={`Show ${item.role}`}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="h-1.5 rounded-full transition-all duration-700
                  [transition-timing-function:var(--ease-out)]"
                style={{
                  width: i === current ? 20 : 6,
                  background: i === current ? "var(--accent)" : "var(--line)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous"
              className="btn btn-ghost !p-2 rounded-md"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Next"
              className="btn btn-ghost !p-2 rounded-md"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
