/**
 * @file apps/api/src/modules/content/content.routes.ts
 * @author Guy Romelle Magayano
 * @description Versioned content routes exposed by the API gateway.
 */

import { Router } from "express";

import { GatewayError } from "../../contracts/errors.js";
import { sendSuccess } from "../../contracts/http.js";
import type { ContentService } from "./content.service.js";

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

  router.get("/pages", async (request, response, next) => {
    try {
      const pages = await contentService.getPages();

      request.logger.info("Serving content pages", {
        provider: contentService.providerName,
        count: pages.length,
      });

      return sendSuccess(request, response, pages, {
        meta: {
          provider: contentService.providerName,
          count: pages.length,
          module: "content",
          resource: "page",
        },
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get("/pages/:slug", async (request, response, next) => {
    try {
      const pageSlug = request.params.slug?.trim();

      if (!pageSlug) {
        throw new GatewayError({
          statusCode: 400,
          code: "CONTENT_PAGE_SLUG_REQUIRED",
          message: "Page slug is required.",
        });
      }

      const page = await contentService.getPageBySlug(pageSlug);

      if (!page) {
        throw new GatewayError({
          statusCode: 404,
          code: "CONTENT_PAGE_NOT_FOUND",
          message: "Page not found.",
          details: {
            slug: pageSlug,
          },
        });
      }

      request.logger.info("Serving content page detail", {
        provider: contentService.providerName,
        slug: page.slug,
      });

      return sendSuccess(request, response, page, {
        meta: {
          provider: contentService.providerName,
          slug: page.slug,
          module: "content",
          resource: "page",
        },
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
