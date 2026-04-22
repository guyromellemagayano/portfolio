/**
 * @file packages/content-data/src/__tests__/authoring.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for local content authoring helpers.
 */

import { describe, expect, it } from "vitest";

import {
  createPortableTextParagraph,
  ctaListSection,
  experienceSection,
  heroSection,
  photoGallerySection,
  projectsSection,
  richTextSection,
  speakingSection,
  usesSection,
} from "../authoring";

describe("content authoring helpers", () => {
  it("creates a portable-text paragraph block from plain text", () => {
    expect(
      createPortableTextParagraph(
        "intro-paragraph",
        "Portable text should be easy to author locally."
      )
    ).toEqual({
      _key: "intro-paragraph",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "intro-paragraph-span-1",
          _type: "span",
          text: "Portable text should be easy to author locally.",
          marks: [],
        },
      ],
    });
  });

  it("creates typed portfolio section helpers with stable shapes", () => {
    expect(heroSection("profile-1", ["social-1"])).toEqual({
      type: "hero",
      profileId: "profile-1",
      socialLinkIds: ["social-1"],
    });
    expect(richTextSection("Hello world", "Intro")).toEqual({
      type: "richText",
      title: "Intro",
      body: "Hello world",
    });
    expect(projectsSection("Projects", ["project-1"], "Featured")).toEqual({
      type: "projects",
      title: "Projects",
      intro: "Featured",
      projectSlugs: ["project-1"],
    });
    expect(speakingSection("Speaking", ["appearance-1"])).toEqual({
      type: "speaking",
      title: "Speaking",
      intro: undefined,
      appearanceSlugs: ["appearance-1"],
    });
    expect(usesSection("Uses", ["category-1"])).toEqual({
      type: "uses",
      title: "Uses",
      intro: undefined,
      categorySlugs: ["category-1"],
    });
    expect(experienceSection("Experience", ["work-1"])).toEqual({
      type: "experience",
      title: "Experience",
      intro: undefined,
      experienceIds: ["work-1"],
    });
    expect(photoGallerySection(["photo-1"], "Gallery")).toEqual({
      type: "photoGallery",
      title: "Gallery",
      photoIds: ["photo-1"],
    });
    expect(
      ctaListSection("Start", [
        { label: "Email", href: "mailto:test@example.com" },
      ])
    ).toEqual({
      type: "ctaList",
      title: "Start",
      intro: undefined,
      ctas: [{ label: "Email", href: "mailto:test@example.com" }],
    });
  });
});
