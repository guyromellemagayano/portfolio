import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import type { CommonComponentProps } from "../types";

import "./styles.css";

// Lazy load client components
const AreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AreaClient };
});

const MemoizedAreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAreaClient };
});

export type AreaRef = React.ComponentRef<"area">;
export type AreaShape = "rect" | "circle" | "poly" | "default";

/** Type-safe coordinate definitions for different shapes */
export type RectCoords = `${number},${number},${number},${number}`;
export type CircleCoords = `${number},${number},${number}`;
export type PolyCoords = string;
export type DefaultCoords = undefined;

export type AreaCoords<T extends AreaShape> = T extends "rect"
  ? RectCoords
  : T extends "circle"
    ? CircleCoords
    : T extends "poly"
      ? PolyCoords
      : T extends "default"
        ? DefaultCoords
        : string;

/** Analytics data with geometric calculations and interaction type detection */
export interface AreaAnalyticsData {
  event: string;
  category: string;
  label: string;
  href?: string;
  coords?: string;
  shape?: string;
  areaSize?: number;
  centerPoint?: { x: number; y: number };
  touchOptimized?: boolean;
  interactionType?: "mouse" | "keyboard" | "touch";
}

export interface AreaProps
  extends React.AreaHTMLAttributes<HTMLAreaElement>,
    CommonComponentProps {
  /** Alternative text for the area */
  alt: string;
  /** Shape of the clickable area */
  shape?: AreaShape;
  /** Coordinates defining the clickable area */
  coords?: string;
  /** URL the area links to */
  href?: string;
  /** Target window or frame */
  target?: string;
  /** Whether the area is disabled */
  disabled?: boolean;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: AreaAnalyticsData) => void;
  /** Minimum touch target size in pixels */
  minTouchTarget?: number;
  /** Show debug overlay in development */
  debug?: boolean;
  /** Validate coordinates on mount */
  validateCoords?: boolean;
  /** Custom aria-label override */
  ariaLabel?: string;
  /** Whether this area should be focusable */
  focusable?: boolean;
  /** Priority for screen readers */
  priority?: "high" | "normal" | "low";
}

// =============================================================================
// COORDINATE VALIDATION UTILITIES
// =============================================================================

/**
 * Validates rectangular coordinates in format: x1,y1,x2,y2
 * Ensures x2 > x1, y2 > y1, and all values are non-negative numbers
 */
function validateRectCoords(coords: string): boolean {
  const parts = coords.split(",").map(Number);
  if (parts.length !== 4) return false;
  const [x1, y1, x2, y2] = parts;
  return x2! > x1! && y2! > y1! && parts.every((n) => !isNaN(n) && n >= 0);
}

/**
 * Validates circular coordinates in format: x,y,radius
 * Ensures radius > 0 and all values are non-negative numbers
 */
function validateCircleCoords(coords: string): boolean {
  const parts = coords.split(",").map(Number);
  if (parts.length !== 3) return false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_x, _y, r] = parts;
  return r! > 0 && parts.every((n) => !isNaN(n) && n >= 0);
}

/**
 * Validates polygon coordinates in format: x1,y1,x2,y2,x3,y3,...
 * Requires minimum 3 points (6 coordinates) and even number of coordinates
 */
function validatePolyCoords(coords: string): boolean {
  const parts = coords.split(",").map(Number);
  return (
    parts.length >= 6 &&
    parts.length % 2 === 0 &&
    parts.every((n) => !isNaN(n) && n >= 0)
  );
}

/**
 * Validates coordinates based on the area shape type
 * Returns true for valid coordinates or when validation is not applicable
 */
function validateCoordinates(shape: AreaShape, coords?: string): boolean {
  if (!coords || shape === "default") return true;

  switch (shape) {
    case "rect":
      return validateRectCoords(coords);
    case "circle":
      return validateCircleCoords(coords);
    case "poly":
      return validatePolyCoords(coords);
    default:
      return true;
  }
}

// =============================================================================
// GEOMETRIC CALCULATIONS
// =============================================================================

