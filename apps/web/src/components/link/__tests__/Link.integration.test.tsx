/**
 * @file Link.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Link component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("@guyromellemagayano/utils", () => ({
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || (href?.startsWith("http") ? "_blank" : undefined),
    rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
  })),
  isValidLink: vi.fn((href) => href != null && href !== "" && href !== "#"),
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

vi.mock("@web/components/icon/Icon", () => ({
  Icon: vi.fn(({ name, className, page, ...props }) => (
    <svg
      className={className}
      data-testid={`icon-${name}`}
      data-icon-name={name}
      data-icon-page={page}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  )),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Import the component after all mocks are set up
import { Link } from "../Link";

describe("Link Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ============================================================================
  // COMPONENT COMPOSITION INTEGRATION
  // ============================================================================

  describe("Component Composition Integration", () => {
    it("renders multiple default links together", () => {
      render(
        <div>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>
      );

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
    });

    it("renders multiple social links together", () => {
      render(
        <div>
          <Link.Social href="https://github.com" icon="github">
            Test
          </Link.Social>
          <Link.Social href="https://instagram.com" icon="instagram">
            Test
          </Link.Social>
          <Link.Social href="https://linkedin.com" icon="linkedin">
            Test
          </Link.Social>
        </div>
      );

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute("href", "https://github.com");
      expect(links[1]).toHaveAttribute("href", "https://instagram.com");
      expect(links[2]).toHaveAttribute("href", "https://linkedin.com");

      expect(screen.getByTestId("icon-github")).toBeInTheDocument();
      expect(screen.getByTestId("icon-instagram")).toBeInTheDocument();
      expect(screen.getByTestId("icon-linkedin")).toBeInTheDocument();
    });

    it("renders mixed default and social links together", () => {
      render(
        <div>
          <Link href="/about">About</Link>
          <Link.Social href="https://github.com" icon="github" title="GitHub">
            Test
          </Link.Social>
          <Link href="/contact">Contact</Link>
        </div>
      );

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ICON INTEGRATION
  // ============================================================================

  describe("Icon Integration", () => {
    it("renders social link with different icon names", () => {
      const icons = ["github", "instagram", "linkedin", "x"] as const;

      icons.forEach((iconName) => {
        const { unmount } = render(
          <Link.Social href="https://example.com" icon={iconName}>
            Test
          </Link.Social>
        );

        const icon = screen.getByTestId(`icon-${iconName}`);
        expect(icon).toBeInTheDocument();
        unmount();
      });
    });

    it("renders social link with icon and label", () => {
      render(
        <Link.Social
          href="https://github.com"
          icon="github"
          hasLabel={true}
          label="GitHub Profile"
        >
          Test
        </Link.Social>
      );

      const link = screen.getByRole("link");
      const icon = screen.getByTestId("icon-github");
      const label = screen.getByText("GitHub Profile");

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(link).toContainElement(icon);
      expect(link).toContainElement(label);
    });

    it("renders social link with icon and page prop", () => {
      render(
        <Link.Social href="https://example.com" icon="mail" page="about">
          Test
        </Link.Social>
      );

      const icon = screen.getByTestId("icon-mail");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-icon-page", "about");
    });
  });

  // ============================================================================
  // ACCESSIBILITY INTEGRATION
  // ============================================================================

  describe("Accessibility Integration", () => {
    it("maintains consistent accessibility attributes across components", () => {
      render(
        <div>
          <Link href="/test" label="Default Link">
            Default
          </Link>
          <Link.Social
            href="https://example.com"
            icon="github"
            title="Social Link"
          >
            Test
          </Link.Social>
        </div>
      );

      const defaultLink = screen.getByText("Default").closest("a");
      const socialLink = screen.getByRole("link", { name: /social link/i });

      expect(defaultLink).toHaveAttribute("aria-label", "Default Link");
      expect(defaultLink).toHaveAttribute("title", "Default Link");
      expect(socialLink).toHaveAttribute("aria-label", "Social Link");
      expect(socialLink).toHaveAttribute("title", "Social Link");
    });

    it("handles aria-label correctly for social links with labels", () => {
      render(
        <Link.Social
          href="https://github.com"
          icon="github"
          hasLabel={true}
          label="GitHub"
          title="GitHub Profile"
        >
          Test
        </Link.Social>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "GitHub");
    });
  });

  // ============================================================================
  // LINK TARGET INTEGRATION
  // ============================================================================

  describe("Link Target Integration", () => {
    it("applies correct target attributes for external links", () => {
      render(
        <div>
          <Link href="https://example.com">External Default</Link>
          <Link.Social href="https://github.com" icon="github" title="GitHub">
            Test
          </Link.Social>
        </div>
      );

      const defaultLink = screen.getByText("External Default").closest("a");
      const socialLink = screen.getByRole("link", { name: "GitHub" });

      expect(defaultLink).toHaveAttribute("target", "_blank");
      expect(defaultLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(socialLink).toHaveAttribute("target", "_blank");
      expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("applies correct target attributes for internal links", () => {
      render(
        <div>
          <Link href="/about">Internal Default</Link>
          <Link.Social href="/contact" icon="github" title="GitHub">
            Test
          </Link.Social>
        </div>
      );

      const defaultLink = screen.getByText("Internal Default").closest("a");
      const socialLink = screen.getByRole("link", { name: "GitHub" });

      expect(defaultLink).not.toHaveAttribute("target");
      expect(defaultLink).not.toHaveAttribute("rel");
      expect(socialLink).not.toHaveAttribute("target");
      expect(socialLink).not.toHaveAttribute("rel");
    });

    it("respects custom target prop", () => {
      render(
        <div>
          <Link href="https://example.com" target="_self">
            Custom Target Default
          </Link>
          <Link.Social
            href="https://github.com"
            icon="github"
            target="_self"
            title="GitHub"
          >
            Test
          </Link.Social>
        </div>
      );

      const defaultLink = screen
        .getByText("Custom Target Default")
        .closest("a");
      const socialLink = screen.getByRole("link", { name: "GitHub" });

      expect(defaultLink).toHaveAttribute("target", "_self");
      expect(socialLink).toHaveAttribute("target", "_self");
    });
  });

  // ============================================================================
  // PERFORMANCE INTEGRATION
  // ============================================================================

  describe("Performance Integration", () => {
    it("handles prop updates efficiently for default variant", () => {
      const { rerender } = render(<Link href="/test">Test Link</Link>);

      rerender(
        <Link href="/test2" className="updated">
          Test Link
        </Link>
      );
      const updatedLink = screen.getByText("Test Link").closest("a");

      expect(updatedLink).toHaveAttribute("href", "/test2");
      expect(updatedLink).toHaveClass("updated");
    });

    it("handles prop updates efficiently for social variant", () => {
      const { rerender } = render(
        <Link.Social href="https://example.com" icon="github">
          Test
        </Link.Social>
      );

      rerender(
        <Link.Social
          href="https://github.com"
          icon="instagram"
          className="updated"
        >
          Test
        </Link.Social>
      );
      const updatedLink = screen.getByRole("link");

      expect(updatedLink).toHaveAttribute("href", "https://github.com");
      expect(updatedLink).toHaveClass("updated");
    });
  });

  // ============================================================================
  // EDGE CASES INTEGRATION
  // ============================================================================

  describe("Edge Cases Integration", () => {
    it("handles social link with invalid href", () => {
      const { container } = render(
        <Link.Social href="" icon="github">
          Test
        </Link.Social>
      );
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "#");
    });

    it("handles social link with all optional props", () => {
      render(
        <Link.Social
          href="https://github.com"
          icon="github"
          page="about"
          hasLabel={true}
          label="GitHub"
          title="GitHub Profile"
          target="_blank"
          className="custom-class"
        >
          Test
        </Link.Social>
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("custom-class");
      expect(link).toHaveAttribute("aria-label", "GitHub");
      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });
  });
});
