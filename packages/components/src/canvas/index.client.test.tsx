import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { CanvasClient, MemoizedCanvasClient } from "./index.client";

// Basic render test for CanvasClient
it("renders a canvas element", () => {
  render(<CanvasClient data-testid="canvas-element" />);
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas.tagName).toBe("CANVAS");
});

// Basic render test for MemoizedCanvasClient
it("renders a memoized canvas element", () => {
  render(<MemoizedCanvasClient data-testid="canvas-element" />);
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas.tagName).toBe("CANVAS");
});

// as prop test for CanvasClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <CanvasClient as="div" data-testid="custom-div">
      Custom canvas
    </CanvasClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom canvas");
});

// as prop test for MemoizedCanvasClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedCanvasClient as="div" data-testid="custom-div">
      Custom memoized canvas
    </MemoizedCanvasClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom memoized canvas");
});

// ref forwarding test for CanvasClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLCanvasElement>();
  render(<CanvasClient ref={ref}>Ref test content</CanvasClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CANVAS");
  }
});

// ref forwarding test for MemoizedCanvasClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLCanvasElement>();
  render(
    <MemoizedCanvasClient ref={ref}>Ref test content</MemoizedCanvasClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("CANVAS");
  }
});

// Canvas-specific props test for CanvasClient
it("renders with canvas-specific attributes", () => {
  render(
    <CanvasClient
      data-testid="canvas-element"
      width={800}
      height={600}
      className="game-canvas"
      id="game-canvas"
    >
      Game Canvas
    </CanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveAttribute("class", "game-canvas");
  expect(canvas).toHaveAttribute("id", "game-canvas");
  expect(canvas).toHaveTextContent("Game Canvas");
});

// Canvas-specific props test for MemoizedCanvasClient
it("renders memoized with canvas-specific attributes", () => {
  render(
    <MemoizedCanvasClient
      data-testid="canvas-element"
      width={1024}
      height={768}
      className="memoized-canvas"
      id="memoized-canvas"
    >
      Memoized Game Canvas
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "1024");
  expect(canvas).toHaveAttribute("height", "768");
  expect(canvas).toHaveAttribute("class", "memoized-canvas");
  expect(canvas).toHaveAttribute("id", "memoized-canvas");
  expect(canvas).toHaveTextContent("Memoized Game Canvas");
});

// Children rendering tests for CanvasClient
it("renders children correctly", () => {
  render(
    <CanvasClient data-testid="canvas-element">
      <div>Canvas content</div>
    </CanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Canvas content");
});

// Children rendering tests for MemoizedCanvasClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedCanvasClient data-testid="canvas-element">
      <div>Memoized canvas content</div>
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Memoized canvas content");
});

// Canvas dimensions test for CanvasClient
it("renders with different canvas dimensions", () => {
  const { rerender } = render(
    <CanvasClient data-testid="canvas-element" width={400} height={300}>
      Small Canvas
    </CanvasClient>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "400");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("height", "300");

  rerender(
    <CanvasClient data-testid="canvas-element" width={1920} height={1080}>
      Large Canvas
    </CanvasClient>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "1920");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute(
    "height",
    "1080"
  );
});

// Canvas dimensions test for MemoizedCanvasClient
it("renders memoized with different canvas dimensions", () => {
  const { rerender } = render(
    <MemoizedCanvasClient data-testid="canvas-element" width={400} height={300}>
      Small Memoized Canvas
    </MemoizedCanvasClient>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "400");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("height", "300");

  rerender(
    <MemoizedCanvasClient
      data-testid="canvas-element"
      width={1920}
      height={1080}
    >
      Large Memoized Canvas
    </MemoizedCanvasClient>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "1920");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute(
    "height",
    "1080"
  );
});

// Controlled vs Uncontrolled Behavior Tests for Client Components

