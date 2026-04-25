"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AwareButton } from "@/components/AwareButton";

type AccessMode = "visitor" | "admin";
type Step = "credentials" | "requested" | "otp";

function LogoMark() {
  return (
    <Image
      src="/assets/logo-william.svg"
      alt=""
      aria-hidden="true"
      className="case-logo-mark login-logo-mark"
      width={26}
      height={24}
    />
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AccessMode>("visitor");
  const [step, setStep] = useState<Step>("credentials");
  const [name, setName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  function resetVisitorFlow(nextMode?: AccessMode) {
    setStep("credentials");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    if (nextMode === "admin") {
      setVisitorEmail("");
      setName("");
    }
  }

  function handleModeChange(nextMode: AccessMode) {
    setMode(nextMode);
    resetVisitorFlow(nextMode);
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: visitorEmail }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erro ao solicitar acesso, tente novamente");
      return;
    }

    setStep("requested");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const code = otp.join("");
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: visitorEmail, code }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Codigo invalido ou expirado");
      return;
    }

    fetch("/api/auth/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: visitorEmail }),
    }).catch(() => {});

    router.push("/");
    router.refresh();
  }

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adminEmail, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Falha no login, tente novamente");
      return;
    }

    const data = await res.json().catch(() => ({}));

    fetch("/api/auth/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name ?? "Acesso protegido",
        email: adminEmail,
      }),
    }).catch(() => {});

    router.push("/");
    router.refresh();
  }

  function handleOtpChange(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = char;
    setOtp(next);
    if (char && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      otpRefs.current[5]?.focus();
    }
  }

  return (
    <main className="login-shell">
      <section className="login-stage">
        <aside className="login-brand-panel">
          <a href="/login" className="case-brand login-brand">
            <LogoMark />
            <span>William Whang</span>
          </a>

          <div className="login-brand-copy">
            <span className="login-kicker">Acesso por convite</span>
            <h1 className="login-title">Portfólio protegido</h1>
            <p className="login-subtitle">
              Projetos compartilhados mediante acesso autorizado
            </p>
          </div>
        </aside>

        <section className="login-panel">
          <div className="login-card">
            <div className="login-panel-header">
              <span className="login-overline">Acesso</span>
              <div className="login-mode-switch" role="tablist" aria-label="Modo de acesso">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "visitor"}
                  onClick={() => handleModeChange("visitor")}
                  className={`login-mode-button${mode === "visitor" ? " is-active" : ""}`}
                >
                  Visitante
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "admin"}
                  onClick={() => handleModeChange("admin")}
                  className={`login-mode-button${mode === "admin" ? " is-active" : ""}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="login-card-copy">
              <h2 className="login-card-title">
                {mode === "visitor"
                  ? step === "credentials"
                    ? "Solicitar acesso"
                    : step === "requested"
                      ? "Solicitação enviada"
                      : "Insira o código"
                  : "Área administrativa"}
              </h2>
              <p className="login-card-subtitle">
                {mode === "visitor"
                  ? step === "credentials"
                    ? "Informe seu nome e e-mail para solicitar acesso ao portfólio"
                    : step === "requested"
                      ? "Solicitação enviada. Você receberá o código se o acesso for aprovado"
                      : "Insira o código enviado para seu e-mail"
                  : "Use suas credenciais internas para continuar"}
              </p>
            </div>

            {mode === "visitor" ? (
              step === "credentials" ? (
                <form onSubmit={handleSendOtp} className="contact-form login-form">
                  <div className="contact-fields">
                    <div className="contact-field">
                      <label htmlFor="visitor-name">Nome</label>
                      <input
                        id="visitor-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="visitor-email">Email</label>
                      <input
                        id="visitor-email"
                        type="email"
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  {error ? <p className="contact-error">{error}</p> : null}

                  <div className="login-actions">
                    <AwareButton
                      type="submit"
                      alt="Enviar solicitação"
                      className="login-submit"
                      disabled={loading || !name || !visitorEmail}
                    >
                      {loading ? "Enviando" : "Solicitar acesso"}
                    </AwareButton>
                  </div>
                </form>
              ) : step === "requested" ? (
                <div className="contact-form login-form">
                  <div className="contact-success">
                    <p>Solicitação enviada</p>
                    <span>Você receberá o código se o acesso for aprovado</span>
                  </div>

                  <div className="login-actions">
                    <AwareButton
                      type="button"
                      alt="Inserir código"
                      className="login-submit"
                      onClick={() => {
                        setError("");
                        setStep("otp");
                      }}
                    >
                      Já recebi um código
                    </AwareButton>
                    <button
                      type="button"
                      onClick={() => resetVisitorFlow()}
                      className="login-secondary-link"
                    >
                      Solicitar novamente
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="contact-form login-form">
                  <div className="contact-fields">
                    <div className="contact-field">
                      <label>Codigo de 6 digitos</label>
                      <div className="login-otp-row" onPaste={handleOtpPaste}>
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => {
                              otpRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            autoFocus={i === 0}
                            className="login-otp-input"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {error ? <p className="contact-error">{error}</p> : null}

                  <div className="login-actions">
                    <AwareButton
                      type="submit"
                      alt="Entrar agora"
                      className="login-submit"
                      disabled={loading || otp.some((digit) => !digit)}
                    >
                      {loading ? "Validando" : "Acessar"}
                    </AwareButton>
                    <button
                      type="button"
                      onClick={() => resetVisitorFlow()}
                      className="login-secondary-link"
                    >
                      Alterar nome ou e-mail
                    </button>
                  </div>
                </form>
              )
            ) : (
              <form onSubmit={handleAdminLogin} className="contact-form login-form">
                <div className="contact-fields">
                  <div className="contact-field">
                    <label htmlFor="admin-email">Email</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="seu@email.com"
                  />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="admin-password">Senha</label>
                    <input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Sua senha"
                    />
                  </div>
                </div>

                {error ? <p className="contact-error">{error}</p> : null}

                <div className="login-actions">
                  <AwareButton
                    type="submit"
                    alt="Entrar agora"
                    className="login-submit"
                    disabled={loading || !adminEmail || !password}
                  >
                    {loading ? "Entrando" : "Entrar"}
                  </AwareButton>
                </div>
              </form>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
