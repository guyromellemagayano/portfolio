/**
 * @file Link.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Link component.
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

describe("Link", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Link href="/test">
          <span>Test Link</span>
        </Link>
      );

      const link = screen.getByText("Test Link");
      expect(link).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Link href="/test" className="custom-class">
          Test Link
        </Link>
      );

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Link href="/test" id="custom-id" role="button">
          Test Link
        </Link>
      );

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("id", "custom-id");
      expect(link).toHaveAttribute("role", "button");
    });
  });

  // ============================================================================
  // LINK FUNCTIONALITY TESTS
  // ============================================================================

  describe("Link Functionality", () => {
    it("renders with valid href", () => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("handles external links correctly", () => {
      render(<Link href="https://example.com">External Link</Link>);

      const link = screen.getByText("External Link").closest("a");
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("handles internal links correctly", () => {
      render(<Link href="/internal">Internal Link</Link>);

      const link = screen.getByText("Internal Link").closest("a");
      expect(link).toHaveAttribute("href", "/internal");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("applies custom target when provided", () => {
      render(
        <Link href="/test" target="_self">
          Test Link
        </Link>
      );

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("applies title and aria-label attributes when label is provided", () => {
      render(
        <Link href="/test" label="Test Title">
          Test Link
        </Link>
      );

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("title", "Test Title");
      expect(link).toHaveAttribute("aria-label", "Test Title");
    });

    it("handles invalid href gracefully", () => {
      render(<Link href="">Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("href", "#");
    });

    it("handles null href gracefully", () => {
      render(<Link href={null as any}>Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("href", "#");
    });
  });

  // ============================================================================
  // CONTENT VALIDATION TESTS
  // ============================================================================

  describe("Content Validation", () => {
    it("renders when href is invalid but children exist", () => {
      render(<Link href="">Test Link</Link>);
      expect(screen.getByText("Test Link")).toBeInTheDocument();
    });

    it("renders when children is null", () => {
      const { container } = render(<Link href="/test">{null}</Link>);
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
    });

    it("renders when children is undefined", () => {
      const { container } = render(<Link href="/test">{undefined}</Link>);
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
    });

    it("renders when children is empty string", () => {
      const { container } = render(<Link href="/test">{""}</Link>);
      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
    });
  });

  // ============================================================================
  // COMPONENT STRUCTURE TESTS
  // ============================================================================

  describe("Component Structure", () => {
    it("renders as Next.js Link component", () => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Link href="/test" className="custom-class">
          Test Link
        </Link>
      );

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveClass("custom-class");
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Link href="/test">
          <span>Complex</span> <strong>Content</strong>
        </Link>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("handles special characters in href", () => {
      render(<Link href="/test?param=value&other=123">Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("href", "/test?param=value&other=123");
    });

    it("handles empty href gracefully", () => {
      render(<Link href="">Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("href", "#");
    });

    it("handles undefined href gracefully", () => {
      render(<Link href={undefined as any}>Test Link</Link>);

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("href", "#");
    });
  });

  // ============================================================================
  // COMPONENT INTERFACE TESTS
  // ============================================================================

  describe("Component Interface", () => {
    it("accepts all Link HTML attributes", () => {
      render(
        <Link href="/test" data-custom="test" label="Custom Link" role="button">
          Test Link
        </Link>
      );

      const link = screen.getByText("Test Link").closest("a");
      expect(link).toHaveAttribute("data-custom", "test");
      expect(link).toHaveAttribute("aria-label", "Custom Link");
      expect(link).toHaveAttribute("role", "button");
    });
  });

  // ============================================================================
  // LINK.SOCIAL COMPOUND COMPONENT TESTS
  // ============================================================================

  describe("Link.Social", () => {
    describe("Basic Rendering", () => {
      it("renders social link with icon", () => {
        render(
          <Link.Social href="https://example.com" icon="github">
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        const icon = screen.getByTestId("icon-github");
        expect(link).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
      });

      it("renders social link without icon when icon prop is not provided", () => {
        render(<Link.Social href="https://example.com">Test</Link.Social>);
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(screen.queryByTestId(/icon-/)).not.toBeInTheDocument();
      });

      it("applies custom className to social link", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            className="custom-class"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveClass("custom-class");
      });

      it("passes through HTML attributes to social link", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            id="custom-id"
            role="button"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("button");
        expect(link).toHaveAttribute("id", "custom-id");
        expect(link).toHaveAttribute("role", "button");
      });
    });

    describe("Link Properties", () => {
      it("uses provided href", () => {
        render(
          <Link.Social href="https://github.com" icon="github">
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "https://github.com");
      });

      it("uses provided title", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            title="Custom Title"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("title", "Custom Title");
        expect(link).toHaveAttribute("aria-label", "Custom Title");
      });

      it("uses default target for external links", () => {
        render(
          <Link.Social href="https://example.com" icon="github">
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });

      it("uses custom target when provided", () => {
        render(
          <Link.Social href="https://example.com" icon="github" target="_self">
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("target", "_self");
      });

      it("handles internal links without target", () => {
        render(
          <Link.Social href="/about" icon="github">
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/about");
        expect(link).not.toHaveAttribute("target");
      });

      it("handles invalid href gracefully", () => {
        const { container } = render(
          <Link.Social href="" icon="github">
            Test
          </Link.Social>
        );
        const link = container.querySelector("a");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "#");
      });
    });

    describe("Icon Rendering", () => {
      it("renders the provided icon by name", () => {
        render(
          <Link.Social href="https://example.com" icon="github">
            Test
          </Link.Social>
        );
        const icon = screen.getByTestId("icon-github");
        expect(icon).toBeInTheDocument();
      });

      it("renders different icon names", () => {
        render(
          <Link.Social href="https://example.com" icon="instagram">
            Test
          </Link.Social>
        );
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toBeInTheDocument();
      });

      it("passes page prop to icon", () => {
        render(
          <Link.Social href="https://example.com" icon="mail" page="about">
            Test
          </Link.Social>
        );
        const icon = screen.getByTestId("icon-mail");
        expect(icon).toHaveAttribute("data-icon-page", "about");
      });

      it("does not render icon when icon prop is not provided", () => {
        render(<Link.Social href="https://example.com">Test</Link.Social>);
        expect(screen.queryByTestId(/icon-/)).not.toBeInTheDocument();
      });
    });

    describe("Label Rendering", () => {
      it("renders label when hasLabel is true and label is provided", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            hasLabel={true}
            label="GitHub Profile"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveTextContent("GitHub Profile");
        expect(screen.getByText("GitHub Profile")).toBeInTheDocument();
      });

      it("does not render label when hasLabel is false", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            hasLabel={false}
            label="GitHub Profile"
          >
            Test
          </Link.Social>
        );
        expect(screen.queryByText("GitHub Profile")).not.toBeInTheDocument();
      });

      it("does not render label when label is not provided", () => {
        render(
          <Link.Social href="https://example.com" icon="github" hasLabel={true}>
            Test
          </Link.Social>
        );
        expect(screen.queryByText(/Profile/)).not.toBeInTheDocument();
      });

      it("uses label for aria-label when label is provided", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            hasLabel={true}
            label="GitHub Profile"
            title="Custom Title"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-label", "GitHub Profile");
      });

      it("uses title for aria-label when label is not provided", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            hasLabel={false}
            title="Custom Title"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-label", "Custom Title");
      });
    });

    describe("Component Structure", () => {
      it("renders correct HTML structure with icon", () => {
        render(
          <Link.Social href="https://example.com" icon="github">
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        const icon = screen.getByTestId("icon-github");

        expect(link).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(link).toContainElement(icon);
      });

      it("renders with proper semantic structure", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            title="GitHub Profile"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-label", "GitHub Profile");
      });
    });

    describe("Accessibility", () => {
      it("renders with proper accessibility attributes", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            title="Social Media Link"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-label", "Social Media Link");
        expect(link).toHaveAttribute("title", "Social Media Link");
      });

      it("passes through aria attributes", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            aria-describedby="description"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("aria-describedby", "description");
      });
    });

    describe("Edge Cases", () => {
      it("handles complex prop combinations", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            title="Complex Link"
            target="_blank"
            className="complex-class"
            hasLabel={true}
            label="GitHub"
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass("complex-class");
        expect(link).toHaveAttribute("aria-label", "GitHub");
      });

      it("handles undefined props gracefully", () => {
        render(
          <Link.Social
            href="https://example.com"
            icon="github"
            title={undefined}
            target={undefined}
            className={undefined}
          >
            Test
          </Link.Social>
        );
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
      });

      it("handles invalid href gracefully", () => {
        const { container } = render(
          <Link.Social href={null as any} icon="github">
            Test
          </Link.Social>
        );
        const link = container.querySelector("a");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "#");
      });
    });
  });
});
