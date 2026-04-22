import { Stepper } from "@/components/ui/Stepper";

const paths = [
  { id: 1, label: "Associar manualmente", desc: "Selecionar motorista da lista" },
  { id: 2, label: "Vincular NFC/crachá", desc: "Registro físico do motorista" },
  { id: 3, label: "Reconhecimento facial manual", desc: "Upload de foto para confirmação" },
  { id: 4, label: "Confirmar por agenda", desc: "Escala prevista para o veículo" },
  { id: 5, label: "Marcar como privado", desc: "Viagem não rastreável por política" },
  { id: 6, label: "Dispensar", desc: "Veículo sem motorista obrigatório" },
  { id: 7, label: "Escalar para admin", desc: "Decisão requer nível superior" },
];

export function Solution() {
  return (
    <section className="pb-20">
      <p className="text-xs font-medium tracking-widest uppercase text-muted mb-6">
        Solução
      </p>

      <h2 className="text-xl font-medium text-ink mb-4 leading-snug">
        Governar o erro antes de esperar a IA ficar perfeita.
      </h2>

      <p className="text-sm text-muted leading-relaxed mb-10">
        Em vez de aguardar melhorias no modelo, projetamos uma camada de governança: uma
        interface onde gestores resolvem pendências de forma auditada, com contexto completo
        e múltiplos caminhos de resolução. O sistema continua funcionando — com transparência.
      </p>

      {/* "Depois" flow SVG */}
      <div
        className="rounded-card p-6 bg-surface mb-8"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-5">
          Fluxo com governança
        </p>
        <svg viewBox="0 0 620 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <rect x="0" y="42" width="80" height="36" rx="6" fill="#f8f8f6" stroke="#e8e8e6" strokeWidth="0.75"/>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#6b6b6b">GPS / Câmera</text>

          <rect x="110" y="42" width="90" height="36" rx="6" fill="#f8f8f6" stroke="#e8e8e6" strokeWidth="0.75"/>
          <text x="155" y="65" textAnchor="middle" fontSize="10" fill="#6b6b6b">Evento IA</text>

          <rect x="232" y="36" width="110" height="48" rx="6" fill="#1a1a1a08" stroke="#1a1a1a30" strokeWidth="0.75"/>
          <text x="287" y="58" textAnchor="middle" fontSize="10" fill="#1a1a1a" fontWeight="500">Governança</text>
          <text x="287" y="72" textAnchor="middle" fontSize="9" fill="#6b6b6b">fila de pendências</text>

          {/* Resolved */}
          <rect x="382" y="10" width="110" height="36" rx="6" fill="#1D9E7510" stroke="#1D9E75" strokeWidth="0.75"/>
          <text x="437" y="31" textAnchor="middle" fontSize="10" fill="#1D9E75">Identificado</text>
          <text x="437" y="42" textAnchor="middle" fontSize="9" fill="#1D9E75">IA ou gestor</text>

          {/* Pending resolved */}
          <rect x="382" y="74" width="110" height="36" rx="6" fill="#1D9E7510" stroke="#1D9E75" strokeWidth="0.75"/>
          <text x="437" y="95" textAnchor="middle" fontSize="10" fill="#1D9E75">Resolvido</text>
          <text x="437" y="106" textAnchor="middle" fontSize="9" fill="#1D9E75">auditado</text>

          {/* Dashboard */}
          <rect x="528" y="42" width="84" height="36" rx="6" fill="#1D9E7510" stroke="#1D9E75" strokeWidth="0.75"/>
          <text x="570" y="63" textAnchor="middle" fontSize="10" fill="#1D9E75">Dashboard</text>

          {/* Arrows */}
          <path d="M80 60 L110 60" stroke="#e8e8e6" strokeWidth="1" markerEnd="url(#arrowGov)"/>
          <path d="M200 60 L232 60" stroke="#e8e8e6" strokeWidth="1" markerEnd="url(#arrowGov)"/>
          <path d="M342 48 Q362 28 382 28" stroke="#1D9E75" strokeWidth="0.75" markerEnd="url(#arrowGovG)"/>
          <path d="M342 72 Q362 92 382 92" stroke="#1D9E75" strokeWidth="0.75" markerEnd="url(#arrowGovG)"/>
          <path d="M492 28 Q510 28 528 60" stroke="#1D9E75" strokeWidth="0.75" markerEnd="url(#arrowGovG)"/>
          <path d="M492 92 Q510 92 528 78" stroke="#1D9E75" strokeWidth="0.75" markerEnd="url(#arrowGovG)"/>

          <defs>
            <marker id="arrowGov" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#e8e8e6"/>
            </marker>
            <marker id="arrowGovG" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#1D9E75"/>
            </marker>
          </defs>
        </svg>
      </div>

      {/* 7 resolution paths */}
      <div
        className="rounded-card p-6 bg-surface mb-8"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-5">
          7 caminhos de resolução
        </p>
        <div className="grid grid-cols-1 gap-px" style={{ background: "#e8e8e6", borderRadius: 8, overflow: "hidden" }}>
          {paths.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3 bg-canvas">
              <span
                className="w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center shrink-0"
                style={{ background: "#EF9F2715", color: "#EF9F27" }}
              >
                {p.id}
              </span>
              <div>
                <span className="text-sm font-medium text-ink">{p.label}</span>
                <span className="text-xs text-muted ml-2">{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Stepper */}
      <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-4">
        Fluxo de resolução — interativo
      </p>
      <Stepper />
    </section>
  );
}
