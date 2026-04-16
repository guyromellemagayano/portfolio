import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Ins } from "..";

it("renders an ins element", () => {
  render(<Ins data-testid="el">ins</Ins>);
  expect(screen.getByTestId("el").tagName).toBe("INS");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Ins data-testid="a" className="x" aria-hidden="true">
      t
    </Ins>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <Ins data-testid="a" as="span" className="y" aria-hidden="false">
      t
    </Ins>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
