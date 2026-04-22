"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const phrases = [
  "todo o sistema perde confiabilidade.",
  "o ranking do motorista fica comprometido.",
  "o contrato entra em risco.",
];

const metrics = [
  { value: 65, from: 30, suffix: "%", label: "Reconhecimento automático", note: "30% → 65%" },
  { value: 66, from: 0, prefix: "−", suffix: "%", label: "Tickets de suporte", note: "redução" },
  { value: 0, from: 0, suffix: "", label: "Falsos positivos críticos", note: "zero ocorrências" },
];


export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="pt-20 pb-20">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {["Infleet · 2024", "Governança de IA", "SaaS B2B Enterprise"].map((tag) => (
          <span key={tag} className="text-xs text-muted px-3 py-1.5 rounded-full"
            style={{ border: "0.5px solid #e8e8e6" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Headline */}
      <h1 className="text-ink leading-tight mb-12"
        style={{ fontSize: "3.8rem", fontWeight: 500, letterSpacing: "-0.02em" }}>
        Sem identificar o motorista,
        <br />
        <AnimatedWords phrases={phrases} />
      </h1>

      {/* ── Dashboard screenshot ── */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
          marginBottom: 56,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.08)",
        }}
      >
        <Image
          src="/images/hero-dashboard.png"
          alt="Tela de revisão de identificação de motoristas — Infleet"
          width={1400}
          height={980}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
          unoptimized
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 rounded-card overflow-hidden" style={{ border: "0.5px solid #e8e8e6" }}>
        {metrics.map((m, i) => (
          <div key={i} className="px-6 py-6"
            style={{ borderRight: i < 2 ? "0.5px solid #e8e8e6" : "none" }}>
            <div className="font-semibold text-ink mb-1"
              style={{ fontSize: "2.6rem", letterSpacing: "-0.02em" }}>
              <AnimatedCounter from={m.from} to={m.value} prefix={m.prefix} suffix={m.suffix} duration={2000} />
            </div>
            <div className="text-xs text-muted leading-snug">{m.label}</div>
            <div className="text-[11px] text-muted/60 mt-1">{m.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
