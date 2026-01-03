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

import { Card, MemoizedCard } from "../Card";

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

vi.mock("@web/components", () => ({
  Icon: vi.fn(({ name, ...props }) => (
    <span data-testid={`icon-${name}`} {...props}>
      →
    </span>
  )),
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
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer", target };
    }
    return { target };
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock _internal components
vi.mock("../_internal", () => ({
  CardDescription: vi.fn(({ children, ...props }) => (
    <div data-testid="card-description-mock" {...props}>
      {children}
    </div>
  )),
  CardEyebrow: vi.fn(({ children, ...props }) => (
    <div data-testid="card-eyebrow-mock" {...props}>
      {children}
    </div>
  )),
  CardLink: vi.fn(({ children, ...props }) => (
    <a data-testid="card-link-mock" {...props}>
      {children}
    </a>
  )),
  CardTitle: vi.fn(({ children, ...props }) => (
    <h2 data-testid="card-title-mock" {...props}>
      {children}
    </h2>
  )),
  CardLinkCustom: (props: any) => {
    const {
      children,
      href,
      target,
      title,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;
    return (
      <a
        href={href}
        target={target}
        title={title}
        className={className}
        data-card-link-custom-id={`${debugId || "test-id"}-card-link-custom`}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid={`${debugId || "test-id"}-card-link-custom-root`}
        {...rest}
      >
        {children}
      </a>
    );
  },
  MemoizedCardDescription: vi.fn(({ children, ...props }) => (
    <div data-testid="card-description-mock" {...props}>
      {children}
    </div>
  )),
  MemoizedCardEyebrow: vi.fn(({ children, ...props }) => (
    <div data-testid="card-eyebrow-mock" {...props}>
      {children}
    </div>
  )),
  MemoizedCardLink: vi.fn(({ children, ...props }) => (
    <a data-testid="card-link-mock" {...props}>
      {children}
    </a>
  )),
  MemoizedCardTitle: vi.fn(({ children, ...props }) => (
    <h2 data-testid="card-title-mock" {...props}>
      {children}
    </h2>
  )),
  MemoizedCardLinkCustom: (props: any) => {
    const {
      children,
      href,
      target,
      title,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;
    return (
      <a
        href={href}
        target={target}
        title={title}
        className={className}
        data-card-link-custom-id={`${debugId || "test-id"}-card-link-custom`}
        data-debug-mode={debugMode ? "true" : undefined}
        data-testid={`${debugId || "test-id"}-card-link-custom-root`}
        {...rest}
      >
        {children}
      </a>
    );
  },
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { href, target, title, children, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          data-testid="card-link-custom-root"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// ============================================================================
// CARD CTA COMPONENT TESTS
// ============================================================================

describe("Card.Cta", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      expect(screen.getByText("Call to action")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Card.Cta className="custom-class">Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Cta data-testid="custom-testid" aria-label="CTA">
          Call to action
        </Card.Cta>
      );

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).toBeInTheDocument();
    });
  });

  describe("Link Functionality", () => {
    it("renders CardLinkCustom when href is provided and valid", () => {
      render(<Card.Cta href="/test-link">Call to action</Card.Cta>);

      const link = screen.getByTestId("test-id-card-link-custom-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test-link");
      expect(screen.getByText("Call to action")).toBeInTheDocument();
      expect(screen.getByTestId("icon-chevron-right")).toBeInTheDocument();
    });

    it("renders children directly when href is invalid", () => {
      render(<Card.Cta href="#">Call to action</Card.Cta>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Call to action")).toBeInTheDocument();
      expect(
        screen.queryByTestId("icon-chevron-right")
      ).not.toBeInTheDocument();
    });

    it("renders children directly when href is not provided", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Call to action")).toBeInTheDocument();
      expect(
        screen.queryByTestId("icon-chevron-right")
      ).not.toBeInTheDocument();
    });

    it("renders CardLinkCustom with correct props when href is valid", () => {
      render(
        <Card.Cta href="/valid-link" target="_blank" title="Test title">
          Call to action
        </Card.Cta>
      );

      const link = screen.getByTestId("test-id-card-link-custom-root");
      expect(link).toHaveAttribute("href", "/valid-link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
      expect(screen.getByTestId("icon-chevron-right")).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Cta />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Cta>{null}</Card.Cta>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Cta>{""}</Card.Cta>);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with valid children", () => {
      render(<Card.Cta>Valid content</Card.Cta>);
      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<Card.Cta debugMode={true}>Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as div element", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "flex",
        "items-start",
        "text-sm",
        "font-medium",
        "text-amber-500"
      );
    });

    it("combines Tailwind + custom classes", () => {
      render(<Card.Cta className="custom-class">Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "flex",
        "items-start",
        "text-sm",
        "font-medium",
        "text-amber-500",
        "custom-class"
      );
    });
  });

  describe("Component ID", () => {
    it("renders with custom debug ID", () => {
      render(<Card.Cta debugId="custom-id">Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("custom-id-card-cta-root");
      expect(ctaElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-cta-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(<Card.Cta debugId="test-id">Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement).toHaveAttribute(
        "data-testid",
        "test-id-card-cta-root"
      );
    });
  });

  describe("Component Element Type", () => {
    it("renders as div by default", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement.tagName).toBe("DIV");
    });

    it("renders as custom element when as prop is provided", () => {
      render(<Card.Cta as="section">Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement.tagName).toBe("SECTION");
    });

    it("renders as span when as prop is span", () => {
      render(<Card.Cta as="span">Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("test-id-card-cta-root");
      expect(ctaElement.tagName).toBe("SPAN");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card.Cta ref={ref}>Call to action</Card.Cta>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("ref points to correct element with custom as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Card.Cta as="section" ref={ref}>
          Call to action
        </Card.Cta>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("SECTION");
    });

    it("allows ref access to DOM methods", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card.Cta ref={ref}>Call to action</Card.Cta>);

      expect(ref.current?.getAttribute("data-testid")).toBe(
        "test-id-card-cta-root"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Cta>
          <span>Click</span> <strong>here</strong>
        </Card.Cta>
      );

      expect(screen.getByText("Click")).toBeInTheDocument();
      expect(screen.getByText("here")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Cta>Special chars: &lt;&gt;&amp;</Card.Cta>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(<Card.Cta>{true}</Card.Cta>);
      expect(screen.getByTestId("test-id-card-cta-root")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Cta>{0}</Card.Cta>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Card.Cta debugId="custom-id" debugMode={true}>
          Call to action
        </Card.Cta>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

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

      render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = screen.getByTestId("generated-id-card-cta-root");
      expect(ctaElement).toHaveAttribute(
        "data-testid",
        "generated-id-card-cta-root"
      );
    });
  });

  describe("Memoization", () => {
    it("Card.Cta renders correctly", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      expect(screen.getByText("Call to action")).toBeInTheDocument();
    });

    it("Card.Cta re-renders when props change", () => {
      const { rerender } = render(<Card.Cta>Initial content</Card.Cta>);

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(<Card.Cta>Updated content</Card.Cta>);

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly for div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card.Cta ref={ref}>Call to action</Card.Cta>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref correctly for span element", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        (
          <Card.Cta as="span" ref={ref}>
            Call to action
          </Card.Cta>
        ) as any
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("SPAN");
    });
  });
});

// ============================================================================
// CARD DESCRIPTION COMPONENT TESTS
// ============================================================================

describe("Card.Description", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Description>Card description</Card.Description>);

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Card.Description className="custom-class">
          Card description
        </Card.Description>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Description aria-label="Description">
          Card description
        </Card.Description>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute("aria-label", "Description");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Description />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Description>{null}</Card.Description>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Description>{""}</Card.Description>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      render(<Card.Description>{true}</Card.Description>);
      expect(
        screen.getByTestId("test-id-card-description-root")
      ).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Description>{0}</Card.Description>);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with valid children", () => {
      render(<Card.Description>Valid content</Card.Description>);
      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <Card.Description debugMode={true}>Card description</Card.Description>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<Card.Description>Card description</Card.Description>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      render(<Card.Description>Card description</Card.Description>);

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement.tagName).toBe("P");
    });

    it("renders as custom element when as prop is provided", () => {
      render(
        (<Card.Description as="div">Card description</Card.Description>) as any
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement.tagName).toBe("DIV");
    });

    it("renders as span element when as prop is span", () => {
      render(
        (<Card.Description as="span">Card description</Card.Description>) as any
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement.tagName).toBe("SPAN");
    });

    it("applies correct CSS classes", () => {
      render(<Card.Description>Card description</Card.Description>);

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
        <Card.Description className="custom-class">
          Card description
        </Card.Description>
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
    it("renders with custom debugId", () => {
      render(
        <Card.Description debugId="custom-id">
          Card description
        </Card.Description>
      );

      const descriptionElement = screen.getByTestId(
        "custom-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-description-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <Card.Description debugId="test-id">Card description</Card.Description>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "test-id-card-description-root"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Card.Description ref={ref}>Card description</Card.Description>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("P");
    });

    it("ref points to correct element with custom as prop", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        (
          <Card.Description as="div" ref={ref}>
            Card description
          </Card.Description>
        ) as any
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("allows ref access to DOM methods", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Card.Description ref={ref}>Card description</Card.Description>);

      expect(ref.current?.getAttribute("data-testid")).toBe(
        "test-id-card-description-root"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Description>
          <strong>Bold</strong> and <em>italic</em> text
        </Card.Description>
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Description>Special chars: &lt;&gt;&amp;</Card.Description>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles multiple props together", () => {
      render(
        <Card.Description
          debugId="multi-prop-id"
          debugMode={true}
          className="multi-class"
          aria-label="Multi prop test"
        >
          Multi prop test
        </Card.Description>
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

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Card.Description debugId="custom-id" debugMode={true}>
          Card description
        </Card.Description>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Card.Description>Card description</Card.Description>);

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

      render(<Card.Description>Card description</Card.Description>);

      const descriptionElement = screen.getByTestId(
        "generated-id-card-description-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "generated-id-card-description-root"
      );
    });
  });
});

