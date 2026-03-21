/**
 * @file packages/content-data/src/index.ts
 * @author Guy Romelle Magayano
 * @description Public exports for deterministic local content snapshot data and validation helpers.
 */

export { articlesSnapshot } from "./articles";
export type { LocalArticleRecord } from "./articles";
export { pagesSnapshot } from "./pages";
export type { LocalPageRecord } from "./pages";
export { contentSnapshot } from "./snapshot";
export { portfolioSnapshot } from "./portfolio";
export {
  validateArticleSnapshot,
  validatePageSnapshot,
  validatePortfolioSnapshot,
} from "./validation";
