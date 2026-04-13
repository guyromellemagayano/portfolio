/**
 * @file packages/api-contracts/src/content/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Portfolio-style content contracts designed for headless CMS backends (including Django/Wagtail).
 */

/** Canonical social platform names used in profile/footer social links. */
export type ContentSocialPlatform =
  | "github"
  | "instagram"
  | "linkedin"
  | "x"
  | "youtube"
  | "email"
  | "website";

/** Canonical status values for publish workflow parity with CMS backends. */
export type ContentPublishStatus = "draft" | "published" | "archived";

/** Canonical image asset shape shared by portfolio entities and sections. */
export type ContentImageAsset = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

/** Canonical call-to-action link shape used across sections. */
export type ContentCtaLink = {
  label: string;
  href: string;
  target?: "_self" | "_blank";
  rel?: string;
};

/** Canonical social link shape shared by profile, about, and footer areas. */
export type ContentSocialLink = {
  id: string;
  platform: ContentSocialPlatform;
  label: string;
  href: string;
  order: number;
};

/** Canonical navigation item shape for top-level site navigation. */
export type ContentNavigationItem = {
  id: string;
  label: string;
  href: string;
  order: number;
  showInHeader: boolean;
  showInFooter: boolean;
};

/** Canonical profile record used by home/about style pages. */
export type ContentProfile = {
  id: string;
  name: string;
  role: string;
  location?: string;
  heroTitle: string;
  heroIntro: string;
  avatar?: ContentImageAsset;
  status: ContentPublishStatus;
};

/** Canonical work experience record for resume timeline sections. */
export type ContentWorkExperience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrentRole?: boolean;
  summary?: string;
  link?: ContentCtaLink;
  logo?: ContentImageAsset;
  order: number;
  status: ContentPublishStatus;
};

/** Canonical project record for cards and project collection pages. */
export type ContentProject = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description?: string;
  website?: ContentCtaLink;
  repository?: ContentCtaLink;
  tags: string[];
  featured?: boolean;
  logo?: ContentImageAsset;
  order: number;
  status: ContentPublishStatus;
};

/** Canonical speaking appearance record for conference/podcast style sections. */
export type ContentSpeakingAppearance = {
  id: string;
  slug: string;
  title: string;
  event: string;
  category: "conference" | "podcast" | "panel" | "workshop" | "interview";
  date: string;
  location?: string;
  summary?: string;
  cta?: ContentCtaLink;
  featured?: boolean;
  order: number;
  status: ContentPublishStatus;
};

/** Canonical "uses" list item record grouped by category. */
export type ContentUseItem = {
  id: string;
  name: string;
  summary: string;
  link?: ContentCtaLink;
  order: number;
};

/** Canonical "uses" category record for grouped recommendation sections. */
export type ContentUseCategory = {
  id: string;
  slug: string;
  title: string;
  intro?: string;
  items: ContentUseItem[];
  order: number;
  status: ContentPublishStatus;
};

/** Canonical photo record for gallery sections. */
export type ContentPhoto = {
  id: string;
  image: ContentImageAsset;
  order: number;
  status: ContentPublishStatus;
};

/** Portfolio hero section containing profile headline, intro, and social links. */
export type ContentPortfolioHeroSection = {
  type: "hero";
  profileId: string;
  socialLinkIds: string[];
};

/** Portfolio section for markdown/rich intro body content. */
export type ContentPortfolioRichTextSection = {
  type: "richText";
  title?: string;
  body: string;
};

/** Portfolio section for referenced project cards. */
export type ContentPortfolioProjectsSection = {
  type: "projects";
  title: string;
  intro?: string;
  projectSlugs: string[];
};

/** Portfolio section for referenced speaking appearances. */
export type ContentPortfolioSpeakingSection = {
  type: "speaking";
  title: string;
  intro?: string;
  appearanceSlugs: string[];
};

/** Portfolio section for grouped use-category recommendations. */
export type ContentPortfolioUsesSection = {
  type: "uses";
  title: string;
  intro?: string;
  categorySlugs: string[];
};

/** Portfolio section for resume/work experience timeline rows. */
export type ContentPortfolioExperienceSection = {
  type: "experience";
  title: string;
  intro?: string;
  experienceIds: string[];
};

/** Portfolio section for a photo gallery strip/grid. */
export type ContentPortfolioPhotoGallerySection = {
  type: "photoGallery";
  title?: string;
  photoIds: string[];
};

/** Portfolio section for CTA list blocks (newsletter/contact/etc). */
export type ContentPortfolioCtaListSection = {
  type: "ctaList";
  title: string;
  intro?: string;
  ctas: ContentCtaLink[];
};

/** Portfolio page section union aligned with Wagtail StreamField-style blocks. */
export type ContentPortfolioSection =
  | ContentPortfolioHeroSection
  | ContentPortfolioRichTextSection
  | ContentPortfolioProjectsSection
  | ContentPortfolioSpeakingSection
  | ContentPortfolioUsesSection
  | ContentPortfolioExperienceSection
  | ContentPortfolioPhotoGallerySection
  | ContentPortfolioCtaListSection;

/** Canonical page templates for Portfolio-style routes. */
export type ContentPortfolioPageTemplate =
  | "home"
  | "about"
  | "articles"
  | "projects"
  | "speaking"
  | "uses"
  | "contact";

/** Canonical Portfolio page document shape for a custom CMS. */
export type ContentPortfolioPage = {
  id: string;
  slug: string;
  title: string;
  intro?: string;
  template: ContentPortfolioPageTemplate;
  sections: ContentPortfolioSection[];
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalPath?: string;
  hideFromSitemap?: boolean;
  seoNoIndex?: boolean;
  status: ContentPublishStatus;
  publishedAt?: string;
  updatedAt: string;
};

/** Canonical site-level Portfolio snapshot for local/dev CMS parity. */
export type ContentPortfolioSnapshot = {
  schemaVersion: "1.0";
  profile: ContentProfile;
  navigation: ContentNavigationItem[];
  socialLinks: ContentSocialLink[];
  pages: ContentPortfolioPage[];
  projects: ContentProject[];
  speakingAppearances: ContentSpeakingAppearance[];
  useCategories: ContentUseCategory[];
  workExperience: ContentWorkExperience[];
  photos: ContentPhoto[];
};
