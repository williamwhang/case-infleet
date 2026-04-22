"use client";

import { WordReveal } from "@/components/ui/WordReveal";
import { FadeIn } from "@/components/ui/FadeIn";

export function Tradeoff() {
  return (
    <section
      id="s-tradeoff"
      style={{
        background: "#0d0d0d",
        width: "100%",
        padding: "110px 20px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Label */}
        <FadeIn>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            O trade-off
          </p>
        </FadeIn>

        {/* Main quote */}
        <WordReveal
          text="Dado errado é pior que dado ausente."
          stagger={70}
          style={{
            fontSize: "2.6rem",
            lineHeight: 1.35,
            fontStyle: "italic",
            fontFamily: "var(--font-lora, Georgia, serif)",
            color: "#ffffff",
            marginBottom: 36,
          }}
        />

        {/* Body */}
        <FadeIn delay={400}>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            Mostrar um motorista incorreto — por pressão para fechar KPIs — gera
            distorção nos rankings, invalida métricas de segurança e corrói a confiança
            dos gestores no sistema. Decidimos que o produto deveria ser honesto sobre o
            que não sabe, e oferecer ferramentas para resolver — não esconder.
          </p>
        </FadeIn>

        {/* Amber rule */}
        <FadeIn delay={550}>
          <div
            style={{
              width: 32,
              height: 2,
              background: "#EF9F27",
              margin: "48px auto 0",
              borderRadius: 2,
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
}
