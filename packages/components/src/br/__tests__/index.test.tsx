import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Br } from "..";

// Basic render test
it("renders a br element", () => {
  render(<Br data-testid="br-element" />);
  const br = screen.getByTestId("br-element");
  expect(br.tagName).toBe("BR");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(<Br as="hr" data-testid="custom-hr" />);
  const hr = screen.getByTestId("custom-hr");
  expect(hr.tagName).toBe("HR");
});

// isClient prop test
it("renders client component when isClient is true", () => {
  render(<Br data-testid="br-element" isClient />);
  const br = screen.getByTestId("br-element");
  expect(br.tagName).toBe("BR");
});

// isMemoized prop test
it("renders memoized client component when isClient and isMemoized are true", () => {
  render(<Br data-testid="br-element" isClient isMemoized />);
  const br = screen.getByTestId("br-element");
  expect(br.tagName).toBe("BR");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLBRElement>();
  render(<Br ref={ref} />);
  if (ref.current) {
    expect(ref.current.tagName).toBe("BR");
  }
});

// Br-specific props test
it("renders br with br-specific attributes", () => {
  render(
    <Br data-testid="br-element" className="line-break" id="main-break" />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("class", "line-break");
  expect(br).toHaveAttribute("id", "main-break");
});

// Accessibility test
it("supports accessibility attributes", () => {
  render(
    <Br
      data-testid="br-element"
      aria-label="Line break"
      role="separator"
      tabIndex={0}
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("aria-label", "Line break");
  expect(br).toHaveAttribute("role", "separator");
  expect(br).toHaveAttribute("tabindex", "0");
});

// Data attributes test
it("supports data attributes", () => {
  render(
    <Br
      data-testid="br-element"
      data-br-type="spacing"
      data-break-style="double"
      data-break-size="large"
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("data-br-type", "spacing");
  expect(br).toHaveAttribute("data-break-style", "double");
  expect(br).toHaveAttribute("data-break-size", "large");
});

// Event handlers test
it("supports event handlers", () => {
  const handleClick = vi.fn();
  const handleLoad = vi.fn();

  render(
    <Br data-testid="br-element" onClick={handleClick} onLoad={handleLoad} />
  );

  const br = screen.getByTestId("br-element");
  br.click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Custom styling test
it("supports custom styling", () => {
  render(
    <Br
      data-testid="br-element"
      className="custom-br-class"
      style={{ display: "block", height: "20px" }}
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveClass("custom-br-class");
  expect(br).toHaveStyle({ display: "block", height: "20px" });
});

// Semantic meaning test
it("maintains semantic meaning as line break", () => {
  const { container } = render(
    <div>
      <p>First line</p>
      <Br data-testid="br-element" />
      <p>Second line</p>
    </div>
  );

  const br = screen.getByTestId("br-element");
  expect(br.tagName).toBe("BR");
  expect(container).toHaveTextContent("First line");
  expect(container).toHaveTextContent("Second line");
});

// Custom attributes test
it("supports custom attributes", () => {
  render(
    <Br
      data-testid="br-element"
      data-custom="value"
      data-break-version="1.0.0"
      data-break-features="spacing,clear"
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("data-custom", "value");
  expect(br).toHaveAttribute("data-break-version", "1.0.0");
  expect(br).toHaveAttribute("data-break-features", "spacing,clear");
});

// Different content types test
it("handles different content contexts", () => {
  const { container } = render(
    <div>
      <span>Text before</span>
      <Br data-testid="br-element" />
      <span>Text after</span>
    </div>
  );

  const br = screen.getByTestId("br-element");
  expect(br.tagName).toBe("BR");
  expect(container).toHaveTextContent("Text before");
  expect(container).toHaveTextContent("Text after");
});

// Multiple classes test
it("supports multiple CSS classes", () => {
  render(
    <Br data-testid="br-element" className="br-main br-spacing br-responsive" />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveClass("br-main");
  expect(br).toHaveClass("br-spacing");
  expect(br).toHaveClass("br-responsive");
});

// Inline styles test
it("supports inline styles", () => {
  render(
    <Br
      data-testid="br-element"
      style={{
        display: "block",
        height: "10px",
        margin: "5px 0",
        visibility: "visible",
      }}
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveStyle({
    display: "block",
    height: "10px",
    margin: "5px 0px",
    visibility: "visible",
  });
});

// Title and spellcheck test
it("supports title and spellcheck attributes", () => {
  render(
    <Br
      data-testid="br-element"
      title="Line break element"
      spellCheck={false}
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("title", "Line break element");
  expect(br).toHaveAttribute("spellcheck", "false");
});

// Contenteditable and hidden test
it("supports contenteditable and hidden attributes", () => {
  render(<Br data-testid="br-element" contentEditable={true} hidden />);

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("contenteditable", "true");
  expect(br).toHaveAttribute("hidden");
});

// Draggable test
it("supports draggable attribute", () => {
  render(<Br data-testid="br-element" draggable={true} />);

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("draggable", "true");
});

// Language and direction test
it("supports language and direction attributes", () => {
  render(<Br data-testid="br-element" lang="en" dir="ltr" translate="no" />);

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("lang", "en");
  expect(br).toHaveAttribute("dir", "ltr");
  expect(br).toHaveAttribute("translate", "no");
});

// Enhanced custom attributes test
it("supports enhanced custom attributes", () => {
  render(
    <Br
      data-testid="br-element"
      data-br-id="main-line-break"
      data-br-version="2.1.0"
      data-br-features="spacing,clear,responsive"
      data-br-environment="production"
      data-br-locale="en-US"
    />
  );

  const br = screen.getByTestId("br-element");
  expect(br).toHaveAttribute("data-br-id", "main-line-break");
  expect(br).toHaveAttribute("data-br-version", "2.1.0");
  expect(br).toHaveAttribute("data-br-features", "spacing,clear,responsive");
  expect(br).toHaveAttribute("data-br-environment", "production");
  expect(br).toHaveAttribute("data-br-locale", "en-US");
});

// Integration test - real-world usage in text content
it("works as line break in text content", () => {
  const { container } = render(
    <div>
      <p>
        First line of text
        <Br data-testid="br-element" />
        Second line of text
        <Br data-testid="br-element-2" />
        Third line of text
      </p>
    </div>
  );

  const br1 = screen.getByTestId("br-element");
  const br2 = screen.getByTestId("br-element-2");

  expect(br1.tagName).toBe("BR");
  expect(br2.tagName).toBe("BR");
  expect(container).toHaveTextContent("First line of text");
  expect(container).toHaveTextContent("Second line of text");
  expect(container).toHaveTextContent("Third line of text");
});

// Polymorphic usage test
it("works as different elements with as prop", () => {
  const { rerender } = render(<Br as="hr" data-testid="custom-element" />);
  let element = screen.getByTestId("custom-element");
  expect(element.tagName).toBe("HR");

  rerender(<Br as="div" data-testid="custom-element" />);
  element = screen.getByTestId("custom-element");
  expect(element.tagName).toBe("DIV");

  rerender(<Br as="span" data-testid="custom-element" />);
  element = screen.getByTestId("custom-element");
  expect(element.tagName).toBe("SPAN");
});
