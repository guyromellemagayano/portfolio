import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { CiteClient, MemoizedCiteClient } from "../index.client";

it("renders a cite element (client)", () => {
  render(<CiteClient data-testid="el">Client</CiteClient>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("CITE");
  expect(el).toHaveTextContent("Client");
});

it("renders memoized cite element (client)", () => {
  render(<MemoizedCiteClient data-testid="el">Memo</MemoizedCiteClient>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("CITE");
  expect(el).toHaveTextContent("Memo");
});

it("renders as a custom element with 'as' prop (client)", () => {
  render(
    <CiteClient as="span" data-testid="custom">
      Inline
    </CiteClient>
  );
  const el = screen.getByTestId("custom");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveTextContent("Inline");
});

it("forwards ref correctly (client)", () => {
  const ref = React.createRef<HTMLElement>();
  render(<CiteClient ref={ref}>Ref</CiteClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("CITE");
  }
});

it("supports style/class toggling (client)", () => {
  const { rerender } = render(
    <CiteClient data-testid="el" className="a" style={{ color: "red" }}>
      s
    </CiteClient>
  );
  expect(screen.getByTestId("el")).toHaveClass("a");
  expect(screen.getByTestId("el")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <CiteClient data-testid="el" className="b c" style={{ color: "green" }}>
      s
    </CiteClient>
  );
  expect(screen.getByTestId("el")).toHaveClass("b", "c");
  expect(screen.getByTestId("el")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("supports data/aria toggling (client)", () => {
  const { rerender } = render(
    <CiteClient data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </CiteClient>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <CiteClient data-testid="attrs" aria-hidden="false">
      a
    </CiteClient>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it("renders long, special, and unicode content (client)", () => {
  const long = "A".repeat(2000);
  const special = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const unicode = "🚀🎉🎨";
  render(
    <CiteClient data-testid="text">
      {long}
      {special}
      {unicode}
    </CiteClient>
  );
  const el = screen.getByTestId("text");
  expect(el).toHaveTextContent(long);
  expect(el).toHaveTextContent(special);
  expect(el).toHaveTextContent(unicode);
});
