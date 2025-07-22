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
      <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
        <AreaClient
          data-testid="area-element"
          coords="0,0,100,100"
          shape="rect"
        />
      </React.Suspense>
    );

    // In test environment, lazy components often render immediately
    // Check if either the fallback or the actual component is rendered
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
      <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
        <MemoizedAreaClient
          data-testid="area-element"
          coords="0,0,50,50"
          shape="circle"
        />
      </React.Suspense>
    );

    // In test environment, lazy components often render immediately
    // Check if either the fallback or the actual component is rendered
    const area = screen.getByTestId("area-element");
    expect(area.tagName).toBe("AREA");
    expect(area).toHaveAttribute("coords", "0,0,50,50");
    expect(area).toHaveAttribute("shape", "circle");
  });
});
