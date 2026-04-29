import { describe, expect, it } from "vitest";

import {
  createAriaLabelledBy,
  createComponentDataAttributes,
  createComponentProps,
  trimStringContent,
} from "../component";

describe("trimStringContent", () => {
  it("trims string content", () => {
    expect(trimStringContent("  content  ")).toBe("content");
  });

  it("converts non-string content to a string", () => {
    expect(trimStringContent(42)).toBe("42");
    expect(trimStringContent(null)).toBe("");
  });
});

describe("createComponentDataAttributes", () => {
  it("creates test id attributes for safe ids and suffixes", () => {
    expect(createComponentDataAttributes("hero", "title")).toEqual({
      "data-testid": "hero-title-root",
    });
  });

  it("omits attributes for unsafe ids", () => {
    expect(createComponentDataAttributes("hero title", "label")).toEqual({});
  });
});

describe("createAriaLabelledBy", () => {
  it("combines id and trimmed title", () => {
    expect(createAriaLabelledBy(" Main title ", "section")).toBe(
      "section-Main title"
    );
  });

  it("returns undefined when title or id is missing", () => {
    expect(createAriaLabelledBy("", "section")).toBeUndefined();
    expect(createAriaLabelledBy("Title", "")).toBeUndefined();
  });
});

describe("createComponentProps", () => {
  it("combines generated data attributes, aria attributes, and additional props", () => {
    expect(
      createComponentProps("hero", "title", true, "Heading", {
        role: "heading",
      })
    ).toEqual({
      "aria-labelledby": "hero-Heading",
      "data-debug-mode": "true",
      "data-testid": "hero-title-root",
      role: "heading",
    });
  });
});
