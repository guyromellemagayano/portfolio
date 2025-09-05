import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardDescription } from "../CardDescription";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "generated-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (
      children === null ||
      children === undefined ||
      children === "" ||
      children === true ||
      children === false ||
      children === 0
    ) {
      return false;
    }
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS modules
vi.mock("../CardDescription.module.css", () => ({
  default: {
    cardDescription: "cardDescription",
  },
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

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardDescription aria-label="Description">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
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
      const { container } = render(<CardDescription>{true}</CardDescription>);
      expect(container.firstChild).toBeNull();
    });

    it("handles number children", () => {
      const { container } = render(<CardDescription>{0}</CardDescription>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <CardDescription _internalId="custom-id" _debugMode={true}>
          Card description
        </CardDescription>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        internalId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<CardDescription>Card description</CardDescription>);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        internalId: undefined,
        debugMode: undefined,
      });
    });

    it("passes generated ID to base component", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveAttribute(
        "data-card-description-id",
        "generated-id-card-description"
      );
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: true,
      });

      render(
        <CardDescription _debugMode={true}>Card description</CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: false,
      });

      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<CardDescription>Card description</CardDescription>);

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(
        <CardDescription isMemoized={true}>Card description</CardDescription>
      );

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(
        <CardDescription isMemoized={false}>Card description</CardDescription>
      );

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as p element", () => {
      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement.tagName).toBe("P");
    });

    it("applies correct CSS classes", () => {
      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveClass("cardDescription");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <CardDescription className="custom-class">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveClass("cardDescription", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveAttribute(
        "data-card-description-id",
        "generated-id-card-description"
      );
    });

    it("renders with custom internal ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "custom-id",
        isDebugMode: false,
      });

      render(
        <CardDescription _internalId="custom-id">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveAttribute(
        "data-card-description-id",
        "custom-id-card-description"
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
        id: "multi-prop-id",
        isDebugMode: true,
      });

      render(
        <CardDescription
          _internalId="multi-prop-id"
          _debugMode={true}
          isMemoized={true}
          className="multi-class"
          aria-label="Multi prop test"
        >
          Multi prop test
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveClass("multi-class");
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
      expect(descriptionElement).toHaveAttribute(
        "data-card-description-id",
        "multi-prop-id-card-description"
      );
      expect(descriptionElement).toHaveAttribute(
        "aria-label",
        "Multi prop test"
      );
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});
