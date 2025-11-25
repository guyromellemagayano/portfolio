import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Datalist } from "..";

it("renders a datalist element", () => {
  render(
    <Datalist data-testid="el">
      <option value="1" />
    </Datalist>
  );
  expect(screen.getByTestId("el").tagName).toBe("DATALIST");
});

it("supports 'as' prop", () => {
  render(
    <Datalist as="div" data-testid="el">
      x
    </Datalist>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Datalist isClient data-testid="el">
      <option />
    </Datalist>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DATALIST");
  await screen.findByTestId("el");
});

it("supports classes/styles/data/aria", () => {
  render(
    <Datalist
      data-testid="el"
      className="x"
      style={{ display: "none" }}
      data-x="1"
      aria-hidden="true"
    >
      <option />
    </Datalist>
  );
  const el = screen.getByTestId("el");
  expect(el).toHaveClass("x");
  expect(el).toHaveAttribute("style");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");
});
