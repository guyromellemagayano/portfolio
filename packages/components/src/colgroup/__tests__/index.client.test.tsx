import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ColgroupClient, MemoizedColgroupClient } from "../index.client";

it("renders a colgroup element (client)", () => {
  render(
    <ColgroupClient data-testid="el">
      <col />
    </ColgroupClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
});

it("renders memoized colgroup element (client)", () => {
  render(
    <MemoizedColgroupClient data-testid="el">
      <col />
    </MemoizedColgroupClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("COLGROUP");
});

it("renders as custom element with 'as' prop (client)", () => {
  render(
    <ColgroupClient as="div" data-testid="custom">
      content
    </ColgroupClient>
  );
  const el = screen.getByTestId("custom");
  expect(el.tagName).toBe("DIV");
});

it("forwards ref (client)", () => {
  const ref = React.createRef<HTMLTableColElement>();
  render(
    <ColgroupClient ref={ref}>
      <col />
    </ColgroupClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("COLGROUP");
  }
});
