'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ContactDrawer } from '@/components/ContactDrawer';
import { AwareButton } from '@/components/AwareButton';

const navItems = [
  ["sec-00", "cover", "Hero"],
  ["sec-01", "overview", "Sobre"],
  ["sec-02", "crise", "A crise"],
  ["sec-05", "camadas", "Cinco camadas"],
  ["sec-06", "governanca", "Governar primeiro"],
  ["sec-07", "pendencias", "Pendências"],
  ["sec-08", "decisao", "A decisão"],
  ["sec-09", "tradeoffs", "Os trade-offs"],
  ["sec-10", "resultado", "De dias para horas"],
];

const tags = ["Gestão de Frotas", "B2B SaaS", "IA + Hardware", "Enterprise", "Solo Designer"];


const projectMeta = [
  { label: "Empresa", main: "infleet.com.br", sub: "" },
  { label: "Modelo", main: "SaaS B2B · Gestão de Frotas Enterprise", sub: "" },
  { label: "Indústria", main: "Segurança e Telemetria Veicular", sub: "" },
  { label: "Duração", main: "12 semanas", sub: "4 discovery + 8 build" },
  {
    label: "Time",
    main: "Product Manager",
    sub: "Product Designer · Tech Lead · Back-end e Front-end · Equipe de Hardware · Stakeholders",
  },
  {
    label: "Status",
    main: "Lançado para 2 clientes enterprise estratégicos",
    sub: "Contratos em risco protegidos dentro do prazo",
  },
];

const discoveryLayers = [
  ["01 IA", "Precisão de 10%. Sensível a luz e rostos similares."],
  ["02 Hardware", "Memória limitada descartava frames do Face ID silenciosamente."],
  ["03 Conectividade", "Zonas de sombra impediam envio em tempo real."],
  ["04 Cadastro", "Fotos ausentes ou desatualizadas tornavam a IA ineficaz."],
  ["05 Humano", "Motoristas obstruíam a câmera intencionalmente."],
];

const states = [
  ["Identificado", "IA reconheceu com confiança."],
  ["Pendente", "IA sem confiança. Requer revisão humana."],
  ["Sem foto", "Cadastro sem imagem válida."],
  ["Não cadastrado", "Motorista novo, ainda fora do sistema."],
  ["Sem evidência", "Hardware ou conexão impediu a captura."],
];

const decisionItems = [
  ["Estratégia", "Governança antes da automação", "IA confiável levaria 6 a 12 meses. Priorizei o sistema human-in-the-loop — valor entregue em 12 semanas com a tecnologia disponível."],
  ["Arquitetura", "Módulo separado, não extensão do Mapa", "O Mapa já tinha quatro responsabilidades críticas. Monitoramento em tempo real e auditoria de pendências não podem dividir o mesmo espaço. O piloto validou."],
  ["Trade-off", "Sem bulk na V1", "Falso positivo em massa é irreversível — erro jurídico em escala. Validação individual na V1, bulk com guardrails na V2."],
  ["Trade-off", "Funcional antes de polido", "Filtros avançados e refinamento visual viraram débito técnico. A prioridade era estabilizar o fluxo principal dentro do prazo."],
];

const CRISIS_METRICS = [
  {
    id: "recognition",
    before: "30%",
    after: "65%",
    label: "Identificação automática de motoristas",
    withArrow: true,
  },
  {
    id: "resolution",
    before: "Dias",
    after: "Horas",
    label: "Tempo de resolução de falhas",
    withArrow: true,
  },
  {
    id: "support",
    before: "",
    after: "−50%",
    label: "Tickets de suporte sobre identificação",
    withArrow: false,
  },
] as const;

const METRICS_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const METRIC_NEUTRAL = "#c7c7c7";
const METRIC_ACCENT = "#2d62f2";

function MetricArrowIcon() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 22H34M25 13L34 22L25 31"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <Image
      src="/assets/logo-william.svg"
      alt=""
      aria-hidden="true"
      className="case-logo-mark"
      width={26}
      height={24}
      priority
      unoptimized
    />
  );
}

