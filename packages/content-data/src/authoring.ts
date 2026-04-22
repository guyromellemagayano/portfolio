/**
 * @file packages/content-data/src/authoring.ts
 * @author Guy Romelle Magayano
 * @description Typed authoring helpers for local content snapshot maintenance.
 */

import type {
  ContentArticleDetail,
  ContentCtaLink,
  ContentPageDetail,
  ContentPortableTextBlock,
  ContentPortfolioCtaListSection,
  ContentPortfolioExperienceSection,
  ContentPortfolioHeroSection,
  ContentPortfolioPage,
  ContentPortfolioPhotoGallerySection,
  ContentPortfolioProjectsSection,
  ContentPortfolioRichTextSection,
  ContentPortfolioSnapshot,
  ContentPortfolioSpeakingSection,
  ContentPortfolioUsesSection,
} from "@portfolio/api-contracts/content";

/** Returns a strongly typed article record for local authoring. */
export function defineArticle(
  article: ContentArticleDetail
): ContentArticleDetail {
  return article;
}

/** Returns a strongly typed standalone page record for local authoring. */
export function definePage(page: ContentPageDetail): ContentPageDetail {
  return page;
}

/** Returns a strongly typed portfolio page document for local authoring. */
export function definePortfolioPage(
  page: ContentPortfolioPage
): ContentPortfolioPage {
  return page;
}

/** Returns a strongly typed portfolio snapshot for local authoring. */
export function definePortfolioSnapshot(
  snapshot: ContentPortfolioSnapshot
): ContentPortfolioSnapshot {
  return snapshot;
}

/** Creates a minimal portable-text paragraph block from plain text. */
export function createPortableTextParagraph(
  key: string,
  text: string
): ContentPortableTextBlock {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-span-1`,
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

/** Creates a hero section referencing a profile and social links. */
export function heroSection(
  profileId: string,
  socialLinkIds: string[]
): ContentPortfolioHeroSection {
  return {
    type: "hero",
    profileId,
    socialLinkIds,
  };
}

/** Creates a rich-text section using plain authored copy. */
export function richTextSection(
  body: string,
  title?: string
): ContentPortfolioRichTextSection {
  return {
    type: "richText",
    title,
    body,
  };
}

/** Creates a projects section referencing project slugs. */
export function projectsSection(
  title: string,
  projectSlugs: string[],
  intro?: string
): ContentPortfolioProjectsSection {
  return {
    type: "projects",
    title,
    intro,
    projectSlugs,
  };
}

/** Creates a speaking section referencing appearance slugs. */
export function speakingSection(
  title: string,
  appearanceSlugs: string[],
  intro?: string
): ContentPortfolioSpeakingSection {
  return {
    type: "speaking",
    title,
    intro,
    appearanceSlugs,
  };
}

/** Creates a uses section referencing category slugs. */
export function usesSection(
  title: string,
  categorySlugs: string[],
  intro?: string
): ContentPortfolioUsesSection {
  return {
    type: "uses",
    title,
    intro,
    categorySlugs,
  };
}

/** Creates an experience section referencing work-experience ids. */
export function experienceSection(
  title: string,
  experienceIds: string[],
  intro?: string
): ContentPortfolioExperienceSection {
  return {
    type: "experience",
    title,
    intro,
    experienceIds,
  };
}

/** Creates a photo-gallery section referencing photo ids. */
export function photoGallerySection(
  photoIds: string[],
  title?: string
): ContentPortfolioPhotoGallerySection {
  return {
    type: "photoGallery",
    title,
    photoIds,
  };
}

/** Creates a CTA-list section from a list of authored links. */
export function ctaListSection(
  title: string,
  ctas: ContentCtaLink[],
  intro?: string
): ContentPortfolioCtaListSection {
  return {
    type: "ctaList",
    title,
    intro,
    ctas,
  };
}
