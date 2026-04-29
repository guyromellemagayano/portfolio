import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Object as ObjectTag } from "..";

it("renders an object element with data/type", () => {
  render(<ObjectTag data-testid="el" data="/a.svg" type="image/svg+xml" />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OBJECT");
  expect(el).toHaveAttribute("data", "/a.svg");
  expect(el).toHaveAttribute("type", "image/svg+xml");
});

it("supports class/style/data/aria toggles", () => {
  const { rerender } = render(
    <ObjectTag data-testid="el" data="/a" className="x" aria-hidden="true" />
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("x");
  expect(el).toHaveAttribute("aria-hidden", "true");
  rerender(
    <ObjectTag data-testid="el" data="/b" className="y" aria-hidden="false" />
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
