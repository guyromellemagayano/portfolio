/**
 * @file apps/web/src/data/articles.ts
 * @author Guy Romelle Magayano
 * @description Article data parsed from local JSON records.
 */

import rawArticlesDataJson from "@web/data/articles.json";
import {
  type ContentPortableTextBlock,
  type ContentPortableTextImageBlock,
  type ContentTwitterCard,
} from "@web/data/portable-text";
import { parseContentBody } from "@web/lib/content-body";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectDateTimeString,
  expectEnum,
  expectOptionalBoolean,
  expectOptionalPositiveNumber,
  expectOptionalString,
  expectPathname,
  expectRecord,
  expectString,
  expectStringArray,
} from "@web/lib/json-data";

const TWITTER_CARDS = ["summary", "summary_large_image"] as const;

export interface Article {
  title: string;
  badge: string;
  category: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  featured?: boolean;
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
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  body: Array<ContentPortableTextBlock | ContentPortableTextImageBlock>;
}

type ArticlesData = {
  articleCategories: string[];
  articles: Article[];
};

const ARTICLES_DATA_KEYS = ["articleCategories", "articles"] as const;
const ARTICLE_KEYS = [
  "title",
  "badge",
  "category",
  "slug",
  "date",
  "description",
  "tags",
  "featured",
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
  "image",
  "imageWidth",
  "imageHeight",
  "imageAlt",
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

function parseArticle(
  value: unknown,
  categories: readonly string[],
  path: string
): Article {
  const record = expectRecord(value, path);

  assertExactKeys(record, ARTICLE_KEYS, path);

  const category = expectString(record.category, `${path}.category`);

  if (!categories.includes(category)) {
    throw new Error(
      `Invalid local data at "${path}.category": expected a configured article category.`
    );
  }

  return {
    title: expectString(record.title, `${path}.title`),
    badge: expectString(record.badge, `${path}.badge`),
    category,
    slug: expectSlug(record.slug, `${path}.slug`),
    date: expectDateTimeString(record.date, `${path}.date`),
    description: expectString(record.description, `${path}.description`),
    tags: expectStringArray(record.tags, `${path}.tags`),
    featured: expectOptionalBoolean(record.featured, `${path}.featured`),
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
    image: expectOptionalString(record.image, `${path}.image`),
    imageWidth: expectOptionalPositiveNumber(
      record.imageWidth,
      `${path}.imageWidth`
    ),
    imageHeight: expectOptionalPositiveNumber(
      record.imageHeight,
      `${path}.imageHeight`
    ),
    imageAlt: expectOptionalString(record.imageAlt, `${path}.imageAlt`),
    body: parseContentBody(record.body, `${path}.body`),
  };
}

function createArticlesData(value: unknown): ArticlesData {
  const path = "data/articles.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, ARTICLES_DATA_KEYS, path);

  const articleCategories = expectStringArray(
    record.articleCategories,
    `${path}.articleCategories`
  );
  const articleCategoriesWithoutAll = articleCategories.filter(
    (category) => category !== "All"
  );
  const articles = expectArray(record.articles, `${path}.articles`).map(
    (entry, index) =>
      parseArticle(
        entry,
        articleCategoriesWithoutAll,
        `${path}.articles[${index}]`
      )
  );

  assertUniqueValues(
    articleCategories,
    "article category",
    `${path}.articleCategories`
  );
  assertUniqueValues(
    articles.map((article) => article.slug),
    "article slug",
    `${path}.articles`
  );

  return {
    articleCategories,
    articles,
  };
}

const articlesData = createArticlesData(rawArticlesDataJson as unknown);

export const articleCategories: string[] = articlesData.articleCategories;
export const articles: Article[] = articlesData.articles;
