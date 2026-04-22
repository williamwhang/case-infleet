"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "s-hero",      label: "Intro"       },
  { id: "s-problem",   label: "Problema"    },
  { id: "s-discovery", label: "Discovery"   },
  { id: "s-tradeoff",  label: "Trade-off"   },
  { id: "s-solution",  label: "Solução"     },
  { id: "s-prototype", label: "Protótipo"   },
  { id: "s-results",   label: "Resultados"  },
];

export function SectionNav() {
  const [active, setActive] = useState("s-hero");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            setDark(entry.target.id === "s-tradeoff");
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const color = dark ? "#ffffff" : "#1a1a1a";

  return (
    <nav
      aria-label="Navegação por secções"
      style={{
        position: "fixed",
        left: "max(12px, calc(50vw - 390px))",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      className="hidden-mobile"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label={`Ir para ${label}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: isActive ? 1 : 0.3,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* Line */}
            <div
              style={{
                height: "1px",
                width: isActive ? 20 : 6,
                background: color,
                transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
                flexShrink: 0,
              }}
            />
            {/* Label — only visible when active */}
            <span
              style={{
                fontSize: 9,
                color,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 500,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.4s ease, color 0.4s ease",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
