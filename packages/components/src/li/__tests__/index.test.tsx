import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Li } from "..";

it("renders a li element", () => {
  render(<Li data-testid="el">Item</Li>);
  expect(screen.getByTestId("el").tagName).toBe("LI");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Li data-testid="a" className="x" aria-hidden="true">
      I
    </Li>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <Li data-testid="a" as="div" className="y" aria-hidden="false">
      I
    </Li>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <ul>
      <Li data-testid="li-dev">x</Li>
    </ul>
  );
  const el = screen.getByTestId("li-dev");
  expect(el).toHaveAttribute("data-component", "Li");
  expect(el).toHaveAttribute("data-as", "li");
  process.env.NODE_ENV = original;
});
