"use server";

import { headers } from "next/headers";
import { render } from "@react-email/render";
import { z } from "zod";

import { sendMail } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { env } from "@/lib/env";
import ContactNotification from "@/emails/ContactNotification";
import ContactAutoresponder from "@/emails/ContactAutoresponder";

const SCOPES = ["Product", "Design system", "AI integration", "Platform"] as const;
const BUDGETS = ["< $50k", "$50–150k", "$150–500k", "$500k+", "Not sure"] as const;

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid work email."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Tell us at least a sentence or two.").max(5000),
  scope: z.enum(SCOPES).optional().or(z.literal("")),
  budget: z.enum(BUDGETS).optional().or(z.literal("")),
  // honeypot — bots fill it, humans don't see it
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type ContactState =
  | { status: "idle" }
  | { status: "ok"; messageId: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
    scope: String(formData.get("scope") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    website: String(formData.get("website") ?? ""),
    turnstileToken: String(formData.get("cf-turnstile-response") ?? ""),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0];
      if (typeof k === "string" && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  // honeypot tripped — pretend success so bots learn nothing
  if (data.website && data.website.length > 0) {
    return { status: "ok", messageId: "honeypot" };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";

  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    return { status: "error", message: "Too many submissions from this network. Try again in an hour." };
  }

  if (env.turnstile.secret) {
    const ok = await verifyTurnstile(data.turnstileToken ?? "", ip);
    if (!ok) {
      return { status: "error", message: "Spam check failed. Refresh the page and try again." };
    }
  }

  const submittedAt = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const payload = {
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    scope: data.scope || undefined,
    budget: data.budget || undefined,
    message: data.message,
    submittedAt,
    ip,
  };

  const notifyHtml = await render(ContactNotification(payload));
  const notifyText = await render(ContactNotification(payload), { plainText: true });

  const subject = `New memo · ${data.name}${data.company ? ` · ${data.company}` : ""}`;

  try {
    const sent = await sendMail({
      to: env.mail.toAddress,
      subject,
      html: notifyHtml,
      text: notifyText,
      replyTo: data.email,
    });

    // autoresponder — non-fatal if it fails
    try {
      const ackHtml = await render(ContactAutoresponder({ name: data.name }));
      const ackText = await render(ContactAutoresponder({ name: data.name }), { plainText: true });
      await sendMail({
        to: data.email,
        subject: "We received your memo · BrainOn",
        html: ackHtml,
        text: ackText,
      });
    } catch (err) {
      console.debug("autoresponder failed", err);
    }

    return { status: "ok", messageId: sent.messageId };
  } catch (err) {
    console.debug("contact send failed", err);
    return { status: "error", message: "We couldn't send the memo. Try again, or email us directly." };
  }
}
