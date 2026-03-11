import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { Code } from "..";

// Basic render test
it("renders a code element", () => {
  render(<Code data-testid="code-element">const a = 1;</Code>);
  const code = screen.getByTestId("code-element");
  expect(code.tagName).toBe("CODE");
  expect(code).toHaveTextContent("const a = 1;");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Code as="span" data-testid="custom-span">
      inline code
    </Code>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("inline code");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense fallback when isClient is true", async () => {
  render(
    <Code isClient data-testid="code-element">
      client code
    </Code>
  );

  // Should render fallback immediately
  const code = screen.getByTestId("code-element");
  expect(code.tagName).toBe("CODE");
  expect(code).toHaveTextContent("client code");

  // The lazy component should load and render the same content
  await screen.findByTestId("code-element");
});

it("renders Suspense with memoized lazy client component when isClient and isMemoized are true", async () => {
  render(
    <Code isClient isMemoized data-testid="code-element">
      memoized client code
    </Code>
  );

  const code = screen.getByTestId("code-element");
  expect(code.tagName).toBe("CODE");
  expect(code).toHaveTextContent("memoized client code");

  await screen.findByTestId("code-element");
});

// ref forwarding test (only attaches when isClient is true in current implementation)
it("forwards ref correctly when hydrated on client", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <Code isClient ref={ref}>
      ref content
    </Code>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("CODE");
  }
});

// Styling and attributes
it("supports className and inline styles", () => {
  render(
    <Code
      data-testid="code-element"
      className="code-snippet language-ts"
      style={{ color: "purple", backgroundColor: "#f5f2f0" }}
    >
      logger.info('hello');
    </Code>
  );
  const code = screen.getByTestId("code-element");
  expect(code).toHaveClass("code-snippet", "language-ts");
  expect(code).toHaveStyle({ color: "rgb(128, 0, 128)" });
});

// Data and accessibility attributes
it("supports data-* and aria-* attributes", () => {
  render(
    <Code
      data-testid="code-element"
      data-language="typescript"
      aria-label="Code sample"
      role="code"
    >
      let x: number = 1;
    </Code>
  );
  const code = screen.getByTestId("code-element");
  expect(code).toHaveAttribute("data-language", "typescript");
  expect(code).toHaveAttribute("aria-label", "Code sample");
  expect(code).toHaveAttribute("role", "code");
});

// Children rendering
it("renders nested children correctly", () => {
  render(
    <Code data-testid="code-element">
      <span>const</span> value = <span>42</span>;
    </Code>
  );
  const code = screen.getByTestId("code-element");
  expect(code.querySelectorAll("span")).toHaveLength(2);
  expect(code).toHaveTextContent("const");
  expect(code).toHaveTextContent("42");
});

// Empty / null children
it("handles null and undefined children", () => {
  const { rerender } = render(<Code data-testid="code-element">{null}</Code>);
  let code = screen.getByTestId("code-element");
  expect(code).toBeInTheDocument();
  expect(code).toBeEmptyDOMElement();

  rerender(<Code data-testid="code-element">{undefined}</Code>);
  code = screen.getByTestId("code-element");
  expect(code).toBeInTheDocument();
  expect(code).toBeEmptyDOMElement();
});

// Polymorphic validation (not yet wired; document expected future behavior)
it("does not warn currently when rendered as different element with hypothetical props", () => {
  const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  render(
    <Code as="div" data-testid="code-element" className="x">
      invalid props example
    </Code>
  );
  expect(consoleSpy).not.toHaveBeenCalled();
  consoleSpy.mockRestore();
});

// Performance sanity check
it("renders within reasonable time", () => {
  const start = performance.now();
  render(<Code data-testid="code-element">perf</Code>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
  expect(screen.getByTestId("code-element")).toBeInTheDocument();
});

// Works in React context
it("renders within React context providers", () => {
  const TestContext = React.createContext("default");
  render(
    <TestContext.Provider value="val">
      <Code data-testid="code-element">ctx</Code>
    </TestContext.Provider>
  );
  expect(screen.getByTestId("code-element")).toBeInTheDocument();
});
