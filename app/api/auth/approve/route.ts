import { Resend } from "resend";
import { setOtp } from "@/lib/otp-store";
import { verifyApprovalToken } from "@/lib/access-approval";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function html(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return html("<h1>Token de aprovação ausente</h1>", 400);
  }

  try {
    const approvedVisitor = await verifyApprovalToken(token);
    const code = generateOtp();

    await setOtp(approvedVisitor.email, code, approvedVisitor.name, 15 * 60);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: approvedVisitor.email,
      subject: "Seu código de acesso — William Whang",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
          <p style="font-size: 14px; color: #6b6b6b; margin: 0 0 32px;">William Whang · Portfólio</p>
          <h1 style="font-size: 24px; font-weight: 500; margin: 0 0 8px;">Olá, ${approvedVisitor.name}</h1>
          <p style="font-size: 15px; color: #6b6b6b; margin: 0 0 32px;">Seu acesso foi aprovado. Use o código abaixo para entrar no portfólio.</p>
          <div style="background: #f8f8f6; border-radius: 8px; padding: 24px; text-align: center; margin: 0 0 32px;">
            <span style="font-size: 36px; font-weight: 600; letter-spacing: 8px; color: #1a1a1a;">${code}</span>
          </div>
          <p style="font-size: 13px; color: #6b6b6b; margin: 0;">Este código expira em <strong>15 minutos</strong>.</p>
        </div>
      `,
    });

    if (error) {
      console.error("approval resend error:", error);
      return html("<h1>Não foi possível enviar o código ao visitante</h1><p>Tente novamente em alguns instantes.</p>", 500);
    }

    return html(`
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:48px 24px;color:#1a1a1a;">
        <h1 style="margin:0 0 12px;font-size:28px;">Acesso aprovado</h1>
        <p style="margin:0 0 8px;font-size:16px;color:#555;">O código foi enviado para <strong>${approvedVisitor.email}</strong>.</p>
        <p style="margin:0;font-size:14px;color:#777;">Ele expira em 15 minutos.</p>
      </div>
    `);
  } catch (error) {
    console.error("approval error:", error);
    return html("<h1>Link de aprovação inválido ou expirado</h1>", 401);
  }
}
