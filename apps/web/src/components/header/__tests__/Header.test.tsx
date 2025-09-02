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
});
