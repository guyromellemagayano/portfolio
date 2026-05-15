/**
 * @file apps/web/src/data/__tests__/json-backed-data.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for JSON-backed local data module exports.
 */

import { describe, expect, it } from "vitest";

import { articleCategories, articles } from "@web/data/articles";
import { clients, workExperience } from "@web/data/clients";
import { getProjectPath, labProjects, workProjects } from "@web/data/projects";
import { getPage, navigationLinks, pagePathways } from "@web/data/site";
import { standalonePages } from "@web/data/standalone-pages";
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

  it("parses articles into portable text body records", () => {
    expect(articleCategories).toContain("Content Modeling");
    expect(articles).toHaveLength(3);
    expect(articles[0]?.body[0]).toMatchObject({
      _key: "system-boundaries-1",
      _type: "block",
      children: [
        expect.objectContaining({
          _type: "span",
          text: expect.stringContaining("Strong product systems"),
        }),
      ],
    });
  });

  it("parses standalone pages into portable text body records", () => {
    expect(standalonePages).toHaveLength(1);
    expect(standalonePages[0]).toMatchObject({
      slug: "now",
      updatedAt: "2026-05-09T00:00:00.000Z",
      body: expect.arrayContaining([
        expect.objectContaining({
          _key: "now-1",
          _type: "block",
        }),
      ]),
    });
  });

  it("promotes work into browseable site IA records", () => {
    expect(
      navigationLinks
        .filter((link) => link.showInHeader)
        .map((link) => link.href)
    ).toEqual(["/capabilities", "/work", "/notes", "/about"]);

    expect(getPage("work")).toMatchObject({
      slug: "work",
      seoCanonicalPath: "/work",
      seoTitle: "Work - Guy Romelle Magayano",
    });

    expect(pagePathways.work).toEqual([
      expect.objectContaining({ href: "/capabilities" }),
      expect.objectContaining({ href: "/notes" }),
      expect.objectContaining({ href: "/contact" }),
    ]);
  });
});
