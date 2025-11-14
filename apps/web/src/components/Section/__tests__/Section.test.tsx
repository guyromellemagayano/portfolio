// ============================================================================
// SECTION COMPONENT TESTS
// ============================================================================
// Test Type: Unit + Integration Tests
// Coverage Tier: Tier 2 (Core Components)
// Risk Tier: Medium
// Component Type: Compound Component (with sub-components)
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { MemoizedSection, Section } from "../Section";

import "@testing-library/jest-dom";

// Set up test environment
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
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock the utils
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
    if (Array.isArray(children) && children.length === 0) {
      return false;
    }
    return true;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
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
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
  isActivePath: vi.fn(() => true),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Section", () => {
  describe("Basic Rendering", () => {
    it("renders section with title and children", () => {
      render(
        <Section title="Test Section" data-testid="section">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent("Test Section");
      expect(section).toHaveTextContent("Test content");
      expect(section.tagName).toBe("SECTION");
    });

    it("returns null when no title and no children", () => {
      const { container } = render(<Section title="" data-testid="section" />);
      expect(container.firstChild).toBeNull();
    });

    it("returns null when title is empty string and no children", () => {
      const { container } = render(<Section title="" data-testid="section" />);
      expect(container.firstChild).toBeNull();
    });

    it("returns null when children is empty string and no title", () => {
      const { container } = render(
        <Section title="" data-testid="section">
          {""}
        </Section>
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Props and Attributes", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Section ref={ref} title="Ref Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toBeInTheDocument();
      expect(section.tagName).toBe("SECTION");
    });

    it("applies custom className", () => {
      render(
        <Section
          title="Custom Class"
          className="custom-class"
          data-testid="section"
        >
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveAttribute("class");
    });

    it("spreads additional props to section element", () => {
      render(
        <Section
          title="Props Test"
          data-testid="section"
          id="test-id"
          aria-label="Test section"
          data-custom="value"
        >
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveAttribute("id", "test-id");
      expect(section).toHaveAttribute("aria-label", "Test section");
      expect(section).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Internal Props and useComponentId Integration", () => {
    it("uses provided debugId when available", () => {
      render(
        <Section
          title="Internal ID Test"
          debugId="custom-id"
          data-testid="section"
        >
          Content
        </Section>
      );

      const section = screen.getByTestId("custom-id-section-root");
      expect(section).toHaveAttribute("data-section-id", "custom-id-section");
    });

    it("generates ID when debugId is not provided", () => {
      render(
        <Section title="Generated ID Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveAttribute("data-section-id", "test-id-section");
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(
        <Section title="Debug Test" debugMode={true} data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <Section title="Debug Test" debugMode={false} data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(
        <Section title="Debug Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Content Structure", () => {
    it("renders grid structure correctly", () => {
      render(
        <Section title="Grid Test" data-testid="section">
          <p>Grid content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      const grid = screen.getByTestId("test-id-section-grid-root");
      expect(grid).toBeInTheDocument();
      expect(grid?.tagName).toBe("DIV");
    });

    it("renders title in grid when provided", () => {
      render(
        <Section title="Grid Title Test" data-testid="section">
          Content
        </Section>
      );

      const title = screen.getByTestId("test-id-section-title-root");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Grid Title Test");
      expect(title.tagName).toBe("H2");
    });

    it("renders content in grid when provided", () => {
      render(
        <Section title="Grid Content Test" data-testid="section">
          <p>Grid content</p>
        </Section>
      );

      const content = screen.getByTestId("test-id-section-content-root");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Grid content");
    });

    it("renders both title and content in grid", () => {
      render(
        <Section title="Both Test" data-testid="section">
          <p>Both content</p>
        </Section>
      );

      const title = screen.getByTestId("test-id-section-title-root");
      const content = screen.getByTestId("test-id-section-content-root");

      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Both Test");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Both content");
    });
  });

  describe("SectionTitle Sub-component", () => {
    it("renders title with correct attributes", () => {
      render(
        <Section title="Heading Test" data-testid="section">
          Content
        </Section>
      );

      const title = screen.getByTestId("test-id-section-title-root");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Heading Test");
      expect(title.tagName).toBe("H2");
      expect(title).toHaveAttribute("class");
    });

    it("applies custom className to title through Section", () => {
      render(
        <Section title="Title Test" data-testid="section">
          Content
        </Section>
      );

      const title = screen.getByTestId("test-id-section-title-root");
      expect(title).toHaveAttribute("class");
    });

    it("renders title with debug mode", () => {
      render(
        <Section title="Debug Title" debugMode={true} data-testid="section">
          Content
        </Section>
      );

      const title = screen.getByTestId("test-id-section-title-root");
      expect(title).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders title with custom debugId", () => {
      render(
        <Section title="Custom ID Title" debugId="custom-id" data-testid="section">
          Content
        </Section>
      );

      const title = screen.getByTestId("custom-id-section-title-root");
      expect(title).toHaveAttribute(
        "data-section-title-id",
        "custom-id-section-title"
      );
    });

    it("handles complex title content", () => {
      render(
        <Section title="Complex Title" data-testid="section">
          Content
        </Section>
      );

      const title = screen.getByTestId("test-id-section-title-root");
      expect(title).toHaveTextContent("Complex Title");
    });
  });

  describe("SectionContent Sub-component", () => {
    it("renders content correctly", () => {
      render(
        <Section title="Content Test" data-testid="section">
          <p>Test content</p>
        </Section>
      );

      const content = screen.getByTestId("test-id-section-content-root");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Test content");
      expect(content.tagName).toBe("DIV");
    });

    it("does not render when no children", () => {
      const { container } = render(
        <Section title="No Content" data-testid="section">
          {null}
        </Section>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles complex children content", () => {
      render(
        <Section title="Complex Content" data-testid="section">
          <div>
            <h3>Sub heading</h3>
            <p>Paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </Section>
      );

      const content = screen.getByTestId("test-id-section-content-root");
      expect(content).toHaveTextContent("Sub heading");
      expect(content).toHaveTextContent("Paragraph content");
      expect(content).toHaveTextContent("List item 1");
      expect(content).toHaveTextContent("List item 2");
    });

    it("renders with debug mode", () => {
      render(
        <Section title="Debug Content" debugMode={true} data-testid="section">
          <p>Content</p>
        </Section>
      );

      const content = screen.getByTestId("test-id-section-content-root");
      expect(content).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debugId", () => {
      render(
        <Section title="Custom ID Content" debugId="custom-id" data-testid="section">
          <p>Content</p>
        </Section>
      );

      const content = screen.getByTestId("custom-id-section-content-root");
      expect(content).toHaveAttribute(
        "data-section-content-id",
        "custom-id-section-content"
      );
    });
  });

  describe("SectionGrid Sub-component", () => {
    it("renders grid structure correctly", () => {
      render(
        <Section title="Grid Test" data-testid="section">
          <p>Grid content</p>
        </Section>
      );

      const grid = screen.getByTestId("test-id-section-grid-root");
      expect(grid).toBeInTheDocument();
      expect(grid.tagName).toBe("DIV");
      expect(grid).toHaveAttribute("class");
    });

    it("does not render when no children", () => {
      const { container } = render(
        <Section title="No Grid" data-testid="section">
          {null}
        </Section>
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders with debug mode", () => {
      render(
        <Section title="Debug Grid" debugMode={true} data-testid="section">
          <p>Content</p>
        </Section>
      );

      const grid = screen.getByTestId("test-id-section-grid-root");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debugId", () => {
      render(
        <Section title="Custom ID Grid" debugId="custom-id" data-testid="section">
          <p>Content</p>
        </Section>
      );

      const grid = screen.getByTestId("custom-id-section-grid-root");
      expect(grid).toHaveAttribute(
        "data-section-grid-id",
        "custom-id-section-grid"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Section title="Complex Children" data-testid="section">
          <div>
            <h3>Sub heading</h3>
            <p>Paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveTextContent("Complex Children");
      expect(section).toHaveTextContent("Sub heading");
      expect(section).toHaveTextContent("Paragraph content");
      expect(section).toHaveTextContent("List item 1");
      expect(section).toHaveTextContent("List item 2");
    });

    it("handles React elements as children", () => {
      const ChildComponent = function () {
        return <span>Child component</span>;
      };

      render(
        <Section title="React Children" data-testid="section">
          <ChildComponent />
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveTextContent("React Children");
      expect(section).toHaveTextContent("Child component");
    });

    it("handles multiple children", () => {
      render(
        <Section title="Multiple Children" data-testid="section">
          <p>First child</p>
          <p>Second child</p>
          <p>Third child</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section-root");
      expect(section).toHaveTextContent("Multiple Children");
      expect(section).toHaveTextContent("First child");
      expect(section).toHaveTextContent("Second child");
      expect(section).toHaveTextContent("Third child");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(
        <Section title="ARIA Test" debugId="aria-test">
          <p>Content</p>
        </Section>
      );

      const sectionElement = screen.getByTestId("aria-test-section-root");
      expect(sectionElement).toBeInTheDocument();

      const headingElement = screen.getByRole("heading", { level: 2 });
      expect(headingElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        <Section title="ARIA Test" debugId="aria-test">
          <p>Content</p>
        </Section>
      );

      const sectionElement = screen.getByTestId("aria-test-section-root");
      expect(sectionElement.tagName).toBe("SECTION");
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(
        <Section title="ARIA Test" debugId="aria-test">
          <p>Content</p>
        </Section>
      );

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toHaveAttribute(
        "data-section-title-id",
        "aria-test-section-title"
      );
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Section debugId="aria-test" />);
      expect(container.firstChild).toBeNull();
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(
        <Section title="ARIA Test" debugId="different-id">
          <p>Content</p>
        </Section>
      );

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toHaveAttribute(
        "data-section-title-id",
        "different-id-section-title"
      );
    });

    it("applies ARIA attributes during component updates", () => {
      const { rerender } = render(
        <Section title="Initial" debugId="aria-test">
          <p>Content</p>
        </Section>
      );

      let titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toHaveTextContent("Initial");

      rerender(
        <Section title="Updated" debugId="aria-test">
          <p>Content</p>
        </Section>
      );

      titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toHaveTextContent("Updated");
    });
  });

  describe("Memoization", () => {
    it("MemoizedSection renders children", () => {
      render(
        <MemoizedSection title="Memoized Test">
          <p>Content</p>
        </MemoizedSection>
      );
      expect(screen.getByText("Memoized Test")).toBeInTheDocument();
    });

    it("MemoizedSection maintains content across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedSection title="Stable">
          <p>Content</p>
        </MemoizedSection>
      );

      expect(screen.getByText("Stable")).toBeInTheDocument();

      rerender(
        <MemoizedSection title="Stable">
          <p>Content</p>
        </MemoizedSection>
      );
      expect(screen.getByText("Stable")).toBeInTheDocument();
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(Section).toBeDefined();
      expect(typeof Section).toBe("function");
      expect(Section).toHaveProperty("displayName");
    });
  });
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
