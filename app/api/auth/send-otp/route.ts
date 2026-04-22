import { Resend } from "resend";
import { setOtp } from "@/lib/otp-store";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return Response.json({ error: "Nome e e-mail são obrigatórios." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "E-mail inválido." }, { status: 400 });
    }

    const code = generateOtp();
    setOtp(email, code, name);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: email,
      subject: "Seu código de acesso — William Whang",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
          <p style="font-size: 14px; color: #6b6b6b; margin: 0 0 32px;">William Whang · Portfólio</p>
          <h1 style="font-size: 24px; font-weight: 500; margin: 0 0 8px;">Olá, ${name}</h1>
          <p style="font-size: 15px; color: #6b6b6b; margin: 0 0 32px;">Aqui está o seu código de acesso ao portfólio:</p>
          <div style="background: #f8f8f6; border-radius: 8px; padding: 24px; text-align: center; margin: 0 0 32px;">
            <span style="font-size: 36px; font-weight: 600; letter-spacing: 8px; color: #1a1a1a;">${code}</span>
          </div>
          <p style="font-size: 13px; color: #6b6b6b; margin: 0;">Este código expira em <strong>15 minutos</strong>. Se não solicitaste este acesso, ignora este e-mail.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Erro ao enviar e-mail. Tente novamente." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("send-otp error:", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
