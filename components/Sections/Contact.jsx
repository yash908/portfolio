"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import { staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

const socialLinks = [
  { Icon: Github, href: "https://github.com/yash908", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/yash-sarda-974318197/",
    label: "LinkedIn",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-28">
      {/* The card frame stays put and its contents arrive in sequence. Fading a
          whole tall card reads as one flat block; staggering the contents is
          what makes it feel like a reveal. */}
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="surface p-10 md:p-16 text-center"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-4">
          What&apos;s next
        </motion.p>

        <SplitText
          text="Get in touch"
          as="h2"
          className="text-3xl md:text-5xl mb-5"
          delay={0.15}
        />

        <motion.p
          variants={fadeUp}
          className="text-fg-muted max-w-lg mx-auto mb-9 leading-relaxed"
        >
          I&apos;m currently open to new opportunities. Whether you have a question, a
          project idea, or just want to say hi, I&apos;ll try my best to get back to you.
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="mailto:yash19091999@gmail.com"
          className="btn btn-primary"
        >
          <Mail size={16} />
          Say hello
        </motion.a>

        {/* No initial/whileInView here — it inherits the parent's variant labels,
            so it sequences after the button instead of racing it. */}
        <motion.div
          variants={staggerContainer(0.1, 0.35)}
          className="flex justify-center gap-2 mt-12 pt-8 border-t border-line-subtle"
        >
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              variants={fadeUp}
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="btn btn-ghost !p-2.5 rounded-md"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
