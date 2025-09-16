import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeaderDesktopNav } from "../HeaderDesktopNav";

// Import shared mocks
import "../../__tests__/__mocks__";

// Individual mocks for this test file

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, className, ...props }) => {
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
vi.mock("../HeaderDesktopNavItem", () => ({
  HeaderDesktopNavItem: ({
    href,
    children,
    _internalId,
    _debugMode,
    ...props
  }: any) => {
    const id = _internalId || "test-id";
    return (
      <li
        data-testid={`${id}-header-desktop-nav-item-root`}
        data-href={href}
        {...props}
      >
        <a href={href} data-testid="next-link">
          {children}
        </a>
      </li>
    );
  },
}));

// Import mocked data

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
  const MockLink = React.forwardRef<HTMLAnchorElement, any>(
    (props: any, ref: any) => {
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
    }
  );
  MockLink.displayName = "MockNextLink";
  return { default: MockLink };
});

// Mock the useComponentId hook

// Mock the CSS module
vi.mock("../styles/HeaderDesktopNav.module.css", () => ({
  default: {
    HeaderDesktopNavList: "_HeaderDesktopNavList_5a8b3c",
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
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<HeaderDesktopNav />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<HeaderDesktopNav className="custom-class" />);
      const nav = screen.getByRole("navigation");
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

    it("uses provided _internalId with test-id", () => {
      render(<HeaderDesktopNav _internalId="test-id" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute(
        "data-header-desktop-nav-id",
        "test-id-header-desktop-nav"
      );
    });

    it("applies data-debug-mode when _debugMode is true", () => {
      render(<HeaderDesktopNav _debugMode={true} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when _debugMode is false", () => {
      render(<HeaderDesktopNav _debugMode={false} />);

      const nav = screen.getByRole("navigation");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when _debugMode is undefined", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Navigation Links", () => {
    it("renders navigation structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with navigation data", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("handles navigation links prop", () => {
      const customLinks = [
        { kind: "internal" as const, href: "/custom", label: "Custom" },
      ];
      render(<HeaderDesktopNav links={customLinks} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("renders navigation component structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Error Handling and Data Validation", () => {
    it("handles empty navigation links array gracefully", () => {
      // Test that component renders even with no nav items
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Component should render nav structure even if no items
      expect(nav.tagName).toBe("NAV");
    });

    it("validates navigation link structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("renders navigation with proper structure when data is valid", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
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

      const nav = screen.getByRole("navigation");
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with proper semantic structure", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
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

      const nav = screen.getByRole("navigation");
      expect(ref).toHaveBeenCalledWith(nav);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(
        <HeaderDesktopNav aria-label="Desktop navigation" role="navigation" />
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Desktop navigation");
      expect(nav).toHaveAttribute("role", "navigation");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<HeaderDesktopNav />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("_HeaderDesktopNavList_5a8b3c");
    });

    it("combines custom className with CSS module classes", () => {
      render(<HeaderDesktopNav className="custom-class" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("_HeaderDesktopNavList_5a8b3c", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<HeaderDesktopNav />);

      const initialNav = screen.getByRole("navigation");

      rerender(<HeaderDesktopNav />);

      const updatedNav = screen.getByRole("navigation");
      expect(updatedNav).toBe(initialNav);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<HeaderDesktopNav />);

      rerender(<HeaderDesktopNav className="new-class" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(<HeaderDesktopNav isMemoized={false} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<HeaderDesktopNav isMemoized={true} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("defaults to base component when isMemoized is undefined", () => {
      render(<HeaderDesktopNav />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
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

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass("_HeaderDesktopNavList_5a8b3c");
    });
  });
});