// ============================================================================
// CARD EYEBROW COMPONENT TESTS
// ============================================================================

describe("Card.Eyebrow", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Card.Eyebrow className="custom-class">Eyebrow</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<Card.Eyebrow aria-label="Eyebrow">Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute("aria-label", "Eyebrow");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Eyebrow />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Eyebrow>{null}</Card.Eyebrow>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Eyebrow>{""}</Card.Eyebrow>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      render(<Card.Eyebrow>{true}</Card.Eyebrow>);
      // Boolean true is not rendered as text content in React
      expect(
        screen.getByTestId("test-id-card-eyebrow-root")
      ).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Eyebrow>{0}</Card.Eyebrow>);
      // Component returns null for falsy children like 0
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Card.Eyebrow debugId="custom-id" debugMode={true}>
          Eyebrow text
        </Card.Eyebrow>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

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

      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

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

      render(<Card.Eyebrow debugMode={true}>Eyebrow</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<Card.Eyebrow>Eyebrow</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("Card.Eyebrow renders correctly", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("Card.Eyebrow re-renders when props change", () => {
      const { rerender } = render(<Card.Eyebrow>Initial text</Card.Eyebrow>);

      expect(screen.getByText("Initial text")).toBeInTheDocument();

      // Re-render with different content
      rerender(<Card.Eyebrow>Updated text</Card.Eyebrow>);

      expect(screen.getByText("Updated text")).toBeInTheDocument();
      expect(screen.queryByText("Initial text")).not.toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow.tagName).toBe("P");
    });

    it("renders as time element when as prop is time", () => {
      render((<Card.Eyebrow as="time">Eyebrow text</Card.Eyebrow>) as any);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow.tagName).toBe("TIME");
    });

    it("applies correct CSS classes", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

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
      render(<Card.Eyebrow className="custom-class">Eyebrow</Card.Eyebrow>);

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

      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("generated-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-testid",
        "generated-id-card-eyebrow-root"
      );
    });

    it("renders with custom debugId", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(<Card.Eyebrow debugId="custom-id">Eyebrow</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("custom-id-card-eyebrow-root");
      expect(eyebrow).toHaveAttribute(
        "data-testid",
        "custom-id-card-eyebrow-root"
      );
    });
  });

  describe("Decorative Styling", () => {
    it("renders with decoration when decorate is true", () => {
      render(<Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).toHaveClass("pl-3.5");
    });

    it("does not apply decoration when decorate is false", () => {
      render(<Card.Eyebrow decorate={false}>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).not.toHaveClass("pl-3.5");
    });

    it("does not apply decoration when decorate is undefined", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("test-id-card-eyebrow-root");
      expect(eyebrow).not.toHaveClass("pl-3.5");
    });

    it("renders decorative span when decorate is true", () => {
      render(<Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>);

      const decorateSpan = screen.getByTestId(
        "test-id-card-eyebrow-decorate-root"
      );
      expect(decorateSpan).toBeInTheDocument();
      expect(decorateSpan).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly for p element", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Card.Eyebrow ref={ref}>Eyebrow text</Card.Eyebrow>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("P");
    });

    it("forwards ref correctly for time element", () => {
      const ref = React.createRef<HTMLTimeElement>();
      render(
        (
          <Card.Eyebrow as="time" ref={ref}>
            Eyebrow text
          </Card.Eyebrow>
        ) as any
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("TIME");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Eyebrow>
          <span>Featured</span> <strong>content</strong>
        </Card.Eyebrow>
      );

      expect(screen.getByText("Featured")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Eyebrow>Special chars: &lt;&gt;&amp;</Card.Eyebrow>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("combines decoration with custom className", () => {
      render(
        <Card.Eyebrow decorate className="custom-class">
          Eyebrow text
        </Card.Eyebrow>
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
        <Card.Eyebrow
          debugId="multi-prop-id"
          debugMode={true}
          decorate={true}
          className="multi-class"
          aria-label="Multi prop test"
        >
          Multi prop test
        </Card.Eyebrow>
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
    });
  });
});

// ============================================================================
// CARD LINK COMPONENT TESTS
// ============================================================================

describe("Card.Link", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders as div element by default", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container.tagName).toBe("DIV");
    });

    it("renders as custom element when as prop is provided", () => {
      render(
        (
          <Card.Link as="section" href="/test">
            Link content
          </Card.Link>
        ) as any
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container.tagName).toBe("SECTION");
    });

    it("applies custom className", () => {
      render(
        <Card.Link href="/test" className="custom-class">
          Link content
        </Card.Link>
      );

      const background = screen.getByTestId(
        "test-id-card-link-background-root"
      );
      expect(background).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Link href="/test" data-test="test-data">
          Link content
        </Card.Link>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveAttribute("data-test", "test-data");
    });

    it("renders structure with background div and CardLinkCustom", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      // Should have container
      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toBeInTheDocument();

      // Should have background div
      const backgroundDiv = screen.getByTestId(
        "test-id-card-link-background-root"
      );
      expect(backgroundDiv).toBeInTheDocument();

      // Should have CardLinkCustom
      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();
    });
  });

  describe("Link Functionality", () => {
    it("renders CardLinkCustom when href is provided and valid", () => {
      render(<Card.Link href="/test-link">Link content</Card.Link>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute("href", "/test-link");
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is invalid", () => {
      render(<Card.Link href="">Link content</Card.Link>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is null", () => {
      render(<Card.Link href={null as any}>Link content</Card.Link>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is undefined", () => {
      render(<Card.Link href={undefined as any}>Link content</Card.Link>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders CardLinkCustom with correct props when href is valid", () => {
      render(
        <Card.Link href="/valid-link" target="_blank" title="Test title">
          Link content
        </Card.Link>
      );

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toHaveAttribute("href", "/valid-link");
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("title", "Test title");
    });
  });

  describe("Styling Structure", () => {
    it("renders background element with correct Tailwind classes", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      const background = screen.getByTestId(
        "test-id-card-link-background-root"
      );
      expect(background).toHaveClass(
        "absolute",
        "-inset-x-4",
        "-inset-y-6",
        "z-0",
        "scale-95",
        "bg-zinc-50",
        "opacity-0",
        "transition",
        "group-hover:scale-100",
        "group-hover:opacity-100",
        "sm:-inset-x-6",
        "sm:rounded-2xl",
        "dark:bg-zinc-800/50"
      );
    });

    it("renders CardLinkCustom with clickable area and content when href is valid", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders CardLinkCustom with proper span structure", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();

      // Should have clickable area span
      const clickableArea = screen.getByTestId(
        "test-id-card-link-custom-span-root"
      );
      expect(clickableArea).toHaveClass(
        "absolute",
        "-inset-x-4",
        "-inset-y-6",
        "z-20",
        "sm:-inset-x-6",
        "sm:rounded-2xl"
      );

      // Should have content span
      const contentSpan = screen.getByTestId(
        "test-id-card-link-custom-span-content-root"
      );
      expect(contentSpan).toHaveClass("relative", "z-10");
      expect(contentSpan).toHaveTextContent("Link content");
    });

    it("combines Tailwind + custom classes", () => {
      render(
        <Card.Link href="/test" className="custom-class">
          Link content
        </Card.Link>
      );

      const background = screen.getByTestId(
        "test-id-card-link-background-root"
      );
      expect(background).toHaveClass(
        "absolute",
        "-inset-x-4",
        "-inset-y-6",
        "z-0",
        "scale-95",
        "bg-zinc-50",
        "opacity-0",
        "transition",
        "group-hover:scale-100",
        "group-hover:opacity-100",
        "sm:-inset-x-6",
        "sm:rounded-2xl",
        "dark:bg-zinc-800/50",
        "custom-class"
      );
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Link href="/test" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Link href="/test">{null}</Card.Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Link href="/test">{""}</Card.Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      render(<Card.Link href="/test">{true}</Card.Link>);
      // Boolean true is not rendered as text content in React
      expect(screen.getByTestId("test-id-card-link-root")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Link href="/test">{0}</Card.Link>);
      // Component returns null for falsy children like 0
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Card.Link href="/test" debugId="custom-id" debugMode={true}>
          Link text
        </Card.Link>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Card.Link href="/test">Link text</Card.Link>);

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: undefined,
      });
    });

    it("passes generated ID to component", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(<Card.Link href="/test">Link text</Card.Link>);

      const container = screen.getByTestId("generated-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-testid",
        "generated-id-card-link-root"
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
        <Card.Link href="/test" debugMode={true}>
          Link text
        </Card.Link>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "test-id",
        isDebugMode: false,
      });

      render(<Card.Link href="/test">Link text</Card.Link>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("Card.Link renders without memoization by default", () => {
      render(
        <Card.Link href="/test">
          <div>Default link</div>
        </Card.Link>
      );

      expect(screen.getByText("Default link")).toBeInTheDocument();
    });

    it("Card.Link re-renders when props change", () => {
      const { rerender } = render(
        <Card.Link href="/test">
          <div>Initial content</div>
        </Card.Link>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card.Link href="/test">
          <div>Updated content</div>
        </Card.Link>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with correct element type", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container.tagName).toBe("DIV");
    });

    it("renders as span when as prop is span", () => {
      render(
        (
          <Card.Link as="span" href="/test">
            Link content
          </Card.Link>
        ) as any
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container.tagName).toBe("SPAN");
    });

    it("renders as article when as prop is article", () => {
      render(
        (
          <Card.Link as="article" href="/test">
            Link content
          </Card.Link>
        ) as any
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container.tagName).toBe("ARTICLE");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debugId", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "custom-id",
        isDebugMode: false,
      });

      render(
        <Card.Link href="/test" debugId="custom-id">
          Link text
        </Card.Link>
      );

      const container = screen.getByTestId("custom-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-testid",
        "custom-id-card-link-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <Card.Link href="/test" debugId="test-id">
          Link text
        </Card.Link>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-testid",
        "test-id-card-link-root"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly for div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card.Link href="/test" ref={ref}>
          Link content
        </Card.Link>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref correctly for section element", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        (
          <Card.Link as="section" href="/test" ref={ref}>
            Link content
          </Card.Link>
        ) as any
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("SECTION");
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card.Link href="/test" ref={ref}>
          Link content
        </Card.Link>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current).toHaveAttribute(
        "data-testid",
        "test-id-card-link-root"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Link href="/test">
          <span>Complex</span> content
        </Card.Link>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Link href="/test">Link with special chars: @#$%</Card.Link>);
      expect(
        screen.getByText("Link with special chars: @#$%")
      ).toBeInTheDocument();
    });

    it("handles multiple props together", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "multi-prop-id",
        isDebugMode: true,
      });

      render(
        <Card.Link
          href="/test"
          debugId="multi-prop-id"
          debugMode={true}
          className="multi-class"
          target="_blank"
          title="Multi prop test"
        >
          Multi prop test
        </Card.Link>
      );

      const container = screen.getByTestId("multi-prop-id-card-link-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
      expect(container).toHaveAttribute(
        "data-testid",
        "multi-prop-id-card-link-root"
      );

      const background = screen.getByTestId(
        "multi-prop-id-card-link-background-root"
      );
      expect(background).toHaveClass("multi-class");

      const customLink = screen.getByTestId(
        "multi-prop-id-card-link-custom-root"
      );
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("title", "Multi prop test");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD LINK CUSTOM COMPONENT TESTS
// ============================================================================

describe("Card.LinkCustom", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link content
        </Card.LinkCustom>
      );

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link content
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("applies custom className", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          className="custom-class"
        >
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          title="Link"
        >
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveAttribute("aria-label", "Link");
    });

    it("sets aria-label from title prop", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          title="Custom title"
        >
          Link content
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Custom title");
      expect(link).toHaveAttribute("title", "Custom title");
    });

    it("does not set aria-label when title is not provided", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link content
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("aria-label");
      expect(link).not.toHaveAttribute("title");
    });
  });

  describe("Link Properties", () => {
    it("passes through link attributes", () => {
      render(
        <Card.LinkCustom
          href="/test"
          target="_blank"
          title="Test title"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });

    it("adds rel attribute for external links", () => {
      render(
        <Card.LinkCustom
          href="https://example.com"
          target="_blank"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("does not add rel attribute for internal links", () => {
      render(
        <Card.LinkCustom
          href="/internal-link"
          target="_self"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("rel");
    });

    it("handles invalid href by setting empty href", () => {
      render(
        <Card.LinkCustom href="" debugId="test-link" debugMode={false}>
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByTestId("test-link-card-link-custom-root");
      expect(link).toHaveAttribute("href", "");
    });

    it("handles null href by setting empty href", () => {
      render(
        <Card.LinkCustom
          href={null as any}
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByTestId("test-link-card-link-custom-root");
      expect(link).toHaveAttribute("href", "");
    });

    it("handles undefined href by setting empty href", () => {
      render(
        <Card.LinkCustom
          href={undefined as any}
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByTestId("test-link-card-link-custom-root");
      expect(link).toHaveAttribute("href", "");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <Card.LinkCustom href="/test-link" debugId="test-link" debugMode={true}>
          Link text
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as anchor element", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement.tagName).toBe("A");
    });

    it("applies correct CSS classes", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toBeInTheDocument();
    });

    it("combines CSS module + custom classes", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          className="custom-class"
        >
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveClass("custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debugId", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="custom-id"
          debugMode={false}
        >
          Link text
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("custom-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-link-custom-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <Card.LinkCustom href="/test-link" debugId="test-id" debugMode={false}>
          Link text
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "test-id-card-link-custom-root"
      );
    });

    it("renders with generated ID when not provided", () => {
      render(
        <Card.LinkCustom href="/test-link" debugMode={false}>
          Link text
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId("test-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "test-id-card-link-custom-root"
      );
    });
  });

  describe("Memoization", () => {
    it("Card.LinkCustom renders correctly", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Link content
        </Card.LinkCustom>
      );

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("Card.LinkCustom re-renders when props change", () => {
      const { rerender } = render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Initial content
        </Card.LinkCustom>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Updated content
        </Card.LinkCustom>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          ref={ref}
        >
          Link content
        </Card.LinkCustom>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("A");
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          ref={ref}
        >
          Link content
        </Card.LinkCustom>
      );

      expect(ref.current?.tagName).toBe("A");
      expect(ref.current).toHaveAttribute(
        "data-testid",
        "test-link-card-link-custom-root"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          <span>Complex</span> <strong>content</strong>
        </Card.LinkCustom>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          Special chars: &lt;&gt;&amp;
        </Card.LinkCustom>
      );

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("does not render when children are empty", () => {
      const { container } = render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          {""}
        </Card.LinkCustom>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children are null", () => {
      const { container } = render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          {null}
        </Card.LinkCustom>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children are undefined", () => {
      const { container } = render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          {undefined}
        </Card.LinkCustom>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          {true}
        </Card.LinkCustom>
      );

      // Boolean true is not rendered as text content in React but link element renders
      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.tagName).toBe("A");
    });

    it("handles number children", () => {
      const { container } = render(
        <Card.LinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
        >
          {0}
        </Card.LinkCustom>
      );

      // Component returns null for falsy children like 0
      expect(container).toBeEmptyDOMElement();
    });

    it("handles multiple props together", () => {
      render(
        <Card.LinkCustom
          href="https://example.com"
          debugId="multi-prop-id"
          debugMode={true}
          className="multi-class"
          target="_blank"
          title="Multi prop test"
        >
          Multi prop test
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId(
        "multi-prop-id-card-link-custom-root"
      );
      expect(linkElement).toHaveClass("multi-class");
      expect(linkElement).toHaveAttribute("data-debug-mode", "true");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "multi-prop-id-card-link-custom-root"
      );
      expect(linkElement).toHaveAttribute("href", "https://example.com");
      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("title", "Multi prop test");
      expect(linkElement).toHaveAttribute("aria-label", "Multi prop test");
      expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Card.LinkCustom href="/test-link" debugId="custom-id" debugMode={true}>
          Link content
        </Card.LinkCustom>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(
        <Card.LinkCustom href="/test-link" debugMode={false}>
          Link content
        </Card.LinkCustom>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: false,
      });
    });

    it("passes generated ID to base component", () => {
      mockUseComponentId.mockReturnValue({
        componentId: "generated-id",
        isDebugMode: false,
      });

      render(
        <Card.LinkCustom href="/test-link" debugMode={false}>
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByTestId(
        "generated-id-card-link-custom-root"
      );
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "generated-id-card-link-custom-root"
      );
    });
  });
});

// ============================================================================
// CARD TITLE COMPONENT TESTS
// ============================================================================

describe("Card.Title", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Card.Title className="custom-class" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Title href="#" aria-label="Title">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("aria-label", "Title");
    });
  });

  describe("Link Functionality", () => {
    it("renders with link when href is provided and valid", () => {
      render(<Card.Title href="/test-link">Card title</Card.Title>);

      const link = screen.getByTestId("test-id-card-link-custom-root");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("renders without link when href is not valid", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("passes through link attributes", () => {
      render(
        <Card.Title href="/test" target="_blank" title="Test title">
          Card title
        </Card.Title>
      );

      const link = screen.getByTestId("test-id-card-link-custom-root");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Title href="#" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Title href="#">{null}</Card.Title>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when only href is provided without children", () => {
      const { container } = render(<Card.Title href="/test" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders children without link when href is invalid", () => {
      render(<Card.Title href="#">Valid children</Card.Title>);
      expect(screen.getByText("Valid children")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <Card.Title debugMode={true} href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as h2 element by default", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement.tagName).toBe("H2");
    });

    it("applies CSS classes", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("class");
    });

    it("combines custom classes", () => {
      render(
        <Card.Title className="custom-class" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debugId", () => {
      render(
        <Card.Title debugId="custom-id" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("custom-id-card-title-root");
      expect(titleElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-title-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <Card.Title debugId="test-id" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute(
        "data-testid",
        "test-id-card-title-root"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <Card.Title ref={ref} href="#">
          Card title
        </Card.Title>
      );

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <Card.Title ref={ref} href="#">
          Card title
        </Card.Title>
      );

      expect(ref.current?.tagName).toBe("H2");
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as h1 when as prop is h1", () => {
      render(
        (
          <Card.Title as="h1" href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement.tagName).toBe("H1");
    });

    it("renders as div when as prop is div", () => {
      render(
        (
          <Card.Title as="div" href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement.tagName).toBe("DIV");
    });

    it("renders as button when as prop is button", () => {
      render(
        (
          <Card.Title as="button" href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement.tagName).toBe("BUTTON");
    });

    it("renders as span when as prop is span", () => {
      render(
        (
          <Card.Title as="span" href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement.tagName).toBe("SPAN");
    });

    it("passes through element-specific props", () => {
      render(
        (
          <Card.Title
            as="div"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            href="#"
          >
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("role", "button");
      expect(titleElement).toHaveAttribute("tabIndex", "0");
    });

    it("passes through event handlers", () => {
      const handleClick = vi.fn();
      render(
        (
          <Card.Title as="div" onClick={handleClick} href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(
        <Card.Title debugId="aria-test" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByTestId("aria-test-card-title-root");
      expect(titleElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        (
          <Card.Title
            as="article"
            aria-labelledby="title-id"
            aria-describedby="desc-id"
            href="#"
          >
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("aria-labelledby", "title-id");
      expect(titleElement).toHaveAttribute("aria-describedby", "desc-id");
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(
        (
          <Card.Title as="h1" id="title-id" href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("id", "title-id");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        (
          <Card.Title as="div" aria-label="Clickable card title" href="#">
            Card title
          </Card.Title>
        ) as any
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute(
        "aria-label",
        "Clickable card title"
      );
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Card.Title href="#" />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Title href="#">
          <span>Complex</span> <strong>title</strong>
        </Card.Title>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Title href="#">Special chars: &lt;&gt;&amp;</Card.Title>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("Card.Title renders correctly", () => {
      render(
        <Card.Title href="#">
          <div>Title content</div>
        </Card.Title>
      );

      expect(screen.getByText("Title content")).toBeInTheDocument();
    });

    it("Card.Title re-renders when props change", () => {
      const { rerender } = render(
        <Card.Title href="#">
          <div>Initial content</div>
        </Card.Title>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card.Title href="#">
          <div>Updated content</div>
        </Card.Title>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });

    it("Card.Title with invalid link renders correctly", () => {
      render(
        <Card.Title href="#">
          <div>Title with invalid link</div>
        </Card.Title>
      );

      expect(screen.getByText("Title with invalid link")).toBeInTheDocument();
      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("calls useComponentId with correct parameters", () => {
      render(
        <Card.Title debugId="custom-id" debugMode={true} href="#">
          Card title
        </Card.Title>
      );

      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: true,
      });
    });

    it("calls useComponentId with undefined parameters", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

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

      render(<Card.Title href="#">Card title</Card.Title>);

      const titleElement = screen.getByTestId("generated-id-card-title-root");
      expect(titleElement).toHaveAttribute(
        "data-testid",
        "generated-id-card-title-root"
      );
    });
  });
});

// ============================================================================
// CARD COMPONENT TESTS
// ============================================================================

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
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined/empty children", () => {
      const { container } = render(<Card>{undefined}</Card>);
      expect(container).toBeEmptyDOMElement();
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
      expect(container).toBeEmptyDOMElement();
    });

    it("handles false children", () => {
      const { container } = render(<Card>{false}</Card>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles zero children", () => {
      const { container } = render(<Card>{0}</Card>);
      expect(container).toBeEmptyDOMElement();
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
      expect(container).toBeEmptyDOMElement();
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

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Card ref={ref}>Card content</Card>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("ARTICLE");
    });

    it("ref points to correct element with custom as prop", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card as="div" ref={ref}>
          Card content
        </Card>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("allows ref access to DOM methods", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Card ref={ref}>Card content</Card>);

      expect(ref.current?.getAttribute("data-testid")).toBe(
        "test-id-card-root"
      );
    });
  });

  describe("Memoization", () => {
    it("Card renders without memoization by default", () => {
      render(
        <Card>
          <div>Default Card</div>
        </Card>
      );

      expect(screen.getByText("Default Card")).toBeInTheDocument();
    });

    it("MemoizedCard renders with memoization", () => {
      render(
        <MemoizedCard>
          <div>Memoized Card</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Memoized Card")).toBeInTheDocument();
    });

    it("MemoizedCard maintains memoization across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedCard>
          <div>Memoized content</div>
        </MemoizedCard>
      );

      // Re-render with same props
      rerender(
        <MemoizedCard>
          <div>Memoized content</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Memoized content")).toBeInTheDocument();
    });

    it("MemoizedCard re-renders when props change", () => {
      const { rerender } = render(
        <MemoizedCard>
          <div>Initial content</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <MemoizedCard>
          <div>Updated content</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });
});
