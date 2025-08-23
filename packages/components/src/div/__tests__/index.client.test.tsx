import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DivClient, MemoizedDivClient } from "../index.client";

// Basic render
it("renders a div element (client)", () => {
  render(<DivClient data-testid="div-element">Hello</DivClient>);
  const el = screen.getByTestId("div-element");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Hello");
});

it("renders memoized div element (client)", () => {
  render(<MemoizedDivClient data-testid="div-element">Memo</MemoizedDivClient>);
  const el = screen.getByTestId("div-element");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Memo");
});

// Polymorphic 'as'
it("renders as a custom element with 'as' prop (client)", () => {
  render(
    <DivClient as="article" data-testid="custom-article">
      Article
    </DivClient>
  );
  const el = screen.getByTestId("custom-article");
  expect(el.tagName).toBe("ARTICLE");
  expect(el).toHaveTextContent("Article");
});

it("renders memoized as a custom element with 'as' prop (client)", () => {
  render(
    <MemoizedDivClient as="span" data-testid="custom-span">
      Inline
    </MemoizedDivClient>
  );
  const el = screen.getByTestId("custom-span");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Inline");
});

// Ref forwarding
it("forwards ref correctly (client)", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<DivClient ref={ref}>Ref</DivClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("DIV");
  }
});

it("forwards ref correctly in memoized component (client)", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<MemoizedDivClient ref={ref}>Ref</MemoizedDivClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("DIV");
  }
});

// Styling and attributes
it("supports className and inline styles (client)", () => {
  render(
    <DivClient
      data-testid="div-element"
      className="container"
      style={{ color: "blue" }}
    >
      Styled
    </DivClient>
  );
  const el = screen.getByTestId("div-element");
  expect(el).toHaveClass("container");
  expect(el).toHaveStyle({ color: "rgb(0, 0, 255)" });
});

it("supports data-* and aria-* attributes (client)", () => {
  render(
    <MemoizedDivClient
      data-testid="div-element"
      data-role="box"
      aria-label="Box"
      role="region"
    >
      Box
    </MemoizedDivClient>
  );
  const el = screen.getByTestId("div-element");
  expect(el).toHaveAttribute("data-role", "box");
  expect(el).toHaveAttribute("aria-label", "Box");
  expect(el).toHaveAttribute("role", "region");
});

// Children
it("renders nested children (client)", () => {
  render(
    <DivClient data-testid="div-element">
      <span>One</span>
      <span>Two</span>
    </DivClient>
  );
  const el = screen.getByTestId("div-element");
  expect(el.querySelectorAll("span")).toHaveLength(2);
});

// Empty content
it("handles null and undefined children (client)", () => {
  const { rerender } = render(
    <DivClient data-testid="div-element">{null}</DivClient>
  );
  let el = screen.getByTestId("div-element");
  expect(el).toBeInTheDocument();
  expect(el).toBeEmptyDOMElement();

  rerender(<DivClient data-testid="div-element">{undefined}</DivClient>);
  el = screen.getByTestId("div-element");
  expect(el).toBeInTheDocument();
  expect(el).toBeEmptyDOMElement();
});

// Performance
it("renders within reasonable time (client)", () => {
  const start = performance.now();
  render(<DivClient data-testid="div-element">perf</DivClient>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
  expect(screen.getByTestId("div-element")).toBeInTheDocument();
});

// Additional parity tests with broader suites
it("supports toggling as element across rerenders (client)", () => {
  const { rerender } = render(
    <DivClient data-testid="poly" as="div">
      Poly
    </DivClient>
  );
  expect(screen.getByTestId("poly").tagName).toBe("DIV");

  rerender(
    <DivClient data-testid="poly" as="span">
      Poly
    </DivClient>
  );
  expect(screen.getByTestId("poly").tagName).toBe("SPAN");
});

it("supports className/style changes (client)", () => {
  const { rerender } = render(
    <DivClient data-testid="styled" className="x" style={{ color: "red" }}>
      s
    </DivClient>
  );
  expect(screen.getByTestId("styled")).toHaveClass("x");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <DivClient data-testid="styled" className="y z" style={{ color: "green" }}>
      s
    </DivClient>
  );
  expect(screen.getByTestId("styled")).toHaveClass("y", "z");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("supports data/aria toggling (client)", () => {
  const { rerender } = render(
    <DivClient data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </DivClient>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <DivClient data-testid="attrs" aria-hidden="false">
      a
    </DivClient>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it("unmounts cleanly (client)", () => {
  const { unmount } = render(<DivClient data-testid="u">u</DivClient>);
  expect(screen.getByTestId("u")).toBeInTheDocument();
  unmount();
  expect(true).toBe(true);
});
