import React from "react";

import { render, screen } from "@testing-library/react";

import { AbbrClient, MemoizedAbbrClient } from ".";

describe("AbbrClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(AbbrClient).toBeDefined();
    expect(AbbrClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <AbbrClient>HTML</AbbrClient>
      </React.Suspense>
    );

    // In test environment, lazy components may render immediately
    // or show fallback briefly, so we handle both cases
    try {
      // Try to find the fallback first
      await screen.findByText("Loading...", {}, { timeout: 100 });
      // If fallback is found, wait for the component to load
      await screen.findByText("HTML");
    } catch {
      // If no fallback, component rendered immediately
      expect(screen.getByText("HTML")).toBeInTheDocument();
    }
    const abbr = screen.getByText("HTML");
    expect(abbr.tagName).toBe("ABBR");
  });
});

describe("MemoizedAbbrClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(MemoizedAbbrClient).toBeDefined();
    expect(MemoizedAbbrClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <MemoizedAbbrClient>CSS</MemoizedAbbrClient>
      </React.Suspense>
    );

    // In test environment, lazy components may render immediately
    // or show fallback briefly, so we handle both cases
    try {
      // Try to find the fallback first
      await screen.findByText("Loading...", {}, { timeout: 100 });
      // If fallback is found, wait for the component to load
      await screen.findByText("CSS");
    } catch {
      // If no fallback, component rendered immediately
      expect(screen.getByText("CSS")).toBeInTheDocument();
    }
    const abbr = screen.getByText("CSS");
    expect(abbr.tagName).toBe("ABBR");
  });
});
