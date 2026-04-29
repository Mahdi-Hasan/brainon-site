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

// Getters so a missing required var only throws when the contact pipeline is
// actually invoked — not at server boot, which would 500 the whole site.
export const env = {
  get smtp() {
    return {
      host: required("SMTP_HOST"),
      port: Number(required("SMTP_PORT")),
      secure: required("SMTP_SECURE") === "true",
      user: required("SMTP_USER"),
      password: required("SMTP_PASSWORD"),
    };
  },
  get mail() {
    return {
      fromName: optional("MAIL_FROM_NAME", "BrainOn"),
      fromAddress: required("MAIL_FROM_ADDRESS"),
      toAddress: required("MAIL_TO_ADDRESS"),
    };
  },
  get upstash() {
    return {
      url: optional("UPSTASH_REDIS_REST_URL"),
      token: optional("UPSTASH_REDIS_REST_TOKEN"),
    };
  },
};
