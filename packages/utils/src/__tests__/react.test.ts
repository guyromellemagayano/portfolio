import { describe, expect, it } from "vitest";

import {
  hasAnyRenderableContent,
  hasMeaningfulText,
  isRenderableContent,
  trimStringContent,
} from "../react";

describe("isRenderableContent", () => {
  it("returns false for null", () => {
    expect(isRenderableContent(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isRenderableContent(undefined)).toBe(false);
  });

  it("returns false for boolean false", () => {
    expect(isRenderableContent(false)).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isRenderableContent("")).toBe(false);
  });

  it("returns true for boolean true", () => {
    expect(isRenderableContent(true)).toBe(true);
  });

  it("returns true for number zero", () => {
    expect(isRenderableContent(0)).toBe(true);
  });

  it("returns true for non-zero numbers", () => {
    expect(isRenderableContent(42)).toBe(true);
    expect(isRenderableContent(-1)).toBe(true);
  });

  it("returns true for non-empty strings", () => {
    expect(isRenderableContent("hello")).toBe(true);
    expect(isRenderableContent(" ")).toBe(true); // whitespace is still renderable
  });

  it("returns true for arrays", () => {
    expect(isRenderableContent([])).toBe(true);
    expect(isRenderableContent([1, 2, 3])).toBe(true);
  });

  it("returns true for objects", () => {
    expect(isRenderableContent({})).toBe(true);
    expect(isRenderableContent({ key: "value" })).toBe(true);
  });
});

describe("hasAnyRenderableContent", () => {
  it("returns false when all values are non-renderable", () => {
    expect(hasAnyRenderableContent(null, undefined, false, "")).toBe(false);
  });

  it("returns true when any value is renderable", () => {
    expect(hasAnyRenderableContent(null, "hello", false)).toBe(true);
    expect(hasAnyRenderableContent(undefined, 42, "")).toBe(true);
    expect(hasAnyRenderableContent(false, true, null)).toBe(true);
  });

  it("returns false for empty array", () => {
    expect(hasAnyRenderableContent()).toBe(false);
  });

  it("returns true for single renderable value", () => {
    expect(hasAnyRenderableContent("hello")).toBe(true);
    expect(hasAnyRenderableContent(42)).toBe(true);
    expect(hasAnyRenderableContent(true)).toBe(true);
  });

  it("returns false for single non-renderable value", () => {
    expect(hasAnyRenderableContent(null)).toBe(false);
    expect(hasAnyRenderableContent(undefined)).toBe(false);
    expect(hasAnyRenderableContent(false)).toBe(false);
    expect(hasAnyRenderableContent("")).toBe(false);
  });
});

describe("trimStringContent", () => {
  it("trims whitespace from strings", () => {
    expect(trimStringContent("  hello  ")).toBe("hello");
    expect(trimStringContent("\n\tworld\n\t")).toBe("world");
  });

  it("returns original string if no whitespace", () => {
    expect(trimStringContent("hello")).toBe("hello");
  });

  it("returns empty string for whitespace-only strings", () => {
    expect(trimStringContent("   ")).toBe("");
    expect(trimStringContent("\n\t")).toBe("");
  });

  it("converts non-strings to string and trims", () => {
    expect(trimStringContent(123)).toBe("123");
    expect(trimStringContent(true)).toBe("true");
    expect(trimStringContent(null)).toBe("");
    expect(trimStringContent(undefined)).toBe("");
  });

  it("handles empty string", () => {
    expect(trimStringContent("")).toBe("");
  });
});

describe("hasMeaningfulText", () => {
  it("returns true for non-empty strings", () => {
    expect(hasMeaningfulText("hello")).toBe(true);
    expect(hasMeaningfulText("world")).toBe(true);
  });

  it("returns false for empty strings", () => {
    expect(hasMeaningfulText("")).toBe(false);
  });

  it("returns false for whitespace-only strings", () => {
    expect(hasMeaningfulText("   ")).toBe(false);
    expect(hasMeaningfulText("\n\t")).toBe(false);
    expect(hasMeaningfulText("  \n  \t  ")).toBe(false);
  });

  it("returns true for strings with meaningful text and whitespace", () => {
    expect(hasMeaningfulText("  hello  ")).toBe(true);
    expect(hasMeaningfulText("\n\tworld\n\t")).toBe(true);
  });

  it("returns false for non-string values", () => {
    expect(hasMeaningfulText(123)).toBe(false);
    expect(hasMeaningfulText(true)).toBe(false);
    expect(hasMeaningfulText(null)).toBe(false);
    expect(hasMeaningfulText(undefined)).toBe(false);
    expect(hasMeaningfulText({})).toBe(false);
    expect(hasMeaningfulText([])).toBe(false);
  });
});
