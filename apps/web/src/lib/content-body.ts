/**
 * @file apps/web/src/lib/content-body.ts
 * @author Guy Romelle Magayano
 * @description Converts local JSON content blocks into Portable Text records.
 */

import {
  type ContentPortableTextBlock,
  type ContentPortableTextImageBlock,
} from "@web/data/portable-text";
import {
  assertExactKeys,
  expectArray,
  expectEnum,
  expectOptionalPositiveNumber,
  expectOptionalString,
  expectRecord,
  expectString,
} from "@web/lib/json-data";

const CONTENT_BLOCK_TYPES = ["paragraph", "image"] as const;

type JsonContentBlock =
  | {
      type: "paragraph";
      key: string;
      text: string;
    }
  | {
      type: "image";
      key: string;
      alt?: string;
      url: string;
      width?: number;
      height?: number;
    };

const PARAGRAPH_BLOCK_KEYS = ["type", "key", "text"] as const;
const IMAGE_BLOCK_KEYS = [
  "type",
  "key",
  "alt",
  "url",
  "width",
  "height",
] as const;

function parseJsonContentBlock(value: unknown, path: string): JsonContentBlock {
  const record = expectRecord(value, path);
  const type = expectEnum(record.type, CONTENT_BLOCK_TYPES, `${path}.type`);
  const key = expectString(record.key, `${path}.key`);

  if (type === "paragraph") {
    assertExactKeys(record, PARAGRAPH_BLOCK_KEYS, path);

    return {
      type,
      key,
      text: expectString(record.text, `${path}.text`),
    };
  }

  assertExactKeys(record, IMAGE_BLOCK_KEYS, path);

  return {
    type,
    key,
    alt: expectOptionalString(record.alt, `${path}.alt`),
    url: expectString(record.url, `${path}.url`),
    width: expectOptionalPositiveNumber(record.width, `${path}.width`),
    height: expectOptionalPositiveNumber(record.height, `${path}.height`),
  };
}

function toPortableTextBlock(block: JsonContentBlock) {
  if (block.type === "image") {
    return {
      _key: block.key,
      _type: "image",
      alt: block.alt,
      asset: {
        url: block.url,
        width: block.width,
        height: block.height,
      },
    } satisfies ContentPortableTextImageBlock;
  }

  return {
    _key: block.key,
    _type: "block",
    style: "normal",
    children: [
      {
        _key: `${block.key}-span`,
        _type: "span",
        text: block.text,
        marks: [],
      },
    ],
    markDefs: [],
  } satisfies ContentPortableTextBlock;
}

/** Converts JSON content block records into the rich-text shape used by pages. */
export function parseContentBody(value: unknown, path: string) {
  return expectArray(value, path)
    .map((entry, index) => parseJsonContentBlock(entry, `${path}[${index}]`))
    .map(toPortableTextBlock);
}