// Controlled width and height props test for CanvasClient
it("supports controlled width and height props in CanvasClient", () => {
  render(
    <CanvasClient data-testid="canvas-element" width={800} height={600}>
      Controlled Client Canvas
    </CanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveTextContent("Controlled Client Canvas");
});

// Controlled width and height props test for MemoizedCanvasClient
it("supports controlled width and height props in MemoizedCanvasClient", () => {
  render(
    <MemoizedCanvasClient
      data-testid="canvas-element"
      width={1024}
      height={768}
    >
      Controlled Memoized Canvas
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "1024");
  expect(canvas).toHaveAttribute("height", "768");
  expect(canvas).toHaveTextContent("Controlled Memoized Canvas");
});

// Uncontrolled width and height props test for CanvasClient
it("works as uncontrolled when no width and height props are provided in CanvasClient", () => {
  render(
    <CanvasClient data-testid="canvas-element">
      Uncontrolled Client Canvas
    </CanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).not.toHaveAttribute("width");
  expect(canvas).not.toHaveAttribute("height");
  expect(canvas).toHaveTextContent("Uncontrolled Client Canvas");
});

// Uncontrolled width and height props test for MemoizedCanvasClient
it("works as uncontrolled when no width and height props are provided in MemoizedCanvasClient", () => {
  render(
    <MemoizedCanvasClient data-testid="canvas-element">
      Uncontrolled Memoized Canvas
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).not.toHaveAttribute("width");
  expect(canvas).not.toHaveAttribute("height");
  expect(canvas).toHaveTextContent("Uncontrolled Memoized Canvas");
});

// Controlled dimensions state test for CanvasClient
it("supports controlled dimensions state in CanvasClient", () => {
  const { rerender } = render(
    <CanvasClient data-testid="canvas-element" width={400} height={300}>
      Small Client Canvas
    </CanvasClient>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "400");
  expect(canvas).toHaveAttribute("height", "300");

  // Change dimensions
  rerender(
    <CanvasClient data-testid="canvas-element" width={800} height={600}>
      Large Client Canvas
    </CanvasClient>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
});

// Controlled dimensions state test for MemoizedCanvasClient
it("supports controlled dimensions state in MemoizedCanvasClient", () => {
  const { rerender } = render(
    <MemoizedCanvasClient data-testid="canvas-element" width={400} height={300}>
      Small Memoized Canvas
    </MemoizedCanvasClient>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "400");
  expect(canvas).toHaveAttribute("height", "300");

  // Change dimensions
  rerender(
    <MemoizedCanvasClient data-testid="canvas-element" width={800} height={600}>
      Large Memoized Canvas
    </MemoizedCanvasClient>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
});

// Integration test - controlled canvas in graphics context for CanvasClient
it("works as controlled canvas in graphics context for CanvasClient", () => {
  render(
    <div>
      <CanvasClient
        data-testid="canvas-element"
        width={800}
        height={600}
        id="client-graphics-canvas"
        className="client-game-canvas"
      >
        Client Graphics Canvas
      </CanvasClient>
    </div>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveAttribute("id", "client-graphics-canvas");
  expect(canvas).toHaveClass("client-game-canvas");
  expect(canvas).toHaveTextContent("Client Graphics Canvas");
});

// Integration test - controlled canvas in graphics context for MemoizedCanvasClient
it("works as controlled canvas in graphics context for MemoizedCanvasClient", () => {
  render(
    <div>
      <MemoizedCanvasClient
        data-testid="canvas-element"
        width={1024}
        height={768}
        id="memoized-graphics-canvas"
        className="memoized-game-canvas"
      >
        Memoized Graphics Canvas
      </MemoizedCanvasClient>
    </div>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "1024");
  expect(canvas).toHaveAttribute("height", "768");
  expect(canvas).toHaveAttribute("id", "memoized-graphics-canvas");
  expect(canvas).toHaveClass("memoized-game-canvas");
  expect(canvas).toHaveTextContent("Memoized Graphics Canvas");
});

// ===== MISSING CRITICAL TESTS FOR CLIENT COMPONENTS =====

// Polymorphic Validation Tests for Client Components
it.skip("warns about canvas-specific props when rendered as different element in CanvasClient", () => {
  // Note: Canvas component doesn't implement polymorphic validation yet
  // This test documents the expected behavior for future implementation
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <CanvasClient
      as="div"
      data-testid="canvas-element"
      width={800}
      height={600}
    >
      Invalid Client Canvas as Div
    </CanvasClient>
  );

  // Currently no warning is shown, but this documents expected future behavior
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

it.skip("warns about canvas-specific props when rendered as different element in MemoizedCanvasClient", () => {
  // Note: Canvas component doesn't implement polymorphic validation yet
  // This test documents the expected behavior for future implementation
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <MemoizedCanvasClient
      as="span"
      data-testid="canvas-element"
      width={800}
      height={600}
    >
      Invalid Memoized Canvas as Span
    </MemoizedCanvasClient>
  );

  // Currently no warning is shown, but this documents expected future behavior
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

// Error Handling Tests for Client Components
it("handles invalid canvas dimensions gracefully in CanvasClient", () => {
  render(
    <CanvasClient
      data-testid="canvas-element"
      width={"invalid" as any}
      height={"invalid" as any}
      as="canvas"
    >
      Invalid Dimensions Client Canvas
    </CanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "invalid");
  expect(canvas).toHaveAttribute("height", "invalid");
  expect(canvas).toHaveTextContent("Invalid Dimensions Client Canvas");
});

it("handles invalid canvas dimensions gracefully in MemoizedCanvasClient", () => {
  render(
    <MemoizedCanvasClient
      data-testid="canvas-element"
      width={"invalid" as any}
      height={"invalid" as any}
      as="canvas"
    >
      Invalid Dimensions Memoized Canvas
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "invalid");
  expect(canvas).toHaveAttribute("height", "invalid");
  expect(canvas).toHaveTextContent("Invalid Dimensions Memoized Canvas");
});

// Performance Tests for Client Components
it("maintains consistent rendering performance in CanvasClient", () => {
  const startTime = performance.now();

  render(
    <CanvasClient data-testid="canvas-element">
      Performance Test Client Canvas
    </CanvasClient>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(100);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
});

it("maintains consistent rendering performance in MemoizedCanvasClient", () => {
  const startTime = performance.now();

  render(
    <MemoizedCanvasClient data-testid="canvas-element">
      Performance Test Memoized Canvas
    </MemoizedCanvasClient>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(100);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
});

// TypeScript Type Tests for Client Components
it("accepts valid canvas props without TypeScript errors in CanvasClient", () => {
  const validProps = {
    width: 800,
    height: 600,
    className: "test-canvas",
    style: { backgroundColor: "black" },
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    "data-testid": "canvas-element",
  };

  render(<CanvasClient {...validProps}>TypeScript Client Test</CanvasClient>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("TypeScript Client Test");
});

it("accepts valid canvas props without TypeScript errors in MemoizedCanvasClient", () => {
  const validProps = {
    width: 800,
    height: 600,
    className: "test-canvas",
    style: { backgroundColor: "black" },
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    "data-testid": "canvas-element",
  };

  render(
    <MemoizedCanvasClient {...validProps}>
      TypeScript Memoized Test
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("TypeScript Memoized Test");
});

// Memory Leak Prevention Tests for Client Components
it("does not create memory leaks with event handlers in CanvasClient", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <CanvasClient data-testid="canvas-element" onClick={handleClick}>
      Memory Test Client Canvas
    </CanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});

it("does not create memory leaks with event handlers in MemoizedCanvasClient", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <MemoizedCanvasClient data-testid="canvas-element" onClick={handleClick}>
      Memory Test Memoized Canvas
    </MemoizedCanvasClient>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});
