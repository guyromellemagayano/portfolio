// =============================================================================
// SECTION COMPONENT INTEGRATION TESTS
// =============================================================================
// Test Type: Integration Tests
// Coverage Tier: Tier 2 (Core Components)
// Risk Tier: Medium
// Component Type: Compound Component (with sub-components)
// =============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Section } from "../Section";

import "@testing-library/jest-dom";

// Set up a test environments
beforeAll(() => {
  // Mock globalThis.process for the test environment
  (globalThis as any).process = {
    env: {
      NODE_ENV: "test",
    },
    memoryUsage: () => ({
      rss: 0,
      heapTotal: 0,
      heapUsed: 0,
      external: 0,
      arrayBuffers: 0,
    }),
  };
});

// Mock the shared components
vi.mock("@guyromellemagayano/components", () => ({
  Div: React.forwardRef(function Div(props: any, ref: any) {
    return React.createElement("div", { ...props, ref, "data-testid": "div" });
  }),
  Heading: React.forwardRef(function Heading(props: any, ref: any) {
    return React.createElement("h2", {
      ...props,
      ref,
      "data-testid": "heading",
    });
  }),
  Section: React.forwardRef(function GRMSectionComponent(props: any, ref: any) {
    return React.createElement("section", {
      ...props,
      ref,
      "data-testid": "grm-section",
    });
  }),
}));

// Mock the useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: (options as any).debugId || "test-id",
    isDebugMode: (options as any).debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock the utils
// @ts-ignore
vi.mock("@guyromellemagayano/utils", () => ({
  hasValidContent: vi.fn((content) => {
    if (content == null) return false;
    if (content === false) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === null || children === undefined || children === false) {
      return false;
    }
    if (children === "") {
      return false;
    }
    return !(Array.isArray(children) && children.length === 0);
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        // @ts-ignore
        (additionalProps as any)["data-testid"] ||
        `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      // @ts-ignore
      component.displayName = displayName;
    }
    return component;
  }),
  isValidImageSrc: vi.fn((src) => {
    if (!src) return false;
    if (typeof src !== "string") return false;
    return src.trim() !== "";
  }),
}));

// Mock the cn helper
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: any[]) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)
  ),
  isActivePath: vi.fn(() => true),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Section (Integration)", () => {
  describe("Component Composition", () => {
    it("renders complete Section structure with all sub-components", () => {
      render(
        <Section title="Integration Test">
          <div>
            <p>Section content</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      const grid = screen.getByTestId("test-id-section-grid-root");
      const title = screen.getByTestId("test-id-section-title-root");
      const content = screen.getByTestId("test-id-section-content-root");

      expect(section).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();

      expect(section.tagName).toBe("SECTION");
      expect(grid.tagName).toBe("DIV");
      expect(title.tagName).toBe("H2");
      expect(content.tagName).toBe("DIV");

      expect(title).toHaveTextContent("Integration Test");
      expect(content).toHaveTextContent("Section content");
      expect(content).toHaveTextContent("Item 1");
      expect(content).toHaveTextContent("Item 2");
    });

    it("maintains proper component hierarchy", () => {
      render(
        <Section title="Hierarchy Test">
          <p>Content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      const grid = screen.getByTestId("test-id-section-grid-root");
      const title = screen.getByTestId("test-id-section-title-root");
      const content = screen.getByTestId("test-id-section-content-root");

      expect(section.contains(grid)).toBe(true);
      expect(grid.contains(title)).toBe(true);
      expect(grid.contains(content)).toBe(true);
    });

    it("propagates debug props to all sub-components", () => {
      render(
        <Section title="Debug Propagation" debugId="debug-id" debugMode={true}>
          <p>Content</p>
        </Section>
      );

      const section = screen.getByTestId("debug-id-section-root");
      const grid = screen.getByTestId("debug-id-section-grid-root");
      const title = screen.getByTestId("debug-id-section-title-root");
      const content = screen.getByTestId("debug-id-section-content-root");

      expect(section).toHaveAttribute("data-debug-mode", "true");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
      expect(title).toHaveAttribute("data-debug-mode", "true");
      expect(content).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles multiple Section instances", () => {
      render(
        <div>
          <Section title="First Section">
            <p>First content</p>
          </Section>
          <Section title="Second Section">
            <p>Second content</p>
          </Section>
        </div>
      );

      expect(screen.getByText("First Section")).toBeInTheDocument();
      expect(screen.getByText("Second Section")).toBeInTheDocument();
      expect(screen.getByText("First content")).toBeInTheDocument();
      expect(screen.getByText("Second content")).toBeInTheDocument();

      const sections = screen.getAllByTestId(/test-id-section-root/);
      expect(sections).toHaveLength(2);
    });

    it("works within a full page layout", () => {
      render(
        <div>
          <header>
            <h1>Page Title</h1>
          </header>
          <main>
            <Section title="Main Section">
              <p>Main content</p>
            </Section>
          </main>
          <footer>
            <p>Footer</p>
          </footer>
        </div>
      );

      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Main Section")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });

  describe("ARIA Integration", () => {
    it("integrates with ARIA landmarks and relationships", () => {
      render(
        <Section
          title="ARIA Section"
          aria-labelledby="section-title"
          debugId="aria-integration"
        >
          <p>Section content</p>
        </Section>
      );

      const section = screen.getByTestId("aria-integration-section-root");
      const title = screen.getByRole("heading", { level: 2 });

      expect(section).toHaveAttribute("aria-labelledby", "section-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("ARIA Section");
    });

    it("maintains proper heading hierarchy", () => {
      render(
        <div>
          <h1>Page Title</h1>
          <Section title="Section Title">
            <p>Content</p>
          </Section>
        </div>
      );

      const h1 = screen.getByRole("heading", { level: 1 });
      const h2 = screen.getByRole("heading", { level: 2 });

      expect(h1).toHaveTextContent("Page Title");
      expect(h2).toHaveTextContent("Section Title");
    });
  });

  describe("Styling Integration", () => {
    it("applies styling classes correctly across all components", () => {
      render(
        <Section title="Styling Test" className="custom-section">
          <p>Content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      const grid = screen.getByTestId("test-id-section-grid-root");
      const title = screen.getByTestId("test-id-section-title-root");
      const content = screen.getByTestId("test-id-section-content-root");

      expect(section).toHaveAttribute("class");
      expect(grid).toHaveAttribute("class");
      expect(title).toHaveAttribute("class");
      expect(content).toHaveAttribute("class");
    });
  });
});
