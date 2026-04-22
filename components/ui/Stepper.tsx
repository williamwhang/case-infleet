"use client";

import { useState } from "react";

const steps = [
  {
    id: 1,
    label: "Lista",
    title: "Fila de pendências",
    description:
      "Gestor acessa a lista de viagens com motorista não identificado. Filtros por data, veículo e tipo de pendência permitem priorizar casos críticos.",
    badge: "Governança",
  },
  {
    id: 2,
    label: "Detalhes",
    title: "Detalhes da viagem",
    description:
      "Mapa da rota, horário, veículo, confiança da IA e histórico de tentativas anteriores de identificação. Contexto completo antes de decidir.",
    badge: "Contexto",
  },
  {
    id: 3,
    label: "Decisão",
    title: "Escolher resolução",
    description:
      "7 caminhos de resolução disponíveis: associação manual, NFC/crachá, reconhecimento facial, agenda, marcar como privado, dispensar ou escalar.",
    badge: "Autonomia",
  },
  {
    id: 4,
    label: "Associar",
    title: "Confirmar motorista",
    description:
      "Seleção do motorista com busca por nome. Sistema registra quem tomou a decisão, quando e por qual caminho — auditoria completa.",
    badge: "Rastreabilidade",
  },
  {
    id: 5,
    label: "Confirmação",
    title: "Viagem resolvida",
    description:
      "Pendência encerrada. Métricas atualizadas em tempo real. O sistema nunca mais trata este caso como caixa-preta.",
    badge: "Fechamento",
  },
];

export function Stepper() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="rounded-card overflow-hidden" style={{ border: "0.5px solid #e8e8e6" }}>
      {/* Step tabs */}
      <div className="flex border-b" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`flex-1 py-3 text-xs font-medium transition-colors ${
              i === active
                ? "text-ink bg-canvas border-b-2 border-ink"
                : "text-muted bg-surface hover:text-ink"
            }`}
          >
            <span className="block text-[10px] text-muted mb-0.5">{s.id}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6 bg-canvas">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: "#EF9F2715", color: "#EF9F27" }}
          >
            {step.badge}
          </span>
        </div>
        <h3 className="text-base font-medium text-ink mb-2">{step.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{step.description}</p>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="text-xs text-muted hover:text-ink disabled:opacity-30 transition-colors"
          >
            ← Anterior
          </button>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === active ? "#1a1a1a" : "#e8e8e6" }}
              />
            ))}
          </div>
          <button
            onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
            disabled={active === steps.length - 1}
            className="text-xs text-muted hover:text-ink disabled:opacity-30 transition-colors"
          >
            Próximo →
          </button>
        </div>
      </div>
    </div>
  );
}
