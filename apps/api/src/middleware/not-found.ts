/**
 * @file apps/api/src/middleware/not-found.ts
 * @author Guy Romelle Magayano
 * @description Catch-all handler for unknown API routes.
 */

import type { RequestHandler } from "express";

import { sendError } from "../contracts/http.js";

export const notFoundHandler: RequestHandler = (request, response) => {
  return sendError(request, response, {
    statusCode: 404,
    code: "ROUTE_NOT_FOUND",
    message: `No route matches ${request.method} ${request.originalUrl}.`,
  });
};
