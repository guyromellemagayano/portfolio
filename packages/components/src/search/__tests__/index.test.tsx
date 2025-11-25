import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Search } from "..";

it("renders a search element with children", () => {
  render(
    <Search data-testid="el" className="search">
      <input aria-label="q" />
    </Search>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SEARCH");
  expect(el).toHaveClass("search");
  expect(el.querySelector("input")).not.toBeNull();
});

it("toggles class across rerenders", () => {
  const { rerender } = render(
    <Search data-testid="el" className="a">
      x
    </Search>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  rerender(
    <Search data-testid="el" className="b">
      x
    </Search>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});
