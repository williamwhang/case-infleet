'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from "next/image";

const navItems = [
  ["sec-00", "cover", "Hero"],
  ["sec-01", "overview", "Sobre"],
  ["sec-02", "crise", "A crise"],
  ["sec-05", "camadas", "Cinco camadas"],
  ["sec-06", "governanca", "Governar primeiro"],
  ["sec-07", "pendencias", "Pendências"],
  ["sec-08", "decisao", "A decisão"],
  ["sec-09", "tradeoffs", "O que recusamos"],
  ["sec-10", "resultado", "De dias para horas"],
];

const tags = ["Gestão de Frotas", "B2B SaaS", "IA + Hardware", "Enterprise", "Solo Designer"];

const facts = [
  ["Empresa", "Infleet"],
  ["Modelo", "SaaS B2B para gestão de frotas"],
  ["Tempo", "12 semanas"],
  ["Papel", "Product Design, discovery técnico e arquitetura de estados"],
];

const projectMeta = [
  {
    label: "Empresa",
    content: <strong>infleet.com.br</strong>,
  },
  {
    label: "Modelo",
    content: <strong>SaaS B2B · Gestão de Frotas Enterprise</strong>,
  },
  {
    label: "Time",
    content: (
      <ul>
        <li>Product Manager</li>
        <li>Product Designer</li>
        <li>Tech Lead</li>
        <li>Back-end e Front-end</li>
        <li>Equipe de Hardware</li>
        <li>Stakeholders</li>
      </ul>
    ),
  },
  {
    label: "Indústria",
    content: <strong>Segurança e Telemetria Veicular</strong>,
  },
  {
    label: "Duração",
    content: (
      <>
        <strong>12 semanas</strong>
        <span>4 discovery + 8 build</span>
      </>
    ),
  },
  {
    label: "Status",
    content: (
      <>
        <strong>Lançado para 2 clientes enterprise estratégicos</strong>
        <span>Contratos em risco protegidos dentro do prazo</span>
      </>
    ),
  },
];

const metrics = [
  ["30%", "60%", "Identificação automática de motoristas"],
  ["Dias", "Horas", "Tempo para resolver pendências críticas"],
  ["-50%", "tickets", "Redução de chamados ligados à identificação"],
];

const layers = [
  ["Hardware", "Câmera interna, posição, qualidade da foto e disponibilidade do dispositivo."],
  ["IA", "Reconhecimento facial com baixa confiança em parte relevante das viagens."],
  ["Operação", "Times precisavam entender o motivo da falha antes de corrigir qualquer dado."],
  ["Suporte", "Pendências chegavam sem contexto suficiente e viravam trabalho manual."],
  ["Cliente", "O gestor de frota precisava auditar viagens sem depender de ida e volta com suporte."],
];

const states = [
  ["Identificado", "Motorista reconhecido automaticamente com confiança suficiente."],
  ["Baixa confiança", "A IA sugeria um motorista, mas exigia revisão humana."],
  ["Sem foto", "O sistema não recebeu evidência visual válida para análise."],
  ["Desconhecido", "Nenhum motorista conhecido pôde ser associado à viagem."],
];

const tradeoffs = [
  ["Validação em massa", "Parecia eficiente, mas aumentava o risco de confirmar falsos positivos em escala."],
  ["Automação total", "Não havia confiança técnica suficiente para remover revisão humana do fluxo."],
  ["Esperar a IA amadurecer", "A resposta técnica levaria meses e os contratos em risco precisavam de uma resposta operacional imediata."],
];

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
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="case-section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children}
    </header>
  );
}

