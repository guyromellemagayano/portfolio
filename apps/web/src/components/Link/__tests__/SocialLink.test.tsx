import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SocialLink } from "../_internal";

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
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || (href?.startsWith("http") ? "_blank" : undefined),
    rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
  })),
  isValidLink: vi.fn((href) => href != null && href !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

// Mock icon component
const MockIcon = function ({ className }: { className?: string }) {
  return (
    <svg className={className} data-testid="mock-icon">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
};

describe("SocialLink", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      const icon = screen.getByTestId("mock-icon");

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("renders with custom className", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          className="custom-class"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveClass("custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided debugId when available", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          debugId="custom-id"
        />
      );
      const link = screen.getByTestId("custom-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "data-social-link-root-id",
        "custom-id-social-link-root"
      );
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          debugMode={true}
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          debugMode={false}
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Link Properties", () => {
    it("uses provided href", () => {
      render(<SocialLink href="https://github.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("href", "https://github.com");
    });

    it("uses provided title", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          title="Custom Title"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("title", "Custom Title");
      expect(link).toHaveAttribute("aria-label", "Custom Title");
    });

    it("uses default target for external links", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("uses custom target when provided", () => {
      render(
        <SocialLink href="https://example.com" icon={MockIcon} target="_self" />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("handles internal links without target", () => {
      render(<SocialLink href="/about" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("href", "/about");
      expect(link).not.toHaveAttribute("target");
    });
  });

  describe("Icon Rendering", () => {
    it("renders the provided icon", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const icon = screen.getByTestId("mock-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it("passes className to icon", () => {
      const CustomIcon = function ({ className }: { className?: string }) {
        return (
          <div className={className} data-testid="custom-icon">
            Custom Icon
          </div>
        );
      };

      render(<SocialLink href="https://example.com" icon={CustomIcon} />);
      const icon = screen.getByTestId("custom-icon");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("renders when href is invalid but component still renders", () => {
      render(<SocialLink href="" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });

    it("renders when href is null", () => {
      render(<SocialLink href={null as any} icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });

    it("renders when href is undefined", () => {
      render(<SocialLink href={undefined as any} icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });

    it("renders when href is a placeholder", () => {
      render(<SocialLink href="#" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });

    it("renders when href is valid", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <SocialLink href="https://example.com" icon={MockIcon} ref={ref} />
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <SocialLink href="https://example.com" icon={MockIcon} ref={ref} />
      );

      const link = screen.getByTestId("test-id-social-link-root");
      expect(ref.current).toBe(link);
    });
  });

  describe("Component Structure", () => {
    it("renders correct HTML structure", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      const icon = screen.getByTestId("mock-icon");

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(link).toContainElement(icon);
    });

    it("renders with proper semantic structure", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          title="GitHub Profile"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("aria-label", "GitHub Profile");
    });
  });

  describe("Accessibility", () => {
    it("renders with proper accessibility attributes", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          title="Social Media Link"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("aria-label", "Social Media Link");
      expect(link).toHaveAttribute("title", "Social Media Link");
    });

    it("passes through aria attributes", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          aria-describedby="description"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("CSS Integration", () => {
    it("applies Tailwind classes correctly", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      const icon = screen.getByTestId("mock-icon");

      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it("combines custom className with Tailwind classes", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          className="custom-social-link"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveClass("custom-social-link");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", () => {
      const { rerender } = render(
        <SocialLink href="https://example.com" icon={MockIcon} />
      );
      const initialLink = screen.getByTestId("test-id-social-link-root");

      rerender(<SocialLink href="https://example.com" icon={MockIcon} />);
      const updatedLink = screen.getByTestId("test-id-social-link-root");

      expect(initialLink).toBe(updatedLink);
    });

    it("handles prop changes efficiently", () => {
      const { rerender } = render(
        <SocialLink href="https://example.com" icon={MockIcon} />
      );

      rerender(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          className="new-class"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveClass("new-class");
    });
  });

  describe("Memoization", () => {
    it("renders base component when isMemoized is false", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          isMemoized={false}
        />
      );
      expect(
        screen.getByTestId("test-id-social-link-root")
      ).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          isMemoized={true}
        />
      );
      expect(
        screen.getByTestId("test-id-social-link-root")
      ).toBeInTheDocument();
    });

    it("defaults to base component when isMemoized is undefined", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      expect(
        screen.getByTestId("test-id-social-link-root")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex prop combinations", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          title="Complex Link"
          target="_blank"
          className="complex-class"
          debugId="complex-id"
          debugMode={true}
          isMemoized={true}
        />
      );
      const link = screen.getByTestId("complex-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("data-debug-mode", "true");
      expect(link).toHaveClass("complex-class");
    });

    it("handles undefined props gracefully", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          title={undefined}
          target={undefined}
          className={undefined}
          debugId={undefined}
          debugMode={undefined}
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute("data-debug-mode");
    });
  });
});
