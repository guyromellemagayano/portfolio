import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../Card";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (children === null || children === undefined) {
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
vi.mock("../Card.module.css", () => ({
  default: {
    card: "card",
  },
}));

describe("Card", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Card className="custom-class">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      expect(card).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<Card debugMode={true}>Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom internal ID", () => {
      render(<Card internalId="custom-id">Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card).toHaveAttribute("data-card-id", "custom-id-card");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card data-testid="custom-testid" aria-label="Card label">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("custom-testid");
      expect(card).toHaveAttribute("aria-label", "Card label");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined/empty children", () => {
      const { container } = render(<Card>{undefined}</Card>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<Card debugMode={true}>Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as article element", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card.tagName).toBe("ARTICLE");
    });

    it("applies correct CSS classes", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card).toHaveClass("card");
    });

    it("combines CSS module + custom classes", () => {
      render(<Card className="custom-class">Card content</Card>);

      const card = screen.getByTestId("card-root");
      expect(card).toHaveClass("card", "custom-class");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(
        <Card isMemoized={true}>
          <div>Memoized card</div>
        </Card>
      );

      expect(screen.getByText("Memoized card")).toBeInTheDocument();
    });

    it("renders without memoization by default", () => {
      render(
        <Card>
          <div>Default card</div>
        </Card>
      );

      expect(screen.getByText("Default card")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card>
          <div>
            <span>Complex</span> <strong>content</strong>
          </div>
        </Card>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card>Special chars: &lt;&gt;&amp;</Card>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
