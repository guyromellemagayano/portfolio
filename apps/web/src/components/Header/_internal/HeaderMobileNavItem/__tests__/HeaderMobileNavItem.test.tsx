// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderMobileNavItem } from "../HeaderMobileNavItem";

// Individual mocks for this test file

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href) return { target: "_self" };
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
}));

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
}));

// Mock the web utils
vi.mock("@web/utils", () => ({
  isActivePath: vi.fn(() => true), // Always return true for testing
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
}));

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    id: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};
    if (id && suffix) {
      attributes[`data-${suffix}-id`] = `${id}-${suffix}`;
      attributes["data-testid"] = `${id}-${suffix}-root`;
    }
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }
    return { ...attributes, ...additionalProps };
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href) return { target: "_self" };
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockLink(props, ref) {
      const { children, href, ...rest } = props;
      return (
        <a ref={ref} href={href} data-testid="next-link" {...rest}>
          {children}
        </a>
      );
    }
  ),
}));

describe("HeaderMobileNavItem", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    // Reset console.warn mock
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(
        <HeaderMobileNavItem href="/about" className="custom-class">
          About
        </HeaderMobileNavItem>
      );
      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(
        <HeaderMobileNavItem href="/about" debugId="custom-id">
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("custom-id-header-mobile-nav-item-root");
      expect(item).toHaveAttribute(
        "data-header-mobile-nav-item-id",
        "custom-id-header-mobile-nav-item"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <HeaderMobileNavItem href="/about" debugId="test-id">
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).toHaveAttribute(
        "data-header-mobile-nav-item-id",
        "test-id-header-mobile-nav-item"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(
        <HeaderMobileNavItem href="/about" debugMode={true}>
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <HeaderMobileNavItem href="/about" debugMode={false}>
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Content Validation", () => {
    it("does not render when children is null and href is not meaningful", () => {
      const { container } = render(
        <HeaderMobileNavItem href="">{null}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is undefined and href is not meaningful", () => {
      const { container } = render(
        <HeaderMobileNavItem href="">{undefined}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is empty string and href is not meaningful", () => {
      const { container } = render(
        <HeaderMobileNavItem href="">{""}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders when children has meaningful content", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders when href has meaningful content", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-link-root")
      ).toBeInTheDocument();
    });
  });

  describe("Link Properties", () => {
    it("uses provided href", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).toHaveAttribute("href", "/about");
    });

    it("uses default target when not provided", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).toHaveAttribute("target", "_self");
    });

    it("uses custom target when provided", () => {
      render(
        <HeaderMobileNavItem href="/about" target="_blank">
          About
        </HeaderMobileNavItem>
      );
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("uses default title when not provided", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).not.toHaveAttribute("title");
    });

    it("uses custom title when provided", () => {
      render(
        <HeaderMobileNavItem href="/about" title="About page">
          About
        </HeaderMobileNavItem>
      );
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).toHaveAttribute("title", "About page");
    });

    it("applies rel attribute for external links", () => {
      render(
        <HeaderMobileNavItem href="https://example.com" target="_blank">
          External
        </HeaderMobileNavItem>
      );
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-root")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-link-root")
      ).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(item.tagName).toBe("LI");
      expect(link.tagName).toBe("A");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the li component", () => {
      const ref = vi.fn();
      render(
        <HeaderMobileNavItem href="/about" ref={ref}>
          About
        </HeaderMobileNavItem>
      );
      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(
        <HeaderMobileNavItem href="/about" ref={ref}>
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(ref).toHaveBeenCalledWith(item);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).not.toHaveAttribute("aria-label");
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderMobileNavItem href="/about" title="About page">
          About
        </HeaderMobileNavItem>
      );
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      expect(link).toHaveAttribute("aria-label", "About page");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies Tailwind classes correctly", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const link = screen.getByTestId(
        "test-id-header-mobile-nav-item-link-root"
      );
      // Check that the link has Tailwind classes
      expect(link.className).toMatch(/relative block py-2 transition/);
    });

    it("combines custom className with Tailwind classes", () => {
      render(
        <HeaderMobileNavItem href="/about" className="custom-class">
          About
        </HeaderMobileNavItem>
      );
      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      // Check that the item has the custom class
      expect(item).toHaveClass("custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(
        <HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>
      );

      const initialItem = screen.getByTestId(
        "test-id-header-mobile-nav-item-root"
      );
      expect(initialItem).toBeInTheDocument();

      // Re-render with same props
      rerender(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const rerenderedItem = screen.getByTestId(
        "test-id-header-mobile-nav-item-root"
      );
      expect(rerenderedItem).toBeInTheDocument();
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(
        <HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>
      );

      const initialItem = screen.getByTestId(
        "test-id-header-mobile-nav-item-root"
      );
      expect(initialItem).toBeInTheDocument();

      // Change className
      rerender(
        <HeaderMobileNavItem href="/about" className="new-class">
          About
        </HeaderMobileNavItem>
      );

      const updatedItem = screen.getByTestId(
        "test-id-header-mobile-nav-item-root"
      );
      expect(updatedItem).toHaveClass("new-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderMobileNavItem
          href="/about"
          debugId="custom-id"
          debugMode={true}
          className="custom-class"
          aria-label="About page"
          target="_blank"
          title="About page"
        >
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("custom-id-header-mobile-nav-item-root");
      const link = screen.getByTestId(
        "custom-id-header-mobile-nav-item-link-root"
      );

      expect(item).toHaveClass("custom-class");
      expect(item).toHaveAttribute(
        "data-header-mobile-nav-item-id",
        "custom-id-header-mobile-nav-item"
      );
      expect(item).toHaveAttribute("data-debug-mode", "true");
      expect(link).toHaveAttribute("href", "/about");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "About page");
      expect(link).toHaveAttribute("aria-label", "About page");
    });
  });
});
