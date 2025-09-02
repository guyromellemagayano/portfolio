import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardEyebrow } from "../CardEyebrow";

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
vi.mock("../CardEyebrow.module.css", () => ({
  default: {
    cardEyebrow: "cardEyebrow",
    cardEyebrowDecorated: "cardEyebrowDecorated",
  },
}));

describe("CardEyebrow", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<CardEyebrow className="custom-class">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardEyebrow data-testid="custom-testid" aria-label="Eyebrow">
          Eyebrow text
        </CardEyebrow>
      );

      const eyebrow = screen.getByTestId("custom-testid");
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
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<CardEyebrow _debugMode={true}>Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardEyebrow>Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as p element", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow.tagName).toBe("P");
    });

    it("applies correct CSS classes", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveClass("cardEyebrow");
    });

    it("combines CSS module + custom classes", () => {
      render(<CardEyebrow className="custom-class">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveClass("cardEyebrow", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(<CardEyebrow _internalId="custom-id">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-card-eyebrow-id",
        "custom-id-card-eyebrow"
      );
    });

    it("uses provided internalId when available", () => {
      render(<CardEyebrow _internalId="test-id">Eyebrow</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-card-eyebrow-id",
        "test-id-card-eyebrow"
      );
    });
  });

  describe("Decorative Styling", () => {
    it("renders with decoration when decorate is true", () => {
      render(<CardEyebrow decorate>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveClass("cardEyebrowDecorated");
    });

    it("does not apply decoration when decorate is false", () => {
      render(<CardEyebrow decorate={false}>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).not.toHaveClass("cardEyebrowDecorated");
    });

    it("does not apply decoration when decorate is undefined", () => {
      render(<CardEyebrow>Eyebrow text</CardEyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).not.toHaveClass("cardEyebrowDecorated");
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

      const eyebrow = screen.getByTestId("card-eyebrow-root");
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
      const { container } = render(<CardEyebrow>{true}</CardEyebrow>);
      expect(container.firstChild).toBeNull();
    });

    it("handles number children", () => {
      const { container } = render(<CardEyebrow>{0}</CardEyebrow>);
      expect(container.firstChild).toBeNull();
    });

    it("combines decoration with custom className", () => {
      render(
        <CardEyebrow decorate className="custom-class">
          Eyebrow text
        </CardEyebrow>
      );

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveClass(
        "cardEyebrow",
        "cardEyebrowDecorated",
        "custom-class"
      );
    });
  });
});
