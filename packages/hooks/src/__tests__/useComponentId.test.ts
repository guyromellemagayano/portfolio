import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useComponentId } from "../useComponentId";

describe("useComponentId", () => {
  it("returns sanitized generated component ID when no options provided", () => {
    const { result: result1 } = renderHook(() => useComponentId());
    const { result: result2 } = renderHook(() => useComponentId());

    expect(result1.current.componentId).toBe("test-id");
    expect(result2.current.componentId).toBe("test-id");
    expect(result1.current.isDebugMode).toBe(false);
  });

  it("uses provided debug ID", () => {
    const { result } = renderHook(() =>
      useComponentId({ debugId: "custom-id" })
    );

    expect(result.current.componentId).toBe("custom-id");
    expect(result.current.isDebugMode).toBe(false);
  });

  it("enables debug mode when debugMode is true", () => {
    const { result } = renderHook(() => useComponentId({ debugMode: true }));

    expect(result.current.componentId).toBe("test-id");
    expect(result.current.isDebugMode).toBe(true);
  });

  it("combines debug ID and debug mode", () => {
    const { result } = renderHook(() =>
      useComponentId({ debugId: "custom-id", debugMode: true })
    );

    expect(result.current.componentId).toBe("custom-id");
    expect(result.current.isDebugMode).toBe(true);
  });

  it("handles empty options object", () => {
    const { result } = renderHook(() => useComponentId({}));

    expect(result.current.componentId).toBe("test-id");
    expect(result.current.isDebugMode).toBe(false);
  });
});
