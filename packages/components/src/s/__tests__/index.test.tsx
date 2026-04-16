import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { S } from "..";

it("renders an s element with text", () => {
  render(
    <S data-testid="el" className="strike">
      deprecated
    </S>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("S");
  expect(el).toHaveClass("strike");
  expect(el).toHaveTextContent("deprecated");
});

it("toggles class and aria across rerenders", () => {
  const { rerender } = render(
    <S data-testid="el" className="a" aria-hidden>
      A
    </S>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveAttribute("aria-hidden");
  rerender(
    // Remove the attribute entirely on rerender
    <S data-testid="el" className="b">
      B
    </S>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
  expect(el).not.toHaveAttribute("aria-hidden");
});
