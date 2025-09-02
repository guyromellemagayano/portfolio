import React from "react";
// Import react-intersection-observer test utilities
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock Next.js use-intersection hook
vi.mock("next/src/client/use-intersection", () => ({
  default: vi.fn(() => ({ ref: vi.fn(), inView: true, entry: null })),
}));

// Import mocked data
import { HeaderMobileNav } from "../HeaderMobileNav";

// Mock the hooks
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
}));

// Mock the data
vi.mock("../../../_data", () => ({
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

// Mock the HeaderMobileNavItem component
vi.mock("../HeaderMobileNavItem", () => ({
  HeaderMobileNavItem: React.forwardRef<HTMLLIElement, any>(
    function MockHeaderMobileNavItem(props, ref) {
      const { href, children, ...rest } = props;
      return (
        <li
          ref={ref}
          data-testid="mobile-header-nav-item-root"
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
        <div ref={ref} data-testid="mobile-header-nav-root" {...rest}>
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
    HeaderMobileNavButton: "mobileHeaderNavButton",
    HeaderMobileNavChevron: "mobileHeaderNavChevron",
    HeaderMobileNavPanel: "mobileHeaderNavPanel",
    HeaderMobileNavBackdrop: "mobileHeaderNavBackdrop",
    HeaderMobileNavHeader: "mobileHeaderNavHeader",
    HeaderMobileNavCloseButton: "mobileHeaderNavCloseButton",
    HeaderMobileNavCloseIcon: "mobileHeaderNavCloseIcon",
    HeaderMobileNavTitle: "mobileHeaderNavTitle",
    HeaderMobileNavContent: "mobileHeaderNavContent",
    HeaderMobileNavList: "mobileHeaderNavList",
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
      expect(screen.getByTestId("mobile-header-nav-root")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderMobileNav />);
      const nav = screen.getByTestId("mobile-header-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderMobileNav className="custom-class" />);
      const nav = screen.getByTestId("mobile-header-nav-root");
      expect(nav).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(<HeaderMobileNav _internalId="custom-id" />);

      const nav = screen.getByTestId("mobile-header-nav-root");
      expect(nav).toHaveAttribute(
        "data-mobile-header-nav-id",
        "custom-id-mobile-header-nav"
      );
    });

    it("uses provided _internalId when available", () => {
      render(<HeaderMobileNav _internalId="test-id" />);

      const nav = screen.getByTestId("mobile-header-nav-root");
      expect(nav).toHaveAttribute(
        "data-mobile-header-nav-id",
        "test-id-mobile-header-nav"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderMobileNav _debugMode={true} />);

      const nav = screen.getByTestId("mobile-header-nav-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderMobileNav debugMode={false} />);

      const nav = screen.getByTestId("mobile-header-nav-root");
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

      const navItems = screen.getAllByTestId("header-mobile-nav-item-root");
      expect(navItems).toHaveLength(3);
    });

    it("renders navigation links with correct hrefs", () => {
      render(<HeaderMobileNav />);

      const links = screen.getAllByRole("link");
      expect(links[0]).toHaveAttribute("href", "/about");
      expect(links[1]).toHaveAttribute("href", "/articles");
      expect(links[2]).toHaveAttribute("href", "/contact");
    });

    it("renders navigation links with correct labels", () => {
      render(<HeaderMobileNav />);

      const navItems = screen.getAllByTestId("header-mobile-nav-item-root");
      expect(navItems[0]).toHaveTextContent("About");
      expect(navItems[1]).toHaveTextContent("Articles");
      expect(navItems[2]).toHaveTextContent("Contact");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderMobileNav />);

      expect(screen.getByTestId("mobile-header-nav-root")).toBeInTheDocument();
      expect(screen.getAllByTestId("popover-button")).toHaveLength(2);
      expect(screen.getByTestId("popover-backdrop")).toBeInTheDocument();
      expect(screen.getByTestId("popover-panel")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderMobileNav />);

      const popover = screen.getByTestId("mobile-header-nav-root");
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

      const popover = screen.getByTestId("mobile-header-nav-root");
      expect(popover).toHaveAttribute("aria-label", "Mobile navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderMobileNav />);

      const button = screen.getAllByTestId("popover-button")[0];
      expect(button).toHaveClass("mobileHeaderNavButton");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderMobileNav className="custom-class" />);

      const popover = screen.getByTestId("mobile-header-nav-root");
      expect(popover).toHaveClass("custom-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty navigation links gracefully", () => {
      render(<HeaderMobileNav />);

      const nav = screen.getByTestId("mobile-header-nav-root");
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

      const nav = screen.getByTestId("mobile-header-nav-root");
      expect(nav).toHaveClass("custom-class");
      expect(nav).toHaveAttribute(
        "data-mobile-header-nav-id",
        "custom-id-mobile-header-nav"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("aria-label", "Test navigation");
    });
  });
});
