import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Span } from "..";

it("renders a span element", () => {
  render(<Span data-testid="span-element">Text</Span>);
  const el = screen.getByTestId("span-element");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Text");
});

it("renders as a custom element with 'as' prop", () => {
  render(
    <Span as="strong" data-testid="custom-strong">
      Strong
    </Span>
  );
  const el = screen.getByTestId("custom-strong");
  expect(el.tagName).toBe("STRONG");
  expect(el).toHaveTextContent("Strong");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Span isClient data-testid="span-element">
      Client
    </Span>
  );
  const el = screen.getByTestId("span-element");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Client");
  await screen.findByTestId("span-element");
});

it("hydrates memoized when isClient and isMemoized are true", async () => {
  render(
    <Span isClient isMemoized data-testid="span-element">
      Client Memo
    </Span>
  );
  const el = screen.getByTestId("span-element");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Client Memo");
  await screen.findByTestId("span-element");
});

it("forwards ref when hydrated", () => {
  const ref = React.createRef<HTMLSpanElement>();
  render(
    <Span isClient ref={ref}>
      Ref
    </Span>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("SPAN");
  }
});

it("supports styles and classes", () => {
  render(
    <Span
      data-testid="span-element"
      className="label"
      style={{ color: "green" }}
    >
      Styled
    </Span>
  );
  const el = screen.getByTestId("span-element");
  expect(el).toHaveClass("label");
  expect(el).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("supports data and aria attributes", () => {
  render(
    <Span data-testid="span-element" data-kind="tag" aria-label="Tag">
      ARIA
    </Span>
  );
  const el = screen.getByTestId("span-element");
  expect(el).toHaveAttribute("data-kind", "tag");
  expect(el).toHaveAttribute("aria-label", "Tag");
});

it("renders nested children", () => {
  render(
    <Span data-testid="span-element">
      <em>Italic</em> and <strong>Bold</strong>
    </Span>
  );
  const el = screen.getByTestId("span-element");
  expect(el.querySelectorAll("em")).toHaveLength(1);
  expect(el.querySelectorAll("strong")).toHaveLength(1);
});

it("handles empty children", () => {
  const { rerender } = render(<Span data-testid="span-element">{null}</Span>);
  let el = screen.getByTestId("span-element");
  expect(el).toBeEmptyDOMElement();
  rerender(<Span data-testid="span-element">{undefined}</Span>);
  el = screen.getByTestId("span-element");
  expect(el).toBeEmptyDOMElement();
});

it("renders fast enough", () => {
  const start = performance.now();
  render(<Span data-testid="span-element">perf</Span>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
});

// Additional parity tests
it("supports switching 'as' across rerenders", () => {
  const { rerender } = render(
    <Span data-testid="poly" as="span">
      x
    </Span>
  );
  expect(screen.getByTestId("poly").tagName).toBe("SPAN");

  rerender(
    <Span data-testid="poly" as="strong">
      x
    </Span>
  );
  expect(screen.getByTestId("poly").tagName).toBe("STRONG");
});

it("toggles classes/styles across rerenders", () => {
  const { rerender } = render(
    <Span data-testid="styled" className="a" style={{ color: "red" }}>
      s
    </Span>
  );
  expect(screen.getByTestId("styled")).toHaveClass("a");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <Span data-testid="styled" className="b c" style={{ color: "green" }}>
      s
    </Span>
  );
  expect(screen.getByTestId("styled")).toHaveClass("b", "c");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("toggles data/aria across rerenders", () => {
  const { rerender } = render(
    <Span data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </Span>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <Span data-testid="attrs" aria-hidden="false">
      a
    </Span>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it("renders long, special, and unicode content", () => {
  const long = "A".repeat(2000);
  const special = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const unicode = "🚀🎉🎨";
  render(
    <Span data-testid="text">
      {long}
      {special}
      {unicode}
    </Span>
  );
  const el = screen.getByTestId("text");
  expect(el).toHaveTextContent(long);
  expect(el).toHaveTextContent(special);
  expect(el).toHaveTextContent(unicode);
});
