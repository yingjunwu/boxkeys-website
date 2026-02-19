"use client";

import { useState, useEffect, useRef } from "react";
import { TERMINAL_LINES } from "@/lib/constants";

interface VisibleLine {
  text: string;
  type: "input" | "output";
  prompt: string;
  complete: boolean;
}

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<VisibleLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineAddedRef = useRef(false);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      setIsTyping(false);
      return;
    }

    const line = TERMINAL_LINES[currentLine];

    if (line.type === "output") {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [
          ...prev,
          { text: line.text, type: "output", prompt: "", complete: true },
        ]);
        lineAddedRef.current = false;
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timeout);
    }

    if (currentChar === 0 && !lineAddedRef.current) {
      lineAddedRef.current = true;
      setVisibleLines((prev) => [
        ...prev,
        { text: "", type: "input", prompt: line.prompt, complete: false },
      ]);
    }

    if (currentChar < line.text.length) {
      const timeout = setTimeout(
        () => {
          setVisibleLines((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            updated[updated.length - 1] = {
              ...last,
              text: line.text.slice(0, currentChar + 1),
            };
            return updated;
          });
          setCurrentChar((prev) => prev + 1);
        },
        30 + Math.random() * 40,
      );
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        updated[updated.length - 1] = { ...last, complete: true };
        return updated;
      });
      lineAddedRef.current = false;
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }, 200);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-lg shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57] transition hover:brightness-125" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e] transition hover:brightness-125" />
          <div className="h-3 w-3 rounded-full bg-[#28c840] transition hover:brightness-125" />
        </div>
        <span className="ml-2 text-xs text-muted">terminal</span>
      </div>
      {/* Content */}
      <div
        ref={containerRef}
        className="h-[320px] overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {visibleLines.map((line, i) => (
          <div key={i} className="flex">
            {line.type === "input" && (
              <span className="mr-2 w-8 shrink-0 select-none text-accent">
                {line.prompt}
              </span>
            )}
            {line.type === "output" && (
              <span className="mr-2 w-8 shrink-0" />
            )}
            <span
              className={
                line.type === "output"
                  ? "text-muted"
                  : "text-foreground-bright"
              }
            >
              {line.text}
            </span>
            {!line.complete && isTyping && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 self-center animate-pulse bg-accent" />
            )}
          </div>
        ))}
        {!isTyping && currentLine >= TERMINAL_LINES.length && (
          <div className="flex items-center">
            <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
          </div>
        )}
      </div>
    </div>
  );
}