/**
 * Calculates the area size in pixels² for analytics and touch optimization
 * Uses appropriate formula based on shape: rectangle, circle, or polygon (shoelace)
 */
function calculateAreaSize(shape: AreaShape, coords?: string): number {
  if (!coords) return 0;

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return 0;
      return (parts[2]! - parts[0]!) * (parts[3]! - parts[1]!);
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return 0;
      return Math.PI * parts[2]! * parts[2]!;
    }
    case "poly": {
      // Shoelace formula for polygon area calculation
      const points = coords.split(",").map(Number);
      let area = 0;
      for (let i = 0; i < points.length; i += 2) {
        const j = (i + 2) % points.length;
        area += points[i]! * points[j + 1]!;
        area -= points[j]! * points[i + 1]!;
      }
      return Math.abs(area) / 2;
    }
    default:
      return 0;
  }
}

/**
 * Calculates the geometric center point for analytics and positioning
 * Returns centroid for rectangles/polygons, center for circles
 */
function calculateCenterPoint(
  shape: AreaShape,
  coords?: string
): { x: number; y: number } | undefined {
  if (!coords) return undefined;

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return undefined;
      return { x: (parts[0]! + parts[2]!) / 2, y: (parts[1]! + parts[3]!) / 2 };
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return undefined;
      return { x: parts[0]!, y: parts[1]! };
    }
    case "poly": {
      const points = coords.split(",").map(Number);
      let x = 0,
        y = 0;
      for (let i = 0; i < points.length; i += 2) {
        x += points[i]!;
        y += points[i + 1]!;
      }
      return { x: x / (points.length / 2), y: y / (points.length / 2) };
    }
    default:
      return undefined;
  }
}

// =============================================================================
// ACCESSIBILITY & TOUCH OPTIMIZATION
// =============================================================================

/**
 * Checks if area meets minimum touch target requirements
 * Follows WCAG guidelines (44px minimum recommended)
 * Uses shape-specific calculations for accurate assessment
 */
function checkTouchOptimization(
  shape: AreaShape,
  coords?: string,
  minSize = 44
): boolean {
  if (!coords) return false;

  const areaSize = calculateAreaSize(shape, coords);
  const minArea = minSize * minSize;

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return false;
      const width = parts[2]! - parts[0]!;
      const height = parts[3]! - parts[1]!;
      return width >= minSize && height >= minSize;
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return false;
      return parts[2]! >= minSize / 2;
    }
    default:
      return areaSize >= minArea;
  }
}

