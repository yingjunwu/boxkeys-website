"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

interface Token {
  type: "keyword" | "string" | "comment" | "number" | "plain";
  text: string;
}

function tokenize(code: string, language: string): Token[] {
  const keywords =
    language === "python"
      ? new Set(["from", "import", "def", "class", "return", "if", "else", "for", "in", "with", "as", "print", "async", "await"])
      : language === "bash" || language === "curl"
        ? new Set(["curl", "echo", "export", "if", "then", "else", "fi", "for", "do", "done"])
        : new Set(["import", "from", "const", "let", "var", "function", "return", "async", "await", "new", "export"]);

  const commentPattern =
    language === "python" ? /#[^\n]*/ :
    language === "bash" || language === "curl" ? /#[^\n]*/ :
    /\/\/[^\n]*/;

  const patterns: { type: Token["type"]; regex: RegExp }[] = [
    { type: "comment", regex: commentPattern },
    { type: "string", regex: /"""[\s\S]*?"""/ },
    { type: "string", regex: /'''[\s\S]*?'''/ },
    { type: "string", regex: /"(?:[^"\\]|\\.)*"/ },
    { type: "string", regex: /'(?:[^'\\]|\\.)*'/ },
    { type: "string", regex: /`(?:[^`\\]|\\.)*`/ },
    { type: "number", regex: /\b\d+\.?\d*\b/ },
    { type: "plain", regex: /\b[a-zA-Z_]\w*\b/ },
  ];

  const combined = new RegExp(
    patterns.map((p) => `(${p.regex.source})`).join("|"),
    "g",
  );

  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(combined)) {
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", text: code.slice(lastIndex, match.index) });
    }

    let tokenType: Token["type"] = "plain";
    const fullMatch = match[0];
    for (let i = 0; i < patterns.length; i++) {
      if (match[i + 1] !== undefined) {
        tokenType = patterns[i].type;
        break;
      }
    }

    if (tokenType === "plain" && keywords.has(fullMatch)) {
      tokenType = "keyword";
    }

    tokens.push({ type: tokenType, text: fullMatch });
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: "plain", text: code.slice(lastIndex) });
  }

  return tokens;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderTokens(tokens: Token[]): string {
  return tokens
    .map((token) => {
      const escaped = escapeHtml(token.text);
      if (token.type === "plain") return escaped;
      return `<span class="token-${token.type}">${escaped}</span>`;
    })
    .join("");
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokens = tokenize(code, language);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs text-muted">{language}</span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="text-xs text-muted transition-colors hover:text-foreground"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code
          className="font-mono text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: renderTokens(tokens),
          }}
        />
      </pre>
    </div>
  );
}
