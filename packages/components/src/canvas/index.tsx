import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const CanvasClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CanvasClient };
});

const MemoizedCanvasClient = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCanvasClient };
});

export type CanvasRef = React.ComponentRef<"canvas">;
export type CanvasVariant =
  | "default"
  | "responsive"
  | "fullscreen"
  | "thumbnail";
export type CanvasContextType = "2d" | "webgl" | "webgl2" | "bitmaprenderer";

export interface CanvasDimensions {
  width: number;
  height: number;
  pixelRatio?: number;
}

export interface CanvasDrawingState {
  isDrawing: boolean;
  tool: string;
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
}

export interface CanvasAnalyticsData {
  event: string;
  category: string;
  label: string;
  action: string;
  dimensions?: CanvasDimensions;
  contextType?: CanvasContextType;
  interactionType?: "mouse" | "touch" | "keyboard";
  drawingState?: Partial<CanvasDrawingState>;
}

export interface CanvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement>,
    CommonComponentProps {
  /** Width of the canvas in pixels */
  width?: number;
  /** Height of the canvas in pixels */
  height?: number;
  /** Custom canvas dimensions with pixel ratio support */
  dimensions?: CanvasDimensions;
  /** Visual variant of the canvas */
  variant?: CanvasVariant;
  /** Type of rendering context to initialize */
  contextType?: CanvasContextType;
  /** Whether the canvas is currently active for drawing */
  active?: boolean;
  /** Whether the canvas is in a loading state */
  loading?: boolean;
  /** Whether the canvas is disabled */
  disabled?: boolean;
  /** Whether to enable high DPI support */
  enableHighDPI?: boolean;
  /** Whether to preserve drawing buffer */
  preserveDrawingBuffer?: boolean;
  /** Alpha channel configuration */
  alpha?: boolean;
  /** Antialiasing configuration */
  antialias?: boolean;
  /** Whether to show debug information overlay */
  debug?: boolean;
  /** Auto-resize with container */
  autoResize?: boolean;
  /** Maximum width for responsive sizing */
  maxWidth?: number;
  /** Maximum height for responsive sizing */
  maxHeight?: number;
  /** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: CanvasAnalyticsData) => void;
  /** Callback when canvas is clicked */
  onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  /** Callback when drawing starts */
  onDrawStart?: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  /** Callback when drawing */
  onDrawing?: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  /** Callback when drawing ends */
  onDrawEnd?: (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  /** Callback when canvas context is ready */
  onContextReady?: (
    context: RenderingContext | null,
    canvas: HTMLCanvasElement
  ) => void;
  /** Callback when canvas is resized */
  onResize?: (dimensions: CanvasDimensions) => void;
  /** Alt text for accessibility */
  alt?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Description for screen readers */
  description?: string;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Validates canvas dimensions
 */
function validateDimensions(width?: number, height?: number): boolean {
  if (width !== undefined && (width <= 0 || width > 32767)) return false;
  if (height !== undefined && (height <= 0 || height > 32767)) return false;
  return true;
}

/**
 * Gets the device pixel ratio for high DPI displays
 */
function getPixelRatio(): number {
  return window.devicePixelRatio || 1;
}

/**
 * Calculates responsive dimensions based on container and constraints
 */
function getResponsiveDimensions(
  baseWidth: number,
  baseHeight: number,
  maxWidth?: number,
  maxHeight?: number,
  containerWidth?: number
): CanvasDimensions {
  let width = baseWidth;
  let height = baseHeight;
  const aspectRatio = width / height;

  // Apply container constraints
  if (containerWidth && width > containerWidth) {
    width = containerWidth;
    height = width / aspectRatio;
  }

  // Apply max width constraint
  if (maxWidth && width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  // Apply max height constraint
  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
    pixelRatio: getPixelRatio(),
  };
}

/**
 * Initializes canvas context with proper configuration
 */
function initializeContext(
  canvas: HTMLCanvasElement | null,
  contextType: CanvasContextType = "2d",
  options: {
    alpha?: boolean;
    antialias?: boolean;
    preserveDrawingBuffer?: boolean;
  } = {}
): RenderingContext | null {
  if (!canvas) return null;

  try {
    let context: RenderingContext | null = null;

    switch (contextType) {
      case "2d":
        context = canvas.getContext("2d", options);
        break;
      case "webgl":
        context =
          canvas.getContext("webgl", options) ||
          canvas.getContext("experimental-webgl", options);
        break;
      case "webgl2":
        context = canvas.getContext("webgl2", options);
        break;
      case "bitmaprenderer":
        context = canvas.getContext("bitmaprenderer", options);
        break;
      default:
        context = canvas.getContext("2d", options);
    }

    return context;
  } catch (error) {
    // Re-throw to allow higher-level error handling
    throw error;
  }
}

/**
 * Sets up high DPI canvas rendering
 */
function setupHighDPI(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  pixelRatio: number = getPixelRatio()
): void {
  // Set actual size in memory (scaled for high DPI)
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  // Set display size (CSS pixels)
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Scale the context so drawings are correct size
  context.scale(pixelRatio, pixelRatio);
}

/**
 * Extracts canvas content description for accessibility
 */
function extractCanvasContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenProp = (children.props as any)?.children;
    return childrenProp ? extractCanvasContent(childrenProp) : "";
  }
  if (Array.isArray(children)) {
    return children.map(extractCanvasContent).join(" ");
  }
  return "";
}

