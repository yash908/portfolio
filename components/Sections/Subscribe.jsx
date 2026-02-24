"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function Subscribe() {
  const { isDark } = useTheme();
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

  return (
    <section
      id="subscribe"
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4"
    >
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(circle, #4f46e5, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="uppercase tracking-[0.35em] font-bold text-xs mb-4"
            style={{ color: "#4f46e5" }}
          >
            Stay Connected
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-5"
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            JOIN THE GRID
          </h2>
          <p
            className="text-sm leading-relaxed mx-auto max-w-xs"
            style={{ color: isDark ? "#64748b" : "#94a3b8" }}
          >
            Get notified about new projects, data insights, and future-forward experiments — delivered straight to your inbox.
          </p>
        </div>

        {/* Glassmorphism Card */}
        <motion.div
          className="relative rounded-3xl p-8"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(255,255,255,0.7)",
            boxShadow: isDark
              ? "0 0 60px rgba(79,70,229,0.10), 0 4px 40px rgba(0,0,0,0.3)"
              : "0 0 60px rgba(79,70,229,0.06), 0 4px 30px rgba(0,0,0,0.08)",
          }}
          whileHover={{
            boxShadow: isDark
              ? "0 0 80px rgba(79,70,229,0.18), 0 4px 40px rgba(0,0,0,0.35)"
              : "0 0 80px rgba(79,70,229,0.10), 0 4px 40px rgba(0,0,0,0.10)",
            transition: { duration: 0.4 },
          }}
        >
          {/* Decorative top gradient line */}
          <div
            className="absolute top-0 left-8 right-8 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(79,70,229,0.6), rgba(59,130,246,0.6), transparent)",
            }}
          />

          {isSuccess ? (
            /* ---- Success State ---- */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center py-6"
            >
              <CheckCircle
                size={48}
                className="mx-auto mb-4"
                style={{ color: "#60a5fa" }}
              />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
              >
                SIGNAL LOCKED
              </h3>
              <p className="text-sm" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
                {message}
              </p>
            </motion.div>
          ) : (
            /* ---- Form State ---- */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name input */}
              <div className="relative group">
                <label
                  htmlFor="sub-name"
                  className="block text-xs font-bold uppercase tracking-[0.18em] mb-2"
                  style={{ color: isDark ? "#475569" : "#94a3b8" }}
                >
                  Designation
                </label>
                <input
                  id="sub-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.6)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(79,70,229,0.2)",
                    color: isDark ? "#e2e8f0" : "#1e293b",
                    boxShadow: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4f46e5";
                    e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(79,70,229,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email input */}
              <div className="relative group">
                <label
                  htmlFor="sub-email"
                  className="block text-xs font-bold uppercase tracking-[0.18em] mb-2"
                  style={{ color: isDark ? "#475569" : "#94a3b8" }}
                >
                  Comm Link
                </label>
                <input
                  id="sub-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.6)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(59,130,246,0.2)",
                    color: isDark ? "#e2e8f0" : "#1e293b",
                    boxShadow: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(59,130,246,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Error / duplicate message */}
              {(status === "error" || status === "duplicate") && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                  }}
                >
                  <AlertCircle size={14} />
                  {message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                className="relative w-full py-4 rounded-xl font-bold text-sm tracking-[0.18em] uppercase text-white transition-all duration-300 disabled:cursor-not-allowed overflow-hidden mt-1"
                style={{
                  background: isLoading
                    ? "rgba(79,70,229,0.5)"
                    : "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
                  boxShadow: isLoading
                    ? "none"
                    : "0 0 24px rgba(79,70,229,0.35)",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    Initializing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={15} />
                    Initialize Connection
                  </span>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-6 tracking-wide"
          style={{ color: isDark ? "#334155" : "#cbd5e1" }}
        >
          No noise. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
