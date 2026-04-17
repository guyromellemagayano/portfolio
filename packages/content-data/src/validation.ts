/**
 * @file packages/content-data/src/validation.ts
 * @author Guy Romelle Magayano
 * @description Runtime validation helpers for local content snapshot integrity.
 */

import type { LocalArticleRecord } from "./articles";
import type { LocalPageRecord } from "./pages";
import type { portfolioSnapshot } from "./portfolio";

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

/** Validates Portfolio snapshot records and cross-reference integrity. */
export function validatePortfolioSnapshot(
  snapshot: typeof portfolioSnapshot
): void {
  const issues: ContentValidationIssue[] = [];

  const collectDuplicates = (values: ReadonlyArray<string>, path: string) => {
    const seen = new Set<string>();

    values.forEach((value, index) => {
      const normalized = normalizeRequiredText(value);

      if (!normalized) {
        issues.push({
          message: "value is required",
          path: `${path}[${index}]`,
        });
        return;
      }

      if (seen.has(normalized)) {
        issues.push({
          message: "value must be unique",
          path: `${path}[${index}]`,
        });
        return;
      }

      seen.add(normalized);
    });
  };

  collectDuplicates(
    snapshot.projects.map((project) => project.slug),
    "portfolioSnapshot.projects.slug"
  );
  collectDuplicates(
    snapshot.speakingAppearances.map((appearance) => appearance.slug),
    "portfolioSnapshot.speakingAppearances.slug"
  );
  collectDuplicates(
    snapshot.useCategories.map((category) => category.slug),
    "portfolioSnapshot.useCategories.slug"
  );
  collectDuplicates(
    snapshot.pages.map((page) => page.slug || "__home__"),
    "portfolioSnapshot.pages.slug"
  );
  collectDuplicates(
    snapshot.showcaseApps.map((app) => app.anchor),
    "portfolioSnapshot.showcaseApps.anchor"
  );
  collectDuplicates(
    snapshot.serviceOfferings.map((service) => service.anchor),
    "portfolioSnapshot.serviceOfferings.anchor"
  );
  collectDuplicates(
    snapshot.bookingPaths.map((path) => path.id),
    "portfolioSnapshot.bookingPaths.id"
  );

  const projectSlugs = new Set(
    snapshot.projects.map((project) => project.slug)
  );
  const speakingSlugs = new Set(
    snapshot.speakingAppearances.map((appearance) => appearance.slug)
  );
  const categorySlugs = new Set(
    snapshot.useCategories.map((category) => category.slug)
  );
  const experienceIds = new Set(
    snapshot.workExperience.map((experience) => experience.id)
  );
  const photoIds = new Set(snapshot.photos.map((photo) => photo.id));
  const socialLinkIds = new Set(
    snapshot.socialLinks.map((socialLink) => socialLink.id)
  );

  snapshot.pages.forEach((page, pageIndex) => {
    const pagePath = `portfolioSnapshot.pages[${pageIndex}]`;

    page.sections.forEach((section, sectionIndex) => {
      const sectionPath = `${pagePath}.sections[${sectionIndex}]`;

      if (section.type === "hero") {
        section.socialLinkIds.forEach((id, idIndex) => {
          if (!socialLinkIds.has(id)) {
            issues.push({
              message: "references an unknown social link",
              path: `${sectionPath}.socialLinkIds[${idIndex}]`,
            });
          }
        });
      }

      if (section.type === "projects") {
        section.projectSlugs.forEach((slug, slugIndex) => {
          if (!projectSlugs.has(slug)) {
            issues.push({
              message: "references an unknown project slug",
              path: `${sectionPath}.projectSlugs[${slugIndex}]`,
            });
          }
        });
      }

      if (section.type === "speaking") {
        section.appearanceSlugs.forEach((slug, slugIndex) => {
          if (!speakingSlugs.has(slug)) {
            issues.push({
              message: "references an unknown speaking appearance slug",
              path: `${sectionPath}.appearanceSlugs[${slugIndex}]`,
            });
          }
        });
      }

      if (section.type === "uses") {
        section.categorySlugs.forEach((slug, slugIndex) => {
          if (!categorySlugs.has(slug)) {
            issues.push({
              message: "references an unknown uses category slug",
              path: `${sectionPath}.categorySlugs[${slugIndex}]`,
            });
          }
        });
      }

      if (section.type === "experience") {
        section.experienceIds.forEach((id, idIndex) => {
          if (!experienceIds.has(id)) {
            issues.push({
              message: "references an unknown work experience id",
              path: `${sectionPath}.experienceIds[${idIndex}]`,
            });
          }
        });
      }

      if (section.type === "photoGallery") {
        section.photoIds.forEach((id, idIndex) => {
          if (!photoIds.has(id)) {
            issues.push({
              message: "references an unknown photo id",
              path: `${sectionPath}.photoIds[${idIndex}]`,
            });
          }
        });
      }
    });
  });

  if (issues.length > 0) {
    const lines = issues
      .map((issue) => `- ${issue.path}: ${issue.message}`)
      .join("\n");

    throw new Error(`Local portfolio snapshot validation failed:\n${lines}`);
  }
}
