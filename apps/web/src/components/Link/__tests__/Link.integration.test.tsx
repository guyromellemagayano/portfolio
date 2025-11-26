import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ debugId, debugMode = false } = {}) => ({
    componentId: debugId || "test-id",
    isDebugMode: debugMode,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || (href?.startsWith("http") ? "_blank" : undefined),
    rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
  })),
  isValidLink: vi.fn((href) => href != null && href !== "" && href !== "#"),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

vi.mock("@web/components", () => ({
  Icon: vi.fn(({ name, className, ...props }) => (
    <svg
      className={className}
      data-testid={`icon-${name?.toLowerCase() || name}`}
      data-icon-name={name}
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  )),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Import the component after all mocks are set up
import { Link, MemoizedLink } from "../Link";

// ============================================================================
// LINK INTEGRATION TESTS
// ============================================================================

describe("Link Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ============================================================================
  // VARIANT INTEGRATION
  // ============================================================================

  describe("Variant Integration", () => {
    it("renders default variant correctly", () => {
      render(<Link href="/test">Default Link</Link>);
      const link = screen.getByTestId("test-id-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });

    it("renders social variant correctly", () => {
      render(
        <Link href="https://example.com" variant="social" icon="github">
          Test
        </Link>
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("handles variant switching", () => {
      const { rerender } = render(
        <Link href="/test" variant="default">
          Test Link
        </Link>
      );
      const defaultLink = screen.getByTestId("test-id-link-root");
      expect(defaultLink).toBeInTheDocument();

      rerender(
        <Link href="https://example.com" variant="social" icon="github">
          Test
        </Link>
      );
      const socialLink = screen.getByTestId("test-id-social-link-root");
      expect(socialLink).toBeInTheDocument();
    });
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
      const { container } = render(
        <div>
          <Link href="https://github.com" variant="social" icon="github">
            Test
          </Link>
          <Link href="https://instagram.com" variant="social" icon="instagram">
            Test
          </Link>
          <Link href="https://linkedin.com" variant="social" icon="linkedin">
            Test
          </Link>
        </div>
      );

      const links = screen.getAllByTestId("test-id-social-link-root");
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute("href", "https://github.com");
      expect(links[1]).toHaveAttribute("href", "https://instagram.com");
      expect(links[2]).toHaveAttribute("href", "https://linkedin.com");

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(3);
    });

    it("renders mixed default and social links together", () => {
      render(
        <div>
          <Link href="/about">About</Link>
          <Link href="https://github.com" variant="social" icon="github">
            Test
          </Link>
          <Link href="/contact">Contact</Link>
        </div>
      );

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-social-link-root")
      ).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // PROP DRILLING INTEGRATION
  // ============================================================================

  describe("Prop Drilling Integration", () => {
    it("passes debug props correctly to social variant", () => {
      render(
        <Link
          href="https://example.com"
          variant="social"
          icon="github"
          debugId="custom-id"
          debugMode={true}
        >
          Test
        </Link>
      );

      const link = screen.getByTestId("custom-id-social-link-root");
      expect(link).toHaveAttribute(
        "data-social-link-id",
        "custom-id-social-link-root"
      );
      expect(link).toHaveAttribute("data-debug-mode", "true");
    });

    it("passes HTML attributes correctly to social variant", () => {
      render(
        <Link
          href="https://example.com"
          variant="social"
          icon="github"
          className="custom-class"
          data-test="test-value"
        >
          Test
        </Link>
      );

      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveClass("custom-class");
      expect(link).toHaveAttribute("data-test", "test-value");
    });
  });

  // ============================================================================
  // ICON INTEGRATION
  // ============================================================================

  describe("Icon Integration", () => {
    it("renders social link with different icon names", () => {
      const icons = ["github", "instagram", "linkedin", "x"] as const;

      icons.forEach((iconName) => {
        const { container, unmount } = render(
          <Link href="https://example.com" variant="social" icon={iconName}>
            Test
          </Link>
        );

        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
        unmount();
      });
    });

    it("renders social link with icon and label", () => {
      const { container } = render(
        <Link
          href="https://github.com"
          variant="social"
          icon="github"
          hasLabel={true}
          label="GitHub Profile"
        >
          Test
        </Link>
      );

      const link = screen.getByTestId("test-id-social-link-root");
      const icon = container.querySelector("svg");
      const label = screen.getByText("GitHub Profile");

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(link).toContainElement(icon);
      expect(link).toContainElement(label);
    });

    it("renders social link with icon and page prop", () => {
      const { container } = render(
        <Link
          href="https://example.com"
          variant="social"
          icon="mail"
          page="about"
        >
          Test
        </Link>
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACCESSIBILITY INTEGRATION
  // ============================================================================

  describe("Accessibility Integration", () => {
    it("maintains consistent accessibility attributes across variants", () => {
      const { container: defaultContainer } = render(
        <Link href="/test" title="Default Link">
          Default
        </Link>
      );
      const defaultLink = defaultContainer.querySelector(
        '[data-testid="test-id-link-root"]'
      );
      expect(defaultLink).toHaveAttribute("aria-label", "Default Link");
      expect(defaultLink).toHaveAttribute("title", "Default Link");

      const { container: socialContainer } = render(
        <Link
          href="https://example.com"
          variant="social"
          icon="github"
          title="Social Link"
        >
          Test
        </Link>
      );
      const socialLink = socialContainer.querySelector(
        '[data-testid="test-id-social-link-root"]'
      );
      expect(socialLink).toHaveAttribute("aria-label", "Social Link");
      expect(socialLink).toHaveAttribute("title", "Social Link");
    });

    it("handles aria-label correctly for social links with labels", () => {
      render(
        <Link
          href="https://github.com"
          variant="social"
          icon="github"
          hasLabel={true}
          label="GitHub"
          title="GitHub Profile"
        >
          Test
        </Link>
      );

      const link = screen.getByTestId("test-id-social-link-root");
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
          <Link href="https://example.com" variant="default">
            External Default
          </Link>
          <Link href="https://github.com" variant="social" icon="github">
            Test
          </Link>
        </div>
      );

      const defaultLink = screen.getByText("External Default").closest("a");
      const socialLink = screen.getByTestId("test-id-social-link-root");

      expect(defaultLink).toHaveAttribute("target", "_blank");
      expect(defaultLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(socialLink).toHaveAttribute("target", "_blank");
      expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("applies correct target attributes for internal links", () => {
      render(
        <div>
          <Link href="/about" variant="default">
            Internal Default
          </Link>
          <Link href="/contact" variant="social" icon="github">
            Test
          </Link>
        </div>
      );

      const defaultLink = screen.getByText("Internal Default").closest("a");
      const socialLink = screen.getByTestId("test-id-social-link-root");

      expect(defaultLink).not.toHaveAttribute("target");
      expect(defaultLink).not.toHaveAttribute("rel");
      expect(socialLink).not.toHaveAttribute("target");
      expect(socialLink).not.toHaveAttribute("rel");
    });

    it("respects custom target prop", () => {
      render(
        <div>
          <Link href="https://example.com" variant="default" target="_self">
            Custom Target Default
          </Link>
          <Link
            href="https://github.com"
            variant="social"
            icon="github"
            target="_self"
          >
            Test
          </Link>
        </div>
      );

      const defaultLink = screen
        .getByText("Custom Target Default")
        .closest("a");
      const socialLink = screen.getByTestId("test-id-social-link-root");

      expect(defaultLink).toHaveAttribute("target", "_self");
      expect(socialLink).toHaveAttribute("target", "_self");
    });
  });

  // ============================================================================
  // MEMOIZATION INTEGRATION
  // ============================================================================

  describe("Memoization Integration", () => {
    it("renders MemoizedLink with default variant", () => {
      render(<MemoizedLink href="/test">Memoized Link</MemoizedLink>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toBeInTheDocument();
    });

    it("renders MemoizedLink with social variant", () => {
      render(
        <MemoizedLink href="https://example.com" variant="social" icon="github">
          Test
        </MemoizedLink>
      );

      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });
  });

  // ============================================================================
  // DEBUG MODE INTEGRATION
  // ============================================================================

  describe("Debug Mode Integration", () => {
    it("applies debug mode consistently across variants", () => {
      const { container: defaultContainer } = render(
        <Link href="/test" debugMode={true}>
          Default
        </Link>
      );
      const defaultLink = defaultContainer.querySelector(
        '[data-testid="test-id-link-root"]'
      );
      expect(defaultLink).toHaveAttribute("data-debug-mode", "true");

      const { container: socialContainer } = render(
        <Link
          href="https://example.com"
          variant="social"
          icon="github"
          debugMode={true}
        >
          Test
        </Link>
      );
      const socialLink = socialContainer.querySelector(
        '[data-testid="test-id-social-link-root"]'
      );
      expect(socialLink).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies custom debugId consistently across variants", () => {
      const { container: defaultContainer } = render(
        <Link href="/test" debugId="custom-debug">
          Default
        </Link>
      );
      const defaultLink = defaultContainer.querySelector(
        '[data-testid="custom-debug-link-root"]'
      );
      expect(defaultLink).toBeInTheDocument();

      const { container: socialContainer } = render(
        <Link
          href="https://example.com"
          variant="social"
          icon="github"
          debugId="custom-debug"
        >
          Test
        </Link>
      );
      const socialLink = socialContainer.querySelector(
        '[data-testid="custom-debug-social-link-root"]'
      );
      expect(socialLink).toBeInTheDocument();
    });
  });

  // ============================================================================
  // REF FORWARDING INTEGRATION
  // ============================================================================

  describe("Ref Forwarding Integration", () => {
    it("forwards ref correctly for default variant", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Link href="/test" ref={ref}>
          Default Link
        </Link>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current).toBe(screen.getByTestId("test-id-link-root"));
    });

    it("forwards ref correctly for social variant", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Link
          href="https://example.com"
          variant="social"
          icon="github"
          ref={ref}
        >
          Test
        </Link>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current).toBe(screen.getByTestId("test-id-social-link-root"));
    });

    it("handles multiple refs correctly", () => {
      const ref1 = React.createRef<HTMLAnchorElement>();
      const ref2 = React.createRef<HTMLAnchorElement>();

      render(
        <div>
          <Link href="/test" ref={ref1}>
            Link 1
          </Link>
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            ref={ref2}
          >
            Test
          </Link>
        </div>
      );

      expect(ref1.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref2.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref1.current).not.toBe(ref2.current);
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
      const updatedLink = screen.getByTestId("test-id-link-root");

      expect(updatedLink).toHaveAttribute("href", "/test2");
      expect(updatedLink).toHaveClass("updated");
    });

    it("handles prop updates efficiently for social variant", () => {
      const { rerender } = render(
        <Link href="https://example.com" variant="social" icon="github">
          Test
        </Link>
      );

      rerender(
        <Link
          href="https://github.com"
          variant="social"
          icon="instagram"
          className="updated"
        >
          Test
        </Link>
      );
      const updatedLink = screen.getByTestId("test-id-social-link-root");

      expect(updatedLink).toHaveAttribute("href", "https://github.com");
      expect(updatedLink).toHaveClass("updated");
    });
  });

  // ============================================================================
  // EDGE CASES INTEGRATION
  // ============================================================================

  describe("Edge Cases Integration", () => {
    it("handles social link without children (should not render)", () => {
      const { container } = render(
        <Link href="https://example.com" variant="social" icon="github">
          {null}
        </Link>
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("handles social link with invalid href", () => {
      render(
        <Link href="" variant="social" icon="github">
          Test
        </Link>
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("href", "#");
    });

    it("handles social link with all optional props", () => {
      render(
        <Link
          href="https://github.com"
          variant="social"
          icon="github"
          page="about"
          hasLabel={true}
          label="GitHub"
          title="GitHub Profile"
          target="_blank"
          className="custom-class"
          debugId="custom-id"
          debugMode={true}
        >
          Test
        </Link>
      );

      const link = screen.getByTestId("custom-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("data-debug-mode", "true");
      expect(link).toHaveClass("custom-class");
      expect(link).toHaveAttribute("aria-label", "GitHub");
      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });
  });
});
