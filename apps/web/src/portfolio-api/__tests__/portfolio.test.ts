/**
 * @file apps/web/src/portfolio-api/__tests__/portfolio.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for the local portfolio snapshot accessor.
 */

import { describe, expect, it } from "vitest";

import { contentSnapshot } from "@portfolio/content-data";

import { getPortfolioSnapshot } from "@web/portfolio-api/portfolio";

describe("portfolio snapshot local accessor", () => {
  it("returns the canonical local portfolio snapshot payload", async () => {
    const snapshot = await getPortfolioSnapshot();

    expect(snapshot).toEqual(contentSnapshot.portfolio);
  });

  it("returns a clone so callers cannot mutate the canonical content snapshot", async () => {
    const snapshot = await getPortfolioSnapshot();

    snapshot.profile.name = "Mutated";

    expect(contentSnapshot.portfolio.profile.name).toBe("Guy Romelle Magayano");
  });
});
