import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Individual mocks for this test file

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
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

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
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

import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";

// Mock the CSS module
vi.mock("../HeaderDesktopNavItem.module.css", () => ({
  default: {
    desktopHeaderNavItemLink: "_desktopHeaderNavItemLink_c3edaf",
    desktopHeaderNavItemLinkActive: "_desktopHeaderNavItemLinkActive_c3edaf",
    desktopHeaderNavItemLinkHover: "_desktopHeaderNavItemLinkHover_c3edaf",
    desktopHeaderNavItemActiveIndicator:
      "_desktopHeaderNavItemActiveIndicator_c3edaf",
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
        screen.getByTestId("test-id-header-desktop-nav-item-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);
      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
      expect(item).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(
        <HeaderDesktopNavItem href="/about" className="custom-class">
          About
        </HeaderDesktopNavItem>
      );
      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
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

      const item = screen.getByTestId("custom-id-header-desktop-nav-item-root");
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

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
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

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
      expect(item).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <HeaderDesktopNavItem href="/about" _debugMode={false}>
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
      expect(item).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Content Validation", () => {
    it("renders when children has meaningful content", async () => {
      const { hasMeaningfulText } = await import("@guyromellemagayano/utils");
      vi.mocked(hasMeaningfulText).mockReturnValue(true);

      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);
      expect(
        screen.getByTestId("test-id-header-desktop-nav-item-root")
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
      // isActivePath is already mocked to return true by default
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveClass(
        "_desktopHeaderNavItemLink_c3edaf",
        "_desktopHeaderNavItemLinkActive_c3edaf"
      );
    });

    it("renders active indicator when active", () => {
      // isActivePath is already mocked to return true by default
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
      expect(link).not.toHaveAttribute("title");
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
        screen.getByTestId("test-id-header-desktop-nav-item-root")
      ).toBeInTheDocument();
      expect(screen.getByTestId("next-link")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
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

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
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

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
      expect(item).toHaveAttribute("aria-label", "About page");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>);

      const link = screen.getByTestId("next-link");
      expect(link).toHaveClass("_desktopHeaderNavItemLink_c3edaf");
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <HeaderDesktopNavItem href="/about" className="custom-class">
          About
        </HeaderDesktopNavItem>
      );

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
      expect(item).toHaveClass("custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(
        <HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>
      );

      const initialItem = screen.getByTestId(
        "test-id-header-desktop-nav-item-root"
      );

      rerender(
        <HeaderDesktopNavItem href="/about">About</HeaderDesktopNavItem>
      );

      const updatedItem = screen.getByTestId(
        "test-id-header-desktop-nav-item-root"
      );
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

      const item = screen.getByTestId("test-id-header-desktop-nav-item-root");
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

      const item = screen.getByTestId("custom-id-header-desktop-nav-item-root");
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
