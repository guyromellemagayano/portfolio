import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { BrClient, MemoizedBrClient } from "../index.client";

// Basic render test for BrClient
it("renders BrClient as a br element", () => {
  render(<BrClient data-testid="br-client-element" />);
  const br = screen.getByTestId("br-client-element");
  expect(br.tagName).toBe("BR");
});

// Basic render test for MemoizedBrClient
it("renders MemoizedBrClient as a br element", () => {
  render(<MemoizedBrClient data-testid="memoized-br-client-element" />);
  const br = screen.getByTestId("memoized-br-client-element");
  expect(br.tagName).toBe("BR");
});

// as prop test for BrClient
it("renders BrClient as a custom element with 'as' prop", () => {
  render(<BrClient as="hr" data-testid="custom-hr-client" />);
  const hr = screen.getByTestId("custom-hr-client");
  expect(hr.tagName).toBe("HR");
});

// as prop test for MemoizedBrClient
it("renders MemoizedBrClient as a custom element with 'as' prop", () => {
  render(<MemoizedBrClient as="hr" data-testid="custom-hr-memoized" />);
  const hr = screen.getByTestId("custom-hr-memoized");
  expect(hr.tagName).toBe("HR");
});

// ref forwarding test for BrClient
it("forwards ref correctly in BrClient", () => {
  const ref = React.createRef<HTMLBRElement>();
  render(<BrClient ref={ref} />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BR");
  }
});

// ref forwarding test for MemoizedBrClient
it("forwards ref correctly in MemoizedBrClient", () => {
  const ref = React.createRef<HTMLBRElement>();
  render(<MemoizedBrClient ref={ref} />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BR");
  }
});

// Br-specific attributes test for BrClient
it("renders BrClient with br-specific attributes", () => {
  render(
    <BrClient
      data-testid="br-client-element"
      className="line-break-client"
      id="main-break-client"
    />
  );

  const br = screen.getByTestId("br-client-element");
  expect(br).toHaveClass("line-break-client", { exact: true });
  expect(br).toHaveAttribute("id", "main-break-client");
});

// Br-specific attributes test for MemoizedBrClient
it("renders MemoizedBrClient with br-specific attributes", () => {
  render(
    <MemoizedBrClient
      data-testid="memoized-br-client-element"
      className="line-break-memoized"
      id="main-break-memoized"
    />
  );

  const br = screen.getByTestId("memoized-br-client-element");
  expect(br).toHaveClass("line-break-memoized", { exact: true });
  expect(br).toHaveAttribute("id", "main-break-memoized");
});

// Accessibility test for BrClient
it("supports accessibility attributes in BrClient", () => {
  render(
    <BrClient
      data-testid="br-client-element"
      aria-label="Line break client"
      role="separator"
      tabIndex={0}
    />
  );

  const br = screen.getByTestId("br-client-element");
  expect(br).toHaveAttribute("aria-label", "Line break client");
  expect(br).toHaveAttribute("role", "separator");
  expect(br).toHaveAttribute("tabindex", "0");
});

// Accessibility test for MemoizedBrClient
it("supports accessibility attributes in MemoizedBrClient", () => {
  render(
    <MemoizedBrClient
      data-testid="memoized-br-client-element"
      aria-label="Line break memoized"
      role="separator"
      tabIndex={0}
    />
  );

  const br = screen.getByTestId("memoized-br-client-element");
  expect(br).toHaveAttribute("aria-label", "Line break memoized");
  expect(br).toHaveAttribute("role", "separator");
  expect(br).toHaveAttribute("tabindex", "0");
});

// Data attributes test for BrClient
it("supports data attributes in BrClient", () => {
  render(
    <BrClient
      data-testid="br-client-element"
      data-br-type="client-spacing"
      data-break-style="client-double"
      data-break-size="client-large"
    />
  );

  const br = screen.getByTestId("br-client-element");
  expect(br).toHaveAttribute("data-br-type", "client-spacing");
  expect(br).toHaveAttribute("data-break-style", "client-double");
  expect(br).toHaveAttribute("data-break-size", "client-large");
});

// Data attributes test for MemoizedBrClient
it("supports data attributes in MemoizedBrClient", () => {
  render(
    <MemoizedBrClient
      data-testid="memoized-br-client-element"
      data-br-type="memoized-spacing"
      data-break-style="memoized-double"
      data-break-size="memoized-large"
    />
  );

  const br = screen.getByTestId("memoized-br-client-element");
  expect(br).toHaveAttribute("data-br-type", "memoized-spacing");
  expect(br).toHaveAttribute("data-break-style", "memoized-double");
  expect(br).toHaveAttribute("data-break-size", "memoized-large");
});

