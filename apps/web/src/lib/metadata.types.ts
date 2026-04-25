/**
 * @file apps/web/src/lib/metadata.types.ts
 * @author Guy Romelle Magayano
 * @description Metadata types shared by Astro route wrappers.
 */

export type StructuredData = Record<string, unknown>;

export type WebPageMetadata = {
  title?:
    | string
    | {
        absolute?: string;
        default?: string;
        template?: string;
      };
  description?: string;
  alternates?: {
    canonical?: string;
  };
  robots?: {
    follow?: boolean;
    index?: boolean;
  };
  openGraph?: {
    description?: string;
    images?: Array<{
      alt?: string;
      height?: number;
      url: string;
      width?: number;
    }>;
    publishedTime?: string;
    siteName?: string;
    title?: string;
    type?: "article" | "website";
    url?: string;
  };
  twitter?: {
    card?: string;
    description?: string;
    images?: string[];
    title?: string;
  };
  structuredData?: StructuredData | StructuredData[];
};
