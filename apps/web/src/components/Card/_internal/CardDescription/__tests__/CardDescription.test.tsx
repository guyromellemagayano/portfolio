// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardDescription, MemoizedCardDescription } from "../CardDescription";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("CardDescription", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardDescription>Card description</CardDescription>);

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <CardDescription className="custom-class">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardDescription aria-label="Description">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute("aria-label", "Description");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardDescription />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardDescription>{null}</CardDescription>);
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(<CardDescription>{""}</CardDescription>);
      expect(container.firstChild).toBeNull();
    });

    it("handles boolean children", () => {
      render(<CardDescription>{true}</CardDescription>);
      // Boolean true is truthy, so component renders
      expect(
        screen.getByTestId("test-id-card-description-root")
      ).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<CardDescription>{0}</CardDescription>);
      // Component uses !children check, so 0 is falsy
      expect(container.firstChild).toBeNull();
    });

    it("renders with valid children", () => {
      render(<CardDescription>Valid content</CardDescription>);
      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <CardDescription debugId="custom-id" debugMode={true}>
          Card description
        </CardDescription>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<CardDescription>Card description</CardDescription>);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: undefined,
      });
    });

    it("passes generated ID to base component", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "generated-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "generated-id-card-description-root"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: true,
      });

      render(
        <CardDescription debugMode={true}>Card description</CardDescription>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("CardDescription renders without memoization by default", () => {
      render(<CardDescription>Card description</CardDescription>);

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("MemoizedCardDescription renders with memoization", () => {
      render(
        <MemoizedCardDescription>Memoized description</MemoizedCardDescription>
      );

      expect(screen.getByText("Memoized description")).toBeInTheDocument();
    });

    it("MemoizedCardDescription maintains memoization across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedCardDescription>
          <div>Memoized content</div>
        </MemoizedCardDescription>
      );

      const initialElement = screen.getByText("Memoized content");

      // Re-render with same props
      rerender(
        <MemoizedCardDescription>
          <div>Memoized content</div>
        </MemoizedCardDescription>
      );

      const rerenderedElement = screen.getByText("Memoized content");
      expect(rerenderedElement).toBe(initialElement);
    });

    it("CardDescription creates new elements on re-render (no memoization)", () => {
      const { rerender } = render(
        <CardDescription>
          <div>Non-memoized content</div>
        </CardDescription>
      );

      expect(screen.getByText("Non-memoized content")).toBeInTheDocument();

      // Re-render with same props
      rerender(
        <CardDescription>
          <div>Non-memoized content</div>
        </CardDescription>
      );

      expect(screen.getByText("Non-memoized content")).toBeInTheDocument();
    });

    it("MemoizedCardDescription re-renders when props change", () => {
      const { rerender } = render(
        <MemoizedCardDescription>
          <div>Initial content</div>
        </MemoizedCardDescription>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different props
      rerender(
        <MemoizedCardDescription>
          <div>Updated content</div>
        </MemoizedCardDescription>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });

    it("both CardDescription and MemoizedCardDescription render with same props", () => {
      render(
        <>
          <CardDescription>Regular description</CardDescription>
          <MemoizedCardDescription>
            Memoized description
          </MemoizedCardDescription>
        </>
      );

      expect(screen.getByText("Regular description")).toBeInTheDocument();
      expect(screen.getByText("Memoized description")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement.tagName).toBe("P");
    });

    it("renders as custom element when as prop is provided", () => {
      render(<CardDescription as="div">Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement.tagName).toBe("DIV");
    });

    it("renders as span element when as prop is span", () => {
      render(<CardDescription as="span">Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement.tagName).toBe("SPAN");
    });

    it("applies correct CSS classes", () => {
      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "text-sm",
        "text-zinc-600",
        "dark:text-zinc-400"
      );
    });

    it("combines Tailwind + custom classes", () => {
      render(
        <CardDescription className="custom-class">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "text-sm",
        "text-zinc-600",
        "dark:text-zinc-400",
        "custom-class"
      );
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId(
        "generated-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "generated-id-card-description-root"
      );
    });

    it("renders with custom debugId", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(
        <CardDescription debugId="custom-id">Card description</CardDescription>
      );

      const descriptionElement = screen.getByTestId(
        "custom-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-description-root"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref}>Card description</CardDescription>);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref}>Card description</CardDescription>);

      expect(ref.current?.tagName).toBe("P");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardDescription>
          <strong>Bold</strong> and <em>italic</em> text
        </CardDescription>
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardDescription>Special chars: &lt;&gt;&amp;</CardDescription>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles multiple props together", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "multi-prop-id",
        isDebugMode: true,
      });

      render(
        <CardDescription
          debugId="multi-prop-id"
          debugMode={true}
          className="multi-class"
          aria-label="Multi prop test"
        >
          Multi prop test
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId(
        "multi-prop-id-card-description-root"
      );
      expect(descriptionElement).toHaveClass("multi-class");
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "multi-prop-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "aria-label",
        "Multi prop test"
      );
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});
