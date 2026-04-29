import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Sup } from "..";

it("renders a sup element with text", () => {
  render(
    <Sup data-testid="el" className="sup">
      x
    </Sup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SUP");
  expect(el).toHaveClass("sup");
  expect(el).toHaveTextContent("x");
});

it("toggles class across rerenders", () => {
  const { rerender } = render(
    <Sup data-testid="el" className="a">
      1
    </Sup>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  rerender(
    <Sup data-testid="el" className="b">
      2
    </Sup>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});
