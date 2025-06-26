import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Link, type LinkProps, MemoizedLink } from ".";

// Mock analytics
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

// Mock console methods for testing warnings
const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

describe("Link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  const defaultProps: LinkProps = {
    href: "https://example.com",
    children: "Test Link",
  };

  describe("Basic Functionality", () => {
    it("renders with default props", () => {
      render(<Link {...defaultProps} />);

      const link = screen.getByRole("link", { name: "Test Link" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("renders children correctly", () => {
      render(
        <Link href="/test">
          <span>Complex children</span>
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveTextContent("Complex children");
    });

    it("applies custom className", () => {
      render(<Link {...defaultProps} className="custom-class" />);

      const link = screen.getByRole("link");
      expect(link).toHaveClass("custom-class");
    });
  });

  describe("External Link Detection", () => {
    it("auto-detects external http links", () => {
      render(<Link href="http://example.com">External Link</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveClass("link--external");
    });

    it("auto-detects external https links", () => {
      render(<Link href="https://example.com">External Link</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("auto-detects protocol-relative links", () => {
      render(<Link href="//example.com">External Link</Link>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("treats relative links as internal", () => {
      render(<Link href="/internal">Internal Link</Link>);

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
      expect(link).not.toHaveClass("link--external");
    });

    it("respects explicit external prop", () => {
      render(
        <Link href="/internal" external>
          Force External
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveClass("link--external");
    });
  });

  describe("Security Features", () => {
    it("adds security attributes for new tab links", () => {
      render(
        <Link href="/test" newTab>
          New Tab Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener");
    });

    it("combines existing rel with security attributes", () => {
      render(
        <Link href="https://example.com" rel="author">
          External Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "author noopener noreferrer");
    });

    it("prevents javascript: hrefs", () => {
      render(<Link href="javascript:alert('xss')">Unsafe Link</Link>);

      const span = screen.getByText("Unsafe Link");
      expect(span.tagName).toBe("SPAN");
      expect(span).toHaveClass("link--invalid");
      expect(consoleSpy).toHaveBeenCalledWith(
        "Link: Potentially unsafe href detected:",
        "javascript:alert('xss')"
      );
    });

    it("prevents JavaScript: hrefs (case insensitive)", () => {
      render(<Link href="JavaScript:alert('xss')">Unsafe Link</Link>);

      const span = screen.getByText("Unsafe Link");
      expect(span.tagName).toBe("SPAN");
    });
  });

  describe("Accessibility", () => {
    it("supports custom aria-label", () => {
      render(<Link {...defaultProps} aria-label="Custom label" />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Custom label");
    });

    it("handles disabled state", () => {
      render(<Link {...defaultProps} disabled />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("tabIndex", "-1");
      expect(link).toHaveClass("link--disabled");
    });

    it("shows external link indicator", () => {
      render(<Link href="https://example.com">External Link</Link>);

      const indicator = screen.getByText("↗");
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveAttribute("aria-hidden", "true");
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Link {...defaultProps} />);

      const link = screen.getByRole("link");

      await user.tab();
      expect(link).toHaveFocus();
    });
  });

  describe("Variants and Styling", () => {
    it("applies variant classes", () => {
      render(<Link {...defaultProps} variant="button" />);

      const link = screen.getByRole("link");
      expect(link).toHaveClass("link--button");
    });

    it("applies size classes", () => {
      render(<Link {...defaultProps} size="large" />);

      const link = screen.getByRole("link");
      expect(link).toHaveClass("link--large");
    });

    it("applies all CSS classes correctly", () => {
      render(
        <Link
          href="https://example.com"
          variant="secondary"
          size="small"
          className="custom"
        >
          Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass(
        "link",
        "link--secondary",
        "link--small",
        "link--external",
        "custom"
      );
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Link {...defaultProps} onClick={onClick} />);

      const link = screen.getByRole("link");
      await user.click(link);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onLinkClick handler", async () => {
      const user = userEvent.setup();
      const onLinkClick = vi.fn();
      render(<Link {...defaultProps} onLinkClick={onLinkClick} />);

      const link = screen.getByRole("link");
      await user.click(link);

      expect(onLinkClick).toHaveBeenCalledWith(
        "https://example.com",
        expect.any(Object)
      );
    });

    it("prevents click when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Link {...defaultProps} disabled onClick={onClick} />);

      const link = screen.getByRole("link");
      await user.click(link);

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("Analytics", () => {
    it("tracks clicks with analytics ID", async () => {
      const user = userEvent.setup();
      render(<Link {...defaultProps} trackingId="test-link" />);

      const link = screen.getByRole("link");
      await user.click(link);

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "link",
        event_label: "test-link",
        value: "https://example.com",
        external: true,
      });
    });

    it("handles analytics errors gracefully", async () => {
      const user = userEvent.setup();
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      mockGtag.mockImplementation(() => {
        throw new Error("Analytics error");
      });

      render(<Link {...defaultProps} trackingId="test-link" />);

      const link = screen.getByRole("link");
      await user.click(link);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Link analytics tracking failed:",
        expect.any(Error)
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("adds tracking data attributes", () => {
      render(<Link {...defaultProps} trackingId="test-link" />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-tracking-id", "test-link");
      expect(link).toHaveAttribute("data-external", "true");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(<Link {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe("A");
    });
  });

  describe("Memoization", () => {
    it("exports memoized version", () => {
      expect(MemoizedLink).toBeDefined();

      render(<MemoizedLink {...defaultProps} />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("memoized version works correctly", () => {
      render(<MemoizedLink {...defaultProps} />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");

      // Verify it's actually memoized by checking the component type
      expect(MemoizedLink.$$typeof).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty href", () => {
      render(<Link href="">Empty Link</Link>);

      const span = screen.getByText("Empty Link");
      expect(span.tagName).toBe("SPAN");
      expect(span).toHaveClass("link--invalid");
    });

    it("handles target override", () => {
      render(
        <Link href="https://example.com" target="_self">
          Override Target
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("preserves custom attributes", () => {
      render(
        <Link
          {...defaultProps}
          data-custom="value"
          id="custom-id"
          title="Custom title"
        >
          Link
        </Link>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-custom", "value");
      expect(link).toHaveAttribute("id", "custom-id");
      expect(link).toHaveAttribute("title", "Custom title");
    });
  });
});
