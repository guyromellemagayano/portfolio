import React from "react";

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useComponentId } from "../useComponentId";
import { setDisplayName } from "../utils";

describe("useComponentId", () => {
  it("generates unique IDs when no options provided", () => {
    const { result: result1 } = renderHook(() => useComponentId());
    const { result: result2 } = renderHook(() => useComponentId());

    expect(result1.current.id).toBe("test-id");
    expect(result2.current.id).toBe("test-id");
    expect(result1.current.isDebugMode).toBe(false);
  });

  it("uses provided internal ID", () => {
    const { result } = renderHook(() =>
      useComponentId({ internalId: "custom-id" })
    );

    expect(result.current.id).toBe("custom-id");
    expect(result.current.isDebugMode).toBe(false);
  });

  it("enables debug mode when debugMode is true", () => {
    const { result } = renderHook(() => useComponentId({ debugMode: true }));

    expect(result.current.id).toBe("test-id");
    expect(result.current.isDebugMode).toBe(true);
  });

  it("combines internal ID and debug mode", () => {
    const { result } = renderHook(() =>
      useComponentId({ internalId: "custom-id", debugMode: true })
    );

    expect(result.current.id).toBe("custom-id");
    expect(result.current.isDebugMode).toBe(true);
  });

  it("handles empty options object", () => {
    const { result } = renderHook(() => useComponentId({}));

    expect(result.current.id).toBe("test-id");
    expect(result.current.isDebugMode).toBe(false);
  });
});

describe("setDisplayName", () => {
  it("sets displayName when not already set", () => {
    const TestComponent: React.ComponentType = () =>
      React.createElement("div", null, "Test");

    const result = setDisplayName(TestComponent, "TestComponent");

    expect(result.displayName).toBe("TestComponent");
  });

  it("preserves existing displayName", () => {
    const TestComponent: React.ComponentType = () =>
      React.createElement("div", null, "Test");
    TestComponent.displayName = "ExistingName";

    const result = setDisplayName(TestComponent, "NewName");

    expect(result.displayName).toBe("ExistingName");
  });

  it("returns the same component reference", () => {
    const TestComponent: React.ComponentType = () =>
      React.createElement("div", null, "Test");

    const result = setDisplayName(TestComponent, "TestComponent");

    expect(result).toBe(TestComponent);
  });

  it("handles components with no displayName", () => {
    const TestComponent: React.ComponentType = () =>
      React.createElement("div", null, "Test");
    delete (TestComponent as any).displayName;

    const result = setDisplayName(TestComponent, "TestComponent");

    expect(result.displayName).toBe("TestComponent");
  });
});
