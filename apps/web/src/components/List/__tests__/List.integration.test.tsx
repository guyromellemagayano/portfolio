// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Compound (variants orchestration)
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { List } from "../List";

// Mocks
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: any = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, name) => {
    if (component) component.displayName = name;
    return component;
  }),
  createComponentProps: vi.fn(
    (id: string, componentType: string, debugMode: boolean, additional: any = {}) => ({
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additional,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../List.i18n", async (orig) => {
  const mod = await orig<typeof import("../List.i18n")>();
  return { ...mod };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("List (integration)", () => {
  it("renders default list items end-to-end", () => {
    render(
      <List>
        <li>A</li>
        <li>B</li>
      </List>
    );

    const root = screen.getByTestId("test-id-list-default-root");
    expect(root).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("renders article variant with heading and children container", () => {
    render(
      <List variant="article" role="region">
        <article>First</article>
        <article>Second</article>
      </List>
    );

    const root = screen.getByTestId("test-id-article-list-root");
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute("aria-label", "Article list");
    expect(root).toHaveAttribute("role", "region");
    
    // Check sr-only heading
    const heading = screen.getByText("Article list");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("sr-only");
    expect(heading).toHaveAttribute("aria-hidden", "true");
    
    // Check nested list container - use aria-label to avoid ambiguity
    const listContainer = screen.getByRole("list", { name: "Articles" });
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveAttribute("aria-label", "Articles");
    
    // Check children are rendered
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders social variant with list semantics", () => {
    render(
      <List variant="social">
        <li>Twitter</li>
        <li>LinkedIn</li>
      </List>
    );

    const root = screen.getByTestId("test-id-social-list-root");
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe("UL");
    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("renders tools variant with spacing and items", () => {
    render(
      <List variant="tools" className="grid-gap">
        <li>React</li>
        <li>TypeScript</li>
      </List> as any
    );

    const root = screen.getByTestId("test-id-tools-list-root");
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("grid-gap");
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});