/**
 * Fire analytics tracking for canvas interactions
 */
function fireCanvasAnalytics(
  analyticsId: string,
  action: string,
  dimensions?: CanvasDimensions,
  contextType?: CanvasContextType,
  interactionType?: "mouse" | "touch" | "keyboard"
): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", action, {
        event_category: "canvas",
        event_label: analyticsId,
        canvas_width: dimensions?.width,
        canvas_height: dimensions?.height,
        canvas_pixel_ratio: dimensions?.pixelRatio,
        canvas_context_type: contextType,
        interaction_type: interactionType,
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Canvas analytics tracking failed:", error);
    }
  }
}

// =============================================================================
// UI COMPONENTS
// =============================================================================

/**
 * Loading indicator for canvas initialization
 */
function CanvasLoading(): React.ReactElement {
  return (
    <div className="canvas__loading" role="status" aria-label="Canvas loading">
      <div className="canvas__loading-spinner">
        <svg
          className="canvas__loading-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="canvas__loading-track"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.25"
          />
          <path
            className="canvas__loading-indicator"
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="canvas__loading-text">Initializing canvas...</span>
    </div>
  );
}

/**
 * Error display for canvas initialization failures
 */
function CanvasError(): React.ReactElement {
  return (
    <div className="canvas__error" role="alert">
      <div className="canvas__error-icon">⚠️</div>
      <div className="canvas__error-content">
        <p className="canvas__error-title">Canvas Error</p>
        <p className="canvas__error-message">
          Unable to initialize canvas. Your browser may not support the
          requested features.
        </p>
      </div>
    </div>
  );
}

/**
 * Debug overlay showing canvas information
 */
