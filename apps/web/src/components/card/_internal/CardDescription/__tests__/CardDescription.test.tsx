import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardDescription } from "../CardDescription";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

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
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer" };
    }
    return {};
  }),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date().getFullYear().toString();
    }
    return date.toISOString();
  }),
  createCompoundComponent: vi.fn((displayName, component) => {
    component.displayName = displayName;
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
        <CardDescription data-testid="custom-testid" aria-label="Description">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId("custom-testid");
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
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <CardDescription _debugMode={true}>Card description</CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardDescription>Card description</CardDescription>);

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).not.toHaveAttribute("data-debug-mode");
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
    it("renders with custom internal ID", () => {
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

    it("uses provided internalId when available", () => {
      render(
        <CardDescription _internalId="test-id">
          Card description
        </CardDescription>
      );

      const descriptionElement = screen.getByTestId("card-description-root");
      expect(descriptionElement).toHaveAttribute(
        "data-card-description-id",
        "test-id-card-description"
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

    it("handles boolean children", () => {
      const { container } = render(<CardDescription>{true}</CardDescription>);
      expect(container.firstChild).toBeNull();
    });

    it("handles number children", () => {
      const { container } = render(<CardDescription>{0}</CardDescription>);
      expect(container.firstChild).toBeNull();
    });
  });
});
