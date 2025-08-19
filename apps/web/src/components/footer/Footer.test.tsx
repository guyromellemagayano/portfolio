import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Footer } from "./Footer";

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock the components
vi.mock("@guyromellemagayano/components", () => ({
  A: vi.fn(({ children, ...props }) => (
    <a data-testid="grm-a" {...props}>
      {children}
    </a>
  )),
  Div: vi.fn(({ children, ...props }) => (
    <div data-testid="div" {...props}>
      {children}
    </div>
  )),
  Footer: vi.fn(({ children, ...props }) => (
    <footer data-testid="grm-footer" {...props}>
      {children}
    </footer>
  )),
  Li: vi.fn(({ children, ...props }) => (
    <li data-testid="grm-li" {...props}>
      {children}
    </li>
  )),
  Main: vi.fn(({ children, ...props }) => (
    <main data-testid="grm-main" {...props}>
      {children}
    </main>
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

// Mock the Footer data
vi.mock("./Footer.data", () => ({
  FOOTER_COMPONENT_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
  ],
  FooterComponentNavLinks: vi.fn(),
  FooterLink: vi.fn(),
}));

// Mock the CSS module
vi.mock("./Footer.module.css", () => ({
  default: {
    footerComponent: "footer-component",
    footerContent: "footer-content",
    footerBrand: "footer-brand",
    brandName: "brand-name",
    legalText: "legal-text",
    footerNav: "footer-nav",
    navList: "nav-list",
    navItem: "nav-item",
    navLink: "nav-link",
  },
}));

describe("Footer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<Footer data-testid="footer" />);
      expect(screen.getByTestId("footer-root")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Footer data-testid="footer" />);
      const footer = screen.getByTestId("footer-root");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("footer-component");
    });

    it("renders with custom className", () => {
      render(<Footer className="custom-class" data-testid="footer" />);
      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("footer-component", "custom-class");
    });

    it("renders with custom brand name", () => {
      render(<Footer brandName="Custom Brand" data-testid="footer" />);
      const footer = screen.getByTestId("footer-root");
      expect(footer).toBeInTheDocument();
      expect(screen.getByText("Custom Brand")).toBeInTheDocument();
    });

    it("renders with custom legal text", () => {
      render(<Footer legalText="Custom legal text" data-testid="footer" />);
      const footer = screen.getByTestId("footer-root");
      expect(footer).toBeInTheDocument();
      expect(screen.getByText("Custom legal text")).toBeInTheDocument();
    });

    it("renders with default brand name when not provided", () => {
      render(<Footer data-testid="footer" />);
      expect(screen.getByText("Guy Romelle Magayano")).toBeInTheDocument();
    });

    it("renders with default legal text when not provided", () => {
      render(<Footer data-testid="footer" />);
      expect(screen.getByText("All rights reserved.")).toBeInTheDocument();
    });
  });

  describe("useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(<Footer _internalId="custom-id" data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "custom-id");
    });

    it("generates ID when _internalId is not provided", () => {
      render(<Footer data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id");
    });

    it("applies data-debug-mode when _debugMode is true", () => {
      render(<Footer _debugMode={true} data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when _debugMode is false", () => {
      render(<Footer _debugMode={false} data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when _debugMode is undefined", () => {
      render(<Footer data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <Footer
          _internalId="custom-id"
          _debugMode={true}
          data-testid="footer"
        />
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "custom-id");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes all rest props to the component", () => {
      render(
        <Footer
          data-testid="footer"
          aria-label="Footer navigation"
          role="contentinfo"
        />
      );

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("aria-label", "Footer navigation");
      expect(footer).toHaveAttribute("role", "contentinfo");
    });
  });

  describe("Navigation Links - Internal Links", () => {
    it("renders with default navigation links", () => {
      render(<Footer data-testid="footer" />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/about"
      );
      expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
        "href",
        "/articles"
      );
    });

    it("renders with custom internal navigation links", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
        { kind: "internal", label: "Contact", href: "/contact" },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
        "href",
        "/contact"
      );
    });

    it("handles internal links with Route objects", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" as const },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/"
      );
    });

    it("sets correct target and rel for internal links", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveAttribute("target", "_self");
      expect(link).not.toHaveAttribute("rel");
    });
  });

  describe("Navigation Links - External Links", () => {
    it("renders external links with newTab=true", () => {
      const customLinks = [
        {
          kind: "external",
          label: "External",
          href: "https://example.com",
          newTab: true,
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders external links with newTab=false", () => {
      const customLinks = [
        {
          kind: "external",
          label: "External",
          href: "https://example.com",
          newTab: false,
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_self");
      expect(link).not.toHaveAttribute("rel");
    });

    it("renders external links with custom rel attribute", () => {
      const customLinks = [
        {
          kind: "external",
          label: "External",
          href: "https://example.com",
          newTab: true,
          rel: "noopener",
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders external links without newTab property", () => {
      const customLinks = [
        {
          kind: "external",
          label: "External",
          href: "https://example.com",
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_self");
      expect(link).not.toHaveAttribute("rel");
    });
  });

  describe("Navigation Links - Mixed Types", () => {
    it("renders mixed internal and external links", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
        {
          kind: "external",
          label: "External",
          href: "https://example.com",
          newTab: true,
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const homeLink = screen.getByRole("link", { name: "Home" });
      const externalLink = screen.getByRole("link", { name: "External" });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(homeLink).toHaveAttribute("target", "_self");
      expect(externalLink).toHaveAttribute("href", "https://example.com");
      expect(externalLink).toHaveAttribute("target", "_blank");
      expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("generates unique keys for navigation items", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
        { kind: "internal", label: "About", href: "/about" },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      // Both links should render without key conflicts
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    });
  });

  describe("Navigation Links - Edge Cases", () => {
    it("handles empty navigation links array", () => {
      render(<Footer navLinks={[]} data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toBeInTheDocument();

      // Should not render navigation section
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("handles undefined navigation links", () => {
      render(<Footer navLinks={undefined} data-testid="footer" />);

      // Should use default navigation links
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
    });

    it("handles navigation links with empty strings", () => {
      const customLinks = [
        { kind: "internal", label: "", href: "/empty" },
        { kind: "external", label: "External", href: "https://example.com" },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      // Should render both links
      expect(screen.getByRole("link", { name: "" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "External" })
      ).toBeInTheDocument();
    });

    it("handles navigation links with special characters in href", () => {
      const customLinks = [
        {
          kind: "internal",
          label: "Special",
          href: "/path/with/special/chars?param=value#hash",
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "Special" });
      expect(link).toHaveAttribute(
        "href",
        "/path/with/special/chars?param=value#hash"
      );
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<Footer data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      const content = footer.querySelector(".footer-content");
      const brand = content?.querySelector(".footer-brand");
      const nav = content?.querySelector(".footer-nav");

      expect(content).toBeInTheDocument();
      expect(brand).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
    });

    it("renders brand section with correct classes", () => {
      render(<Footer data-testid="footer" />);

      const brandSection = screen
        .getByTestId("footer-root")
        .querySelector(".footer-brand");
      const brandName = brandSection?.querySelector(".brand-name");
      const legalText = brandSection?.querySelector(".legal-text");

      expect(brandName).toBeInTheDocument();
      expect(legalText).toBeInTheDocument();
    });

    it("renders navigation section with correct classes", () => {
      render(<Footer data-testid="footer" />);

      const navSection = screen
        .getByTestId("footer-root")
        .querySelector(".footer-nav");
      const navList = navSection?.querySelector(".nav-list");
      const navItems = navSection?.querySelectorAll(".nav-item");

      expect(navList).toBeInTheDocument();
      expect(navItems).toHaveLength(2); // Default links
    });

    it("renders navigation links with correct classes", () => {
      render(<Footer data-testid="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("nav-link");
      });
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the footer component", () => {
      const ref = vi.fn();
      render(<Footer ref={ref} data-testid="footer" />);

      expect(ref).toHaveBeenCalled();
    });

    it("forwards ref with correct element", () => {
      const ref = vi.fn();
      render(<Footer ref={ref} data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(ref).toHaveBeenCalledWith(footer);
    });
  });

  describe("Accessibility", () => {
    it("renders navigation with proper semantic structure", () => {
      render(<Footer data-testid="footer" />);

      const nav = screen.getByRole("navigation");
      const list = nav.querySelector("ul");
      const listItems = nav.querySelectorAll("li");

      expect(nav).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(2);
    });

    it("renders links with proper accessibility attributes", () => {
      render(<Footer data-testid="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("href");
        expect(link.textContent).toBeTruthy();
      });
    });

    it("renders external links with proper security attributes", () => {
      const customLinks = [
        {
          kind: "external",
          label: "External",
          href: "https://example.com",
          newTab: true,
        },
      ] as const;

      render(<Footer navLinks={customLinks} data-testid="footer" />);

      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<Footer data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("footer-component");
    });

    it("combines custom className with CSS module classes", () => {
      render(<Footer className="custom-class" data-testid="footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("footer-component", "custom-class");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(<Footer data-testid="footer" />);

      const initialFooter = screen.getByTestId("footer-root");

      rerender(<Footer data-testid="footer" />);

      const updatedFooter = screen.getByTestId("footer-root");
      expect(updatedFooter).toBe(initialFooter);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(<Footer data-testid="footer" />);

      rerender(<Footer brandName="New Brand" data-testid="footer" />);

      expect(screen.getByText("New Brand")).toBeInTheDocument();
    });
  });
});
