/**
 * @file apps/web/src/portfolio-api/portfolio.ts
 * @author Guy Romelle Magayano
 * @description Local portfolio snapshot accessor retained behind the existing web module path.
 */

import { cache } from "react";

import { contentSnapshot } from "@portfolio/content-data";

/** Returns a cloned local portfolio snapshot for brochure rendering in the web app. */
export const getPortfolioSnapshot = cache(
  async function getPortfolioSnapshot() {
    return globalThis.structuredClone(contentSnapshot.portfolio);
  }
);
