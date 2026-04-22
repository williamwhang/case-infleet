"use client";

import { useEffect, useState } from "react";

interface AnimatedWordsProps {
  phrases: string[];
  interval?: number;
}

export function AnimatedWords({ phrases, interval = 2000 }: AnimatedWordsProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 400);
    }, interval);

    return () => clearInterval(cycle);
  }, [phrases, interval]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {phrases[index]}
    </span>
  );
}