function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  const eyebrowLabel = eyebrow.replace(/^(\d{2})\s+/, "$1 · ");

  return (
    <header className="case-section-header">
      <span>{eyebrowLabel}</span>
      <h2>{title}</h2>
      {children}
    </header>
  );
}

/* ── CircleButton helpers ─────────────────────────── */

const EASING = 'cubic-bezier(0.25, 0.25, 0, 1)';

function getMouseDir(e: React.MouseEvent<HTMLElement>): 'top' | 'right' | 'bottom' | 'left' {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle > -45 && angle <= 45)  return 'right';
  if (angle > 45  && angle <= 135) return 'bottom';
  if (angle > 135 || angle <= -135) return 'left';
  return 'top';
}

function dirToTransform(dir: 'top' | 'right' | 'bottom' | 'left'): string {
  if (dir === 'top')    return 'translateY(-101%)';
  if (dir === 'right')  return 'translateX(101%)';
  if (dir === 'bottom') return 'translateY(101%)';
  return 'translateX(-101%)';
}

/* ── CircleButton — secondary circle ─────────────── */

function CircleButton({
  href,
  label,
  icon,
  onClick,
}: {
  href?: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    const dir = getMouseDir(e);
    fill.style.transition = 'none';
    fill.style.transform = dirToTransform(dir);
    fill.getBoundingClientRect();
    fill.style.transition = `transform 0.42s ${EASING}`;
    fill.style.transform = 'translate(0, 0)';
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.transition = `transform 0.42s ${EASING}`;
    fill.style.transform = dirToTransform(getMouseDir(e));
  };

  const inner = (
    <>
      <span ref={fillRef} className="btn-fill" aria-hidden="true" />
      <span className="btn-circle-inner">
        <span className="btn-circle-text" aria-hidden="true">{label}</span>
        <span className="btn-circle-icon" aria-hidden="true">{icon}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="btn-aware btn-circle"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="btn-aware btn-circle"
      aria-label={label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("sec-00");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const footerInnerRef = useRef<HTMLDivElement>(null);
  const sidebarFooterRef = useRef<HTMLDivElement>(null);
  const crisisMetricsRef = useRef<HTMLDivElement>(null);
  const crisisAnalysisRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const crisisMetricsInView = useInView(crisisMetricsRef, {
    once: true,
    amount: 0.4,
  });
  const isMetricsSectionActive = useInView(crisisAnalysisRef, {
    amount: 0.08,
    margin: "0px 0px -62% 0px",
  });

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const isProgrammaticScrollRef = useRef(false);
  const scrollSyncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionIndex = Math.max(0, navItems.findIndex(([targetId]) => targetId === activeSection));
  const total = navItems.length;

  function setActiveTarget(targetId: string) {
    setActiveSection(targetId);
    if (sidebarFooterRef.current) {
      sidebarFooterRef.current.classList.toggle("is-visible", targetId !== "sec-00");
    }
  }

  useEffect(() => {
    let frame: number | null = null;

    const syncActiveSectionFromScroll = () => {
      const viewportMidpoint = window.innerHeight * 0.35;
      let closestTargetId = navItems[0][0];
      let smallestDistance = Number.POSITIVE_INFINITY;

      navItems.forEach(([targetId, elementId]) => {
        const panel = document.getElementById(elementId);
        if (!panel) return;
        const distance = Math.abs(panel.getBoundingClientRect().top - viewportMidpoint);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestTargetId = targetId;
        }
      });

      setActiveTarget(closestTargetId);
    };

    const onScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActiveSectionFromScroll);
    };

    syncActiveSectionFromScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      if (scrollSyncTimeoutRef.current) clearTimeout(scrollSyncTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const targets = [footerInnerRef.current, sidebarFooterRef.current].filter(
      Boolean
    ) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.18 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function navigateTo(targetId: string, elementId: string) {
    const panel = document.getElementById(elementId);
    if (!panel) return;

    setActiveTarget(targetId);
    isProgrammaticScrollRef.current = true;

    const sectionOffset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--section-offset")
    ) || 65;
    const nextTop = window.scrollY + panel.getBoundingClientRect().top - sectionOffset;

    window.scrollTo({
      top: Math.max(0, nextTop),
      behavior: "smooth",
    });

    if (scrollSyncTimeoutRef.current) clearTimeout(scrollSyncTimeoutRef.current);
    scrollSyncTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  }

  return (
    <main className={`case-shell${isMetricsSectionActive ? " is-white-phase" : ""}`}>
      <aside
        className={`case-sidebar${isMetricsSectionActive ? " is-white-phase" : ""}`}
        aria-label="Navegação do case"
      >
        <div className="case-brand" aria-label="William Whang">
          <LogoMark />
          <span>William Whang</span>
        </div>

        <nav className="case-nav">
          {navItems.map(([targetId, elementId, label]) => (
            <a
              key={targetId}
              href={`#${elementId}`}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(targetId, elementId);
              }}
            >
              <span className={activeSection === targetId ? "is-active" : ""} />
              {label}
            </a>
          ))}
        </nav>

        <footer className="case-sidebar-footer">
          <div ref={sidebarFooterRef} className="case-sidebar-statement">
            <strong>A IA não estava pronta.</strong>
            <br />
            <span>O negócio não podia esperar.</span>
          </div>
          <small>Product Designer · Front-end</small>
        </footer>
      </aside>

      <div className="case-divider" />

      <section className="case-main">
        <header className="case-spa-header">
          <span className="case-spa-counter">
            {String(sectionIndex + 1).padStart(2, "0")} &mdash;{" "}
            {String(total).padStart(2, "0")}
          </span>
          <div className="case-spa-actions">
            <AwareButton onClick={openDrawer} alt="Vamos conversar">
              Contato
            </AwareButton>
            <CircleButton
              href="https://linkedin.com/in/williamwhang"
              label="In"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5.5 0H13v1.2c.5-.9 1.7-1.4 2.8-1.4C18 9.8 19 11 19 13.3V19h-3v-5.3c0-1.2-.5-1.9-1.5-1.9s-2 .7-2 2V19h-3v-9Z" />
                </svg>
              }
            />
          </div>
        </header>

        <section id="cover" className="case-hero">
          <div className="case-hero-copy">
            <p>
              Quando a resposta técnica não acompanhou o prazo do negócio, criei
              uma camada de governança operacional que transformou falhas
              invisíveis em pendências resolvíveis. Dois contratos enterprise em
              risco foram protegidos.
            </p>
          </div>

          <div className="case-scroll-indicator">
            <button
              aria-label="Rolar para baixo"
              onClick={() =>
                navigateTo("sec-01", "overview")
              }
            >
              ↓
            </button>
            <span>scroll</span>
          </div>

          <div className="case-hero-bottom">
            <div className="case-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>
              70% das viagens sem motorista identificado a resposta técnica
              levaria meses
            </h1>
            <p className="case-hero-subtitle">
              <strong>A IA não estava pronta.</strong>{" "}
              <span>O negócio não podia esperar.</span>
            </p>
          </div>
        </section>

        <section id="overview" className="case-panel case-project-panel case-body">
          <SectionTitle
            eyebrow="02 Sobre o projeto"
            title="Doze semanas para tornar o sistema confiável"
          />

          <div className="case-project-grid">
            {projectMeta.map((item) => (
              <article key={item.label} className="case-project-item">
                <span>{item.label}</span>
                <div>
                  <strong>{item.main}</strong>
                  <span>{item.sub}</span>
                </div>
              </article>
            ))}

            <article className="case-project-item case-project-role">
              <span>Meu papel</span>
              <p className="case-project-paragraph case-body">
                Único designer no projeto, do mapeamento até o lançamento.
                Defendi junto ao PM e à engenharia que esperar a IA amadurecer
                levaria meses sem garantia de resultado, a estratégia certa era
                construir a governança operacional que tornasse o sistema
                confiável com a tecnologia disponível.
              </p>
            </article>
          </div>
        </section>

        <section id="crise" className="case-panel case-body">
          <div className="case-overview-top">
            <div className="case-overview-top-header">
              <SectionTitle
                eyebrow="03 A crise"
                title={
                  <span className="case-crise-title">
                    <span className="case-crise-title-line case-crise-title-primary">
                      O sistema de reconhecimento facial
                    </span>
                    <span className="case-crise-title-line">
                      <span className="case-crise-title-primary">
                        falhava em{" "}
                      </span>
                      <span className="case-crise-title-accent">
                        70% das viagens.
                      </span>
                    </span>
                    <span className="case-crise-title-line case-crise-title-muted">
                      Ninguém sabia por quê.
                    </span>
                  </span>
                }
              />
            </div>

            <div className="case-overview-top-content">
              <article className="case-overview-intro">
                <p>
                  A Infleet é uma plataforma SaaS B2B de gestão de frotas. Cada
                  veículo possui uma câmera instalada no painel, conectada ao
                  sistema de telemetria. Essa câmera registra a estrada, gera
                  alertas de segurança e identifica o motorista por
                  reconhecimento facial.
                </p>
                <p>
                  A funcionalidade havia sido vendida para clientes enterprise
                  com prazo de entrega definido. Dois contratos de alto valor
                  estavam em risco iminente de cancelamento.
                </p>
              </article>
              <article className="case-overview-intro">
                <p>
                  Na prática, a identificação automática funcionava em apenas
                  30% das viagens. Nos outros 70%, a plataforma não mostrava
                  quem estava dirigindo.
                </p>
                <p>
                  O campo do motorista aparecia vazio ou exibia um status
                  genérico como &quot;veículo sem sinal&quot;, sem indicar se houve
                  tentativa de identificação, falha no processo ou a causa do
                  problema.
                </p>
                <p>
                  Melhorar apenas a precisão da IA levaria meses e não
                  oferecia garantia de resultado imediato.
                </p>
              </article>
            </div>
          </div>

          <div ref={crisisAnalysisRef} className="case-overview-grid">
            <article className="case-overview-card">
              <h4>Desafio</h4>
              <p>
                Sistema de Face ID falhava em 70% das viagens. Gestores não
                tinham visibilidade sobre a causa nem poder de ação. Dois
                clientes enterprise com risco iminente de churn.
              </p>
            </article>
            <article className="case-overview-card">
              <h4>Solução</h4>
              <p>
                Módulo dedicado de governança com 5 estados de erro legíveis +
                fluxo de associação manual (human-in-the-loop), separando
                auditoria do monitoramento em tempo real.
              </p>
            </article>
            <article className="case-overview-card">
              <h4>Impacto</h4>
              <p>
                Identificação automática subiu de 30% para 65%. Tempo de
                resolução caiu de dias para horas. Tickets de suporte reduziram
                pela metade. Entregue no prazo para os 2 clientes em risco.
              </p>
            </article>
          </div>

          <div className="case-metrics-header">
            <span>Principais métricas</span>
          </div>

          <div ref={crisisMetricsRef} className="case-metrics case-metrics--crise">
            {CRISIS_METRICS.map((metric, index) => {
              const cardDelay = index * 0.14;
              const cardVisible = prefersReducedMotion || crisisMetricsInView;

              return (
                <motion.article
                  key={metric.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: cardVisible ? 1 : 0, y: cardVisible ? 0 : 40 }}
                  transition={{
                    delay: cardDelay,
                    duration: 0.7,
                    ease: METRICS_EASE,
                  }}
                >
                  <motion.span
                    className="case-metric-line"
                    initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: cardVisible ? 1 : 0, opacity: cardVisible ? 1 : 0 }}
                    transition={{
                      delay: cardDelay + 0.4,
                      duration: 0.55,
                      ease: METRICS_EASE,
                    }}
                  />

                  <strong style={{ color: METRIC_NEUTRAL }}>
                    {metric.before ? (
                      <motion.span
                        className="case-metric-before"
                        style={{ color: METRIC_NEUTRAL }}
                        initial={prefersReducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: cardVisible ? 1 : 0 }}
                        transition={{
                          delay: cardDelay + 0.3,
                          duration: 0.45,
                          ease: METRICS_EASE,
                        }}
                      >
                        {metric.before}
                      </motion.span>
                    ) : null}

                    {metric.withArrow ? (
                      <motion.span
                        className="case-metric-arrow"
                        style={{ color: METRIC_NEUTRAL }}
                        initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: cardVisible ? 1 : 0, opacity: cardVisible ? 1 : 0 }}
                        transition={{
                          delay: cardDelay + 0.5,
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                        }}
                      >
                        <MetricArrowIcon />
                      </motion.span>
                    ) : null}

                    <motion.span
                      className="case-metric-after"
                      style={{ color: METRIC_ACCENT }}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                      animate={{ opacity: cardVisible ? 1 : 0, x: cardVisible ? 0 : -20 }}
                      transition={{
                        delay: cardDelay + 0.6,
                        duration: 0.5,
                        ease: METRICS_EASE,
                      }}
                    >
                      {metric.after}
                    </motion.span>
                  </strong>

                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: cardVisible ? 1 : 0, y: cardVisible ? 0 : 24 }}
                    transition={{
                      delay: cardDelay + 0.8,
                      duration: 0.55,
                      ease: METRICS_EASE,
                    }}
                  >
                    {metric.label}
                  </motion.p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="camadas" className="case-panel case-body">
          <SectionTitle
            eyebrow="04 Cinco camadas"
            title="Erros técnicos traduzidos em ações operacionais."
          />

          <div className="case-context-body">
            <p>
              A câmera no veículo sustenta rankings de segurança, alertas
              operacionais e responsabilização jurídica. Quando ela falha em
              silêncio, o produto inteiro perde credibilidade.
            </p>
            <p>
              O gestor via o erro — mas não sabia se era rede, hardware ou
              cadastro. Cada falha virava ticket. Em média 2 a 3 por semana,
              resolvidos em dias por investigação manual entre suporte e
              engenharia.
            </p>
          </div>

          <blockquote className="case-quote">
            <p>
              Eu vejo o veículo rodando no mapa, mas não tenho como saber quem
              está dirigindo. A gente acaba abrindo ticket ou olhando em
              planilhas.
            </p>
            <cite>Gestor de frota, durante o piloto</cite>
          </blockquote>
        </section>

        <section id="governanca" className="case-panel case-body">
          <SectionTitle
            eyebrow="05 Governar primeiro"
            title="A identificação não era uma feature. Era a infraestrutura que sustentava o produto."
          />

          <p className="case-discovery-lead">
            Mapeei 40+ tickets e o fluxo completo — Câmera → IA → SaaS. Esse mapeamento não existia na empresa. Foi o primeiro artefato que permitiu tratar o problema como sistema.
          </p>

          <div className="case-discovery-layers">
            {discoveryLayers.map(([name, description]) => (
              <article key={name} className="case-discovery-layer">
                <span className="layer-name">{name}</span>
                <p className="layer-desc">{description}</p>
              </article>
            ))}
          </div>

          <p className="case-discovery-lead case-discovery-lead--insight">
            Insight: melhorar a IA resolveria uma das cinco camadas. A solução precisava ser de governança.
          </p>
        </section>

        <section id="pendencias" className="case-panel case-body">
          <SectionTitle
            eyebrow="06 Pendências"
            title="A falha era sistêmica, não só da IA."
          />

          <div className="case-insight-body">
            <p>
              Nem toda falha tinha o mesmo peso. O falso negativo gerava retrabalho. O falso positivo — identificar o motorista errado — criava passivo jurídico, penalizava indevidamente e distorcia rankings. Para um cliente enterprise, esse erro é irreversível.
            </p>
            <p>
              A estratégia foi criar a camada de governança antes de esperar a IA amadurecer. O módulo devolve ao gestor a autonomia de revisar e decidir — sem depender do suporte.
            </p>
          </div>

          <div className="case-insight-decision">
            <p className="case-insight-decision-label">A decisão</p>
            <p>Não esperar a IA ficar perfeita. Tornar as falhas tratáveis agora e escaláveis depois.</p>
          </div>
        </section>

        <section id="decisao" className="case-panel case-body">
          <SectionTitle
            eyebrow="07 A decisão"
            title="Governar o erro."
          />

          <p className="case-solution-lead">
            A virada não foi só de interface — foi de linguagem. &quot;Falha de IA&quot; gerava pânico. &quot;Pendente de identificação&quot; gerava ação. Essa escolha foi uma decisão de produto.
          </p>

          <div className="case-solution-states">
            {states.map(([name, description]) => (
              <article key={name} className="case-solution-state">
                <span
                  className={`state-badge ${
                    name === "Identificado"
                      ? "state-ok"
                      : name === "Pendente"
                        ? "state-warn"
                        : name === "Sem foto"
                          ? "state-nophoto"
                          : name === "Não cadastrado"
                            ? "state-unknown"
                            : "state-nodata"
                  }`}
                >
                  {name}
                </span>
                <p className="state-desc">{description}</p>
              </article>
            ))}
          </div>

          <p className="case-solution-lead">
            Cada pendência percorre um ciclo auditável: Pendente → Em revisão → Finalizado — com data, responsável e decisão registrados. Para enterprise: rastreabilidade jurídica sem depender de suporte.
          </p>
        </section>

        <section id="tradeoffs" className="case-panel case-body">
          <SectionTitle
            eyebrow="08 Os trade-offs"
            title="O que decidimos não fazer foi tão importante quanto o que fizemos."
          />

          <div className="case-decision-list">
            {decisionItems.map(([kicker, title, description]) => (
              <article key={`${kicker}-${title}`} className="case-decision-item">
                <h3>{kicker} {title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resultado" className="case-panel case-final-panel case-body">
          <SectionTitle
            eyebrow="09 O resultado"
            title="O sistema funcionou. E funcionou porque aceitou ser imperfeito."
          />

          <p className="case-validation-body">
            Identificação subiu de 30% para 65% — não por melhoria da IA, mas por governança, cadastros corrigidos e revisão humana estruturada. Resolução caiu de dias para horas. Tickets reduziram 50%. Dois contratos protegidos no prazo.
          </p>

          <div className="case-metrics">
            <article>
              <strong>
                30%
                <span className="case-metric-arrow-inline" aria-hidden="true">
                  <MetricArrowIcon />
                </span>
                <em>65%</em>
              </strong>
              <p>Identificação automática</p>
            </article>
            <article>
              <strong>
                Dias
                <span className="case-metric-arrow-inline" aria-hidden="true">
                  <MetricArrowIcon />
                </span>
                <em>Horas</em>
              </strong>
              <p>Tempo de resolução</p>
            </article>
            <article>
              <strong>−50%</strong>
              <p>Tickets de suporte</p>
            </article>
          </div>

          <div className="case-validation-footer">
            <p>
              Aprendizado: sistemas críticos com IA imatura não falham por falta de algoritmo. Falham por falta de governança. Operabilidade primeiro — inteligência depois.
            </p>
            <p>
              V2 Validação em lote com guardrails<br />
              V2 Filtros por período, motorista e tipo de falha<br />
              V2 Dashboard de auditoria para compliance
            </p>
          </div>
        </section>

        <footer className="case-footer-cta">
          <div ref={footerInnerRef} className="case-footer-cta-inner">
            <button className="case-footer-trigger" onClick={openDrawer}>
              Entre em contato
            </button>
            <div className="case-footer-meta">
              <p>© 2026 William Whang — Todos os direitos reservados</p>
              <span>Conceito, design e código por mim</span>
            </div>
          </div>
        </footer>
      </section>

      <ContactDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </main>
  );
}
