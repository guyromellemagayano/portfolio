import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Nav } from "..";

it("renders a nav element", () => {
  render(
    <Nav data-testid="el">
      <ul>
        <li>Home</li>
      </ul>
    </Nav>
  );
  expect(screen.getByTestId("el").tagName).toBe("NAV");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Nav data-testid="a" className="x" aria-label="Primary">
      <ul />
    </Nav>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-label", "Primary");
  rerender(
    <Nav data-testid="a" as="div" className="y" aria-label="Secondary">
      <ul />
    </Nav>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-label", "Secondary");
});
