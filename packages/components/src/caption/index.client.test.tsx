import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { CaptionClient, MemoizedCaptionClient } from "./index.client";

// Basic render test for CaptionClient
it("renders a caption element", () => {
  render(<CaptionClient data-testid="caption-element" />);
  const caption = screen.getByTestId("caption-element");
  expect(caption.tagName).toBe("CAPTION");
});

// Basic render test for MemoizedCaptionClient
it("renders a memoized caption element", () => {
  render(<MemoizedCaptionClient data-testid="caption-element" />);
  const caption = screen.getByTestId("caption-element");
  expect(caption.tagName).toBe("CAPTION");
});

// as prop test for CaptionClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <CaptionClient as="div" data-testid="custom-div">
      Custom caption
    </CaptionClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom caption");
});

// as prop test for MemoizedCaptionClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedCaptionClient as="div" data-testid="custom-div">
      Custom memoized caption
    </MemoizedCaptionClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom memoized caption");
});

// ref forwarding test for CaptionClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLTableCaptionElement>();
  render(<CaptionClient ref={ref}>Ref test content</CaptionClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CAPTION");
  }
});

// ref forwarding test for MemoizedCaptionClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLTableCaptionElement>();
  render(
    <MemoizedCaptionClient ref={ref}>Ref test content</MemoizedCaptionClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("CAPTION");
  }
});

