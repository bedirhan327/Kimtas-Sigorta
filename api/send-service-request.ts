import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const EMAIL_ENABLED = process.env.EMAIL_ENABLED === "true";
  const {
    serviceName,
    data,
    to: overrideTo,
  }: { serviceName: string; data: Record<string, string>; to?: string } =
    req.body || {};

  if (!serviceName || !data) {
    res.status(400).json({ error: "Missing serviceName or data" });
    return;
  }

  const to = overrideTo || process.env.EMAIL_TO;

  if (!EMAIL_ENABLED) {
    console.log("[EMAIL_DISABLED] Incoming request", { serviceName, data, to });
    res
      .status(200)
      .json({ ok: true, message: "Email disabled, request logged only." });
    return;
  }

  if (!to) {
    res
      .status(500)
      .json({ error: "EMAIL_TO env variable is not set on the server." });
    return;
  }

  try {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      throw new Error("SMTP_USER or SMTP_PASS is not set");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    const lines = Object.entries(data).map(
      ([key, value]) => `${key}: ${value || "-"}`
    );

    await transporter.sendMail({
      from: `"KİMTAŞSİGORTA Form" <${user}>`,
      to,
      subject: `Yeni teklif talebi - ${serviceName}`,
      text: lines.join("\n"),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}


