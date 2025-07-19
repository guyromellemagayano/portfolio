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

    // Should show fallback initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByText("HTML");
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

    // Should show fallback initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByText("CSS");
    const abbr = screen.getByText("CSS");
    expect(abbr.tagName).toBe("ABBR");
  });
});
