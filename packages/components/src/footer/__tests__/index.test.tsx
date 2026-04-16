import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Footer } from "..";

it("renders a footer element", () => {
  render(<Footer data-testid="el">f</Footer>);
  expect(screen.getByTestId("el").tagName).toBe("FOOTER");
});

it("supports 'as' prop", () => {
  render(
    <Footer as="div" data-testid="el">
      x
    </Footer>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Footer isClient data-testid="el">
      c
    </Footer>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FOOTER");
  await screen.findByTestId("el");
});
