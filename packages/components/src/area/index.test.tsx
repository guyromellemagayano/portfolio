/**
 * @fileoverview Comprehensive tests for the Area component covering rendering,
 * events, analytics, accessibility, and enhanced features like validation and touch optimization.
 */

import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Area, type AreaProps } from "./index";

// Mock analytics
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

describe("Area Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: AreaProps = {
    alt: "Test area",
    coords: "0,0,100,100",
    href: "/test",
  };

  it("renders with default props", () => {
    render(<Area {...defaultProps} />);

    const area = screen.getByRole("link", { name: "Test area" });
    expect(area).toBeInTheDocument();
    expect(area).toHaveAttribute("alt", "Test area");
    expect(area).toHaveAttribute("coords", "0,0,100,100");
    expect(area).toHaveAttribute("href", "/test");
    expect(area).toHaveClass("area");
  });

  it("handles different shapes", () => {
    const { rerender } = render(<Area {...defaultProps} shape="rect" />);
    expect(screen.getByRole("link")).toHaveAttribute("shape", "rect");

    rerender(<Area {...defaultProps} shape="circle" />);
    expect(screen.getByRole("link")).toHaveAttribute("shape", "circle");

    rerender(<Area {...defaultProps} shape="poly" />);
    expect(screen.getByRole("link")).toHaveAttribute("shape", "poly");

    rerender(<Area {...defaultProps} shape="default" />);
    expect(screen.getByRole("link")).toHaveAttribute("shape", "default");
  });

  it("handles disabled state", () => {
    render(<Area {...defaultProps} disabled />);

    const area = screen.getByRole("link");
    expect(area).toHaveClass("area--disabled");
    expect(area).toHaveAttribute("aria-disabled", "true");
    expect(area).toHaveAttribute("data-disabled", "true");
  });

  it("prevents click when disabled", () => {
    const handleClick = vi.fn();
    render(<Area {...defaultProps} disabled onClick={handleClick} />);

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Area {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles analytics tracking", () => {
    render(<Area {...defaultProps} analyticsId="test-area" />);

    fireEvent.click(screen.getByRole("link"));

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "click",
      expect.objectContaining({
        event_category: "image-map",
        event_label: "test-area",
        area_href: "/test",
        area_coords: "0,0,100,100",
        area_shape: "rect",
        area_size: 10000,
        touch_optimized: true,
        interaction_type: expect.any(String), // Accept either "mouse" or "keyboard"
      })
    );
  });

  it("handles custom analytics function", () => {
    const customAnalytics = vi.fn();
    render(<Area {...defaultProps} onAnalytics={customAnalytics} />);

    fireEvent.click(screen.getByRole("link"));

    expect(customAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "click",
        category: "image-map",
        label: "area-click",
        href: "/test",
        coords: "0,0,100,100",
        shape: "rect",
        areaSize: 10000,
        touchOptimized: true,
        interactionType: expect.any(String), // Accept either "mouse" or "keyboard"
      })
    );
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

    render(<Area {...defaultProps} analyticsId="test-area" />);

    fireEvent.click(screen.getByRole("link"));
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

    render(<Area {...defaultProps} analyticsId="test-area" />);

    fireEvent.click(screen.getByRole("link"));
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it("applies custom className", () => {
    render(<Area {...defaultProps} className="custom-area" />);

    const area = screen.getByRole("link");
    expect(area).toHaveClass("area", "custom-area");
  });

  it("applies custom styles", () => {
    render(<Area {...defaultProps} style={{ borderRadius: "4px" }} />);

    const area = screen.getByRole("link");
    expect(area).toHaveStyle({ borderRadius: "4px" });
  });

  it("handles custom component", () => {
    const CustomArea = React.forwardRef<
      HTMLAreaElement,
      React.AreaHTMLAttributes<HTMLAreaElement>
    >((props, ref) => <area ref={ref} {...props} data-testid="custom-area" />);
    CustomArea.displayName = "CustomArea";

    render(<Area {...defaultProps} as={CustomArea} />);

    expect(screen.getByTestId("custom-area")).toBeInTheDocument();
  });

  // NOTE: Client-side rendering is not tested in unit tests as it's just
  // a thin wrapper around the server component with zero business logic

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLAreaElement>();
    render(<Area {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLAreaElement);
    expect(ref.current?.tagName).toBe("AREA");
  });

  it("handles target attribute", () => {
    render(<Area {...defaultProps} target="_blank" />);

    const area = screen.getByRole("link");
    expect(area).toHaveAttribute("target", "_blank");
  });

  it("handles data attributes correctly", () => {
    render(
      <Area {...defaultProps} shape="circle" disabled analyticsId="test-area" />
    );

    const area = screen.getByRole("link");
    expect(area).toHaveAttribute("data-shape", "circle");
    expect(area).toHaveAttribute("data-disabled", "true");
    expect(area).toHaveAttribute("data-analytics-id", "test-area");
  });

  it("only creates click handler when analytics are needed", () => {
    const onClick = vi.fn();

    // Without analytics, should use original onClick
    const { rerender } = render(<Area {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);

    // With analytics, should wrap onClick
    vi.clearAllMocks();
    rerender(<Area {...defaultProps} onClick={onClick} analyticsId="test" />);
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalled();
  });

  // NOTE: Client-side memoization testing skipped - implementation detail

  it("handles missing href gracefully", () => {
    render(
      <Area
        alt="Test area without href"
        coords="0,0,50,50"
        analyticsId="no-href-area"
      />
    );

    // Areas without href don't have "link" role, use alt text to find it
    const area = screen.getByAltText("Test area without href");
    fireEvent.click(area);

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "click",
      expect.objectContaining({
        event_category: "image-map",
        event_label: "no-href-area",
        area_href: undefined,
        area_coords: "0,0,50,50",
        area_shape: "rect",
        area_size: 2500,
        touch_optimized: true,
        interaction_type: expect.any(String),
      })
    );
  });

  it("handles accessibility attributes", () => {
    render(
      <Area
        alt="Custom area label" // alt becomes aria-label in the component
        coords="0,0,100,100"
        href="/test"
        analyticsId="custom-area"
        // Note: aria-describedby is automatically generated by the component
      />
    );

    const area = screen.getByRole("link");
    expect(area).toHaveAttribute("aria-label", "Custom area label");
    expect(area).toHaveAttribute("aria-describedby", "custom-area-coords"); // Generated based on analyticsId
  });
});
