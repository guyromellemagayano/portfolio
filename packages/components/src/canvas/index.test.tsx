import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Canvas, type CanvasProps } from ".";

// =============================================================================
// MOCKS & SETUP
// =============================================================================

// Mock window.gtag for analytics testing
const mockGtag = vi.fn();
Object.defineProperty(window, "gtag", {
  value: mockGtag,
  writable: true,
});

beforeEach(() => {
  vi.clearAllMocks();
  mockGtag.mockClear();
});

afterEach(() => {
  cleanup();
});

// =============================================================================
// CORE FUNCTIONALITY TESTS
// =============================================================================

describe("Canvas Component", () => {
  const defaultProps: CanvasProps = {
    width: 300,
    height: 200,
  };

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Canvas {...defaultProps} />);
      const canvas = screen.getByRole("img");
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveAttribute("width", "300");
      expect(canvas).toHaveAttribute("height", "200");
    });

    it("applies custom className and styles", () => {
      render(
        <Canvas
          {...defaultProps}
          className="custom-canvas"
          style={{ background: "red" }}
        />
      );

      const canvas = screen.getByRole("img");
      expect(canvas).toHaveClass("canvas", "custom-canvas");
      expect(canvas).toHaveStyle({ background: "red" });
    });

    it("renders with custom Component prop", () => {
      const CustomCanvas = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => <div {...props} ref={ref} data-custom="true" />);
      CustomCanvas.displayName = "CustomCanvas";

      render(<Canvas {...defaultProps} as={CustomCanvas} />);
      expect(screen.getByRole("img")).toHaveAttribute("data-custom", "true");
    });

    it("renders children correctly", () => {
      render(
        <Canvas {...defaultProps}>
          <div data-testid="canvas-child">Canvas content</div>
        </Canvas>
      );

      expect(screen.getByTestId("canvas-child")).toBeInTheDocument();
      expect(screen.getByTestId("canvas-child")).toHaveTextContent(
        "Canvas content"
      );
    });
  });

  describe("Canvas Properties", () => {
    it("sets width and height attributes", () => {
      render(<Canvas width={500} height={300} />);
      const canvas = screen.getByRole("img");
      expect(canvas).toHaveAttribute("width", "500");
      expect(canvas).toHaveAttribute("height", "300");
    });

    it("handles undefined width and height", () => {
      render(<Canvas />);
      const canvas = screen.getByRole("img");
      expect(canvas).not.toHaveAttribute("width");
      expect(canvas).not.toHaveAttribute("height");
    });

    it("applies all canvas-specific attributes", () => {
      render(
        <Canvas
          {...defaultProps}
          data-testid="canvas"
          id="test-canvas"
          title="Test Canvas"
        />
      );

      const canvas = screen.getByTestId("canvas");
      expect(canvas).toHaveAttribute("id", "test-canvas");
      expect(canvas).toHaveAttribute("title", "Test Canvas");
    });
  });

  describe("Event Handling", () => {
    it("handles click events", () => {
      const onCanvasClick = vi.fn();
      render(<Canvas {...defaultProps} onCanvasClick={onCanvasClick} />);

      const canvas = screen.getByRole("img");
      fireEvent.click(canvas);

      expect(onCanvasClick).toHaveBeenCalledTimes(1);
      expect(onCanvasClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "click",
        })
      );
    });

    it("handles original onClick events", () => {
      const onClick = vi.fn();
      render(<Canvas {...defaultProps} onClick={onClick} />);

      const canvas = screen.getByRole("img");
      fireEvent.click(canvas);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("handles both custom and original click events", () => {
      const onCanvasClick = vi.fn();
      const onClick = vi.fn();
      render(
        <Canvas
          {...defaultProps}
          onCanvasClick={onCanvasClick}
          onClick={onClick}
        />
      );

      const canvas = screen.getByRole("img");
      fireEvent.click(canvas);

      expect(onCanvasClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("handles mouse events", () => {
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();
      render(
        <Canvas
          {...defaultProps}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      );

      const canvas = screen.getByRole("img");
      fireEvent.mouseEnter(canvas);
      fireEvent.mouseLeave(canvas);

      expect(onMouseEnter).toHaveBeenCalledTimes(1);
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe("Analytics", () => {
    it("tracks analytics on click with gtag", () => {
      render(<Canvas {...defaultProps} analyticsId="test-canvas" />);
      const canvas = screen.getByRole("img");

      fireEvent.click(canvas);

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "canvas",
        event_label: "test-canvas",
        canvas_width: 300,
        canvas_height: 200,
      });
    });

    it("uses custom analytics function", () => {
      const onAnalytics = vi.fn();
      render(
        <Canvas
          {...defaultProps}
          analyticsId="test-canvas"
          onAnalytics={onAnalytics}
        />
      );

      const canvas = screen.getByRole("img");
      fireEvent.click(canvas);

      expect(onAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "canvas",
        label: "test-canvas",
        action: "interact",
        canvasWidth: 300,
        canvasHeight: 200,
      });
    });

    it("handles analytics errors gracefully", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      mockGtag.mockImplementation(() => {
        throw new Error("Analytics error");
      });

      render(<Canvas {...defaultProps} analyticsId="test" />);
      fireEvent.click(screen.getByRole("img"));

      // Should not crash
      expect(screen.getByRole("img")).toBeInTheDocument();
      consoleSpy.mockRestore();
    });

    it("does not track analytics when no analyticsId provided", () => {
      render(<Canvas {...defaultProps} />);
      const canvas = screen.getByRole("img");

      fireEvent.click(canvas);

      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe("Polymorphic Validation", () => {
    it("shows validation warning in development for non-canvas element", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const CustomCanvas = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => <div {...props} ref={ref} />);
      CustomCanvas.displayName = "CustomCanvas";

      render(
        <Canvas {...defaultProps} as={CustomCanvas} data-testid="custom" />
      );

      expect(screen.getByTestId("custom")).toHaveAttribute(
        "data-element-validation",
        "warning"
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("does not show validation warning in production", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const CustomCanvas = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => <div {...props} ref={ref} />);
      CustomCanvas.displayName = "CustomCanvas";

      render(
        <Canvas {...defaultProps} as={CustomCanvas} data-testid="custom" />
      );

      expect(screen.getByTestId("custom")).not.toHaveAttribute(
        "data-element-validation"
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("sets polymorphic element data attribute", () => {
      const CustomCanvas = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => <div {...props} ref={ref} />);
      CustomCanvas.displayName = "CustomCanvas";

      render(
        <Canvas {...defaultProps} as={CustomCanvas} data-testid="custom" />
      );

      expect(screen.getByTestId("custom")).toHaveAttribute(
        "data-polymorphic-element",
        "unknown"
      );
    });
  });

  describe("Accessibility", () => {
    it("has default aria-label", () => {
      render(<Canvas {...defaultProps} />);
      const canvas = screen.getByRole("img");
      expect(canvas).toHaveAttribute("aria-label", "Canvas element");
    });

    it("uses custom aria-label when provided", () => {
      render(<Canvas {...defaultProps} aria-label="Custom canvas" />);
      const canvas = screen.getByRole("img");
      expect(canvas).toHaveAttribute("aria-label", "Custom canvas");
    });

    it("has img role", () => {
      render(<Canvas {...defaultProps} />);
      const canvas = screen.getByRole("img");
      expect(canvas).toBeInTheDocument();
    });

    it("supports data attributes for testing", () => {
      render(
        <Canvas
          {...defaultProps}
          data-testid="canvas"
          data-analytics-id="test-canvas"
        />
      );

      const canvas = screen.getByTestId("canvas");
      expect(canvas).toHaveAttribute("data-analytics-id", "test-canvas");
    });
  });

  describe("Client-Side Rendering", () => {
    it("renders with isClient=true", () => {
      render(<Canvas {...defaultProps} isClient />);
      const canvas = screen.getByRole("img");
      expect(canvas).toBeInTheDocument();
    });

    it("renders with isClient=true and isMemoized=true", () => {
      render(<Canvas {...defaultProps} isClient isMemoized />);
      const canvas = screen.getByRole("img");
      expect(canvas).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles null ref", () => {
      render(<Canvas {...defaultProps} ref={null} />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Canvas {...defaultProps}>{undefined}</Canvas>);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("handles empty string children", () => {
      render(<Canvas {...defaultProps}>{""}</Canvas>);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("handles complex children", () => {
      render(
        <Canvas {...defaultProps}>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Canvas>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });

    it("handles zero dimensions", () => {
      render(<Canvas width={0} height={0} />);
      const canvas = screen.getByRole("img");
      expect(canvas).toHaveAttribute("width", "0");
      expect(canvas).toHaveAttribute("height", "0");
    });

    it("handles negative dimensions", () => {
      render(<Canvas width={-100} height={-50} />);
      const canvas = screen.getByRole("img");
      expect(canvas).toHaveAttribute("width", "-100");
      expect(canvas).toHaveAttribute("height", "-50");
    });
  });
});

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

describe("Canvas Component Integration", () => {
  it("works with multiple canvas elements", () => {
    render(
      <div>
        <Canvas width={100} height={100} analyticsId="canvas-1" />
        <Canvas width={200} height={200} analyticsId="canvas-2" />
      </div>
    );

    const canvasElements = screen.getAllByRole("img");
    expect(canvasElements).toHaveLength(2);
  });

  it("handles custom Component prop", () => {
    const CustomCanvas = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >((props, ref) => <div {...props} ref={ref} data-custom="true" />);
    CustomCanvas.displayName = "CustomCanvas";

    render(<Canvas width={100} height={100} as={CustomCanvas} />);
    expect(screen.getByRole("img")).toHaveAttribute("data-custom", "true");
  });

  it("handles complex analytics scenario", () => {
    const onAnalytics = vi.fn();
    render(
      <Canvas
        width={300}
        height={200}
        analyticsId="complex-canvas"
        onAnalytics={onAnalytics}
      />
    );

    const canvas = screen.getByRole("img");
    fireEvent.click(canvas);
    fireEvent.mouseEnter(canvas);
    fireEvent.mouseLeave(canvas);

    // Only click should trigger analytics
    expect(onAnalytics).toHaveBeenCalledTimes(1);
  });

  it("handles server-side rendering without client features", () => {
    render(<Canvas width={300} height={200} analyticsId="server-canvas" />);

    const canvas = screen.getByRole("img");
    expect(canvas).toHaveAttribute("width", "300");
    expect(canvas).toHaveAttribute("height", "200");
    expect(canvas).toHaveAttribute("data-analytics-id", "server-canvas");
  });
});

export {};
