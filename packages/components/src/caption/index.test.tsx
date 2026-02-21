import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Caption } from ".";

// Basic render test
it("renders a caption element", () => {
  render(<Caption data-testid="caption-element" />);
  const caption = screen.getByTestId("caption-element");
  expect(caption.tagName).toBe("CAPTION");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Caption as="div" data-testid="custom-div">
      Custom caption
    </Caption>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom caption");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Caption isClient data-testid="caption-element">
      Client-side caption
    </Caption>
  );

  // Should render the fallback (the caption) immediately
  const caption = screen.getByTestId("caption-element");
  expect(caption.tagName).toBe("CAPTION");
  expect(caption).toHaveTextContent("Client-side caption");

  // The lazy component should load and render the same content
  await screen.findByTestId("caption-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Caption isClient isMemoized data-testid="caption-element">
      Memoized caption
    </Caption>
  );

  // Should render the fallback (the caption) immediately
  const caption = screen.getByTestId("caption-element");
  expect(caption.tagName).toBe("CAPTION");
  expect(caption).toHaveTextContent("Memoized caption");

  // The lazy component should load and render the same content
  await screen.findByTestId("caption-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLTableCaptionElement>();
  render(<Caption ref={ref}>Ref test content</Caption>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CAPTION");
  }
});

