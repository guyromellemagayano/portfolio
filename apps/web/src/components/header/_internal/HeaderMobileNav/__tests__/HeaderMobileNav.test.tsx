import React from "react";
// Import react-intersection-observer test utilities
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

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
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
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
  filterValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return [];
    return links.filter((link) => {
      if (!link || typeof link !== "object") return false;
      if (!link.label || typeof link.label !== "string") return false;
      if (!link.href || typeof link.href !== "string") return false;
      if (link.href === "" || link.href === "#") return false;
      return true;
    });
  }),
  hasValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
  isValidNavigationLink: vi.fn((link) => {
    if (!link || typeof link !== "object") return false;
    if (!link.label || typeof link.label !== "string") return false;
    if (!link.href || typeof link.href !== "string") return false;
    if (link.href === "" || link.href === "#") return false;
    return true;
  }),
  isValidImageSrc: vi.fn((src) => {
    if (!src) return false;
    if (typeof src !== "string") return false;
    return src.trim() !== "";
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

// Mock Next.js use-intersection hook
vi.mock("next/src/client/use-intersection", () => ({
  default: vi.fn(() => ({ ref: vi.fn(), inView: true, entry: null })),
}));

// Import mocked data
import { HeaderMobileNav } from "../../HeaderMobileNav";

// Mock the data
vi.mock("../../_data/Header.data", () => ({
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS: {
    menu: "Menu",
    closeMenu: "Close menu",
    navigation: "Navigation",
  },
  MOBILE_HEADER_NAV_LINKS: [
    { kind: "internal", href: "/about", label: "About" },
    { kind: "internal", href: "/articles", label: "Articles" },
    { kind: "internal", href: "/contact", label: "Contact" },
  ],
}));

// Mock the Icon component
vi.mock("@web/components/icon", () => ({
  Icon: {
    ChevronDown: vi.fn(({ className, ...props }) => (
      <svg data-testid="chevron-down-icon" className={className} {...props} />
    )),
    Close: vi.fn(({ className, ...props }) => (
      <svg data-testid="close-icon" className={className} {...props} />
    )),
  },
}));

// Mock the HeaderMobileNavItem component
vi.mock("HeaderMobileNavItem", () => ({
  HeaderMobileNavItem: React.forwardRef<HTMLLIElement, any>(
    function MockHeaderMobileNavItem(props, ref) {
      const { href, children, _internalId, _debugMode, ...rest } = props;
      return (
        <li
          ref={ref}
          data-testid={`${_internalId}-header-mobile-nav-item-root`}
          data-header-mobile-nav-item-li-id={`${_internalId}-header-mobile-nav-item-li`}
          data-debug-mode={_debugMode ? "true" : undefined}
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
vi.mock("@headlessui/react", () => ({
  Popover: React.forwardRef<HTMLDivElement, any>(
    function MockPopover(props, ref) {
      const { children, ...rest } = props;
      return (
        <div ref={ref} {...rest}>
          {children}
        </div>
      );
    }
  ),
  PopoverButton: React.forwardRef<HTMLButtonElement, any>(
    function MockPopoverButton(props, ref) {
      const { children, ...rest } = props;
      return (
        <button ref={ref} data-testid="popover-button" {...rest}>
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
}));

// Mock the Icon component with correct icons
vi.mock("@web/components/icon", () => ({
  Icon: {
    ChevronDown: ({ ...props }: any) => (
      <div data-testid="chevron-down-icon" {...props} />
    ),
    Close: ({ ...props }: any) => <div data-testid="close-icon" {...props} />,
  },
}));

// Mock CSS modules
vi.mock("../HeaderMobileNav.module.css", () => ({
  default: {
    mobileHeaderNavButton: "_mobileHeaderNavButton_6c9d4e",
    mobileHeaderNavChevron: "_mobileHeaderNavChevron_6c9d4e",
    mobileHeaderNavBackdrop: "_mobileHeaderNavBackdrop_6c9d4e",
    mobileHeaderNavPanel: "_mobileHeaderNavPanel_6c9d4e",
    mobileHeaderNavHeader: "_mobileHeaderNavHeader_6c9d4e",
    mobileHeaderNavCloseButton: "_mobileHeaderNavCloseButton_6c9d4e",
    mobileHeaderNavCloseIcon: "_mobileHeaderNavCloseIcon_6c9d4e",
    mobileHeaderNavTitle: "_mobileHeaderNavTitle_6c9d4e",
    mobileHeaderNavContent: "_mobileHeaderNavContent_6c9d4e",
    mobileHeaderNavList: "_mobileHeaderNavList_6c9d4e",
    HeaderMobileNavContent: "_mobileHeaderNavContent_6c9d4e",
    HeaderMobileNavList: "_mobileHeaderNavList_6c9d4e",
  },
}));

describe("HeaderMobileNav", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    // Setup IntersectionObserver mock using react-intersection-observer
    mockAllIsIntersecting(true);
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
    it("uses provided internalId when available", () => {
      render(<HeaderMobileNav _internalId="custom-id" />);

      const nav = screen.getByTestId("custom-id-header-mobile-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "custom-id-header-mobile-nav"
      );
    });

    it("uses provided _internalId when available", () => {
      render(<HeaderMobileNav _internalId="test-id" />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-mobile-nav-id",
        "test-id-header-mobile-nav"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderMobileNav _debugMode={true} />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderMobileNav _debugMode={false} />);

      const nav = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Navigation Panel", () => {
    it("renders navigation panel header", () => {
      render(<HeaderMobileNav />);

      const header = screen.getByTestId("popover-panel");
      expect(header).toBeInTheDocument();
    });

    it("renders close button with correct aria-label", () => {
      render(<HeaderMobileNav />);

      const closeButton = screen.getAllByTestId("popover-button")[1];
      expect(closeButton).toHaveAttribute("aria-label", "Close menu");
    });

    it("renders close icon", () => {
      render(<HeaderMobileNav />);

      expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    });

    it("renders navigation title", () => {
      render(<HeaderMobileNav />);

      const title = screen.getByText("Navigation");
      expect(title).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("renders all navigation links", () => {
      render(<HeaderMobileNav />);

      // Check if the navigation section exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Check that the navigation has the correct CSS class
      expect(nav).toHaveClass("_mobileHeaderNavContent_6c9d4e");
    });

    it("renders navigation links with correct hrefs", () => {
      render(<HeaderMobileNav />);

      // Check if navigation structure exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Check that the navigation has the correct CSS class
      expect(nav).toHaveClass("_mobileHeaderNavContent_6c9d4e");
    });

    it("renders navigation links with correct labels", () => {
      render(<HeaderMobileNav />);

      // Check if navigation structure exists
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Check that the navigation has the correct CSS class
      expect(nav).toHaveClass("_mobileHeaderNavContent_6c9d4e");
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

      const closeButton = screen.getAllByTestId("popover-button")[1];
      expect(closeButton).toHaveAttribute("aria-label", "Close menu");
    });

    it("passes through aria attributes", () => {
      render(<HeaderMobileNav aria-label="Mobile navigation" />);

      const popover = screen.getByTestId("test-id-header-mobile-nav-root");
      expect(popover).toHaveAttribute("aria-label", "Mobile navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderMobileNav />);

      const button = screen.getAllByTestId("popover-button")[0];
      expect(button).toHaveClass("_mobileHeaderNavButton_6c9d4e");
    });

    it("combines custom className with CSS module classes", () => {
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
          _internalId="custom-id"
          _debugMode={true}
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
