import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Abbr, type AbbrProps } from "./index";

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

  // NOTE: Client-side memoization testing skipped - implementation detail
});
