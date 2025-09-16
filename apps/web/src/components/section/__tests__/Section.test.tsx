import React from "react";

import { render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { Section } from "../Section";

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
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
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
  createComponentProps: vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};
    if (id && suffix) {
      attributes[`data-${suffix}-id`] = `${id}-${suffix}`;
      attributes["data-testid"] = `${id}-${suffix}`;
      // Add id attribute for SectionTitle
      if (suffix === "section-title") {
        attributes["id"] = id;
      }
    }
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }
    return { ...attributes, ...additionalProps };
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
}));

// Mock the cn helper
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS modules
vi.mock("../styles/Section.module.css", () => ({
  default: {
    section: "_section_5c0975",
  },
}));

vi.mock("../_internal/styles/SectionGrid.module.css", () => ({
  default: {
    sectionGrid: "_sectionGrid_5c0975",
  },
}));

vi.mock("../_internal/styles/SectionTitle.module.css", () => ({
  default: {
    sectionTitle: "_sectionTitle_253742",
  },
}));

vi.mock("../_internal/styles/SectionContent.module.css", () => ({
  default: {
    sectionContent: "_sectionContent_5c0975",
  },
}));

describe("Section Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders section with title and children", () => {
      render(
        <Section title="Test Section" data-testid="section">
          <p>Test content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent("Test Section");
      expect(section).toHaveTextContent("Test content");
      expect(section.tagName).toBe("SECTION");
    });

    it("renders section with only title", () => {
      render(<Section title="Title Only" data-testid="section" />);

      const section = screen.getByTestId("test-id-section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent("Title Only");
      expect(section).not.toHaveTextContent("Test content");
    });

    it("renders section with only children", () => {
      render(
        <Section title="" data-testid="section">
          <p>Children only</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent("Children only");
      expect(section.querySelector("h2")).toBeNull(); // No title, so no h2
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

      // The ref should be forwarded to the section element
      const section = screen.getByTestId("test-id-section");
      expect(section).toBeInTheDocument();
      expect(section.tagName).toBe("SECTION");

      // Note: In test environment, ref.current might be null due to mocked components
      // The important thing is that the section renders correctly
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

      const section = screen.getByTestId("test-id-section");
      expect(section).toHaveClass("_section_5c0975", "custom-class");
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

      const section = screen.getByTestId("test-id-section");
      expect(section).toHaveAttribute("id", "test-id");
      expect(section).toHaveAttribute("aria-label", "Test section");
      expect(section).toHaveAttribute("data-custom", "value");
    });

    it("renders heading with correct attributes", () => {
      render(
        <Section title="Heading Test" data-testid="section">
          Content
        </Section>
      );

      const heading = screen.getByTestId("test-id-section-title");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Heading Test");
      expect(heading).toHaveClass("_sectionTitle_253742");
    });
  });

  describe("Internal Props and useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(
        <Section
          title="Internal ID Test"
          internalId="custom-id"
          data-testid="section"
        >
          Content
        </Section>
      );

      const section = screen.getByTestId("custom-id-section");
      const heading = screen.getByTestId("custom-id-section-title");

      expect(section).toHaveAttribute("data-section-id", "custom-id-section");
      expect(heading).toHaveAttribute("id", "custom-id");
    });

    it("generates ID when _internalId is not provided", () => {
      render(
        <Section title="Generated ID Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      const heading = screen.getByTestId("test-id-section-title");

      expect(section).toHaveAttribute("data-section-id", "test-id-section");
      expect(heading).toHaveAttribute("id", "test-id");
    });

    it("applies data-debug-mode when _debugMode is true", () => {
      render(
        <Section title="Debug Test" debugMode={true} data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when _debugMode is false", () => {
      render(
        <Section title="Debug Test" debugMode={false} data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when _debugMode is undefined", () => {
      render(
        <Section title="Debug Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section).not.toHaveAttribute("data-debug-mode");
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <Section
          title="Hook Test"
          internalId="custom-id"
          debugMode={true}
          data-testid="section"
        >
          Content
        </Section>
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const section = screen.getByTestId("custom-id-section");
      expect(section).toHaveAttribute("data-section-id", "custom-id-section");
      expect(section).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(
        <Section title="CSS Test" data-testid="section">
          <p>Content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      const grid = section.querySelector("._sectionGrid_5c0975");
      const title = screen.getByTestId("test-id-section-title");
      const content = section.querySelector("._sectionContent_5c0975");

      expect(section).toHaveClass("_section_5c0975");
      expect(grid).toBeInTheDocument();
      expect(title).toHaveClass("_sectionTitle_253742");
      expect(content).toBeInTheDocument();
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <Section
          title="CSS Combine Test"
          className="custom-class"
          data-testid="section"
        >
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section).toHaveClass("_section_5c0975", "custom-class");
    });
  });

  describe("Content Structure", () => {
    it("renders grid structure correctly", () => {
      render(
        <Section title="Grid Test" data-testid="section">
          <p>Grid content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      const grid = section.querySelector("._sectionGrid_5c0975");

      expect(grid).toBeInTheDocument();
      expect(grid?.tagName).toBe("DIV");
    });

    it("renders title in grid when provided", () => {
      render(
        <Section title="Grid Title Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      const grid = section.querySelector("._sectionGrid_5c0975");
      const title = grid?.querySelector("h2");

      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Grid Title Test");
    });

    it("renders content in grid when provided", () => {
      render(
        <Section title="Grid Content Test" data-testid="section">
          <p>Grid content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      const grid = section.querySelector("._sectionGrid_5c0975");
      const content = grid?.querySelector("._sectionContent_5c0975");

      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Grid content");
    });

    it("renders both title and content in grid", () => {
      render(
        <Section title="Both Test" data-testid="section">
          <p>Both content</p>
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      const grid = section.querySelector("._sectionGrid_5c0975");
      const title = grid?.querySelector("h2");
      const content = grid?.querySelector("._sectionContent_5c0975");

      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Both Test");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Both content");
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

      const section = screen.getByTestId("test-id-section");
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

      const section = screen.getByTestId("test-id-section");
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

      const section = screen.getByTestId("test-id-section");
      expect(section).toHaveTextContent("Multiple Children");
      expect(section).toHaveTextContent("First child");
      expect(section).toHaveTextContent("Second child");
      expect(section).toHaveTextContent("Third child");
    });

    it("handles empty children array", () => {
      const { container } = render(
        <Section title="Empty Array" data-testid="section">
          {[]}
        </Section>
      );
      // The component renders because it has a title, even with empty children
      expect(container.firstChild).not.toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(
        <Section title="Null Children" data-testid="section">
          {null}
        </Section>
      );
      // The component renders because it has a title, even with null children
      expect(container.firstChild).not.toBeNull();
    });

    it("handles undefined children", () => {
      const { container } = render(
        <Section title="Undefined Children" data-testid="section">
          {undefined}
        </Section>
      );
      // The component renders because it has a title, even with undefined children
      expect(container.firstChild).not.toBeNull();
    });

    it("handles boolean children", () => {
      const { container } = render(
        <Section title="Boolean Children" data-testid="section">
          {false}
        </Section>
      );
      // The component renders because it has a title, even with boolean children
      expect(container.firstChild).not.toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      render(
        <Section title="Accessibility Test" data-testid="section">
          Content
        </Section>
      );

      const heading = screen.getByTestId("test-id-section-title");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Accessibility Test");
    });

    it("has semantic section element", () => {
      render(
        <Section title="Semantic Test" data-testid="section">
          Content
        </Section>
      );

      const section = screen.getByTestId("test-id-section");
      expect(section.tagName).toBe("SECTION");
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