/** Universal area component with coordinate validation, touch optimization, and enhanced analytics */
const AreaComponent = React.forwardRef<AreaRef, AreaProps>((props, ref) => {
  const {
    alt,
    shape = "rect",
    coords,
    href,
    target,
    disabled = false,
    analyticsId,
    onAnalytics,
    minTouchTarget = 44,
    debug = false,
    validateCoords = true,
    ariaLabel,
    focusable = true,
    priority = "normal",
    as: Component = "area",
    isClient = false,
    isMemoized = false,
    className,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    style,
    ...rest
  } = props;

  const elementRef = useRef<HTMLAreaElement>(null);
  const hasAnalytics = analyticsId || onAnalytics;

  // Development validation warnings
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && validateCoords && coords) {
      if (!validateCoordinates(shape, coords)) {
        console.warn(
          `Area component: Invalid coordinates "${coords}" for shape "${shape}".`
        );
      }

      if (!checkTouchOptimization(shape, coords, minTouchTarget)) {
        console.warn(
          `Area component: Area may be too small for touch (${minTouchTarget}px minimum).`
        );
      }
    }
  }, [shape, coords, validateCoords, minTouchTarget]);

  // Analytics data with geometry calculations
  const analyticsData = useMemo<AreaAnalyticsData>(
    () => ({
      event: "click",
      category: "image-map",
      label: analyticsId || "area-click",
      href: href || undefined,
      coords: coords || undefined,
      shape: shape || undefined,
      areaSize: calculateAreaSize(shape, coords),
      centerPoint: calculateCenterPoint(shape, coords),
      touchOptimized: checkTouchOptimization(shape, coords, minTouchTarget),
      interactionType: "mouse",
    }),
    [analyticsId, href, coords, shape, minTouchTarget]
  );

  // Click handler with interaction type detection
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAreaElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      if (hasAnalytics) {
        const enhancedData: AreaAnalyticsData = {
          ...analyticsData,
          interactionType: event.detail === 0 ? "keyboard" : "mouse",
        };

        if (onAnalytics) {
          onAnalytics(enhancedData);
        } else if (analyticsId && typeof window !== "undefined") {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const gtag = (window as any).gtag;
            if (gtag) {
              gtag("event", "click", {
                event_category: enhancedData.category,
                event_label: enhancedData.label,
                area_href: enhancedData.href,
                area_coords: enhancedData.coords,
                area_shape: enhancedData.shape,
                area_size: enhancedData.areaSize,
                touch_optimized: enhancedData.touchOptimized,
                interaction_type: enhancedData.interactionType,
              });
            }
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn("Analytics tracking failed:", error);
            }
          }
        }
      }

      onClick?.(event);
    },
    [disabled, hasAnalytics, analyticsData, onAnalytics, analyticsId, onClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLAreaElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        if (disabled) {
          event.preventDefault();
          return;
        }

        if (hasAnalytics) {
          const enhancedData: AreaAnalyticsData = {
            ...analyticsData,
            interactionType: "keyboard",
          };

          if (onAnalytics) {
            onAnalytics(enhancedData);
          }
        }
      }

      onKeyDown?.(event);
    },
    [disabled, hasAnalytics, analyticsData, onAnalytics, onKeyDown]
  );

  // Touch handler for mobile analytics
  const handleTouchStart = useCallback(() => {
    if (hasAnalytics && !disabled) {
      const enhancedData: AreaAnalyticsData = {
        ...analyticsData,
        interactionType: "touch",
      };

      if (onAnalytics) {
        onAnalytics(enhancedData);
      }
    }
  }, [hasAnalytics, disabled, analyticsData, onAnalytics]);

  // Computed props with accessibility and validation
  const enhancedProps = useMemo(() => {
    const baseClassName = [
      "area",
      disabled && "area--disabled",
      debug && "area--debug",
      !checkTouchOptimization(shape, coords, minTouchTarget) &&
        "area--small-touch-target",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const tabIndex =
      focusable && !disabled
        ? priority === "high"
          ? 1
          : priority === "low"
            ? -1
            : 0
        : -1;

    return {
      ...rest,
      ref: ref || elementRef,
      alt,
      shape,
      coords,
      href,
      target,
      className: baseClassName,
      style: {
        ...style,
        pointerEvents: disabled ? "none" : style?.pointerEvents,
      },
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onTouchStart: handleTouchStart,
      onFocus,
      onBlur,
      tabIndex,
      "aria-disabled": disabled,
      "aria-label": ariaLabel || alt,
      "aria-describedby": coords
        ? `${analyticsId || "area"}-coords`
        : undefined,
      "data-shape": shape,
      "data-disabled": disabled,
      "data-analytics-id": analyticsId || undefined,
      "data-area-size": calculateAreaSize(shape, coords),
      "data-touch-optimized": checkTouchOptimization(
        shape,
        coords,
        minTouchTarget
      ),
      "data-valid-coords": validateCoordinates(shape, coords),
    };
  }, [
    rest,
    ref,
    alt,
    shape,
    coords,
    href,
    target,
    disabled,
    className,
    style,
    handleClick,
    handleKeyDown,
    handleTouchStart,
    onFocus,
    onBlur,
    focusable,
    priority,
    ariaLabel,
    analyticsId,
    minTouchTarget,
    debug,
  ]);

  // Base element
  const element = <Component {...enhancedProps} />;

  // Debug overlay (development only)
  const debugOverlay = debug &&
    process.env.NODE_ENV === "development" &&
    coords && (
      <div
        className="area__debug-overlay"
        style={{
          position: "absolute",
          pointerEvents: "none",
          border: "2px solid red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          zIndex: 9999,
          // Position and size would be calculated based on coords and shape
        }}
        aria-hidden="true"
      >
        <div className="area__debug-info">
          <small>
            {shape}: {coords}
            <br />
            Size: {Math.round(calculateAreaSize(shape, coords))}px²
            <br />
            Touch OK:{" "}
            {checkTouchOptimization(shape, coords, minTouchTarget) ? "✓" : "✗"}
          </small>
        </div>
      </div>
    );

  // Client-side rendering
  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAreaClient : AreaClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...props} ref={ref} />
        {debugOverlay}
      </Suspense>
    );
  }

  return (
    <>
      {element}
      {debugOverlay}
    </>
  );
});

