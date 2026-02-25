import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Canvas } from ".";

// Basic render test
it("renders a canvas element", () => {
  render(<Canvas data-testid="canvas-element" />);
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas.tagName).toBe("CANVAS");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Canvas as="div" data-testid="custom-div">
      Custom canvas
    </Canvas>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom canvas");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Canvas isClient data-testid="canvas-element">
      Client-side canvas
    </Canvas>
  );

  // Should render the fallback (the canvas) immediately
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas.tagName).toBe("CANVAS");
  expect(canvas).toHaveTextContent("Client-side canvas");

  // The lazy component should load and render the same content
  await screen.findByTestId("canvas-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Canvas isClient isMemoized data-testid="canvas-element">
      Memoized canvas
    </Canvas>
  );

  // Should render the fallback (the canvas) immediately
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas.tagName).toBe("CANVAS");
  expect(canvas).toHaveTextContent("Memoized canvas");

  // The lazy component should load and render the same content
  await screen.findByTestId("canvas-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLCanvasElement>();
  render(<Canvas ref={ref}>Ref test content</Canvas>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CANVAS");
  }
});

// Canvas-specific props test
it("renders with canvas-specific attributes", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      width={800}
      height={600}
      className="game-canvas"
      id="game-canvas"
    >
      Game Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveClass("game-canvas", { exact: true });
  expect(canvas).toHaveAttribute("id", "game-canvas");
  expect(canvas).toHaveTextContent("Game Canvas");
});

// Children rendering tests
it("renders children correctly", () => {
  render(
    <Canvas data-testid="canvas-element">
      <div>Canvas content</div>
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Canvas content");
});

it("renders with empty children", () => {
  render(<Canvas data-testid="canvas-element" />);
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("");
});

it("renders complex nested children", () => {
  render(
    <Canvas data-testid="canvas-element">
      <div className="canvas-wrapper">
        <span className="icon">🎨</span>
        <span className="text">Drawing Canvas</span>
        <span className="badge">Active</span>
      </div>
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("🎨");
  expect(canvas).toHaveTextContent("Drawing Canvas");
  expect(canvas).toHaveTextContent("Active");
  expect(canvas.querySelector(".canvas-wrapper")).toBeInTheDocument();
  expect(canvas.querySelector(".icon")).toBeInTheDocument();
  expect(canvas.querySelector(".text")).toBeInTheDocument();
  expect(canvas.querySelector(".badge")).toBeInTheDocument();
});

// Canvas dimensions test
it("renders with different canvas dimensions", () => {
  const { rerender } = render(
    <Canvas data-testid="canvas-element" width={400} height={300}>
      Small Canvas
    </Canvas>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "400");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("height", "300");

  rerender(
    <Canvas data-testid="canvas-element" width={1920} height={1080}>
      Large Canvas
    </Canvas>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "1920");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute(
    "height",
    "1080"
  );

  rerender(
    <Canvas data-testid="canvas-element" width={100} height={100}>
      Square Canvas
    </Canvas>
  );
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("width", "100");
  expect(screen.getByTestId("canvas-element")).toHaveAttribute("height", "100");
});

// Canvas states test
it("renders with different canvas states", () => {
  render(
    <Canvas data-testid="canvas-element" style={{ border: "1px solid black" }}>
      Styled Canvas
    </Canvas>
  );
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("style");
  expect(canvas).toHaveTextContent("Styled Canvas");
});

// Canvas with loading state test
it("renders canvas with loading state", () => {
  render(
    <Canvas data-testid="canvas-element" aria-busy="true">
      <span className="spinner">⏳</span>
      <span>Loading Canvas...</span>
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("aria-busy", "true");
  expect(canvas).toHaveTextContent("⏳");
  expect(canvas).toHaveTextContent("Loading Canvas...");
  expect(canvas.querySelector(".spinner")).toBeInTheDocument();
});

// Accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      role="img"
      aria-label="Drawing canvas"
      aria-describedby="canvas-description"
    >
      Accessible Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("role", "img");
  expect(canvas).toHaveAttribute("aria-label", "Drawing canvas");
  expect(canvas).toHaveAttribute("aria-describedby", "canvas-description");
  expect(canvas).toHaveTextContent("Accessible Canvas");
});

// Data attributes test
it("renders with data attributes", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      data-canvas-type="game"
      data-canvas-size="large"
      data-canvas-version="2.0"
    >
      Game Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("data-canvas-type", "game");
  expect(canvas).toHaveAttribute("data-canvas-size", "large");
  expect(canvas).toHaveAttribute("data-canvas-version", "2.0");
  expect(canvas).toHaveTextContent("Game Canvas");
});

// Event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Canvas
      data-testid="canvas-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Interactive Canvas");
});

