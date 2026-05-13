/**
 * @file apps/web/src/data/standalone-pages.ts
 * @author Guy Romelle Magayano
 * @description Standalone page data parsed from local JSON records.
 */

import {
  type ContentPortableTextBlock,
  type ContentPortableTextImageBlock,
  type ContentTwitterCard,
} from "@web/data/portable-text";
import rawStandalonePagesDataJson from "@web/data/standalone-pages.json";
import { parseContentBody } from "@web/lib/content-body";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectEnum,
  expectOptionalBoolean,
  expectOptionalDateTimeString,
  expectOptionalPositiveNumber,
  expectOptionalString,
  expectPathname,
  expectRecord,
  expectString,
} from "@web/lib/json-data";

const TWITTER_CARDS = ["summary", "summary_large_image"] as const;

export interface StandalonePage {
  slug: string;
  title: string;
  subheading?: string;
  intro?: string;
  updatedAt?: string;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath?: string;
  seoNoFollow?: boolean;
  seoOgTitle?: string;
  seoOgDescription?: string;
  seoOgImage?: string;
  seoOgImageWidth?: number;
  seoOgImageHeight?: number;
  seoOgImageAlt?: string;
  seoTwitterCard?: ContentTwitterCard;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
}

type StandalonePagesData = {
  standalonePages: StandalonePage[];
};

const STANDALONE_PAGES_DATA_KEYS = ["standalonePages"] as const;
const STANDALONE_PAGE_KEYS = [
  "slug",
  "title",
  "subheading",
  "intro",
  "updatedAt",
  "hideFromSitemap",
  "seoNoIndex",
  "seoTitle",
  "seoDescription",
  "seoCanonicalPath",
  "seoNoFollow",
  "seoOgTitle",
  "seoOgDescription",
  "seoOgImage",
  "seoOgImageWidth",
  "seoOgImageHeight",
  "seoOgImageAlt",
  "seoTwitterCard",
  "body",
] as const;

function expectSlug(value: unknown, path: string): string {
  const slug = expectString(value, path);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Invalid local data at "${path}": expected kebab-case slug.`
    );
  }

  return slug;
}

function parseStandalonePage(value: unknown, path: string): StandalonePage {
  const record = expectRecord(value, path);

  assertExactKeys(record, STANDALONE_PAGE_KEYS, path);

  return {
    slug: expectSlug(record.slug, `${path}.slug`),
    title: expectString(record.title, `${path}.title`),
    subheading: expectOptionalString(record.subheading, `${path}.subheading`),
    intro: expectOptionalString(record.intro, `${path}.intro`),
    updatedAt: expectOptionalDateTimeString(
      record.updatedAt,
      `${path}.updatedAt`
    ),
    hideFromSitemap: expectOptionalBoolean(
      record.hideFromSitemap,
      `${path}.hideFromSitemap`
    ),
    seoNoIndex: expectOptionalBoolean(record.seoNoIndex, `${path}.seoNoIndex`),
    seoTitle: expectOptionalString(record.seoTitle, `${path}.seoTitle`),
    seoDescription: expectOptionalString(
      record.seoDescription,
      `${path}.seoDescription`
    ),
    seoCanonicalPath:
      typeof record.seoCanonicalPath === "undefined"
        ? undefined
        : expectPathname(record.seoCanonicalPath, `${path}.seoCanonicalPath`),
    seoNoFollow: expectOptionalBoolean(
      record.seoNoFollow,
      `${path}.seoNoFollow`
    ),
    seoOgTitle: expectOptionalString(record.seoOgTitle, `${path}.seoOgTitle`),
    seoOgDescription: expectOptionalString(
      record.seoOgDescription,
      `${path}.seoOgDescription`
    ),
    seoOgImage: expectOptionalString(record.seoOgImage, `${path}.seoOgImage`),
    seoOgImageWidth: expectOptionalPositiveNumber(
      record.seoOgImageWidth,
      `${path}.seoOgImageWidth`
    ),
    seoOgImageHeight: expectOptionalPositiveNumber(
      record.seoOgImageHeight,
      `${path}.seoOgImageHeight`
    ),
    seoOgImageAlt: expectOptionalString(
      record.seoOgImageAlt,
      `${path}.seoOgImageAlt`
    ),
    seoTwitterCard:
      typeof record.seoTwitterCard === "undefined"
        ? undefined
        : expectEnum(
            record.seoTwitterCard,
            TWITTER_CARDS,
            `${path}.seoTwitterCard`
          ),
    body: parseContentBody(record.body, `${path}.body`),
  };
}

function createStandalonePagesData(value: unknown): StandalonePagesData {
  const path = "data/standalone-pages.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, STANDALONE_PAGES_DATA_KEYS, path);

  const standalonePages = expectArray(
    record.standalonePages,
    `${path}.standalonePages`
  ).map((entry, index) =>
    parseStandalonePage(entry, `${path}.standalonePages[${index}]`)
  );

  assertUniqueValues(
    standalonePages.map((page) => page.slug),
    "standalone page slug",
    `${path}.standalonePages`
  );

  return { standalonePages };
}

const standalonePagesData = createStandalonePagesData(
  rawStandalonePagesDataJson as unknown
);

export const standalonePages: StandalonePage[] =
  standalonePagesData.standalonePages;
