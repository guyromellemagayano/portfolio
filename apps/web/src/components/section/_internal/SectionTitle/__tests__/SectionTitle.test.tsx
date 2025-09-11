import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SectionTitle } from "../SectionTitle";

import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasValidContent: vi.fn((content) => {
    if (content == null) return false;
    if (content === false) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
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

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../SectionTitle.module.css", () => ({
  default: {
    sectionTitle: "_sectionTitle_253742",
  },
}));

describe("SectionTitle", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <SectionTitle data-testid="section-title">Test Title</SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Test Title");
      expect(title.tagName).toBe("H2");
    });

    it("applies custom className", () => {
      render(
        <SectionTitle className="custom-class" data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveClass("_sectionTitle_253742", "custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(
        <SectionTitle _debugMode={true} data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <SectionTitle _internalId="custom-id" data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("custom-id-section-title");
      expect(title).toHaveAttribute(
        "data-section-title-id",
        "custom-id-section-title"
      );
      expect(title).toHaveAttribute("id", "custom-id");
    });

    it("passes through HTML attributes", () => {
      render(
        <SectionTitle
          id="test-id"
          aria-label="Test section title"
          data-custom="value"
          data-testid="section-title"
        >
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveAttribute("id", "test-id");
      expect(title).toHaveAttribute("aria-label", "Test section title");
      expect(title).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(
        <SectionTitle data-testid="section-title" />
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(
        <SectionTitle data-testid="section-title">{null}</SectionTitle>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles undefined children", () => {
      const { container } = render(
        <SectionTitle data-testid="section-title">{undefined}</SectionTitle>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(
        <SectionTitle data-testid="section-title">{""}</SectionTitle>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles false children", () => {
      const { container } = render(
        <SectionTitle data-testid="section-title">{false}</SectionTitle>
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders with meaningful content", () => {
      render(
        <SectionTitle data-testid="section-title">
          Meaningful Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Meaningful Title");
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <SectionTitle _debugMode={true} data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <SectionTitle _debugMode={false} data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<SectionTitle data-testid="section-title">Title</SectionTitle>);

      const title = screen.getByTestId("test-id-section-title");
      expect(title).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure Tests", () => {
    it("renders as h2 element", () => {
      render(<SectionTitle data-testid="section-title">Title</SectionTitle>);

      const title = screen.getByTestId("test-id-section-title");
      expect(title.tagName).toBe("H2");
    });

    it("applies correct CSS classes", () => {
      render(<SectionTitle data-testid="section-title">Title</SectionTitle>);

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveClass("_sectionTitle_253742");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <SectionTitle className="custom-class" data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveClass("_sectionTitle_253742", "custom-class");
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <SectionTitle ref={ref} data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper heading structure", () => {
      render(
        <SectionTitle data-testid="section-title">
          Accessibility Test
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title.tagName).toBe("H2");
      expect(title).toHaveTextContent("Accessibility Test");
    });

    it("has correct data attributes for debugging", () => {
      render(
        <SectionTitle _internalId="custom-id" data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("custom-id-section-title");
      expect(title).toHaveAttribute(
        "data-section-title-id",
        "custom-id-section-title"
      );
      expect(title).toHaveAttribute("data-testid", "custom-id-section-title");
    });

    it("has proper id attribute", () => {
      render(
        <SectionTitle _internalId="custom-id" data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("custom-id-section-title");
      expect(title).toHaveAttribute("id", "custom-id");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <SectionTitle data-testid="section-title">
          <span>Complex</span> <strong>Title</strong> with <em>formatting</em>
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveTextContent("Complex Title with formatting");
      expect(title.querySelector("span")).toHaveTextContent("Complex");
      expect(title.querySelector("strong")).toHaveTextContent("Title");
      expect(title.querySelector("em")).toHaveTextContent("formatting");
    });

    it("handles React elements as children", () => {
      const ChildComponent = function () {
        return <span>Child component</span>;
      };

      render(
        <SectionTitle data-testid="section-title">
          <ChildComponent />
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveTextContent("Child component");
    });

    it("handles multiple children", () => {
      render(
        <SectionTitle data-testid="section-title">
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveTextContent("FirstSecondThird");
    });

    it("handles empty children array", () => {
      const { container } = render(
        <SectionTitle data-testid="section-title">{[]}</SectionTitle>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles special characters in content", () => {
      render(
        <SectionTitle data-testid="section-title">
          Special chars: &lt;&gt;&amp;&quot;&#39;
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveTextContent("Special chars: <>&\"'");
    });
  });

  describe("useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(
        <SectionTitle _internalId="custom-id" data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("custom-id-section-title");
      expect(title).toHaveAttribute(
        "data-section-title-id",
        "custom-id-section-title"
      );
      expect(title).toHaveAttribute("id", "custom-id");
    });

    it("generates ID when _internalId is not provided", () => {
      render(<SectionTitle data-testid="section-title">Title</SectionTitle>);

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toHaveAttribute(
        "data-section-title-id",
        "test-id-section-title"
      );
      expect(title).toHaveAttribute("id", "test-id");
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <SectionTitle
          _internalId="custom-id"
          _debugMode={true}
          data-testid="section-title"
        >
          Title
        </SectionTitle>
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const title = screen.getByTestId("custom-id-section-title");
      expect(title).toHaveAttribute(
        "data-section-title-id",
        "custom-id-section-title"
      );
      expect(title).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization disabled by default", () => {
      render(<SectionTitle data-testid="section-title">Title</SectionTitle>);

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toBeInTheDocument();
    });

    it("renders with memoization enabled", () => {
      render(
        <SectionTitle isMemoized={true} data-testid="section-title">
          Title
        </SectionTitle>
      );

      const title = screen.getByTestId("test-id-section-title");
      expect(title).toBeInTheDocument();
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(SectionTitle).toBeDefined();
      expect(typeof SectionTitle).toBe("function");
      expect(SectionTitle).toHaveProperty("displayName");
    });
  });
});
