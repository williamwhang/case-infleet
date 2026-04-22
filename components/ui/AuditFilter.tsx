"use client";

import React, { useState } from "react";

type Status = "all" | "pendente" | "em_analise" | "resolvido" | "dispensado";

interface AuditItem {
  id: string;
  viagem: string;
  veiculo: string;
  data: string;
  status: Exclude<Status, "all">;
  tipo: "IA" | "Hardware" | "Sabotagem" | "Manual";
  motorista: string | null;
}

const ITEMS: AuditItem[] = [
  { id: "1", viagem: "V-0041", veiculo: "ABC-1234", data: "Hoje, 08:32", status: "pendente", tipo: "IA", motorista: null },
  { id: "2", viagem: "V-0039", veiculo: "DEF-5678", data: "Hoje, 07:15", status: "em_analise", tipo: "Sabotagem", motorista: null },
  { id: "3", viagem: "V-0035", veiculo: "GHI-9012", data: "Ontem, 22:10", status: "resolvido", tipo: "Hardware", motorista: "Carlos Mendes" },
  { id: "4", viagem: "V-0031", veiculo: "JKL-3456", data: "Ontem, 19:44", status: "resolvido", tipo: "IA", motorista: "Ana Paula" },
  { id: "5", viagem: "V-0028", veiculo: "MNO-7890", data: "Ontem, 14:02", status: "dispensado", tipo: "Manual", motorista: null },
  { id: "6", viagem: "V-0024", veiculo: "PQR-1122", data: "22/mar, 11:30", status: "pendente", tipo: "IA", motorista: null },
  { id: "7", viagem: "V-0019", veiculo: "STU-3344", data: "22/mar, 09:15", status: "em_analise", tipo: "Hardware", motorista: null },
  { id: "8", viagem: "V-0012", veiculo: "VWX-5566", data: "21/mar, 18:00", status: "resolvido", tipo: "Manual", motorista: "Paulo Salave'a" },
];

const STATUS_LABELS: Record<Exclude<Status, "all">, string> = {
  pendente: "Pendente",
  em_analise: "Em análise",
  resolvido: "Resolvido",
  dispensado: "Dispensado",
};

const STATUS_COLORS: Record<Exclude<Status, "all">, React.CSSProperties> = {
  pendente: { backgroundColor: "#EF9F2715", color: "#EF9F27" },
  em_analise: { backgroundColor: "#1a1a1a10", color: "#6b6b6b" },
  resolvido: { backgroundColor: "#1D9E7515", color: "#1D9E75" },
  dispensado: { backgroundColor: "#e8e8e6", color: "#6b6b6b" },
};

const TIPO_COLORS: Record<string, React.CSSProperties> = {
  IA: { backgroundColor: "#E24B4A15", color: "#E24B4A" },
  Hardware: { backgroundColor: "#1a1a1a10", color: "#6b6b6b" },
  Sabotagem: { backgroundColor: "#EF9F2715", color: "#EF9F27" },
  Manual: { backgroundColor: "#1D9E7515", color: "#1D9E75" },
};

const SUMMARY: { label: string; status: Status; count: number }[] = [
  { label: "Pendentes", status: "pendente", count: ITEMS.filter(i => i.status === "pendente").length },
  { label: "Em análise", status: "em_analise", count: ITEMS.filter(i => i.status === "em_analise").length },
  { label: "Resolvidos", status: "resolvido", count: ITEMS.filter(i => i.status === "resolvido").length },
  { label: "Dispensados", status: "dispensado", count: ITEMS.filter(i => i.status === "dispensado").length },
];

export function AuditFilter() {
  const [activeStatus, setActiveStatus] = useState<Status>("all");

  const filtered = activeStatus === "all"
    ? ITEMS
    : ITEMS.filter(i => i.status === activeStatus);

  return (
    <div className="rounded-card overflow-hidden" style={{ border: "0.5px solid #e8e8e6" }}>
      {/* Summary bar */}
      <div className="grid grid-cols-4 bg-surface border-b" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>
        {SUMMARY.map((s) => (
          <button
            key={s.status}
            onClick={() => setActiveStatus(activeStatus === s.status ? "all" : s.status)}
            className={`py-3 px-3 text-center transition-colors border-r last:border-r-0 ${
              activeStatus === s.status ? "bg-canvas" : "hover:bg-canvas"
            }`}
            style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
          >
            <div className="text-lg font-semibold text-ink">{s.count}</div>
            <div className="text-[10px] text-muted">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 py-2.5 bg-canvas border-b" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>
        {(["all", "pendente", "em_analise", "resolvido", "dispensado"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={`px-2.5 py-1 text-[11px] rounded-full transition-colors ${
              activeStatus === s
                ? "bg-ink text-canvas"
                : "text-muted hover:text-ink"
            }`}
          >
            {s === "all" ? "Todos" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-canvas divide-y" style={{ borderColor: "#e8e8e6" }}>
        {filtered.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-ink">{item.viagem}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={TIPO_COLORS[item.tipo]}
                >
                  {item.tipo}
                </span>
              </div>
              <div className="text-xs text-muted truncate">
                {item.veiculo} · {item.data}
                {item.motorista && ` · ${item.motorista}`}
              </div>
            </div>
            <span
              className="text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap"
              style={STATUS_COLORS[item.status]}
            >
              {STATUS_LABELS[item.status]}
            </span>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-muted">
            Nenhuma pendência neste estado.
          </div>
        )}
      </div>
    </div>
  );
}
