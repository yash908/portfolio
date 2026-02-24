"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Mail, Github, Linkedin } from "lucide-react";

const socialLinks = [
  { Icon: Github, href: "https://github.com/yash908" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/yash-sarda-974318197/" }
];

export default function Contact() {
  const { isDark } = useTheme();

  return (
    <section
      id="contact"
      className="min-h-screen max-w-4xl mx-auto px-8 flex flex-col justify-center items-center text-center relative"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="w-full relative z-10"
      >
        <p className={`uppercase tracking-[0.3em] font-bold text-sm mb-4 ${
          isDark ? "text-blue-400" : "text-emerald-600"
        }`}>
          What's Next?
        </p>

        <h2 className="text-5xl md:text-7xl font-extrabold mb-8">
          <span className={isDark ? "text-gradient-blue" : "text-gradient-emerald"}>
            Get In Touch
          </span>
        </h2>

        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>

        <a
          href="mailto:yash19091999@gmail.com"
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 ${
            isDark
              ? "bg-blue-500 text-black hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              : "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          }`}
        >
          <Mail size={24} />
          Say Hello
        </a>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-20">
          {socialLinks.map(({ Icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 hover:-translate-y-2 ${
                isDark
                  ? "bg-gray-800 text-gray-400 hover:text-blue-400 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-600 hover:text-emerald-600 hover:bg-gray-300"
              }`}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Decorative background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 rounded-full blur-[100px] opacity-20 pointer-events-none ${
          isDark ? "bg-blue-600" : "bg-emerald-500"
        }`}
      />
    </section>
  );
}
