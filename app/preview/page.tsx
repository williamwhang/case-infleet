"use client";
import Image from "next/image";
import { DesafioSection } from "@/components/sections/DesafioSection";

const META = ["Infleet", "Enterprise", "Fleet Management · Telemetria", "12 semanas", "2025–2026"];

export default function PreviewPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
      <DesafioSection />
    </div>
  );
}

function _OriginalPreviewPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans, sans-serif)" }}>

      {/* ─── CAMINHO 1 — Dark hero completo ─── */}
      <section style={{ background: "#080808", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Topo: label de navegação */}
        <div style={{ padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#ffffff30", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Caminho 1 — Dark hero completo
          </span>
          <span style={{ color: "#ffffff20", fontSize: "0.7rem", letterSpacing: "0.1em" }}>William Whang · Portfolio</span>
        </div>

        {/* Tags */}
        <div style={{ padding: "0 48px", display: "flex", gap: 8, marginBottom: 40 }}>
          {["Enterprise SaaS", "Gestão de Frotas", "IA + Hardware", "Enterprise"].map((t) => (
            <span key={t} style={{
              fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#ffffff50", border: "0.5px solid #ffffff18", borderRadius: 20, padding: "4px 12px"
            }}>{t}</span>
          ))}
        </div>

        {/* Headline principal */}
        <div style={{ padding: "0 48px", maxWidth: 860, marginBottom: 20 }}>
          <h1 style={{
            fontSize: "clamp(2.8rem, 5vw, 5rem)", fontWeight: 600, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#ffffff", margin: 0
          }}>
            O problema não era a IA.
            <br />
            <span style={{ color: "#ffffff80" }}>Era a falta de governança.</span>
          </h1>
        </div>

        {/* Subtítulo */}
        <div style={{ padding: "0 48px", maxWidth: 560, marginBottom: 56 }}>
          <p style={{ color: "#ffffff40", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            De 70% de viagens sem identificação a uma camada de governança operacional
            com audit trail, validação humana e zero falsos positivos críticos.
          </p>
        </div>

        {/* Imagem full-width: silhueta + produto no monitor */}
        <div style={{ flex: 1, position: "relative", minHeight: 480 }}>
          <Image
            src="/images/hero-silhouette.png"
            alt="Revisão de identificação de motoristas — Infleet"
            fill
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            unoptimized
            priority
          />
          {/* Vinheta topo */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #080808 0%, transparent 18%, transparent 70%, #080808 100%)"
          }} />
        </div>

        {/* Metadata row */}
        <div style={{
          padding: "28px 48px",
          display: "flex", gap: 40, alignItems: "center",
          borderTop: "0.5px solid #ffffff0f"
        }}>
          {META.map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: "0.6rem", color: "#ffffff25", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>
                {["Empresa", "Segmento", "Indústria", "Duração", "Ano"][i]}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#ffffff60" }}>{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CAMINHO 2 — Hero híbrido ─── */}
      <section style={{ background: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Topo: label */}
        <div style={{ padding: "28px 48px", borderBottom: "0.5px solid #f0f0f0" }}>
          <span style={{ color: "#00000030", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Caminho 2 — Hero híbrido (claro + break escuro)
          </span>
        </div>

        {/* Tags */}
        <div style={{ padding: "48px 48px 0", display: "flex", gap: 8, marginBottom: 32 }}>
          {["Infleet · 2024", "Governança de IA", "SaaS B2B Enterprise"].map((t) => (
            <span key={t} style={{
              fontSize: "0.7rem", color: "#6b6b6b",
              border: "0.5px solid #e8e8e6", borderRadius: 20, padding: "5px 14px"
            }}>{t}</span>
          ))}
        </div>

        {/* Headline (light) */}
        <div style={{ padding: "0 48px", maxWidth: 680, marginBottom: 16 }}>
          <h1 style={{
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)", fontWeight: 500, lineHeight: 1.1,
            letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0
          }}>
            Sem identificar o motorista,
            <br />
            <span style={{ color: "#aaa" }}>todo o sistema perde confiabilidade.</span>
          </h1>
        </div>

        {/* Sub */}
        <div style={{ padding: "0 48px", maxWidth: 520, marginBottom: 48 }}>
          <p style={{ color: "#6b6b6b", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
            Uma solução de governança operacional para o problema de identificação
            de motoristas em frotas com video telemetria.
          </p>
        </div>

        {/* Break escuro — silhueta cinematográfica */}
        <div style={{ position: "relative", height: 420, margin: "0 0 0 0", flexShrink: 0 }}>
          <Image
            src="/images/hero-silhouette.png"
            alt="Revisão de identificação de motoristas — Infleet"
            fill
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            unoptimized
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #ffffff 0%, transparent 10%, transparent 85%, #ffffff 100%)"
          }} />

          {/* Headline sobreposta na imagem */}
          <div style={{
            position: "absolute", bottom: 40, left: 48,
            display: "flex", flexDirection: "column", gap: 6
          }}>
            <p style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 600,
              color: "#ffffff", letterSpacing: "-0.02em", margin: 0,
              textShadow: "0 2px 20px rgba(0,0,0,0.4)"
            }}>
              O problema não era a IA.
            </p>
            <p style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 600,
              color: "#ffffff90", letterSpacing: "-0.02em", margin: 0,
              textShadow: "0 2px 20px rgba(0,0,0,0.4)"
            }}>
              Era a falta de governança.
            </p>
          </div>
        </div>

        {/* Metadata row — light */}
        <div style={{
          padding: "28px 48px",
          display: "flex", gap: 40, alignItems: "center",
          borderTop: "0.5px solid #e8e8e6", borderBottom: "0.5px solid #e8e8e6"
        }}>
          {META.map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: "0.6rem", color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>
                {["Empresa", "Segmento", "Indústria", "Duração", "Ano"][i]}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#1a1a1a", fontWeight: 500 }}>{item}</div>
            </div>
          ))}
        </div>

        {/* Continua com o resto do case study... */}
        <div style={{ padding: "48px 48px", color: "#aaa", fontSize: "0.8rem" }}>
          ↓ continua com as secções existentes (O Problema, Discovery, Trade-off…)
        </div>
      </section>

    </div>
  );
}
