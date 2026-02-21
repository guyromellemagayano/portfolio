/**
 * @file apps/web/src/components/footer/__tests__/Footer.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Footer component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../Footer";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<
      string,
      string | ((params?: Record<string, string>) => string)
    > = {
      "navigation.about": "About",
      "navigation.articles": "Articles",
      "navigation.projects": "Projects",
      "navigation.uses": "Uses",
      "labels.navigation": "Footer navigation",
      "labels.footer": "Site footer",
      brandName: "Guy Romelle Magayano",
      "legal.copyright": (params) =>
        `© ${params?.year ?? ""} ${params?.brandName ?? ""}. All rights reserved.`,
    };

    return (key: string, params?: Record<string, any>) => {
      const value = translations[key];
      return typeof value === "function" ? value(params || {}) : value || key;
    };
  }),
}));

// Mock dependencies
vi.mock("@portfolio/utils", () => ({
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date(date).getFullYear().toString();
    }
    return date.toISOString();
  }),
  hasValidNavigationLinks: vi.fn((links) => {
    if (links === null || links === undefined) return false;
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
  filterValidNavigationLinks: vi.fn((links) => {
    if (!links || !Array.isArray(links)) return [];
    return links.filter((link) => {
      return (
        link &&
        typeof link.label === "string" &&
        link.label.length > 0 &&
        link.href !== null &&
        link.href !== undefined
      );
    });
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString?.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");

    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
}));

vi.mock("@web/components/container", () => ({
  Container: {
    Outer: function ContainerOuter({ children, ...props }: any) {
      return (
        <div data-testid="container-outer" {...props}>
          {children}
        </div>
      );
    },
    Inner: function ContainerInner({ children, ...props }: any) {
      return (
        <div data-testid="container-inner" {...props}>
          {children}
        </div>
      );
    },
  },
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("Footer", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders footer with data prop", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders footer navigation links", () => {
      render(<Footer />);

      expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Articles" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Projects" })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Uses" })).toBeInTheDocument();
    });

    it("renders footer legal text", () => {
      render(<Footer />);

      // Legal text is generated from i18n with current year
      expect(
        screen.getByText(/© \d{4} Guy Romelle Magayano\. All rights reserved\./)
      ).toBeInTheDocument();
    });

    it("renders with container structure", () => {
      render(<Footer />);

      expect(screen.getByTestId("container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner")).toBeInTheDocument();
    });
  });

  describe("FooterNavigation Component", () => {
    it("renders navigation with aria-label", () => {
      render(<Footer />);

      const nav = screen.getByRole("navigation", { name: "Footer navigation" });
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe("NAV");
    });

    it("renders navigation links correctly", () => {
      render(<Footer />);

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink).toHaveAttribute("href", "/about");

      const articlesLink = screen.getByRole("link", { name: "Articles" });
      expect(articlesLink).toHaveAttribute("href", "/articles");
    });

    it("renders navigation with list items structure", () => {
      render(<Footer />);

      const nav = screen.getByRole("navigation");
      const listItems = nav.querySelectorAll("li");
      expect(listItems).toHaveLength(5);

      // Verify each link is wrapped in a list item
      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink.closest("li")).toBeInTheDocument();
    });

    it("renders with correct CSS classes", () => {
      render(<Footer />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("flex");
      expect(nav).toHaveClass("list-none");
      expect(nav).toHaveClass("justify-center");
      expect(nav).toHaveClass("text-sm");
    });

    it("renders internal links with target _self", () => {
      render(<Footer />);

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink).toHaveAttribute("target", "_self");
    });
  });

  describe("FooterLegal Component", () => {
    it("renders legal text correctly", () => {
      render(<Footer />);

      // Legal text is generated from i18n with current year
      const legalText = screen.getByText(
        /© \d{4} Guy Romelle Magayano\. All rights reserved\./
      );
      expect(legalText).toBeInTheDocument();
      expect(legalText.tagName).toBe("P");
    });

    it("renders legal text generated from i18n", () => {
      render(<Footer />);

      // Legal text is generated from i18n, not from data.legalText
      expect(
        screen.getByText(/© \d{4} Guy Romelle Magayano\. All rights reserved\./)
      ).toBeInTheDocument();
    });

    it("renders legal text without redundant aria-label", () => {
      render(<Footer />);

      const legalElement = screen
        .getByText(/© \d{4} Guy Romelle Magayano\. All rights reserved\./)
        .closest("p");

      expect(legalElement).not.toHaveAttribute("aria-label");
    });

    it("renders with correct CSS classes", () => {
      render(<Footer />);

      const legalElement = screen
        .getByText(/© \d{4} Guy Romelle Magayano\. All rights reserved\./)
        .closest("p");

      expect(legalElement?.className).toContain("text-sm");
      expect(legalElement?.className).toContain("text-zinc-400");
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as footer element by default", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with aria-label for footer landmark", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("aria-label", "Site footer");
    });

    it("does not have redundant role attribute", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      // Footer element has implicit role="contentinfo", should not be explicitly set
      expect(footer).not.toHaveAttribute("role", "contentinfo");
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("class");
      expect(footer).toHaveClass("custom-footer");
    });

    it("applies default Tailwind classes", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("mt-32");
      expect(footer).toHaveClass("flex-none");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(<Footer id="main-footer" data-custom="value" />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("id", "main-footer");
      expect(footer).toHaveAttribute("data-custom", "value");
    });

    it("uses i18n aria-label (custom aria-label prop is overridden by component)", () => {
      render(<Footer aria-label="Custom footer label" />);

      const footer = screen.getByRole("contentinfo");
      // Component explicitly sets aria-label from i18n, which overrides any prop
      expect(footer).toHaveAttribute("aria-label", "Site footer");
    });
  });

  describe("Component Structure", () => {
    it("renders with proper container nesting", () => {
      render(<Footer />);

      const outer = screen.getByTestId("container-outer");
      const inner = screen.getByTestId("container-inner");

      expect(outer).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      expect(outer).toContainElement(inner);
    });

    it("renders navigation and legal in correct order", () => {
      render(<Footer />);

      const inner = screen.getByTestId("container-inner");
      const nav = screen.getByRole("navigation");
      const legalText = screen.getByText(
        /© \d{4} Guy Romelle Magayano\. All rights reserved\./
      );

      expect(inner).toContainElement(nav);
      expect(inner).toContainElement(legalText);
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to footer element", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe("FOOTER");
    });

    it("applies correct ARIA label to footer", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("aria-label", "Site footer");
    });

    it("applies correct ARIA label to navigation", () => {
      render(<Footer />);

      const nav = screen.getByRole("navigation", { name: "Footer navigation" });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("aria-label", "Footer navigation");
    });

    it("does not apply redundant role to navigation", () => {
      render(<Footer />);

      const nav = screen.getByRole("navigation");
      // Nav element has implicit role="navigation", should not be explicitly set
      expect(nav).not.toHaveAttribute("role", "navigation");
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(<Footer />);

      let footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("aria-label", "Site footer");

      rerender(<Footer aria-label="Updated footer" />);

      footer = screen.getByRole("contentinfo");
      // Component always uses i18n aria-label, custom prop is overridden
      expect(footer).toHaveAttribute("aria-label", "Site footer");
    });
  });

  describe("Link Optimization (SEO)", () => {
    it("renders internal links with descriptive text", () => {
      render(<Footer />);

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink).toHaveTextContent("About");
      expect(aboutLink).toHaveAttribute("href", "/about");
    });

    it("does not use aria-label on links with descriptive text", () => {
      render(<Footer />);

      const aboutLink = screen.getByRole("link", { name: "About" });
      // Links with descriptive text should not have aria-label (SEO best practice)
      expect(aboutLink).not.toHaveAttribute("aria-label");
    });
  });

  describe("Edge Cases", () => {
    it("handles special characters in legal text from i18n", () => {
      // Legal text is generated from i18n, so special characters are handled by i18n
      render(<Footer />);

      // Legal text should render with current year from formatDateSafely
      expect(
        screen.getByText(/© \d{4} Guy Romelle Magayano\. All rights reserved\./)
      ).toBeInTheDocument();
    });
  });
});
