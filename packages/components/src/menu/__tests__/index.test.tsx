import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Menu } from "..";

it("renders a menu element", () => {
  render(
    <Menu data-testid="el">
      <li>One</li>
    </Menu>
  );
  expect(screen.getByTestId("el").tagName).toBe("MENU");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Menu data-testid="a" className="x" aria-label="menu">
      <li>One</li>
    </Menu>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-label", "menu");
  rerender(
    <Menu data-testid="a" as="div" className="y" aria-label="menu2">
      <li>One</li>
    </Menu>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-label", "menu2");
});
