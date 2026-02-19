export const SITE = {
  name: "BoxKeys",
  tagline: "One API key, beyond AI models",
  description:
    "AI models, search, web crawl, and more — all through a single endpoint. Pay as you go, no contracts.",
  url: "https://boxkeys.ai",
  dashboardUrl: "https://dash.boxkeys.ai",
  githubUrl: "https://github.com/yingjunwu/boxkeys-cli",
  docsUrl: "https://docs.boxkeys.ai",
  installCommand: "npm install -g boxkeys",
} as const;

export const NAV_LINKS = [
  { label: "Dashboard", href: SITE.dashboardUrl },
  { label: "Docs", href: SITE.docsUrl },
  { label: "GitHub", href: SITE.githubUrl },
] as const;

export const FEATURES = [
  {
    title: "Models + Tools",
    description:
      "AI models alongside built-in tools — search, web crawl, and more. OpenAI-compatible format.",
    icon: "api",
  },
  {
    title: "Pay As You Go",
    description:
      "No monthly fees, no commitments. Top up your balance and pay only for what you use.",
    icon: "credit",
  },
  {
    title: "Developer First",
    description:
      "CLI tools, dashboard, and API docs. Manage keys, check balance, and monitor usage from the terminal.",
    icon: "terminal",
  },
] as const;

export const CODE_EXAMPLES = {
  python: {
    label: "Python",
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.boxkeys.ai/v1",
    api_key="sk-ag_..."  # Your BoxKeys API key
)

response = client.chat.completions.create(
    model="claude-sonnet-4-20250514",
    messages=[
        {"role": "user", "content": "Hello from BoxKeys!"}
    ]
)

print(response.choices[0].message.content)`,
  },
  nodejs: {
    label: "Node.js",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.boxkeys.ai/v1",
  apiKey: "sk-ag_...",  // Your BoxKeys API key
});

const response = await client.chat.completions.create({
  model: "claude-sonnet-4-20250514",
  messages: [
    { role: "user", content: "Hello from BoxKeys!" }
  ],
});

console.log(response.choices[0].message.content);`,
  },
  curl: {
    label: "curl",
    code: `curl https://api.boxkeys.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk-ag_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [
      {"role": "user", "content": "Hello from BoxKeys!"}
    ]
  }'`,
  },
} as const;

export const TERMINAL_LINES = [
  { type: "input" as const, prompt: "$", text: "npm install -g boxkeys" },
  { type: "output" as const, prompt: "", text: "added 1 package, installed in 1.2s" },
  { type: "input" as const, prompt: "$", text: "boxkeys login" },
  { type: "output" as const, prompt: "", text: "Email: you@example.com" },
  { type: "output" as const, prompt: "", text: "Check your inbox and click the sign-in link. Waiting..." },
  { type: "output" as const, prompt: "", text: "Logged in as you@example.com" },
  { type: "input" as const, prompt: "$", text: "boxkeys keys create --name my-app" },
  { type: "output" as const, prompt: "", text: "  Key:  sk-ag_a1b2c3d4e5f6..." },
  { type: "output" as const, prompt: "", text: "  Save this key — it will not be shown again." },
  { type: "input" as const, prompt: "$", text: "boxkeys balance" },
  { type: "output" as const, prompt: "", text: "Balance: $10.00" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Dashboard", href: SITE.dashboardUrl },
    { label: "Documentation", href: SITE.docsUrl },
    { label: "CLI", href: SITE.githubUrl },
  ],
  community: [
    { label: "GitHub", href: SITE.githubUrl },
  ],
} as const;
