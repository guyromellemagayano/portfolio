/**
 * @file apps/api/src/modules/content/content.routes.ts
 * @author Guy Romelle Magayano
 * @description Versioned content routes exposed by the API gateway.
 */

import { Router } from "express";

import { GatewayError } from "@api/contracts/errors";
import { sendSuccess } from "@api/contracts/http";
import type { ContentService } from "@api/modules/content/content.service";

/** Creates routes for content retrieval via the configured provider. */
export function createContentRouter(contentService: ContentService): Router {
  const router = Router();

  router.get("/articles", async (request, response, next) => {
    try {
      const articles = await contentService.getArticles();

      request.logger.info("Serving content articles", {
        provider: contentService.providerName,
        count: articles.length,
      });

      return sendSuccess(request, response, articles, {
        meta: {
          provider: contentService.providerName,
          count: articles.length,
          module: "content",
        },
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get("/articles/:slug", async (request, response, next) => {
    try {
      const articleSlug = request.params.slug?.trim();

      if (!articleSlug) {
        throw new GatewayError({
          statusCode: 400,
          code: "CONTENT_ARTICLE_SLUG_REQUIRED",
          message: "Article slug is required.",
        });
      }

      const article = await contentService.getArticleBySlug(articleSlug);

      if (!article) {
        throw new GatewayError({
          statusCode: 404,
          code: "CONTENT_ARTICLE_NOT_FOUND",
          message: "Article not found.",
          details: {
            slug: articleSlug,
          },
        });
      }

      request.logger.info("Serving content article detail", {
        provider: contentService.providerName,
        slug: article.slug,
      });

      return sendSuccess(request, response, article, {
        meta: {
          provider: contentService.providerName,
          slug: article.slug,
          module: "content",
          resource: "article",
        },
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
