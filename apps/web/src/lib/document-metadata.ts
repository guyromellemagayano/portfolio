/**
 * @file apps/web/src/lib/document-metadata.ts
 * @author Guy Romelle Magayano
 * @description Document metadata normalization helpers for the shared site shell.
 */

import {
  formatResolvedMetadataTitle,
  resolveMetadataDescription,
  SITE_NAME,
} from "@web/lib/metadata";
import {
  type StructuredData,
  type WebPageMetadata,
} from "@web/lib/metadata.types";

const DEFAULT_DOCUMENT_DESCRIPTION =
  "Portfolio of Guy Romelle Magayano, focused on product engineering, platform systems, and reusable web architecture.";

export type ResolvedDocumentMetadata = {
  canonicalUrl?: string;
  description: string;
  openGraph?: WebPageMetadata["openGraph"];
  robotsContent: string;
  siteName: string;
  structuredDataItems: StructuredData[];
  title: string;
  twitter?: WebPageMetadata["twitter"];
};

/** Resolves route metadata into a document-friendly shape for the root shell. */
export function resolveDocumentMetadata(
  metadata?: WebPageMetadata
): ResolvedDocumentMetadata {
  return {
    canonicalUrl: metadata?.alternates?.canonical,
    description: resolveMetadataDescription(
      metadata?.description,
      DEFAULT_DOCUMENT_DESCRIPTION
    ),
    openGraph: metadata?.openGraph,
    robotsContent: `${metadata?.robots?.index === false ? "noindex" : "index"},${metadata?.robots?.follow === false ? "nofollow" : "follow"}`,
    siteName: SITE_NAME,
    structuredDataItems: toStructuredDataItems(metadata?.structuredData),
    title: formatResolvedMetadataTitle(metadata?.title),
    twitter: metadata?.twitter,
  };
}

function toStructuredDataItems(
  structuredData?: WebPageMetadata["structuredData"]
): StructuredData[] {
  if (!structuredData) {
    return [];
  }

  return Array.isArray(structuredData) ? structuredData : [structuredData];
}
