import { memo } from "react";

import { describe, expect, it, vi } from "vitest";

import { setDisplayName } from "../component";

// Unlock `react` to get the real implementation for the memo
vi.unmock("react");

describe("setDisplayName", () => {
  it("should set displayName for a simple function component", () => {
    function MyComponent() {
      return null;
    }
    const wrapped = setDisplayName(MyComponent);
    expect(
      (wrapped as typeof MyComponent & { displayName: string }).displayName
    ).toBe("MyComponent");
  });

  it("should use custom displayName if provided", () => {
    function MyComponent() {
      return null;
    }
    const wrapped = setDisplayName(MyComponent, "CustomName");
    expect(
      (wrapped as typeof MyComponent & { displayName: string }).displayName
    ).toBe("CustomName");
  });

  it("should handle React.memo components correctly (The Issue)", () => {
    function MyMemoComponent() {
      return null;
    }
    const Memoized = memo(MyMemoComponent);
    const wrapped = setDisplayName(Memoized);

    // We expect it to find the inner name "MyMemoComponent"
    expect(
      (wrapped as typeof Memoized & { displayName: string }).displayName
    ).toBe("MyMemoComponent");
  });

  it("should handle components with no name", () => {
    const wrapped = setDisplayName(() => null);
    expect((wrapped as unknown as { displayName: string }).displayName).toBe(
      "Component"
    );
  });
});
