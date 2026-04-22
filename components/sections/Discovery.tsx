export function Discovery() {
  const insights = [
    { value: "3/5", label: "das falhas", cause: "Sabotagem deliberada", detail: "Câmera coberta, crachá esquecido, recusa de identificação" },
    { value: "~30%", label: "das falhas", cause: "Hardware e conectividade", detail: "Câmera com defeito, sinal intermitente, sincronização com atraso" },
    { value: "~10%", label: "das falhas", cause: "O algoritmo de IA", detail: "Baixa confiança, modelo desatualizado, iluminação insuficiente" },
  ];

  return (
    <section className="pb-20">
      <p className="text-xs font-medium tracking-widest uppercase text-muted mb-6">
        Discovery
      </p>

      <h2 className="text-xl font-medium text-ink mb-4 leading-snug">
        O problema não estava apenas na IA
      </h2>

      <p className="text-sm text-muted leading-relaxed mb-10">
        Entrevistas com gestores de frota, análise de tickets e revisão dos logs revelaram
        três categorias distintas de falha. A IA era responsável por uma fração pequena.
        A maior parte era humana — e tratável com governança, não com modelo.
      </p>

      {/* Insights */}
      <div className="space-y-px mb-10" style={{ border: "0.5px solid #e8e8e6", borderRadius: 12, overflow: "hidden" }}>
        {insights.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-5 px-5 py-5 bg-canvas"
            style={{ borderBottom: i < insights.length - 1 ? "0.5px solid #e8e8e6" : "none" }}
          >
            <span
              className="font-semibold text-ink shrink-0"
              style={{ fontSize: "2rem", lineHeight: 1, letterSpacing: "-0.02em", minWidth: 64 }}
            >
              {item.value}
            </span>
            <div>
              <p className="text-xs text-muted mb-0.5">{item.label}</p>
              <p className="text-sm font-medium text-ink mb-1">{item.cause}</p>
              <p className="text-xs text-muted leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pull quote */}
      <blockquote
        className="font-serif pl-4 mb-10 text-ink"
        style={{
          fontSize: "1.3rem",
          lineHeight: 1.5,
          fontStyle: "italic",
          borderLeft: "2px solid #EF9F27",
        }}
      >
        &ldquo;O problema não era apenas falhar — era errar sem visibilidade.&rdquo;
      </blockquote>

      {/* AI States SVG */}
      <div
        className="rounded-card p-6 bg-surface"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-5">
          Estados do sistema de IA
        </p>
        <svg viewBox="0 0 580 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* Input */}
          <rect x="0" y="58" width="80" height="36" rx="6" fill="#f8f8f6" stroke="#e8e8e6" strokeWidth="0.75"/>
          <text x="40" y="78" textAnchor="middle" fontSize="10" fill="#6b6b6b">Entrada</text>
          <text x="40" y="90" textAnchor="middle" fontSize="9" fill="#9b9b9b">(frame)</text>

          {/* AI box */}
          <rect x="110" y="50" width="110" height="52" rx="6" fill="#1a1a1a08" stroke="#1a1a1a30" strokeWidth="0.75"/>
          <text x="165" y="73" textAnchor="middle" fontSize="10" fill="#1a1a1a">Algoritmo de IA</text>
          <text x="165" y="87" textAnchor="middle" fontSize="9" fill="#6b6b6b">reconhecimento facial</text>

          {/* Output states */}
          <rect x="260" y="8" width="110" height="36" rx="6" fill="#1D9E7510" stroke="#1D9E75" strokeWidth="0.75"/>
          <text x="315" y="30" textAnchor="middle" fontSize="10" fill="#1D9E75">Identificado</text>
          <text x="315" y="41" textAnchor="middle" fontSize="9" fill="#1D9E75">confiança ≥ 80%</text>

          <rect x="260" y="58" width="110" height="36" rx="6" fill="#EF9F2710" stroke="#EF9F27" strokeWidth="0.75"/>
          <text x="315" y="79" textAnchor="middle" fontSize="10" fill="#EF9F27">Baixa confiança</text>
          <text x="315" y="90" textAnchor="middle" fontSize="9" fill="#EF9F27">40% – 79%</text>

          <rect x="260" y="108" width="110" height="36" rx="6" fill="#E24B4A10" stroke="#E24B4A" strokeWidth="0.75"/>
          <text x="315" y="129" textAnchor="middle" fontSize="10" fill="#E24B4A">Não identificado</text>
          <text x="315" y="140" textAnchor="middle" fontSize="9" fill="#E24B4A">confiança &lt; 40%</text>

          {/* Result for failures */}
          <rect x="410" y="58" width="100" height="36" rx="6" fill="#EF9F2710" stroke="#EF9F27" strokeWidth="1"/>
          <text x="460" y="78" textAnchor="middle" fontSize="10" fill="#EF9F27">Pendência</text>
          <text x="460" y="90" textAnchor="middle" fontSize="9" fill="#EF9F27">sem fluxo</text>

          <rect x="410" y="108" width="100" height="36" rx="6" fill="#E24B4A10" stroke="#E24B4A" strokeWidth="1"/>
          <text x="460" y="128" textAnchor="middle" fontSize="10" fill="#E24B4A">Falha silenciosa</text>
          <text x="460" y="140" textAnchor="middle" fontSize="9" fill="#E24B4A">caixa-preta</text>

          {/* Arrows */}
          <path d="M80 76 L110 76" stroke="#e8e8e6" strokeWidth="1" markerEnd="url(#arrowG)"/>
          <path d="M220 60 Q240 26 260 26" stroke="#1D9E75" strokeWidth="0.75" markerEnd="url(#arrowGreen)"/>
          <path d="M220 76 L260 76" stroke="#EF9F27" strokeWidth="0.75" markerEnd="url(#arrowYellow)"/>
          <path d="M220 90 Q240 116 260 116" stroke="#E24B4A" strokeWidth="0.75" markerEnd="url(#arrowRed)"/>
          <path d="M370 76 L410 76" stroke="#EF9F27" strokeWidth="0.75" strokeDasharray="3 2" markerEnd="url(#arrowYellow)"/>
          <path d="M370 126 L410 126" stroke="#E24B4A" strokeWidth="0.75" strokeDasharray="3 2" markerEnd="url(#arrowRed)"/>

          <defs>
            <marker id="arrowG" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#e8e8e6"/>
            </marker>
            <marker id="arrowGreen" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#1D9E75"/>
            </marker>
            <marker id="arrowYellow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#EF9F27"/>
            </marker>
            <marker id="arrowRed" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#E24B4A"/>
            </marker>
          </defs>
        </svg>
      </div>
    </section>
  );
}
