/**
 * @file apps/api-portfolio/src/providers/content/content.provider.ts
 * @author Guy Romelle Magayano
 * @description Provider contract for content integrations.
 */

import type {
  ApiArticle,
  ApiArticleDetail,
} from "../../contracts/articles.js";
import type { ApiPage, ApiPageDetail } from "../../contracts/pages.js";

export type ContentProviderName = "local" | "static";

export interface ContentProvider {
  readonly name: ContentProviderName;
  getArticles(): Promise<ApiArticle[]>;
  getArticleBySlug(slug: string): Promise<ApiArticleDetail | null>;
  getPages(): Promise<ApiPage[]>;
  getPageBySlug(slug: string): Promise<ApiPageDetail | null>;
}
