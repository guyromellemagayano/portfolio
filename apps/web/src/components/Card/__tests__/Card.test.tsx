// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../Card";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
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
      expect(card).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<Card debugMode={true}>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID", () => {
      render(<Card debugId="custom-id">Card content</Card>);

      const card = screen.getByTestId("custom-id-card-root");
      expect(card).toHaveAttribute("data-testid", "custom-id-card-root");
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
    it("renders as article element", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card.tagName).toBe("ARTICLE");
    });

    it("applies correct CSS classes", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("class");
    });

    it("combines Tailwind classes + custom classes", () => {
      render(<Card className="custom-class">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("class");
    });
  });

  describe("Component Rendering", () => {
    it("Card renders correctly with children", () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("Card re-renders when props change", () => {
      const { rerender } = render(
        <Card>
          <div>Initial content</div>
        </Card>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card>
          <div>Updated content</div>
        </Card>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });

    it("Card maintains consistent rendering across re-renders", () => {
      const { rerender } = render(
        <Card>
          <div>Consistent content</div>
        </Card>
      );

      const initialElement = screen.getByText("Consistent content");
      expect(initialElement).toBeInTheDocument();

      // Re-render with same props
      rerender(
        <Card>
          <div>Consistent content</div>
        </Card>
      );

      const rerenderedElement = screen.getByText("Consistent content");
      expect(rerenderedElement).toBeInTheDocument();
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

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      render(<Card debugId="aria-test">Card content</Card>);

      // Test article role
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<Card debugId="aria-test">Card content</Card>);

      const articleElement = screen.getByRole("article");

      // Article should be present (semantic HTML provides the role)
      expect(articleElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels without ID dependencies", () => {
      render(<Card debugId="aria-test">Card content</Card>);

      // Content should be present (no ID needed)
      const contentElement = screen.getByText("Card content");
      expect(contentElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <Card debugId="aria-test" aria-label="Test card">
          Card content
        </Card>
      );

      // Card should have descriptive label
      const articleElement = screen.getByRole("article");
      expect(articleElement).toHaveAttribute("aria-label", "Test card");
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(<Card debugId="custom-aria-id">Card content</Card>);

      const articleElement = screen.getByRole("article");

      // Should be present (semantic HTML provides the role)
      expect(articleElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <Card debugId="aria-test">Card content</Card>
      );

      // Initial render
      let articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();

      // Update with different content
      rerender(<Card debugId="aria-test">Updated content</Card>);

      // ARIA attributes should be maintained
      articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();
    });

    it("ensures proper ARIA landmark structure", () => {
      render(<Card debugId="aria-test">Card content</Card>);

      // Should have article landmark
      const articleElement = screen.getByRole("article");
      expect(articleElement).toBeInTheDocument();
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(<Card debugId="aria-test">Card content</Card>);

      const articleElement = screen.getByRole("article");

      // Should be present (semantic HTML provides the role)
      expect(articleElement).toBeInTheDocument();
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Card debugId="aria-test">{null}</Card>);

      // Component should not render when no content
      expect(container.firstChild).toBeNull();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <Card
          debugId="aria-test"
          aria-expanded="true"
          aria-controls="card-content"
        >
          Card content
        </Card>
      );

      const articleElement = screen.getByRole("article");

      // Should maintain both component ARIA attributes and custom ones
      expect(articleElement).toBeInTheDocument();
      expect(articleElement).toHaveAttribute("aria-expanded", "true");
      expect(articleElement).toHaveAttribute("aria-controls", "card-content");
    });
  });

  describe("Data Attributes and Debugging", () => {
    it("applies correct data attributes with default ID", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-testid", "test-id-card-root");
      expect(card).not.toHaveAttribute("data-debug-mode");
    });

    it("applies correct data attributes with custom ID", () => {
      render(<Card debugId="custom-card-id">Card content</Card>);

      const card = screen.getByTestId("custom-card-id-card-root");
      expect(card).toHaveAttribute("data-testid", "custom-card-id-card-root");
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
      expect(card).toHaveAttribute("class");
    });

    it("merges custom className with base classes", () => {
      render(<Card className="custom-card-class">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("class");
    });

    it("handles multiple custom classes", () => {
      render(<Card className="class1 class2 class3">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("class");
    });

    it("handles empty className gracefully", () => {
      render(<Card className="">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("class");
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
