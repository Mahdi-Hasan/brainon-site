import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { env } from "@/lib/env";

let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  // Pool disabled on purpose: Vercel functions are frozen between invocations,
  // and pooled SMTP connections don't survive freeze/thaw — they error on next use.
  cached = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: { user: env.smtp.user, pass: env.smtp.password },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 8_000,
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
