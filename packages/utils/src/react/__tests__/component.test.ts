import { memo } from "react";

import { describe, expect, it, vi } from "vitest";

// Unlock `react` to get the real implementation for the memo
vi.unmock("react");

import { setDisplayName } from "../component";

describe("setDisplayName", () => {
  it("should set displayName for a simple function component", () => {
    function MyComponent() {
      return null;
    }
    const wrapped = setDisplayName(MyComponent);
    expect(wrapped.displayName).toBe("MyComponent");
  });

  it("should use custom displayName if provided", () => {
    function MyComponent() {
      return null;
    }
    const wrapped = setDisplayName(MyComponent, "CustomName");
    expect(wrapped.displayName).toBe("CustomName");
  });

  it("should handle React.memo components correctly (The Issue)", () => {
    function MyMemoComponent() {
      return null;
    }
    const Memoized = memo(MyMemoComponent);
    const wrapped = setDisplayName(Memoized);

    // We expect it to find the inner name "MyMemoComponent"
    expect(wrapped.displayName).toBe("MyMemoComponent");
  });

  it("should handle components with no name", () => {
    const wrapped = setDisplayName(() => null);
    expect(wrapped.displayName).toBe("Component");
  });
});
