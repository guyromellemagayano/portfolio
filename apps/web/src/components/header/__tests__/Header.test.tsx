/**
 * @file Header.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Header component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../Header";

// ============================================================================
// MOCKS
// ============================================================================

vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      header: {
        brandName: "Guy Romelle Magayano",
      },
      "header.ariaLabels": {
        home: "Home",
        about: "About",
        articles: "Articles",
        projects: "Projects",
        uses: "Uses",
        menu: "Menu",
        closeMenu: "Close menu",
        navigation: "Navigation",
        toggleTheme: "Toggle theme",
        lightMode: "Light mode",
        darkMode: "Dark mode",
        avatar: "Avatar",
        mainNavigation: "Main navigation",
        mobileNavigation: "Mobile navigation",
        desktopNavigation: "Desktop navigation",
      },
    };
    return (key: string) => {
      const translation = translations[namespace];
      return translation?.[key] ?? key;
    };
  }),
}));

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

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    resolvedTheme: "light",
    setTheme: vi.fn(),
  })),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ")
  ),
  clamp: vi.fn((value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)
  ),
  isActivePath: vi.fn((pathname: string, href: string) => pathname === href),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isValidLink: vi.fn((href: unknown) => {
    if (!href) return false;
    const s =
      typeof href === "string"
        ? href
        : (href as { toString(): string }).toString();
    return s !== "" && s !== "#";
  }),
  getLinkTargetProps: vi.fn((href: unknown, target?: string) => {
    if (!href) return { target: "_self" as const };
    const s =
      typeof href === "string"
        ? href
        : (href as { toString(): string }).toString();
    const isExternal = s.startsWith("http");
    const openNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: (openNewTab ? "_blank" : "_self") as " _self" | "_blank",
      rel: openNewTab ? "noopener noreferrer" : undefined,
    };
  }),
  isValidImageSrc: vi.fn((src: unknown) => src != null && src !== ""),
  filterValidNavigationLinks: vi.fn((links: unknown[]) => {
    if (!Array.isArray(links)) return [];
    return links.filter(
      (link) =>
        link &&
        typeof link === "object" &&
        typeof (link as { href?: string }).href === "string" &&
        typeof (link as { label?: string }).label === "string"
    );
  }),
  hasValidNavigationLinks: vi.fn((links: unknown[]) => {
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: function NextLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

vi.mock("next/image", () => ({
  default: function Image({
    src,
    alt,
    ...props
  }: {
    src: unknown;
    alt: string;
    [key: string]: unknown;
  }) {
    return (
      <img src={typeof src === "string" ? src : ""} alt={alt} {...props} />
    );
  },
}));

vi.mock("@web/components/container", () => ({
  Container: function Container({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <div data-testid="container" className={className} {...props}>
        {children}
      </div>
    );
  },
}));

vi.mock("@web/components/button", () => ({
  Button: React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & { [key: string]: unknown }
  >(function Button(
    {
      children,
      ...props
    }: { children?: React.ReactNode; [key: string]: unknown },
    ref
  ) {
    return (
      <button ref={ref} type="button" {...props}>
        {children}
      </button>
    );
  }),
}));

vi.mock("@web/components/icon", () => ({
  Icon: function Icon({
    name,
    className,
    "aria-hidden": ariaHidden,
    ...props
  }: {
    name: string;
    className?: string;
    "aria-hidden"?: boolean;
    [key: string]: unknown;
  }) {
    return (
      <svg
        data-testid={`icon-${name}`}
        className={className}
        aria-hidden={ariaHidden}
        {...props}
      >
        {name}
      </svg>
    );
  },
}));

// Headless UI Popover: render as a wrapper with button + panel so structure is testable
vi.mock("@headlessui/react", () => ({
  Popover: function Popover({ children }: { children: React.ReactNode }) {
    return <div data-testid="popover">{children}</div>;
  },
  PopoverButton: React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & { [key: string]: unknown }
  >(function PopoverButton(
    {
      children,
      ...props
    }: { children?: React.ReactNode; [key: string]: unknown },
    ref
  ) {
    return (
      <button ref={ref} type="button" {...props}>
        {children}
      </button>
    );
  }),
  PopoverBackdrop: function PopoverBackdrop({
    className,
    ...props
  }: {
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <div data-testid="popover-backdrop" className={className} {...props} />
    );
  },
  PopoverPanel: function PopoverPanel({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <div data-testid="popover-panel" className={className} {...props}>
        {children}
      </div>
    );
  },
}));

// ============================================================================
// TESTS
// ============================================================================

describe("Header", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Header />);
      const banner = screen.getByRole("banner");
      expect(banner).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Header className="custom-class" />);
      const banner = screen.getByRole("banner");
      expect(banner).toHaveAttribute("class");
      expect(banner).toHaveClass("custom-class");
    });
  });

  describe("Component Structure", () => {
    it("renders as header element", () => {
      render(<Header />);
      const banner = screen.getByRole("banner");
      expect(banner.tagName).toBe("HEADER");
    });

    it("renders main navigation and theme toggle", () => {
      render(<Header />);
      const navs = screen.getAllByRole("navigation", {
        name: /desktop navigation|mobile navigation|navigation/i,
      });
      expect(navs.length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getByRole("button", {
          name: /toggle theme|switch to (light|dark) mode/i,
        })
      ).toBeInTheDocument();
    });

    it("renders navigation links", () => {
      render(<Header />);
      expect(
        screen.getAllByRole("link", { name: /about/i }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /articles/i }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /projects/i }).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getAllByRole("link", { name: /uses/i }).length
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe("ARIA and Accessibility", () => {
    it("has banner role and aria-label for site header", () => {
      render(<Header />);
      const banner = screen.getByRole("banner", {
        name: /Guy Romelle Magayano/i,
      });
      expect(banner).toBeInTheDocument();
      expect(banner).toHaveAttribute("aria-label", "Guy Romelle Magayano");
      expect(banner).toHaveAttribute("role", "banner");
    });

    it("nav elements have accessible navigation label", () => {
      render(<Header />);
      const navs = screen.getAllByRole("navigation", {
        name: /desktop navigation|mobile navigation|navigation/i,
      });
      expect(navs.length).toBeGreaterThanOrEqual(1);
      const validLabels = ["Desktop navigation", "Mobile navigation"];
      navs.forEach((nav) => {
        const label = nav.getAttribute("aria-label");
        expect(label).toBeTruthy();
        expect(validLabels).toContain(label);
      });
    });

    it("avatar link has accessible label", () => {
      render(<Header />);
      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("aria-label", "Home");
    });

    it("theme toggle button has accessible label", () => {
      render(<Header />);
      const toggle = screen.getByRole("button", {
        name: /toggle theme|switch to (light|dark) mode/i,
      });
      expect(toggle).toHaveAttribute("aria-label");
    });

    it("passes through custom aria attributes", () => {
      render(
        <Header aria-label="Custom header" aria-describedby="header-desc" />
      );
      const banner = screen.getByRole("banner", { name: /custom header/i });
      expect(banner).toHaveAttribute("aria-label", "Custom header");
      expect(banner).toHaveAttribute("aria-describedby", "header-desc");
    });
  });

  describe("SEO and Semantics", () => {
    it("uses semantic header element", () => {
      render(<Header />);
      const header = document.querySelector("header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("role", "banner");
    });

    it("uses semantic nav for main navigation", () => {
      render(<Header />);
      const navs = screen.getAllByRole("navigation", {
        name: /desktop navigation|mobile navigation|navigation/i,
      });
      expect(navs.length).toBeGreaterThanOrEqual(1);
      const firstNav = navs[0];
      expect(firstNav).toBeInTheDocument();
      expect(firstNav!.tagName).toBe("NAV");
    });

    it("avatar image has descriptive alt text", () => {
      render(<Header />);
      const img = screen.getByRole("img", { name: /Guy Romelle Magayano/i });
      expect(img).toHaveAttribute("alt", "Guy Romelle Magayano");
    });
  });

  describe("Homepage Behavior", () => {
    it("renders avatar and containers on homepage", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Header />);
      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      const containers = screen.getAllByTestId("container");
      expect(containers.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Non-Homepage Behavior", () => {
    it("renders avatar in left section on non-homepage", () => {
      vi.mocked(usePathname).mockReturnValue("/about");
      render(<Header />);
      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });

  describe("Compound Component Integration", () => {
    it("renders header with all sub-components", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
      const navs = screen.getAllByRole("navigation", {
        name: /desktop navigation|mobile navigation|navigation/i,
      });
      expect(navs.length).toBeGreaterThanOrEqual(1);
      expect(
        screen.getByRole("button", {
          name: /toggle theme|switch to (light|dark) mode/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles custom className and aria props", () => {
      render(<Header className="edge-class" aria-label="Edge header" />);
      const banner = screen.getByRole("banner", { name: /edge header/i });
      expect(banner).toHaveAttribute("class");
      expect(banner).toHaveClass("edge-class");
      expect(banner).toHaveAttribute("aria-label", "Edge header");
    });
  });
});
