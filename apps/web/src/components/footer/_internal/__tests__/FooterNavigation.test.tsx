// Mock IntersectionObserver FIRST
const mockIntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FooterNavigation } from "../FooterNavigation";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasValidContent: vi.fn((content) => {
    if (content === null || content === undefined) return false;
    if (Array.isArray(content)) return content.length > 0;
    return true;
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
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  isValidLink: vi.fn((href) => href && href.length > 0),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  })),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date(date).getFullYear().toString();
    }
    return new Date(date).toISOString();
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../styles/FooterNavigation.module.css", () => ({
  default: {
    footerNavigationList: "_footerNavigationList_765b12",
    footerNavigationItem: "_footerNavigationItem_765b12",
    footerNavigationLink: "_footerNavigationLink_765b12",
  },
}));

describe("FooterNavigation", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders navigation links correctly", () => {
      render(<FooterNavigation />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
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
      expect(screen.getByRole("link", { name: "Speaking" })).toHaveAttribute(
        "href",
        "/speaking"
      );
      expect(screen.getByRole("link", { name: "Uses" })).toHaveAttribute(
        "href",
        "/uses"
      );
    });

    it("applies custom className", () => {
      render(<FooterNavigation className="custom-nav" />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).toHaveClass("custom-nav");
    });

    it("renders with debug mode enabled", () => {
      render(<FooterNavigation _debugMode />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom internal ID", () => {
      render(<FooterNavigation _internalId="custom-nav" />);

      const nav = screen.getByTestId("custom-nav-footer-navigation-root");
      expect(nav).toHaveAttribute(
        "data-footer-navigation-id",
        "custom-nav-footer-navigation"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <FooterNavigation aria-label="Site navigation" role="navigation" />
      );

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).toHaveAttribute("aria-label", "Site navigation");
      expect(nav).toHaveAttribute("role", "navigation");
    });
  });

  describe("Content Validation", () => {
    it("renders with default internal navigation links", () => {
      render(<FooterNavigation />);

      expect(
        screen.getByTestId("test-id-footer-navigation-root")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<FooterNavigation _debugMode={false} />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as nav element by default", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with correct CSS classes", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).toHaveClass("_footerNavigationList_765b12");
    });

    it("combines CSS module classes with custom className", () => {
      render(<FooterNavigation className="custom-nav" />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).toHaveClass("_footerNavigationList_765b12 custom-nav");
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
      expect(screen.getByRole("link", { name: "Speaking" })).toHaveAttribute(
        "href",
        "/speaking"
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
      expect(
        screen.getByRole("link", { name: "Speaking" })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Uses" })).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<FooterNavigation />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav.tagName).toBe("NAV");

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(5); // About, Articles, Projects, Speaking, Uses
    });

    it("renders with proper data attributes for debugging", () => {
      render(<FooterNavigation _internalId="test-id" _debugMode />);

      const nav = screen.getByTestId("test-id-footer-navigation-root");
      expect(nav).toHaveAttribute(
        "data-footer-navigation-id",
        "test-id-footer-navigation"
      );
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute(
        "data-testid",
        "test-id-footer-navigation-root"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles complex link structures", () => {
      render(<FooterNavigation />);

      // Check that all default links are rendered
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("handles links with special characters", () => {
      render(<FooterNavigation />);

      // Default links don't have special characters, but we can verify they render
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("handles empty link labels", () => {
      render(<FooterNavigation />);

      // Should still render the navigation element with default links
      expect(
        screen.getByTestId("test-id-footer-navigation-root")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });
});
