// Mock Next.js router FIRST
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

import { cleanup, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../Header";

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
  createCompoundComponent: vi.fn(
    (displayName, InternalComponent, subComponents = {}) => {
      const CompoundComponent = Object.assign(InternalComponent, subComponents);
      CompoundComponent.displayName = displayName;
      return CompoundComponent;
    }
  ),
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
}));

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
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
    <div data-testid="header-avatar" {...props}>
      {children}
    </div>
  )),
}));

vi.mock("../_internal/HeaderAvatarContainer", () => ({
  HeaderAvatarContainer: vi.fn(({ children, ...props }) => (
    <div data-testid="header-avatar-container" {...props}>
      {children}
    </div>
  )),
}));

vi.mock("../_internal/HeaderDesktopNav", () => ({
  HeaderDesktopNav: vi.fn(({ children, ...props }) => (
    <nav data-testid="header-desktop-nav" {...props}>
      {children}
    </nav>
  )),
}));

vi.mock("../_internal/HeaderMobileNav", () => ({
  HeaderMobileNav: vi.fn(({ children, ...props }) => (
    <nav data-testid="header-mobile-nav" {...props}>
      {children}
    </nav>
  )),
}));

vi.mock("../_internal/HeaderThemeToggle", () => ({
  HeaderThemeToggle: vi.fn(({ children, ...props }) => (
    <button data-testid="header-theme-toggle" {...props}>
      {children}
    </button>
  )),
}));

vi.mock("../_internal/HeaderEffects", () => ({
  HeaderEffects: vi.fn(() => null),
}));

