"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

const SCOPES = ["Product", "Design system", "AI integration", "Platform"];
const BUDGETS = ["< $50k", "$50–150k", "$150–500k", "$500k+", "Not sure"];

export function ContactForm() {
  const [scope, setScope] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="border-t border-[color-mix(in_oklab,var(--color-ink)_15%,transparent)] pt-12"
        >
          <p className="eyebrow mb-6">Received</p>
          <h2 className="font-display tracking-[-0.04em]" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 0.95 }}>
            <span className="display-heavy">Thanks.</span>{" "}
            <span className="display-italic">We&apos;ll be in touch within 72h.</span>
          </h2>
          <p className="mt-6 max-w-md text-[var(--text-base)] leading-[1.55] text-[var(--color-ink)]/70">
            A real person reads every memo. Expect a reply from someone with a name, not a no-reply address.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="space-y-12"
        >
          <fieldset className="space-y-6">
            <legend className="eyebrow mb-2">01 · Project scope</legend>
            <div className="flex flex-wrap gap-2">
              {SCOPES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setScope(s)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300",
                    scope === s
                      ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bone)]"
                      : "border-[color-mix(in_oklab,var(--color-ink)_25%,transparent)] hover:border-[var(--color-ink)]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="eyebrow mb-2">02 · Budget</legend>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBudget(b)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300",
                    budget === b
                      ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bone)]"
                      : "border-[color-mix(in_oklab,var(--color-ink)_25%,transparent)] hover:border-[var(--color-ink)]"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-8">
            <legend className="eyebrow mb-2">03 · The basics</legend>

            <Field label="Name" name="name" placeholder="Aiko Tanaka" required />
            <Field label="Company" name="company" placeholder="Northwind" />
            <Field label="Work email" name="email" type="email" placeholder="aiko@northwind.com" required />

            <label className="block">
              <span className="eyebrow mb-3">Tell us about the project</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="What you&#39;re building, who it&#39;s for, where you&#39;re stuck."
                className="mt-2 block w-full resize-none border-b border-[color-mix(in_oklab,var(--color-ink)_25%,transparent)] bg-transparent py-3 text-[var(--text-lg)] leading-[1.5] outline-none transition-colors duration-300 focus:border-[var(--color-cobalt)]"
              />
            </label>
          </fieldset>

          <button type="submit" className="btn-pill">
            Send memo request
            <span aria-hidden>→</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-3">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 block w-full border-b border-[color-mix(in_oklab,var(--color-ink)_25%,transparent)] bg-transparent py-3 text-[var(--text-lg)] leading-[1.5] outline-none transition-colors duration-300 focus:border-[var(--color-cobalt)]"
      />
    </label>
  );
}