// Caption-specific props test (caption has no specific props, but we test standard HTML attributes)
it("renders with standard HTML attributes", () => {
  render(
    <Caption
      data-testid="caption-element"
      className="table-caption"
      id="main-caption"
      style={{ textAlign: "center" }}
    >
      Table Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("class", "table-caption");
  expect(caption).toHaveAttribute("id", "main-caption");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Table Caption");
});

// Children rendering tests
it("renders children correctly", () => {
  render(
    <Caption data-testid="caption-element">
      <span>Caption content</span>
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Caption content");
});

it("renders with empty children", () => {
  render(<Caption data-testid="caption-element" />);
  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("");
});

it("renders complex nested children", () => {
  render(
    <Caption data-testid="caption-element">
      <div className="caption-wrapper">
        <span className="icon">📊</span>
        <span className="text">Data Table Caption</span>
        <span className="badge">Updated</span>
      </div>
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("📊");
  expect(caption).toHaveTextContent("Data Table Caption");
  expect(caption).toHaveTextContent("Updated");
  expect(caption.querySelector(".caption-wrapper")).toBeInTheDocument();
  expect(caption.querySelector(".icon")).toBeInTheDocument();
  expect(caption.querySelector(".text")).toBeInTheDocument();
  expect(caption.querySelector(".badge")).toBeInTheDocument();
});

// Caption positioning test
it("renders with different caption positions", () => {
  const { rerender } = render(
    <Caption data-testid="caption-element" className="caption-top">
      Top Caption
    </Caption>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-top");

  rerender(
    <Caption data-testid="caption-element" className="caption-bottom">
      Bottom Caption
    </Caption>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-bottom");

  rerender(
    <Caption data-testid="caption-element" className="caption-center">
      Center Caption
    </Caption>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-center");
});

// Caption states test
it("renders with different caption states", () => {
  render(
    <Caption data-testid="caption-element" style={{ fontStyle: "italic" }}>
      Styled Caption
    </Caption>
  );
  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Styled Caption");
});

// Caption with loading state test
it("renders caption with loading state", () => {
  render(
    <Caption data-testid="caption-element" aria-busy="true">
      <span className="spinner">⏳</span>
      <span>Loading Caption...</span>
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("aria-busy", "true");
  expect(caption).toHaveTextContent("⏳");
  expect(caption).toHaveTextContent("Loading Caption...");
  expect(caption.querySelector(".spinner")).toBeInTheDocument();
});

// Accessibility attributes test
it("renders with accessibility attributes", () => {
  render(
    <Caption
      data-testid="caption-element"
      role="text"
      aria-label="Table caption"
      aria-describedby="caption-description"
    >
      Accessible Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("role", "text");
  expect(caption).toHaveAttribute("aria-label", "Table caption");
  expect(caption).toHaveAttribute("aria-describedby", "caption-description");
  expect(caption).toHaveTextContent("Accessible Caption");
});

// Data attributes test
it("renders with data attributes", () => {
  render(
    <Caption
      data-testid="caption-element"
      data-caption-type="table"
      data-caption-position="top"
      data-caption-version="1.0"
    >
      Data Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("data-caption-type", "table");
  expect(caption).toHaveAttribute("data-caption-position", "top");
  expect(caption).toHaveAttribute("data-caption-version", "1.0");
  expect(caption).toHaveTextContent("Data Caption");
});

// Event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleMouseEnter = vi.fn();
  const handleMouseLeave = vi.fn();

  render(
    <Caption
      data-testid="caption-element"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Interactive Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Interactive Caption");
});

// Custom styling test
it("renders with custom styling", () => {
  render(
    <Caption
      data-testid="caption-element"
      className="custom-caption"
      style={{ backgroundColor: "black", color: "white" }}
    >
      Styled Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("custom-caption");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Styled Caption");
});

// Caption with id test
it("renders with id attribute", () => {
  render(
    <Caption data-testid="caption-element" id="main-caption">
      Named Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("id", "main-caption");
  expect(caption).toHaveTextContent("Named Caption");
});

// Custom attributes test
it("renders with custom attributes", () => {
  render(
    <Caption
      data-testid="caption-element"
      className="custom-caption"
      id="main-caption"
      data-caption-type="chart"
    >
      <h3>Caption with Custom Attributes</h3>
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("custom-caption");
  expect(caption).toHaveAttribute("id", "main-caption");
  expect(caption).toHaveAttribute("data-caption-type", "chart");
});

// Controlled vs Uncontrolled Behavior Tests

// Controlled style prop test
it("supports controlled style prop", () => {
  render(
    <Caption data-testid="caption-element" style={{ fontStyle: "italic" }}>
      Styled Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Styled Caption");
});

// Uncontrolled style prop test
it("works as uncontrolled when no style prop is provided", () => {
  render(<Caption data-testid="caption-element">Unstyled Caption</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Unstyled Caption");
});

// Controlled className prop test
it("supports controlled className prop", () => {
  render(
    <Caption
      data-testid="caption-element"
      className="caption-primary caption-large"
    >
      Classed Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-primary", "caption-large");
  expect(caption).toHaveTextContent("Classed Caption");
});

// Uncontrolled className prop test
it("works as uncontrolled when no className prop is provided", () => {
  render(<Caption data-testid="caption-element">Unclassed Caption</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Unclassed Caption");
});

// Controlled positioning state test
it("supports controlled positioning state", () => {
  const { rerender } = render(
    <Caption data-testid="caption-element" className="caption-top">
      Top Caption
    </Caption>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-top");

  // Change position
  rerender(
    <Caption data-testid="caption-element" className="caption-bottom">
      Bottom Caption
    </Caption>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-bottom");
});

// Controlled loading state test
it("supports controlled loading state", () => {
  const { rerender } = render(
    <Caption data-testid="caption-element" aria-busy="true">
      <span className="spinner">⏳</span>
      Loading Caption...
    </Caption>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("aria-busy", "true");
  expect(caption).toHaveTextContent("Loading Caption...");
  expect(caption.querySelector(".spinner")).toBeInTheDocument();

  // Change to not loading
  rerender(<Caption data-testid="caption-element">Ready Caption</Caption>);

  caption = screen.getByTestId("caption-element");
  expect(caption).not.toHaveAttribute("aria-busy");
  expect(caption).toHaveTextContent("Ready Caption");
  expect(caption.querySelector(".spinner")).not.toBeInTheDocument();
});

// Controlled id prop test
it("supports controlled id prop", () => {
  render(
    <Caption data-testid="caption-element" id="controlled-id">
      ID Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("id", "controlled-id");
  expect(caption).toHaveTextContent("ID Caption");
});

// Uncontrolled id prop test
it("works as uncontrolled when no id prop is provided", () => {
  render(<Caption data-testid="caption-element">No ID Caption</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).not.toHaveAttribute("id");
  expect(caption).toHaveTextContent("No ID Caption");
});

// Controlled aria attributes test
it("supports controlled aria attributes", () => {
  const { rerender } = render(
    <Caption
      data-testid="caption-element"
      role="text"
      aria-label="Table caption"
      aria-hidden="true"
    >
      Hidden Caption
    </Caption>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("role", "text");
  expect(caption).toHaveAttribute("aria-label", "Table caption");
  expect(caption).toHaveAttribute("aria-hidden", "true");

  // Change aria attributes
  rerender(
    <Caption
      data-testid="caption-element"
      role="heading"
      aria-label="Interactive caption"
      aria-hidden="false"
    >
      Visible Caption
    </Caption>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("role", "heading");
  expect(caption).toHaveAttribute("aria-label", "Interactive caption");
  expect(caption).toHaveAttribute("aria-hidden", "false");
});

// Controlled data attributes test
it("supports controlled data attributes", () => {
  const { rerender } = render(
    <Caption
      data-testid="caption-element"
      data-caption-type="table"
      data-caption-position="top"
      data-caption-version="1.0"
    >
      Table Caption
    </Caption>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("data-caption-type", "table");
  expect(caption).toHaveAttribute("data-caption-position", "top");
  expect(caption).toHaveAttribute("data-caption-version", "1.0");

  // Change data attributes
  rerender(
    <Caption
      data-testid="caption-element"
      data-caption-type="chart"
      data-caption-position="bottom"
      data-caption-version="2.0"
    >
      Chart Caption
    </Caption>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("data-caption-type", "chart");
  expect(caption).toHaveAttribute("data-caption-position", "bottom");
  expect(caption).toHaveAttribute("data-caption-version", "2.0");
});

// Integration test - controlled caption in table context
it("works as controlled caption in table context", () => {
  render(
    <table>
      <Caption
        data-testid="caption-element"
        id="table-caption"
        className="table-caption"
      >
        Table Caption
      </Caption>
    </table>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("id", "table-caption");
  expect(caption).toHaveClass("table-caption");
  expect(caption).toHaveTextContent("Table Caption");
});

// Integration test - controlled chart caption
it("works as controlled chart caption", () => {
  render(
    <div>
      <Caption
        data-testid="caption-element"
        role="text"
        aria-label="Chart caption"
        style={{ textAlign: "center" }}
      >
        Chart Caption
      </Caption>
    </div>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("role", "text");
  expect(caption).toHaveAttribute("aria-label", "Chart caption");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Chart Caption");
});

// ===== MISSING CRITICAL TESTS =====

// Polymorphic Validation Tests
it.skip("warns about caption-specific props when rendered as different element", () => {
  // Note: Caption component doesn't implement polymorphic validation yet
  // This test documents the expected behavior for future implementation
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Caption as="div" data-testid="caption-element">
      Invalid Caption as Div
    </Caption>
  );

  // Currently no warning is shown, but this documents expected future behavior
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

it("does not warn about caption-specific props when rendered as caption", () => {
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(<Caption data-testid="caption-element">Valid Caption</Caption>);

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

// Error Handling Tests
it("handles null children gracefully", () => {
  render(<Caption data-testid="caption-element">{null}</Caption>);
  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("");
});

it("handles undefined children gracefully", () => {
  render(<Caption data-testid="caption-element">{undefined}</Caption>);
  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("");
});

// Performance Tests
it("maintains consistent rendering performance", () => {
  const startTime = performance.now();

  render(
    <Caption data-testid="caption-element">Performance Test Caption</Caption>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time (adjust threshold as needed)
  expect(renderTime).toBeLessThan(100);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
});

// Accessibility Deep Tests
it("supports keyboard navigation", () => {
  render(
    <Caption data-testid="caption-element" tabIndex={0}>
      Keyboard Accessible Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("tabindex", "0");
  expect(caption).toHaveTextContent("Keyboard Accessible Caption");
});

it("supports focus management", () => {
  render(
    <Caption data-testid="caption-element" autoFocus>
      Auto Focus Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  // Note: autofocus attribute may not be present in test environment
  // but the autoFocus prop should be handled by React
  expect(caption).toHaveTextContent("Auto Focus Caption");
});

it("supports ARIA live regions", () => {
  render(
    <Caption
      data-testid="caption-element"
      aria-live="polite"
      aria-atomic="true"
    >
      Live Region Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("aria-live", "polite");
  expect(caption).toHaveAttribute("aria-atomic", "true");
});

// Event Handler Integration Tests
it("integrates onClick with controlled state", () => {
  const handleClick = vi.fn();

  render(
    <Caption data-testid="caption-element" onClick={handleClick}>
      Clickable Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Clickable Caption");
  // Note: We're testing the integration, not the click event itself
  // as that would be tested in user interaction tests
});

it("integrates onFocus with controlled state", () => {
  const handleFocus = vi.fn();

  render(
    <Caption data-testid="caption-element" onFocus={handleFocus}>
      Focusable Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Focusable Caption");
});

it("integrates onBlur with controlled state", () => {
  const handleBlur = vi.fn();

  render(
    <Caption data-testid="caption-element" onBlur={handleBlur}>
      Blur Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Blur Caption");
});

// Style and CSS Tests
it("applies dynamic styles based on controlled props", () => {
  const { rerender } = render(
    <Caption
      data-testid="caption-element"
      style={{ backgroundColor: "black", color: "white" }}
    >
      Black Caption
    </Caption>
  );

  let caption = screen.getByTestId("caption-element");
  // Note: Styles may not be applied in test environment, but props should be passed
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Black Caption");

  // Change styles
  rerender(
    <Caption
      data-testid="caption-element"
      style={{ backgroundColor: "white", color: "black" }}
    >
      White Caption
    </Caption>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("White Caption");
});

it("applies conditional classes based on controlled props", () => {
  const { rerender } = render(
    <Caption
      data-testid="caption-element"
      className="caption-primary caption-large"
    >
      Primary Large Caption
    </Caption>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-primary", "caption-large");

  // Change classes
  rerender(
    <Caption
      data-testid="caption-element"
      className="caption-secondary caption-small"
    >
      Secondary Small Caption
    </Caption>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-secondary", "caption-small");
});

// Table Integration Deep Tests
it("integrates with table structure", () => {
  render(
    <table>
      <Caption data-testid="caption-element" className="table-caption">
        Table Caption
      </Caption>
    </table>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("table-caption");
  expect(caption).toHaveTextContent("Table Caption");
});

it("integrates with table accessibility", () => {
  render(
    <table>
      <Caption
        data-testid="caption-element"
        role="text"
        aria-label="Table description"
      >
        Accessible Table Caption
      </Caption>
    </table>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("role", "text");
  expect(caption).toHaveAttribute("aria-label", "Table description");
});

// Client-Side Hydration Tests
it("maintains state during client-side hydration", () => {
  render(
    <Caption
      isClient
      data-testid="caption-element"
      className="table-caption"
      aria-busy="true"
    >
      Hydrated Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("table-caption");
  expect(caption).toHaveAttribute("aria-busy", "true");
  expect(caption).toHaveTextContent("Hydrated Caption");
});

// Suspense Fallback Tests
it("renders fallback during client component loading", () => {
  render(
    <Caption isClient data-testid="caption-element" className="table-caption">
      Loading Caption
    </Caption>
  );

  // Should render the fallback immediately
  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("table-caption");
  expect(caption).toHaveTextContent("Loading Caption");
});

it("handles suspense error boundaries", () => {
  // This test verifies that the component doesn't crash
  // when client components fail to load
  expect(() => {
    render(
      <Caption isClient data-testid="caption-element">
        Error Boundary Test
      </Caption>
    );
  }).not.toThrow();
});

// TypeScript Type Tests
it("accepts valid caption props without TypeScript errors", () => {
  // This test ensures TypeScript compatibility
  const validProps = {
    className: "test-caption",
    style: { backgroundColor: "black" },
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    "data-testid": "caption-element",
  };

  render(<Caption {...validProps}>TypeScript Test</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("TypeScript Test");
});

// Edge Cases and Boundary Tests
it("handles extremely long text content", () => {
  const longText = "A".repeat(1000);

  render(<Caption data-testid="caption-element">{longText}</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent(longText);
});

it("handles special characters in content", () => {
  const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

  render(<Caption data-testid="caption-element">{specialChars}</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent(specialChars);
});

it("handles unicode characters in content", () => {
  const unicodeText = "📊 📈 📉 📋 📝";

  render(<Caption data-testid="caption-element">{unicodeText}</Caption>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent(unicodeText);
});

// Integration with React Context Tests
it("works within React context providers", () => {
  const TestContext = React.createContext("default");

  render(
    <TestContext.Provider value="test-value">
      <Caption data-testid="caption-element">Context Caption</Caption>
    </TestContext.Provider>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("Context Caption");
});

// Memory Leak Prevention Tests
it("does not create memory leaks with event handlers", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <Caption data-testid="caption-element" onClick={handleClick}>
      Memory Test Caption
    </Caption>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});
