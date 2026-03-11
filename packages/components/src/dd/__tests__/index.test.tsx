import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Dd } from "..";

it("renders a dd element", () => {
  render(<Dd data-testid="el">Value</Dd>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DD");
  expect(el).toHaveTextContent("Value");
});

it("supports 'as' prop", () => {
  render(
    <Dd as="div" data-testid="el">
      v
    </Dd>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Dd isClient data-testid="el">
      v
    </Dd>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DD");
  await screen.findByTestId("el");
});
