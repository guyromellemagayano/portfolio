import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Var } from "..";

it("renders a var element with text", () => {
  render(
    <Var data-testid="el" className="var">
      n
    </Var>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("VAR");
  expect(el).toHaveClass("var");
  expect(el).toHaveTextContent("n");
});

it("toggles class across rerenders", () => {
  const { rerender } = render(
    <Var data-testid="el" className="a">
      a
    </Var>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  rerender(
    <Var data-testid="el" className="b">
      a
    </Var>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});
