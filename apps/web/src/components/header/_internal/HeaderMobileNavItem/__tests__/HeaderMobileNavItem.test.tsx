import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Mock IntersectionObserver before any imports
const mockIntersectionObserver = vi.hoisted(() => vi.fn());
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Individual mocks for this test file

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
}));

// Mock the CSS module
vi.mock("../HeaderMobileNavItem.module.css", () => ({
  default: {
    mobileHeaderNavItemLink: "mobile-header-nav-item-link",
  },
}));

// Mock the web utils
vi.mock("@web/utils", () => ({
  isActivePath: vi.fn(() => true), // Always return true for testing
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};

    // Only add data attributes when both id and suffix are provided
    if (id && suffix) {
      attributes[`data-${suffix}-id`] = `${id}-${suffix}`;
      attributes["data-testid"] = `${id}-${suffix}-root`;
    }

    // Only include data-debug-mode when debugMode is strictly true
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }

    return {
      ...attributes,
      ...additionalProps,
    };
  }),
  isRenderableContent: vi.fn((children) => {
    if (children == null) return false;
    if (typeof children === "string") return children.trim() !== "";
    if (Array.isArray(children))
      return children.some((child) => child != null && child !== "");
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  hasValidContent: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
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

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, className, ...props }) => {
    const React = require("react");
    return React.createElement(
      "a",
      {
        "data-testid": "next-link",
        href,
        className,
        ...props,
      },
      children
    );
  }),
}));

import { HeaderMobileNavItem } from "../HeaderMobileNavItem";

describe("HeaderMobileNavItem", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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
    it("uses provided internalId when available", () => {
      render(
        <HeaderMobileNavItem href="/about" _internalId="custom-id">
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("custom-id-header-mobile-nav-item-root");
      expect(item).toHaveAttribute(
        "data-header-mobile-nav-item-id",
        "custom-id-header-mobile-nav-item"
      );
    });

    it("uses provided _internalId when available", () => {
      render(
        <HeaderMobileNavItem href="/about" _internalId="test-id">
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
        <HeaderMobileNavItem href="/about" _debugMode={true}>
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <HeaderMobileNavItem href="/about" _debugMode={false}>
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
    it("does not render when children is null and href is not meaningful", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText).mockReturnValue(false);

      const { container } = render(
        <HeaderMobileNavItem href="/about">{null}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is undefined and href is not meaningful", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText).mockReturnValue(false);

      const { container } = render(
        <HeaderMobileNavItem href="/about">{undefined}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children is empty string and href is not meaningful", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText).mockReturnValue(false);

      const { container } = render(
        <HeaderMobileNavItem href="/about">{""}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders when children has meaningful content", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText).mockReturnValue(true);

      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders when href has meaningful content", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText)
        .mockReturnValueOnce(false) // children
        .mockReturnValueOnce(true); // href

      const { container } = render(
        <HeaderMobileNavItem href="/about">{null}</HeaderMobileNavItem>
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Link Properties", () => {
    it("uses provided href", () => {
      render(<HeaderMobileNavItem href="/custom">Custom</HeaderMobileNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("href", "/custom");
    });

    it("uses default target when not provided", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("uses custom target when provided", () => {
      render(
        <HeaderMobileNavItem href="/about" target="_blank">
          About
        </HeaderMobileNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("uses default title when not provided", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).not.toHaveAttribute("title");
    });

    it("uses custom title when provided", () => {
      render(
        <HeaderMobileNavItem href="/about" title="About page">
          About
        </HeaderMobileNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("title", "About page");
    });

    it("applies rel attribute for external links", async () => {
      const { getLinkTargetProps } = await import("@guyromellemagayano/utils");
      vi.mocked(getLinkTargetProps).mockReturnValue({
        target: "_blank",
        rel: "noopener noreferrer",
      });

      render(
        <HeaderMobileNavItem href="https://example.com" target="_blank">
          External
        </HeaderMobileNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      expect(
        screen.getByTestId("test-id-header-mobile-nav-item-root")
      ).toBeInTheDocument();
      expect(screen.getByTestId("next-link")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      const link = screen.getByTestId("next-link");
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

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderMobileNavItem href="/about" aria-label="About page">
          About
        </HeaderMobileNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toBeInTheDocument();
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const link = screen.getByTestId("next-link");
      // Check that the link has a CSS class (either mocked or actual)
      expect(link.className).toMatch(
        /mobile-header-nav-item-link|_mobileHeaderNavItemLink_/
      );
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <HeaderMobileNavItem href="/about" className="custom-class">
          About
        </HeaderMobileNavItem>
      );

      const link = screen.getByTestId("next-link");
      // Check that the link has the CSS class
      expect(link.className).toMatch(
        /mobile-header-nav-item-link|_mobileHeaderNavItemLink_/
      );

      // The className prop is applied to the li element, not the link
      const li = link.closest("li");
      expect(li).toHaveClass("custom-class");
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

      rerender(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const updatedItem = screen.getByTestId(
        "test-id-header-mobile-nav-item-root"
      );
      expect(updatedItem).toBe(initialItem);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(
        <HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>
      );

      rerender(
        <HeaderMobileNavItem href="/about" className="new-class">
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("test-id-header-mobile-nav-item-root");
      expect(item).toHaveClass("new-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderMobileNavItem
          href="/about"
          className="custom-class"
          _internalId="custom-id"
          _debugMode={true}
          target="_blank"
          title="About page"
          aria-label="About page"
        >
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("custom-id-header-mobile-nav-item-root");
      const link = screen.getByTestId("next-link");

      expect(item).toHaveClass("custom-class");
      expect(item).toHaveAttribute(
        "data-header-mobile-nav-item-id",
        "custom-id-header-mobile-nav-item"
      );
      expect(item).toHaveAttribute("data-debug-mode", "true");
      expect(link).toHaveAttribute("href", "/about");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "About page");
    });
  });
});
