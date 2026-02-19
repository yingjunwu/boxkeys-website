import { SITE } from "./constants";
import type { Metadata } from "next";

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: overrides?.title ?? `${SITE.name} — ${SITE.tagline}`,
    description: overrides?.description ?? SITE.description,
    metadataBase: new URL(SITE.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE.url,
      siteName: SITE.name,
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      ...overrides?.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      ...overrides?.twitter,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}

export function createJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Pay-as-you-go pricing. Top up your balance and pay only for what you use.",
    },
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}
