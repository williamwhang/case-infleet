"use client";

import { useEffect, useRef, useState } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number; // ms entre palavras
}

export function WordReveal({ text, className, style, stagger = 55 }: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "block", ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(14px)",
            filter: visible ? "blur(0px)" : "blur(4px)",
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms,
                         transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms,
                         filter 0.6s cubic-bezier(0.16,1,0.3,1) ${i * stagger}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
