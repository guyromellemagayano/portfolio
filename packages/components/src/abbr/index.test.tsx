import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Abbr, type AbbrProps } from ".";

// Mock analytics
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("Abbr Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: AbbrProps = {
    title: "HyperText Markup Language",
    children: "HTML",
  };

  it("renders with default props", () => {
    render(<Abbr {...defaultProps} />);

    const abbr = screen.getByText("HTML");
    expect(abbr).toBeInTheDocument();
    expect(abbr.tagName).toBe("ABBR");
    expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
    expect(abbr).toHaveClass("abbr");
  });

  it("renders without title when showTooltip is false", () => {
    render(<Abbr {...defaultProps} showTooltip={false} />);

    const abbr = screen.getByText("HTML");
    expect(abbr).not.toHaveAttribute("title");
  });

  it("handles custom tooltip override", () => {
    render(
      <Abbr {...defaultProps} tooltip="Custom tooltip for HTML">
        HTML
      </Abbr>
    );

    const abbr = screen.getByText("HTML");
    expect(abbr).toHaveAttribute("title", "Custom tooltip for HTML");
    expect(abbr).toHaveAttribute("aria-label", "Custom tooltip for HTML");
  });

  it("handles emphasized state", () => {
    render(<Abbr {...defaultProps} emphasized />);

    const abbr = screen.getByText("HTML");
    expect(abbr).toHaveClass("abbr--emphasized");
    expect(abbr).toHaveAttribute("data-emphasized", "true");
  });

  it("handles analytics tracking", () => {
    render(<Abbr {...defaultProps} analyticsId="html-abbr" />);

    const abbr = screen.getByText("HTML");
    fireEvent.click(abbr);

    expect(mockGtag).toHaveBeenCalledWith("event", "click", {
      event_category: "abbreviation",
      event_label: "html-abbr",
      abbreviation_text: "HTML",
      expanded_text: "HyperText Markup Language",
    });
  });

  it("handles custom analytics function", () => {
    const customAnalytics = vi.fn();
    render(<Abbr {...defaultProps} onAnalytics={customAnalytics} />);

    const abbr = screen.getByText("HTML");
    fireEvent.click(abbr);

    expect(customAnalytics).toHaveBeenCalledWith({
      event: "click",
      category: "abbreviation",
      label: "abbr-click",
      abbreviation: "HTML",
      expanded: "HyperText Markup Language",
    });
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Abbr {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByText("HTML"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles mouse events", () => {
    const handleMouseEnter = vi.fn();
    render(<Abbr {...defaultProps} onMouseEnter={handleMouseEnter} />);

    fireEvent.mouseEnter(screen.getByText("HTML"));
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });

  it("handles focus events", () => {
    const handleFocus = vi.fn();
    render(<Abbr {...defaultProps} onFocus={handleFocus} tabIndex={0} />);

    fireEvent.focus(screen.getByText("HTML"));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Abbr {...defaultProps} className="custom-abbr" />);

    const abbr = screen.getByText("HTML");
    expect(abbr).toHaveClass("abbr", "custom-abbr");
  });

  it("applies custom styles", () => {
    render(<Abbr {...defaultProps} style={{ color: "red" }} />);

    const abbr = screen.getByText("HTML");
    expect(abbr).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("handles custom component", () => {
    const CustomAbbr = React.forwardRef<
      HTMLElement,
      React.HTMLAttributes<HTMLElement>
    >((props, ref) => <span ref={ref} {...props} data-testid="custom-abbr" />);
    CustomAbbr.displayName = "CustomAbbr";

    render(<Abbr {...defaultProps} as={CustomAbbr} />);

    expect(screen.getByTestId("custom-abbr")).toBeInTheDocument();
  });

  // NOTE: Client-side rendering is not tested in unit tests as it's just
  // a thin wrapper around the server component with zero business logic

  it("handles missing title gracefully", () => {
    render(<Abbr>HTML</Abbr>);

    const abbr = screen.getByText("HTML");
    expect(abbr).toBeInTheDocument();
    expect(abbr).not.toHaveAttribute("title");
  });

  it("handles analytics errors gracefully in development", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;

    // Mock gtag to throw an error
    mockGtag.mockImplementation(() => {
      throw new Error("Analytics error");
    });

    // Set development environment
    process.env.NODE_ENV = "development";

    render(<Abbr {...defaultProps} analyticsId="test-abbr" />);

    fireEvent.click(screen.getByText("HTML"));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Analytics tracking failed:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("silently fails analytics errors in production", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;

    // Mock gtag to throw an error
    mockGtag.mockImplementation(() => {
      throw new Error("Analytics error");
    });

    // Set production environment
    process.env.NODE_ENV = "production";

    render(<Abbr {...defaultProps} analyticsId="test-abbr" />);

    fireEvent.click(screen.getByText("HTML"));
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("handles accessibility attributes", () => {
    render(
      <Abbr
        {...defaultProps}
        aria-label="Custom aria label"
        aria-describedby="description"
      />
    );

    const abbr = screen.getByText("HTML");
    expect(abbr).toHaveAttribute("aria-label", "HyperText Markup Language");
    expect(abbr).toHaveAttribute("aria-describedby", "description");
  });

  it("handles emphasized styling correctly", () => {
    const { rerender } = render(<Abbr {...defaultProps} />);

    let abbr = screen.getByText("HTML");
    expect(abbr).not.toHaveClass("abbr--emphasized");
    expect(abbr).not.toHaveAttribute("data-emphasized");

    rerender(<Abbr {...defaultProps} emphasized />);

    abbr = screen.getByText("HTML");
    expect(abbr).toHaveClass("abbr--emphasized");
    expect(abbr).toHaveAttribute("data-emphasized", "true");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Abbr {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("ABBR");
  });

  it("optimizes className building", () => {
    const { rerender } = render(<Abbr {...defaultProps} />);

    let abbr = screen.getByText("HTML");
    expect(abbr.className).toBe("abbr");

    rerender(<Abbr {...defaultProps} emphasized className="custom" />);
    abbr = screen.getByText("HTML");
    expect(abbr.className).toBe("abbr abbr--emphasized custom");
  });

  it("only creates click handler when analytics are needed", () => {
    const onClick = vi.fn();

    // Without analytics, should use original onClick
    const { rerender } = render(<Abbr {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByText("HTML"));
    expect(onClick).toHaveBeenCalledTimes(1);

    // With analytics, should wrap onClick
    vi.clearAllMocks();
    rerender(<Abbr {...defaultProps} onClick={onClick} analyticsId="test" />);
    fireEvent.click(screen.getByText("HTML"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalled();
  });

  // ==========================================
  // NEW TESTS FOR IMPROVED COVERAGE
  // ==========================================

  describe("Client-Side Rendering", () => {
    it("renders with client-side component", () => {
      render(<Abbr {...defaultProps} isClient />);
      // Should render the server component as fallback during Suspense
      expect(screen.getByText("HTML")).toBeInTheDocument();
    });

    it("renders with memoized client component", () => {
      render(<Abbr {...defaultProps} isClient isMemoized />);
      // Should render the server component as fallback during Suspense
      expect(screen.getByText("HTML")).toBeInTheDocument();
    });

    it("preserves props in client rendering", () => {
      render(
        <Abbr
          {...defaultProps}
          isClient
          emphasized
          analyticsId="client-test"
          className="client-abbr"
        />
      );

      const abbr = screen.getByText("HTML");
      expect(abbr).toHaveClass("abbr", "abbr--emphasized", "client-abbr");
      expect(abbr).toHaveAttribute("data-analytics-id", "client-test");
    });
  });

  describe("Analytics Edge Cases", () => {
    it("handles analytics with both analyticsId and onAnalytics", () => {
      const customAnalytics = vi.fn();
      render(
        <Abbr
          {...defaultProps}
          analyticsId="test-id"
          onAnalytics={customAnalytics}
        />
      );

      fireEvent.click(screen.getByText("HTML"));

      // Custom analytics should be called when both are provided
      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "abbreviation",
        label: "test-id",
        abbreviation: "HTML",
        expanded: "HyperText Markup Language",
      });

      // gtag should not be called when custom analytics is provided
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("handles analytics when gtag is not available", () => {
      // Temporarily mock gtag to undefined
      const originalGtag = (window as any).gtag;
      (window as any).gtag = undefined;

      const { container } = render(
        <Abbr {...defaultProps} analyticsId="test" />
      );

      // Should not throw error when gtag is not available
      fireEvent.click(screen.getByText("HTML"));
      expect(container).toBeInTheDocument();

      // Restore gtag
      (window as any).gtag = originalGtag;
    });

    it("handles empty children in analytics", () => {
      const customAnalytics = vi.fn();
      render(
        <Abbr title="Empty Content" onAnalytics={customAnalytics}>
          {/* Empty children */}
        </Abbr>
      );

      // Use a more specific selector for empty abbr element
      const abbr = screen.getByTitle("Empty Content");
      fireEvent.click(abbr);

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "abbreviation",
        label: "abbr-click",
        abbreviation: "",
        expanded: "Empty Content",
      });
    });
  });

  describe("Props and Accessibility Edge Cases", () => {
    it("handles tooltip precedence correctly", () => {
      render(
        <Abbr title="Original Title" tooltip="Override Tooltip">
          CSS
        </Abbr>
      );

      const abbr = screen.getByText("CSS");
      expect(abbr).toHaveAttribute("title", "Override Tooltip");
      expect(abbr).toHaveAttribute("aria-label", "Override Tooltip");
    });

    it("handles missing title and tooltip", () => {
      render(<Abbr>CSS</Abbr>);

      const abbr = screen.getByText("CSS");
      expect(abbr).not.toHaveAttribute("title");
      expect(abbr).not.toHaveAttribute("aria-label");
    });

    it("preserves existing aria-label when no title/tooltip", () => {
      render(<Abbr aria-label="Custom ARIA Label">CSS</Abbr>);

      const abbr = screen.getByText("CSS");
      expect(abbr).toHaveAttribute("aria-label", "Custom ARIA Label");
    });

    it("handles emphasized with custom className combination", () => {
      render(
        <Abbr
          {...defaultProps}
          emphasized
          className="primary-abbr secondary-abbr"
        />
      );

      const abbr = screen.getByText("HTML");
      expect(abbr.className).toBe(
        "abbr abbr--emphasized primary-abbr secondary-abbr"
      );
    });

    it("handles data attributes correctly", () => {
      render(
        <Abbr
          {...defaultProps}
          emphasized={false}
          analyticsId=""
          data-testid="abbr-test"
        />
      );

      const abbr = screen.getByText("HTML");
      expect(abbr).not.toHaveAttribute("data-emphasized");
      expect(abbr).not.toHaveAttribute("data-analytics-id");
      expect(abbr).toHaveAttribute("data-testid", "abbr-test");
    });
  });

  describe("Performance and Optimization", () => {
    it("does not create analytics handler when no analytics props", () => {
      const onClick = vi.fn();
      render(<Abbr {...defaultProps} onClick={onClick} />);

      fireEvent.click(screen.getByText("HTML"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("handles complex children types", () => {
      render(
        <Abbr title="HyperText Markup Language">
          <span>H</span>
          <span>T</span>
          <span>M</span>
          <span>L</span>
        </Abbr>
      );

      // Use title selector for abbr elements
      const abbr = screen.getByTitle("HyperText Markup Language");
      expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
      expect(abbr.children).toHaveLength(4);
    });

    it("handles numeric children in analytics", () => {
      const customAnalytics = vi.fn();
      render(
        <Abbr title="Year 2024" onAnalytics={customAnalytics}>
          {2024}
        </Abbr>
      );

      fireEvent.click(screen.getByText("2024"));

      expect(customAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "abbreviation",
        label: "abbr-click",
        abbreviation: "2024",
        expanded: "Year 2024",
      });
    });
  });

  // NOTE: Client-side memoization testing skipped - implementation detail
});
