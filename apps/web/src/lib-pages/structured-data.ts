/**
 * @file apps/web/src/lib-pages/structured-data.ts
 * @author Guy Romelle Magayano
 * @description JSON-LD builders for the static Astro portfolio pages.
 */

import type { Project } from "@web/data/projects";
import type { Service } from "@web/data/services";
import {
  focusAreas,
  type PageData,
  profile,
  socialLinks,
} from "@web/data/site";
import type { StructuredData, WebPageMetadata } from "@web/lib/metadata.types";
import type { ArticleDetail, ArticleWithSlug } from "@web/utils/articles";
import type { CmsPageDetail } from "@web/utils/pages";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

function getSiteUrl(): string {
  return (
    toAbsoluteSiteUrl("/") ?? "https://www.guyromellemagayano.com/"
  ).replace(/\/$/, "");
}

function getPersonId(): string {
  return `${getSiteUrl()}/#person`;
}

function getWebsiteId(): string {
  return `${getSiteUrl()}/#website`;
}

function getPageUrl(path: string): string {
  const normalizedPath =
    path.startsWith("/") || /^https?:\/\//i.test(path) ? path : `/${path}`;

  return (
    toAbsoluteSiteUrl(normalizedPath) ?? `${getSiteUrl()}${normalizedPath}`
  );
}

function getPersonReference(): StructuredData {
  return {
    "@id": getPersonId(),
    "@type": "Person",
    name: profile.name,
    url: getSiteUrl(),
  };
}

function getWebsiteReference(): StructuredData {
  return {
    "@id": getWebsiteId(),
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    alternateName: profile.name,
    url: getSiteUrl(),
    description: profile.heroIntro,
    genre: "Portfolio",
    publisher: getPersonReference(),
    copyrightHolder: getPersonReference(),
    potentialAction: {
      "@type": "ContactAction",
      name: "Request product engineering services",
      target: getPageUrl("/hire"),
    },
  };
}

/** Appends JSON-LD records to existing page metadata without overwriting route metadata. */
export function appendStructuredData(
  metadata: WebPageMetadata,
  ...entries: StructuredData[]
): WebPageMetadata {
  const existing = metadata.structuredData
    ? Array.isArray(metadata.structuredData)
      ? metadata.structuredData
      : [metadata.structuredData]
    : [];

  return {
    ...metadata,
    structuredData: [...existing, ...entries],
  };
}

/** Builds a reusable WebPage JSON-LD record for brochure pages. */
export function buildWebPageStructuredData(page: PageData): StructuredData {
  const pagePath = page.seoCanonicalPath || (page.slug ? `/${page.slug}` : "/");

  return {
    "@context": "https://schema.org",
    "@id": `${getPageUrl(pagePath)}#webpage`,
    "@type": page.slug === "about" ? ["ProfilePage", "AboutPage"] : "WebPage",
    name: page.seoTitle || page.title,
    url: getPageUrl(pagePath),
    description: page.seoDescription || page.intro || page.title,
    isPartOf: getWebsiteReference(),
    author: getPersonReference(),
    publisher: getPersonReference(),
    copyrightHolder: getPersonReference(),
    mainEntity: page.slug === "about" ? getPersonReference() : undefined,
    about: getPersonReference(),
  };
}

/** Builds the site-level WebSite JSON-LD record. */
export function buildWebsiteStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    ...getWebsiteReference(),
    description: profile.heroIntro,
    inLanguage: "en",
  };
}

/** Builds the home page Person JSON-LD record. */
export function buildPersonStructuredData(): StructuredData {
  const sameAs = socialLinks
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));
  const email = socialLinks.find((link) => link.platform === "email")?.href;

  return {
    "@context": "https://schema.org",
    "@id": getPersonId(),
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: getSiteUrl(),
    email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    description: profile.heroIntro,
    knowsAbout: focusAreas,
    mainEntityOfPage: {
      "@id": `${getSiteUrl()}/#webpage`,
      "@type": "WebPage",
    },
    makesOffer: {
      "@type": "OfferCatalog",
      name: "Product engineering consulting services",
      url: getPageUrl("/services"),
    },
    sameAs,
  };
}

/** Builds service-oriented JSON-LD for the services page. */
export function buildProfessionalServiceStructuredData(
  page: PageData,
  services: Service[]
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${profile.name} - Product Engineering Services`,
    url: getPageUrl(page.seoCanonicalPath || "/services"),
    description: page.seoDescription || page.intro,
    provider: getPersonReference(),
    publisher: getPersonReference(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Product engineering consulting engagements",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        name: service.title,
        description: service.description,
        url: getPageUrl(service.href),
        price: service.price,
        priceSpecification: service.priceNote
          ? {
              "@type": "PriceSpecification",
              description: service.priceNote,
            }
          : undefined,
      })),
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Request services",
      target: getPageUrl("/hire"),
    },
    serviceType: services.map((service) => service.title),
    areaServed: "Worldwide",
  };
}

/** Builds booking intent JSON-LD for the booking page. */
export function buildBookingStructuredData(page: PageData): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seoTitle || page.title,
    url: getPageUrl(page.seoCanonicalPath || "/book"),
    description: page.seoDescription || page.intro,
    isPartOf: getWebsiteReference(),
    mainEntity: getPersonReference(),
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a consultation",
      target: getPageUrl("/book"),
    },
  };
}

/** Builds collection JSON-LD for article and project index pages. */
export function buildCollectionPageStructuredData(
  page: PageData,
  items: Array<ArticleWithSlug | Project>,
  getItemUrl: (item: ArticleWithSlug | Project) => string
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.seoTitle || page.title,
    url: getPageUrl(page.seoCanonicalPath || `/${page.slug}`),
    description: page.seoDescription || page.intro,
    isPartOf: getWebsiteReference(),
    author: getPersonReference(),
    publisher: getPersonReference(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: getPageUrl(getItemUrl(item)),
      })),
    },
  };
}

/** Builds article JSON-LD for local article detail pages. */
export function buildArticleStructuredData(
  article: ArticleDetail
): StructuredData {
  const articleUrl = getPageUrl(
    article.seoCanonicalPath || `/articles/${article.slug}`
  );

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription || article.description,
    datePublished: article.date,
    dateModified: article.date,
    url: articleUrl,
    author: getPersonReference(),
    publisher: getPersonReference(),
    copyrightHolder: getPersonReference(),
    isPartOf: getWebsiteReference(),
    image: article.image ? getPageUrl(article.image) : undefined,
    keywords: article.tags,
  };
}

/** Builds JSON-LD for locally stored standalone pages. */
export function buildStandalonePageStructuredData(
  page: CmsPageDetail
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seoTitle || page.title,
    url: getPageUrl(page.seoCanonicalPath || `/${page.slug}`),
    description: page.seoDescription || page.intro || page.title,
    dateModified: page.updatedAt,
    isPartOf: getWebsiteReference(),
    author: getPersonReference(),
    publisher: getPersonReference(),
    copyrightHolder: getPersonReference(),
    about: getPersonReference(),
  };
}
