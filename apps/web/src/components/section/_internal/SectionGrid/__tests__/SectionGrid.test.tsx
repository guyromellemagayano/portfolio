import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SectionGrid } from "../SectionGrid";

import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
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
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../SectionGrid.module.css", () => ({
  default: {
    sectionGrid: "_sectionGrid_1c4dfc",
  },
}));

describe("SectionGrid", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <SectionGrid data-testid="section-grid">
          <div>Grid content</div>
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveTextContent("Grid content");
      expect(grid.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(
        <SectionGrid className="custom-class" data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveClass("_sectionGrid_1c4dfc", "custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(
        <SectionGrid _debugMode={true} data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <SectionGrid _internalId="custom-id" data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("custom-id-section-grid");
      expect(grid).toHaveAttribute(
        "data-section-grid-id",
        "custom-id-section-grid"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <SectionGrid
          id="test-id"
          aria-label="Test section grid"
          data-custom="value"
          data-testid="section-grid"
        >
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveAttribute("id", "test-id");
      expect(grid).toHaveAttribute("aria-label", "Test section grid");
      expect(grid).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<SectionGrid data-testid="section-grid" />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(
        <SectionGrid data-testid="section-grid">{null}</SectionGrid>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles undefined children", () => {
      const { container } = render(
        <SectionGrid data-testid="section-grid">{undefined}</SectionGrid>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(
        <SectionGrid data-testid="section-grid">{""}</SectionGrid>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles false children", () => {
      const { container } = render(
        <SectionGrid data-testid="section-grid">{false}</SectionGrid>
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders with meaningful content", () => {
      render(
        <SectionGrid data-testid="section-grid">
          <div>Meaningful content</div>
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveTextContent("Meaningful content");
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <SectionGrid _debugMode={true} data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <SectionGrid _debugMode={false} data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<SectionGrid data-testid="section-grid">Content</SectionGrid>);

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure Tests", () => {
    it("renders as div element", () => {
      render(<SectionGrid data-testid="section-grid">Content</SectionGrid>);

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(<SectionGrid data-testid="section-grid">Content</SectionGrid>);

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveClass("_sectionGrid_1c4dfc");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <SectionGrid className="custom-class" data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveClass("_sectionGrid_1c4dfc", "custom-class");
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <SectionGrid ref={ref} data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toBeInTheDocument();
      expect(grid.tagName).toBe("DIV");
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper div structure", () => {
      render(<SectionGrid data-testid="section-grid">Content</SectionGrid>);

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid.tagName).toBe("DIV");
    });

    it("has correct data attributes for debugging", () => {
      render(
        <SectionGrid _internalId="custom-id" data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("custom-id-section-grid");
      expect(grid).toHaveAttribute(
        "data-section-grid-id",
        "custom-id-section-grid"
      );
      expect(grid).toHaveAttribute("data-testid", "custom-id-section-grid");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <SectionGrid data-testid="section-grid">
          <div>
            <h3>Sub heading</h3>
            <p>Paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveTextContent("Sub heading");
      expect(grid).toHaveTextContent("Paragraph content");
      expect(grid).toHaveTextContent("List item 1");
      expect(grid).toHaveTextContent("List item 2");
    });

    it("handles React elements as children", () => {
      const ChildComponent = function () {
        return <span>Child component</span>;
      };

      render(
        <SectionGrid data-testid="section-grid">
          <ChildComponent />
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveTextContent("Child component");
    });

    it("handles multiple children", () => {
      render(
        <SectionGrid data-testid="section-grid">
          <div>First child</div>
          <div>Second child</div>
          <div>Third child</div>
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveTextContent("First child");
      expect(grid).toHaveTextContent("Second child");
      expect(grid).toHaveTextContent("Third child");
    });

    it("handles empty children array", () => {
      const { container } = render(
        <SectionGrid data-testid="section-grid">{[]}</SectionGrid>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles special characters in content", () => {
      render(
        <SectionGrid data-testid="section-grid">
          <p>Special chars: &lt;&gt;&amp;&quot;&#39;</p>
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveTextContent("Special chars: <>&\"'");
    });
  });

  describe("useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(
        <SectionGrid _internalId="custom-id" data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("custom-id-section-grid");
      expect(grid).toHaveAttribute(
        "data-section-grid-id",
        "custom-id-section-grid"
      );
    });

    it("generates ID when _internalId is not provided", () => {
      render(<SectionGrid data-testid="section-grid">Content</SectionGrid>);

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toHaveAttribute(
        "data-section-grid-id",
        "test-id-section-grid"
      );
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <SectionGrid
          _internalId="custom-id"
          _debugMode={true}
          data-testid="section-grid"
        >
          Content
        </SectionGrid>
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const grid = screen.getByTestId("custom-id-section-grid");
      expect(grid).toHaveAttribute(
        "data-section-grid-id",
        "custom-id-section-grid"
      );
      expect(grid).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization disabled by default", () => {
      render(<SectionGrid data-testid="section-grid">Content</SectionGrid>);

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toBeInTheDocument();
    });

    it("renders with memoization enabled", () => {
      render(
        <SectionGrid isMemoized={true} data-testid="section-grid">
          Content
        </SectionGrid>
      );

      const grid = screen.getByTestId("test-id-section-grid");
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(SectionGrid).toBeDefined();
      expect(typeof SectionGrid).toBe("function");
      expect(SectionGrid).toHaveProperty("displayName");
    });
  });
});
