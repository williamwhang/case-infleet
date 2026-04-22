"use client";

import Image from "next/image";

const TAGS = [
  "Governança Operacional",
  "Confiabilidade Sistêmica",
  "Integração Hardware-Software",
  "Mitigação de Risco",
];

export function HeroEditorial() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(560px, 90svh, 860px)",
        overflow: "hidden",
      }}
    >
      {/* ── Fundo: gradiente radial azul-cinza ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 55% 60%, #dde3eb 0%, #c9d2dc 55%, #bcc6d2 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Headline ── */}
      <div
        style={{
          position: "absolute",
          top: "clamp(40px, 8%, 80px)",
          left: "clamp(28px, 6%, 72px)",
          maxWidth: "clamp(280px, 44%, 520px)",
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.9rem, 3.6vw, 3.6rem)",
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#0a0a0a",
            margin: 0,
          }}
        >
          70% das viagens sem motorista. Melhorar a IA{" "}
          <span style={{ color: "#1a5aff" }}>não resolveria o problema</span>
        </h1>
      </div>

      {/* ── Laptop: centralizado, sangra na base ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(480px, 68%, 860px)",
          zIndex: 10,
          lineHeight: 0,
        }}
      >
        <Image
          src="/images/gestao-de-frota.png"
          alt="Dashboard de revisão de identificação de motoristas — Infleet"
          width={1400}
          height={900}
          priority
          unoptimized
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* ── Rodapé: descrição + tags ── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(24px, 5%, 48px)",
          left: "clamp(28px, 6%, 72px)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          maxWidth: "clamp(280px, 38%, 440px)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.75rem, 0.95vw, 0.9rem)",
            color: "#0a0a0a75",
            lineHeight: 1.65,
            margin: 0,
            fontWeight: 400,
          }}
        >
          Como transformamos um sistema falho em um fluxo operacional
          confiável, reduzindo o risco de churn em clientes enterprise.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TAGS.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#0a0a0a65",
                padding: "5px 12px",
                borderRadius: 100,
                border: "0.5px solid rgba(10,10,10,0.22)",
                fontWeight: 500,
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
