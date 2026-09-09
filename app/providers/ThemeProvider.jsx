"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "theme";

/**
 * Reads the theme that the blocking script in app/layout.tsx already applied to
 * <html>. Doing it this way — rather than defaulting to dark and correcting in
 * an effect — means React's first render already agrees with the DOM, so there
 * is no flash of the wrong theme and no cascading re-render on mount.
 */
const getInitialTheme = () => {
  if (typeof document === "undefined") return true; // SSR default: dark
  return document.documentElement.classList.contains("dark");
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Safari private mode and similar throw on write. A non-persisted theme
      // is a acceptable degradation; a crashed page is not.
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
