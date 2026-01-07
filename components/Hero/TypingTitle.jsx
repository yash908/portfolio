"use client";

import { useEffect, useState } from "react";

export default function TypingTitle({ text }) {
  const [output, setOutput] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => {
        setOutput((p) => p + text[i]);
        setI(i + 1);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [i, text]);

  return (
    <h1 className="text-6xl font-bold tracking-widest min-h-[140px]">
      {output}
      <span className="animate-pulse">|</span>
    </h1>
  );
}
