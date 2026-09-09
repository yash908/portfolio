"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import SplitText from "@/components/motion/SplitText";
import { EASE, DURATION, staggerContainer, fadeUp, VIEWPORT } from "@/lib/motion";

export default function Subscribe() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | duplicate
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({ name: "", email: "" });
      } else if (res.status === 409) {
        setStatus("duplicate");
        setMessage(data.error);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const hasError = status === "error" || status === "duplicate";

  return (
    <section id="subscribe" className="max-w-6xl mx-auto px-6 pb-28">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="surface p-8 md:p-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center"
      >
        <div>
          <motion.p variants={fadeUp} className="eyebrow mb-3">
            Stay connected
          </motion.p>
          <SplitText
            text="Subscribe to updates"
            as="h2"
            className="text-2xl md:text-3xl mb-4"
            delay={0.12}
          />
          <motion.p
            variants={fadeUp}
            className="text-sm text-fg-muted leading-relaxed max-w-sm"
          >
            Get notified about new projects, data insights, and experiments — delivered
            straight to your inbox.
          </motion.p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
            className="flex items-start gap-3 rounded-[0.5rem] border border-line-subtle bg-glass p-5"
          >
            <CheckCircle size={18} className="text-accent-text mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium mb-1">You&apos;re on the list</h3>
              <p className="text-sm text-fg-subtle">{message}</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label
                htmlFor="sub-name"
                className="block text-xs font-medium text-fg-subtle mb-1.5"
              >
                Name
              </label>
              <input
                id="sub-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className="field disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="sub-email"
                className="block text-xs font-medium text-fg-subtle mb-1.5"
              >
                Email
              </label>
              <input
                id="sub-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="field disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary mt-1 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Subscribing
                </>
              ) : (
                <>
                  <Send size={16} />
                  Subscribe
                </>
              )}
            </button>

            {hasError && (
              <p className="flex items-center gap-2 text-xs text-fg-muted">
                <AlertCircle size={14} className="flex-shrink-0" />
                {message}
              </p>
            )}
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}
