import { AuditFilter } from "@/components/ui/AuditFilter";

export function AuditWireframe() {
  return (
    <section className="pb-20">
      <p className="text-xs font-medium tracking-widest uppercase text-muted mb-6">
        Wireframe de auditoria
      </p>

      <h2 className="text-xl font-medium text-ink mb-4 leading-snug">
        A camada de governança
      </h2>

      <p className="text-sm text-muted leading-relaxed mb-8">
        O componente central do projeto: uma lista auditada de pendências, com filtros por
        estado, badges por tipo de causa e uma barra de resumo clicável que filtra a lista
        em tempo real. Clique nos números da barra para filtrar por estado.
      </p>

      <AuditFilter />
    </section>
  );
}
