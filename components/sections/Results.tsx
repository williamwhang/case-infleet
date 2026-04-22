const metrics = [
  { value: "30% → 65%", label: "Reconhecimento automático", note: "Taxa de identificação na primeira tentativa" },
  { value: "−66%", label: "Tickets de suporte", note: "Volume de abertura por mês" },
  { value: "0", label: "Falsos positivos críticos", note: "Motorista errado confirmado no relatório" },
  { value: "+NPS", label: "Gestores de frota", note: "Percepção de controle e transparência" },
];

export function Results() {
  return (
    <section className="pb-20">
      <p className="text-xs font-medium tracking-widest uppercase text-muted mb-6">
        Resultados
      </p>

      <h2 className="text-xl font-medium text-ink mb-10 leading-snug">
        O sistema deixou de ser uma caixa-preta.
      </h2>

      {/* Metrics grid 2x2 */}
      <div
        className="grid grid-cols-2 rounded-card overflow-hidden mb-10"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            className="px-6 py-6"
            style={{
              borderRight: i % 2 === 0 ? "0.5px solid #e8e8e6" : "none",
              borderBottom: i < 2 ? "0.5px solid #e8e8e6" : "none",
            }}
          >
            <div
              className="font-semibold text-ink mb-1"
              style={{ fontSize: "2.3rem", lineHeight: 1, letterSpacing: "-0.02em" }}
            >
              {m.value}
            </div>
            <div className="text-xs font-medium text-ink mb-1">{m.label}</div>
            <div className="text-xs text-muted">{m.note}</div>
          </div>
        ))}
      </div>

      {/* Copy change */}
      <div
        className="flex items-center gap-3 rounded-base px-5 py-4 mb-8 bg-surface"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        <span
          className="text-xs px-2.5 py-1 rounded-full line-through text-muted"
          style={{ background: "#E24B4A15", color: "#E24B4A" }}
        >
          Falha de IA
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M0 5h14M10 1l4 4-4 4" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ background: "#1D9E7515", color: "#1D9E75" }}
        >
          Pendência de identificação
        </span>
        <span className="text-xs text-muted ml-auto">mudança de linguagem</span>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-2 gap-3 mb-14">
        <div
          className="rounded-card px-5 py-5"
          style={{ border: "0.5px solid #e8e8e6" }}
        >
          <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-3">
            Comportamento
          </p>
          <ul className="space-y-2">
            {[
              "Gestores pararam de abrir tickets para saber o status",
              "Motoristas passaram a ser notificados proativamente",
              "Sabotagens ficaram rastreáveis e evidenciadas",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted">
                <span className="text-emerald shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-card px-5 py-5"
          style={{ border: "0.5px solid #e8e8e6" }}
        >
          <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-3">
            Negócio
          </p>
          <ul className="space-y-2">
            {[
              "Relatórios contratuais passaram a ter 100% de cobertura",
              "Churn por insatisfação com dados caiu no trimestre",
              "Funcionalidade virou diferencial competitivo em demos",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted">
                <span className="text-emerald shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Anchor phrase */}
      <div
        className="text-center py-10 px-6 rounded-card"
        style={{ border: "0.5px solid #EF9F27", background: "#EF9F2708" }}
      >
        <p
          className="font-serif text-ink"
          style={{ fontSize: "1.3rem", lineHeight: 1.5, fontStyle: "italic" }}
        >
          &ldquo;IA imperfeita não precisa bloquear o produto — desde que o sistema saiba
          governar seus erros.&rdquo;
        </p>
      </div>
    </section>
  );
}
