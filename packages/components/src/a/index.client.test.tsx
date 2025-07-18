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

    // Should show fallback initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByText("Test Link");
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

    // Should show fallback initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByText("Test Link");
    const link = screen.getByText("Test Link");
    expect(link.tagName).toBe("A");
  });
});
