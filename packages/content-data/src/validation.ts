/**
 * @file packages/content-data/src/validation.ts
 * @author Guy Romelle Magayano
 * @description Runtime validation helpers for local content snapshot integrity.
 */

import type { LocalArticleRecord } from "./articles";
import type { LocalPageRecord } from "./pages";

type ContentValidationIssue = {
  message: string;
  path: string;
};

/** Normalizes text values for strict required-field validation. */
function normalizeRequiredText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

/** Validates local article snapshot records and throws on first invalid batch. */
export function validateArticleSnapshot(
  records: ReadonlyArray<LocalArticleRecord>
): void {
  const issues: ContentValidationIssue[] = [];
  const slugs = new Set<string>();

  records.forEach((article, index) => {
    const recordPath = `articlesSnapshot[${index}]`;
    const id = normalizeRequiredText(article.id);
    const title = normalizeRequiredText(article.title);
    const slug = normalizeRequiredText(article.slug);
    const publishedAt = normalizeRequiredText(article.publishedAt);

    if (!id) {
      issues.push({ message: "id is required", path: `${recordPath}.id` });
    }

    if (!title) {
      issues.push({
        message: "title is required",
        path: `${recordPath}.title`,
      });
    }

    if (!slug) {
      issues.push({ message: "slug is required", path: `${recordPath}.slug` });
    } else if (slugs.has(slug)) {
      issues.push({
        message: "slug must be unique",
        path: `${recordPath}.slug`,
      });
    } else {
      slugs.add(slug);
    }

    if (!publishedAt) {
      issues.push({
        message: "publishedAt is required",
        path: `${recordPath}.publishedAt`,
      });
    }

    if (!Array.isArray(article.body)) {
      issues.push({
        message: "body must be an array",
        path: `${recordPath}.body`,
      });
    }
  });

  if (issues.length > 0) {
    const lines = issues
      .map((issue) => `- ${issue.path}: ${issue.message}`)
      .join("\n");

    throw new Error(`Local article snapshot validation failed:\n${lines}`);
  }
}

/** Validates local standalone page snapshot records and throws on first invalid batch. */
export function validatePageSnapshot(
  records: ReadonlyArray<LocalPageRecord>
): void {
  const issues: ContentValidationIssue[] = [];
  const slugs = new Set<string>();

  records.forEach((page, index) => {
    const recordPath = `pagesSnapshot[${index}]`;
    const id = normalizeRequiredText(page.id);
    const title = normalizeRequiredText(page.title);
    const slug = normalizeRequiredText(page.slug);

    if (!id) {
      issues.push({ message: "id is required", path: `${recordPath}.id` });
    }

    if (!title) {
      issues.push({
        message: "title is required",
        path: `${recordPath}.title`,
      });
    }

    if (!slug) {
      issues.push({ message: "slug is required", path: `${recordPath}.slug` });
    } else if (slugs.has(slug)) {
      issues.push({
        message: "slug must be unique",
        path: `${recordPath}.slug`,
      });
    } else {
      slugs.add(slug);
    }

    if (!Array.isArray(page.body)) {
      issues.push({
        message: "body must be an array",
        path: `${recordPath}.body`,
      });
    }
  });

  if (issues.length > 0) {
    const lines = issues
      .map((issue) => `- ${issue.path}: ${issue.message}`)
      .join("\n");

    throw new Error(`Local page snapshot validation failed:\n${lines}`);
  }
}
