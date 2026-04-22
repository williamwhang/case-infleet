import Image from "next/image";

const comparison = [
  { feature: "Fila de pendências", wireframe: "Lista simples sem contexto", prototipo: "Filtros por estado, veículo e data com contador" },
  { feature: "Detalhes da viagem", wireframe: "ID e horário apenas", prototipo: "Mapa, rota, confiança IA, histórico de tentativas" },
  { feature: "Caminhos de resolução", wireframe: "Botão único \u201cAssociar\u201d", prototipo: "7 caminhos contextuais com explicação de cada" },
  { feature: "Auditoria", wireframe: "Não previsto", prototipo: "Log automático: quem resolveu, quando e como" },
  { feature: "Copy dos estados", wireframe: "\u201cErro de IA\u201d", prototipo: "\u201cPendência de identificação\u201d" },
  { feature: "Busca de motorista", wireframe: "Campo de texto livre", prototipo: "Lista com foto, última viagem e disponibilidade" },
  { feature: "Barra de resumo", wireframe: "Não previsto", prototipo: "Totais clicáveis que filtram a lista" },
  { feature: "Confirmação", wireframe: "Retorno à lista", prototipo: "Toast + atualização inline sem reload" },
];

export function Prototype() {
  return (
    <section className="pb-20">
      <p className="text-xs font-medium tracking-widest uppercase text-muted mb-6">
        O que foi construído
      </p>

      <h2 className="text-xl font-medium text-ink mb-4 leading-snug">
        Protótipo real vs. wireframe proposto
      </h2>

      <p className="text-sm text-muted leading-relaxed mb-8">
        O processo começou com wireframes de baixa fidelidade. O protótipo navegável que
        resultou das iterações com o time de produto e QA foi significativamente mais rico
        em contexto e funcionalidade.
      </p>

      {/* Image */}
      <div
        className="relative w-full rounded-card overflow-hidden bg-surface mb-8 flex items-center justify-center"
        style={{ border: "0.5px solid #e8e8e6", minHeight: 240 }}
      >
        <Image
          src="/images/prototipo-real.png"
          alt="Protótipo real da interface de governança"
          width={680}
          height={380}
          className="w-full h-auto rounded-card"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='680' height='380'%3E%3Crect width='100%25' height='100%25' fill='%23f8f8f6'/%3E%3C/svg%3E"
        />
      </div>

      {/* Comparison table */}
      <div
        className="rounded-card overflow-hidden"
        style={{ border: "0.5px solid #e8e8e6" }}
      >
        {/* Header */}
        <div className="grid grid-cols-3 bg-surface border-b" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>
          <div className="px-4 py-2.5 text-[10px] font-medium tracking-widest uppercase text-muted">Funcionalidade</div>
          <div className="px-4 py-2.5 text-[10px] font-medium tracking-widest uppercase text-muted border-l" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>Wireframe</div>
          <div className="px-4 py-2.5 text-[10px] font-medium tracking-widest uppercase text-muted border-l" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>Protótipo</div>
        </div>
        {comparison.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-3 border-b last:border-b-0"
            style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
          >
            <div className="px-4 py-3 text-xs font-medium text-ink">{row.feature}</div>
            <div className="px-4 py-3 text-xs text-muted border-l" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>{row.wireframe}</div>
            <div className="px-4 py-3 text-xs text-ink border-l" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>{row.prototipo}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
