import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Header } from "..";

it("renders a header element", () => {
  render(<Header data-testid="el">h</Header>);
  expect(screen.getByTestId("el").tagName).toBe("HEADER");
});

it("supports 'as' prop", () => {
  render(
    <Header as="div" data-testid="el">
      x
    </Header>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Header isClient data-testid="el">
      c
    </Header>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("HEADER");
  await screen.findByTestId("el");
});
