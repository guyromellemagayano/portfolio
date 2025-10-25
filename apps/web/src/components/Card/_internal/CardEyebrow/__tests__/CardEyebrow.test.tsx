import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardEyebrow } from "../CardEyebrow";

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

describe("CardEyebrow", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<CardEyebrow className="custom-class">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<CardEyebrow aria-label="Eyebrow">Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute("aria-label", "Eyebrow");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardEyebrow />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardEyebrow>{null}</CardEyebrow>);
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(<CardEyebrow>{""}</CardEyebrow>);
      expect(container.firstChild).toBeNull();
    });

    it("handles boolean children", () => {
      render(<CardEyebrow>{true}</CardEyebrow>);
      // Boolean true is not rendered as text content in React
      expect(
        screen.getByTestId("test-id-card-eyebrow-root")
      ).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<CardEyebrow>{0}</CardEyebrow>);
      // Component returns null for falsy children like 0
      expect(container.firstChild).toBeNull();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <CardEyebrow debugId="custom-id" debugMode={true}>
          Eyebrow text
        </CardEyebrow>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

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

      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("generated-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-testid",
        "generated-id-card-eyebrow-root"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: true,
      });

      render(<CardEyebrow debugMode={true}>Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<CardEyebrow>Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<CardEyebrow isMemoized={true}>Eyebrow text</CardEyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<CardEyebrow isMemoized={false}>Eyebrow text</CardEyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as p element", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow.tagName).toBe("P");
    });

    it("applies correct CSS classes", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500"
      );
    });

    it("combines Tailwind + custom classes", () => {
      render(<CardEyebrow className="custom-class">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500",
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

      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("generated-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-testid",
        "generated-id-card-eyebrow-root"
      );
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(<CardEyebrow debugId="custom-id">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("custom-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-testid",
        "custom-id-card-eyebrow-root"
      );
    });
  });

  describe("Decorative Styling", () => {
    it("renders with decoration when decorate is true", () => {
      render(<CardEyebrow decorate>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass("pl-3.5");
    });

    it("does not apply decoration when decorate is false", () => {
      render(<CardEyebrow decorate={false}>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).not.toHaveClass("pl-3.5");
    });

    it("does not apply decoration when decorate is undefined", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).not.toHaveClass("pl-3.5");
    });
  });

  describe("DateTime Functionality", () => {
    it("renders with time element when dateTime is provided", () => {
      render(<CardEyebrow dateTime="2023-01-01">January 1, 2023</CardEyebrow>);

      const timeElement = screen.getByText("January 1, 2023");
      expect(timeElement.tagName).toBe("TIME");
      expect(timeElement).toHaveAttribute("datetime", "2023-01-01");
    });

    it("renders without time element when dateTime is not provided", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow.tagName).toBe("P");
      expect(eyebrow).toHaveTextContent("Eyebrow text");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardEyebrow ref={ref}>Eyebrow text</CardEyebrow>);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardEyebrow ref={ref}>Eyebrow text</CardEyebrow>);

      expect(ref.current?.tagName).toBe("P");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardEyebrow>
          <span>Featured</span> <strong>content</strong>
        </CardEyebrow>
      );

      expect(screen.getByText("Featured")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardEyebrow>Special chars: &lt;&gt;&amp;</CardEyebrow>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(<CardEyebrow>{true}</CardEyebrow>);
      // Boolean true is not rendered as text content in React
      expect(
        screen.getByTestId("test-id-card-eyebrow-root")
      ).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<CardEyebrow>{0}</CardEyebrow>);
      // Component returns null for falsy children like 0
      expect(container.firstChild).toBeNull();
    });

    it("combines decoration with custom className", () => {
      render(
        <CardEyebrow decorate className="custom-class">
          Eyebrow text
        </CardEyebrow>
      );

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500",
        "pl-3.5",
        "custom-class"
      );
    });

    it("handles multiple props together", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "multi-prop-id",
        isDebugMode: true,
      });

      render(
        <CardEyebrow
          debugId="multi-prop-id"
          debugMode={true}
          isMemoized={true}
          decorate={true}
          dateTime="2023-01-01"
          className="multi-class"
          aria-label="Multi prop test"
        >
          Multi prop test
        </CardEyebrow>
      );

      const eyebrow = screen.getByTestId("multi-prop-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500",
        "pl-3.5",
        "multi-class"
      );
      expect(eyebrow).toHaveAttribute("data-debug-mode", "true");
      expect(eyebrow).toHaveAttribute(
        "data-testid",
        "multi-prop-id-card-eyebrow-root"
      );
      expect(eyebrow).toHaveAttribute("aria-label", "Multi prop test");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();

      const timeElement = screen.getByText("Multi prop test");
      expect(timeElement.tagName).toBe("TIME");
      expect(timeElement).toHaveAttribute("datetime", "2023-01-01");
    });
  });
});
