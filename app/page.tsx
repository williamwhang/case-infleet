import { HeroEditorial } from "@/components/sections/HeroEditorial";
import { HeroImage } from "@/components/sections/HeroImage";
import { Overview } from "@/components/sections/Overview";
import { DesafioSection } from "@/components/sections/DesafioSection";
import { Discovery } from "@/components/sections/Discovery";
import { Tradeoff } from "@/components/sections/Tradeoff";
import { Solution } from "@/components/sections/Solution";
import { Prototype } from "@/components/sections/Prototype";
import { AuditWireframe } from "@/components/sections/AuditWireframe";
import { Results } from "@/components/sections/Results";
import { FadeIn } from "@/components/ui/FadeIn";

const cx = "mx-auto px-5";
const mw = { maxWidth: 680 } as const;

export default function Portfolio() {
  return (
    <>
      {/* 1. Hero Editorial — full-bleed com laptop */}
      <HeroEditorial />

      {/* 2. Imagem full-bleed — silhueta + produto no monitor */}
      <HeroImage />

      {/* 3. Overview — metadados + desafio / decisão / impacto */}
      <Overview />

      {/* 4. Desafios — sirnik sticky stacking cards */}
      <div id="s-problem">
        <DesafioSection />
      </div>

      {/* ── Respiro após Desafios ── */}
      <div style={{ height: "clamp(64px, 8vw, 120px)", background: "#fff" }} />

      {/* 5. Discovery */}
      <div id="s-discovery" className={cx} style={{ ...mw, paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <FadeIn>
          <Discovery />
        </FadeIn>
      </div>

      {/* 6. Trade-off — full-bleed dark */}
      <Tradeoff />

      {/* ── Respiro após Tradeoff ── */}
      <div style={{ height: "clamp(64px, 8vw, 120px)", background: "#fff" }} />

      {/* 7. Solução */}
      <div id="s-solution" className={cx} style={{ ...mw, paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <FadeIn>
          <Solution />
        </FadeIn>
      </div>

      {/* ── Divider ── */}
      <div className={cx} style={{ ...mw, paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <hr style={{ border: "none", borderTop: "0.5px solid #e8e8e6" }} />
      </div>

      {/* 8. Protótipo Real */}
      <div id="s-prototype" className={cx} style={{ ...mw, paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <FadeIn>
          <Prototype />
        </FadeIn>
      </div>

      {/* 9. Wireframe de Auditoria */}
      <div className={cx} style={{ ...mw, paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <FadeIn>
          <AuditWireframe />
        </FadeIn>
      </div>

      {/* 10. Resultados */}
      <div id="s-results" className={cx} style={{ ...mw, paddingBottom: "clamp(64px, 8vw, 120px)" }}>
        <FadeIn>
          <Results />
        </FadeIn>
      </div>

      {/* Footer */}
      <div className={cx} style={mw}>
        <footer
          className="border-t py-10 text-center"
          style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
        >
          <p className="text-xs text-muted">William Whang · Product Designer · 2024</p>
          <p className="text-[11px] text-muted/60 mt-1">portfolio-infleet.vercel.app</p>
        </footer>
      </div>
    </>
  );
}
