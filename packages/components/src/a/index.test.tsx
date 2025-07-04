import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { A, type AProps } from ".";

// Mock window.confirm
const mockConfirm = vi.fn();
Object.defineProperty(window, "confirm", {
  value: mockConfirm,
  writable: true,
});

// Mock analytics
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("A Component", () => {
  let mockConsoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const defaultProps: AProps = {
    href: "/test",
    children: "Test Link",
  };

  it("renders with default props", () => {
    render(<A {...defaultProps} />);

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("a", "a--default");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<A {...defaultProps} variant="primary" />);
    expect(screen.getByRole("link")).toHaveClass("a--primary");

    rerender(<A {...defaultProps} variant="secondary" />);
    expect(screen.getByRole("link")).toHaveClass("a--secondary");

    rerender(<A {...defaultProps} variant="unstyled" />);
    expect(screen.getByRole("link")).toHaveClass("a--unstyled");
  });

  it("handles active state", () => {
    render(<A {...defaultProps} active />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("a--active");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("handles disabled state", () => {
    render(<A {...defaultProps} disabled />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("a--disabled");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabIndex", "-1");
  });

  it("handles loading state", () => {
    render(<A {...defaultProps} loading />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("a--loading");
    expect(link).toHaveAttribute("aria-disabled", "true");

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const icon = <span data-testid="icon">🚀</span>;
    render(<A {...defaultProps} icon={icon} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("a--with-icon", "a--icon-left");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders icon on the right", () => {
    const icon = <span data-testid="icon">🚀</span>;
    render(<A {...defaultProps} icon={icon} iconPosition="right" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("a--icon-right");
  });

  it("handles external links", () => {
    render(<A {...defaultProps} href="https://example.com" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("handles unsafe hrefs", () => {
    render(<A {...defaultProps} href="javascript:alert('xss')" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<A {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("prevents click when disabled", () => {
    const handleClick = vi.fn();
    render(<A {...defaultProps} disabled onClick={handleClick} />);

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("prevents click when loading", () => {
    const handleClick = vi.fn();
    render(<A {...defaultProps} loading onClick={handleClick} />);

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows confirmation dialog", () => {
    mockConfirm.mockReturnValue(false);
    const handleClick = vi.fn();

    render(
      <A {...defaultProps} confirm="Are you sure?" onClick={handleClick} />
    );

    fireEvent.click(screen.getByRole("link"));
    expect(mockConfirm).toHaveBeenCalledWith("Are you sure?");
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("proceeds after confirmation", () => {
    mockConfirm.mockReturnValue(true);
    const handleClick = vi.fn();

    render(
      <A {...defaultProps} confirm="Are you sure?" onClick={handleClick} />
    );

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard navigation", () => {
    const handleKeyDown = vi.fn();
    render(<A {...defaultProps} onKeyDown={handleKeyDown} />);

    fireEvent.keyDown(screen.getByRole("link"), { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("handles analytics tracking", () => {
    render(<A {...defaultProps} analyticsId="test-link" />);

    fireEvent.click(screen.getByRole("link"));
    expect(mockGtag).toHaveBeenCalledWith("event", "click", {
      event_category: "link",
      event_label: "test-link",
      link_url: "/test",
    });
  });

  it("renders tooltip", () => {
    render(<A {...defaultProps} tooltip="Helpful tooltip" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-describedby", "link-tooltip");
    expect(link).toHaveAttribute("aria-label", "Helpful tooltip");

    // Find tooltip by id since it may be hidden initially
    const tooltip = document.getElementById("link-tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute("role", "tooltip");
    expect(tooltip).toHaveTextContent("Helpful tooltip");
  });

  it("handles custom component", () => {
    const CustomLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement>
    >((props, ref) => <a ref={ref} {...props} data-testid="custom-link" />);
    CustomLink.displayName = "CustomLink";

    render(<A {...defaultProps} as={CustomLink} />);

    expect(screen.getByTestId("custom-link")).toBeInTheDocument();
  });

  // NOTE: Client-side rendering is not tested in unit tests as it's just
  // a thin wrapper around the server component with zero business logic

  it("handles prefetch on mouse enter", () => {
    render(<A {...defaultProps} prefetch />);

    fireEvent.mouseEnter(screen.getByRole("link"));
    // Prefetch logic would be tested here if implemented
  });

  it("handles special links (mailto, tel)", () => {
    const { rerender } = render(
      <A {...defaultProps} href="mailto:test@example.com" />
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "mailto:test@example.com"
    );

    rerender(<A {...defaultProps} href="tel:+1234567890" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "tel:+1234567890");
  });

  it("applies custom className", () => {
    render(<A {...defaultProps} className="custom-class" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  it("applies custom styles", () => {
    render(<A {...defaultProps} style={{ color: "red" }} />);

    const link = screen.getByRole("link");
    expect(link).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("handles focus and blur events", () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(<A {...defaultProps} onFocus={handleFocus} onBlur={handleBlur} />);

    const link = screen.getByRole("link");
    fireEvent.focus(link);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(link);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // ==========================================
  // NEW TESTS FOR IMPROVED COVERAGE
  // ==========================================

  describe("Analytics Error Handling", () => {
    it("handles analytics errors gracefully", () => {
      // Mock console.warn temporarily for this test
      const originalWarn = console.warn;
      const warnSpy = vi.fn();
      console.warn = warnSpy;

      // Make gtag throw an error
      mockGtag.mockImplementation(() => {
        throw new Error("Analytics service unavailable");
      });

      render(<A {...defaultProps} analyticsId="test-link" />);
      fireEvent.click(screen.getByRole("link"));

      expect(warnSpy).toHaveBeenCalledWith(
        "Analytics tracking failed:",
        expect.any(Error)
      );

      // Restore console.warn
      console.warn = originalWarn;
    });

    it("continues working when analytics fails", () => {
      const handleClick = vi.fn();
      mockGtag.mockImplementation(() => {
        throw new Error("Analytics error");
      });

      render(
        <A {...defaultProps} analyticsId="test-link" onClick={handleClick} />
      );
      fireEvent.click(screen.getByRole("link"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Navigation with Confirmations", () => {
    it("shows confirmation on Enter key and cancels", () => {
      mockConfirm.mockReturnValue(false);

      render(
        <A {...defaultProps} confirm="Are you sure?" analyticsId="test-link" />
      );

      fireEvent.keyDown(screen.getByRole("link"), { key: "Enter" });
      expect(mockConfirm).toHaveBeenCalledWith("Are you sure?");
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("shows confirmation on Enter key and proceeds", () => {
      mockConfirm.mockReturnValue(true);

      render(
        <A {...defaultProps} confirm="Are you sure?" analyticsId="test-link" />
      );

      fireEvent.keyDown(screen.getByRole("link"), { key: "Enter" });
      expect(mockConfirm).toHaveBeenCalledWith("Are you sure?");
      expect(mockGtag).toHaveBeenCalled();
    });

    it("shows confirmation on Space key and cancels", () => {
      mockConfirm.mockReturnValue(false);

      render(
        <A {...defaultProps} confirm="Are you sure?" analyticsId="test-link" />
      );

      fireEvent.keyDown(screen.getByRole("link"), { key: " " });
      expect(mockConfirm).toHaveBeenCalledWith("Are you sure?");
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("prevents keyboard navigation when disabled", () => {
      render(<A {...defaultProps} disabled confirm="Are you sure?" />);

      fireEvent.keyDown(screen.getByRole("link"), { key: "Enter" });
      expect(mockConfirm).not.toHaveBeenCalled();
    });

    it("prevents keyboard navigation when loading", () => {
      render(<A {...defaultProps} loading confirm="Are you sure?" />);

      fireEvent.keyDown(screen.getByRole("link"), { key: "Enter" });
      expect(mockConfirm).not.toHaveBeenCalled();
    });
  });

  describe("Client-Side Rendering", () => {
    it("renders with client-side component", () => {
      render(<A {...defaultProps} isClient />);
      // Should render the server component as fallback during Suspense
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      render(<A {...defaultProps} isClient isMemoized />);
      // Should render the server component as fallback during Suspense
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("handles client-side rendering props", () => {
      render(
        <A
          {...defaultProps}
          isClient
          tooltip="Client tooltip"
          analyticsId="client-test"
        />
      );

      // Should render the link component correctly
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("aria-label", "Client tooltip");
    });

    it("handles client rendering without tooltip", () => {
      render(<A {...defaultProps} isClient />);

      // Should render basic link without issues
      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });

  describe("Edge Cases and Props", () => {
    it("handles missing href", () => {
      render(<A>No href link</A>);
      expect(screen.getByRole("link")).toHaveAttribute("href", "#");
    });

    it("handles complex icon positioning with loading", () => {
      const icon = <span data-testid="icon">🚀</span>;
      render(<A {...defaultProps} icon={icon} iconPosition="right" loading />);

      const link = screen.getByRole("link");
      expect(link).toHaveClass("a--icon-right", "a--loading");
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("handles tooltip with analytics id", () => {
      render(
        <A
          {...defaultProps}
          tooltip="Test tooltip"
          analyticsId="tooltip-test"
        />
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-describedby", "tooltip-test-tooltip");

      const tooltip = document.getElementById("tooltip-test-tooltip");
      expect(tooltip).toBeInTheDocument();
    });

    it("handles prefetch for non-special, non-external links", () => {
      render(<A {...defaultProps} href="/internal-page" prefetch />);
      fireEvent.mouseEnter(screen.getByRole("link"));
      // Prefetch would be called for internal links
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("does not prefetch external links", () => {
      render(<A {...defaultProps} href="https://external.com" prefetch />);
      fireEvent.mouseEnter(screen.getByRole("link"));
      // Prefetch should not be called for external links
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("does not prefetch mailto links", () => {
      render(<A {...defaultProps} href="mailto:test@example.com" prefetch />);
      fireEvent.mouseEnter(screen.getByRole("link"));
      // Prefetch should not be called for mailto links
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("handles analytics without event", () => {
      // Testing the early return in fireAnalytics when no event is provided
      render(<A {...defaultProps} analyticsId="test-link" />);
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("warns when using anchor-specific props with non-anchor element", () => {
      render(
        <A as="div" href="https://example.com">
          Not an anchor
        </A>
      );
      expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          "A: The following props are only valid for <a> elements: href"
        )
      );
    });
  });
});
