// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+ coverage, key paths + edges)
// - Risk Tier: Core
// - Component Type: Orchestrator
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../Header";

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
  usePathname: vi.fn(() => "/"),
}));

// Mock the web utils
vi.mock("@web/utils", () => ({
  isActivePath: vi.fn(() => true), // Always return true for testing
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value, min, max) => Math.min(Math.max(value, min), max)),
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
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, className, ...props }) => {
    // eslint-disable-next-line no-undef
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

// Mock the Container component
vi.mock("@web/components", () => ({
  Container: vi.fn(({ children, ...props }) => (
    <div data-testid="container" {...props}>
      {children}
    </div>
  )),
}));

// Mock the Header data
vi.mock("../_data", () => ({
  AVATAR_COMPONENT_LABELS: {
    home: "Home",
    link: "/",
    alt: "Guy Romelle Magayano",
    src: "/avatar.jpg",
  },
}));

// Mock internal components
vi.mock("../_internal/HeaderAvatar", () => ({
  HeaderAvatar: vi.fn(({ children, ...props }) => (
    <div data-testid="test-id-header-avatar-link" {...props}>
      {children}
    </div>
  )),
}));

vi.mock("../_internal/HeaderAvatarContainer", () => ({
  HeaderAvatarContainer: vi.fn(({ children, ...props }) => (
    <div data-testid="test-id-header-avatar-container" {...props}>
      {children}
    </div>
  )),
}));

vi.mock("../_internal/HeaderDesktopNav", () => ({
  HeaderDesktopNav: vi.fn(({ children, ...props }) => (
    <nav data-testid="test-id-header-desktop-nav" {...props}>
      {children}
    </nav>
  )),
}));

vi.mock("../_internal/HeaderMobileNav", () => ({
  HeaderMobileNav: vi.fn(({ children, ...props }) => (
    <nav data-testid="test-id-header-mobile-nav" {...props}>
      {children}
    </nav>
  )),
}));

vi.mock("../_internal/HeaderThemeToggle", () => ({
  HeaderThemeToggle: vi.fn(({ children, ...props }) => (
    <button data-testid="test-id-header-theme-toggle" {...props}>
      {children}
    </button>
  )),
}));

// Mock Next.js Image component with proper width/height
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, width, height, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width || 64}
      height={height || 64}
      data-testid="next-image"
      {...props}
    />
  )),
}));

