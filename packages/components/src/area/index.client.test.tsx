import React from "react";

import { render, screen } from "@testing-library/react";

import { AreaClient, MemoizedAreaClient } from ".";

describe("AreaClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(AreaClient).toBeDefined();
    expect(AreaClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <AreaClient
          data-testid="area-element"
          coords="0,0,100,100"
          shape="rect"
        />
      </React.Suspense>
    );

    // In test environment, lazy components may render immediately
    // or show fallback briefly, so we handle both cases
    try {
      // Try to find the fallback first
      await screen.findByText("Loading...", {}, { timeout: 100 });
      // If fallback is found, wait for the component to load
      await screen.findByTestId("area-element");
    } catch {
      // If no fallback, component rendered immediately
      expect(screen.getByTestId("area-element")).toBeInTheDocument();
    }

    const area = screen.getByTestId("area-element");
    expect(area.tagName).toBe("AREA");
    expect(area).toHaveAttribute("coords", "0,0,100,100");
    expect(area).toHaveAttribute("shape", "rect");
  });
});

describe("MemoizedAreaClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(MemoizedAreaClient).toBeDefined();
    expect(MemoizedAreaClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <MemoizedAreaClient
          data-testid="area-element"
          coords="0,0,50,50"
          shape="circle"
        />
      </React.Suspense>
    );

    // In test environment, lazy components may render immediately
    // or show fallback briefly, so we handle both cases
    try {
      // Try to find the fallback first
      await screen.findByText("Loading...", {}, { timeout: 100 });
      // If fallback is found, wait for the component to load
      await screen.findByTestId("area-element");
    } catch {
      // If no fallback, component rendered immediately
      expect(screen.getByTestId("area-element")).toBeInTheDocument();
    }

    const area = screen.getByTestId("area-element");
    expect(area.tagName).toBe("AREA");
    expect(area).toHaveAttribute("coords", "0,0,50,50");
    expect(area).toHaveAttribute("shape", "circle");
  });
});
