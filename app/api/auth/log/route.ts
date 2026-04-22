import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return Response.json({ ok: true });
    }

    const domain = email.split("@")[1] ?? "";
    const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      subject: `Portfólio acessado — ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
          <p style="font-size: 13px; color: #6b6b6b; margin: 0 0 24px;">William Whang · Log de acesso</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr><td style="padding: 8px 0; color: #6b6b6b; width: 80px;">Nome</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b6b6b;">E-mail</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Domínio</td><td style="padding: 8px 0;">${domain}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Data/Hora</td><td style="padding: 8px 0;">${now}</td></tr>
          </table>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("log error:", err);
    return Response.json({ ok: true });
  }
}
