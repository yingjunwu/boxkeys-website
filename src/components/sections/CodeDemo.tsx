"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CODE_EXAMPLES } from "@/lib/constants";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FadeIn } from "@/components/ui/FadeIn";

const tabs = Object.entries(CODE_EXAMPLES) as [
  keyof typeof CODE_EXAMPLES,
  (typeof CODE_EXAMPLES)[keyof typeof CODE_EXAMPLES],
][];

export function CodeDemo() {
  const [active, setActive] = useState<keyof typeof CODE_EXAMPLES>("python");

  return (
    <section id="code" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="text-center">
            <p className="font-mono text-sm tracking-wide text-accent">
              integration
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground-bright sm:text-5xl">
              Drop-in compatible
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-muted">
              Use the OpenAI SDK you already know. Just change the base URL.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-16">
            {/* Tabs */}
            <div className="mb-4 flex gap-1 rounded-lg border border-border bg-surface p-1">
              {tabs.map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`relative rounded-md px-4 py-2 font-mono text-sm transition-colors ${
                    active === key
                      ? "text-foreground-bright"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {active === key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{val.label}</span>
                </button>
              ))}
            </div>

            {/* Code */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <CodeBlock
                  code={CODE_EXAMPLES[active].code}
                  language={active}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
