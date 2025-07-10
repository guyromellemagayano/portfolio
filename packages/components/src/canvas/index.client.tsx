"use client";

import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CanvasContextType,
  CanvasDimensions,
  CanvasProps,
  CanvasRef,
} from "./index";

/**
 * Gets device pixel ratio for high DPI displays
 */
function getPixelRatio(): number {
  return window.devicePixelRatio || 1;
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
    console.warn(`Failed to initialize ${contextType} context:`, error);
    return null;
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
 * Client-side Canvas component with full interactivity and context management
 */
export const CanvasClient = forwardRef<CanvasRef, CanvasProps>(
  (
    {
      width = 300,
      height = 150,
      dimensions,
      contextType = "2d",
      enableHighDPI = true,
      preserveDrawingBuffer = false,
      alpha = true,
      antialias = true,
      active = false,
      disabled = false,
      onContextReady,
      onDrawStart,
      onDrawing,
      onDrawEnd,
      onResize,
      onClick,
      as: Component = "canvas",
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<RenderingContext | null>(null);
    const [isContextReady, setIsContextReady] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>(
      () => dimensions || { width, height, pixelRatio: getPixelRatio() }
    );

    // Initialize canvas context
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || contextRef.current) return;

      const asElement = typeof Component === "string" ? Component : "unknown";

      // Skip context initialization for non-canvas elements (polymorphic rendering)
      if (asElement !== "canvas") {
        return;
      }

      // Ensure canvas element has getContext method (for test environments)
      if (typeof canvas.getContext !== "function") {
        console.warn("Canvas element does not have getContext method");
        return;
      }

      const context = initializeContext(canvas, contextType, {
        alpha,
        antialias,
        preserveDrawingBuffer,
      });

      if (!context) {
        console.warn("Failed to initialize canvas context");
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
    }, [
      Component,
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

    // Handle resize events
    useEffect(() => {
      const handleResize = () => {
        if (dimensions || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const newDimensions: CanvasDimensions = {
          width,
          height,
          pixelRatio: getPixelRatio(),
        };

        setCanvasDimensions(newDimensions);
        onResize?.(newDimensions);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [dimensions, width, height, onResize]);

    // Drawing event handlers
    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (disabled || !active) return;

        setIsDrawing(true);
        onDrawStart?.(event);
        rest.onMouseDown?.(event);
      },
      [disabled, active, onDrawStart, rest]
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
        rest.onMouseUp?.(event);
      },
      [disabled, active, onDrawEnd, rest]
    );

    // Touch event handlers
    const handleTouchStart = useCallback(
      (event: React.TouchEvent<HTMLCanvasElement>) => {
        if (disabled || !active) return;

        event.preventDefault(); // Prevent scrolling while drawing
        setIsDrawing(true);
        onDrawStart?.(event);
        rest.onTouchStart?.(event);
      },
      [disabled, active, onDrawStart, rest]
    );

    const handleTouchMove = useCallback(
      (event: React.TouchEvent<HTMLCanvasElement>) => {
        if (disabled || !active || !isDrawing) return;

        event.preventDefault(); // Prevent scrolling while drawing
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
        rest.onTouchEnd?.(event);
      },
      [disabled, active, onDrawEnd, rest]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (disabled) return;
        onClick?.(event);
      },
      [disabled, onClick]
    );

    const enhancedProps = {
      ...rest,
      ref: ref || canvasRef,
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      className,
      style: {
        ...style,
        touchAction: active ? "none" : "auto", // Prevent default touch behavior when drawing
        pointerEvents: disabled ? "none" : "auto",
      },
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      "data-context-ready": isContextReady,
      "data-drawing": isDrawing,
    };

    return <Component {...enhancedProps}>{children}</Component>;
  }
);

CanvasClient.displayName = "CanvasClient";

/**
 * Memoized version of the Canvas client component
 */
export const MemoizedCanvasClient = memo(CanvasClient);
MemoizedCanvasClient.displayName = "MemoizedCanvasClient";
