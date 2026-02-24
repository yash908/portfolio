"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import { ChevronLeft, ChevronRight, Briefcase, Calendar } from "lucide-react";

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
      "Integrated third-party services, payment gateways, and managed database schemas in PostgreSQL and MongoDB."
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
      "Created REST APIs to expose analytics-ready datasets for downstream tools."
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

export default function CurrentRole() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const navigate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + experiences.length) % experiences.length);
  };

  const exp = experiences[current];

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: "blur(6px)",
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <section
      id="current-role"
      className={`relative min-h-screen transition-colors duration-700 flex items-center ${
        isDark ? "bg-black text-white" : "bg-[#FFF7E6] text-[#1A1A1A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 pr-16 w-full py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className={`uppercase tracking-[0.3em] text-xs font-bold mb-2 ${
            isDark ? "text-blue-400" : "text-emerald-600"
          }`}>
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className={isDark ? "text-gradient-blue" : "text-gradient-emerald"}>
              Experience
            </span>
          </h2>
          <div className={`h-1 w-16 mt-3 rounded ${isDark ? "bg-blue-500" : "bg-emerald-500"}`} />
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`grid md:grid-cols-5 gap-8 p-8 rounded-3xl ${
                isDark ? "glass-panel" : "glass-panel-light"
              }`}
            >
              {/* LEFT: Role Info */}
              <div className="md:col-span-2 flex flex-col gap-6 justify-between">
                {/* Badge */}
                <div>
                  <span className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1 rounded-full border mb-4 ${
                    isDark
                      ? "border-blue-400/30 text-blue-400"
                      : "border-emerald-500/30 text-emerald-700"
                  }`}>
                    <Briefcase size={10} />
                    {exp.type}
                  </span>

                  <h3 className="text-2xl font-bold mb-2 leading-tight">{exp.role}</h3>
                  <p className={`text-lg font-medium mb-1 ${isDark ? "text-blue-400" : "text-emerald-600"}`}>
                    {exp.company}
                  </p>
                  <p className={`text-sm flex items-center gap-1.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                    <Calendar size={12} />
                    {exp.period}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        isDark
                          ? "bg-gray-800 text-blue-300 border border-gray-700"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vertical divider */}
              <div className={`hidden md:flex justify-center`}>
                <div className={`w-px h-full ${isDark ? "bg-white/10" : "bg-black/10"}`} />
              </div>

              {/* RIGHT: Details */}
              <div className="md:col-span-2 flex flex-col gap-5 justify-center">
                <p className={`leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {exp.description}
                </p>

                <ul className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isDark ? "bg-blue-400" : "bg-emerald-500"
                      }`} />
                      <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots indicator */}
          <div className="flex items-center gap-3">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="relative h-2 transition-all duration-300 rounded-full overflow-hidden"
                style={{
                  width: i === current ? 28 : 8,
                  background: i === current
                    ? (isDark ? "#60a5fa" : "#059669")
                    : (isDark ? "#374151" : "#d1d5db"),
                }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-blue-900/50 text-gray-400 hover:text-blue-300"
                  : "bg-gray-200 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => navigate(1)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-blue-900/50 text-gray-400 hover:text-blue-300"
                  : "bg-gray-200 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
