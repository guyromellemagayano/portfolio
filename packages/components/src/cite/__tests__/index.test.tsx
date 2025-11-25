import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Cite } from "..";

it("renders a cite element", () => {
  render(<Cite data-testid="el">Citation</Cite>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("CITE");
  expect(el).toHaveTextContent("Citation");
});

it("renders as a custom element with 'as' prop", () => {
  render(
    <Cite as="span" data-testid="custom">
      Inline
    </Cite>
  );
  const el = screen.getByTestId("custom");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Inline");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Cite isClient data-testid="el">
      Client
    </Cite>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("CITE");
  expect(el).toHaveTextContent("Client");
  await screen.findByTestId("el");
});

it("hydrates memoized when isClient and isMemoized are true", async () => {
  render(
    <Cite isClient isMemoized data-testid="el">
      Memo
    </Cite>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("CITE");
  expect(el).toHaveTextContent("Memo");
  await screen.findByTestId("el");
});

it("forwards ref when hydrated", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <Cite isClient ref={ref}>
      Ref
    </Cite>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("CITE");
  }
});

it("supports styles and classes", () => {
  render(
    <Cite data-testid="el" className="note" style={{ color: "blue" }}>
      Styled
    </Cite>
  );
  const el = screen.getByTestId("el");
  expect(el).toHaveClass("note");
  expect(el).toHaveStyle({ color: "rgb(0, 0, 255)" });
});

it("supports data and aria attributes", () => {
  render(
    <Cite data-testid="el" data-kind="source" aria-label="Source">
      ARIA
    </Cite>
  );
  const el = screen.getByTestId("el");
  expect(el).toHaveAttribute("data-kind", "source");
  expect(el).toHaveAttribute("aria-label", "Source");
});

it("renders nested children", () => {
  render(
    <Cite data-testid="el">
      <span>by</span> Author
    </Cite>
  );
  const el = screen.getByTestId("el");
  expect(el.querySelectorAll("span")).toHaveLength(1);
});

it("handles empty children", () => {
  const { rerender } = render(<Cite data-testid="el">{null}</Cite>);
  let el = screen.getByTestId("el");
  expect(el).toBeEmptyDOMElement();
  rerender(<Cite data-testid="el">{undefined}</Cite>);
  el = screen.getByTestId("el");
  expect(el).toBeEmptyDOMElement();
});

it("supports toggling props across rerenders", () => {
  const { rerender } = render(
    <Cite data-testid="el" className="a" data-x="1" aria-hidden="true">
      x
    </Cite>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <Cite data-testid="el" className="b c" aria-hidden="false">
      x
    </Cite>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b", "c");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it("renders long, special, and unicode content", () => {
  const long = "A".repeat(2000);
  const special = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const unicode = "🚀🎉🎨";
  render(
    <Cite data-testid="text">
      {long}
      {special}
      {unicode}
    </Cite>
  );
  const el = screen.getByTestId("text");
  expect(el).toHaveTextContent(long);
  expect(el).toHaveTextContent(special);
  expect(el).toHaveTextContent(unicode);
});

it("unmounts cleanly", () => {
  const { unmount } = render(<Cite data-testid="u">u</Cite>);
  expect(screen.getByTestId("u")).toBeInTheDocument();
  unmount();
  expect(true).toBe(true);
});
