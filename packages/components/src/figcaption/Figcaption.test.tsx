import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Figcaption } from ".";

it("renders a figcaption element", () => {
  render(<Figcaption data-testid="el">Caption</Figcaption>);
  expect(screen.getByTestId("el").tagName).toBe("FIGCAPTION");
});

it("supports 'as' prop", () => {
  render(
    <Figcaption as="div" data-testid="el">
      x
    </Figcaption>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("renders with standard props", async () => {
  render(<Figcaption data-testid="el">c</Figcaption>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FIGCAPTION");
  await screen.findByTestId("el");
});
