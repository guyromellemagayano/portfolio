import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Sub } from "..";

it("renders a sub element with text", () => {
  render(
    <Sub data-testid="el" className="sub">
      x
    </Sub>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SUB");
  expect(el).toHaveClass("sub");
  expect(el).toHaveTextContent("x");
});

it("toggles class and aria attributes", () => {
  const { rerender } = render(
    <Sub data-testid="el" className="a" aria-hidden>
      1
    </Sub>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveAttribute("aria-hidden");
  // Omit the attribute entirely rather than passing false, since
  // DOM reflects boolean false as the string "false" attribute.
  rerender(
    <Sub data-testid="el" className="b">
      2
    </Sub>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
  expect(el).not.toHaveAttribute("aria-hidden");
});
