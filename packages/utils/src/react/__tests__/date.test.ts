import { describe, expect, it } from "vitest";

import { formatDateSafely } from "../date";

describe("formatDateSafely", () => {
  it("formats a valid date string", () => {
    const result = formatDateSafely("2023-12-25");
    expect(result).toBe("12/25/2023");
  });

  it("formats a Date object", () => {
    const date = new Date("2023-12-25");
    const result = formatDateSafely(date);
    expect(result).toBe("12/25/2023");
  });

  it("formats with custom options", () => {
    const result = formatDateSafely(new Date("2023-12-25"), {
      year: "numeric",
      month: "short",
    });
    expect(result).toBe("Dec 2023");
  });

  it("returns empty string for null", () => {
    const result = formatDateSafely(null);
    expect(result).toBe("");
  });

  it("returns empty string for undefined", () => {
    const result = formatDateSafely(undefined);
    expect(result).toBe("");
  });

  it("returns empty string for empty string", () => {
    const result = formatDateSafely("");
    expect(result).toBe("");
  });

  it("returns empty string for invalid date", () => {
    const result = formatDateSafely("invalid-date");
    expect(result).toBe("");
  });

  it("handles invalid Date object", () => {
    const result = formatDateSafely(new Date("invalid"));
    expect(result).toBe("");
  });
});
