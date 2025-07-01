import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import type { CommonComponentProps } from "../types";
import {
  type AreaCoords,
  type AreaShape,
  AreaUtils,
  type CircleCoords,
  type PolyCoords,
  type RectCoords,
} from "./utils";

import "./styles.css";

// Lazy load client components for code splitting
const AreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AreaClient };
});

const MemoizedAreaClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAreaClient };
});

export type AreaRef = React.ComponentRef<"area">;

// Re-export types for external consumers
export type { AreaCoords, AreaShape, CircleCoords, PolyCoords, RectCoords };

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
      if (!AreaUtils.validateCoordinates(shape, coords)) {
        console.warn(
          `Area component: Invalid coordinates "${coords}" for shape "${shape}".`
        );
      }

      if (!AreaUtils.checkTouchOptimization(shape, coords, minTouchTarget)) {
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
      areaSize: AreaUtils.calculateAreaSize(shape, coords),
      centerPoint: AreaUtils.calculateCenterPoint(shape, coords),
      touchOptimized: AreaUtils.checkTouchOptimization(
        shape,
        coords,
        minTouchTarget
      ),
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
      !AreaUtils.checkTouchOptimization(shape, coords, minTouchTarget) &&
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
      "data-area-size": AreaUtils.calculateAreaSize(shape, coords),
      "data-touch-optimized": AreaUtils.checkTouchOptimization(
        shape,
        coords,
        minTouchTarget
      ),
      "data-valid-coords": AreaUtils.validateCoordinates(shape, coords),
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
          border: "2px dashed #ff0000",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          zIndex: 9999,
        }}
        data-testid="area-debug-overlay"
      >
        <small
          style={{
            position: "absolute",
            top: "-20px",
            left: "0",
            fontSize: "10px",
            color: "#ff0000",
            background: "white",
            padding: "2px 4px",
            border: "1px solid #ff0000",
          }}
        >
          {shape}: {coords}
        </small>
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

// Export the server component
export const Area = AreaComponent;

// Re-export AreaUtils for external consumers
export { AreaUtils };

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Area;
