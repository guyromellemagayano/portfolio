import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { CodeClient, MemoizedCodeClient } from "../index.client";

// Basic render test for CodeClient
it("renders a code element", () => {
  render(<CodeClient data-testid="code-element">const x = 1;</CodeClient>);
  const code = screen.getByTestId("code-element");
  expect(code.tagName).toBe("CODE");
  expect(code).toHaveTextContent("const x = 1;");
});

// Basic render test for MemoizedCodeClient
it("renders a memoized code element", () => {
  render(
    <MemoizedCodeClient data-testid="code-element">memoized</MemoizedCodeClient>
  );
  const code = screen.getByTestId("code-element");
  expect(code.tagName).toBe("CODE");
  expect(code).toHaveTextContent("memoized");
});

// as prop tests
it("renders as a custom element with 'as' prop (client)", () => {
  render(
    <CodeClient as="span" data-testid="custom-span">
      inline
    </CodeClient>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("inline");
});

it("renders memoized as a custom element with 'as' prop (client)", () => {
  render(
    <MemoizedCodeClient as="div" data-testid="custom-div">
      block
    </MemoizedCodeClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("block");
});

// ref forwarding
it("forwards ref correctly (client)", () => {
  const ref = React.createRef<HTMLElement>();
  render(<CodeClient ref={ref}>ref</CodeClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CODE");
  }
});

it("forwards ref correctly in memoized component (client)", () => {
  const ref = React.createRef<HTMLElement>();
  render(<MemoizedCodeClient ref={ref}>ref</MemoizedCodeClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CODE");
  }
});

// Attributes and styling
it("supports className and inline styles (client)", () => {
  render(
    <CodeClient
      data-testid="code-element"
      className="code-block"
      style={{ color: "red" }}
    >
      styled
    </CodeClient>
  );
  const code = screen.getByTestId("code-element");
  expect(code).toHaveClass("code-block");
  expect(code).toHaveStyle({ color: "rgb(255, 0, 0)" });
});

it("supports data-* and aria-* attributes (client)", () => {
  render(
    <MemoizedCodeClient
      data-testid="code-element"
      data-language="ts"
      aria-label="Code"
      role="code"
    >
      x
    </MemoizedCodeClient>
  );
  const code = screen.getByTestId("code-element");
  expect(code).toHaveAttribute("data-language", "ts");
  expect(code).toHaveAttribute("aria-label", "Code");
  expect(code).toHaveAttribute("role", "code");
});

// Children variants
it("renders nested children (client)", () => {
  render(
    <CodeClient data-testid="code-element">
      <span>let</span> a = <span>2</span>;
    </CodeClient>
  );
  const code = screen.getByTestId("code-element");
  expect(code.querySelectorAll("span")).toHaveLength(2);
});

// Empty / null children
it("handles null and undefined children (client)", () => {
  const { rerender } = render(
    <CodeClient data-testid="code-element">{null}</CodeClient>
  );
  let code = screen.getByTestId("code-element");
  expect(code).toBeInTheDocument();
  expect(code).toBeEmptyDOMElement();

  rerender(<CodeClient data-testid="code-element">{undefined}</CodeClient>);
  code = screen.getByTestId("code-element");
  expect(code).toBeInTheDocument();
  expect(code).toBeEmptyDOMElement();
});

// Performance sanity
it("renders within reasonable time (client)", () => {
  const start = performance.now();
  render(<CodeClient data-testid="code-element">p</CodeClient>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
  expect(screen.getByTestId("code-element")).toBeInTheDocument();
});
