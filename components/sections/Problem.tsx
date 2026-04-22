import { WordReveal } from "@/components/ui/WordReveal";
import { FadeIn } from "@/components/ui/FadeIn";

export function Problem() {
  return (
    <section className="pb-20">
      <FadeIn>
        <p className="text-xs font-medium tracking-widest uppercase text-muted mb-8">
          O problema
        </p>
      </FadeIn>

      {/* Main pull quote */}
      <blockquote
        className="font-serif mb-8 text-ink"
        style={{ fontSize: "1.9rem", lineHeight: 1.4, fontStyle: "italic" }}
      >
        <WordReveal
          text="O veículo aparecia rodando no mapa, mas o sistema não dizia quem estava dirigindo."
          stagger={45}
        />
      </blockquote>

      <FadeIn delay={100}>
        <p className="text-sm text-muted leading-relaxed mb-10">
          A plataforma Infleet monitora frotas em tempo real. Cada viagem precisa ser
          associada a um motorista para que KPIs, rankings e relatórios contratuais sejam
          válidos. Quando o sistema de reconhecimento facial falhava — por câmera bloqueada,
          conexão instável ou baixa confiança do modelo — a viagem ficava em aberto como
          &ldquo;não identificada&rdquo;. Sem visibilidade, sem fluxo de resolução.
        </p>
      </FadeIn>

      {/* Secondary pull quote */}
      <FadeIn delay={200}>
        <blockquote
          className="font-serif pl-4 mb-10 text-ink"
          style={{
            fontSize: "1.3rem",
            lineHeight: 1.5,
            fontStyle: "italic",
            borderLeft: "2px solid #EF9F27",
          }}
        >
          &ldquo;O contrato estava em risco.&rdquo;
        </blockquote>
      </FadeIn>

      {/* "Antes" flow SVG */}
      <FadeIn delay={300}>
      <div
        className="rounded-card p-6 bg-surface"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        <p className="text-[10px] font-medium tracking-widest uppercase text-muted mb-5">
          Fluxo antes da solução
        </p>
        <svg
          viewBox="0 0 620 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          {/* Nodes */}
          <rect x="0" y="50" width="90" height="36" rx="6" fill="#f8f8f6" stroke="#e8e8e6" strokeWidth="0.75"/>
          <text x="45" y="73" textAnchor="middle" fontSize="10" fill="#6b6b6b">GPS / Câmera</text>

          <rect x="120" y="50" width="90" height="36" rx="6" fill="#f8f8f6" stroke="#e8e8e6" strokeWidth="0.75"/>
          <text x="165" y="73" textAnchor="middle" fontSize="10" fill="#6b6b6b">Evento IA</text>

          <rect x="240" y="50" width="110" height="36" rx="6" fill="#f8f8f6" stroke="#e8e8e6" strokeWidth="0.75"/>
          <text x="295" y="70" textAnchor="middle" fontSize="10" fill="#6b6b6b">Associação</text>
          <text x="295" y="82" textAnchor="middle" fontSize="10" fill="#6b6b6b">Motorista</text>

          {/* Failure node */}
          <rect x="382" y="45" width="110" height="46" rx="6" fill="#EF9F2710" stroke="#EF9F27" strokeWidth="1"/>
          <text x="437" y="66" textAnchor="middle" fontSize="10" fill="#EF9F27">Motorista</text>
          <text x="437" y="79" textAnchor="middle" fontSize="10" fill="#EF9F27">Desconhecido</text>
          <circle cx="382" cy="45" r="4" fill="#EF9F27"/>

          {/* Ticket node */}
          <rect x="522" y="45" width="90" height="46" rx="6" fill="#EF9F2710" stroke="#EF9F27" strokeWidth="1"/>
          <text x="567" y="66" textAnchor="middle" fontSize="10" fill="#EF9F27">Ticket</text>
          <text x="567" y="79" textAnchor="middle" fontSize="10" fill="#EF9F27">Suporte</text>
          <circle cx="522" cy="45" r="4" fill="#EF9F27"/>

          {/* Arrows */}
          <path d="M90 68 L120 68" stroke="#e8e8e6" strokeWidth="1" markerEnd="url(#arrow)"/>
          <path d="M210 68 L240 68" stroke="#e8e8e6" strokeWidth="1" markerEnd="url(#arrow)"/>
          <path d="M350 68 L382 68" stroke="#e8e8e6" strokeWidth="1" markerEnd="url(#arrow)"/>
          <path d="M492 68 L522 68" stroke="#EF9F27" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrowAmber)"/>

          {/* Dotted down arrows — unclassified causes */}
          <path d="M437 91 L437 120" stroke="#e8e8e6" strokeWidth="0.75" strokeDasharray="3 2"/>
          <text x="437" y="135" textAnchor="middle" fontSize="9" fill="#e8e8e6">causa desconhecida</text>

          <defs>
            <marker id="arrow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#e8e8e6"/>
            </marker>
            <marker id="arrowAmber" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#EF9F27"/>
            </marker>
          </defs>
        </svg>
      </div>
      </FadeIn>
    </section>
  );
}
