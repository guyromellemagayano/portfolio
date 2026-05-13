/**
 * @file apps/web/src/data/__tests__/json-backed-data.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for JSON-backed local data module exports.
 */

import { describe, expect, it } from "vitest";

import { clients, workExperience } from "@web/data/clients";
import { getProjectPath, labProjects, workProjects } from "@web/data/projects";
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

  it("parses projects and preserves derived project route helpers", () => {
    expect(workProjects.map((project) => project.kind)).toEqual(
      Array.from({ length: 5 }, () => "work")
    );
    expect(labProjects.map((project) => project.kind)).toEqual(
      Array.from({ length: 5 }, () => "lab")
    );
    expect(getProjectPath(labProjects[0])).toBe("/labs/guy-os");
    expect(getProjectPath(workProjects[0])).toBe(
      "/work/localized-commerce-platform"
    );
  });
});
