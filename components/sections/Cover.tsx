"use client";

/* ─────────────────────────────────────────────────
   Secção 1 — Cover
   Fundo preto, título bold em duas linhas,
   subtítulo à esquerda em baixo, tags em pill
───────────────────────────────────────────────── */

import { useEffect, useState } from "react";

const TAGS = [
  "Governança Operacional",
  "Confiabilidade Sistêmica",
  "Integração Hardware-Software",
  "Mitigação de Risco",
];

export function Cover() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(28px, 4vw, 56px)",
        boxSizing: "border-box",
      }}
    >
      {/* ── Top: tag line ── */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: "0.6rem", color: "#ffffff30", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          William Whang · Product Design · 2024
        </span>
      </div>

      {/* ── Middle: headline ── */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7.2vw, 8rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          70% das viagens
          <br />
          sem motorista.
          <br />
          <span style={{ color: "#ffffff60" }}>
            Melhorar a IA não
            <br />
            resolveria o problema.
          </span>
        </h1>
      </div>

      {/* ── Bottom: subtitle + tags ── */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.8rem, 1.4vw, 1.05rem)",
            color: "#ffffff50",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "42ch",
          }}
        >
          Como transformamos um sistema falho em um fluxo operacional
          confiável, reduzindo o risco de churn em clientes enterprise.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TAGS.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#ffffff40",
                border: "0.5px solid #ffffff18",
                borderRadius: 100,
                padding: "6px 14px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
