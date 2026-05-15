export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { maps_url, business_name, name, email, phone, note } = body;

    if (!maps_url?.trim() || !name?.trim() || !email?.trim()) {
      return json({ detail: "Eksik alanlar: Maps linki, ad ve e-posta zorunlu" }, 400);
    }

    const now = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

    const payload = {
      to: ["rara@raraprojects.com"],
      subject: `📥 Yeni Demo Talebi — ${business_name || name}`,
      text: [
        `Yeni Demo Talebi`,
        ``,
        `Tarih: ${now}`,
        `İşletme: ${business_name || "Belirtilmemiş"}`,
        `Maps Linki: ${maps_url}`,
        `İletişim: ${name} — ${email}${phone ? ` — ${phone}` : ""}`,
        `Not: ${note || "Yok"}`,
      ].join("\n"),
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "web10micro <onboarding@resend.dev>",
        ...payload,
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