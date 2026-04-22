"use client";

/* ─────────────────────────────────────────────────────────────────
   DesafioSection — Sirnik stacking-cards mechanic

   Como funciona (igual ao sirnik.co):
   · Cada secção tem height: 200vh
   · Secções 2 e 3 têm margin-top: -100vh
     → cada card começa 100vh antes do fim do anterior
     → o próximo card já fica visível no fundo enquanto o actual está pinado
   · position: sticky top:0 + z-index crescente
     → o card novo sobe POR CIMA do anterior (stacking layers)
   · Pin time por card: 100vh de scroll

   Resultado visual:
   scroll 0-50vh → card 01 pinado, card 02 a subir no fundo
   scroll 50vh   → handoff: card 02 toma o viewport
   scroll 50-100vh → card 02 pinado, card 03 a subir...
─────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";

/* ── Visuals ────────────────────────────────────────────────── */
function MapVisual() {
  return (
    <div style={{ width:"100%", height:"100%", background:"#1c1c1c", borderRadius:6, overflow:"hidden", position:"relative" }}>
      <svg viewBox="0 0 440 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map(i=><line key={`h${i}`} x1="0" y1={i*75} x2="440" y2={i*75} stroke="#ffffff05" strokeWidth="1"/>)}
        {[0,1,2,3,4,5].map(i=><line key={`v${i}`} x1={i*88} y1="0" x2={i*88} y2="300" stroke="#ffffff05" strokeWidth="1"/>)}
        <path d="M40 240 Q120 180 200 150 Q280 120 360 90" stroke="#2a4a7a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M60 270 Q160 220 240 180 Q310 145 380 160" stroke="#2a4a7a" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
        <circle cx="210" cy="148" r="16" fill="#EF9F27" opacity="0.12"/>
        <circle cx="210" cy="148" r="7" fill="#EF9F27"/>
        <circle cx="210" cy="148" r="3" fill="#fff"/>
        <circle cx="210" cy="148" r="34" stroke="#EF9F27" strokeWidth="0.75" fill="none" strokeDasharray="5 3"/>
        <rect x="225" y="128" width="124" height="22" rx="4" fill="#EF9F27"/>
        <text x="287" y="143" textAnchor="middle" fontSize="9.5" fill="#000" fontWeight="700">MOTORISTA DESCONHECIDO</text>
        <circle cx="110" cy="195" r="5" fill="#1D9E75"/><circle cx="330" cy="96" r="5" fill="#1D9E75"/>
      </svg>
      <div style={{ position:"absolute", bottom:8, left:10, fontSize:"0.5rem", color:"#ffffff20", letterSpacing:"0.1em", textTransform:"uppercase" }}>
        Monitoramento em tempo real
      </div>
    </div>
  );
}

