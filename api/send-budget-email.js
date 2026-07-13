const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatDate = () =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

const buildEmailHtml = (lead) => {
  const rows = [
    ["Protocolo", lead.requestId],
    ["Serviço solicitado", lead.serviceType],
    ["Área aproximada", lead.estimatedAreaM2 ? `${lead.estimatedAreaM2} m²` : ""],
    ["Local", lead.location],
    ["Nome", lead.clientName],
    ["Telefone/WhatsApp", lead.clientPhone],
    ["Email", lead.clientEmail],
    ["Anexos", lead.fileCount ? `${lead.fileCount} arquivo(s) enviado(s)` : "Nenhum anexo"],
    ["Data de envio", formatDate()],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-size:13px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value || "Não informado")}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
        <div style="background:#0f172a;color:#fff;border-radius:14px 14px 0 0;padding:22px 24px;">
          <p style="margin:0 0 8px;color:#38bdf8;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Grupo Ardan</p>
          <h1 style="margin:0;font-size:24px;line-height:1.25;">Nova solicitação de orçamento</h1>
        </div>
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 14px 14px;padding:0 0 20px;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>${rowsHtml}</tbody>
          </table>
          <div style="padding:18px 24px 0;">
            <h2 style="margin:0 0 8px;font-size:16px;color:#0f172a;">Descrição enviada</h2>
            <p style="margin:0;white-space:pre-line;color:#334155;font-size:14px;line-height:1.6;">${escapeHtml(lead.description || "Não informado")}</p>
          </div>
          <div style="padding:18px 24px 0;">
            <h2 style="margin:0 0 8px;font-size:16px;color:#0f172a;">Mensagem para WhatsApp</h2>
            <p style="margin:0;white-space:pre-line;color:#334155;font-size:13px;line-height:1.55;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;">${escapeHtml(lead.whatsappMessage || "")}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

const buildEmailText = (lead) => `
Nova solicitação de orçamento - Grupo Ardan

Protocolo: ${lead.requestId || "Não informado"}
Serviço solicitado: ${lead.serviceType || "Não informado"}
Área aproximada: ${lead.estimatedAreaM2 || "Não informado"} m²
Local: ${lead.location || "Não informado"}
Nome: ${lead.clientName || "Não informado"}
Telefone/WhatsApp: ${lead.clientPhone || "Não informado"}
Email: ${lead.clientEmail || "Não informado"}
Anexos: ${lead.fileCount ? `${lead.fileCount} arquivo(s) enviado(s)` : "Nenhum anexo"}
Data de envio: ${formatDate()}

Descrição:
${lead.description || "Não informado"}

Mensagem para WhatsApp:
${lead.whatsappMessage || ""}
`;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método não permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BUDGET_EMAIL_TO || "contato@grupoardan.com.br";
  const from = process.env.BUDGET_EMAIL_FROM || "Grupo Ardan <contato@grupoardan.com.br>";

  if (!apiKey) {
    return response.status(200).json({ ok: true, skipped: true });
  }

  try {
    const lead = request.body || {};

    if (!lead.clientName || !lead.clientPhone) {
      return response.status(400).json({ error: "Nome e telefone são obrigatórios." });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.clientEmail || undefined,
        subject: `Novo orçamento Grupo Ardan - ${lead.clientName}`,
        html: buildEmailHtml(lead),
        text: buildEmailText(lead),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend email error:", errorText);
      return response.status(502).json({ error: "Não foi possível enviar o email." });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Budget email error:", error);
    return response.status(500).json({ error: "Erro interno ao enviar email." });
  }
}
