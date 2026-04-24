import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return Response.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: "whang.william@gmail.com",
      replyTo: email,
      subject: `[Portfólio] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
          <p style="font-size: 13px; color: #999; margin: 0 0 32px; text-transform: uppercase; letter-spacing: 0.08em;">William Whang · Portfólio</p>
          <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 24px; letter-spacing: -0.02em;">${subject}</h1>
          <table style="width: 100%; border-collapse: collapse; margin: 0 0 28px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; color: #999; width: 80px; text-transform: uppercase; letter-spacing: 0.06em;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #1a1a1a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.06em;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${email}" style="color: #3a5dae; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          <p style="font-size: 15px; line-height: 1.65; color: #3a3a3a; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("contact route error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
