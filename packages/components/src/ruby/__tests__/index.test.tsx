import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Ruby } from "..";

it("renders a ruby element with rt/rp children", () => {
  render(
    <Ruby data-testid="el">
      漢<rp>(</rp>
      <rt>kan</rt>
      <rp>)</rp>
    </Ruby>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("RUBY");
  const rts = el.querySelectorAll("rt");
  expect(rts.length).toBe(1);
});

it("toggles class across rerenders", () => {
  const { rerender } = render(
    <Ruby data-testid="el" className="a">
      漢
    </Ruby>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  rerender(
    <Ruby data-testid="el" className="b">
      漢
    </Ruby>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});
