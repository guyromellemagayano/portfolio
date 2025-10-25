// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import React from "react";
// Import react-intersection-observer test utilities
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderMobileNav } from "..";

// Mock IntersectionObserver globally
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
Object.defineProperty(globalThis, "IntersectionObserver", {
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
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
}));

// Mock @headlessui/react
vi.mock("@headlessui/react", () => ({
  Popover: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "popover", ...props },
      children
    );
  }),
  PopoverBackdrop: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "popover-backdrop", ...props },
      children
    );
  }),
  PopoverButton: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "button",
      { "data-testid": "popover-button", ...props },
      children
    );
  }),
  PopoverPanel: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "popover-panel", ...props },
      children
    );
  }),
}));

// Mock @web/components/Icon
vi.mock("@web/components/Icon", () => ({
  Icon: {
    Menu: vi.fn((props) => {
      const React = require("react");
      return React.createElement("svg", {
        "data-testid": "icon-menu",
        ...props,
      });
    }),
  },
}));

// Mock HeaderMobileNavItem
vi.mock("../HeaderMobileNavItem", () => ({
  HeaderMobileNavItem: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "header-mobile-nav-item", ...props },
      children
    );
  }),
}));

// Mock the useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
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
  hasAnyRenderableContent: vi.fn((children) => {
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
  filterValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return [];
    return links.filter((link) => link && link.href && link.href !== "#");
  }),
  hasValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
}));

// Mock the Header data
vi.mock("../_data", () => ({
  MOBILE_HEADER_NAV_LINKS: [
    { kind: "internal", href: "/about", label: "About" },
    { kind: "internal", href: "/articles", label: "Articles" },
    { kind: "internal", href: "/projects", label: "Projects" },
    { kind: "internal", href: "/speaking", label: "Speaking" },
    { kind: "internal", href: "/uses", label: "Uses" },
  ],
  MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS: {
    menu: "Menu",
    closeMenu: "Close menu",
    navigation: "Navigation",
  },
}));

// Mock the HeaderMobileNavItem component
vi.mock("../_internal/HeaderMobileNavItem", () => ({
  HeaderMobileNavItem: React.forwardRef<HTMLLIElement, any>(
    function MockHeaderMobileNavItem(props, ref) {
      const { href, children, debugId, debugMode, ...rest } = props;
      return (
        <li
          ref={ref}
          data-testid={`${debugId}-header-mobile-nav-item`}
          data-header-mobile-nav-item-id={`${debugId}-header-mobile-nav-item`}
          data-debug-mode={debugMode ? "true" : undefined}
          data-href={href}
          {...rest}
        >
          <a href={href} data-testid="next-link">
            {children}
          </a>
        </li>
      );
    }
  ),
}));

// Mock Headless UI components with proper ref forwarding
vi.mock("@headlessui/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@headlessui/react")>();
  return {
    ...actual,
    Popover: React.forwardRef<HTMLDivElement, any>(
      function MockPopover(props, ref) {
        const { children, ...rest } = props;
        return (
          <div ref={ref} data-testid="test-id-header-mobile-nav" {...rest}>
            {children}
          </div>
        );
      }
    ),
    PopoverButton: React.forwardRef<HTMLButtonElement, any>(
      function MockPopoverButton(props, ref) {
        const { children, ...rest } = props;
        return (
          <button
            ref={ref}
            data-testid="popover-button"
            aria-expanded="false"
            {...rest}
          >
            {children}
          </button>
        );
      }
    ),
    PopoverPanel: React.forwardRef<HTMLDivElement, any>(
      function MockPopoverPanel(props, ref) {
        const { children, ...rest } = props;
        return (
          <div ref={ref} data-testid="popover-panel" {...rest}>
            {children}
          </div>
        );
      }
    ),
    PopoverBackdrop: React.forwardRef<HTMLDivElement, any>(
      function MockPopoverBackdrop(props, ref) {
        const { children, ...rest } = props;
        return (
          <div ref={ref} data-testid="popover-backdrop" {...rest}>
            {children}
          </div>
        );
      }
    ),
  };
});

// Mock the Icon component
vi.mock("@web/components/Icon", () => ({
  Icon: {
    ChevronDown: vi.fn((props) => (
      <div data-testid="chevron-down-icon" {...props} />
    )),
    Close: vi.fn((props) => <div data-testid="close-icon" {...props} />),
  },
}));

