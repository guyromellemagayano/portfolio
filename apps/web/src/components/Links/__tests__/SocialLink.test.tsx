import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SocialLink } from "../SocialLink";

// Mock dependencies
vi.mock("@guyromellemagayano/components", () => ({
  CommonComponentProps: {},
}));

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || options._internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};

    // Always add data attributes - use fallback values if needed
    const actualId = id || "test-id";
    const actualSuffix = suffix || "component";

    attributes[`data-${actualSuffix}-id`] = `${actualId}-${actualSuffix}`;
    attributes["data-testid"] = `${actualId}-${actualSuffix}-root`;

    // Only include data-debug-mode when debugMode is strictly true
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }

    return {
      ...attributes,
      ...additionalProps,
    };
  }),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || (href?.startsWith("http") ? "_blank" : undefined),
    rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
  })),
  hasValidContent: vi.fn((content) => content != null && content !== ""),
  isValidLink: vi.fn((href) => href != null && href !== "" && href !== "#"),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockLink(props, ref) {
      const { href, children, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          data-testid="test-id-social-link-root"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

vi.mock("../styles/SocialLink.module.css", () => ({
  default: {
    socialLink: "_socialLink_a1b2c3",
    socialLinkIcon: "_socialLinkIcon_a1b2c3",
  },
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
      expect(link).toHaveClass("_socialLink_a1b2c3", "custom-class");
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("uses provided internalId when available", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          internalId="custom-id"
        />
      );
      const link = screen.getByTestId("custom-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "data-social-link-id",
        "custom-id-social-link"
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
      expect(icon).toHaveClass("_socialLinkIcon_a1b2c3");
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
      expect(icon).toHaveClass("_socialLinkIcon_a1b2c3");
    });
  });

  describe("Content Validation", () => {
    it("does not render when href is invalid", () => {
      const { container } = render(<SocialLink href="" icon={MockIcon} />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when href is null", () => {
      const { container } = render(
        <SocialLink href={null as any} icon={MockIcon} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when href is undefined", () => {
      const { container } = render(
        <SocialLink href={undefined as any} icon={MockIcon} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when href is a placeholder", () => {
      const { container } = render(<SocialLink href="#" icon={MockIcon} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders when href is valid", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
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

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(<SocialLink href="https://example.com" icon={MockIcon} />);
      const link = screen.getByTestId("test-id-social-link-root");
      const icon = screen.getByTestId("mock-icon");

      expect(link).toHaveClass("_socialLink_a1b2c3");
      expect(icon).toHaveClass("_socialLinkIcon_a1b2c3");
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <SocialLink
          href="https://example.com"
          icon={MockIcon}
          className="custom-social-link"
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toHaveClass("_socialLink_a1b2c3", "custom-social-link");
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
          internalId="complex-id"
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
          internalId={undefined}
          debugMode={undefined}
        />
      );
      const link = screen.getByTestId("test-id-social-link-root");
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute("data-debug-mode");
    });
  });
});
