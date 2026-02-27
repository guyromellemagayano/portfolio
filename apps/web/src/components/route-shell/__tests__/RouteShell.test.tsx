/**
 * @file apps/web/src/components/route-shell/__tests__/RouteShell.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the RouteShell component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { RouteShell } from "../RouteShell";

import "@testing-library/jest-dom";

vi.mock("@web/components/layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-shell">{children}</div>
  ),
}));

describe("RouteShell", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("wraps routes with Layout", () => {
    render(<RouteShell>Site Content</RouteShell>);

    expect(screen.getByTestId("layout-shell")).toBeInTheDocument();
    expect(screen.getByText("Site Content")).toBeInTheDocument();
  });

  it("preserves falsy renderable children", () => {
    render(<RouteShell>{0}</RouteShell>);

    expect(screen.getByTestId("layout-shell")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("returns null when children are null", () => {
    const { container } = render(<RouteShell>{null}</RouteShell>);

    expect(container).toBeEmptyDOMElement();
  });
});