function CameraVisual() {
  const cells = [true, true, false, true, false, true];
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", gap:2, borderRadius:6, overflow:"hidden" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, flex:1 }}>
        {cells.map((blocked, i) => (
          <div key={i} style={{ background: blocked ? "#0e0e0e" : "#181818", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {blocked ? (
              <>
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 50% 40%, #1a1a1a, #060606)" }}/>
                <div style={{ position:"relative", textAlign:"center" }}>
                  <div style={{ fontSize:"1.1rem" }}>✋</div>
                  <div style={{ fontSize:"0.38rem", color:"#ffffff25", letterSpacing:"0.06em" }}>BLOQUEADA</div>
                </div>
              </>
            ) : (
              <svg viewBox="0 0 80 60" width="100%" height="100%">
                <rect width="80" height="60" fill="#181818"/>
                <circle cx="40" cy="22" r="11" fill="#2a2a2a"/>
                <path d="M24 58 Q40 38 56 58" fill="#2a2a2a"/>
              </svg>
            )}
            <div style={{ position:"absolute", bottom:3, left:4, fontSize:"0.38rem", color:"#ffffff18", fontFamily:"monospace" }}>CAM-0{i+1}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#0d0d0d", padding:"5px 10px", display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background:"#E24B4A" }}/>
        <span style={{ fontSize:"0.48rem", color:"#E24B4A", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600 }}>
          Câmera bloqueada pelo motorista
        </span>
      </div>
    </div>
  );
}

function ChartVisual() {
  const cx=90, cy=90, r=62, stroke=20, circ=2*Math.PI*r;
  const segs=[{v:60,color:"#EF9F27",label:"Sabotagem"},{v:30,color:"#444",label:"Hardware"},{v:10,color:"#E24B4A",label:"IA"}];
  let cum=0;
  return (
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", gap:20, background:"#1c1c1c", borderRadius:6, padding:"0 20px" }}>
      <svg width={180} height={180} style={{ flexShrink:0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2a2a2a" strokeWidth={stroke}/>
        {segs.map((s,i)=>{
          const da=(s.v/100)*circ, off=-(cum/100)*circ; cum+=s.v;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${da} ${circ}`} strokeDashoffset={off}
            style={{transform:`rotate(-90deg)`,transformOrigin:`${cx}px ${cy}px`}}/>;
        })}
        <text x={cx} y={cy-4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#E24B4A">10%</text>
        <text x={cx} y={cy+14} textAnchor="middle" fontSize="8.5" fill="#ffffff40">limitação da IA</text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {segs.map((s,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:s.color, flexShrink:0 }}/>
            <div>
              <div style={{ fontSize:"0.85rem", color:"#fff", fontWeight:600 }}>{s.v}%</div>
              <div style={{ fontSize:"0.52rem", color:"#ffffff35", textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────── */
const CARDS = [
  {
    bg: "#252525",
    number: "01",
    title: ["Sem", "motorista"],
    col1: "70% das viagens terminavam sem qualquer identificação. O gestor via o veículo no mapa, mas não conseguia responder quem estava ao volante.",
    col2: "Sem identificação não há responsabilização, KPI válido ou contrato seguro. O problema era visível — mas sem fluxo de resolução.",
    Visual: MapVisual,
  },
  {
    bg: "#1e1e1e",
    number: "02",
    title: ["Câmera", "bloqueada"],
    col1: "60% das falhas eram sabotagem deliberada. Motoristas cobriam câmeras, esqueciam crachás ou recusavam identificação para evitar rastreamento.",
    col2: "Não era um problema técnico — era operacional. O sistema não tinha mecanismo para registrar, escalar ou responsabilizar esse comportamento.",
    Visual: CameraVisual,
  },
  {
    bg: "#181818",
    number: "03",
    title: ["Limitação", "da IA"],
    col1: "Apenas 10% das falhas eram do algoritmo: baixa confiança por iluminação ruim, ângulo errado ou modelo desatualizado.",
    col2: "A hipótese inicial era melhorar a IA. O diagnóstico revelou que isso resolveria apenas 1 em cada 10 casos. O resto era governança.",
    Visual: ChartVisual,
  },
];

/* ── Component ──────────────────────────────────────────────── */
export function DesafioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProgress, setActiveProgress] = useState([0, 0, 0]);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-sticky-card]");
      const progs = Array.from(cards).map(card => {
        const parent = card.parentElement!;
        const rect = parent.getBoundingClientRect();
        const pinH = parent.offsetHeight - window.innerHeight;
        if (pinH <= 0) return 0;
        return Math.max(0, Math.min(1, -rect.top / pinH));
      });
      setActiveProgress(progs);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sectionRef}>
      {CARDS.map((card, i) => {
        const { Visual } = card;
        return (
          <div
            key={i}
            style={{
              height: "200vh",
              /* ← stacking mechanic: each section starts 100vh before previous ends */
              marginTop: i === 0 ? 0 : "-100vh",
              position: "relative",
            }}
          >
            <div
              data-sticky-card={i}
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                /* ← higher z-index = slides on TOP of previous card */
                zIndex: (i + 1) * 10,
                background: card.bg,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Progress bar */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"#111", zIndex:1 }}>
                <div style={{
                  height:"100%", background:"#EF9F27",
                  width:`${activeProgress[i]*100}%`,
                  transition:"width 0.08s linear",
                }}/>
              </div>

              {/* ── HEADER: giant title left + muted number right ── */}
              <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"flex-start",
                padding:"40px 48px 0",
                flexShrink:0,
              }}>
                <h2 style={{
                  fontSize:"clamp(4rem, 8.5vw, 9.5rem)",
                  fontWeight:700,
                  lineHeight:0.9,
                  letterSpacing:"-0.04em",
                  color:"#ffffff",
                  margin:0,
                }}>
                  {card.title[0]}<br/>{card.title[1]}
                </h2>
                <span style={{
                  fontSize:"clamp(4rem, 8.5vw, 9.5rem)",
                  fontWeight:700,
                  lineHeight:0.9,
                  letterSpacing:"-0.04em",
                  color:"#ffffff14",
                  userSelect:"none",
                  flexShrink:0,
                }}>
                  {card.number}
                </span>
              </div>

              {/* ── Separator (full width, like sirnik) ── */}
              <div style={{ height:"0.5px", background:"#ffffff10", margin:"24px 48px 0", flexShrink:0 }}/>

              {/* ── Content bar: label | col1 | col2 | visual ── */}
              <div style={{
                flex:1,
                display:"flex",
                alignItems:"center",
                padding:"0 48px",
                gap:28,
                minHeight:0,
              }}>
                {/* Label col */}
                <div style={{ flexShrink:0, width:72 }}>
                  <p style={{ fontSize:"0.55rem", color:"#ffffff25", letterSpacing:"0.15em", textTransform:"uppercase", margin:0, lineHeight:1.5 }}>
                    Desafio<br/>{card.number}
                  </p>
                </div>

                {/* Text col 1 */}
                <p style={{ flex:1, fontSize:"0.82rem", color:"#ffffff50", lineHeight:1.8, margin:0 }}>
                  {card.col1}
                </p>

                {/* Text col 2 */}
                <p style={{ flex:1, fontSize:"0.82rem", color:"#ffffff30", lineHeight:1.8, margin:0 }}>
                  {card.col2}
                </p>

                {/* Visual */}
                <div style={{ flexShrink:0, width:"clamp(180px, 26%, 320px)", height:210 }}>
                  <Visual />
                </div>
              </div>

              {/* ── Bottom strip: next hint ── */}
              <div style={{
                padding:"14px 48px 18px",
                display:"flex",
                alignItems:"center",
                gap:12,
                flexShrink:0,
                borderTop:"0.5px solid #ffffff08",
              }}>
                <span style={{ fontSize:"0.52rem", color:"#ffffff20", letterSpacing:"0.12em", textTransform:"uppercase" }}>
                  {i < CARDS.length - 1
                    ? `A seguir — ${CARDS[i+1].title[0]} ${CARDS[i+1].title[1]}`
                    : "Continua — Discovery"}
                </span>
                <div style={{ flex:1, height:"0.5px", background:"#ffffff06" }}/>
                <span style={{ fontSize:"0.52rem", color:"#ffffff15", fontVariantNumeric:"tabular-nums" }}>
                  {i+1} / {CARDS.length}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
