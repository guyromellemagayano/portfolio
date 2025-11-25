import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Figure } from "..";

it("renders a figure element with content", () => {
  render(
    <Figure data-testid="el">
      <img alt="a" />
      <figcaption>cap</figcaption>
    </Figure>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FIGURE");
  expect(el.querySelector("figcaption")).toBeInTheDocument();
});

it("supports 'as' prop", () => {
  render(
    <Figure as="div" data-testid="el">
      x
    </Figure>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Figure isClient data-testid="el">
      <figcaption>c</figcaption>
    </Figure>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FIGURE");
  await screen.findByTestId("el");
});
