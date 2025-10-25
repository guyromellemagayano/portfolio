import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardLinkCustom } from "../CardLinkCustom";

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

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@guyromellemagayano/utils", () => ({
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
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
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

// Mock Next.js Link component to avoid intersection observer issues
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { href, target, title, children, ...rest } = props;
      return (
        <a ref={ref} href={href} target={target} title={title} {...rest}>
          {children}
        </a>
      );
    }
  ),
}));

describe("CardLinkCustom", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Link content
        </CardLinkCustom>
      );

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Link content
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("applies custom className", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          className="custom-class"
        >
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          data-testid="custom-testid"
          title="Link"
        >
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveAttribute("aria-label", "Link");
    });

    it("sets aria-label from title prop", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          title="Custom title"
        >
          Link content
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Custom title");
      expect(link).toHaveAttribute("title", "Custom title");
    });

    it("does not set aria-label when title is not provided", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Link content
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("aria-label");
      expect(link).not.toHaveAttribute("title");
    });
  });

  describe("Link Properties", () => {
    it("passes through link attributes", () => {
      render(
        <CardLinkCustom
          href="/test"
          target="_blank"
          title="Test title"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });

    it("adds rel attribute for external links", () => {
      render(
        <CardLinkCustom
          href="https://example.com"
          target="_blank"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("does not add rel attribute for internal links", () => {
      render(
        <CardLinkCustom
          href="/internal-link"
          target="_self"
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("rel");
    });

    it("handles invalid href by setting empty href", () => {
      render(
        <CardLinkCustom href="" debugId="test-link" debugMode={false}>
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByTestId("test-link-card-link-custom-root");
      expect(link).toHaveAttribute("href", "");
    });

    it("handles null href by setting empty href", () => {
      render(
        <CardLinkCustom
          href={null as any}
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByTestId("test-link-card-link-custom-root");
      expect(link).toHaveAttribute("href", "");
    });

    it("handles undefined href by setting empty href", () => {
      render(
        <CardLinkCustom
          href={undefined as any}
          debugId="test-link"
          debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByTestId("test-link-card-link-custom-root");
      expect(link).toHaveAttribute("href", "");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={true}>
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as anchor element", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement.tagName).toBe("A");
    });

    it("applies correct CSS classes", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toBeInTheDocument();
    });

    it("combines CSS module + custom classes", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          className="custom-class"
        >
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveClass("custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="custom-id" debugMode={false}>
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("custom-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-link-custom-root"
      );
    });

    it("uses provided internalId when available", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-id" debugMode={false}>
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "test-id-card-link-custom-root"
      );
    });

    it("renders with generated internal ID when not provided", () => {
      render(
        <CardLinkCustom href="/test-link" debugMode={false}>
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-testid",
        "test-id-card-link-custom-root"
      );
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          isMemoized={true}
        >
          Memoized content
        </CardLinkCustom>
      );

      expect(screen.getByText("Memoized content")).toBeInTheDocument();
    });

    it("renders without memoization by default", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Default content
        </CardLinkCustom>
      );

      expect(screen.getByText("Default content")).toBeInTheDocument();
    });

    it("maintains memoization across re-renders when isMemoized is true", () => {
      const { rerender } = render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          isMemoized={true}
        >
          Memoized content
        </CardLinkCustom>
      );

      const initialElement = screen.getByText("Memoized content");

      // Re-render with same props
      rerender(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          isMemoized={true}
        >
          Memoized content
        </CardLinkCustom>
      );

      const rerenderedElement = screen.getByText("Memoized content");
      expect(rerenderedElement).toBe(initialElement);
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          isMemoized={false}
        >
          Non-memoized content
        </CardLinkCustom>
      );

      const _initialElement = screen.getByText("Non-memoized content");

      // Re-render with different content to test non-memoization
      rerender(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          isMemoized={false}
        >
          Different content
        </CardLinkCustom>
      );

      expect(screen.getByText("Different content")).toBeInTheDocument();
      expect(
        screen.queryByText("Non-memoized content")
      ).not.toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          ref={ref}
        >
          Link content
        </CardLinkCustom>
      );

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <CardLinkCustom
          href="/test-link"
          debugId="test-link"
          debugMode={false}
          ref={ref}
        >
          Link content
        </CardLinkCustom>
      );

      expect(ref.current?.tagName).toBe("A");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          <span>Complex</span> <strong>content</strong>
        </CardLinkCustom>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          Special chars: &lt;&gt;&amp;
        </CardLinkCustom>
      );

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("does not render when children are empty", () => {
      const { container } = render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          {""}
        </CardLinkCustom>
      );

      // Should not render because component returns null for empty children
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are null", () => {
      const { container } = render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          {null}
        </CardLinkCustom>
      );

      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are undefined", () => {
      const { container } = render(
        <CardLinkCustom href="/test-link" debugId="test-link" debugMode={false}>
          {undefined}
        </CardLinkCustom>
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
