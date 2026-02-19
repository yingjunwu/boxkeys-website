"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const features = [
  "No monthly fees or subscriptions",
  "Pay only for tokens you use",
  "Provider cost + small service fee",
  "Top up via CLI or dashboard",
  "Usage tracking and billing history",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="font-mono text-sm tracking-wide text-accent">
              pricing
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground-bright sm:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-muted">
              No surprises. Top up your balance and pay only for what you use.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-16 max-w-lg">
            <div className="overflow-hidden rounded-xl border border-border">
              {/* Header */}
              <div className="bg-surface p-8 text-center">
                <p className="font-mono text-sm text-accent">Pay As You Go</p>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold tracking-tight text-foreground-bright">$0</span>
                  <span className="text-muted">to start</span>
                </div>
                <p className="mt-3 text-sm text-muted">
                  Top up any amount, use until it runs out
                </p>
              </div>

              {/* Features */}
              <div className="bg-background p-8">
                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Top up command */}
                <div className="mt-8 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm">
                  <span className="text-accent">$</span>{" "}
                  <span className="text-foreground-bright">boxkeys topup 10</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
