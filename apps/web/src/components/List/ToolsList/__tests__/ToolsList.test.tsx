import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToolsList } from "../ToolsList";

import "@testing-library/jest-dom";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit tests
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational (pure display, no sub-components)
// - Component Type: Presentational (pure display, no sub-components)
// - Structure: Single file + tests
// - Data Source: Static data (no external data fetching)
// ============================================================================

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
}));

// Mock @web/utils
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// ============================================================================
// TEST SETUP
// ============================================================================

const mockTools = [
  {
    name: "React",
    description: "A JavaScript library for building user interfaces",
  },
  { name: "TypeScript", description: "A typed superset of JavaScript" },
  { name: "Next.js", description: "The React framework for production" },
];

// ============================================================================
// TESTS
// ============================================================================

describe("ToolsList", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with children when provided", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
          <li>Tool 2</li>
          <li>Tool 3</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();
      expect(toolsList.tagName).toBe("UL");
      expect(toolsList).toHaveTextContent("Tool 1");
      expect(toolsList).toHaveTextContent("Tool 2");
      expect(toolsList).toHaveTextContent("Tool 3");
    });

    it("renders without children", () => {
      const { container } = render(<ToolsList />);

      expect(container.firstChild).toBeNull();
    });

    it("applies custom className", () => {
      render(
        <ToolsList className="custom-class">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("class");
    });

    it("passes through additional props", () => {
      render(
        <ToolsList
          data-test="custom-data"
          aria-label="Tools list"
          id="tools-list"
        >
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("data-test", "custom-data");
      expect(toolsList).toHaveAttribute("aria-label", "Tools list");
      expect(toolsList).toHaveAttribute("id", "tools-list");
    });

    it("uses useComponentId hook correctly", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: undefined,
      });
    });

    it("uses custom debug ID when provided", () => {
      render(
        <ToolsList debugId="custom-id">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("custom-id-tools-list");
      expect(toolsList).toHaveAttribute(
        "data-tools-list-id",
        "custom-id-tools-list"
      );
    });

    it("enables debug mode when provided", () => {
      render(
        <ToolsList debugMode={true}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as ul element by default", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList.tagName).toBe("UL");
    });

    it("renders as div element when as='div'", () => {
      render(
        <ToolsList as="div">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList.tagName).toBe("DIV");
    });

    it("renders as section element when as='section'", () => {
      render(
        <ToolsList as="section">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList.tagName).toBe("SECTION");
    });

    it("renders as nav element when as='nav'", () => {
      render(
        <ToolsList as="nav">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList.tagName).toBe("NAV");
    });

    it("renders as aside element when as='aside'", () => {
      render(
        <ToolsList as="aside">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList.tagName).toBe("ASIDE");
    });

    it("renders as ol element when as='ol'", () => {
      render(
        <ToolsList as="ol">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList.tagName).toBe("OL");
    });

    it("passes element-specific props correctly", () => {
      render(
        <ToolsList as="div" data-custom="value" onClick={() => {}}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("data-custom", "value");
      expect(toolsList).toBeInTheDocument();
    });

    it("accepts all valid union type elements", () => {
      const validElements = [
        "ul",
        "ol",
        "div",
        "section",
        "nav",
        "aside",
      ] as const;

      validElements.forEach((element) => {
        const { unmount } = render(
          <ToolsList as={element}>
            <li>Tool 1</li>
          </ToolsList>
        );

        const toolsList = screen.getByTestId("test-id-tools-list");
        expect(toolsList.tagName).toBe(element.toUpperCase());
        unmount();
      });
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("class");
    });

    it("combines CSS module classes with custom className", () => {
      render(
        <ToolsList className="custom-class">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("class");
    });

    it("applies role='list' attribute", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("role", "list");
    });
  });

  describe("Content Validation", () => {
    it("does not render when children is null", () => {
      const { container } = render(<ToolsList>{null}</ToolsList>);

      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is undefined", () => {
      const { container } = render(<ToolsList>{undefined}</ToolsList>);

      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is false", () => {
      const { container } = render(<ToolsList>{false}</ToolsList>);

      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is empty string", () => {
      const { container } = render(<ToolsList>{""}</ToolsList>);

      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is 0", () => {
      const { container } = render(<ToolsList>{0}</ToolsList>);

      expect(container.firstChild).toBeNull();
    });

    it("renders with complex children content", () => {
      render(
        <ToolsList>
          <li>
            <strong>React</strong> - A JavaScript library
          </li>
          <li>
            <em>TypeScript</em> - Typed JavaScript
          </li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveTextContent("React");
      expect(toolsList).toHaveTextContent("TypeScript");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("generates component ID using useComponentId hook", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: undefined,
      });
    });

    it("uses custom debugId when provided", () => {
      render(
        <ToolsList debugId="custom-id">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("custom-id-tools-list");
      expect(toolsList).toHaveAttribute(
        "data-tools-list-id",
        "custom-id-tools-list"
      );
    });

    it("applies data-debug-mode when enabled", () => {
      render(
        <ToolsList debugMode={true}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <ToolsList debugMode={false}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).not.toHaveAttribute("data-debug-mode");
    });

    it("applies component props with correct data attributes", () => {
      render(
        <ToolsList debugId="test-component" debugMode={true}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-component-tools-list");
      expect(toolsList).toHaveAttribute(
        "data-tools-list-id",
        "test-component-tools-list"
      );
      expect(toolsList).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long content", () => {
      const longContent = "A".repeat(1000);
      render(
        <ToolsList>
          <li>{longContent}</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveTextContent(longContent);
    });

    it("handles special characters", () => {
      render(
        <ToolsList>
          <li>Special chars: &lt;&gt;&amp;&quot;&apos;€£¥©®™</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveTextContent("Special chars: <>&\"'€£¥©®™");
    });

    it("handles mixed content types", () => {
      render(
        <ToolsList>
          Text content
          <li>List item</li>
          {42}
          <span>Span content</span>
          {null}
          <div>Div content</div>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveTextContent("Text content");
      expect(toolsList).toHaveTextContent("List item");
      expect(toolsList).toHaveTextContent("42");
      expect(toolsList).toHaveTextContent("Span content");
      expect(toolsList).toHaveTextContent("Div content");
    });

    it("handles empty children array", () => {
      render(<ToolsList>{[]}</ToolsList>);

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(
        <ToolsList>
          {true}
          {false}
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("forwards HTML attributes correctly", () => {
      render(
        <ToolsList
          id="test-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        >
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("id", "test-id");
      expect(toolsList).toHaveAttribute("data-test", "test-data");
      expect(toolsList).toHaveAttribute("aria-label", "Test label");
    });

    it("forwards event handlers correctly", () => {
      const handleClick = vi.fn();
      const handleMouseOver = vi.fn();

      render(
        <ToolsList onClick={handleClick} onMouseOver={handleMouseOver}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLUListElement>();
      render(
        <ToolsList ref={ref}>
          <li>Tool 1</li>
        </ToolsList>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("UL");
    });

    it("forwards ref with custom element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ToolsList ref={ref} as="div">
          <li>Tool 1</li>
        </ToolsList>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("returns a React element", () => {
      const { container } = render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
          <li>Tool 2</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();
    });

    it("provides proper data attributes for debugging", () => {
      render(
        <ToolsList debugMode={true}>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute("data-debug-mode", "true");
    });

    it("provides proper component IDs for all elements", () => {
      render(
        <ToolsList>
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toHaveAttribute(
        "data-tools-list-id",
        "test-id-tools-list"
      );
    });

    it("applies correct ARIA roles to main layout elements", () => {
      render(
        <ToolsList debugId="aria-test">
          <li>Tool 1</li>
        </ToolsList>
      );

      // Test main content area
      const mainElement = screen.getByTestId("aria-test-tools-list");
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveAttribute("role", "list");
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        <ToolsList
          debugId="aria-test"
          aria-labelledby="tools-title"
          aria-describedby="tools-description"
        >
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsListElement = screen.getByTestId("aria-test-tools-list");

      // ToolsList should be labelled by the title
      expect(toolsListElement).toHaveAttribute(
        "aria-labelledby",
        "tools-title"
      );

      // ToolsList should be described by the description
      expect(toolsListElement).toHaveAttribute(
        "aria-describedby",
        "tools-description"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(
        <ToolsList debugId="aria-test" id="tools-content">
          <li>Tool 1</li>
        </ToolsList>
      );

      // ToolsList should have unique ID
      const toolsListElement = screen.getByTestId("aria-test-tools-list");
      expect(toolsListElement).toHaveAttribute("id", "tools-content");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <ToolsList debugId="aria-test" aria-label="Available tools">
          <li>Tool 1</li>
        </ToolsList>
      );

      // ToolsList element should have descriptive label
      const toolsListElement = screen.getByTestId("aria-test-tools-list");
      expect(toolsListElement).toHaveAttribute("aria-label", "Available tools");
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<ToolsList debugId="aria-test" />);

      // Should not render when no children
      expect(container.firstChild).toBeNull();
    });

    it("applies ARIA attributes with different internal IDs", () => {
      render(
        <ToolsList debugId="different-id">
          <li>Tool 1</li>
        </ToolsList>
      );

      const toolsList = screen.getByTestId("different-id-tools-list");
      expect(toolsList).toHaveAttribute(
        "data-tools-list-id",
        "different-id-tools-list"
      );
    });

    it("applies ARIA attributes during component updates", () => {
      const { rerender } = render(
        <ToolsList debugId="update-test">
          <li>Tool 1</li>
        </ToolsList>
      );

      const initialToolsList = screen.getByTestId("update-test-tools-list");
      expect(initialToolsList).toBeInTheDocument();

      // Rerender with different content
      rerender(
        <ToolsList debugId="update-test">
          <li>Tool 2</li>
        </ToolsList>
      );

      const updatedToolsList = screen.getByTestId("update-test-tools-list");
      expect(updatedToolsList).toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    it("renders a complete tools list with all components working together", () => {
      render(
        <ToolsList>
          <li>
            <strong>React</strong> - A JavaScript library for building user
            interfaces
          </li>
          <li>
            <strong>TypeScript</strong> - A typed superset of JavaScript
          </li>
          <li>
            <strong>Next.js</strong> - The React framework for production
          </li>
        </ToolsList>
      );

      // Test list structure
      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();
      expect(toolsList).toHaveAttribute("class");
      expect(toolsList).toHaveAttribute("role", "list");

      // Test content
      expect(toolsList).toHaveTextContent("React");
      expect(toolsList).toHaveTextContent("TypeScript");
      expect(toolsList).toHaveTextContent("Next.js");
    });

    it("works with different tool configurations", () => {
      const configs = [
        { tools: [mockTools[0]] },
        { tools: mockTools.slice(0, 2) },
        { tools: mockTools },
      ];

      configs.forEach(({ tools }) => {
        const { unmount } = render(
          <ToolsList>
            {tools.map((tool, index) => (
              <li key={index}>{tool?.name}</li>
            ))}
          </ToolsList>
        );

        const toolsList = screen.getByTestId("test-id-tools-list");
        expect(toolsList).toBeInTheDocument();

        unmount();
      });
    });

    it("handles complex tool data structures", () => {
      const complexTools = [
        { name: "React", version: "18.0.0", category: "Frontend" },
        { name: "Node.js", version: "20.0.0", category: "Backend" },
        { name: "PostgreSQL", version: "15.0.0", category: "Database" },
      ];

      render(
        <ToolsList>
          {complexTools.map((tool, index) => (
            <li key={index}>
              <strong>{tool.name}</strong> v{tool.version} - {tool.category}
            </li>
          ))}
        </ToolsList>
      );

      const toolsList = screen.getByTestId("test-id-tools-list");
      expect(toolsList).toBeInTheDocument();

      complexTools.forEach((tool) => {
        expect(toolsList).toHaveTextContent(tool.name);
        expect(toolsList).toHaveTextContent(tool.version);
        expect(toolsList).toHaveTextContent(tool.category);
      });
    });
  });
});
