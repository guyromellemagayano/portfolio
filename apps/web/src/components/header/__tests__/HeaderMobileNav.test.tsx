import React from "react";
// Import react-intersection-observer test utilities
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderMobileNav } from "../internal/HeaderMobileNav";

// Import shared mocks
import "./__mocks__";

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
  filterValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return [];
    return links.filter((link) => link && link.href && link.href !== "#");
  }),
  hasValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
  isValidNavigationLink: vi.fn((link) => {
    if (!link || typeof link !== "object") return false;
    if (!link.href || typeof link.href !== "string") return false;
    if (!link.label || typeof link.label !== "string") return false;
    return true;
  }),
}));

// Mock the Header data
vi.mock("../data", () => ({
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
vi.mock("../internal/HeaderMobileNavItem", () => ({
  HeaderMobileNavItem: React.forwardRef<HTMLLIElement, any>(
    function MockHeaderMobileNavItem(props, ref) {
      const { href, children, debugId, debugMode, ...rest } = props;
      return (
        <li
          ref={ref}
          data-testid={`${debugId}-header-mobile-nav-item-root`}
          data-header-mobile-nav-item-li-id={`${debugId}-header-mobile-nav-item-li`}
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
          <div ref={ref} data-testid="test-id-header-mobile-nav-root" {...rest}>
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
        screen.getByTestId("test-id-header-mobile-nav-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderMobileNav className="custom-class" />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(<HeaderMobileNav debugId="custom-id" />);

      const nav = screen.getByTestId("custom-id-header-mobile-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "custom-id-header-mobile-nav"
      );
    });

    it("uses provided debugId when available", () => {
      render(<HeaderMobileNav debugId="test-id" />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "test-id-header-mobile-nav"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderMobileNav debugMode={true} />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderMobileNav debugMode={false} />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Navigation Panel", () => {
    it("renders navigation panel header", () => {
      render(<HeaderMobileNav />);

      expect(screen.getByText("Navigation")).toBeInTheDocument();
      expect(screen.getAllByTestId("popover-button")).toHaveLength(2);
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    });

    it("renders close button with correct aria-label", () => {
      render(<HeaderMobileNav />);

      const closeButton = screen.getAllByTestId("popover-button")[1]; // Second button is the close button
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
      ];
      render(<HeaderMobileNav links={mockLinks} />);

      // Check if the navigation section exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Check if all links are rendered
      const links = screen.getAllByTestId("next-link");
      expect(links).toHaveLength(5); // Based on mockLinks
    });

    it("renders navigation links with correct hrefs when links prop is provided", () => {
      const mockLinks = [
        { kind: "internal", href: "/about", label: "About" },
        { kind: "internal", href: "/articles", label: "Articles" },
        { kind: "internal", href: "/projects", label: "Projects" },
        { kind: "internal", href: "/speaking", label: "Speaking" },
        { kind: "internal", href: "/uses", label: "Uses" },
      ];
      render(<HeaderMobileNav links={mockLinks} />);

      // Check if navigation structure exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const links = screen.getAllByTestId("next-link");
      expect(links[0]).toHaveAttribute("href", "/about");
      expect(links[1]).toHaveAttribute("href", "/articles");
      expect(links[2]).toHaveAttribute("href", "/projects");
      expect(links[3]).toHaveAttribute("href", "/speaking");
      expect(links[4]).toHaveAttribute("href", "/uses");
    });

    it("renders navigation links with correct labels when links prop is provided", () => {
      const mockLinks = [
        { kind: "internal", href: "/about", label: "About" },
        { kind: "internal", href: "/articles", label: "Articles" },
        { kind: "internal", href: "/projects", label: "Projects" },
        { kind: "internal", href: "/speaking", label: "Speaking" },
        { kind: "internal", href: "/uses", label: "Uses" },
      ];
      render(<HeaderMobileNav links={mockLinks} />);

      // Check if navigation structure exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("does not render navigation when no links are provided", () => {
      render(<HeaderMobileNav />);

      // Navigation should not be present when no links are provided
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderMobileNav />);

      expect(
        screen.getByTestId("test-id-header-mobile-nav-root")
      ).toBeInTheDocument();
      expect(screen.getAllByTestId("popover-button")).toHaveLength(2);
      expect(screen.getByTestId("popover-backdrop")).toBeInTheDocument();
      expect(screen.getByTestId("popover-panel")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderMobileNav />);

      const popover = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(popover).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderMobileNav />);

      const buttons = screen.getAllByTestId("popover-button");
      expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    });

    it("passes through aria attributes", () => {
      render(<HeaderMobileNav aria-label="Mobile navigation" />);

      const popover = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(popover).toHaveAttribute("aria-label", "Mobile navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies Tailwind classes correctly", () => {
      render(<HeaderMobileNav />);

      const button = screen.getAllByTestId("popover-button")[0];
      expect(button).toHaveClass(
        "group",
        "flex",
        "items-center",
        "rounded-full",
        "bg-white/90",
        "px-4",
        "py-2",
        "text-sm",
        "font-medium",
        "text-zinc-800",
        "shadow-lg",
        "ring-1",
        "shadow-zinc-800/5",
        "ring-zinc-900/5",
        "backdrop-blur-sm",
        "dark:bg-zinc-800/90",
        "dark:text-zinc-200",
        "dark:ring-white/10",
        "dark:hover:ring-white/20"
      );
    });

    it("combines custom className with Tailwind classes", () => {
      render(<HeaderMobileNav className="custom-class" />);

      const popover = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(popover).toHaveClass("custom-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty navigation links gracefully", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
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

      const nav = screen.getByTestId("custom-id-header-mobile-nav-root");
      expect(nav).toHaveClass("custom-class");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "custom-id-header-mobile-nav"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("aria-label", "Test navigation");
    });
  });
});
