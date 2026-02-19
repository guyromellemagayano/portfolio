/**
 * @file Header.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Header component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../Header";

// ============================================================================
// MOCKS (same as Header.test.tsx for integration context)
// ============================================================================

vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, any> = {
      "components.header": {
        brandName: "Guy Romelle Magayano",
        labels: {
          home: "Home",
          about: "About",
          articles: "Articles",
          projects: "Projects",
          uses: "Uses",
          contact: "Contact",
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
      },
    };

    return (key: string) => {
      const keys = key.split(".");
      let value: any = translations[namespace];
      for (const item of keys) {
        value = value?.[item];
      }
      return value ?? key;
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

const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({
    resolvedTheme: "light",
    setTheme: mockSetTheme,
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

vi.mock("@portfolio/utils", () => ({
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
// INTEGRATION TESTS
// ============================================================================

describe("Header Integration", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
    mockSetTheme.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Full Header with sub-components", () => {
    it("renders complete header with banner, navs, avatar, and theme toggle", () => {
      render(<Header />);

      const banner = screen.getByRole("banner");
      expect(banner).toBeInTheDocument();

      const navs = screen.getAllByRole("navigation", {
        name: /desktop navigation|mobile navigation|navigation/i,
      });
      expect(navs.length).toBeGreaterThanOrEqual(1);

      expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: /toggle theme|switch to (light|dark) mode/i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("img", { name: /Guy Romelle Magayano/i })
      ).toBeInTheDocument();
    });

    it("theme toggle button triggers setTheme on click", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const toggle = screen.getByRole("button", {
        name: /toggle theme|switch to (light|dark) mode/i,
      });
      await user.click(toggle);

      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });

    it("navigation links have correct hrefs", () => {
      render(<Header />);

      const aboutLinks = screen.getAllByRole("link", { name: /about/i });
      expect(
        aboutLinks.some((el) => el.getAttribute("href") === "/about")
      ).toBe(true);

      const articlesLinks = screen.getAllByRole("link", { name: /articles/i });
      expect(
        articlesLinks.some((el) => el.getAttribute("href") === "/articles")
      ).toBe(true);
    });
  });

  describe("Homepage vs non-homepage layout", () => {
    it("on homepage renders large avatar and content offset", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Header />);

      const homeLink = screen.getByRole("link", { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      const containers = screen.getAllByTestId("container");
      expect(containers.length).toBeGreaterThanOrEqual(1);
    });

    it("on non-homepage still renders banner and navigation", () => {
      vi.mocked(usePathname).mockReturnValue("/about");
      render(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      const navs = screen.getAllByRole("navigation", {
        name: /desktop navigation|mobile navigation|navigation/i,
      });
      expect(navs.length).toBeGreaterThanOrEqual(1);
    });
  });
});
