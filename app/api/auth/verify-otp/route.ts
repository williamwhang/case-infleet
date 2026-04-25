import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { getOtp, deleteOtp } from "@/lib/otp-store";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return Response.json({ error: "E-mail e código são obrigatórios." }, { status: 400 });
    }

    const entry = await getOtp(email);

    if (!entry) {
      return Response.json({ error: "Código expirado ou inválido." }, { status: 401 });
    }

    if (entry.code !== code.trim()) {
      return Response.json({ error: "Código incorreto." }, { status: 401 });
    }

    await deleteOtp(email);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret");
    const token = await new SignJWT({ email, name: entry.name, role: "guest" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("verify-otp error:", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