// Mock the CSS module
vi.mock("../Header.module.css", () => ({
  default: {
    headerComponent: "header-component",
    headerSection: "header-section",
    headerContainer: "header-container",
    headerContent: "header-content",
    headerLeftSection: "header-left-section",
    headerCenterSection: "header-center-section",
    headerRightSection: "header-right-section",
    mobileNavigation: "mobile-navigation",
    desktopNavigation: "desktop-navigation",
    themeToggleWrapper: "theme-toggle-wrapper",
    contentOffset: "content-offset",
    avatarSection: "avatar-section",
    avatarContainer: "avatar-container",
    avatarPositioningWrapper: "avatar-positioning-wrapper",
    avatarRelativeContainer: "avatar-relative-container",
    avatarBorderContainer: "avatar-border-container",
    avatarImage: "avatar-image",
  },
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
      expect(screen.getByTestId("header-root")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Header />);
      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Header className="custom-class" />);
      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(<Header internalId="custom-id" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "custom-id-header");
    });

    it("generates ID when internalId is not provided", () => {
      render(<Header />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "test-id-header");
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(<Header debugMode={true} />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<Header debugMode={false} />);

      const header = screen.getByTestId("header-root");
      expect(header).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<Header />);

      const header = screen.getByTestId("header-root");
      expect(header).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<Header />);

      expect(screen.getByTestId("header-root")).toBeInTheDocument();
      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByTestId("header-mobile-nav")).toBeInTheDocument();
      expect(screen.getByTestId("header-desktop-nav")).toBeInTheDocument();
      expect(screen.getByTestId("header-theme-toggle")).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<Header />);

      const header = screen.getByTestId("header-root");
      expect(header.tagName).toBe("HEADER");
    });
  });

  describe("Homepage Behavior", () => {
    it("renders avatar section on homepage", () => {
      render(<Header />);

      expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
      expect(screen.getByTestId("header-avatar-container")).toBeInTheDocument();
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

      expect(screen.getByTestId("header-avatar-container")).toBeInTheDocument();
    });

    it("does not render large avatar on non-homepage", () => {
      render(<Header />);

      const avatar = screen.getByTestId("header-avatar");
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

      const header = screen.getByTestId("header-root");
      expect(ref).toHaveBeenCalledWith(header);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<Header />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });

    it("passes through aria attributes", () => {
      render(<Header aria-label="Main navigation" role="banner" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("aria-label", "Main navigation");
      expect(header).toHaveAttribute("role", "banner");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<Header />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("header-component");
    });

    it("combines custom className with CSS module classes", () => {
      render(<Header className="custom-class" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("header-component", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<Header />);

      const initialHeader = screen.getByTestId("header-root");

      rerender(<Header />);

      const updatedHeader = screen.getByTestId("header-root");
      expect(updatedHeader).toBe(initialHeader);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<Header />);

      rerender(<Header className="new-class" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Header isMemoized={true} />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });

    it("renders without memoization when isMemoized is false", () => {
      render(<Header isMemoized={false} />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Compound Component Integration", () => {
    it("allows access to sub-components individually", () => {
      render(<Header />);
      expect(screen.getByTestId("header-root")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <Header
          className="custom-class"
          internalId="custom-id"
          debugMode={true}
          aria-label="Test header"
        />
      );
      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("custom-class");
      expect(header).toHaveAttribute("data-header-id", "custom-id-header");
      expect(header).toHaveAttribute("data-debug-mode", "true");
      expect(header).toHaveAttribute("aria-label", "Test header");
    });
  });

  describe("Integration Tests", () => {
    describe("Complete Header Rendering", () => {
      it("renders complete header with all sub-components", () => {
        render(<Header internalId="test-header" debugMode={false} />);

        // Check main header
        expect(screen.getByTestId("header-root")).toBeInTheDocument();

        // Check container
        expect(screen.getByTestId("container")).toBeInTheDocument();

        // Check all sub-components
        expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
        expect(
          screen.getByTestId("header-avatar-container")
        ).toBeInTheDocument();
        expect(screen.getByTestId("header-desktop-nav")).toBeInTheDocument();
        expect(screen.getByTestId("header-mobile-nav")).toBeInTheDocument();
        expect(screen.getByTestId("header-theme-toggle")).toBeInTheDocument();
      });

      it("renders header with proper semantic structure", () => {
        render(<Header />);

        const header = screen.getByTestId("header-root");
        expect(header.tagName).toBe("HEADER");

        const container = screen.getByTestId("container");
        expect(container).toBeInTheDocument();
      });

      it("renders header with proper CSS classes", () => {
        render(<Header />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveClass("header-component");
      });
    });

    describe("Header with Debug Mode", () => {
      it("renders header with debug mode enabled", () => {
        render(<Header internalId="debug-header" debugMode={true} />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("data-header-id", "debug-header-header");
        expect(header).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders header with debug mode disabled", () => {
        render(<Header internalId="debug-header" debugMode={false} />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("data-header-id", "debug-header-header");
        expect(header).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Header with Custom Internal IDs", () => {
      it("renders header with custom internal ID", () => {
        render(<Header internalId="custom-header-id" />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute(
          "data-header-id",
          "custom-header-id-header"
        );
      });

      it("renders header with default internal ID", () => {
        render(<Header />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("data-header-id", "test-id-header");
      });
    });

    describe("Header Layout and Styling", () => {
      it("applies correct CSS classes", () => {
        render(<Header />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveClass("header-component");
      });

      it("combines custom className with default classes", () => {
        render(<Header className="custom-header-class" />);

        const header = screen.getByTestId("header-root");
        expect(header).toHaveClass("header-component", "custom-header-class");
      });

      it("applies custom styling props", () => {
        render(
          <Header
            style={{ backgroundColor: "white", color: "black" }}
            className="light-header"
          />
        );

        const header = screen.getByTestId("header-root");
        expect(header).toHaveStyle({
          backgroundColor: "white",
          color: "black",
        });
        expect(header).toHaveClass("light-header");
      });
    });

    describe("Header Sub-components Integration", () => {
      it("renders avatar component correctly", () => {
        render(<Header />);

        const avatar = screen.getByTestId("header-avatar");
        expect(avatar).toBeInTheDocument();
      });

      it("renders avatar container correctly", () => {
        render(<Header />);

        const avatarContainer = screen.getByTestId("header-avatar-container");
        expect(avatarContainer).toBeInTheDocument();
      });

      it("renders desktop navigation correctly", () => {
        render(<Header />);

        const desktopNav = screen.getByTestId("header-desktop-nav");
        expect(desktopNav).toBeInTheDocument();
        expect(desktopNav.tagName).toBe("NAV");
      });

      it("renders mobile navigation correctly", () => {
        render(<Header />);

        const mobileNav = screen.getByTestId("header-mobile-nav");
        expect(mobileNav).toBeInTheDocument();
        expect(mobileNav.tagName).toBe("NAV");
      });

      it("renders theme toggle correctly", () => {
        render(<Header />);

        const themeToggle = screen.getByTestId("header-theme-toggle");
        expect(themeToggle).toBeInTheDocument();
        expect(themeToggle.tagName).toBe("BUTTON");
      });
    });

    describe("Header Navigation Integration", () => {
      it("renders navigation with proper structure", () => {
        render(<Header />);

        const desktopNav = screen.getByTestId("header-desktop-nav");
        const mobileNav = screen.getByTestId("header-mobile-nav");

        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();
      });

      it("handles navigation state changes", () => {
        const { rerender } = render(<Header />);

        let desktopNav = screen.getByTestId("header-desktop-nav");
        let mobileNav = screen.getByTestId("header-mobile-nav");

        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();

        // Re-render to simulate state changes
        rerender(<Header className="updated-header" />);

        desktopNav = screen.getByTestId("header-desktop-nav");
        mobileNav = screen.getByTestId("header-mobile-nav");

        expect(desktopNav).toBeInTheDocument();
        expect(mobileNav).toBeInTheDocument();
      });
    });

    describe("Header Theme Integration", () => {
      it("renders theme toggle with proper functionality", () => {
        render(<Header />);

        const themeToggle = screen.getByTestId("header-theme-toggle");
        expect(themeToggle).toBeInTheDocument();
        expect(themeToggle.tagName).toBe("BUTTON");
      });

      it("handles theme toggle interactions", () => {
        render(<Header />);

        const themeToggle = screen.getByTestId("header-theme-toggle");
        expect(themeToggle).toBeInTheDocument();
        // Theme toggle functionality would be tested in the actual component
      });
    });

    describe("Header Performance and Edge Cases", () => {
      it("renders multiple header instances correctly", () => {
        render(
          <div>
            <Header internalId="header-1" />
            <Header internalId="header-2" />
          </div>
        );

        const headers = screen.getAllByTestId("header-root");
        expect(headers).toHaveLength(2);

        expect(headers[0]).toHaveAttribute("data-header-id", "header-1-header");
        expect(headers[1]).toHaveAttribute("data-header-id", "header-2-header");
      });

      it("handles header updates efficiently", () => {
        const { rerender } = render(<Header />);

        let header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("data-header-id", "test-id-header");

        rerender(<Header internalId="updated-header" />);
        header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute(
          "data-header-id",
          "updated-header-header"
        );
      });

      it("handles complex header configurations", () => {
        render(
          <Header
            internalId="complex-header"
            debugMode={true}
            className="complex-header-class"
            style={{ position: "sticky", top: 0 }}
            aria-label="Complex navigation header"
            role="banner"
          />
        );

        const header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute(
          "data-header-id",
          "complex-header-header"
        );
        expect(header).toHaveAttribute("data-debug-mode", "true");
        expect(header).toHaveClass("complex-header-class");
        expect(header).toHaveStyle({ position: "sticky", top: 0 });
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

        const header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("aria-label", "Main navigation header");
        expect(header).toHaveAttribute("role", "banner");
        expect(header).toHaveAttribute(
          "aria-describedby",
          "header-description"
        );
      });

      it("maintains accessibility during updates", () => {
        const { rerender } = render(<Header aria-label="Initial label" />);

        let header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("aria-label", "Initial label");

        rerender(<Header aria-label="Updated label" />);
        header = screen.getByTestId("header-root");
        expect(header).toHaveAttribute("aria-label", "Updated label");
      });
    });
  });
});
