/**
 * @file apps/web/src/data/portable-text.ts
 * @author Guy Romelle Magayano
 * @description Minimal rich-text block types for local article and standalone page data.
 */

/** Supported Twitter card values for route metadata. */
export type ContentTwitterCard = "summary" | "summary_large_image";

/** Portable Text mark definition object used by rich text block content. */
export type ContentPortableTextMarkDef = {
  _key?: string;
  _type?: string;
  [key: string]: unknown;
};

/** Portable Text span node used in text blocks. */
export type ContentPortableTextSpan = {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
};

/** Portable Text image block normalized with a direct asset URL when available. */
export type ContentPortableTextImageBlock = {
  _key?: string;
  _type: "image";
  alt?: string;
  asset?: {
    url?: string;
    width?: number;
    height?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

/** Generic Portable Text block payload used for article and page body content. */
export type ContentPortableTextBlock = {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: ContentPortableTextSpan[];
  markDefs?: ContentPortableTextMarkDef[];
  [key: string]: unknown;
};
