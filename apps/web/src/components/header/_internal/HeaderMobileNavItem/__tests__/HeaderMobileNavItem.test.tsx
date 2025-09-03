// Mock next/navigation FIRST
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
}));

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeaderMobileNavItem } from "../HeaderMobileNavItem";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (
      children === null ||
      children === undefined ||
      children === "" ||
      children === true ||
      children === false ||
      children === 0
    ) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((value) => {
    // Return true for any non-empty string or valid content
    if (typeof value === "string") return value.length > 0;
    if (value && typeof value === "object") return true;
    return Boolean(value);
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href || href === "#" || href === "") {
      return { target: "_self" };
    }
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString?.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, className, ...props }) => (
    <a data-testid="next-link" href={href} className={className} {...props}>
      {children}
    </a>
  )),
}));

// Mock the lib
vi.mock("@web/lib", () => ({
  isActivePath: vi.fn(() => true), // Return true by default for tests
}));

// Mock the CSS module
vi.mock("../HeaderMobileNavItem.module.css", () => ({
  default: {
    mobileHeaderNavItemLink: "mobile-header-nav-item-link",
  },
}));

describe("HeaderMobileNavItem", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      expect(
        screen.getByTestId("header-mobile-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);
      const item = screen.getByTestId("header-mobile-nav-item-root");
      expect(item).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(
        <HeaderMobileNavItem href="/about" className="custom-class">
          About
        </HeaderMobileNavItem>
      );
      const item = screen.getByTestId("header-mobile-nav-item-root");
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

      const item = screen.getByTestId("header-mobile-nav-item-root");
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

      const item = screen.getByTestId("header-mobile-nav-item-root");
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

      const item = screen.getByTestId("header-mobile-nav-item-root");
      expect(item).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <HeaderMobileNavItem href="/about" _debugMode={false}>
          About
        </HeaderMobileNavItem>
      );

      const item = screen.getByTestId("header-mobile-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const item = screen.getByTestId("header-mobile-nav-item-root");
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
        screen.getByTestId("header-mobile-nav-item-root")
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
      expect(link).toHaveAttribute("title", "");
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
        screen.getByTestId("header-mobile-nav-item-root")
      ).toBeInTheDocument();
      expect(screen.getByTestId("next-link")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const item = screen.getByTestId("header-mobile-nav-item-root");
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

      const item = screen.getByTestId("header-mobile-nav-item-root");
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
      expect(link).toHaveClass("mobile-header-nav-item-link");
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <HeaderMobileNavItem href="/about" className="custom-class">
          About
        </HeaderMobileNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveClass("mobile-header-nav-item-link");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(
        <HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>
      );

      const initialItem = screen.getByTestId("header-mobile-nav-item-root");

      rerender(<HeaderMobileNavItem href="/about">About</HeaderMobileNavItem>);

      const updatedItem = screen.getByTestId("header-mobile-nav-item-root");
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

      const item = screen.getByTestId("header-mobile-nav-item-root");
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

      const item = screen.getByTestId("header-mobile-nav-item-root");
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
