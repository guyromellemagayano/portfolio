/**
 * @file apps/api/src/modules/message/message.routes.ts
 * @author Guy Romelle Magayano
 * @description Message demo routes preserving legacy behavior plus versioned envelope responses.
 */

import { Router } from "express";

import { sendSuccess } from "@api/contracts/http";

/** Creates demo message routes. */
export function createMessageRouter(): Router {
  const router = Router();

  router.get("/message/:name", (request, response) => {
    const name = request.params.name;

    request.logger.info("Processing legacy message request", {
      name,
      userAgent: request.get("User-Agent"),
    });

    response.json({
      message: `hello ${name}`,
    });
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
