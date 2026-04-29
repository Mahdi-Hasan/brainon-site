import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { env } from "@/lib/env";

let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: { user: env.smtp.user, pass: env.smtp.password },
    pool: true,
    maxConnections: 2,
    maxMessages: 50,
  });
  return cached;
}

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, text, replyTo }: SendArgs) {
  const from = `"${env.mail.fromName}" <${env.mail.fromAddress}>`;
  const info = await transporter().sendMail({ from, to, subject, html, text, replyTo });
  return { messageId: info.messageId };
}
