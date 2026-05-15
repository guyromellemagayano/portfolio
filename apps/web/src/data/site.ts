/**
 * @file apps/web/src/data/site.ts
 * @author Guy Romelle Magayano
 * @description Core profile, page, and shell data parsed from local JSON records.
 */

import rawSiteDataJson from "@web/data/site.json";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectBoolean,
  expectEnum,
  expectHref,
  expectOptionalBoolean,
  expectOptionalString,
  expectPathname,
  expectRecord,
  expectString,
  expectStringArray,
} from "@web/lib/json-data";

const FOOTER_GROUPS = ["primary", "reference"] as const;
const SOCIAL_PLATFORMS = [
  "email",
  "github",
  "instagram",
  "linkedin",
  "website",
  "x",
] as const;
const PAGE_PATHWAY_KEYS = [
  "about",
  "capabilities",
  "labs",
  "notes",
  "work",
] as const;

type FooterGroup = (typeof FOOTER_GROUPS)[number];
type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
type PagePathwayKey = (typeof PAGE_PATHWAY_KEYS)[number];

export interface PageData {
  slug: string;
  subheading: string;
  title: string;
  intro: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath: string;
  seoNoIndex?: boolean;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  heroTitle: string;
  heroIntro: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  showInHeader: boolean;
  showInFooter: boolean;
  footerGroup?: FooterGroup;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface BuildStep {
  id: string;
  title: string;
  detail: string;
}

export interface ClientOutcome {
  id: string;
  title: string;
  detail: string;
}

export interface SitePathway {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

type SiteData = {
  profile: Profile;
  navigationLinks: NavigationLink[];
  socialLinks: SocialLink[];
  focusAreas: string[];
  foundationCapabilities: string[];
  clientOutcomes: ClientOutcome[];
  operatingPrinciples: string[];
  buildSteps: BuildStep[];
  homePathways: SitePathway[];
  pagePathways: Record<PagePathwayKey, SitePathway[]>;
  pages: PageData[];
};

const SITE_DATA_KEYS = [
  "profile",
  "navigationLinks",
  "socialLinks",
  "focusAreas",
  "foundationCapabilities",
  "clientOutcomes",
  "operatingPrinciples",
  "buildSteps",
  "homePathways",
  "pagePathways",
  "pages",
] as const;
const PROFILE_KEYS = [
  "name",
  "role",
  "location",
  "heroTitle",
  "heroIntro",
] as const;
const NAVIGATION_LINK_KEYS = [
  "label",
  "href",
  "showInHeader",
  "showInFooter",
  "footerGroup",
] as const;
const SOCIAL_LINK_KEYS = ["id", "platform", "label", "href"] as const;
const CLIENT_OUTCOME_KEYS = ["id", "title", "detail"] as const;
const BUILD_STEP_KEYS = ["id", "title", "detail"] as const;
const SITE_PATHWAY_KEYS = [
  "id",
  "title",
  "description",
  "href",
  "cta",
] as const;
const PAGE_KEYS = [
  "slug",
  "subheading",
  "title",
  "intro",
  "seoTitle",
  "seoDescription",
  "seoCanonicalPath",
  "seoNoIndex",
] as const;

function parseProfile(value: unknown, path: string): Profile {
  const record = expectRecord(value, path);

  assertExactKeys(record, PROFILE_KEYS, path);

  return {
    name: expectString(record.name, `${path}.name`),
    role: expectString(record.role, `${path}.role`),
    location: expectString(record.location, `${path}.location`),
    heroTitle: expectString(record.heroTitle, `${path}.heroTitle`),
    heroIntro: expectString(record.heroIntro, `${path}.heroIntro`),
  };
}

function parseNavigationLink(value: unknown, path: string): NavigationLink {
  const record = expectRecord(value, path);

  assertExactKeys(record, NAVIGATION_LINK_KEYS, path);

  return {
    label: expectString(record.label, `${path}.label`),
    href: expectPathname(record.href, `${path}.href`),
    showInHeader: expectBoolean(record.showInHeader, `${path}.showInHeader`),
    showInFooter: expectBoolean(record.showInFooter, `${path}.showInFooter`),
    footerGroup:
      typeof record.footerGroup === "undefined"
        ? undefined
        : expectEnum(record.footerGroup, FOOTER_GROUPS, `${path}.footerGroup`),
  };
}

function parseSocialLink(value: unknown, path: string): SocialLink {
  const record = expectRecord(value, path);

  assertExactKeys(record, SOCIAL_LINK_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    platform: expectEnum(record.platform, SOCIAL_PLATFORMS, `${path}.platform`),
    label: expectString(record.label, `${path}.label`),
    href: expectHref(record.href, `${path}.href`),
  };
}

function parseClientOutcome(value: unknown, path: string): ClientOutcome {
  const record = expectRecord(value, path);

  assertExactKeys(record, CLIENT_OUTCOME_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    detail: expectString(record.detail, `${path}.detail`),
  };
}

function parseBuildStep(value: unknown, path: string): BuildStep {
  const record = expectRecord(value, path);

  assertExactKeys(record, BUILD_STEP_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    detail: expectString(record.detail, `${path}.detail`),
  };
}

function parseSitePathway(value: unknown, path: string): SitePathway {
  const record = expectRecord(value, path);

  assertExactKeys(record, SITE_PATHWAY_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    description: expectString(record.description, `${path}.description`),
    href: expectPathname(record.href, `${path}.href`),
    cta: expectString(record.cta, `${path}.cta`),
  };
}

function parsePageData(value: unknown, path: string): PageData {
  const record = expectRecord(value, path);

  assertExactKeys(record, PAGE_KEYS, path);

  return {
    slug: expectString(record.slug, `${path}.slug`, { allowEmpty: true }),
    subheading: expectString(record.subheading, `${path}.subheading`),
    title: expectString(record.title, `${path}.title`),
    intro: expectString(record.intro, `${path}.intro`),
    seoTitle: expectOptionalString(record.seoTitle, `${path}.seoTitle`),
    seoDescription: expectOptionalString(
      record.seoDescription,
      `${path}.seoDescription`
    ),
    seoCanonicalPath: expectPathname(
      record.seoCanonicalPath,
      `${path}.seoCanonicalPath`
    ),
    seoNoIndex: expectOptionalBoolean(record.seoNoIndex, `${path}.seoNoIndex`),
  };
}

function parsePathwayGroup(value: unknown, path: string): SitePathway[] {
  return expectArray(value, path).map((entry, index) =>
    parseSitePathway(entry, `${path}[${index}]`)
  );
}

function createSiteData(value: unknown): SiteData {
  const path = "data/site.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, SITE_DATA_KEYS, path);

  const profile = parseProfile(record.profile, `${path}.profile`);
  const navigationLinks = expectArray(
    record.navigationLinks,
    `${path}.navigationLinks`
  ).map((entry, index) =>
    parseNavigationLink(entry, `${path}.navigationLinks[${index}]`)
  );
  const socialLinks = expectArray(
    record.socialLinks,
    `${path}.socialLinks`
  ).map((entry, index) =>
    parseSocialLink(entry, `${path}.socialLinks[${index}]`)
  );
  const focusAreas = expectStringArray(record.focusAreas, `${path}.focusAreas`);
  const foundationCapabilities = expectStringArray(
    record.foundationCapabilities,
    `${path}.foundationCapabilities`
  );
  const clientOutcomes = expectArray(
    record.clientOutcomes,
    `${path}.clientOutcomes`
  ).map((entry, index) =>
    parseClientOutcome(entry, `${path}.clientOutcomes[${index}]`)
  );
  const operatingPrinciples = expectStringArray(
    record.operatingPrinciples,
    `${path}.operatingPrinciples`
  );
  const buildSteps = expectArray(record.buildSteps, `${path}.buildSteps`).map(
    (entry, index) => parseBuildStep(entry, `${path}.buildSteps[${index}]`)
  );
  const homePathways = parsePathwayGroup(
    record.homePathways,
    `${path}.homePathways`
  );
  const pagePathwaysRecord = expectRecord(
    record.pagePathways,
    `${path}.pagePathways`
  );

  assertExactKeys(
    pagePathwaysRecord,
    PAGE_PATHWAY_KEYS,
    `${path}.pagePathways`
  );

  const pagePathways: Record<PagePathwayKey, SitePathway[]> = {
    about: parsePathwayGroup(
      pagePathwaysRecord.about,
      `${path}.pagePathways.about`
    ),
    capabilities: parsePathwayGroup(
      pagePathwaysRecord.capabilities,
      `${path}.pagePathways.capabilities`
    ),
    labs: parsePathwayGroup(
      pagePathwaysRecord.labs,
      `${path}.pagePathways.labs`
    ),
    notes: parsePathwayGroup(
      pagePathwaysRecord.notes,
      `${path}.pagePathways.notes`
    ),
    work: parsePathwayGroup(
      pagePathwaysRecord.work,
      `${path}.pagePathways.work`
    ),
  };
  const pages = expectArray(record.pages, `${path}.pages`).map((entry, index) =>
    parsePageData(entry, `${path}.pages[${index}]`)
  );

  assertUniqueValues(
    socialLinks.map((link) => link.id),
    "social link id",
    `${path}.socialLinks`
  );
  assertUniqueValues(
    socialLinks.map((link) => link.platform),
    "social platform",
    `${path}.socialLinks`
  );
  assertUniqueValues(
    clientOutcomes.map((outcome) => outcome.id),
    "client outcome id",
    `${path}.clientOutcomes`
  );
  assertUniqueValues(
    buildSteps.map((step) => step.id),
    "build step id",
    `${path}.buildSteps`
  );
  assertUniqueValues(
    homePathways.map((pathway) => pathway.id),
    "home pathway id",
    `${path}.homePathways`
  );
  for (const pathwayKey of PAGE_PATHWAY_KEYS) {
    assertUniqueValues(
      pagePathways[pathwayKey].map((pathway) => pathway.id),
      `${pathwayKey} pathway id`,
      `${path}.pagePathways.${pathwayKey}`
    );
  }
  assertUniqueValues(
    pages.map((page) => page.slug),
    "page slug",
    `${path}.pages`
  );

  return {
    profile,
    navigationLinks,
    socialLinks,
    focusAreas,
    foundationCapabilities,
    clientOutcomes,
    operatingPrinciples,
    buildSteps,
    homePathways,
    pagePathways,
    pages,
  };
}

const siteData = createSiteData(rawSiteDataJson as unknown);

export const profile: Profile = siteData.profile;
export const navigationLinks: NavigationLink[] = siteData.navigationLinks;
export const socialLinks: SocialLink[] = siteData.socialLinks;
export const focusAreas: string[] = siteData.focusAreas;
export const foundationCapabilities: string[] = siteData.foundationCapabilities;
export const clientOutcomes: ClientOutcome[] = siteData.clientOutcomes;
export const operatingPrinciples: string[] = siteData.operatingPrinciples;
export const buildSteps: BuildStep[] = siteData.buildSteps;
export const homePathways: SitePathway[] = siteData.homePathways;
export const pagePathways: Record<PagePathwayKey, SitePathway[]> =
  siteData.pagePathways;
export const pages: PageData[] = siteData.pages;

export function getPage(slug: string): PageData {
  const normalizedSlug = slug.trim();
  const page = pages.find((entry) => entry.slug === normalizedSlug);

  if (!page) {
    throw new Error(
      `Page data not found for slug "${normalizedSlug || "home"}".`
    );
  }

  return page;
}
