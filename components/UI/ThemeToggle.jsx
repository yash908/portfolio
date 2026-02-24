"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full border backdrop-blur-md hover:scale-110 transition"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-emerald-700" />
      )}
    </button>
  );
}
