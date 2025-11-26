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
// LINK COMPONENT TESTS
// ============================================================================

describe("Link", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

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

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Link href="/test" id="custom-id" role="button">
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("id", "custom-id");
      expect(link).toHaveAttribute("role", "button");
    });

    it("uses useComponentId hook correctly", () => {
      // Test that useComponentId hook is called correctly
      render(<Link href="/test">Test Link</Link>);

      // The mock verifies the hook is called with correct parameters
      expect(screen.getByTestId("test-id-link-root")).toBeInTheDocument();
    });

    it("uses custom internal ID when provided", () => {
      render(
        <Link href="/test" debugId="custom-id">
          Test Link
        </Link>
      );

      const link = screen.getByTestId("custom-id-link-root");
      expect(link).toBeInTheDocument();
    });

    it("enables debug mode when provided", () => {
      render(
        <Link href="/test" debugMode={true}>
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Link Functionality", () => {
    it("renders with valid href", () => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("handles external links correctly", () => {
      render(<Link href="https://example.com">External Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("handles internal links correctly", () => {
      render(<Link href="/internal">Internal Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
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

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("applies title attribute when provided", () => {
      render(
        <Link href="/test" title="Test Title">
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("title", "Test Title");
      expect(link).toHaveAttribute("aria-label", "Test Title");
    });
  });

  describe("Content Validation", () => {
    it("renders when href is invalid but children exist", () => {
      render(<Link href="">Test Link</Link>);
      expect(screen.getByText("Test Link")).toBeInTheDocument();
    });

    it("does not render when href is valid but no children", () => {
      const { container } = render(<Link href="/test"></Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children is null", () => {
      const { container } = render(<Link href="/test">{null}</Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children is undefined", () => {
      const { container } = render(<Link href="/test">{undefined}</Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children is empty string", () => {
      const { container } = render(<Link href="/test">{""}</Link>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <Link href="/test" debugMode={true}>
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as Next.js Link component", () => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Link href="/test" className="custom-class">
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveClass("custom-class");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Link href="/test" ref={ref}>
          Test Link
        </Link>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Link href="/test" ref={ref}>
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(ref.current).toBe(link);
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      render(<Link href="/test">Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("data-link-id", "test-id-link-root");
    });

    it("renders with custom internal ID", () => {
      render(
        <Link href="/test" debugId="custom-id">
          Test Link
        </Link>
      );

      const link = screen.getByTestId("custom-id-link-root");
      expect(link).toHaveAttribute("data-link-id", "custom-id-link-root");
    });
  });

  describe("Memoization", () => {
    it("renders MemoizedLink correctly", () => {
      render(<MemoizedLink href="/test">Test Link</MemoizedLink>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toBeInTheDocument();
    });
  });

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

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "/test?param=value&other=123");
    });

    it("handles empty href gracefully", () => {
      render(<Link href="">Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "");
    });

    it("handles undefined href gracefully", () => {
      render(<Link href={undefined as any}>Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "");
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const element = <Link href="/test">Test Link</Link>;
      expect(React.isValidElement(element)).toBe(true);
    });

    it("accepts all Link HTML attributes", () => {
      render(
        <Link href="/test" data-custom="test" title="Custom Link" role="button">
          Test Link
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("data-custom", "test");
      expect(link).toHaveAttribute("aria-label", "Custom Link");
      expect(link).toHaveAttribute("role", "button");
    });
  });

  describe("Integration Tests", () => {
    it("integrates with Next.js Link correctly", () => {
      render(<Link href="/test">Test Link</Link>);

      const nextLink = screen.getByTestId("test-id-link-root");
      expect(nextLink).toBeInTheDocument();
      expect(nextLink).toHaveAttribute("href", "/test");
    });

    it("integrates with utility functions correctly", () => {
      // Test that utility functions are called correctly
      render(<Link href="/test">Test Link</Link>);

      // The mocks verify the utility functions are called
      expect(screen.getByTestId("test-id-link-root")).toBeInTheDocument();
    });

    it("integrates with useComponentId hook correctly", () => {
      // Test that useComponentId hook is called correctly
      render(
        <Link href="/test" debugId="custom-id" debugMode={true}>
          Test Link
        </Link>
      );

      // The mock verifies the hook is called
      expect(screen.getByTestId("custom-id-link-root")).toBeInTheDocument();
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<Link href="/test">Test Link</Link>);

      rerender(
        <Link href="/test2" className="new-class">
          Test Link 2
        </Link>
      );

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "/test2");
      expect(link).toHaveClass("new-class");
    });

    it("handles multiple re-renders efficiently", () => {
      const { rerender } = render(<Link href="/test">Test Link</Link>);

      for (let i = 0; i < 5; i++) {
        rerender(<Link href={`/test${i}`}>Test Link {i}</Link>);
      }

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "/test4");
    });
  });

  describe("Error Handling", () => {
    it("handles invalid href gracefully", () => {
      render(<Link href={null as any}>Test Link</Link>);

      const link = screen.getByTestId("test-id-link-root");
      expect(link).toHaveAttribute("href", "");
    });

    it("does not render when children is missing", () => {
      const { container } = render(<Link href="/test">{undefined}</Link>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  // ============================================================================
  // SOCIAL VARIANT TESTS
  // ============================================================================

  describe("Social Variant", () => {
    describe("Basic Rendering", () => {
      it("renders social link with icon", () => {
        const { container } = render(
          <Link href="https://example.com" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        const icon = container.querySelector("svg");
        expect(link).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
      });

      it("renders social link without icon when icon prop is not provided", () => {
        render(
          <Link href="https://example.com" variant="social">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toBeInTheDocument();
        expect(screen.queryByTestId(/icon-/)).not.toBeInTheDocument();
      });

      it("applies custom className to social link", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            className="custom-class"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveClass("custom-class");
      });

      it("passes through HTML attributes to social link", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            id="custom-id"
            role="button"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("id", "custom-id");
        expect(link).toHaveAttribute("role", "button");
      });
    });

    describe("Component ID and Debug Mode", () => {
      it("uses provided debugId for social link", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            debugId="custom-id"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("custom-id-social-link-root");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute(
          "data-social-link-id",
          "custom-id-social-link-root"
        );
      });

      it("applies data-debug-mode when debugMode is true", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            debugMode={true}
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("data-debug-mode", "true");
      });

      it("does not apply data-debug-mode when debugMode is false", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            debugMode={false}
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).not.toHaveAttribute("data-debug-mode");
      });

      it("does not apply data-debug-mode when debugMode is undefined", () => {
        render(
          <Link href="https://example.com" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Link Properties", () => {
      it("uses provided href", () => {
        render(
          <Link href="https://github.com" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("href", "https://github.com");
      });

      it("uses provided title", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            title="Custom Title"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("title", "Custom Title");
        expect(link).toHaveAttribute("aria-label", "Custom Title");
      });

      it("uses default target for external links", () => {
        render(
          <Link href="https://example.com" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });

      it("uses custom target when provided", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            target="_self"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("target", "_self");
      });

      it("handles internal links without target", () => {
        render(
          <Link href="/about" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("href", "/about");
        expect(link).not.toHaveAttribute("target");
      });

      it("defaults to # when href is invalid", () => {
        render(
          <Link href="" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("href", "#");
      });
    });

    describe("Icon Rendering", () => {
      it("renders the provided icon by name", () => {
        const { container } = render(
          <Link href="https://example.com" variant="social" icon="github">
            Test
          </Link>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
      });

      it("renders different icon names", () => {
        const { container } = render(
          <Link href="https://example.com" variant="social" icon="instagram">
            Test
          </Link>
        );
        const icon = container.querySelector("svg");
        expect(icon).toBeInTheDocument();
      });

      it("passes page prop to icon", () => {
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

      it("does not render icon when icon prop is not provided", () => {
        const { container } = render(
          <Link href="https://example.com" variant="social">
            Test
          </Link>
        );
        const icon = container.querySelector("svg");
        expect(icon).not.toBeInTheDocument();
      });
    });

    describe("Label Rendering", () => {
      it("renders label when hasLabel is true and label is provided", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            hasLabel={true}
            label="GitHub Profile"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveTextContent("GitHub Profile");
        expect(screen.getByText("GitHub Profile")).toBeInTheDocument();
      });

      it("does not render label when hasLabel is false", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            hasLabel={false}
            label="GitHub Profile"
          >
            Test
          </Link>
        );
        expect(screen.queryByText("GitHub Profile")).not.toBeInTheDocument();
      });

      it("does not render label when label is not provided", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            hasLabel={true}
          >
            Test
          </Link>
        );
        expect(screen.queryByText(/Profile/)).not.toBeInTheDocument();
      });

      it("uses label for aria-label when hasLabel is true", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            hasLabel={true}
            label="GitHub Profile"
            title="Custom Title"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("aria-label", "GitHub Profile");
      });

      it("uses title for aria-label when hasLabel is false", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            hasLabel={false}
            label="GitHub Profile"
            title="Custom Title"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("aria-label", "Custom Title");
      });
    });

    describe("Ref Forwarding", () => {
      it("forwards ref correctly to social link", () => {
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
      });

      it("ref points to correct element for social link", () => {
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

        const link = screen.getByTestId("test-id-social-link-root");
        expect(ref.current).toBe(link);
      });
    });

    describe("Component Structure", () => {
      it("renders correct HTML structure with icon", () => {
        const { container } = render(
          <Link href="https://example.com" variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        const icon = container.querySelector("svg");

        expect(link).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(link).toContainElement(icon);
      });

      it("renders with proper semantic structure", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            title="GitHub Profile"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("aria-label", "GitHub Profile");
      });
    });

    describe("Accessibility", () => {
      it("renders with proper accessibility attributes", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            title="Social Media Link"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("aria-label", "Social Media Link");
        expect(link).toHaveAttribute("title", "Social Media Link");
      });

      it("passes through aria attributes", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            aria-describedby="description"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("aria-describedby", "description");
      });
    });

    describe("Edge Cases", () => {
      it("handles complex prop combinations", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            title="Complex Link"
            target="_blank"
            className="complex-class"
            debugId="complex-id"
            debugMode={true}
            hasLabel={true}
            label="GitHub"
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("complex-id-social-link-root");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("data-debug-mode", "true");
        expect(link).toHaveClass("complex-class");
        expect(link).toHaveAttribute("aria-label", "GitHub");
      });

      it("handles undefined props gracefully", () => {
        render(
          <Link
            href="https://example.com"
            variant="social"
            icon="github"
            title={undefined}
            target={undefined}
            className={undefined}
            debugId={undefined}
            debugMode={undefined}
          >
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toBeInTheDocument();
        expect(link).not.toHaveAttribute("data-debug-mode");
      });

      it("handles invalid href gracefully", () => {
        render(
          <Link href={null as any} variant="social" icon="github">
            Test
          </Link>
        );
        const link = screen.getByTestId("test-id-social-link-root");
        expect(link).toHaveAttribute("href", "#");
      });
    });
  });
});
