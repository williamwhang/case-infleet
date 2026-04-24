import { SignJWT } from "jose";
import { cookies } from "next/headers";
import {
  authenticateWithPassword,
  hasPasswordAuthConfigured,
} from "@/lib/auth-credentials";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "E-mail e senha são obrigatórios." }, { status: 400 });
    }

    if (!hasPasswordAuthConfigured()) {
      return Response.json(
        { error: "Credenciais não configuradas no servidor." },
        { status: 500 }
      );
    }

    const authenticatedUser = authenticateWithPassword(email, password);
    if (!authenticatedUser) {
      return Response.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret");
    const token = await new SignJWT({
      email: authenticatedUser.email,
      name: authenticatedUser.name,
      role: authenticatedUser.role,
    })
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

    return Response.json({
      ok: true,
      role: authenticatedUser.role,
      email: authenticatedUser.email,
      name: authenticatedUser.name,
    });
  } catch (error) {
    console.error("login error:", error);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
