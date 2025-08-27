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
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
  isValidLink: vi.fn((href) => href && href.length > 0),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  })),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../FooterNavigation.module.css", () => ({
  default: {
    footerNavigationList: "footerNavigationList",
    footerNavigationItem: "footerNavigationItem",
    footerNavigationLink: "footerNavigationLink",
  },
}));

describe("FooterNavigation", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders navigation links correctly", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
        { kind: "internal" as const, label: "About", href: "/about" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/about"
      );
    });

    it("renders external links with proper attributes", () => {
      const navLinks = [
        {
          kind: "external" as const,
          label: "GitHub",
          href: "https://github.com",
          newTab: true,
        },
        {
          kind: "external" as const,
          label: "LinkedIn",
          href: "https://linkedin.com",
          rel: "noopener",
        },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      const githubLink = screen.getByRole("link", { name: "GitHub" });
      const linkedinLink = screen.getByRole("link", { name: "LinkedIn" });

      expect(githubLink).toHaveAttribute("href", "https://github.com");
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com");
      expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("applies custom className", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} className="custom-nav" />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveClass("custom-nav");
    });

    it("renders with debug mode enabled", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} debugMode />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom internal ID", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} internalId="custom-nav" />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveAttribute("data-footer-navigation-id", "custom-nav");
    });

    it("passes through HTML attributes", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(
        <FooterNavigation
          navLinks={navLinks}
          aria-label="Site navigation"
          role="navigation"
        />
      );

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveAttribute("aria-label", "Site navigation");
      expect(nav).toHaveAttribute("role", "navigation");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no navLinks provided", () => {
      render(<FooterNavigation />);

      expect(
        screen.queryByTestId("footer-navigation-root")
      ).not.toBeInTheDocument();
    });

    it("renders when navLinks is empty array", () => {
      render(<FooterNavigation navLinks={[]} />);

      expect(screen.getByTestId("footer-navigation-root")).toBeInTheDocument();
    });

    it("renders when navLinks contains valid links", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      expect(screen.getByTestId("footer-navigation-root")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("does not apply data-debug-mode when debugMode is false", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} debugMode={false} />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as nav element by default", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with correct CSS classes", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveClass("footerNavigationList");
    });

    it("combines CSS module classes with custom className", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(<FooterNavigation navLinks={navLinks} className="custom-nav" />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveClass("footerNavigationList custom-nav");
    });
  });

  describe("Link Handling", () => {
    it("handles internal links correctly", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
        { kind: "internal" as const, label: "About", href: "/about" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/about"
      );
    });

    it("handles external links with target and rel attributes", () => {
      const navLinks = [
        {
          kind: "external" as const,
          label: "GitHub",
          href: "https://github.com",
          newTab: true,
        },
        {
          kind: "external" as const,
          label: "LinkedIn",
          href: "https://linkedin.com",
          rel: "noopener noreferrer",
        },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      const githubLink = screen.getByRole("link", { name: "GitHub" });
      const linkedinLink = screen.getByRole("link", { name: "LinkedIn" });

      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(linkedinLink).toHaveAttribute("target", "_blank");
      expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("handles invalid links gracefully", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Invalid", href: "" },
        { kind: "external" as const, label: "Invalid External", href: "" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      expect(screen.getByText("Invalid")).toBeInTheDocument();
      expect(screen.getByText("Invalid External")).toBeInTheDocument();

      // Should render as spans instead of links for invalid hrefs
      expect(
        screen.queryByRole("link", { name: "Invalid" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Invalid External" })
      ).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
        { kind: "internal" as const, label: "About", href: "/about" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav.tagName).toBe("NAV");

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(2);
    });

    it("renders with proper data attributes for debugging", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
      ];

      render(
        <FooterNavigation navLinks={navLinks} internalId="test-id" debugMode />
      );

      const nav = screen.getByTestId("footer-navigation-root");
      expect(nav).toHaveAttribute("data-footer-navigation-id", "test-id");
      expect(nav).toHaveAttribute("data-debug-mode", "true");
      expect(nav).toHaveAttribute("data-testid", "footer-navigation-root");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex link structures", () => {
      const navLinks = [
        { kind: "internal" as const, label: "Home", href: "/" },
        {
          kind: "external" as const,
          label: "GitHub",
          href: "https://github.com",
          newTab: true,
        },
        { kind: "internal" as const, label: "About", href: "/about" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("GitHub")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("handles links with special characters", () => {
      const navLinks = [
        {
          kind: "internal" as const,
          label: "About & Contact",
          href: "/about-contact",
        },
        {
          kind: "external" as const,
          label: "GitHub (Repo)",
          href: "https://github.com/repo",
        },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      expect(screen.getByText("About & Contact")).toBeInTheDocument();
      expect(screen.getByText("GitHub (Repo)")).toBeInTheDocument();
    });

    it("handles empty link labels", () => {
      const navLinks = [
        { kind: "internal" as const, label: "", href: "/" },
        { kind: "external" as const, label: "", href: "https://example.com" },
      ];

      render(<FooterNavigation navLinks={navLinks} />);

      // Should still render the navigation element
      expect(screen.getByTestId("footer-navigation-root")).toBeInTheDocument();
    });
  });
});
