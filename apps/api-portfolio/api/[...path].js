/**
 * @file apps/api-portfolio/api/[...path].js
 * @author Guy Romelle Magayano
 * @description Vercel Bun catch-all function entrypoint for the portfolio API.
 */

import { vercelPortfolioApiHandler } from "../dist/index.js";

export default {
  fetch: vercelPortfolioApiHandler,
};
