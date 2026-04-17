/**
 * @file apps/api/src/modules/portfolio/portfolio.routes.ts
 * @author Guy Romelle Magayano
 * @description Versioned portfolio snapshot routes exposed by the portfolio API.
 */

import { Elysia, t } from "elysia";

import { PORTFOLIO_ROUTE } from "@portfolio/api-contracts/content";
import {
  API_ERROR_CODES,
  API_ERROR_MESSAGES,
} from "@portfolio/api-contracts/http";
import type { ILogger } from "@portfolio/logger";

import { ApiError } from "../../contracts/errors.js";
import { sendSuccess } from "../../contracts/http.js";
import type { ContentService } from "../content/content.service.js";

const responseMetaSchema = t.Object(
  {
    correlationId: t.String(),
    requestId: t.String(),
    timestamp: t.String(),
  },
  {
    additionalProperties: true,
  }
);

const successEnvelopeSchema = t.Object({
  success: t.Literal(true),
  data: t.Any(),
  meta: responseMetaSchema,
});

const errorEnvelopeSchema = t.Object({
  success: t.Literal(false),
  error: t.Object({
    code: t.String(),
    message: t.String(),
    details: t.Optional(t.Any()),
  }),
  meta: responseMetaSchema,
});

const PORTFOLIO_CACHE_CONTROL_HEADER = "cache-control";
const PORTFOLIO_CACHE_CONTROL_VALUE =
  "public, s-maxage=300, stale-while-revalidate=3600";

/** Creates routes for portfolio snapshot retrieval via the configured provider. */
export function createPortfolioRouter(contentService: ContentService) {
  return new Elysia({
    name: "api-portfolio-routes",
  }).get(
    PORTFOLIO_ROUTE,
    async (context) => {
      const requestLogger =
        "logger" in context ? (context as { logger?: ILogger }).logger : null;
      const snapshot = await contentService.getPortfolioSnapshot();

      if (!snapshot) {
        throw new ApiError({
          statusCode: 404,
          code: API_ERROR_CODES.PORTFOLIO_NOT_FOUND,
          message: API_ERROR_MESSAGES.PORTFOLIO_NOT_FOUND,
        });
      }

      requestLogger?.info("Serving portfolio snapshot", {
        provider: contentService.providerName,
        pageCount: snapshot.pages.length,
      });
      context.set.headers[PORTFOLIO_CACHE_CONTROL_HEADER] =
        PORTFOLIO_CACHE_CONTROL_VALUE;

      return sendSuccess(context, snapshot, {
        meta: {
          provider: contentService.providerName,
          module: "portfolio",
          resource: "snapshot",
          pageCount: snapshot.pages.length,
        },
      });
    },
    {
      detail: {
        tags: ["Portfolio"],
        summary: "Get portfolio snapshot",
        description:
          "Returns the canonical portfolio snapshot used to render brochure pages.",
      },
      response: {
        200: successEnvelopeSchema,
        404: errorEnvelopeSchema,
        500: errorEnvelopeSchema,
      },
    }
  );
}
