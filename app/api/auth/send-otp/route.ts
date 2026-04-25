import { Resend } from "resend";
import { createApprovalToken } from "@/lib/access-approval";

function getApproverEmail() {
  return (
    process.env.ACCESS_APPROVER_EMAIL ??
    process.env.ADMIN_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    "onboarding@resend.dev"
  );
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return Response.json({ error: "Nome e e-mail são obrigatórios." }, { status: 400 });
    }

    const trimmedName = String(name).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return Response.json({ error: "E-mail inválido." }, { status: 400 });
    }

    const approvalToken = await createApprovalToken(normalizedEmail, trimmedName);
    const approveUrl = new URL("/api/auth/approve", request.url);
    approveUrl.searchParams.set("token", approvalToken);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: getApproverEmail(),
      subject: `Solicitação de acesso — ${trimmedName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
          <p style="font-size: 14px; color: #6b6b6b; margin: 0 0 32px;">William Whang · Solicitação de acesso</p>
          <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 12px;">Novo pedido de acesso</h1>
          <p style="font-size: 15px; color: #6b6b6b; margin: 0 0 28px;">Um visitante solicitou acesso ao portfólio.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 32px;">
            <tr><td style="padding: 10px 0; color: #6b6b6b; width: 120px;">Nome</td><td style="padding: 10px 0;">${trimmedName}</td></tr>
            <tr><td style="padding: 10px 0; color: #6b6b6b;">E-mail</td><td style="padding: 10px 0;">${normalizedEmail}</td></tr>
          </table>
          <a href="${approveUrl.toString()}" style="display: inline-block; background: #111; color: #fff; text-decoration: none; border-radius: 999px; padding: 14px 22px; font-size: 14px; font-weight: 500;">Aprovar e enviar código</a>
          <p style="font-size: 12px; color: #8a8a8a; margin: 24px 0 0;">O link de aprovação expira em 24 horas.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Erro ao enviar solicitação. Tente novamente." }, { status: 500 });
    }

    return Response.json({ ok: true, requested: true });
  } catch (err) {
    console.error("send-otp error:", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
