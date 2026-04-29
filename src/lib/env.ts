import "server-only";

function required(key: string): string {
  const v = process.env[key];
  if (!v || v.length === 0) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return v;
}

function optional(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const env = {
  smtp: {
    host: required("SMTP_HOST"),
    port: Number(required("SMTP_PORT")),
    secure: required("SMTP_SECURE") === "true",
    user: required("SMTP_USER"),
    password: required("SMTP_PASSWORD"),
  },
  mail: {
    fromName: optional("MAIL_FROM_NAME", "BrainOn"),
    fromAddress: required("MAIL_FROM_ADDRESS"),
    toAddress: required("MAIL_TO_ADDRESS"),
  },
  turnstile: {
    siteKey: optional("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
    secret: optional("TURNSTILE_SECRET_KEY"),
  },
  upstash: {
    url: optional("UPSTASH_REDIS_REST_URL"),
    token: optional("UPSTASH_REDIS_REST_TOKEN"),
  },
};
