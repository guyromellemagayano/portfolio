import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Main } from "..";

it("renders a main element", () => {
  render(<Main data-testid="el">content</Main>);
  expect(screen.getByTestId("el").tagName).toBe("MAIN");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Main data-testid="a" className="x" aria-label="m">
      M
    </Main>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-label", "m");
  rerender(
    <Main data-testid="a" as="div" className="y" aria-label="m2">
      M
    </Main>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-label", "m2");
});
