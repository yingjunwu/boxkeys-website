"use client";

import { FEATURES } from "@/lib/constants";
import { FadeIn } from "@/components/ui/FadeIn";

const icons: Record<string, React.ReactNode> = {
  api: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  credit: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  terminal: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
};

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="font-mono text-sm tracking-wide text-accent">
              features
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground-bright sm:text-5xl">
              Everything you need
              <br className="hidden sm:block" />
              to ship with AI
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base text-muted">
              Models, tools, and more — one integration.
            </p>
          </div>
        </FadeIn>

        <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.06}>
              <div className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface/80">
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  {icons[feature.icon]}
                </div>
                <h3 className="text-base font-semibold text-foreground-bright">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
