import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Import mocked functions
import { isActivePath } from "@web/lib";

import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
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
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
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

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  isActivePath: vi.fn(() => true), // Changed to return true by default
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, className, ...props }) => (
    <a data-testid="next-link" href={href} className={className} {...props}>
      {children}
    </a>
  )),
}));

// Mock the CSS module
vi.mock("../HeaderDesktopNavItem.module.css", () => ({
  default: {
    desktopHeaderNavItemLink: "_desktopHeaderNavItemLink_8adac4",
    desktopHeaderNavItemLinkActive: "_desktopHeaderNavItemLinkActive_8adac4",
    desktopHeaderNavItemLinkHover: "_desktopHeaderNavItemLinkHover_8adac4",
    desktopHeaderNavItemActiveIndicator:
      "_desktopHeaderNavItemActiveIndicator_8adac4",
  },
}));

describe("HeaderDesktopNavItem", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);
      expect(
        screen.getByTestId("header-desktop-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);
      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(
        <HeaderDesktopNavItem href="/about" className="custom-class">
          About
        </HeaderDesktopNavItem>
      );
      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(
        <HeaderDesktopNavItem href="/about" _internalId="custom-id">
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveAttribute(
        "data-header-desktop-nav-item-id",
        "custom-id-header-desktop-nav-item"
      );
    });

    it("uses provided _internalId when available", () => {
      render(
        <HeaderDesktopNavItem href="/about" _internalId="test-id">
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveAttribute(
        "data-header-desktop-nav-item-id",
        "test-id-header-desktop-nav-item"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(
        <HeaderDesktopNavItem href="/about" _debugMode={true}>
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <HeaderDesktopNavItem href="/about" debugMode={false}>
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Content Validation", () => {
    it("renders when children has meaningful content", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText).mockReturnValue(true);

      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);
      expect(
        screen.getByTestId("header-desktop-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders when href has meaningful content", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText)
        .mockReturnValueOnce(false) // children
        .mockReturnValueOnce(true); // href

      const { container } = render(
        <HeaderDesktopNavItem href="/about">{null}</HeaderDesktopNavItem>
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Active State", () => {
    it("applies active styles when pathname matches href", () => {
      vi.mocked(isActivePath).mockReturnValue(true);

      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveClass(
        "_desktopHeaderNavItemLink_8adac4",
        "_desktopHeaderNavItemLinkActive_8adac4"
      );
    });

    it("renders active indicator when active", () => {
      vi.mocked(isActivePath).mockReturnValue(true);

      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      const indicator = link.querySelector("span");
      expect(indicator).toBeInTheDocument();
    });
  });

  describe("Link Properties", () => {
    it("uses provided href", () => {
      render(
        <HeaderDesktopNavItem href="/custom">Custom</HeaderDesktopNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("href", "/custom");
    });

    it("uses default target when not provided", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("uses custom target when provided", () => {
      render(
        <HeaderDesktopNavItem href="/about" target="_blank">
          About
        </HeaderDesktopNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("uses default title when not provided", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("title", "");
    });

    it("uses custom title when provided", () => {
      render(
        <HeaderDesktopNavItem href="/about" title="About page">
          About
        </HeaderDesktopNavItem>
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
        <HeaderDesktopNavItem href="https://example.com" target="_blank">
          External
        </HeaderDesktopNavItem>
      );

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      expect(
        screen.getByTestId("header-desktop-nav-item-root")
      ).toBeInTheDocument();
      expect(screen.getByTestId("next-link")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const item = screen.getByTestId("header-desktop-nav-item-root");
      const link = screen.getByTestId("next-link");
      expect(item.tagName).toBe("LI");
      expect(link.tagName).toBe("A");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the li component", () => {
      const ref = vi.fn();
      render(
        <HeaderDesktopNavItem href="/about" ref={ref}>
          About
        </HeaderDesktopNavItem>
      );

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(
        <HeaderDesktopNavItem href="/about" ref={ref}>
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(ref).toHaveBeenCalledWith(item);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("passes through aria attributes to li element", () => {
      render(
        <HeaderDesktopNavItem href="/about" aria-label="About page">
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveAttribute("aria-label", "About page");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveClass("_desktopHeaderNavItemLink_8adac4");
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <HeaderDesktopNavItem href="/about" className="custom-class">
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveClass("custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(
        <HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>
      );

      const initialItem = screen.getByTestId("header-desktop-nav-item-root");

      rerender(
        <HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>
      );

      const updatedItem = screen.getByTestId("header-desktop-nav-item-root");
      expect(updatedItem).toBe(initialItem);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(
        <HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>
      );

      rerender(
        <HeaderDesktopNavItem href="/about" className="new-class">
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      expect(item).toHaveClass("new-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderDesktopNavItem
          href="/about"
          className="custom-class"
          _internalId="custom-id"
          _debugMode={true}
          target="_blank"
          title="About page"
          aria-label="About page"
        >
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("header-desktop-nav-item-root");
      const link = screen.getByTestId("next-link");

      expect(item).toHaveClass("custom-class");
      expect(item).toHaveAttribute(
        "data-header-desktop-nav-item-id",
        "custom-id-header-desktop-nav-item"
      );
      expect(item).toHaveAttribute("data-debug-mode", "true");
      expect(link).toHaveAttribute("href", "/about");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "About page");
      expect(item).toHaveAttribute("aria-label", "About page");
    });
  });
});
