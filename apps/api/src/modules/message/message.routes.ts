/**
 * @file apps/api/src/modules/message/message.routes.ts
 * @author Guy Romelle Magayano
 * @description Message demo routes with legacy route redirects and versioned envelope responses.
 */

import { Router } from "express";

import { sendSuccess } from "../../contracts/http.js";

/** Creates demo message routes. */
export function createMessageRouter(): Router {
  const router = Router();

  router.get("/message/:name", (request, response) => {
    const name = request.params.name?.trim() ?? "";

    request.logger.info(
      "Redirecting legacy message request to versioned route",
      {
        name,
        userAgent: request.get("User-Agent"),
      }
    );

    return response.redirect(308, `/v1/message/${encodeURIComponent(name)}`);
  });

  router.get("/v1/message/:name", (request, response) => {
    const name = request.params.name;

    request.logger.info("Processing versioned message request", {
      name,
      userAgent: request.get("User-Agent"),
    });

    return sendSuccess(
      request,
      response,
      {
        message: `hello ${name}`,
      },
      {
        meta: {
          module: "message",
        },
      }
    );
  });

  return router;
}
