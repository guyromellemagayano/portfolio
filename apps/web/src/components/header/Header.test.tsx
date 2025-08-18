import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
  AVATAR_COMPONENT_LABELS: {
    link: "/",
    home: "Home",
  },
  DESKTOP_HEADER_NAV_LINKS: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS: {
    menu: "Menu",
    closeMenu: "Close menu",
    navigation: "Navigation",
  },
  MOBILE_HEADER_NAV_LINKS: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  THEME_TOGGLE_LABELS: {
    toggleTheme: "Toggle theme",
  },
}));

// Mock the avatar image
vi.mock("@web/images/avatar.jpg", () => ({
  default: "/avatar.jpg",
}));

// Mock Headless UI components
vi.mock("@headlessui/react", () => ({
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
  PopoverBackdrop: vi.fn((props) => (
    <div data-testid="popover-backdrop" {...props} />
  )),
  PopoverPanel: vi.fn(({ children, ...props }) => (
    <div data-testid="popover-panel" {...props}>
      {children}
    </div>
  )),
}));

// Mock Next.js Image and Link
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, ...props }) => (
    <img data-testid="next-image" src={src} alt={alt} {...props} />
  )),
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a data-testid="next-link" href={href} {...props}>
      {children}
    </a>
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

      // The hook is called internally, we can verify by checking the rendered attributes
      const header = screen.getByTestId("header-root");
      expect(header).toHaveAttribute("data-header-id", "custom-id");
      expect(header).toHaveAttribute("data-debug-mode", "true");
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
