/**
 * @file apps/web/src/lib/structured-data.ts
 * @author Guy Romelle Magayano
 * @description JSON-LD builders for the static Astro portfolio pages.
 */

import { getProjectPath, type Project } from "@web/data/projects";
import { type Service } from "@web/data/services";
import {
  focusAreas,
  type PageData,
  profile,
  socialLinks,
} from "@web/data/site";
import { DEFAULT_SOCIAL_IMAGE_PATH, SITE_NAME } from "@web/lib/metadata";
import {
  type StructuredData,
  type WebPageMetadata,
} from "@web/lib/metadata.types";
import { type ArticleDetail, type ArticleWithSlug } from "@web/utils/articles";
import { type StandalonePageDetail } from "@web/utils/pages";
import { toAbsoluteSiteUrl } from "@web/utils/site-url";

type BreadcrumbListItem = {
  name: string;
  path: string;
};

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

function getWebsiteIdReference(): StructuredData {
  return {
    "@id": getWebsiteId(),
    "@type": "WebSite",
  };
}

function getWebsiteReference(): StructuredData {
  return {
    "@id": getWebsiteId(),
    "@type": "WebSite",
    name: SITE_NAME,
    url: getPageUrl("/"),
    description: profile.heroIntro,
    genre: "Portfolio",
    publisher: getPersonReference(),
    copyrightHolder: getPersonReference(),
    potentialAction: {
      "@type": "ContactAction",
      name: "Start a professional conversation",
      target: getPageUrl("/contact"),
    },
  };
}

function getPlainEmail(): string | undefined {
  const email = socialLinks.find((link) => link.platform === "email")?.href;

  return email?.replace(/^mailto:/i, "");
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
    isPartOf: getWebsiteIdReference(),
    author: getPersonReference(),
    publisher: getPersonReference(),
    copyrightHolder: getPersonReference(),
    mainEntity: page.slug === "about" ? getPersonReference() : undefined,
    about: getPersonReference(),
  };
}

/** Builds BreadcrumbList JSON-LD for indexable content routes. */
export function buildBreadcrumbListStructuredData(
  items: BreadcrumbListItem[]
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getPageUrl(item.path),
    })),
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
  const email = getPlainEmail();

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
      name: "Product engineering services",
      url: getPageUrl("/capabilities"),
    },
    contactPoint: email
      ? {
          "@type": "ContactPoint",
          contactType: "Client inquiries",
          email,
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        }
      : undefined,
    sameAs,
  };
}

/** Builds service-oriented JSON-LD for the services page. */
export function buildProfessionalServiceStructuredData(
  page: PageData,
  services: Service[]
): StructuredData {
  const servicesUrl = getPageUrl("/capabilities");

  return {
    "@context": "https://schema.org",
    "@id": `${servicesUrl}#professional-service`,
    "@type": "ProfessionalService",
    name: `${profile.name} - Product Engineering Services`,
    url: servicesUrl,
    description: page.seoDescription || page.intro,
    provider: getPersonReference(),
    publisher: getPersonReference(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Product engineering consulting engagements",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        "@id": `${servicesUrl}#offer-${service.id}`,
        name: service.title,
        description: service.description,
        url: `${servicesUrl}#${service.id}`,
        price: service.price,
        priceSpecification: service.priceNote
          ? {
              "@type": "PriceSpecification",
              description: service.priceNote,
            }
          : undefined,
        itemOffered: {
          "@type": "Service",
          "@id": `${servicesUrl}#service-${service.id}`,
          name: service.title,
          description: service.description,
          serviceType: service.title,
          provider: getPersonReference(),
          url: `${servicesUrl}#${service.id}`,
        },
      })),
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Start a conversation",
      target: getPageUrl("/contact"),
    },
    serviceType: services.map((service) => service.title),
    areaServed: "Worldwide",
  };
}

/** Builds contact intent JSON-LD for the contact page. */
export function buildContactPageStructuredData(page: PageData): StructuredData {
  const pageUrl = getPageUrl(page.seoCanonicalPath || "/contact");
  const email = getPlainEmail();

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: page.seoTitle || page.title,
    url: pageUrl,
    description: page.seoDescription || page.intro,
    isPartOf: getWebsiteReference(),
    mainEntity: getPersonReference(),
    about: getPersonReference(),
    potentialAction: {
      "@type": "ContactAction",
      name: "Start a professional conversation",
      target: pageUrl,
    },
    contactPoint: email
      ? {
          "@type": "ContactPoint",
          contactType: "Client inquiries",
          email,
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        }
      : undefined,
  };
}

/** Builds booking intent JSON-LD for the booking page. */
export function buildBookingStructuredData(page: PageData): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seoTitle || page.title,
    url: getPageUrl(page.seoCanonicalPath || "/contact"),
    description: page.seoDescription || page.intro,
    isPartOf: getWebsiteReference(),
    mainEntity: getPersonReference(),
    potentialAction: {
      "@type": "ReserveAction",
      name: "Start a consultation conversation",
      target: getPageUrl("/contact"),
    },
  };
}

/** Builds collection JSON-LD for article and project index pages. */
export function buildCollectionPageStructuredData<
  T extends ArticleWithSlug | Project,
>(page: PageData, items: T[], getItemUrl: (item: T) => string): StructuredData {
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

/** Builds JSON-LD for project detail pages. */
export function buildProjectStructuredData(project: Project): StructuredData {
  const projectUrl = getPageUrl(getProjectPath(project));
  const projectLabel = project.kind === "lab" ? "Lab" : "Case Study";
  const projectFragment = project.kind === "lab" ? "lab" : "case-study";

  return {
    "@context": "https://schema.org",
    "@type": project.kind === "lab" ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${projectUrl}#${projectFragment}`,
    name: `${project.title} ${projectLabel}`,
    headline: project.title,
    url: projectUrl,
    description: project.description,
    author: getPersonReference(),
    publisher: getPersonReference(),
    creator: getPersonReference(),
    isPartOf: getWebsiteReference(),
    about: project.tags,
    keywords: project.tags,
  };
}

/** Builds article JSON-LD for local article detail pages. */
export function buildArticleStructuredData(
  article: ArticleDetail
): StructuredData {
  const articleUrl = getPageUrl(
    article.seoCanonicalPath || `/notes/${article.slug}`
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
    image: getPageUrl(
      article.seoOgImage || article.image || DEFAULT_SOCIAL_IMAGE_PATH
    ),
    keywords: article.tags,
  };
}

/** Builds JSON-LD for locally stored standalone pages. */
export function buildStandalonePageStructuredData(
  page: StandalonePageDetail
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
