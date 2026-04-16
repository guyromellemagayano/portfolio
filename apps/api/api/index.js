/**
 * @file apps/api/api/index.js
 * @author Guy Romelle Magayano
 * @description Vercel Bun root function entrypoint for the portfolio API.
 */

import { vercelPortfolioApiHandler } from "../dist/index.js";

export default {
  fetch: vercelPortfolioApiHandler,
};