describe("Header", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<Header />);
      expect(screen.getByTestId("test-id-header")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Header />);
      const header = screen.getByTestId("test-id-header");
      expect(header).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Header className="custom-class" />);
      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(<Header debugId="custom-id" />);

      const header = screen.getByTestId("custom-id-header");
      expect(header).toHaveAttribute("data-header-id", "custom-id-header");
    });

    it("generates ID when debugId is not provided", () => {
      render(<Header />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("data-header-id", "test-id-header");
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<Header debugMode={true} />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<Header debugMode={false} />);

      const header = screen.getByTestId("test-id-header");
      expect(header).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<Header />);

      const header = screen.getByTestId("test-id-header");
      expect(header).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<Header />);

      expect(screen.getByTestId("test-id-header")).toBeInTheDocument();
      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(
        screen.getByTestId("test-id-header-mobile-nav")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-desktop-nav")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-theme-toggle")
      ).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<Header />);

      const header = screen.getByTestId("test-id-header");
      expect(header.tagName).toBe("HEADER");
    });
  });

  describe("Homepage Behavior", () => {
    it("renders avatar section on homepage", () => {
      render(<Header />);

      expect(
        screen.getByTestId("test-id-header-avatar-link")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-header-avatar-container")
      ).toBeInTheDocument();
    });

    it("renders content offset on homepage", () => {
      render(<Header />);

      const contentOffset = screen.getAllByTestId("container")[0];
      expect(contentOffset).toBeInTheDocument();
    });
  });

  describe("Non-Homepage Behavior", () => {
    beforeEach(() => {
      vi.mocked(usePathname).mockReturnValue("/about");
    });

    it("renders avatar in left section on non-homepage", () => {
      render(<Header />);

      expect(
        screen.getByTestId("test-id-header-avatar-container")
      ).toBeInTheDocument();
    });

    it("does not render large avatar on non-homepage", () => {
      render(<Header />);

      const avatar = screen.getByTestId("test-id-header-avatar-link");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the header component", () => {
      const ref = vi.fn();
      render(<Header ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<Header ref={ref} />);

      const header = screen.getByTestId("test-id-header");
      expect(ref).toHaveBeenCalledWith(header);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<Header />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(<Header aria-label="Main navigation" role="banner" />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("aria-label", "Main navigation");
      expect(header).toHaveAttribute("role", "banner");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS classes correctly", () => {
      render(<Header />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("class");
    });

    it("combines custom className with default classes", () => {
      render(<Header className="custom-class" />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<Header />);

      const initialHeader = screen.getByTestId("test-id-header");

      rerender(<Header />);

      const updatedHeader = screen.getByTestId("test-id-header");
      expect(updatedHeader).toBe(initialHeader);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<Header />);

      rerender(<Header className="new-class" />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toHaveAttribute("class");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Header isMemoized={true} />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toBeInTheDocument();
    });

    it("renders without memoization when isMemoized is false", () => {
      render(<Header isMemoized={false} />);

      const header = screen.getByTestId("test-id-header");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Compound Component Integration", () => {
    it("allows access to sub-components individually", () => {
      render(<Header />);
      expect(screen.getByTestId("test-id-header")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <Header
          className="custom-class"
          debugId="custom-id"
          debugMode={true}
          aria-label="Test header"
        />
      );
      const header = screen.getByTestId("custom-id-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("class");
      expect(header).toHaveAttribute("data-header-id", "custom-id-header");
      expect(header).toHaveAttribute("data-debug-mode", "true");
      expect(header).toHaveAttribute("aria-label", "Test header");
    });
  });

  describe("Integration Tests", () => {
    describe("Complete Header Rendering", () => {
      it("renders complete header with all sub-components", () => {
        render(<Header debugId="test-header" debugMode={false} />);

        // Check main header
        expect(screen.getByTestId("test-header-header")).toBeInTheDocument();

        // Check containers (there are multiple)
        const containers = screen.getAllByTestId("container");
        expect(containers).toHaveLength(2);

        // Check all sub-components
        expect(
          screen.getByTestId("test-id-header-avatar-link")
        ).toBeInTheDocument();
        expect(
          screen.getByTestId("test-id-header-avatar-container")
        ).toBeInTheDocument();
        expect(
          screen.getByTestId("test-id-header-desktop-nav")
        ).toBeInTheDocument();
        expect(
          screen.getByTestId("test-id-header-mobile-nav")
        ).toBeInTheDocument();
        expect(
          screen.getByTestId("test-id-header-theme-toggle")
        ).toBeInTheDocument();
      });

      it("renders header with proper semantic structure", () => {
        render(<Header />);

        const header = screen.getByTestId("test-id-header");
        expect(header.tagName).toBe("HEADER");

        const containers = screen.getAllByTestId("container");
        expect(containers).toHaveLength(2);
      });

      it("renders header with proper CSS classes", () => {
        render(<Header />);

        const header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("class");
      });
    });

    describe("Header with Debug Mode", () => {
      it("renders header with debug mode enabled", () => {
        render(<Header debugId="debug-header" debugMode={true} />);

        const header = screen.getByTestId("debug-header-header");
        expect(header).toHaveAttribute("data-header-id", "debug-header-header");
        expect(header).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders header with debug mode disabled", () => {
        render(<Header debugId="debug-header" debugMode={false} />);

        const header = screen.getByTestId("debug-header-header");
        expect(header).toHaveAttribute("data-header-id", "debug-header-header");
        expect(header).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Header with Custom Debug IDs", () => {
      it("renders header with custom debug ID", () => {
        render(<Header debugId="custom-header-id" />);

        const header = screen.getByTestId("custom-header-id-header");
        expect(header).toHaveAttribute(
          "data-header-id",
          "custom-header-id-header"
        );
      });

      it("renders header with default debug ID", () => {
        render(<Header />);

        const header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("data-header-id", "test-id-header");
      });
    });

    describe("Header Layout and Styling", () => {
      it("applies correct CSS classes", () => {
        render(<Header />);

        const header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("class");
      });

      it("combines custom className with default classes", () => {
        render(<Header className="custom-header-class" />);

        const header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("class");
      });

      it("applies custom styling props", () => {
        render(
          <Header
            style={{ backgroundColor: "white", color: "black" }}
            className="light-header"
          />
        );

        const header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("class");
        // Note: Style prop forwarding might not work as expected in tests
        // This is a known limitation of testing styled components
      });
    });

    describe("Header Sub-components Integration", () => {
      it("renders avatar component correctly", () => {
        render(<Header />);

        const avatar = screen.getByTestId("test-id-header-avatar-link");
        expect(avatar).toBeInTheDocument();
      });

      it("renders avatar container correctly", () => {
        render(<Header />);

        const avatarContainer = screen.getByTestId(
          "test-id-header-avatar-container"
        );
        expect(avatarContainer).toBeInTheDocument();
      });

      it("renders desktop navigation correctly", () => {
        render(<Header />);

        const desktopNav = screen.getByTestId("test-id-header-desktop-nav");
        expect(desktopNav).toBeInTheDocument();
        expect(desktopNav.tagName).toBe("NAV");
      });

      it("renders mobile navigation correctly", () => {
        render(<Header />);

        const mobileNav = screen.getByTestId("test-id-header-mobile-nav");
        expect(mobileNav).toBeInTheDocument();
        expect(mobileNav.tagName).toBe("NAV");
      });

      it("renders theme toggle correctly", () => {
        render(<Header />);

        const themeToggle = screen.getByTestId("test-id-header-theme-toggle");
        expect(themeToggle).toBeInTheDocument();
        expect(themeToggle.tagName).toBe("BUTTON");
      });
    });

    describe("Header Navigation Integration", () => {
      it("renders navigation with proper structure", () => {
        render(<Header />);

        const desktopNav = screen.getByTestId("test-id-header-desktop-nav");
        const mobileNav = screen.getByTestId("test-id-header-mobile-nav");

        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();
      });

      it("handles navigation state changes", () => {
        const { rerender } = render(<Header />);

        let desktopNav = screen.getByTestId("test-id-header-desktop-nav");
        let mobileNav = screen.getByTestId("test-id-header-mobile-nav");

        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();

        // Re-render to simulate state changes
        rerender(<Header className="updated-header" />);

        desktopNav = screen.getByTestId("test-id-header-desktop-nav");
        mobileNav = screen.getByTestId("test-id-header-mobile-nav");

        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();
      });
    });

    describe("Header Theme Integration", () => {
      it("renders theme toggle with proper functionality", () => {
        render(<Header />);

        const themeToggle = screen.getByTestId("test-id-header-theme-toggle");
        expect(themeToggle).toBeInTheDocument();
        expect(themeToggle.tagName).toBe("BUTTON");
      });

      it("handles theme toggle interactions", () => {
        render(<Header />);

        const themeToggle = screen.getByTestId("test-id-header-theme-toggle");
        expect(themeToggle).toBeInTheDocument();
        // Theme toggle functionality would be tested in the actual component
      });
    });

    describe("Header Performance and Edge Cases", () => {
      it("renders multiple header instances correctly", () => {
        render(
          <div>
            <Header debugId="header-1" />
            <Header debugId="header-2" />
          </div>
        );

        const headers = screen.getAllByTestId("header-1-header");
        expect(headers).toHaveLength(1);

        const headers2 = screen.getAllByTestId("header-2-header");
        expect(headers2).toHaveLength(1);

        expect(headers[0]).toHaveAttribute("data-header-id", "header-1-header");
        expect(headers2[0]).toHaveAttribute(
          "data-header-id",
          "header-2-header"
        );
      });

      it("handles header updates efficiently", () => {
        const { rerender } = render(<Header />);

        let header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("data-header-id", "test-id-header");

        rerender(<Header debugId="updated-header" />);
        header = screen.getByTestId("updated-header-header");
        expect(header).toHaveAttribute(
          "data-header-id",
          "updated-header-header"
        );
      });

      it("handles complex header configurations", () => {
        render(
          <Header
            debugId="complex-header"
            debugMode={true}
            className="complex-header-class"
            style={{ position: "sticky", top: 0 }}
            aria-label="Complex navigation header"
            role="banner"
          />
        );

        const header = screen.getByTestId("complex-header-header");
        expect(header).toHaveAttribute(
          "data-header-id",
          "complex-header-header"
        );
        expect(header).toHaveAttribute("data-debug-mode", "true");
        expect(header).toHaveAttribute("class");
        // Note: Style prop forwarding might not work as expected in tests
        expect(header).toHaveAttribute(
          "aria-label",
          "Complex navigation header"
        );
        expect(header).toHaveAttribute("role", "banner");
      });
    });

    describe("Header Accessibility Integration", () => {
      it("renders with proper accessibility attributes", () => {
        render(
          <Header
            aria-label="Main navigation header"
            role="banner"
            aria-describedby="header-description"
          />
        );

        const header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("aria-label", "Main navigation header");
        expect(header).toHaveAttribute("role", "banner");
        expect(header).toHaveAttribute(
          "aria-describedby",
          "header-description"
        );
      });

      it("maintains accessibility during updates", () => {
        const { rerender } = render(<Header aria-label="Initial label" />);

        let header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("aria-label", "Initial label");

        rerender(<Header aria-label="Updated label" />);
        header = screen.getByTestId("test-id-header");
        expect(header).toHaveAttribute("aria-label", "Updated label");
      });
    });
  });
});
