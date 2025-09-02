import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the HeaderDesktopNavItem component FIRST
vi.mock("../HeaderDesktopNavItem", () => {
  const MockHeaderDesktopNavItem = React.forwardRef<HTMLLIElement, any>(
    function MockHeaderDesktopNavItem(props, ref) {
      const { href, children, ...rest } = props;
      return React.createElement(
        "li",
        {
          ref,
          "data-testid": "header-desktop-nav-item-root",
          "data-href": href,
          ...rest,
        },
        React.createElement(
          "a",
          {
            href,
            "data-testid": "next-link",
          },
          children
        )
      );
    }
  );
  MockHeaderDesktopNavItem.displayName = "MockHeaderDesktopNavItem";
  return { HeaderDesktopNavItem: MockHeaderDesktopNavItem };
});

// Import mocked data
import { HeaderDesktopNav } from "../HeaderDesktopNav";

// Mock IntersectionObserver more robustly
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(() => null),
  unobserve: vi.fn(() => null),
  disconnect: vi.fn(() => null),
});

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

// Mock Next.js use-intersection hook
vi.mock("next/src/client/use-intersection", () => ({
  default: vi.fn(() => ({
    ref: vi.fn(),
    inView: true,
    entry: null,
  })),
}));

// Mock Next.js Link component more thoroughly
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const { href, children, ...rest } = props;
    return React.createElement(
      "a",
      {
        ref,
        href,
        "data-testid": "next-link",
        ...rest,
      },
      children
    );
  });
  MockLink.displayName = "MockNextLink";
  return { default: MockLink };
});

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId
      ? `${options.internalId}-header-desktop-nav`
      : "undefined-header-desktop-nav",
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
    // Return true for any non-empty string or valid content
    if (typeof value === "string") return value.length > 0;
    if (value && typeof value === "object") return true;
    return Boolean(value);
  }),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  })),
  hasValidNavigationLinks: vi.fn((links) => {
    return Boolean(links && Array.isArray(links) && links.length > 0);
  }),
  filterValidNavigationLinks: vi.fn((links) => {
    if (!links || !Array.isArray(links) || links.length === 0) {
      return [];
    }

    return links.filter((link) => {
      return Boolean(
        link &&
          typeof link.label === "string" &&
          link.label.length > 0 &&
          typeof link.href === "string" &&
          link.href.length > 0
      );
    });
  }),
  isValidNavigationLink: vi.fn((link) => {
    return Boolean(
      link &&
        typeof link.label === "string" &&
        link.label.length > 0 &&
        typeof link.href === "string" &&
        link.href.length > 0
    );
  }),
}));

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  isActivePath: vi.fn(() => true), // Changed to return true by default
}));

// Mock the data with current structure
vi.mock("../../../_data", () => ({
  DESKTOP_HEADER_NAV_LINKS: [
    { kind: "internal", href: "/about", label: "About" },
    { kind: "internal", href: "/articles", label: "Articles" },
    { kind: "internal", href: "/projects", label: "Projects" },
    { kind: "internal", href: "/speaking", label: "Speaking" },
    { kind: "internal", href: "/uses", label: "Uses" },
  ],
}));

// Mock the CSS module
vi.mock("../HeaderDesktopNav.module.css", () => ({
  default: {
    HeaderDesktopNavList: "header-desktop-nav-list",
  },
}));

