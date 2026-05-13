/**
 * @file apps/web/src/data/__tests__/json-backed-data.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for JSON-backed local data module exports.
 */

import { describe, expect, it } from "vitest";

import { clients, workExperience } from "@web/data/clients";
import { useCategories } from "@web/data/uses";

describe("JSON-backed local data modules", () => {
  it("parses client proof points and work experience records", () => {
    expect(clients).toHaveLength(4);
    expect(workExperience[0]).toMatchObject({
      company: "Stack Market Labs",
      current: true,
      startDate: "2023-01-01",
    });
    expect(workExperience.every((entry) => entry.summary.length > 0)).toBe(
      true
    );
  });

  it("parses uses categories with stable item names", () => {
    expect(useCategories.map((category) => category.id)).toEqual([
      "workstation",
      "developer-tooling",
      "productivity",
      "recording",
    ]);
    expect(useCategories.flatMap((category) => category.items)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "16-inch MacBook Pro" }),
        expect.objectContaining({ name: "Playwright" }),
      ])
    );
  });
});
