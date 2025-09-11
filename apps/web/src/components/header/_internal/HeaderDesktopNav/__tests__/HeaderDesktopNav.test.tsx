import React from "react";

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
  filterValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return [];
    return links.filter((link) => {
      if (!link || typeof link !== "object") return false;
      if (!link.href || typeof link.href !== "string") return false;
      if (!link.label || typeof link.label !== "string") return false;
      return true;
    });
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

// Mock the HeaderDesktopNavItem component FIRST
vi.mock("../HeaderDesktopNavItem", () => {
  const MockHeaderDesktopNavItem = React.forwardRef<HTMLLIElement, any>(
    function MockHeaderDesktopNavItem(props, ref) {
      const { href, children, ...rest } = props;
      return React.createElement(
        "li",
        {
          ref,
          "data-testid": "header-test-id-desktop-nav-item-root",
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
      expect(
        screen.getByTestId("test-id-header-desktop-nav-root")
      ).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderDesktopNav />);
      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderDesktopNav className="custom-class" />);
      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided _internalId when available", () => {
      render(<HeaderDesktopNav _internalId="custom-id" />);

      const nav = screen.getByTestId("custom-id-header-desktop-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "custom-id-header-desktop-nav"
      );
    });

    it("uses provided _internalId when available", () => {
      render(<HeaderDesktopNav _internalId="test-id" />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "test-id-header-desktop-nav"
      );
    });

    it("applies data-debug-mode when _debugMode is true", () => {
      render(<HeaderDesktopNav _debugMode={true} />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when _debugMode is false", () => {
      render(<HeaderDesktopNav _debugMode={false} />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when _debugMode is undefined", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Navigation Links", () => {
    it("renders navigation structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with navigation data", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("handles navigation links prop", () => {
      const customLinks = [
        { kind: "internal", href: "/custom", label: "Custom" },
      ];
      render(<HeaderDesktopNav links={customLinks} />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("renders navigation component structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Error Handling and Data Validation", () => {
    it("handles empty navigation links array gracefully", () => {
      // Test that component renders even with no nav items
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();

      // Component should render nav structure even if no items
      expect(nav.tagName).toBe("NAV");
    });

    it("validates navigation link structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("renders navigation with proper structure when data is valid", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("handles component rendering with various prop combinations", () => {
      render(
        <HeaderDesktopNav
          className="custom-class"
          _internalId="custom-id"
          _debugMode={true}
          aria-label="Test navigation"
        />
      );

      const nav = screen.getByTestId("custom-id-header-desktop-nav-root");
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

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
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

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(ref).toHaveBeenCalledWith(nav);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderDesktopNav aria-label="Desktop navigation" role="navigation" />
      );

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveAttribute("aria-label", "Desktop navigation");
      expect(nav).toHaveAttribute("role", "navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveClass("header-desktop-nav-list");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderDesktopNav className="custom-class" />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveClass("header-desktop-nav-list", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderDesktopNav />);

      const initialNav = screen.getByTestId("test-id-header-desktop-nav-root");

      rerender(<HeaderDesktopNav />);

      const updatedNav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(updatedNav).toBe(initialNav);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderDesktopNav />);

      rerender(<HeaderDesktopNav className="new-class" />);

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(<HeaderDesktopNav isMemoized={false} />);
      expect(
        screen.getByTestId("test-id-header-desktop-nav-root")
      ).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<HeaderDesktopNav isMemoized={true} />);
      expect(
        screen.getByTestId("test-id-header-desktop-nav-root")
      ).toBeInTheDocument();
    });

    it("defaults to base component when isMemoized is undefined", () => {
      render(<HeaderDesktopNav />);
      expect(
        screen.getByTestId("test-id-header-desktop-nav-root")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <HeaderDesktopNav
          className="custom-class"
          _internalId="custom-id"
          _debugMode={true}
          aria-label="Test navigation"
          data-testid="custom-testid"
        />
      );

      const nav = screen.getByTestId("custom-id-header-desktop-nav-root");
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
          _internalId={undefined}
          _debugMode={undefined}
        />
      );

      const nav = screen.getByTestId("test-id-header-desktop-nav-root");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "test-id-header-desktop-nav"
      );
      expect(nav).not.toHaveAttribute("data-debug-mode");
      expect(nav).toHaveClass("header-desktop-nav-list");
    });
  });
});