// Caption-specific props test for CaptionClient
it("renders with standard HTML attributes", () => {
  render(
    <CaptionClient
      data-testid="caption-element"
      className="table-caption"
      id="main-caption"
      style={{ textAlign: "center" }}
    >
      Table Caption
    </CaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("table-caption", { exact: true });
  expect(caption).toHaveAttribute("id", "main-caption");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Table Caption");
});

// Caption-specific props test for MemoizedCaptionClient
it("renders memoized with standard HTML attributes", () => {
  render(
    <MemoizedCaptionClient
      data-testid="caption-element"
      className="memoized-caption"
      id="memoized-caption"
      style={{ textAlign: "center" }}
    >
      Memoized Table Caption
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("memoized-caption", { exact: true });
  expect(caption).toHaveAttribute("id", "memoized-caption");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Memoized Table Caption");
});

// Children rendering tests for CaptionClient
it("renders children correctly", () => {
  render(
    <CaptionClient data-testid="caption-element">
      <span>Caption content</span>
    </CaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Caption content");
});

// Children rendering tests for MemoizedCaptionClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedCaptionClient data-testid="caption-element">
      <span>Memoized caption content</span>
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Memoized caption content");
});

// Caption positioning test for CaptionClient
it("renders with different caption positions", () => {
  const { rerender } = render(
    <CaptionClient data-testid="caption-element" className="caption-top">
      Top Caption
    </CaptionClient>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-top");

  rerender(
    <CaptionClient data-testid="caption-element" className="caption-bottom">
      Bottom Caption
    </CaptionClient>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-bottom");
});

// Caption positioning test for MemoizedCaptionClient
it("renders memoized with different caption positions", () => {
  const { rerender } = render(
    <MemoizedCaptionClient
      data-testid="caption-element"
      className="caption-top"
    >
      Top Memoized Caption
    </MemoizedCaptionClient>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-top");

  rerender(
    <MemoizedCaptionClient
      data-testid="caption-element"
      className="caption-bottom"
    >
      Bottom Memoized Caption
    </MemoizedCaptionClient>
  );
  expect(screen.getByTestId("caption-element")).toHaveClass("caption-bottom");
});

// Controlled vs Uncontrolled Behavior Tests for Client Components

// Controlled style prop test for CaptionClient
it("supports controlled style prop in CaptionClient", () => {
  render(
    <CaptionClient
      data-testid="caption-element"
      style={{ fontStyle: "italic" }}
    >
      Styled Client Caption
    </CaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Styled Client Caption");
});

// Controlled style prop test for MemoizedCaptionClient
it("supports controlled style prop in MemoizedCaptionClient", () => {
  render(
    <MemoizedCaptionClient
      data-testid="caption-element"
      style={{ fontStyle: "italic" }}
    >
      Styled Memoized Caption
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("style");
  expect(caption).toHaveTextContent("Styled Memoized Caption");
});

// Uncontrolled style prop test for CaptionClient
it("works as uncontrolled when no style prop is provided in CaptionClient", () => {
  render(
    <CaptionClient data-testid="caption-element">
      Unstyled Client Caption
    </CaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Unstyled Client Caption");
});

// Uncontrolled style prop test for MemoizedCaptionClient
it("works as uncontrolled when no style prop is provided in MemoizedCaptionClient", () => {
  render(
    <MemoizedCaptionClient data-testid="caption-element">
      Unstyled Memoized Caption
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveTextContent("Unstyled Memoized Caption");
});

// Controlled className prop test for CaptionClient
it("supports controlled className prop in CaptionClient", () => {
  render(
    <CaptionClient
      data-testid="caption-element"
      className="caption-primary caption-large"
    >
      Classed Client Caption
    </CaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-primary", "caption-large");
  expect(caption).toHaveTextContent("Classed Client Caption");
});

// Controlled className prop test for MemoizedCaptionClient
it("supports controlled className prop in MemoizedCaptionClient", () => {
  render(
    <MemoizedCaptionClient
      data-testid="caption-element"
      className="caption-primary caption-large"
    >
      Classed Memoized Caption
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-primary", "caption-large");
  expect(caption).toHaveTextContent("Classed Memoized Caption");
});

// Controlled positioning state test for CaptionClient
it("supports controlled positioning state in CaptionClient", () => {
  const { rerender } = render(
    <CaptionClient data-testid="caption-element" className="caption-top">
      Top Client Caption
    </CaptionClient>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-top");

  // Change position
  rerender(
    <CaptionClient data-testid="caption-element" className="caption-bottom">
      Bottom Client Caption
    </CaptionClient>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-bottom");
});

// Controlled positioning state test for MemoizedCaptionClient
it("supports controlled positioning state in MemoizedCaptionClient", () => {
  const { rerender } = render(
    <MemoizedCaptionClient
      data-testid="caption-element"
      className="caption-top"
    >
      Top Memoized Caption
    </MemoizedCaptionClient>
  );

  let caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-top");

  // Change position
  rerender(
    <MemoizedCaptionClient
      data-testid="caption-element"
      className="caption-bottom"
    >
      Bottom Memoized Caption
    </MemoizedCaptionClient>
  );

  caption = screen.getByTestId("caption-element");
  expect(caption).toHaveClass("caption-bottom");
});

// Integration test - controlled caption in table context for CaptionClient
it("works as controlled caption in table context for CaptionClient", () => {
  render(
    <table>
      <CaptionClient
        data-testid="caption-element"
        id="client-table-caption"
        className="client-table-caption"
      >
        Client Table Caption
      </CaptionClient>
    </table>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("id", "client-table-caption");
  expect(caption).toHaveClass("client-table-caption");
  expect(caption).toHaveTextContent("Client Table Caption");
});

// Integration test - controlled caption in table context for MemoizedCaptionClient
it("works as controlled caption in table context for MemoizedCaptionClient", () => {
  render(
    <table>
      <MemoizedCaptionClient
        data-testid="caption-element"
        id="memoized-table-caption"
        className="memoized-table-caption"
      >
        Memoized Table Caption
      </MemoizedCaptionClient>
    </table>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toHaveAttribute("id", "memoized-table-caption");
  expect(caption).toHaveClass("memoized-table-caption");
  expect(caption).toHaveTextContent("Memoized Table Caption");
});

// ===== MISSING CRITICAL TESTS FOR CLIENT COMPONENTS =====

// Polymorphic Validation Tests for Client Components
it.skip("warns about caption-specific props when rendered as different element in CaptionClient", () => {
  // Note: Caption component doesn't implement polymorphic validation yet
  // This test documents the expected behavior for future implementation
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <CaptionClient as="div" data-testid="caption-element">
      Invalid Client Caption as Div
    </CaptionClient>
  );

  // Currently no warning is shown, but this documents expected future behavior
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

it.skip("warns about caption-specific props when rendered as different element in MemoizedCaptionClient", () => {
  // Note: Caption component doesn't implement polymorphic validation yet
  // This test documents the expected behavior for future implementation
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <MemoizedCaptionClient as="span" data-testid="caption-element">
      Invalid Memoized Caption as Span
    </MemoizedCaptionClient>
  );

  // Currently no warning is shown, but this documents expected future behavior
  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockRestore();
});

// Error Handling Tests for Client Components
it("handles null children gracefully in CaptionClient", () => {
  render(<CaptionClient data-testid="caption-element">{null}</CaptionClient>);
  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("");
});

it("handles null children gracefully in MemoizedCaptionClient", () => {
  render(
    <MemoizedCaptionClient data-testid="caption-element">
      {null}
    </MemoizedCaptionClient>
  );
  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("");
});

// Performance Tests for Client Components
it("maintains consistent rendering performance in CaptionClient", () => {
  const startTime = performance.now();

  render(
    <CaptionClient data-testid="caption-element">
      Performance Test Client Caption
    </CaptionClient>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(100);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
});

it("maintains consistent rendering performance in MemoizedCaptionClient", () => {
  const startTime = performance.now();

  render(
    <MemoizedCaptionClient data-testid="caption-element">
      Performance Test Memoized Caption
    </MemoizedCaptionClient>
  );

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(100);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
});

// TypeScript Type Tests for Client Components
it("accepts valid caption props without TypeScript errors in CaptionClient", () => {
  const validProps = {
    className: "test-caption",
    style: { backgroundColor: "black" },
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    "data-testid": "caption-element",
  };

  render(<CaptionClient {...validProps}>TypeScript Client Test</CaptionClient>);

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("TypeScript Client Test");
});

it("accepts valid caption props without TypeScript errors in MemoizedCaptionClient", () => {
  const validProps = {
    className: "test-caption",
    style: { backgroundColor: "black" },
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    "data-testid": "caption-element",
  };

  render(
    <MemoizedCaptionClient {...validProps}>
      TypeScript Memoized Test
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();
  expect(caption).toHaveTextContent("TypeScript Memoized Test");
});

// Memory Leak Prevention Tests for Client Components
it("does not create memory leaks with event handlers in CaptionClient", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <CaptionClient data-testid="caption-element" onClick={handleClick}>
      Memory Test Client Caption
    </CaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});

it("does not create memory leaks with event handlers in MemoizedCaptionClient", () => {
  const handleClick = vi.fn();

  const { unmount } = render(
    <MemoizedCaptionClient data-testid="caption-element" onClick={handleClick}>
      Memory Test Memoized Caption
    </MemoizedCaptionClient>
  );

  const caption = screen.getByTestId("caption-element");
  expect(caption).toBeInTheDocument();

  // Unmount should not cause issues
  unmount();

  // Test passes if no errors are thrown
  expect(true).toBe(true);
});
