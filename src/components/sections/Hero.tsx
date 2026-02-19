"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { TerminalAnimation } from "@/components/ui/TerminalAnimation";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SITE.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-12">
      {/* Subtle grid + very faint top glow */}
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(232,67,147,0.08)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Mono label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm tracking-wide text-muted"
        >
          models + tools &middot; pay-as-you-go &middot; developer-first
        </motion.p>

        {/* Giant headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-foreground-bright sm:text-6xl lg:text-8xl"
        >
          One API key,
          <br />
          <span className="text-gradient">beyond AI models</span>
        </motion.h1>

        {/* Short subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          AI models, search, web crawl, and more — all through a single
          endpoint. Pay as you go, no contracts.
        </motion.p>

        {/* Buttons — install + get started */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleCopy}
            className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-6 py-3.5 font-mono text-sm transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
          >
            <span className="text-accent">$</span>
            <span className="text-foreground-bright">
              {SITE.installCommand}
            </span>
            <span className="text-muted transition-colors group-hover:text-foreground">
              {copied ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </span>
          </button>

          <a
            href={SITE.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground-bright px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-foreground"
          >
            Get Started
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Terminal — below, centered, with breathing room */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-20 max-w-2xl"
        >
          <TerminalAnimation />
        </motion.div>
      </div>
    </section>
  );
}
