import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../Card";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Card sub-components are mocked globally in test-setup.ts

describe("Card", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<Card debugMode={true}>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID", () => {
      render(<Card debugId="custom-id">Card content</Card>);

      const card = screen.getByTestId("custom-id-card-root");
      expect(card).toHaveAttribute("data-card-id", "custom-id-card");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card data-testid="custom-testid" aria-label="Card label">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
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

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as div element", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start"
      );
    });

    it("combines Tailwind classes + custom classes", () => {
      render(<Card className="custom-class">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start",
        "custom-class"
      );
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

    it("handles empty string children", () => {
      const { container } = render(<Card>{""}</Card>);
      expect(container.firstChild).toBeNull();
    });

    it("handles false children", () => {
      const { container } = render(<Card>{false}</Card>);
      expect(container.firstChild).toBeNull();
    });

    it("handles zero children", () => {
      const { container } = render(<Card>{0}</Card>);
      expect(container.firstChild).toBeNull();
    });

    it("handles mixed valid and invalid children", () => {
      render(
        <Card>
          {null}
          <div>Valid content</div>
          {undefined}
          <span>More content</span>
        </Card>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
      expect(screen.getByText("More content")).toBeInTheDocument();
    });
  });

  describe("Performance and Optimization", () => {
    it("memoizes component when isMemoized is true", () => {
      const { rerender } = render(
        <Card isMemoized={true}>
          <div>Memoized content</div>
        </Card>
      );

      const _initialElement = screen.getByText("Memoized content");

      // Re-render with same props
      rerender(
        <Card isMemoized={true}>
          <div>Memoized content</div>
        </Card>
      );

      const rerenderedElement = screen.getByText("Memoized content");
      expect(rerenderedElement).toBe(_initialElement);
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <Card isMemoized={false}>
          <div>Non-memoized content</div>
        </Card>
      );

      const _initialElement = screen.getByText("Non-memoized content");

      // Re-render with different content to test non-memoization
      rerender(
        <Card isMemoized={false}>
          <div>Different content</div>
        </Card>
      );

      expect(screen.getByText("Different content")).toBeInTheDocument();
      expect(
        screen.queryByText("Non-memoized content")
      ).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(
        <Card aria-label="Custom card" aria-describedby="card-description">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("aria-label", "Custom card");
      expect(card).toHaveAttribute("aria-describedby", "card-description");
    });

    it("supports role attribute", () => {
      render(
        <Card role="region">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("role", "region");
    });
  });

  describe("Data Attributes and Debugging", () => {
    it("applies correct data attributes with default ID", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-card-id", "test-id-card");
      expect(card).not.toHaveAttribute("data-debug-mode");
    });

    it("applies correct data attributes with custom ID", () => {
      render(<Card debugId="custom-card-id">Card content</Card>);

      const card = screen.getByTestId("custom-card-id-card-root");
      expect(card).toHaveAttribute("data-card-id", "custom-card-id-card");
    });

    it("applies debug mode data attribute when enabled", () => {
      render(<Card debugMode={true}>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode data attribute when disabled", () => {
      render(<Card debugMode={false}>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("CSS and Styling", () => {
    it("applies base Tailwind CSS classes", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start"
      );
    });

    it("merges custom className with base classes", () => {
      render(<Card className="custom-card-class">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start",
        "custom-card-class"
      );
    });

    it("handles multiple custom classes", () => {
      render(<Card className="class1 class2 class3">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start",
        "class1",
        "class2",
        "class3"
      );
    });

    it("handles empty className gracefully", () => {
      render(<Card className="">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start"
      );
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all HTML div attributes", () => {
      render(
        <Card
          id="card-1"
          tabIndex={0}
          data-custom="value"
          style={{ backgroundColor: "red" }}
        >
          Card content
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("id", "card-1");
      expect(card).toHaveAttribute("tabIndex", "0");
      expect(card).toHaveAttribute("data-custom", "value");
      expect(card.style.backgroundColor).toBe("red");
    });

    it("forwards event handlers", () => {
      const onClick = vi.fn();

      render(<Card onClick={onClick}>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");

      card.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
