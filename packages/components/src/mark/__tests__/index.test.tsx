import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Mark } from "..";

it("renders a mark element", () => {
  render(<Mark data-testid="el">highlight</Mark>);
  expect(screen.getByTestId("el").tagName).toBe("MARK");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Mark data-testid="a" className="x" aria-hidden="true">
      h
    </Mark>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <Mark data-testid="a" as="span" className="y" aria-hidden="false">
      h
    </Mark>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