function CanvasDebugOverlay({
  dimensions,
  contextType,
  active,
  disabled,
}: {
  dimensions?: CanvasDimensions;
  contextType?: CanvasContextType;
  active?: boolean;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <div className="canvas__debug-overlay" data-testid="canvas-debug-overlay">
      <div className="canvas__debug-info">
        <div className="canvas__debug-section">
          <strong>Dimensions:</strong> {dimensions?.width || 0} ×{" "}
          {dimensions?.height || 0}
        </div>
        <div className="canvas__debug-section">
          <strong>Pixel Ratio:</strong> {dimensions?.pixelRatio || 1}
        </div>
        <div className="canvas__debug-section">
          <strong>Context:</strong> {contextType || "2d"}
        </div>
        <div className="canvas__debug-section">
          <strong>State:</strong>{" "}
          {disabled ? "Disabled" : active ? "Active" : "Inactive"}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Universal canvas component with context management, drawing utilities, and comprehensive analytics.
 * Supports server-side and client-side rendering with advanced canvas features.
 *
 * ⚠️ Warning: Canvas-specific props are only meaningful for <canvas> elements.
 * When using with other elements via the 'as' prop, these attributes may be invalid.
 */
const CanvasComponent = React.forwardRef<CanvasRef, CanvasProps>(
  (props, ref) => {
    const {
      width = 300,
      height = 150,
      dimensions,
      variant = "default",
      contextType = "2d",
      active = false,
      loading = false,
      disabled = false,
      enableHighDPI = true,
      preserveDrawingBuffer = false,
      alpha = true,
      antialias = true,
      debug = false,
      autoResize = false,
      maxWidth,
      maxHeight,
      analyticsId,
      onAnalytics,
      onClick,
      onDrawStart,
      onDrawing,
      onDrawEnd,
      onContextReady,
      onResize,
      alt,
      ariaLabel,
      description,
      as: Component = "canvas",
      isClient = false,
      isMemoized = false,
      children,
      className,
      style,
      ...rest
    } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<RenderingContext | null>(null);
    const [isContextReady, setIsContextReady] = useState(false);
    const [contextError, setContextError] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>(
      () => dimensions || { width, height, pixelRatio: 1 }
    );

    const asElement = typeof Component === "string" ? Component : "unknown";
    const hasAnalytics = analyticsId || onAnalytics;
    const contentDescription = extractCanvasContent(children);

    // Runtime validation for development - warns about invalid prop usage
    useMemo(() => {
      validatePolymorphicProps(
        "Canvas",
        asElement,
        { width, height },
        ELEMENT_CONFIGS.CANVAS || {
          element: "canvas",
          specificProps: ["width", "height"],
          description: "Canvas-specific sizing and context properties",
        }
      );
    }, [asElement, width, height]);

    // Initialize canvas context
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || contextRef.current) return;

      // Skip context initialization for non-canvas elements (polymorphic rendering)
      if (asElement !== "canvas") {
        setIsContextReady(true);
        return;
      }

      // Ensure canvas element has getContext method (for test environments)
      if (typeof canvas.getContext !== "function") {
        console.warn("Canvas element does not have getContext method");
        setContextError(true);
        return;
      }

      try {
        const context = initializeContext(canvas, contextType, {
          alpha,
          antialias,
          preserveDrawingBuffer,
        });

        if (!context) {
          setContextError(true);
          return;
        }

        contextRef.current = context;

        // Setup high DPI rendering for 2D context
        if (
          contextType === "2d" &&
          enableHighDPI &&
          (context instanceof CanvasRenderingContext2D ||
            (typeof CanvasRenderingContext2D === "undefined" && context))
        ) {
          const dims = dimensions || { width, height };
          const pixelRatio = getPixelRatio();
          setupHighDPI(
            canvas,
            context as CanvasRenderingContext2D,
            dims.width,
            dims.height,
            pixelRatio
          );

          setCanvasDimensions({
            ...dims,
            pixelRatio,
          });
        }

        setIsContextReady(true);
        onContextReady?.(context, canvas);
      } catch (error) {
        console.error("Failed to initialize canvas context:", error);
        setContextError(true);
      }
    }, [
      asElement,
      contextType,
      alpha,
      antialias,
      preserveDrawingBuffer,
      enableHighDPI,
      dimensions,
      width,
      height,
      onContextReady,
    ]);

    // Handle auto-resize
    useEffect(() => {
      if (!autoResize) return;

      const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.parentElement) return;

        const containerWidth = canvas.parentElement.clientWidth;
        const newDimensions = getResponsiveDimensions(
          width,
          height,
          maxWidth,
          maxHeight,
          containerWidth
        );

        setCanvasDimensions(newDimensions);
        onResize?.(newDimensions);
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Initial resize

      return () => window.removeEventListener("resize", handleResize);
    }, [autoResize, width, height, maxWidth, maxHeight, onResize]);

    // Analytics data
    const analyticsData = useMemo<CanvasAnalyticsData>(
      () => ({
        event: "interact",
        category: "canvas",
        label: analyticsId || "canvas-interaction",
        action: "click",
        dimensions: canvasDimensions,
        contextType,
        interactionType: "mouse",
      }),
      [analyticsId, canvasDimensions, contextType]
    );

    // Event handlers
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (disabled) return;

        if (hasAnalytics) {
          const enhancedData: CanvasAnalyticsData = {
            ...analyticsData,
            action: "click",
            interactionType: event.detail === 0 ? "keyboard" : "mouse",
          };

          if (onAnalytics) {
            onAnalytics(enhancedData);
          } else if (analyticsId) {
            fireCanvasAnalytics(
              analyticsId,
              "click",
              canvasDimensions,
              contextType,
              enhancedData.interactionType
            );
          }
        }

        onClick?.(event);
      },
      [
        disabled,
        hasAnalytics,
        analyticsData,
        onAnalytics,
        analyticsId,
        canvasDimensions,
        contextType,
        onClick,
      ]
    );

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (disabled || !active) return;

        setIsDrawing(true);
        onDrawStart?.(event);

        if (hasAnalytics && analyticsId) {
          fireCanvasAnalytics(
            analyticsId,
            "draw_start",
            canvasDimensions,
            contextType,
            "mouse"
          );
        }

        rest.onMouseDown?.(event);
      },
      [
        disabled,
        active,
        onDrawStart,
        hasAnalytics,
        analyticsId,
        canvasDimensions,
        contextType,
        rest,
      ]
    );

    const handleMouseMove = useCallback(
      (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (disabled || !active || !isDrawing) return;

        onDrawing?.(event);
        rest.onMouseMove?.(event);
      },
      [disabled, active, isDrawing, onDrawing, rest]
    );

    const handleMouseUp = useCallback(
      (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (disabled || !active) return;

        setIsDrawing(false);
        onDrawEnd?.(event);

        if (hasAnalytics && analyticsId && isDrawing) {
          fireCanvasAnalytics(
            analyticsId,
            "draw_end",
            canvasDimensions,
            contextType,
            "mouse"
          );
        }

        rest.onMouseUp?.(event);
      },
      [
        disabled,
        active,
        onDrawEnd,
        hasAnalytics,
        analyticsId,
        isDrawing,
        canvasDimensions,
        contextType,
        rest,
      ]
    );

    // Keyboard event handlers
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLCanvasElement>) => {
        if (disabled) return;

        // Handle Enter and Space keys as clicks
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();

          // Directly call onClick with keyboard event
          onClick?.(event as any);

          // Handle analytics for keyboard interaction
          if (hasAnalytics) {
            const enhancedData: CanvasAnalyticsData = {
              ...analyticsData,
              action: "click",
              interactionType: "keyboard",
            };

            if (onAnalytics) {
              onAnalytics(enhancedData);
            } else if (analyticsId) {
              fireCanvasAnalytics(
                analyticsId,
                "click",
                canvasDimensions,
                contextType,
                "keyboard"
              );
            }
          }
        }

        rest.onKeyDown?.(event);
      },
      [
        disabled,
        onClick,
        hasAnalytics,
        analyticsData,
        onAnalytics,
        analyticsId,
        canvasDimensions,
        contextType,
        rest,
      ]
    );

    // Touch event handlers
    const handleTouchStart = useCallback(
      (event: React.TouchEvent<HTMLCanvasElement>) => {
        if (disabled || !active) return;

        setIsDrawing(true);
        onDrawStart?.(event);

        if (hasAnalytics && analyticsId) {
          fireCanvasAnalytics(
            analyticsId,
            "draw_start",
            canvasDimensions,
            contextType,
            "touch"
          );
        }

        rest.onTouchStart?.(event);
      },
      [
        disabled,
        active,
        onDrawStart,
        hasAnalytics,
        analyticsId,
        canvasDimensions,
        contextType,
        rest,
      ]
    );

    const handleTouchMove = useCallback(
      (event: React.TouchEvent<HTMLCanvasElement>) => {
        if (disabled || !active || !isDrawing) return;

        onDrawing?.(event);
        rest.onTouchMove?.(event);
      },
      [disabled, active, isDrawing, onDrawing, rest]
    );

    const handleTouchEnd = useCallback(
      (event: React.TouchEvent<HTMLCanvasElement>) => {
        if (disabled || !active) return;

        setIsDrawing(false);
        onDrawEnd?.(event);

        if (hasAnalytics && analyticsId && isDrawing) {
          fireCanvasAnalytics(
            analyticsId,
            "draw_end",
            canvasDimensions,
            contextType,
            "touch"
          );
        }

        rest.onTouchEnd?.(event);
      },
      [
        disabled,
        active,
        onDrawEnd,
        hasAnalytics,
        analyticsId,
        isDrawing,
        canvasDimensions,
        contextType,
        rest,
      ]
    );

    // Enhanced props with accessibility and state management
    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref: ref || canvasRef,
        width: canvasDimensions.width,
        height: canvasDimensions.height,
        className: [
          "canvas",
          `canvas--${variant}`,
          active && "canvas--active",
          loading && "canvas--loading",
          disabled && "canvas--disabled",
          isDrawing && "canvas--drawing",
          debug && "canvas--debug",
          !isContextReady && "canvas--initializing",
          contextError && "canvas--error",
          className,
        ]
          .filter(Boolean)
          .join(" "),
        style: {
          ...style,
          pointerEvents: disabled ? "none" : style?.pointerEvents || "auto",
          touchAction: active ? "none" : style?.touchAction || "auto",
        },
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onKeyDown: handleKeyDown,
        tabIndex: disabled ? -1 : 0, // Make canvas focusable
        "aria-label": ariaLabel || alt || "Interactive canvas",
        "aria-describedby": description
          ? `${analyticsId || "canvas"}-description`
          : undefined,
        "data-variant": variant,
        "data-context-type": contextType,
        "data-active": active,
        "data-disabled": disabled,
        "data-loading": loading,
        "data-drawing": isDrawing,
        "data-analytics-id": analyticsId || undefined,
        "data-canvas-width": canvasDimensions.width,
        "data-canvas-height": canvasDimensions.height,
        "data-pixel-ratio": canvasDimensions.pixelRatio,
        "data-polymorphic-element":
          asElement !== "canvas" ? asElement : undefined,
        "data-element-validation":
          process.env.NODE_ENV === "development" && asElement !== "canvas"
            ? "warning"
            : undefined,
      }),
      [
        rest,
        ref,
        canvasDimensions,
        variant,
        active,
        loading,
        disabled,
        isDrawing,
        debug,
        isContextReady,
        contextError,
        className,
        style,
        handleClick,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleKeyDown,
        ariaLabel,
        alt,
        description,
        analyticsId,
        contextType,
        asElement,
      ]
    );

    // Render loading state
    if (loading) {
      return <CanvasLoading />;
    }

    // Render error state
    if (contextError) {
      return <CanvasError />;
    }

    // Base canvas element
    const canvasElement = <Component {...enhancedProps}>{children}</Component>;

    // Additional elements
    const descriptionElement = description && (
      <div
        id={`${analyticsId || "canvas"}-description`}
        className="canvas__description"
      >
        {description}
      </div>
    );

    const debugOverlay = debug && (
      <CanvasDebugOverlay
        dimensions={canvasDimensions}
        contextType={contextType}
        active={active}
        disabled={disabled}
      />
    );

    // Client-side rendering
    if (isClient) {
      const ClientComponent = isMemoized ? MemoizedCanvasClient : CanvasClient;

      return (
        <div className="canvas-wrapper">
          <Suspense fallback={canvasElement}>
            <ClientComponent
              {...props}
              active={active}
              disabled={disabled}
              loading={loading}
              ref={ref}
            >
              {children}
            </ClientComponent>
          </Suspense>
          {descriptionElement}
          {debugOverlay}
        </div>
      );
    }

    return (
      <div className="canvas-wrapper">
        {canvasElement}
        {descriptionElement}
        {debugOverlay}
      </div>
    );
  }
);

CanvasComponent.displayName = "Canvas";

// Export the server component
export const Canvas = CanvasComponent;

// Utility exports for advanced use cases
// eslint-disable-next-line react-refresh/only-export-components
export const CanvasUtils = {
  validateDimensions,
  getPixelRatio,
  getResponsiveDimensions,
  initializeContext,
  setupHighDPI,
  extractCanvasContent,
};

// For most use cases, the server component is sufficient
// For client-side memoization, use isClient=true with isMemoized=true
export default Canvas;
