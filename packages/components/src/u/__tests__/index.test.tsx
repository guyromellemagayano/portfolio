import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { U } from "..";

it("renders a u element with text", () => {
  render(
    <U data-testid="el" className="underline">
      x
    </U>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("U");
  expect(el).toHaveClass("underline");
  expect(el).toHaveTextContent("x");
});

it("toggles class across rerenders", () => {
  const { rerender } = render(
    <U data-testid="el" className="a">
      1
    </U>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  rerender(
    <U data-testid="el" className="b">
      2
    </U>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});
