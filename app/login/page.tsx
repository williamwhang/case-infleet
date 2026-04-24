"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
        email,
      }),
    }).catch(() => {});

    router.push("/");
    router.refresh();
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
            Este portfólio é protegido. Use suas credenciais de acesso.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="seu@email.com"
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
            disabled={loading || !email || !password}
            className="w-full h-11 bg-ink text-canvas text-sm font-medium rounded-base transition-opacity disabled:opacity-40 mt-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
