/**
 * @file packages/content-data/src/index.ts
 * @author Guy Romelle Magayano
 * @description Public exports for deterministic local content snapshot data and validation helpers.
 */

export type { LocalArticleRecord } from "./articles";
export { articlesSnapshot } from "./articles";
export type { LocalPageRecord } from "./pages";
export { pagesSnapshot } from "./pages";
export { portfolioSnapshot } from "./portfolio";
export { contentSnapshot } from "./snapshot";
export {
  validateArticleSnapshot,
  validatePageSnapshot,
  validatePortfolioSnapshot,
} from "./validation";