// Event handlers test for BrClient
it("supports event handlers in BrClient", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();

  render(
    <BrClient
      data-testid="br-client-element"
      onClick={handleClick}
      onLoad={handleLoad}
    />
  );

  const br = screen.getByTestId("br-client-element");
  br.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Event handlers test for MemoizedBrClient
it("supports event handlers in MemoizedBrClient", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();

  render(
    <MemoizedBrClient
      data-testid="memoized-br-client-element"
      onClick={handleClick}
      onLoad={handleLoad}
    />
  );

  const br = screen.getByTestId("memoized-br-client-element");
  br.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Custom styling test for BrClient
it("supports custom styling in BrClient", () => {
  render(
    <BrClient
      data-testid="br-client-element"
      className="custom-br-client-class"
      style={{ display: "block", height: "20px" }}
    />
  );

  const br = screen.getByTestId("br-client-element");
  expect(br).toHaveClass("custom-br-client-class");
  expect(br).toHaveStyle({ display: "block", height: "20px" });
});

// Custom styling test for MemoizedBrClient
it("supports custom styling in MemoizedBrClient", () => {
  render(
    <MemoizedBrClient
      data-testid="memoized-br-client-element"
      className="custom-memoized-br-client-class"
      style={{ display: "block", height: "20px" }}
    />
  );

  const br = screen.getByTestId("memoized-br-client-element");
  expect(br).toHaveClass("custom-memoized-br-client-class");
  expect(br).toHaveStyle({ display: "block", height: "20px" });
});

// Semantic meaning test for BrClient
it("maintains semantic meaning as line break in BrClient", () => {
  const { container } = render(
    <div>
      <p>First line</p>
      <BrClient data-testid="br-client-element" />
      <p>Second line</p>
    </div>
  );

  const br = screen.getByTestId("br-client-element");
  expect(br.tagName).toBe("BR");
  expect(container).toHaveTextContent("First line");
  expect(container).toHaveTextContent("Second line");
});

// Semantic meaning test for MemoizedBrClient
it("maintains semantic meaning as line break in MemoizedBrClient", () => {
  const { container } = render(
    <div>
      <p>First line</p>
      <MemoizedBrClient data-testid="memoized-br-client-element" />
      <p>Second line</p>
    </div>
  );

  const br = screen.getByTestId("memoized-br-client-element");
  expect(br.tagName).toBe("BR");
  expect(container).toHaveTextContent("First line");
  expect(container).toHaveTextContent("Second line");
});

// Custom attributes test for BrClient
it("supports custom attributes in BrClient", () => {
  render(
    <BrClient
      data-testid="br-client-element"
      data-custom="client-value"
      data-break-version="1.0.0"
      data-break-features="client-spacing,clear"
    />
  );

  const br = screen.getByTestId("br-client-element");
  expect(br).toHaveAttribute("data-custom", "client-value");
  expect(br).toHaveAttribute("data-break-version", "1.0.0");
  expect(br).toHaveAttribute("data-break-features", "client-spacing,clear");
});

// Custom attributes test for MemoizedBrClient
it("supports custom attributes in MemoizedBrClient", () => {
  render(
    <MemoizedBrClient
      data-testid="memoized-br-client-element"
      data-custom="memoized-client-value"
      data-break-version="2.0.0"
      data-break-features="memoized-spacing,clear"
    />
  );

  const br = screen.getByTestId("memoized-br-client-element");
  expect(br).toHaveAttribute("data-custom", "memoized-client-value");
  expect(br).toHaveAttribute("data-break-version", "2.0.0");
  expect(br).toHaveAttribute("data-break-features", "memoized-spacing,clear");
});

// Integration test - real-world usage in text content for BrClient
it("works as line break in text content for BrClient", () => {
  const { container } = render(
    <div>
      <p>
        First line of text
        <BrClient data-testid="br-client-element" />
        Second line of text
        <BrClient data-testid="br-client-element-2" />
        Third line of text
      </p>
    </div>
  );

  const br1 = screen.getByTestId("br-client-element");
  const br2 = screen.getByTestId("br-client-element-2");

  expect(br1.tagName).toBe("BR");
  expect(br2.tagName).toBe("BR");
  expect(container).toHaveTextContent("First line of text");
  expect(container).toHaveTextContent("Second line of text");
  expect(container).toHaveTextContent("Third line of text");
});

// Integration test - real-world usage in text content for MemoizedBrClient
it("works as line break in text content for MemoizedBrClient", () => {
  const { container } = render(
    <div>
      <p>
        First line of text
        <MemoizedBrClient data-testid="memoized-br-client-element" />
        Second line of text
        <MemoizedBrClient data-testid="memoized-br-client-element-2" />
        Third line of text
      </p>
    </div>
  );

  const br1 = screen.getByTestId("memoized-br-client-element");
  const br2 = screen.getByTestId("memoized-br-client-element-2");

  expect(br1.tagName).toBe("BR");
  expect(br2.tagName).toBe("BR");
  expect(container).toHaveTextContent("First line of text");
  expect(container).toHaveTextContent("Second line of text");
  expect(container).toHaveTextContent("Third line of text");
});

// Polymorphic usage test for BrClient
it("works as different elements with as prop in BrClient", () => {
  const { rerender } = render(
    <BrClient as="hr" data-testid="custom-client-element" />
  );
  let element = screen.getByTestId("custom-client-element");
  expect(element.tagName).toBe("HR");

  rerender(<BrClient as="div" data-testid="custom-client-element" />);
  element = screen.getByTestId("custom-client-element");
  expect(element.tagName).toBe("DIV");

  rerender(<BrClient as="span" data-testid="custom-client-element" />);
  element = screen.getByTestId("custom-client-element");
  expect(element.tagName).toBe("SPAN");
});

// Polymorphic usage test for MemoizedBrClient
it("works as different elements with as prop in MemoizedBrClient", () => {
  const { rerender } = render(
    <MemoizedBrClient as="hr" data-testid="custom-memoized-element" />
  );
  let element = screen.getByTestId("custom-memoized-element");
  expect(element.tagName).toBe("HR");

  rerender(<MemoizedBrClient as="div" data-testid="custom-memoized-element" />);
  element = screen.getByTestId("custom-memoized-element");
  expect(element.tagName).toBe("DIV");

  rerender(
    <MemoizedBrClient as="span" data-testid="custom-memoized-element" />
  );
  element = screen.getByTestId("custom-memoized-element");
  expect(element.tagName).toBe("SPAN");
});
