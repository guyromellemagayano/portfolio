/**
 * @file apps/api/src/providers/content/content.provider.ts
 * @author Guy Romelle Magayano
 * @description Provider contract for content integrations.
 */

import type {
  GatewayArticle,
  GatewayArticleDetail,
} from "@api/contracts/articles";
import type { GatewayPage, GatewayPageDetail } from "@api/contracts/pages";

export type ContentProviderName = "sanity" | "static";

export interface ContentProvider {
  readonly name: ContentProviderName;
  getArticles(): Promise<GatewayArticle[]>;
  getArticleBySlug(slug: string): Promise<GatewayArticleDetail | null>;
  getPages(): Promise<GatewayPage[]>;
  getPageBySlug(slug: string): Promise<GatewayPageDetail | null>;
}
