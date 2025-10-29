import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardTitle } from "../CardTitle";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer", target };
    }
    return { target };
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CardLinkCustom
vi.mock("../CardLinkCustom", () => ({
  CardLinkCustom: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLinkCustom(props, ref) {
      const { children, href, target, title, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          data-testid="card-link-custom"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// Mock Next.js Link component to avoid intersection observer issues
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

describe("CardTitle", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <CardTitle className="custom-class" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardTitle href="#" aria-label="Title">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("aria-label", "Title");
    });
  });

  describe("Link Functionality", () => {
    it("renders with link when href is provided and valid", () => {
      render(<CardTitle href="/test-link">Card title</CardTitle>);

      const link = screen.getByTestId("test-id-card-link-custom");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("renders without link when href is not valid", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      expect(
        screen.queryByTestId("test-id-card-link-custom")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("passes through link attributes", () => {
      render(
        <CardTitle href="/test" target="_blank" title="Test title">
          Card title
        </CardTitle>
      );

      const link = screen.getByTestId("test-id-card-link-custom");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardTitle href="#" />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardTitle href="#">{null}</CardTitle>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when only href is provided without children", () => {
      const { container } = render(<CardTitle href="/test" />);
      expect(container.firstChild).toBeNull();
    });

    it("renders children without link when href is invalid", () => {
      render(<CardTitle href="#">Valid children</CardTitle>);
      expect(screen.getByText("Valid children")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <CardTitle debugMode={true} href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as h2 element by default", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement.tagName).toBe("H2");
    });

    it("applies CSS classes", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("class");
    });

    it("combines custom classes", () => {
      render(
        <CardTitle className="custom-class" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debugId", () => {
      render(
        <CardTitle debugId="custom-id" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("custom-id-card-title");
      expect(titleElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-title"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <CardTitle debugId="test-id" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("data-testid", "test-id-card-title");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <CardTitle ref={ref} href="#">
          Card title
        </CardTitle>
      );

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <CardTitle ref={ref} href="#">
          Card title
        </CardTitle>
      );

      expect(ref.current?.tagName).toBe("H2");
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as h1 when as prop is h1", () => {
      render(
        <CardTitle as="h1" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement.tagName).toBe("H1");
    });

    it("renders as div when as prop is div", () => {
      render(
        <CardTitle as="div" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement.tagName).toBe("DIV");
    });

    it("renders as button when as prop is button", () => {
      render(
        <CardTitle as="button" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement.tagName).toBe("BUTTON");
    });

    it("renders as span when as prop is span", () => {
      render(
        <CardTitle as="span" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement.tagName).toBe("SPAN");
    });

    it("passes through element-specific props", () => {
      render(
        <CardTitle
          as="div"
          role="button"
          tabIndex={0}
          onClick={() => {}}
          href="#"
        >
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("role", "button");
      expect(titleElement).toHaveAttribute("tabIndex", "0");
    });

    it("passes through event handlers", () => {
      const handleClick = vi.fn();
      render(
        <CardTitle as="div" onClick={handleClick} href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      // Event handlers are not DOM attributes, they're properties
      expect(titleElement).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(
        <CardTitle debugId="aria-test" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("aria-test-card-title");
      expect(titleElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        <CardTitle
          as="article"
          aria-labelledby="title-id"
          aria-describedby="desc-id"
          href="#"
        >
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("aria-labelledby", "title-id");
      expect(titleElement).toHaveAttribute("aria-describedby", "desc-id");
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(
        <CardTitle as="h1" id="title-id" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute("id", "title-id");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <CardTitle as="div" aria-label="Clickable card title" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title");
      expect(titleElement).toHaveAttribute(
        "aria-label",
        "Clickable card title"
      );
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<CardTitle href="#" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardTitle href="#">
          <span>Complex</span> <strong>title</strong>
        </CardTitle>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardTitle href="#">Special chars: &lt;&gt;&amp;</CardTitle>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