AreaComponent.displayName = "Area";

// =============================================================================
// PUBLIC API - UTILITY FUNCTIONS
// =============================================================================

/**
 * Comprehensive utility functions for area coordinate manipulation and validation
 * Provides a clean API for common area operations in external usage
 */
// eslint-disable-next-line react-refresh/only-export-components
export const AreaUtils = {
  // Core validation and calculation functions
  validateCoordinates,
  calculateAreaSize,
  calculateCenterPoint,
  checkTouchOptimization,

  /**
   * Creates rectangular coordinates string from individual values
   * @param x1 Left X coordinate
   * @param y1 Top Y coordinate
   * @param x2 Right X coordinate
   * @param y2 Bottom Y coordinate
   * @returns Formatted coordinates string "x1,y1,x2,y2"
   */
  createRectCoords(x1: number, y1: number, x2: number, y2: number): RectCoords {
    return `${x1},${y1},${x2},${y2}`;
  },

  /**
   * Creates circular coordinates string from center point and radius
   * @param x Center X coordinate
   * @param y Center Y coordinate
   * @param r Radius in pixels
   * @returns Formatted coordinates string "x,y,r"
   */
  createCircleCoords(x: number, y: number, r: number): CircleCoords {
    return `${x},${y},${r}`;
  },

  /**
   * Creates polygon coordinates string from array of points
   * @param points Array of {x, y} coordinate objects
   * @returns Formatted coordinates string "x1,y1,x2,y2,..."
   */
  createPolyCoords(points: Array<{ x: number; y: number }>): PolyCoords {
    return points.map((p) => `${p.x},${p.y}`).join(",");
  },

  /**
   * Converts percentage-based coordinates to absolute pixel coordinates
   * @param coords Percentage coordinates string
   * @param imageWidth Container width in pixels
   * @param imageHeight Container height in pixels
   * @returns Absolute coordinates string
   */
  percentToAbsolute(
    coords: string,
    imageWidth: number,
    imageHeight: number
  ): string {
    return coords
      .split(",")
      .map((coord, index) => {
        const isEven = index % 2 === 0;
        const dimension = isEven ? imageWidth : imageHeight;
        return Math.round((parseFloat(coord) / 100) * dimension);
      })
      .join(",");
  },

  /**
   * Expands area coordinates to meet minimum touch target requirements
   * Automatically adjusts small areas for better accessibility
   * @param shape Area shape type
   * @param coords Current coordinates string
   * @param minSize Minimum target size in pixels (default: 44px)
   * @returns Adjusted coordinates string
   */
  expandForTouch(shape: AreaShape, coords: string, minSize = 44): string {
    if (shape === "rect") {
      const [x1, y1, x2, y2] = coords.split(",").map(Number);
      const width = x2! - x1!;
      const height = y2! - y1!;

      if (width < minSize || height < minSize) {
        const centerX = (x1! + x2!) / 2;
        const centerY = (y1! + y2!) / 2;
        const newHalfWidth = Math.max(width, minSize) / 2;
        const newHalfHeight = Math.max(height, minSize) / 2;

        return `${centerX - newHalfWidth},${centerY - newHalfHeight},${centerX + newHalfWidth},${centerY + newHalfHeight}`;
      }
    }

    return coords;
  },
};

export const Area = AreaComponent;
export default Area;
