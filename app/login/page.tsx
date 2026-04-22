"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Step = "credentials" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
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
      body: JSON.stringify({ email, code }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Código inválido ou expirado.");
      return;
    }

    // Log the access
    fetch("/api/auth/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
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
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-muted mb-3">
            William Whang
          </p>
          <h1 className="text-2xl font-medium text-ink leading-snug">
            {step === "credentials"
              ? "Acesso ao portfólio"
              : "Verifique seu e-mail"}
          </h1>
          <p className="text-sm text-muted mt-2">
            {step === "credentials"
              ? "Este portfólio é protegido. Insira seu nome e e-mail para receber o código de acesso."
              : `Enviamos um código de 6 dígitos para ${email}. Válido por 15 minutos.`}
          </p>
        </div>

        {/* Form */}
        {step === "credentials" ? (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading || !name || !email}
              className="w-full h-11 bg-ink text-canvas text-sm font-medium rounded-base transition-opacity disabled:opacity-40 mt-2"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-muted mb-3 tracking-wide uppercase">
                Código de 6 dígitos
              </label>
              <div
                className="flex gap-2"
                onPaste={handleOtpPaste}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
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
              disabled={loading || otp.some((d) => !d)}
              className="w-full h-11 bg-ink text-canvas text-sm font-medium rounded-base transition-opacity disabled:opacity-40"
            >
              {loading ? "Verificando..." : "Acessar portfólio"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("credentials"); setError(""); setOtp(["", "", "", "", "", ""]); }}
              className="w-full text-xs text-muted hover:text-ink transition-colors"
            >
              Usar outro e-mail
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