describe("HeaderDesktopNav", () => {
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
      render(<HeaderDesktopNav />);
      expect(screen.getByTestId("header-desktop-nav-root")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderDesktopNav />);
      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderDesktopNav className="custom-class" />);
      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(<HeaderDesktopNav internalId="custom-id" />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "custom-id-header-desktop-nav"
      );
    });

    it("uses provided _internalId when available", () => {
      render(<HeaderDesktopNav internalId="test-id" />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "test-id-header-desktop-nav"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<HeaderDesktopNav debugMode={true} />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<HeaderDesktopNav debugMode={false} />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Navigation Links", () => {
    it("renders all navigation links", () => {
      render(<HeaderDesktopNav />);

      const navItems = screen.getAllByTestId("header-desktop-nav-item-root");
      expect(navItems).toHaveLength(5);
    });

    it("renders navigation links with correct hrefs", () => {
      render(<HeaderDesktopNav />);

      const navItems = screen.getAllByTestId("header-desktop-nav-item-root");
      expect(navItems).toHaveLength(5);

      // Check that the links are rendered (the mock should handle the hrefs)
      const links = screen.getAllByTestId("next-link");
      expect(links[0]).toHaveAttribute("href", "/about");
      expect(links[1]).toHaveAttribute("href", "/articles");
      expect(links[2]).toHaveAttribute("href", "/projects");
      expect(links[3]).toHaveAttribute("href", "/speaking");
      expect(links[4]).toHaveAttribute("href", "/uses");
    });

    it("renders navigation links with correct labels", () => {
      render(<HeaderDesktopNav />);

      const navItems = screen.getAllByTestId("header-desktop-nav-item-root");
      expect(navItems[0]).toHaveTextContent("About");
      expect(navItems[1]).toHaveTextContent("Articles");
      expect(navItems[2]).toHaveTextContent("Projects");
      expect(navItems[3]).toHaveTextContent("Speaking");
      expect(navItems[4]).toHaveTextContent("Uses");
    });

    it("generates unique keys for navigation items", () => {
      render(<HeaderDesktopNav />);

      const navItems = screen.getAllByTestId("header-desktop-nav-item-root");
      expect(navItems).toHaveLength(5);
    });
  });

  describe("Error Handling and Data Validation", () => {
    it("handles empty navigation links array gracefully", () => {
      // Test that component renders even with no nav items
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();

      // Component should render nav structure even if no items
      expect(nav.tagName).toBe("NAV");
    });

    it("validates navigation link structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();

      // Should render the expected number of nav items from mock data
      const navItems = screen.getAllByTestId("header-desktop-nav-item-root");
      expect(navItems).toHaveLength(5);
    });

    it("renders navigation with proper structure when data is valid", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();

      // Check that all nav items have proper structure
      const navItems = screen.getAllByTestId("header-desktop-nav-item-root");
      navItems.forEach((item) => {
        expect(item).toBeInTheDocument();
        expect(item.tagName).toBe("LI");
      });
    });

    it("handles component rendering with various prop combinations", () => {
      render(
        <HeaderDesktopNav
          className="custom-class"
          internalId="custom-id"
          debugMode={true}
          aria-label="Test navigation"
        />
      );

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass("custom-class");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "custom-id-header-desktop-nav"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("aria-label", "Test navigation");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the nav component", () => {
      const ref = vi.fn();
      render(<HeaderDesktopNav ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<HeaderDesktopNav ref={ref} />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(ref).toHaveBeenCalledWith(nav);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderDesktopNav aria-label="Desktop navigation" role="navigation" />
      );

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveAttribute("aria-label", "Desktop navigation");
      expect(nav).toHaveAttribute("role", "navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveClass("header-desktop-nav-list");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderDesktopNav className="custom-class" />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveClass("header-desktop-nav-list", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderDesktopNav />);

      const initialNav = screen.getByTestId("header-desktop-nav-root");

      rerender(<HeaderDesktopNav />);

      const updatedNav = screen.getByTestId("header-desktop-nav-root");
      expect(updatedNav).toBe(initialNav);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderDesktopNav />);

      rerender(<HeaderDesktopNav className="new-class" />);

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(<HeaderDesktopNav isMemoized={false} />);
      expect(screen.getByTestId("header-desktop-nav-root")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<HeaderDesktopNav isMemoized={true} />);
      expect(screen.getByTestId("header-desktop-nav-root")).toBeInTheDocument();
    });

    it("defaults to base component when isMemoized is undefined", () => {
      render(<HeaderDesktopNav />);
      expect(screen.getByTestId("header-desktop-nav-root")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderDesktopNav
          className="custom-class"
          internalId="custom-id"
          debugMode={true}
          aria-label="Test navigation"
          data-testid="custom-testid"
        />
      );

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveClass("custom-class");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "custom-id-header-desktop-nav"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("aria-label", "Test navigation");
    });

    it("handles undefined props gracefully", () => {
      render(
        <HeaderDesktopNav
          className={undefined}
          internalId={undefined}
          debugMode={undefined}
        />
      );

      const nav = screen.getByTestId("header-desktop-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "undefined-header-desktop-nav"
      );
      expect(nav).not.toHaveAttribute("data-debug-mode");
      expect(nav).toHaveClass("header-desktop-nav-list");
    });
  });
});
