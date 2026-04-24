"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type AccessMode = "visitor" | "admin";
type Step = "credentials" | "otp";

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
      setError(data.error ?? "Erro ao enviar código. Tente novamente.");
      return;
    }

    setStep("otp");
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
      setError(data.error ?? "Código inválido ou expirado.");
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
      setError(data.error ?? "Falha no login. Tente novamente.");
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
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-muted mb-3">
            William Whang
          </p>
          <h1 className="text-2xl font-medium text-ink leading-snug">
            Acesso ao portfólio
          </h1>
          <p className="text-sm text-muted mt-2">
            {mode === "visitor"
              ? step === "credentials"
                ? "Receba um código por e-mail para acessar como visitante."
                : `Enviamos um código de 6 dígitos para ${visitorEmail}.`
              : "Use seu e-mail e senha para entrar como admin."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-base bg-canvas p-1 mb-6 border" style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}>
          <button
            type="button"
            onClick={() => handleModeChange("visitor")}
            className={`h-10 rounded-base text-sm transition-colors ${mode === "visitor" ? "bg-ink text-canvas" : "text-muted"}`}
          >
            Visitante
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("admin")}
            className={`h-10 rounded-base text-sm transition-colors ${mode === "admin" ? "bg-ink text-canvas" : "text-muted"}`}
          >
            Admin
          </button>
        </div>

        {mode === "visitor" ? (
          step === "credentials" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  placeholder="Seu nome completo"
                  className="w-full h-11 px-3.5 border text-sm text-ink placeholder-rim bg-canvas rounded-base outline-none focus:border-ink transition-colors"
                  style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">
                  E-mail
                </label>
                <input
                  type="email"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full h-11 px-3.5 border text-sm text-ink placeholder-rim bg-canvas rounded-base outline-none focus:border-ink transition-colors"
                  style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
                />
              </div>
              {error && (
                <p className="text-xs text-crimson">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !name || !visitorEmail}
                className="w-full h-11 bg-ink text-canvas text-sm font-medium rounded-base transition-opacity disabled:opacity-40 mt-2"
              >
                {loading ? "Enviando..." : "Receber código"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-muted mb-3 tracking-wide uppercase">
                  Código de 6 dígitos
                </label>
                <div className="flex gap-2" onPaste={handleOtpPaste}>
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
                      className="w-full h-14 text-center text-xl font-medium text-ink bg-canvas border rounded-base outline-none focus:border-ink transition-colors"
                      style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
                    />
                  ))}
                </div>
              </div>
              {error && (
                <p className="text-xs text-crimson">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || otp.some((digit) => !digit)}
                className="w-full h-11 bg-ink text-canvas text-sm font-medium rounded-base transition-opacity disabled:opacity-40"
              >
                {loading ? "Validando..." : "Entrar com código"}
              </button>
              <button
                type="button"
                onClick={() => resetVisitorFlow()}
                className="w-full text-xs text-muted hover:text-ink transition-colors"
              >
                Alterar nome ou e-mail
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">
                E-mail
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                autoFocus
                placeholder="admin@empresa.com"
                className="w-full h-11 px-3.5 border text-sm text-ink placeholder-rim bg-canvas rounded-base outline-none focus:border-ink transition-colors"
                style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
                className="w-full h-11 px-3.5 border text-sm text-ink placeholder-rim bg-canvas rounded-base outline-none focus:border-ink transition-colors"
                style={{ borderColor: "#e8e8e6", borderWidth: "0.5px" }}
              />
            </div>
            {error && (
              <p className="text-xs text-crimson">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !adminEmail || !password}
              className="w-full h-11 bg-ink text-canvas text-sm font-medium rounded-base transition-opacity disabled:opacity-40 mt-2"
            >
              {loading ? "Entrando..." : "Entrar como admin"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
