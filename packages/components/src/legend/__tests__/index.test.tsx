import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Legend } from "..";

it("renders a legend element", () => {
  render(<Legend data-testid="el">Caption</Legend>);
  expect(screen.getByTestId("el").tagName).toBe("LEGEND");
  expect(screen.getByTestId("el")).toHaveTextContent("Caption");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Legend data-testid="a" className="x" aria-hidden="true">
      L
    </Legend>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <Legend data-testid="a" as="div" className="y" aria-hidden="false">
      L
    </Legend>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
