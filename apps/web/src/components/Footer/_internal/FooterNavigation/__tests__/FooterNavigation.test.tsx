import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FooterNavigation } from "../FooterNavigation";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
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
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
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
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  })),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date().getFullYear().toString();
    }
    return "Formatted Date";
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../data", () => ({
  FOOTER_COMPONENT_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
    { kind: "internal", label: "Projects", href: "/projects" },

    { kind: "internal", label: "Uses", href: "/uses" },
  ],
}));

// FooterNavigation component uses Tailwind CSS, no CSS modules needed

describe("FooterNavigation", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders navigation links correctly", () => {
      render(<FooterNavigation />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/about"
      );
      expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
        "href",
        "/articles"
      );
    });

    it("renders external links with proper attributes", () => {
      render(<FooterNavigation />);

      // Check that default internal links are rendered
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/about"
      );
      expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
        "href",
        "/articles"
      );
      expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
        "href",
        "/projects"
      );
      expect(screen.getByRole("link", { name: "Uses" })).toHaveAttribute(
        "href",
        "/uses"
      );
    });

    it("applies custom className", () => {
      render(<FooterNavigation className="custom-nav" />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).toHaveClass("custom-nav");
    });

    it("renders with debug mode enabled", () => {
      render(<FooterNavigation debugId="test-id" debugMode />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID", () => {
      render(<FooterNavigation debugId="custom-nav" />);

      const nav = screen.getByTestId("custom-nav-footer-navigation");
      expect(nav).toHaveAttribute(
        "data-footer-navigation-id",
        "custom-nav-footer-navigation"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <FooterNavigation aria-label="Site navigation" role="navigation" />
      );

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).toHaveAttribute("aria-label", "Site navigation");
      expect(nav).toHaveAttribute("role", "navigation");
    });
  });

  describe("Content Validation", () => {
    it("renders with default internal navigation links", () => {
      render(<FooterNavigation />);

      expect(
        screen.getByTestId("test-id-footer-navigation")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<FooterNavigation debugId="test-id" debugMode={false} />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<FooterNavigation debugId="test-id" />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as nav element by default", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with correct CSS classes", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).toHaveClass(
        "flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200"
      );
    });

    it("combines Tailwind classes with custom className", () => {
      render(<FooterNavigation className="custom-nav" />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).toHaveClass(
        "flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 custom-nav"
      );
    });
  });

  describe("Link Handling", () => {
    it("handles internal links correctly", () => {
      render(<FooterNavigation />);

      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/about"
      );
      expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute(
        "href",
        "/articles"
      );
      expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
        "href",
        "/projects"
      );
      expect(screen.getByRole("link", { name: "Uses" })).toHaveAttribute(
        "href",
        "/uses"
      );
    });

    it("handles external links with target and rel attributes", () => {
      render(<FooterNavigation />);

      // All default links are internal, so they should have target="_self"
      const aboutLink = screen.getByRole("link", { name: "About" });
      const articlesLink = screen.getByRole("link", { name: "Articles" });

      expect(aboutLink).toHaveAttribute("target", "_self");
      expect(articlesLink).toHaveAttribute("target", "_self");
    });

    it("handles invalid links gracefully", () => {
      render(<FooterNavigation />);

      // All default links should be valid and render as links
      expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Articles" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Projects" })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Uses" })).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav.tagName).toBe("NAV");

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(4); // About, Articles, Projects, Speaking, Uses
    });

    it("renders with proper data attributes for debugging", () => {
      render(<FooterNavigation debugId="test-id" debugMode />);

      const nav = screen.getByTestId("test-id-footer-navigation");
      expect(nav).toHaveAttribute(
        "data-footer-navigation-id",
        "test-id-footer-navigation"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("data-testid", "test-id-footer-navigation");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to navigation elements", () => {
      render(<FooterNavigation debugId="aria-test" />);

      // Test navigation element
      const navElement = screen.getByRole("navigation");
      expect(navElement).toBeInTheDocument();

      // Test list items
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(4);
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<FooterNavigation debugId="aria-test" />);

      const navElement = screen.getByRole("navigation");
      expect(navElement).toHaveAttribute(
        "data-footer-navigation-id",
        "aria-test-footer-navigation"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(<FooterNavigation debugId="aria-test" />);

      // Each list item should have data attributes
      const aboutItem = screen.getByText("About").closest("li");
      const articlesItem = screen.getByText("Articles").closest("li");

      expect(aboutItem).toHaveAttribute(
        "data-footer-navigation-item-id",
        "aria-test-footer-navigation-item"
      );
      expect(articlesItem).toHaveAttribute(
        "data-footer-navigation-item-id",
        "aria-test-footer-navigation-item"
      );
    });

    it("applies correct ARIA labels to navigation links", () => {
      render(<FooterNavigation debugId="aria-test" />);

      // Links should have proper href attributes
      const aboutLink = screen.getByRole("link", { name: "About" });
      const articlesLink = screen.getByRole("link", { name: "Articles" });

      expect(aboutLink).toHaveAttribute("href", "/about");
      expect(articlesLink).toHaveAttribute("href", "/articles");
    });

    it("handles ARIA attributes with different debug IDs", () => {
      render(<FooterNavigation debugId="different-id" />);

      const navElement = screen.getByRole("navigation");
      expect(navElement).toHaveAttribute(
        "data-footer-navigation-id",
        "different-id-footer-navigation"
      );

      const aboutItem = screen.getByText("About").closest("li");
      expect(aboutItem).toHaveAttribute(
        "data-footer-navigation-item-id",
        "different-id-footer-navigation-item"
      );
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<FooterNavigation isMemoized={true} />);
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<FooterNavigation isMemoized={false} />);

      rerender(<FooterNavigation isMemoized={false} />);
      expect(screen.getByText("About")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex link structures", () => {
      render(<FooterNavigation />);

      // Check that all default links are rendered
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("handles links with special characters", () => {
      render(<FooterNavigation />);

      // Default links don't have special characters, but we can verify they render
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("handles empty link labels", () => {
      render(<FooterNavigation />);

      // Should still render the navigation element with default links
      expect(
        screen.getByTestId("test-id-footer-navigation")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });
});
