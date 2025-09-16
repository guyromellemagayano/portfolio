import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SectionContent } from "../SectionContent";

import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("@guyromellemagayano/components", () => ({}));

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
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

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../styles/SectionContent.module.css", () => ({
  default: {
    sectionContent: "_sectionContent_5c0975",
  },
}));

describe("SectionContent", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <SectionContent data-testid="section-content">
          <p>Test content</p>
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Test content");
      expect(content.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(
        <SectionContent className="custom-class" data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveClass("_sectionContent_5c0975", "custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(
        <SectionContent _debugMode={true} data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <SectionContent _internalId="custom-id" data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("custom-id-section-content");
      expect(content).toHaveAttribute(
        "data-section-content-id",
        "custom-id-section-content"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <SectionContent
          id="test-id"
          aria-label="Test section content"
          data-custom="value"
          data-testid="section-content"
        >
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveAttribute("id", "test-id");
      expect(content).toHaveAttribute("aria-label", "Test section content");
      expect(content).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(
        <SectionContent data-testid="section-content" />
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(
        <SectionContent data-testid="section-content">{null}</SectionContent>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles undefined children", () => {
      const { container } = render(
        <SectionContent data-testid="section-content">
          {undefined}
        </SectionContent>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(
        <SectionContent data-testid="section-content">{""}</SectionContent>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles false children", () => {
      const { container } = render(
        <SectionContent data-testid="section-content">{false}</SectionContent>
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders with meaningful content", () => {
      render(
        <SectionContent data-testid="section-content">
          <p>Meaningful content</p>
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Meaningful content");
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <SectionContent _debugMode={true} data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <SectionContent _debugMode={false} data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(
        <SectionContent data-testid="section-content">Content</SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure Tests", () => {
    it("renders as div element", () => {
      render(
        <SectionContent data-testid="section-content">Content</SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(
        <SectionContent data-testid="section-content">Content</SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveClass("_sectionContent_5c0975");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <SectionContent className="custom-class" data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveClass("_sectionContent_5c0975", "custom-class");
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <SectionContent ref={ref} data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toBeInTheDocument();
      expect(content.tagName).toBe("DIV");
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper div structure", () => {
      render(
        <SectionContent data-testid="section-content">Content</SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content.tagName).toBe("DIV");
    });

    it("has correct data attributes for debugging", () => {
      render(
        <SectionContent _internalId="custom-id" data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("custom-id-section-content");
      expect(content).toHaveAttribute(
        "data-section-content-id",
        "custom-id-section-content"
      );
      expect(content).toHaveAttribute(
        "data-testid",
        "custom-id-section-content"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <SectionContent data-testid="section-content">
          <div>
            <h3>Sub heading</h3>
            <p>Paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveTextContent("Sub heading");
      expect(content).toHaveTextContent("Paragraph content");
      expect(content).toHaveTextContent("List item 1");
      expect(content).toHaveTextContent("List item 2");
    });

    it("handles React elements as children", () => {
      const ChildComponent = function () {
        return <span>Child component</span>;
      };

      render(
        <SectionContent data-testid="section-content">
          <ChildComponent />
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveTextContent("Child component");
    });

    it("handles multiple children", () => {
      render(
        <SectionContent data-testid="section-content">
          <p>First child</p>
          <p>Second child</p>
          <p>Third child</p>
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveTextContent("First child");
      expect(content).toHaveTextContent("Second child");
      expect(content).toHaveTextContent("Third child");
    });

    it("handles empty children array", () => {
      const { container } = render(
        <SectionContent data-testid="section-content">{[]}</SectionContent>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles special characters in content", () => {
      render(
        <SectionContent data-testid="section-content">
          <p>Special chars: &lt;&gt;&amp;&quot;&#39;</p>
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveTextContent("Special chars: <>&\"'");
    });
  });

  describe("useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(
        <SectionContent _internalId="custom-id" data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("custom-id-section-content");
      expect(content).toHaveAttribute(
        "data-section-content-id",
        "custom-id-section-content"
      );
    });

    it("generates ID when _internalId is not provided", () => {
      render(
        <SectionContent data-testid="section-content">Content</SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toHaveAttribute(
        "data-section-content-id",
        "test-id-section-content"
      );
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <SectionContent
          _internalId="custom-id"
          _debugMode={true}
          data-testid="section-content"
        >
          Content
        </SectionContent>
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const content = screen.getByTestId("custom-id-section-content");
      expect(content).toHaveAttribute(
        "data-section-content-id",
        "custom-id-section-content"
      );
      expect(content).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization disabled by default", () => {
      render(
        <SectionContent data-testid="section-content">Content</SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toBeInTheDocument();
    });

    it("renders with memoization enabled", () => {
      render(
        <SectionContent isMemoized={true} data-testid="section-content">
          Content
        </SectionContent>
      );

      const content = screen.getByTestId("test-id-section-content");
      expect(content).toBeInTheDocument();
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(SectionContent).toBeDefined();
      expect(typeof SectionContent).toBe("function");
      expect(SectionContent).toHaveProperty("displayName");
    });
  });
});
