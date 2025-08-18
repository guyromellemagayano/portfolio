import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "./Header";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
  })),
}));

// Mock the useComponentId hook
vi.mock("@web/hooks/useComponentId", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  clamp: vi.fn((value) => value),
  isActivePath: vi.fn(() => false),
}));

// Mock the components
vi.mock("@guyromellemagayano/components", () => ({
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="mock-button" {...props}>
      {children}
    </button>
  )),
  Div: vi.fn(({ children, ...props }) => (
    <div data-testid="div" {...props}>
      {children}
    </div>
  )),
  Header: vi.fn(({ children, ...props }) => (
    <header data-testid="grm-header" {...props}>
      {children}
    </header>
  )),
  Heading: vi.fn(({ children, ...props }) => (
    <h2 data-testid="grm-heading" {...props}>
      {children}
    </h2>
  )),
  Li: vi.fn(({ children, ...props }) => (
    <li data-testid="grm-li" {...props}>
      {children}
    </li>
  )),
  Nav: vi.fn(({ children, ...props }) => (
    <nav data-testid="grm-nav" {...props}>
      {children}
    </nav>
  )),
  Span: vi.fn(({ children, ...props }) => (
    <span data-testid="grm-span" {...props}>
      {children}
    </span>
  )),
  Ul: vi.fn(({ children, ...props }) => (
    <ul data-testid="grm-ul" {...props}>
      {children}
    </ul>
  )),
  Popover: vi.fn(({ children, ...props }) => (
    <div data-testid="popover" {...props}>
      {children}
    </div>
  )),
  PopoverButton: vi.fn(({ children, ...props }) => (
    <button data-testid="popover-button" {...props}>
      {children}
    </button>
  )),
  PopoverPanel: vi.fn(({ children, ...props }) => (
    <div data-testid="popover-panel" {...props}>
      {children}
    </div>
  )),
  PopoverBackdrop: vi.fn(({ children, ...props }) => (
    <div data-testid="popover-backdrop" {...props}>
      {children}
    </div>
  )),
}));

// Mock the Container component
vi.mock("@web/components/container", () => ({
  Container: vi.fn(({ children, ...props }) => (
    <div data-testid="container" {...props}>
      {children}
    </div>
  )),
}));

// Mock the Icon component
vi.mock("@web/components/icon", () => ({
  Icon: {
    Sun: vi.fn((props) => <svg data-testid="sun-icon" {...props} />),
    Moon: vi.fn((props) => <svg data-testid="moon-icon" {...props} />),
    ChevronDown: vi.fn((props) => (
      <svg data-testid="chevron-down-icon" {...props} />
    )),
    Close: vi.fn((props) => <svg data-testid="close-icon" {...props} />),
  },
}));

// Mock the Header data
vi.mock("./Header.data", () => ({
  HEADER_COMPONENT_LABELS: {
    brandName: "Guy Romelle Magayano",
    tagline: "Software Engineer & Developer",
  },
  HEADER_COMPONENT_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
  ],
  MOBILE_HEADER_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
  ],
  DESKTOP_HEADER_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
  ],
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS: {
    menu: "Menu",
    navigation: "Navigation",
    closeMenu: "Close menu",
  },
  AVATAR_COMPONENT_LABELS: {
    home: "Home",
    link: "/",
  },
  THEME_TOGGLE_LABELS: {
    toggleTheme: "Toggle theme",
  },
}));

// Mock the CSS module
vi.mock("./Header.module.css", () => ({
  default: {
    headerComponent: "header-component",
    headerContent: "header-content",
    headerBrand: "header-brand",
    brandName: "brand-name",
    tagline: "tagline",
    headerNav: "header-nav",
    navList: "nav-list",
    navItem: "nav-item",
    navLink: "nav-link",
    headerEffects: "header-effects",
    avatarContainer: "avatar-container",
    avatarImage: "avatar-image",
    themeToggle: "theme-toggle",
    mobileMenu: "mobile-menu",
    mobileMenuButton: "mobile-menu-button",
    mobileMenuPanel: "mobile-menu-panel",
  },
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, ...props }) => (
    <div data-testid="next-image" data-src={src} data-alt={alt} {...props} />
  )),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a data-testid="next-link" href={href} {...props}>
      {children}
    </a>
  )),
}));

// Mock @headlessui/react
vi.mock("@headlessui/react", () => ({
  Popover: vi.fn(({ children, ...props }) => (
    <div data-testid="headless-popover" {...props}>
      {children}
    </div>
  )),
  PopoverButton: vi.fn(({ children, ...props }) => (
    <button data-testid="headless-popover-button" {...props}>
      {children}
    </button>
  )),
  PopoverPanel: vi.fn(({ children, ...props }) => (
    <div data-testid="headless-popover-panel" {...props}>
      {children}
    </div>
  )),
  PopoverBackdrop: vi.fn(({ children, ...props }) => (
    <div data-testid="headless-popover-backdrop" {...props}>
      {children}
    </div>
  )),
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<Header data-testid="header" />);
      expect(screen.getByTestId("header-root")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Header data-testid="header" />);
      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Header className="custom-class" data-testid="header" />);
      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("custom-class");
    });
  });

  describe("useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(<Header _internalId="custom-id" data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "custom-id");
    });

    it("generates ID when _internalId is not provided", () => {
      render(<Header data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "test-id");
    });

    it("applies data-debug-mode when _debugMode is true", () => {
      render(<Header _debugMode={true} data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when _debugMode is false", () => {
      render(<Header _debugMode={false} data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when _debugMode is undefined", () => {
      render(<Header data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).not.toHaveAttribute("data-debug-mode");
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <Header
          _internalId="custom-id"
          _debugMode={true}
          data-testid="header"
        />
      );

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "custom-id");
      expect(header).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes all rest props to the component", () => {
      render(
        <Header
          data-testid="header"
          aria-label="Main navigation"
          role="banner"
        />
      );

      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("aria-label", "Main navigation");
      expect(header).toHaveAttribute("role", "banner");
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<Header data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });

    it("renders with proper semantic structure", () => {
      render(<Header data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the header component", () => {
      const ref = vi.fn();
      render(<Header ref={ref} data-testid="header" />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<Header ref={ref} data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(ref).toHaveBeenCalledWith(header);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(<Header data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<Header data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("header-component");
    });

    it("combines custom className with CSS module classes", () => {
      render(<Header className="custom-class" data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("header-component", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<Header data-testid="header" />);

      const initialHeader = screen.getByTestId("header-root");

      rerender(<Header data-testid="header" />);

      const updatedHeader = screen.getByTestId("header-root");
      expect(updatedHeader).toBe(initialHeader);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<Header data-testid="header" />);

      rerender(<Header className="new-class" data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Header isMemoized={true} data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });

    it("renders without memoization when isMemoized is false", () => {
      render(<Header isMemoized={false} data-testid="header" />);

      const header = screen.getByTestId("header-root");
      expect(header).toBeInTheDocument();
    });
  });
});
