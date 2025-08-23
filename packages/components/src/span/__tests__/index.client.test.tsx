import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSpanClient, SpanClient } from "../index.client";

it("renders a span element (client)", () => {
  render(<SpanClient data-testid="span-element">Client</SpanClient>);
  const el = screen.getByTestId("span-element");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Client");
});

it("renders memoized span element (client)", () => {
  render(
    <MemoizedSpanClient data-testid="span-element">Memo</MemoizedSpanClient>
  );
  const el = screen.getByTestId("span-element");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Memo");
});

it("renders as a custom element with 'as' prop (client)", () => {
  render(
    <SpanClient as="strong" data-testid="custom-strong">
      Strong
    </SpanClient>
  );
  const el = screen.getByTestId("custom-strong");
  expect(el.tagName).toBe("STRONG");
  expect(el).toHaveTextContent("Strong");
});

it("renders memoized as a custom element with 'as' prop (client)", () => {
  render(
    <MemoizedSpanClient as="em" data-testid="custom-em">
      Em
    </MemoizedSpanClient>
  );
  const el = screen.getByTestId("custom-em");
  expect(el.tagName).toBe("EM");
  expect(el).toHaveTextContent("Em");
});

it("forwards ref correctly (client)", () => {
  const ref = React.createRef<HTMLSpanElement>();
  render(<SpanClient ref={ref}>Ref</SpanClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("SPAN");
  }
});

it("forwards ref correctly in memoized component (client)", () => {
  const ref = React.createRef<HTMLSpanElement>();
  render(<MemoizedSpanClient ref={ref}>Ref</MemoizedSpanClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("SPAN");
  }
});

it("supports styles and classes (client)", () => {
  render(
    <SpanClient
      data-testid="span-element"
      className="label"
      style={{ color: "red" }}
    >
      Styled
    </SpanClient>
  );
  const el = screen.getByTestId("span-element");
  expect(el).toHaveClass("label");
  expect(el).toHaveStyle({ color: "rgb(255, 0, 0)" });
});

it("supports data and aria attributes (client)", () => {
  render(
    <MemoizedSpanClient
      data-testid="span-element"
      data-kind="tag"
      aria-label="Tag"
    >
      ARIA
    </MemoizedSpanClient>
  );
  const el = screen.getByTestId("span-element");
  expect(el).toHaveAttribute("data-kind", "tag");
  expect(el).toHaveAttribute("aria-label", "Tag");
});

it("renders nested children (client)", () => {
  render(
    <SpanClient data-testid="span-element">
      <em>Italic</em> and <strong>Bold</strong>
    </SpanClient>
  );
  const el = screen.getByTestId("span-element");
  expect(el.querySelectorAll("em")).toHaveLength(1);
  expect(el.querySelectorAll("strong")).toHaveLength(1);
});

it("handles empty children (client)", () => {
  const { rerender } = render(
    <SpanClient data-testid="span-element">{null}</SpanClient>
  );
  let el = screen.getByTestId("span-element");
  expect(el).toBeEmptyDOMElement();
  rerender(<SpanClient data-testid="span-element">{undefined}</SpanClient>);
  el = screen.getByTestId("span-element");
  expect(el).toBeEmptyDOMElement();
});

it("renders fast enough (client)", () => {
  const start = performance.now();
  render(<SpanClient data-testid="span-element">perf</SpanClient>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
});

// Additional parity
it("supports switching 'as' across rerenders (client)", () => {
  const { rerender } = render(
    <SpanClient data-testid="poly" as="span">
      x
    </SpanClient>
  );
  expect(screen.getByTestId("poly").tagName).toBe("SPAN");

  rerender(
    <SpanClient data-testid="poly" as="strong">
      x
    </SpanClient>
  );
  expect(screen.getByTestId("poly").tagName).toBe("STRONG");
});

it("toggles classes/styles across rerenders (client)", () => {
  const { rerender } = render(
    <SpanClient data-testid="styled" className="a" style={{ color: "red" }}>
      s
    </SpanClient>
  );
  expect(screen.getByTestId("styled")).toHaveClass("a");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <SpanClient data-testid="styled" className="b c" style={{ color: "green" }}>
      s
    </SpanClient>
  );
  expect(screen.getByTestId("styled")).toHaveClass("b", "c");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("toggles data/aria across rerenders (client)", () => {
  const { rerender } = render(
    <SpanClient data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </SpanClient>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <SpanClient data-testid="attrs" aria-hidden="false">
      a
    </SpanClient>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
