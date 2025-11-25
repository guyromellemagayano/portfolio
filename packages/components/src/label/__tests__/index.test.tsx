import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Label } from "..";

it("renders a label element with htmlFor", () => {
  render(
    <>
      <input id="x" />
      <Label data-testid="el" htmlFor="x">
        Name
      </Label>
    </>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("LABEL");
  expect(el).toHaveAttribute("for", "x");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Label data-testid="a" className="x" aria-hidden="true">
      L
    </Label>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <Label data-testid="a" as="div" className="y" aria-hidden="false">
      L
    </Label>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
