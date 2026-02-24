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

const usePathnameMock = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

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

  it("renders raw children on /studio root route", () => {
    usePathnameMock.mockReturnValue("/studio");

    render(<RouteShell>Studio Content</RouteShell>);

    expect(screen.getByText("Studio Content")).toBeInTheDocument();
    expect(screen.queryByTestId("layout-shell")).not.toBeInTheDocument();
  });

  it("renders raw children on nested /studio routes", () => {
    usePathnameMock.mockReturnValue("/studio/structure");

    render(<RouteShell>Studio Tool</RouteShell>);

    expect(screen.getByText("Studio Tool")).toBeInTheDocument();
    expect(screen.queryByTestId("layout-shell")).not.toBeInTheDocument();
  });

  it("wraps non-studio routes with Layout", () => {
    usePathnameMock.mockReturnValue("/articles");

    render(<RouteShell>Site Content</RouteShell>);

    expect(screen.getByTestId("layout-shell")).toBeInTheDocument();
    expect(screen.getByText("Site Content")).toBeInTheDocument();
  });
});
