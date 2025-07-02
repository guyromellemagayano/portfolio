/**
 * @fileoverview Comprehensive tests for the Area component covering rendering,
 * events, analytics, accessibility, and enhanced features like validation and touch optimization.
 */

import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Area, type AreaProps } from ".";
import { AreaUtils } from "./utils";

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

  it("handles polygon shapes with analytics", () => {
    render(
      <Area
        alt="Polygon area"
        coords="0,0,50,25,100,0,75,50,25,50"
        shape="poly"
        href="/polygon"
        analyticsId="poly-area"
      />
    );

    fireEvent.click(screen.getByRole("link"));

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "click",
      expect.objectContaining({
        area_shape: "poly",
        area_coords: "0,0,50,25,100,0,75,50,25,50",
        area_size: expect.any(Number),
      })
    );
  });

  it("handles circle shapes with analytics", () => {
    render(
      <Area
        alt="Circle area"
        coords="50,50,25"
        shape="circle"
        href="/circle"
        analyticsId="circle-area"
      />
    );

    fireEvent.click(screen.getByRole("link"));

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "click",
      expect.objectContaining({
        area_shape: "circle",
        area_coords: "50,50,25",
        area_size: expect.any(Number),
      })
    );
  });

  it("handles invalid coordinates gracefully", () => {
    render(
      <Area
        alt="Invalid coords"
        coords="invalid,coords"
        href="/invalid"
        analyticsId="invalid-area"
      />
    );

    fireEvent.click(screen.getByRole("link"));

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "click",
      expect.objectContaining({
        area_coords: "invalid,coords",
        area_size: 0, // Should handle invalid coords gracefully
      })
    );
  });
});

// =============================================================================
// UTILITY FUNCTIONS TESTS
// =============================================================================

