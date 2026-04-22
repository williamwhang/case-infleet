/* ─────────────────────────────────────────────────
   Secção 3 — Overview
   Fundo escuro, duas colunas:
   Esq → metadados do projecto
   Dir → Desafio / Decisão / Impacto + métricas
   Final → PAPEL (full-width, separado)
───────────────────────────────────────────────── */

const META = [
  { label: "Empresa",   value: "infleet.com.br" },
  { label: "Modelo",    value: "SaaS B2B · Gestão de Frotas Enterprise" },
  { label: "Indústria", value: "Segurança e Telemetria Veicular" },
  { label: "Segmento",  value: "Enterprise" },
  {
    label: "Time",
    value: ["Product Manager", "Product Designer", "Tech Lead",
            "Back-end e Front-end", "Equipe de Hardware", "Stakeholders"],
  },
  { label: "Duração", value: "12 semanas (4 discovery + 8 build)" },
  {
    label: "Status",
    value: ["Lançado para 2 clientes enterprise estratégicos",
            "Risco de churn mitigado"],
  },
];

const IMPACTS = [
  {
    metric: "+30 p.p.",
    label: "Aumento na identificação automática (~30% → ~60%)",
  },
  {
    metric: "Mesmo dia",
    sub: "Dias → Horas",
    label: "Resolução de pendências passou a ocorrer no mesmo dia (antes dependia de suporte e podia levar dias)",
  },
  {
    metric: "−50%",
    label: "Redução de tickets relacionados à identificação",
  },
];

const PAPEL_BULLETS = [
  "Reposicionei o foco exclusivo no algoritmo para governança operacional e mitigação de risco.",
  "Estruturei a arquitetura de estados para tornar as falhas da IA visíveis e operáveis.",
  "Optei por não implementar validação em massa naquele momento, priorizando estabilidade e redução de risco jurídico associado a falsos positivos.",
];

function MetaRow({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 28 }}>
      <span style={{
        fontSize: "0.52rem", color: "#ffffff28",
        letterSpacing: "0.14em", textTransform: "uppercase",
      }}>
        {label}
      </span>
      {Array.isArray(value) ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {value.map((v) => (
            <span key={v} style={{ fontSize: "0.82rem", color: "#ffffffcc", lineHeight: 1.6 }}>{v}</span>
          ))}
        </div>
      ) : (
        <span style={{ fontSize: "0.82rem", color: "#ffffffcc", lineHeight: 1.6 }}>{value}</span>
      )}
    </div>
  );
}

export function Overview() {
  const pad = "clamp(48px, 7vw, 96px)";
  const padH = "clamp(28px, 5vw, 72px)";

  return (
    <section style={{ background: "#0e0e0e", borderTop: "0.5px solid #ffffff0a" }}>

      {/* ── Header ── */}
      <div style={{ padding: `${pad} ${padH} 0` }}>
        <p style={{
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
          color: "#ffffff", margin: 0, letterSpacing: "-0.02em",
        }}>
          Overview
        </p>
      </div>

      {/* ── Two-column grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "clamp(32px, 6vw, 80px)",
        alignItems: "start",
        padding: `clamp(40px, 5vw, 64px) ${padH}`,
      }}>

        {/* Left: metadata */}
        <div style={{ paddingTop: 4 }}>
          {META.map((m) => (
            <MetaRow key={m.label} label={m.label} value={m.value as string | string[]} />
          ))}
        </div>

        {/* Right: narrative + impact */}
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>

          {/* Desafio */}
          <div>
            <p style={{ fontSize: "0.52rem", color: "#ffffff28", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
              Desafio
            </p>
            <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
              70% de falha em produção e contratos enterprise sob risco
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#ffffff50", lineHeight: 1.8, margin: 0 }}>
              O sistema de reconhecimento facial operava com baixa confiabilidade, colocando em
              risco a segurança jurídica de clientes que dependiam desse dado para auditoria.
            </p>
          </div>

          {/* Decisão */}
          <div>
            <p style={{ fontSize: "0.52rem", color: "#ffffff28", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
              Decisão
            </p>
            <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
              Criar governança operacional enquanto a IA evoluía.
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#ffffff50", lineHeight: 1.8, margin: 0 }}>
              Em vez de aguardar a evolução incerta do algoritmo, estruturamos uma camada de
              governança operacional para tornar as falhas visíveis e acionáveis imediatamente.
            </p>
          </div>

          {/* Impacto */}
          <div>
            <p style={{ fontSize: "0.52rem", color: "#ffffff28", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
              Impacto
            </p>
            <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
              Medindo evolução operacional
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {IMPACTS.map((imp, i) => (
                <div key={i} style={{
                  padding: "22px 24px",
                  background: "#131313",
                  border: "0.5px solid #ffffff08",
                  borderRadius: i === 0 ? "8px 0 0 0" : i === 1 ? "0 8px 0 0" : "0 0 8px 8px",
                  gridColumn: i === 2 ? "1 / -1" : "auto",
                }}>
                  <div style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: imp.sub ? 5 : 10 }}>
                    {imp.metric}
                  </div>
                  {imp.sub && (
                    <div style={{ fontSize: "0.7rem", color: "#EF9F27", fontWeight: 600, marginBottom: 10 }}>
                      {imp.sub}
                    </div>
                  )}
                  <p style={{ fontSize: "0.7rem", color: "#ffffff30", lineHeight: 1.65, margin: 0 }}>
                    {imp.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: "0.5px", background: "#ffffff08", margin: `0 ${padH}` }} />

      {/* ── PAPEL — full-width, abaixo do grid ── */}
      <div style={{
        padding: `clamp(40px, 5vw, 64px) ${padH} ${pad}`,
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "clamp(32px, 6vw, 80px)",
        alignItems: "start",
      }}>

        {/* Label col */}
        <div style={{ paddingTop: 4 }}>
          <p style={{
            fontSize: "0.52rem", color: "#ffffff28",
            letterSpacing: "0.14em", textTransform: "uppercase", margin: 0,
          }}>
            Papel
          </p>
        </div>

        {/* Content col */}
        <div>
          <p style={{ fontSize: "0.9rem", color: "#ffffffaa", lineHeight: 1.8, margin: "0 0 28px" }}>
            Atuei como principal referência de design no projeto, conduzindo o
            discovery técnico e o mapeamento sistêmico que fundamentou a
            arquitetura da solução. Influenciei decisões críticas junto a PM e
            engenharia para viabilizar o produto sob limitações reais de IA,
            hardware e conectividade.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#ffffff30", letterSpacing: "0.04em", margin: "0 0 16px" }}>
            Ao longo do projeto:
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {PAPEL_BULLETS.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{
                  flexShrink: 0, marginTop: 6,
                  width: 4, height: 4, borderRadius: "50%",
                  background: "#EF9F27", display: "block",
                }} />
                <span style={{ fontSize: "0.82rem", color: "#ffffff55", lineHeight: 1.75 }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
