/**
 * @file apps/web/src/lib/__tests__/json-data.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for JSON-backed local data parsing helpers.
 */

import { describe, expect, it } from "vitest";

import {
  assertExactKeys,
  assertUniqueValues,
  expectEnum,
  expectOptionalString,
  expectPathname,
  expectRecord,
} from "@web/lib/json-data";

describe("json-data helpers", () => {
  it("normalizes optional strings and drops blank values", () => {
    expect(expectOptionalString("  Advisory  ", "data.value")).toBe("Advisory");
    expect(expectOptionalString("   ", "data.value")).toBeUndefined();
    expect(expectOptionalString(undefined, "data.value")).toBeUndefined();
  });

  it("accepts only configured enum values", () => {
    expect(
      expectEnum("primary", ["primary", "reference"] as const, "data.value")
    ).toBe("primary");
    expect(() =>
      expectEnum("secondary", ["primary", "reference"] as const, "data.value")
    ).toThrow(
      'Invalid local data at "data.value": expected one of "primary", "reference".'
    );
  });

  it("rejects unexpected keys on parsed records", () => {
    expect(() =>
      assertExactKeys({ id: "item-1", extra: true }, ["id"], "data.record")
    ).toThrow('Invalid local data at "data.record.extra": unexpected field.');
  });

  it("rejects duplicate values within a keyed collection", () => {
    expect(() =>
      assertUniqueValues(["about", "about"], "page slug", "data.pages")
    ).toThrow(
      'Invalid local data at "data.pages": duplicate page slug "about".'
    );
  });

  it("requires plain objects for record parsing", () => {
    expect(expectRecord({ id: "item-1" }, "data.record")).toEqual({
      id: "item-1",
    });
    expect(() => expectRecord([], "data.record")).toThrow(
      'Invalid local data at "data.record": expected object, received array.'
    );
  });

  it("requires internal route paths to start with a slash", () => {
    expect(expectPathname("/contact", "data.href")).toBe("/contact");
    expect(() => expectPathname("contact", "data.href")).toThrow(
      'Invalid local data at "data.href": expected path to start with "/".'
    );
  });
});
