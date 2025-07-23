import React from "react";

import { render, screen } from "@testing-library/react";

import { AClient, MemoizedAClient } from ".";

describe("AClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(AClient).toBeDefined();
    expect(AClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <AClient>Test Link</AClient>
      </React.Suspense>
    );

    // In test environment, lazy components may render immediately
    // or show fallback briefly, so we handle both cases
    try {
      // Try to find the fallback first
      await screen.findByText("Loading...", {}, { timeout: 100 });
      // If fallback is found, wait for the component to load
      await screen.findByText("Test Link");
    } catch {
      // If no fallback, component rendered immediately
      expect(screen.getByText("Test Link")).toBeInTheDocument();
    }

    const link = screen.getByText("Test Link");
    expect(link.tagName).toBe("A");
  });
});

describe("MemoizedAClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(MemoizedAClient).toBeDefined();
    expect(MemoizedAClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <MemoizedAClient>Test Link</MemoizedAClient>
      </React.Suspense>
    );

    // In test environment, lazy components may render immediately
    // or show fallback briefly, so we handle both cases
    try {
      // Try to find the fallback first
      await screen.findByText("Loading...", {}, { timeout: 100 });
      // If fallback is found, wait for the component to load
      await screen.findByText("Test Link");
    } catch {
      // If no fallback, component rendered immediately
      expect(screen.getByText("Test Link")).toBeInTheDocument();
    }

    const link = screen.getByText("Test Link");
    expect(link.tagName).toBe("A");
  });
});
