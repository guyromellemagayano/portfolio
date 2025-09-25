import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Card from "../Card";

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
  isRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasAnyRenderableContent: vi.fn((...values) => {
    return values.some((value) => {
      if (value === false || value === null || value === undefined) {
        return false;
      }
      if (typeof value === "string" && value.length === 0) {
        return false;
      }
      return true;
    });
  }),
  hasValidContent: vi.fn((content) => {
    if (
      content === null ||
      content === undefined ||
      content === "" ||
      content === false ||
      content === 0
    )
      return false;
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => {
    if (typeof content !== "string") return false;
    return content.trim().length > 0;
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

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock component utilities
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  createCardProps: vi.fn((id, debugMode, additionalProps = {}) => ({
    "data-card-id": `${id}-card`,
    "data-debug-mode": debugMode ? "true" : undefined,
    "data-testid": additionalProps["data-testid"] || `${id}-card-root`,
  })),
  hasValidContent: vi.fn((content) => {
    if (content === null || content === undefined) return false;
    return true;
  }),
}));

// Mock CSS modules
vi.mock("../Card.module.css", () => ({
  default: {
    card: "card",
  },
}));

// Mock internal components
vi.mock("../_internal", () => ({
  CardLink: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLink(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <a
          ref={ref}
          data-testid="card-link-root"
          data-card-link-id={`${debugId}-card-link`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
  CardTitle: React.forwardRef<HTMLHeadingElement, any>(
    function MockCardTitle(props, ref) {
      const { children, debugId, debugMode, href, ...rest } = props;
      const content = (
        <h3
          ref={ref}
          data-testid={`${debugId || "test-id"}-card-title-root`}
          data-card-title-id={`${debugId || "test-id"}-card-title`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </h3>
      );

      if (href && href !== "#") {
        return (
          <a href={href} data-testid="mock-link">
            {content}
          </a>
        );
      }

      return content;
    }
  ),
  CardDescription: React.forwardRef<HTMLParagraphElement, any>(
    function MockCardDescription(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <p
          ref={ref}
          data-testid={`${debugId || "test-id"}-card-description-root`}
          data-card-description-id={`${debugId || "test-id"}-card-description`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </p>
      );
    }
  ),
  CardCta: React.forwardRef<HTMLDivElement, any>(
    function MockCardCta(props, ref) {
      const { children, debugId, debugMode, href, target, ...rest } = props;
      const content = (
        <div
          ref={ref}
          data-testid="card-cta-root"
          data-card-cta-id={`${debugId}-card-cta`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );

      if (href && href !== "#") {
        return (
          <a href={href} target={target} data-testid="mock-link">
            {content}
          </a>
        );
      }

      return content;
    }
  ),
  CardEyebrow: React.forwardRef<HTMLParagraphElement, any>(
    function MockCardEyebrow(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <p
          ref={ref}
          data-testid="card-eyebrow-root"
          data-card-eyebrow-id={`${debugId}-card-eyebrow`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </p>
      );
    }
  ),
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
      expect(card).toHaveClass("custom-class");
    });

    it("renders with debug mode enabled", () => {
      render(<Card debugMode={true}>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom internal ID", () => {
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
      expect(card).toHaveClass("card");
    });

    it("combines CSS module + custom classes", () => {
      render(<Card className="custom-class">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
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
    it("applies base CSS class", () => {
      render(<Card>Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass("card");
    });

    it("merges custom className with base class", () => {
      render(<Card className="custom-card-class">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass("card", "custom-card-class");
    });

    it("handles multiple custom classes", () => {
      render(<Card className="class1 class2 class3">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass("card", "class1", "class2", "class3");
    });

    it("handles empty className gracefully", () => {
      render(<Card className="">Card content</Card>);

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toHaveClass("card");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all HTML article attributes", () => {
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
      expect(card).toHaveAttribute("id", "test-id-card");
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

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe("Integration Tests", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Card with Sub-components", () => {
    it("renders Card with all sub-components", () => {
      render(
        <Card>
          <Card.Eyebrow>Eyebrow text</Card.Eyebrow>
          <Card.Title href="/test">Card Title</Card.Title>
          <Card.Description>Card description text</Card.Description>
          <Card.Cta href="/action">Call to Action</Card.Cta>
        </Card>
      );

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description text")).toBeInTheDocument();
      expect(screen.getByText("Call to Action")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      render(
        <Card>
          <Card.Eyebrow>Eyebrow</Card.Eyebrow>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      const eyebrow = screen.getByText("Eyebrow");
      const title = screen.getByText("Title");
      const description = screen.getByText("Description");

      expect(card).toContainElement(eyebrow);
      expect(card).toContainElement(title);
      expect(card).toContainElement(description);
    });

    it("renders sub-components within Card", () => {
      render(
        <Card debugId="parent-card" debugMode={true}>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      // The sub-components are rendered within the Card
      const title = screen.getByTestId("test-id-card-title-root");
      const description = screen.getByTestId("test-id-card-description-root");

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(title).toHaveTextContent("Title");
      expect(description).toHaveTextContent("Description");
    });
  });

  describe("Card with Links", () => {
    it("renders Card with linked title and CTA", () => {
      render(
        <Card>
          <Card.Title href="/title-link">Linked Title</Card.Title>
          <Card.Cta href="/cta-link" target="_blank">
            External CTA
          </Card.Cta>
        </Card>
      );

      const titleLink = screen.getByText("Linked Title").closest("a");
      const ctaLink = screen.getByText("External CTA").closest("a");

      expect(titleLink).toHaveAttribute("href", "/title-link");
      expect(ctaLink).toHaveAttribute("href", "/cta-link");
      expect(ctaLink).toHaveAttribute("target", "_blank");
    });

    it("handles mixed linked and non-linked sub-components", () => {
      render(
        <Card>
          <Card.Title href="/link">Linked Title</Card.Title>
          <Card.Description>Non-linked Description</Card.Description>
          <Card.Cta>Non-linked CTA</Card.Cta>
        </Card>
      );

      const titleLink = screen.getByText("Linked Title").closest("a");
      const description = screen.getByText("Non-linked Description");
      const cta = screen.getByText("Non-linked CTA");

      expect(titleLink).toHaveAttribute("href", "/link");
      expect(description.closest("a")).toBeNull();
      expect(cta.closest("a")).toBeNull();
    });
  });

  describe("Card Content Validation Integration", () => {
    it("renders Card when sub-components have valid content", () => {
      render(
        <Card>
          <Card.Title>Valid Title</Card.Title>
          <Card.Description>Valid Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("renders Card even when sub-components have invalid content", () => {
      render(
        <Card>
          <Card.Title>{null}</Card.Title>
          <Card.Description>{undefined}</Card.Description>
        </Card>
      );

      // Card should still render because it has children (the sub-components themselves)
      expect(screen.getByTestId("test-id-card-root")).toBeInTheDocument();
    });

    it("renders Card when at least one sub-component has valid content", () => {
      render(
        <Card>
          <Card.Title>{null}</Card.Title>
          <Card.Description>Valid Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });
  });

  describe("Card with Complex Content", () => {
    it("handles nested HTML elements in sub-components", () => {
      render(
        <Card>
          <Card.Title>
            <strong>Bold Title</strong> with <em>emphasis</em>
          </Card.Title>
          <Card.Description>
            <p>
              Paragraph with <a href="/link">link</a>
            </p>
          </Card.Description>
        </Card>
      );

      expect(screen.getByText("Bold Title")).toBeInTheDocument();
      expect(screen.getByText("emphasis")).toBeInTheDocument();
      expect(screen.getByText("link")).toBeInTheDocument();
    });

    it("handles multiple instances of same sub-component", () => {
      render(
        <Card>
          <Card.Description>First description</Card.Description>
          <Card.Description>Second description</Card.Description>
        </Card>
      );

      expect(screen.getByText("First description")).toBeInTheDocument();
      expect(screen.getByText("Second description")).toBeInTheDocument();
    });
  });

  describe("Card Performance Integration", () => {
    it("maintains memoization across sub-component updates", () => {
      const { rerender } = render(
        <Card isMemoized={true}>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const initialCard = screen.getByTestId("test-id-card-root");

      // Re-render with same props
      rerender(
        <Card isMemoized={true}>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const rerenderedCard = screen.getByTestId("test-id-card-root");
      expect(rerenderedCard).toBe(initialCard);
    });
  });

  describe("Card Error Handling", () => {
    it("handles invalid props gracefully", () => {
      render(
        <Card>
          <Card.Title>Valid Title</Card.Title>
          <div>Additional content</div>
        </Card>
      );

      // Card should render all valid content
      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Additional content")).toBeInTheDocument();
    });
  });
});
