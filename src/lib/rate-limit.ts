import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;
  if (!env.upstash.url || !env.upstash.token) return null;
  const redis = new Redis({ url: env.upstash.url, token: env.upstash.token });
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix: "brainon:contact",
  });
  return limiter;
}

export async function checkRateLimit(ip: string): Promise<{ ok: boolean; remaining: number; reset: number }> {
  const l = getLimiter();
  if (!l) return { ok: true, remaining: 5, reset: 0 };
  const r = await l.limit(ip);
  return { ok: r.success, remaining: r.remaining, reset: r.reset };
}