describe("HeaderMobileNav", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    // Reset console.warn mock
    vi.spyOn(console, "warn").mockImplementation(() => {});
    mockAllIsIntersecting(true); // Mock IntersectionObserver to always be intersecting
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<HeaderMobileNav />);
      expect(
        screen.getByTestId("test-id-header-mobile-nav")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderMobileNav className="custom-class" />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).toHaveAttribute("class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(<HeaderMobileNav debugId="custom-id" />);

      const nav = screen.getByTestId("custom-id-header-mobile-nav");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "custom-id-header-mobile-nav"
      );
    });

    it("uses provided debugId when available", () => {
      render(<HeaderMobileNav debugId="test-id" />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "test-id-header-mobile-nav"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderMobileNav debugMode={true} />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderMobileNav debugMode={false} />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Navigation Panel", () => {
    it("renders navigation panel header", () => {
      render(<HeaderMobileNav />);

      expect(screen.getByText("Navigation")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-mobile-nav-button")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-mobile-nav-close-button")
      ).toBeInTheDocument();
    });

    it("renders close button with correct aria-label", () => {
      render(<HeaderMobileNav />);

      const closeButton = screen.getByTestId(
        "test-id-header-mobile-nav-close-button"
      );
      expect(closeButton).toHaveAttribute("aria-label", "Close menu");
    });

    it("renders close icon", () => {
      render(<HeaderMobileNav />);

      expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    });

    it("renders navigation title", () => {
      render(<HeaderMobileNav />);

      expect(screen.getByText("Navigation")).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("renders all navigation links when links prop is provided", () => {
      const mockLinks = [
        { kind: "internal", href: "/about", label: "About" },
        { kind: "internal", href: "/articles", label: "Articles" },
        { kind: "internal", href: "/projects", label: "Projects" },
        { kind: "internal", href: "/speaking", label: "Speaking" },
        { kind: "internal", href: "/uses", label: "Uses" },
      ] as const;
      render(<HeaderMobileNav links={mockLinks} />);

      // Check if the navigation section exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Check if all links are rendered
      const links = screen.getAllByTestId(
        "test-id-header-mobile-nav-item-link"
      );
      expect(links).toHaveLength(4); // Based on actual Header data
    });

    it("renders navigation links with correct hrefs when links prop is provided", () => {
      const mockLinks = [
        { kind: "internal", href: "/about", label: "About" },
        { kind: "internal", href: "/articles", label: "Articles" },
        { kind: "internal", href: "/projects", label: "Projects" },
        { kind: "internal", href: "/speaking", label: "Speaking" },
        { kind: "internal", href: "/uses", label: "Uses" },
      ] as const;
      render(<HeaderMobileNav links={mockLinks} />);

      // Check if navigation structure exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const links = screen.getAllByTestId(
        "test-id-header-mobile-nav-item-link"
      );
      expect(links[0]).toHaveAttribute("href", "/about");
      expect(links[1]).toHaveAttribute("href", "/articles");
      expect(links[2]).toHaveAttribute("href", "/projects");
      expect(links[3]).toHaveAttribute("href", "/uses");
    });

    it("renders navigation links with correct labels when links prop is provided", () => {
      const mockLinks = [
        { kind: "internal", href: "/about", label: "About" },
        { kind: "internal", href: "/articles", label: "Articles" },
        { kind: "internal", href: "/projects", label: "Projects" },
        { kind: "internal", href: "/speaking", label: "Speaking" },
        { kind: "internal", href: "/uses", label: "Uses" },
      ] as const;
      render(<HeaderMobileNav links={mockLinks} />);

      // Check if navigation structure exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      // Speaking link removed - only 4 links in actual Header data
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("does not render navigation when no links are provided", () => {
      render(<HeaderMobileNav />);

      // Navigation should still be present even when no links are provided
      expect(screen.queryByRole("navigation")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderMobileNav />);

      expect(
        screen.getByTestId("test-id-header-mobile-nav")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-mobile-nav-button")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-mobile-nav-backdrop")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-mobile-nav-panel")
      ).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderMobileNav />);

      const popover = screen.getByTestId("test-id-header-mobile-nav");
      expect(popover).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderMobileNav />);

      const button = screen.getByTestId("test-id-header-mobile-nav-button");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("passes through aria attributes", () => {
      render(<HeaderMobileNav aria-label="Mobile navigation" />);

      const popover = screen.getByTestId("test-id-header-mobile-nav");
      expect(popover).toHaveAttribute("aria-label", "Mobile navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies Tailwind classes correctly", () => {
      render(<HeaderMobileNav />);

      const button = screen.getByTestId("test-id-header-mobile-nav-button");
      expect(button).toHaveAttribute("class");
    });

    it("combines custom className with Tailwind classes", () => {
      render(<HeaderMobileNav className="custom-class" />);

      const popover = screen.getByTestId("test-id-header-mobile-nav");
      expect(popover).toHaveClass("custom-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty navigation links gracefully", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("test-id-header-mobile-nav");
      expect(nav).toBeInTheDocument();
    });

    it("handles complex prop combinations", () => {
      render(
        <HeaderMobileNav
          className="custom-class"
          debugId="custom-id"
          debugMode={true}
          aria-label="Test navigation"
        />
      );

      const nav = screen.getByTestId("custom-id-header-mobile-nav");
      expect(nav).toHaveAttribute("class");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "custom-id-header-mobile-nav"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("aria-label", "Test navigation");
    });
  });
});