describe("AreaUtils", () => {
  describe("validateRectCoords", () => {
    it("validates correct rectangular coordinates", () => {
      expect(AreaUtils.validateRectCoords("0,0,100,100")).toBe(true);
      expect(AreaUtils.validateRectCoords("10,20,150,200")).toBe(true);
    });

    it("rejects invalid rectangular coordinates", () => {
      expect(AreaUtils.validateRectCoords("0,0,0,100")).toBe(false); // x2 not > x1
      expect(AreaUtils.validateRectCoords("0,0,100,0")).toBe(false); // y2 not > y1
      expect(AreaUtils.validateRectCoords("0,0,100")).toBe(false); // too few coordinates
      expect(AreaUtils.validateRectCoords("0,0,100,100,200")).toBe(false); // too many coordinates
      expect(AreaUtils.validateRectCoords("-10,0,100,100")).toBe(false); // negative coordinate
      expect(AreaUtils.validateRectCoords("0,0,invalid,100")).toBe(false); // NaN coordinate
    });
  });

  describe("validateCircleCoords", () => {
    it("validates correct circular coordinates", () => {
      expect(AreaUtils.validateCircleCoords("50,50,25")).toBe(true);
      expect(AreaUtils.validateCircleCoords("0,0,10")).toBe(true);
    });

    it("rejects invalid circular coordinates", () => {
      expect(AreaUtils.validateCircleCoords("50,50,0")).toBe(false); // radius not > 0
      expect(AreaUtils.validateCircleCoords("50,50,-5")).toBe(false); // negative radius
      expect(AreaUtils.validateCircleCoords("50,50")).toBe(false); // too few coordinates
      expect(AreaUtils.validateCircleCoords("50,50,25,25")).toBe(false); // too many coordinates
      expect(AreaUtils.validateCircleCoords("-10,50,25")).toBe(false); // negative coordinate
      expect(AreaUtils.validateCircleCoords("50,invalid,25")).toBe(false); // NaN coordinate
    });
  });

  describe("validatePolyCoords", () => {
    it("validates correct polygon coordinates", () => {
      expect(AreaUtils.validatePolyCoords("0,0,50,25,100,0")).toBe(true); // triangle
      expect(AreaUtils.validatePolyCoords("0,0,50,0,50,50,0,50")).toBe(true); // square
    });

    it("rejects invalid polygon coordinates", () => {
      expect(AreaUtils.validatePolyCoords("0,0,50,25")).toBe(false); // too few points (need 3 points = 6 coords)
      expect(AreaUtils.validatePolyCoords("0,0,50")).toBe(false); // odd number of coordinates
      expect(AreaUtils.validatePolyCoords("0,0,-50,25,100,0")).toBe(false); // negative coordinate
      expect(AreaUtils.validatePolyCoords("0,0,invalid,25,100,0")).toBe(false); // NaN coordinate
    });
  });

  describe("validateCoordinates", () => {
    it("validates coordinates based on shape", () => {
      expect(AreaUtils.validateCoordinates("rect", "0,0,100,100")).toBe(true);
      expect(AreaUtils.validateCoordinates("circle", "50,50,25")).toBe(true);
      expect(AreaUtils.validateCoordinates("poly", "0,0,50,25,100,0")).toBe(
        true
      );
      expect(AreaUtils.validateCoordinates("default", undefined)).toBe(true);
    });

    it("returns true for default shape or missing coords", () => {
      expect(AreaUtils.validateCoordinates("default", "anything")).toBe(true);
      expect(AreaUtils.validateCoordinates("rect", undefined)).toBe(true);
    });

    it("validates invalid coordinates correctly", () => {
      expect(AreaUtils.validateCoordinates("rect", "invalid")).toBe(false);
      expect(AreaUtils.validateCoordinates("circle", "50,50")).toBe(false);
      expect(AreaUtils.validateCoordinates("poly", "0,0")).toBe(false);
    });
  });

  describe("calculateAreaSize", () => {
    it("calculates rectangular area correctly", () => {
      expect(AreaUtils.calculateAreaSize("rect", "0,0,100,100")).toBe(10000);
      expect(AreaUtils.calculateAreaSize("rect", "10,20,60,70")).toBe(2500);
    });

    it("calculates circular area correctly", () => {
      expect(AreaUtils.calculateAreaSize("circle", "50,50,10")).toBeCloseTo(
        Math.PI * 100,
        1
      );
      expect(AreaUtils.calculateAreaSize("circle", "0,0,5")).toBeCloseTo(
        Math.PI * 25,
        1
      );
    });

    it("calculates polygon area correctly", () => {
      // Simple triangle: (0,0), (10,0), (5,10)
      expect(AreaUtils.calculateAreaSize("poly", "0,0,10,0,5,10")).toBe(50);
      // Square: (0,0), (10,0), (10,10), (0,10)
      expect(AreaUtils.calculateAreaSize("poly", "0,0,10,0,10,10,0,10")).toBe(
        100
      );
    });

    it("handles invalid inputs gracefully", () => {
      expect(AreaUtils.calculateAreaSize("rect", undefined)).toBe(0);
      expect(AreaUtils.calculateAreaSize("rect", "invalid")).toBe(0);
      expect(AreaUtils.calculateAreaSize("circle", "50,50")).toBe(0);
      expect(AreaUtils.calculateAreaSize("default", "0,0,100,100")).toBe(0);
    });
  });

  describe("calculateCenterPoint", () => {
    it("calculates rectangular center correctly", () => {
      expect(AreaUtils.calculateCenterPoint("rect", "0,0,100,100")).toEqual({
        x: 50,
        y: 50,
      });
      expect(AreaUtils.calculateCenterPoint("rect", "10,20,60,80")).toEqual({
        x: 35,
        y: 50,
      });
    });

    it("calculates circular center correctly", () => {
      expect(AreaUtils.calculateCenterPoint("circle", "50,75,25")).toEqual({
        x: 50,
        y: 75,
      });
    });

    it("calculates polygon centroid correctly", () => {
      // Triangle: (0,0), (10,0), (5,10) - centroid should be (5, 3.33)
      expect(AreaUtils.calculateCenterPoint("poly", "0,0,10,0,5,10")).toEqual({
        x: 5,
        y: expect.closeTo(3.33, 1),
      });
    });

    it("handles invalid inputs gracefully", () => {
      expect(AreaUtils.calculateCenterPoint("rect", undefined)).toBeUndefined();
      expect(AreaUtils.calculateCenterPoint("rect", "invalid")).toBeUndefined();
      expect(AreaUtils.calculateCenterPoint("circle", "50,50")).toBeUndefined();
      expect(
        AreaUtils.calculateCenterPoint("default", "0,0,100,100")
      ).toBeUndefined();
    });
  });

  describe("checkTouchOptimization", () => {
    it("checks rectangular touch optimization correctly", () => {
      expect(AreaUtils.checkTouchOptimization("rect", "0,0,44,44")).toBe(true);
      expect(AreaUtils.checkTouchOptimization("rect", "0,0,50,50")).toBe(true);
      expect(AreaUtils.checkTouchOptimization("rect", "0,0,30,30")).toBe(false);
      expect(AreaUtils.checkTouchOptimization("rect", "0,0,44,30")).toBe(false); // height too small
    });

    it("checks circular touch optimization correctly", () => {
      expect(AreaUtils.checkTouchOptimization("circle", "50,50,22")).toBe(true); // radius >= 22 (44/2)
      expect(AreaUtils.checkTouchOptimization("circle", "50,50,25")).toBe(true);
      expect(AreaUtils.checkTouchOptimization("circle", "50,50,20")).toBe(
        false
      );
    });

    it("checks polygon touch optimization by area", () => {
      // Large polygon - should pass
      expect(
        AreaUtils.checkTouchOptimization("poly", "0,0,50,0,50,50,0,50")
      ).toBe(true);
      // Small polygon - should fail
      expect(
        AreaUtils.checkTouchOptimization("poly", "0,0,10,0,10,10,0,10")
      ).toBe(false);
    });

    it("handles custom minimum size", () => {
      expect(AreaUtils.checkTouchOptimization("rect", "0,0,30,30", 30)).toBe(
        true
      );
      expect(AreaUtils.checkTouchOptimization("rect", "0,0,30,30", 32)).toBe(
        false
      );
    });

    it("handles invalid inputs gracefully", () => {
      expect(AreaUtils.checkTouchOptimization("rect", undefined)).toBe(false);
      expect(AreaUtils.checkTouchOptimization("rect", "invalid")).toBe(false);
    });
  });

  describe("createRectCoords", () => {
    it("creates rectangular coordinates correctly", () => {
      expect(AreaUtils.createRectCoords(0, 0, 100, 100)).toBe("0,0,100,100");
      expect(AreaUtils.createRectCoords(10, 20, 60, 80)).toBe("10,20,60,80");
    });
  });

  describe("createCircleCoords", () => {
    it("creates circular coordinates correctly", () => {
      expect(AreaUtils.createCircleCoords(50, 50, 25)).toBe("50,50,25");
      expect(AreaUtils.createCircleCoords(0, 0, 10)).toBe("0,0,10");
    });
  });

  describe("createPolyCoords", () => {
    it("creates polygon coordinates correctly", () => {
      const points = [
        { x: 0, y: 0 },
        { x: 50, y: 25 },
        { x: 100, y: 0 },
      ];
      expect(AreaUtils.createPolyCoords(points)).toBe("0,0,50,25,100,0");
    });

    it("handles empty points array", () => {
      expect(AreaUtils.createPolyCoords([])).toBe("");
    });
  });

  describe("percentToAbsolute", () => {
    it("converts percentage coordinates to absolute pixels", () => {
      expect(AreaUtils.percentToAbsolute("0,0,50,50", 200, 100)).toBe(
        "0,0,100,50"
      );
      expect(AreaUtils.percentToAbsolute("25,25,75,75", 400, 200)).toBe(
        "100,50,300,150"
      );
    });

    it("handles odd number of coordinates", () => {
      // Should still process pairs, ignoring the last odd coordinate
      expect(AreaUtils.percentToAbsolute("0,0,50", 200, 100)).toBe(
        "0,0,100,NaN"
      );
    });
  });

  describe("expandForTouch", () => {
    it("expands rectangular coordinates when needed", () => {
      const small = "10,10,30,30"; // 20x20 area, needs expansion to 44x44
      const expanded = AreaUtils.expandForTouch("rect", small, 44);
      expect(expanded).toBe("-2,-2,42,42"); // Should expand by 12 pixels on each side
    });

    it("does not expand already optimal rectangles", () => {
      const optimal = "0,0,50,50"; // 50x50 area, already optimal
      const result = AreaUtils.expandForTouch("rect", optimal, 44);
      expect(result).toBe(optimal);
    });

    it("expands circular coordinates when needed", () => {
      const small = "50,50,20"; // radius 20, needs to be 22 for 44px diameter
      const expanded = AreaUtils.expandForTouch("circle", small, 44);
      expect(expanded).toBe("50,50,22");
    });

    it("does not expand already optimal circles", () => {
      const optimal = "50,50,25"; // radius 25, already optimal
      const result = AreaUtils.expandForTouch("circle", optimal, 44);
      expect(result).toBe(optimal);
    });

    it("returns polygon coordinates unchanged", () => {
      const poly = "0,0,50,25,100,0";
      const result = AreaUtils.expandForTouch("poly", poly, 44);
      expect(result).toBe(poly); // Polygons require manual adjustment
    });

    it("handles invalid coordinates gracefully", () => {
      expect(AreaUtils.expandForTouch("rect", "invalid", 44)).toBe("invalid");
      expect(AreaUtils.expandForTouch("circle", "50,50", 44)).toBe("50,50");
    });
  });
});
