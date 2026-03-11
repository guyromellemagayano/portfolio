import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Dl } from "..";

it("renders a dl element", () => {
  render(
    <Dl data-testid="el">
      <dt>Term</dt>
      <dd>Def</dd>
    </Dl>
  );
  expect(screen.getByTestId("el").tagName).toBe("DL");
});

it("supports 'as' prop", () => {
  render(
    <Dl as="div" data-testid="el">
      x
    </Dl>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Dl isClient data-testid="el">
      <dt>t</dt>
    </Dl>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DL");
  await screen.findByTestId("el");
});
