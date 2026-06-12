export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { maps_url, business_name, name, email, phone, note } = body;

    if (!maps_url?.trim() || !name?.trim() || !email?.trim()) {
      return json({ detail: "Eksik alanlar: Maps linki, ad ve e-posta zorunlu" }, 400);
    }

    const now = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
    const displayName = business_name || name;

    // Pipeline komutu (emailde copy-paste için)
    const pipelineCmd = [
      `cd "00_aktif_proje/web10micro/pipeline"`,
      `python3 generate.py "${maps_url}" \\`,
      `  --name "${business_name || ""}" \\`,
      `  --notify-email "${email}"`,
    ].join("\n");

    const htmlBody = `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><style>
  body { font-family: -apple-system, Arial, sans-serif; color: #0F0F1A; max-width: 600px; margin: 0 auto; padding: 24px; }
  h1 { font-size: 20px; margin-bottom: 4px; }
  .badge { display: inline-block; background: #EEF0FF; color: #1B2FFF; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  td { padding: 8px 12px; border-bottom: 1px solid #E8E8F0; font-size: 14px; }
  td:first-child { color: #5A5A7A; width: 130px; font-weight: 600; }
  .cmd-box { background: #F4F4F8; border: 1px solid #E8E8F0; border-left: 4px solid #1B2FFF; border-radius: 8px; padding: 16px; margin: 0; }
  .cmd-box pre { margin: 0; font-family: "SF Mono", Menlo, monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; }
  .cmd-label { font-size: 12px; font-weight: 700; color: #1B2FFF; margin-bottom: 8px; }
  .footer { margin-top: 32px; font-size: 11px; color: #9999BB; border-top: 1px solid #E8E8F0; padding-top: 16px; }
</style></head>
<body>
  <div class="badge">📥 Yeni Demo Talebi</div>
  <h1>${displayName}</h1>
  <p style="color:#5A5A7A;font-size:13px;margin-bottom:20px;">${now}</p>

  <table>
    <tr><td>İşletme</td><td>${business_name || "—"}</td></tr>
    <tr><td>Maps Linki</td><td><a href="${maps_url}" style="color:#1B2FFF;">${maps_url.substring(0, 60)}${maps_url.length > 60 ? "…" : ""}</a></td></tr>
    <tr><td>Ad Soyad</td><td>${name}</td></tr>
    <tr><td>E-posta</td><td><a href="mailto:${email}" style="color:#1B2FFF;">${email}</a></td></tr>
    <tr><td>Telefon</td><td>${phone || "—"}</td></tr>
    <tr><td>Not</td><td>${note || "—"}</td></tr>
  </table>

  <div class="cmd-box">
    <div class="cmd-label">🚀 Pipeline Komutu — Kopyala &amp; Çalıştır</div>
    <pre>${pipelineCmd}</pre>
  </div>

  <div class="footer">
    web10micro · Demo talep formu · ${now}
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "web10micro <onboarding@resend.dev>",
        to: ["rara@raraprojects.com"],
        subject: `📥 Yeni Demo Talebi — ${displayName}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return json({ detail: "E-posta gönderilemedi" }, 500);
    }

    return json({
      success: true,
      message: "Demo talebiniz alındı. En kısa sürede dönüş yapacağız.",
    });
  } catch (error) {
    console.error("Demo request error:", error);
    return json({ detail: "Bir hata oluştu" }, 500);
  }
}

export async function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
