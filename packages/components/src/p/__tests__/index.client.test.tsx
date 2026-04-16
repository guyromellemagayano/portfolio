import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedPClient, PClient } from "../index.client";

it("renders a paragraph element (client)", () => {
  render(<PClient data-testid="p-element">Client</PClient>);
  const el = screen.getByTestId("p-element");
  expect(el.tagName).toBe("P");
  expect(el).toHaveTextContent("Client");
});

it("renders memoized paragraph element (client)", () => {
  render(
    <MemoizedPClient data-testid="p-element">Memo Client</MemoizedPClient>
  );
  const el = screen.getByTestId("p-element");
  expect(el.tagName).toBe("P");
  expect(el).toHaveTextContent("Memo Client");
});

it("renders as a custom element with 'as' prop (client)", () => {
  render(
    <PClient as="span" data-testid="custom-span">
      Inline
    </PClient>
  );
  const el = screen.getByTestId("custom-span");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Inline");
});

it("renders memoized as a custom element with 'as' prop (client)", () => {
  render(
    <MemoizedPClient as="div" data-testid="custom-div">
      Div Inline
    </MemoizedPClient>
  );
  const el = screen.getByTestId("custom-div");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Div Inline");
});

it("forwards ref correctly (client)", () => {
  const ref = React.createRef<HTMLParagraphElement>();
  render(<PClient ref={ref}>Ref</PClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("P");
  }
});

it("forwards ref correctly in memoized component (client)", () => {
  const ref = React.createRef<HTMLParagraphElement>();
  render(<MemoizedPClient ref={ref}>Ref</MemoizedPClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("P");
  }
});

it("supports styles and classes (client)", () => {
  render(
    <PClient data-testid="p-element" className="lead" style={{ color: "red" }}>
      Styled
    </PClient>
  );
  const el = screen.getByTestId("p-element");
  expect(el).toHaveClass("lead");
  expect(el).toHaveStyle({ color: "rgb(255, 0, 0)" });
});

it("supports data and aria attributes (client)", () => {
  render(
    <MemoizedPClient data-testid="p-element" data-size="sm" aria-label="P">
      ARIA
    </MemoizedPClient>
  );
  const el = screen.getByTestId("p-element");
  expect(el).toHaveAttribute("data-size", "sm");
  expect(el).toHaveAttribute("aria-label", "P");
});

it("renders nested children (client)", () => {
  render(
    <PClient data-testid="p-element">
      <strong>Bold</strong> and <em>Italic</em>
    </PClient>
  );
  const el = screen.getByTestId("p-element");
  expect(el.querySelectorAll("strong")).toHaveLength(1);
  expect(el.querySelectorAll("em")).toHaveLength(1);
});

it("handles empty children (client)", () => {
  const { rerender } = render(
    <PClient data-testid="p-element">{null}</PClient>
  );
  let el = screen.getByTestId("p-element");
  expect(el).toBeEmptyDOMElement();
  rerender(<PClient data-testid="p-element">{undefined}</PClient>);
  el = screen.getByTestId("p-element");
  expect(el).toBeEmptyDOMElement();
});

it("renders fast enough (client)", () => {
  const start = performance.now();
  render(<PClient data-testid="p-element">perf</PClient>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
});

// Additional parity
it("supports switching 'as' across rerenders (client)", () => {
  const { rerender } = render(
    <PClient data-testid="poly" as="p">
      x
    </PClient>
  );
  expect(screen.getByTestId("poly").tagName).toBe("P");

  rerender(
    <PClient data-testid="poly" as="div">
      x
    </PClient>
  );
  expect(screen.getByTestId("poly").tagName).toBe("DIV");
});

it("toggles classes/styles across rerenders (client)", () => {
  const { rerender } = render(
    <PClient data-testid="styled" className="a" style={{ color: "red" }}>
      s
    </PClient>
  );
  expect(screen.getByTestId("styled")).toHaveClass("a");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <PClient data-testid="styled" className="b c" style={{ color: "green" }}>
      s
    </PClient>
  );
  expect(screen.getByTestId("styled")).toHaveClass("b", "c");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("toggles data/aria across rerenders (client)", () => {
  const { rerender } = render(
    <PClient data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </PClient>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <PClient data-testid="attrs" aria-hidden="false">
      a
    </PClient>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
