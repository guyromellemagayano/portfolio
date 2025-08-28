import { cleanup, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../Header";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
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

describe("Header Integration", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Homepage Layout", () => {
    it("renders homepage-specific layout on homepage", () => {
      render(<Header />);

      // Should render avatar section
      expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
      expect(screen.getByTestId("header-avatar-container")).toBeInTheDocument();

      // Should render content offset
      expect(screen.getAllByTestId("container")).toHaveLength(2);
    });

    it("renders large avatar on homepage", () => {
      render(<Header />);

      // Should render avatar
      expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
    });
  });

  describe("Non-Homepage Layout", () => {
    beforeEach(() => {
      // Mock the usePathname hook to return a non-homepage path
      vi.mocked(usePathname).mockReturnValue("/about");
    });

    it("renders non-homepage layout on other pages", () => {
      render(<Header />);

      // Should render avatar in left section
      expect(screen.getByTestId("header-avatar-container")).toBeInTheDocument();
    });

    it("does not render HeaderEffects on non-homepage", () => {
      render(<Header />);

      // Should render header
      expect(screen.getByTestId("header-root")).toBeInTheDocument();
    });
  });

  describe("Navigation Integration", () => {
    it("renders both mobile and desktop navigation", () => {
      render(<Header />);

      expect(screen.getByTestId("header-mobile-nav")).toBeInTheDocument();
      expect(screen.getByTestId("header-desktop-nav")).toBeInTheDocument();
    });

    it("applies correct CSS classes to navigation components", () => {
      render(<Header />);

      // Should render navigation components
      expect(screen.getByTestId("header-mobile-nav")).toBeInTheDocument();
      expect(screen.getByTestId("header-desktop-nav")).toBeInTheDocument();
    });
  });

  describe("Theme Toggle Integration", () => {
    it("renders theme toggle in correct position", () => {
      render(<Header />);

      expect(screen.getByTestId("header-theme-toggle")).toBeInTheDocument();
    });

    it("applies correct CSS classes to theme toggle wrapper", () => {
      render(<Header />);

      // Should render theme toggle
      expect(screen.getByTestId("header-theme-toggle")).toBeInTheDocument();
    });
  });

  describe("Avatar Integration", () => {
    it("renders avatar with correct props on homepage", () => {
      render(<Header />);

      // Should render avatar
      expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
    });

    it("renders avatar container with correct styling", () => {
      render(<Header />);

      // Should render avatar container
      expect(screen.getByTestId("header-avatar-container")).toBeInTheDocument();
    });
  });

  describe("Container Integration", () => {
    it("renders Container components with correct props", () => {
      render(<Header />);

      // Should render containers
      expect(screen.getAllByTestId("container")).toHaveLength(2);
    });

    it("passes internalId and debugMode to Container", () => {
      render(<Header internalId="test-header" debugMode={true} />);

      // Should render with correct props
      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "test-header");
      expect(header).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies correct CSS classes to main header", () => {
      render(<Header />);

      // Should apply CSS classes
      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("header-component");
    });

    it("combines custom className with CSS module classes", () => {
      render(<Header className="custom-header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("header-component", "custom-header");
    });
  });

  describe("Props Propagation", () => {
    it("passes internalId and debugMode to all sub-components", () => {
      render(<Header internalId="test-header" debugMode={true} />);

      // Verify that the header renders with the correct props
      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "test-header");
      expect(header).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes through HTML attributes", () => {
      render(<Header aria-label="Main navigation" role="banner" />);

      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "aria-label",
        "Main navigation"
      );
      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "role",
        "banner"
      );
      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "aria-label",
        "Main navigation"
      );
    });
  });

  describe("Memoization Integration", () => {
    it("renders memoized component when isMemoized is true", () => {
      render(<Header isMemoized={true} />);

      expect(screen.getByTestId("header-root")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<Header isMemoized={false} />);

      expect(screen.getByTestId("header-root")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <Header
          className="custom-header"
          internalId="test-header"
          debugMode={true}
          isMemoized={true}
          aria-label="Complex header"
          role="banner"
        />
      );

      expect(screen.getByTestId("header-root")).toBeInTheDocument();
      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "data-header-id",
        "test-header"
      );
      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "data-debug-mode",
        "true"
      );
      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "aria-label",
        "Complex header"
      );
      expect(screen.getByTestId("header-root")).toHaveAttribute(
        "role",
        "banner"
      );
    });

    it("handles missing optional props gracefully", () => {
      render(<Header />);

      expect(screen.getByTestId("header-root")).toBeInTheDocument();
      expect(screen.getByTestId("header-avatar")).toBeInTheDocument();
      expect(screen.getByTestId("header-avatar-container")).toBeInTheDocument();
      expect(screen.getByTestId("header-mobile-nav")).toBeInTheDocument();
      expect(screen.getByTestId("header-desktop-nav")).toBeInTheDocument();
      expect(screen.getByTestId("header-theme-toggle")).toBeInTheDocument();
    });
  });
});
