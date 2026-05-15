import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { maps_url, business_name, name, email, phone, note } = body;

    if (!maps_url || !name || !email) {
      return NextResponse.json({ detail: "Eksik alanlar: Maps linki, ad ve e-posta zorunlu" }, { status: 400 });
    }

    const emailText = [
      `📥 Yeni Demo Talebi`,
      ``,
      `İşletme: ${business_name || "Belirtilmemiş"}`,
      `Maps Linki: ${maps_url}`,
      `İletişim: ${name} — ${email}${phone ? ` — ${phone}` : ""}`,
      `Not: ${note || "Yok"}`,
      ``,
      `---`,
      `web10micro.com auto-request`,
    ].join("\n");

    let emailSent = false;

    if (RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "web10micro <onboarding@resend.dev>",
            to: "rara@raraprojects.com",
            subject: `📥 Yeni Demo Talebi — ${business_name || name}`,
            text: emailText,
          }),
        });

        if (res.ok) emailSent = true;
      } catch {
        // Resend fails silently
      }
    }

    return NextResponse.json({
      success: true,
      email_sent: emailSent,
      message: "Demo talebiniz alındı. En kısa sürede dönüş yapacağız.",
    });
  } catch (err) {
    return NextResponse.json({ detail: "Bir hata oluştu" }, { status: 500 });
  }
}