function AwareButton({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  function getDir(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle > -45 && angle <= 45) return "right";
    if (angle > 45 && angle <= 135) return "bottom";
    if (angle > 135 || angle <= -135) return "left";
    return "top";
  }

  const onEnter = (e: React.MouseEvent<HTMLElement>) =>
    e.currentTarget.setAttribute("data-dir", getDir(e));
  const onLeave = (e: React.MouseEvent<HTMLElement>) =>
    e.currentTarget.setAttribute("data-dir", `out-${getDir(e)}`);

  if (href) {
    return (
      <a href={href} className="btn-aware" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button className="btn-aware" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <span>{children}</span>
    </button>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("sec-00");
  const footerInnerRef = useRef<HTMLDivElement>(null);
  const sidebarFooterRef = useRef<HTMLDivElement>(null);
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
    ) || 96;
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
    <main className="case-shell">
      <aside className="case-sidebar" aria-label="Navegação do case">
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
          <small>Product Designer · São Paulo</small>
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
            <AwareButton href="mailto:whang.william@gmail.com">Contato</AwareButton>
            <a
              className="btn-circle"
              href="https://linkedin.com/in/williamwhang"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
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
              levaria meses.
            </h1>
            <p className="case-hero-subtitle">
              <strong>A IA não estava pronta.</strong>{" "}
              <span>O negócio não podia esperar.</span>
            </p>
          </div>
        </section>

        <section id="overview" className="case-panel case-project-panel case-body">
          <div className="case-project-heading">
            <span>02 · Sobre o projeto</span>
            <h2>Doze semanas para tornar o sistema confiável</h2>
          </div>

          <div className="case-project-grid">
            {projectMeta.map((item) => (
              <article key={item.label} className="case-project-item">
                <span>{item.label}</span>
                <div>{item.content}</div>
              </article>
            ))}

            <article className="case-project-item case-project-item-wide case-project-role">
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
          <SectionTitle
            eyebrow="03 · A crise"
            title="O reconhecimento facial não entregava confiança suficiente para sustentar decisões operacionais."
          />

          <div className="case-two-col">
            <figure className="case-media">
              <Image
                src="/assets/camera interna do motoristas.png"
                alt="Câmera interna usada para identificação de motoristas"
                width={1000}
                height={750}
                unoptimized
              />
            </figure>
            <div className="case-copy-list">
              <p>
                A operação recebia viagens sem motorista identificado, mas sem
                uma explicação clara sobre o motivo: ausência de imagem, baixa
                confiança, motorista não cadastrado ou falha de hardware.
              </p>
              <p>
                Sem essa distinção, o time tratava problemas diferentes como se
                fossem iguais. A IA parecia ser o gargalo, mas o verdadeiro
                risco estava na ausência de governança.
              </p>
            </div>
          </div>
        </section>

        <section id="camadas" className="case-panel case-body">
          <SectionTitle
            eyebrow="04 · Cinco camadas"
            title="Mapeamos a falha como sistema, não como evento isolado."
          />
          <div className="case-layer-list">
            {layers.map(([name, description]) => (
              <article key={name}>
                <strong>{name}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="governanca" className="case-panel case-body">
          <SectionTitle
            eyebrow="05 · Governar primeiro"
            title="A decisão foi projetar estados claros antes de perseguir automação total."
          />

          <figure className="case-wide-media">
            <Image
              src="/assets/diagrama inicio.png"
              alt="Diagrama inicial da arquitetura de estados"
              width={1400}
              height={900}
              unoptimized
            />
          </figure>

          <div className="case-states">
            {states.map(([name, description]) => (
              <article key={name}>
                <span>{name}</span>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pendencias" className="case-panel case-body">
          <SectionTitle
            eyebrow="06 · Pendências"
            title="A interface passou a explicar o que precisava de ação humana."
          />

          <div className="case-two-col case-two-col-reverse">
            <div className="case-copy-list">
              <p>
                Em vez de uma lista genérica de erros, o produto passou a
                separar os motivos de pendência e orientar a próxima ação.
              </p>
              <p>
                Isso reduziu ambiguidade para operação, suporte e cliente, sem
                criar uma falsa sensação de precisão automática.
              </p>
            </div>
            <figure className="case-media">
              <Image
                src="/assets/sem motorista.png"
                alt="Tela de pendências sem motorista identificado"
                width={1000}
                height={750}
                unoptimized
              />
            </figure>
          </div>
        </section>

        <section id="decisao" className="case-panel case-body">
          <SectionTitle
            eyebrow="07 · A decisão"
            title="Recusamos validação em massa no primeiro momento."
          />

          <div className="case-decision">
            <p>
              A validação em massa parecia eficiente, mas aumentava o risco de
              confirmar falsos positivos em escala. A decisão foi priorizar
              revisão contextual, rastreabilidade e confiança operacional.
            </p>
            <Image
              src="/assets/mockup.png"
              alt="Mockup da solução de revisão"
              width={1400}
              height={900}
              unoptimized
            />
          </div>
        </section>

        <section id="tradeoffs" className="case-panel case-body">
          <SectionTitle
            eyebrow="08 · O que recusamos"
            title="Nem toda solução aparentemente eficiente era segura para o momento do produto."
          />

          <div className="case-tradeoff-list">
            {tradeoffs.map(([title, description]) => (
              <article key={title}>
                <span>{title}</span>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resultado" className="case-panel case-final-panel case-body">
          <SectionTitle
            eyebrow="09 · O resultado"
            title="A solução transformou uma falha invisível em uma rotina operacional auditável."
          />

          <div className="case-metrics">
            {metrics.map(([before, after, label]) => (
              <article key={label}>
                <strong>
                  {before}
                  <span>→</span>
                  <em>{after}</em>
                </strong>
                <p>{label}</p>
              </article>
            ))}
          </div>

          <div className="case-facts">
            {facts.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="case-footer-cta">
          <div ref={footerInnerRef} className="case-footer-cta-inner">
            <button className="case-footer-trigger">
              Vamos trabalhar juntos?
            </button>
            <div className="case-footer-meta">
              <p>whang.william@gmail.com</p>
              <span>Product Designer · São Paulo</span>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