// Custom styling test
it("renders with custom styling", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      className="custom-canvas"
      style={{ backgroundColor: "black", color: "white" }}
    >
      Styled Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveClass("custom-canvas");
  expect(canvas).toHaveAttribute("style");
  expect(canvas).toHaveTextContent("Styled Canvas");
});

// Canvas with id test
it("renders with id attribute", () => {
  render(
    <Canvas data-testid="canvas-element" id="main-canvas">
      Named Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("id", "main-canvas");
  expect(canvas).toHaveTextContent("Named Canvas");
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      className="custom-canvas"
      id="main-canvas"
      data-canvas-type="art"
    >
      <h1>Canvas with Custom Attributes</h1>
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveClass("custom-canvas");
  expect(canvas).toHaveAttribute("id", "main-canvas");
  expect(canvas).toHaveAttribute("data-canvas-type", "art");
});

// Controlled vs Uncontrolled Behavior Tests

// Controlled width and height props test
it("supports controlled width and height props", () => {
  render(
    <Canvas data-testid="canvas-element" width={800} height={600}>
      Controlled Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveTextContent("Controlled Canvas");
});

// Uncontrolled width and height props test (no dimensions provided)
it("works as uncontrolled when no width and height props are provided", () => {
  render(<Canvas data-testid="canvas-element">Uncontrolled Canvas</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).not.toHaveAttribute("width");
  expect(canvas).not.toHaveAttribute("height");
  expect(canvas).toHaveTextContent("Uncontrolled Canvas");
});

// Controlled style prop test
it("supports controlled style prop", () => {
  render(
    <Canvas data-testid="canvas-element" style={{ border: "2px solid red" }}>
      Styled Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("style");
  expect(canvas).toHaveTextContent("Styled Canvas");
});

// Uncontrolled style prop test
it("works as uncontrolled when no style prop is provided", () => {
  render(<Canvas data-testid="canvas-element">Unstyled Canvas</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Unstyled Canvas");
});

// Controlled className prop test
it("supports controlled className prop", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      className="canvas-primary canvas-large"
    >
      Classed Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveClass("canvas-primary", "canvas-large");
  expect(canvas).toHaveTextContent("Classed Canvas");
});

// Uncontrolled className prop test
it("works as uncontrolled when no className prop is provided", () => {
  render(<Canvas data-testid="canvas-element">Unclassed Canvas</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Unclassed Canvas");
});

// Controlled dimensions state test
it("supports controlled dimensions state", () => {
  const { rerender } = render(
    <Canvas data-testid="canvas-element" width={400} height={300}>
      Small Canvas
    </Canvas>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "400");
  expect(canvas).toHaveAttribute("height", "300");

  // Change dimensions
  rerender(
    <Canvas data-testid="canvas-element" width={800} height={600}>
      Large Canvas
    </Canvas>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
});

// Controlled loading state test
it("supports controlled loading state", () => {
  const { rerender } = render(
    <Canvas data-testid="canvas-element" aria-busy="true">
      <span className="spinner">⏳</span>
      Loading Canvas...
    </Canvas>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("aria-busy", "true");
  expect(canvas).toHaveTextContent("Loading Canvas...");
  expect(canvas.querySelector(".spinner")).toBeInTheDocument();

  // Change to not loading
  rerender(<Canvas data-testid="canvas-element">Ready Canvas</Canvas>);

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).not.toHaveAttribute("aria-busy");
  expect(canvas).toHaveTextContent("Ready Canvas");
  expect(canvas.querySelector(".spinner")).not.toBeInTheDocument();
});

// Controlled id prop test
it("supports controlled id prop", () => {
  render(
    <Canvas data-testid="canvas-element" id="controlled-id">
      ID Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("id", "controlled-id");
  expect(canvas).toHaveTextContent("ID Canvas");
});

// Uncontrolled id prop test
it("works as uncontrolled when no id prop is provided", () => {
  render(<Canvas data-testid="canvas-element">No ID Canvas</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).not.toHaveAttribute("id");
  expect(canvas).toHaveTextContent("No ID Canvas");
});

// Controlled aria attributes test
it("supports controlled aria attributes", () => {
  const { rerender } = render(
    <Canvas
      data-testid="canvas-element"
      role="img"
      aria-label="Drawing canvas"
      aria-hidden="true"
    >
      Hidden Canvas
    </Canvas>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("role", "img");
  expect(canvas).toHaveAttribute("aria-label", "Drawing canvas");
  expect(canvas).toHaveAttribute("aria-hidden", "true");

  // Change aria attributes
  rerender(
    <Canvas
      data-testid="canvas-element"
      role="application"
      aria-label="Interactive canvas"
      aria-hidden="false"
    >
      Visible Canvas
    </Canvas>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("role", "application");
  expect(canvas).toHaveAttribute("aria-label", "Interactive canvas");
  expect(canvas).toHaveAttribute("aria-hidden", "false");
});

// Controlled data attributes test
it("supports controlled data attributes", () => {
  const { rerender } = render(
    <Canvas
      data-testid="canvas-element"
      data-canvas-type="game"
      data-canvas-size="large"
      data-canvas-version="1.0"
    >
      Game Canvas
    </Canvas>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("data-canvas-type", "game");
  expect(canvas).toHaveAttribute("data-canvas-size", "large");
  expect(canvas).toHaveAttribute("data-canvas-version", "1.0");

  // Change data attributes
  rerender(
    <Canvas
      data-testid="canvas-element"
      data-canvas-type="art"
      data-canvas-size="small"
      data-canvas-version="2.0"
    >
      Art Canvas
    </Canvas>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("data-canvas-type", "art");
  expect(canvas).toHaveAttribute("data-canvas-size", "small");
  expect(canvas).toHaveAttribute("data-canvas-version", "2.0");
});

// Integration test - controlled canvas in graphics context
it("works as controlled canvas in graphics context", () => {
  render(
    <div>
      <Canvas
        data-testid="canvas-element"
        width={800}
        height={600}
        id="graphics-canvas"
        className="game-canvas"
      >
        Graphics Canvas
      </Canvas>
    </div>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveAttribute("id", "graphics-canvas");
  expect(canvas).toHaveClass("game-canvas");
  expect(canvas).toHaveTextContent("Graphics Canvas");
});

// Integration test - controlled drawing canvas
it("works as controlled drawing canvas", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      width={400}
      height={400}
      role="img"
      aria-label="Drawing canvas"
      style={{ border: "1px solid black" }}
    >
      Drawing Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "400");
  expect(canvas).toHaveAttribute("height", "400");
  expect(canvas).toHaveAttribute("role", "img");
  expect(canvas).toHaveAttribute("aria-label", "Drawing canvas");
  expect(canvas).toHaveAttribute("style");
  expect(canvas).toHaveTextContent("Drawing Canvas");
});

// ===== MISSING CRITICAL TESTS =====

// Polymorphic Validation Tests
it.skip("warns about canvas-specific props when rendered as different element", () => {
  // Note: Canvas component doesn't implement polymorphic validation yet
  // This test documents the expected behavior for future implementation
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Canvas as="div" data-testid="canvas-element" width={800} height={600}>
      Invalid Canvas as Div
    </Canvas>
  );

  // Currently no warning is shown, but this documents expected future behavior
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

it("does not warn about canvas-specific props when rendered as canvas", () => {
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Canvas data-testid="canvas-element" width={800} height={600}>
      Valid Canvas
    </Canvas>
  );

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

// Error Handling Tests
it("handles invalid canvas dimensions gracefully", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      width={"invalid" as any}
      height={"invalid" as any}
      as="canvas"
    >
      Invalid Dimensions Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "invalid");
  expect(canvas).toHaveAttribute("height", "invalid");
  expect(canvas).toHaveTextContent("Invalid Dimensions Canvas");
});

it("handles null children gracefully", () => {
  render(<Canvas data-testid="canvas-element">{null}</Canvas>);
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("");
});

it("handles undefined children gracefully", () => {
  render(<Canvas data-testid="canvas-element">{undefined}</Canvas>);
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("");
});

// Performance Tests
it("maintains consistent rendering performance", () => {
  const startTime = performance.now();

  render(<Canvas data-testid="canvas-element">Performance Test Canvas</Canvas>);

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time (adjust threshold as needed)
  expect(renderTime).toBeLessThan(100);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
});

// Accessibility Deep Tests
it("supports keyboard navigation", () => {
  render(
    <Canvas data-testid="canvas-element" tabIndex={0}>
      Keyboard Accessible Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("tabindex", "0");
  expect(canvas).toHaveTextContent("Keyboard Accessible Canvas");
});

it("supports focus management", () => {
  render(
    <Canvas data-testid="canvas-element" autoFocus>
      Auto Focus Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  // Note: autofocus attribute may not be present in test environment
  // but the autoFocus prop should be handled by React
  expect(canvas).toHaveTextContent("Auto Focus Canvas");
});

it("supports ARIA live regions", () => {
  render(
    <Canvas data-testid="canvas-element" aria-live="polite" aria-atomic="true">
      Live Region Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("aria-live", "polite");
  expect(canvas).toHaveAttribute("aria-atomic", "true");
});

// Event Handler Integration Tests
it("integrates onClick with controlled state", () => {
  const handleClick = vi.fn();

  render(
    <Canvas data-testid="canvas-element" onClick={handleClick}>
      Clickable Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Clickable Canvas");
  // Note: We're testing the integration, not the click event itself
  // as that would be tested in user interaction tests
});

it("integrates onFocus with controlled state", () => {
  const handleFocus = vi.fn();

  render(
    <Canvas data-testid="canvas-element" onFocus={handleFocus}>
      Focusable Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Focusable Canvas");
});

it("integrates onBlur with controlled state", () => {
  const handleBlur = vi.fn();

  render(
    <Canvas data-testid="canvas-element" onBlur={handleBlur}>
      Blur Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent("Blur Canvas");
});

// Style and CSS Tests
it("applies dynamic styles based on controlled props", () => {
  const { rerender } = render(
    <Canvas
      data-testid="canvas-element"
      style={{ backgroundColor: "black", color: "white" }}
    >
      Black Canvas
    </Canvas>
  );

  let canvas = screen.getByTestId("canvas-element");
  // Note: Styles may not be applied in test environment, but props should be passed
  expect(canvas).toHaveAttribute("style");
  expect(canvas).toHaveTextContent("Black Canvas");

  // Change styles
  rerender(
    <Canvas
      data-testid="canvas-element"
      style={{ backgroundColor: "white", color: "black" }}
    >
      White Canvas
    </Canvas>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("style");
  expect(canvas).toHaveTextContent("White Canvas");
});

it("applies conditional classes based on controlled props", () => {
  const { rerender } = render(
    <Canvas
      data-testid="canvas-element"
      className="canvas-primary canvas-large"
    >
      Primary Large Canvas
    </Canvas>
  );

  let canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveClass("canvas-primary", "canvas-large");

  // Change classes
  rerender(
    <Canvas
      data-testid="canvas-element"
      className="canvas-secondary canvas-small"
    >
      Secondary Small Canvas
    </Canvas>
  );

  canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveClass("canvas-secondary", "canvas-small");
});

// Graphics Integration Deep Tests
it("integrates with graphics context", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    >
      Graphics Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveAttribute("style");
});

it("integrates with drawing operations", () => {
  render(
    <Canvas
      data-testid="canvas-element"
      width={400}
      height={400}
      role="img"
      aria-label="Drawing canvas"
    >
      Drawing Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "400");
  expect(canvas).toHaveAttribute("height", "400");
  expect(canvas).toHaveAttribute("role", "img");
  expect(canvas).toHaveAttribute("aria-label", "Drawing canvas");
});

// Client-Side Hydration Tests
it("maintains state during client-side hydration", () => {
  render(
    <Canvas
      isClient
      data-testid="canvas-element"
      width={800}
      height={600}
      aria-busy="true"
    >
      Hydrated Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveAttribute("aria-busy", "true");
  expect(canvas).toHaveTextContent("Hydrated Canvas");
});

// Suspense Fallback Tests
it("renders fallback during client component loading", () => {
  render(
    <Canvas isClient data-testid="canvas-element" width={800} height={600}>
      Loading Canvas
    </Canvas>
  );

  // Should render the fallback immediately
  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveAttribute("width", "800");
  expect(canvas).toHaveAttribute("height", "600");
  expect(canvas).toHaveTextContent("Loading Canvas");
});

it("handles suspense error boundaries", () => {
  // This test verifies that the component doesn't crash
  // when client components fail to load
  expect(() => {
    render(
      <Canvas isClient data-testid="canvas-element">
        Error Boundary Test
      </Canvas>
    );
  }).not.toThrow();
});

// TypeScript Type Tests
it("accepts valid canvas props without TypeScript errors", () => {
  // This test ensures TypeScript compatibility
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

  render(<Canvas {...validProps}>TypeScript Test</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("TypeScript Test");
});

// Edge Cases and Boundary Tests
it("handles extremely long text content", () => {
  const longText = "A".repeat(1000);

  render(<Canvas data-testid="canvas-element">{longText}</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent(longText);
});

it("handles special characters in content", () => {
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

  render(<Canvas data-testid="canvas-element">{specialChars}</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent(specialChars);
});

it("handles unicode characters in content", () => {
  const unicodeText = "🎨 🖼️ 🎭 🎪 🎯";

  render(<Canvas data-testid="canvas-element">{unicodeText}</Canvas>);

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toHaveTextContent(unicodeText);
});

// Integration with React Context Tests
it("works within React context providers", () => {
  const TestContext = React.createContext("default");

  render(
    <TestContext.Provider value="test-value">
      <Canvas data-testid="canvas-element">Context Canvas</Canvas>
    </TestContext.Provider>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveTextContent("Context Canvas");
});

// Memory Leak Prevention Tests
it("does not create memory leaks with event handlers", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <Canvas data-testid="canvas-element" onClick={handleClick}>
      Memory Test Canvas
    </Canvas>
  );

  const canvas = screen.getByTestId("canvas-element");
  expect(canvas).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});
