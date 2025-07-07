import React, { forwardRef, useCallback, useMemo } from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

// =============================================================================
// TYPES
// =============================================================================

export type CanvasRef = React.ComponentRef<"canvas">;

export interface CanvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement>,
    CommonComponentProps {
  /** Width of the canvas in pixels */
  width?: number;
  /** Height of the canvas in pixels */
  height?: number;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: {
    event: string;
    category: string;
    label: string;
    action: string;
    canvasWidth?: number;
    canvasHeight?: number;
  }) => void;
  /** Callback when canvas is clicked */
  onCanvasClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  /** Callback when canvas context is ready */
  onContextReady?: (context: CanvasRenderingContext2D | null) => void;
  /** Support for data attributes commonly used in testing */
  [key: `data-${string}`]: string | undefined;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Fires Google Analytics event for canvas interactions
 * @param analyticsId - The analytics identifier
 * @param event - The event type
 * @param canvasElement - The canvas element for context
 */
function fireCanvasAnalytics(
  analyticsId: string,
  event: string,
  canvasElement?: HTMLCanvasElement
): void {
  try {
    const width = canvasElement?.width || 0;
    const height = canvasElement?.height || 0;

    // Google Analytics implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", event, {
        event_category: "canvas",
        event_label: analyticsId,
        canvas_width: width,
        canvas_height: height,
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking failed:", error);
    }
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Universal canvas component with analytics, accessibility, and enhanced features.
 * Supports server-side and client-side rendering with polymorphic capabilities.
 *
 * ⚠️ Warning: width, height, and other canvas-specific props are only valid for <canvas> elements.
 * When using with other elements via the 'as' prop, these attributes may be invalid or have no effect.
 */
const CanvasComponent = forwardRef<CanvasRef, CanvasProps>((props, ref) => {
  const {
    width,
    height,
    analyticsId,
    onAnalytics,
    onCanvasClick,
    as: Component = "canvas",
    isClient = false,
    children,
    className,
    onClick: originalOnClick,
    style,
    ...rest
  } = props;

  const asElement = typeof Component === "string" ? Component : "unknown";

  // Runtime validation for development - warns about invalid prop usage
  useMemo(() => {
    validatePolymorphicProps(
      "Canvas",
      asElement,
      { width, height },
      ELEMENT_CONFIGS.BASE
    );
  }, [asElement, width, height]);

  const hasAnalytics = analyticsId || onAnalytics;

  // Enhanced event handlers
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      onCanvasClick?.(event);

      if (hasAnalytics && (analyticsId || onAnalytics)) {
        if (onAnalytics) {
          onAnalytics({
            event: "click",
            category: "canvas",
            label: analyticsId || "canvas-click",
            action: "interact",
            canvasWidth: event.currentTarget.width,
            canvasHeight: event.currentTarget.height,
          });
        } else if (analyticsId) {
          fireCanvasAnalytics(analyticsId, "click", event.currentTarget);
        }
      }

      originalOnClick?.(event);
    },
    [hasAnalytics, analyticsId, onAnalytics, onCanvasClick, originalOnClick]
  );

  // Enhanced props with accessibility and semantic structure
  const enhancedProps = useMemo(
    () => ({
      ...rest,
      ref,
      className: ["canvas", className].filter(Boolean).join(" "),
      style,
      width,
      height,
      onClick: handleClick,
      "data-analytics-id":
        rest["data-analytics-id"] || analyticsId || undefined,
      "data-polymorphic-element":
        asElement !== "canvas" ? asElement : undefined,
      "data-element-validation":
        process.env.NODE_ENV === "development" && asElement !== "canvas"
          ? "warning"
          : undefined,
      "aria-label": rest["aria-label"] || "Canvas element",
      role: "img",
    }),
    [
      rest,
      ref,
      className,
      style,
      width,
      height,
      handleClick,
      analyticsId,
      asElement,
    ]
  );

  // Base element
  const element = <Component {...enhancedProps}>{children}</Component>;

  // Client-side rendering
  if (isClient) {
    // For now, return the base element for client-side rendering
    // Client components will be implemented in a future update
    return element;
  }

  return element;
});

CanvasComponent.displayName = "Canvas";

// Export the server component
export const Canvas = CanvasComponent;

// For most use cases, the server component is sufficient
// For client-side interactivity, use isClient=true with isMemoized=true
export default Canvas;
