/**
 * @file apps/web/src/lib/__tests__/document-metadata.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for shared document metadata normalization.
 */

import { describe, expect, it } from "vitest";

import { resolveDocumentMetadata } from "@web/lib/document-metadata";

describe("resolveDocumentMetadata", () => {
  it("returns stable defaults when route metadata is absent", () => {
    const metadata = resolveDocumentMetadata();

    expect(metadata).toMatchObject({
      description:
        "Portfolio of Guy Romelle Magayano, focused on product engineering, platform systems, and reusable web architecture.",
      robotsContent: "index,follow",
      siteName: "Guy Romelle Magayano",
      title: "Guy Romelle Magayano",
      structuredDataItems: [],
    });
  });

  it("normalizes route metadata into document-ready values", () => {
    const metadata = resolveDocumentMetadata({
      title: "About",
      description: "Background, priorities, and engineering principles.",
      alternates: {
        canonical: "https://www.guyromellemagayano.com/about",
      },
      robots: {
        index: false,
        follow: true,
      },
      structuredData: {
        "@type": "WebPage",
      },
    });

    expect(metadata).toMatchObject({
      canonicalUrl: "https://www.guyromellemagayano.com/about",
      description: "Background, priorities, and engineering principles.",
      robotsContent: "noindex,follow",
      title: "About | Guy Romelle Magayano",
      structuredDataItems: [
        {
          "@type": "WebPage",
        },
      ],
    });
  });
});
