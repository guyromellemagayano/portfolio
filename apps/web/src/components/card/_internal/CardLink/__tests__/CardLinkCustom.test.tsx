import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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
  isRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
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

import { CardLinkCustom } from "../CardLinkCustom";

describe("CardLinkCustom", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
          Link content
        </CardLinkCustom>
      );

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
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
          _internalId="test-link"
          _debugMode={false}
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
          _internalId="test-link"
          _debugMode={false}
          data-testid="custom-testid"
          aria-label="Link"
        >
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveAttribute("aria-label", "Link");
    });
  });

  describe("Link Properties", () => {
    it("passes through link attributes", () => {
      render(
        <CardLinkCustom
          href="/test"
          target="_blank"
          title="Test title"
          _internalId="test-link"
          _debugMode={false}
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
          _internalId="test-link"
          _debugMode={false}
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
          _internalId="test-link"
          _debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("rel");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={true}
        >
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
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
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
          Link content
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement.tagName).toBe("A");
    });

    it("applies correct CSS classes", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
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
          _internalId="test-link"
          _debugMode={false}
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
        <CardLinkCustom
          href="/test-link"
          _internalId="custom-id"
          _debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("custom-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-card-link-custom-id",
        "custom-id-card-link-custom"
      );
    });

    it("uses provided internalId when available", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-id"
          _debugMode={false}
        >
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-card-link-custom-id",
        "test-id-card-link-custom"
      );
    });

    it("renders with generated internal ID when not provided", () => {
      render(
        <CardLinkCustom href="/test-link" _debugMode={false}>
          Link text
        </CardLinkCustom>
      );

      const linkElement = screen.getByTestId("test-id-card-link-custom-root");
      expect(linkElement).toHaveAttribute(
        "data-card-link-custom-id",
        "test-id-card-link-custom"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
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
          _internalId="test-link"
          _debugMode={false}
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
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
          <span>Complex</span> <strong>content</strong>
        </CardLinkCustom>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
          Special chars: &lt;&gt;&amp;
        </CardLinkCustom>
      );

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles empty children", () => {
      render(
        <CardLinkCustom
          href="/test-link"
          _internalId="test-link"
          _debugMode={false}
        >
          {""}
        </CardLinkCustom>
      );

      // Should render because href is valid, even with empty children
      const linkElement = screen.getByTestId("test-link-card-link-custom-root");
      expect(linkElement).toBeInTheDocument();
    });
  });
});
