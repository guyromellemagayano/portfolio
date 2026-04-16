import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Dfn } from "..";

it("renders a dfn element", () => {
  render(<Dfn data-testid="el">Term</Dfn>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DFN");
  expect(el).toHaveTextContent("Term");
});

it("supports 'as' prop", () => {
  render(
    <Dfn as="span" data-testid="el">
      x
    </Dfn>
  );
  expect(screen.getByTestId("el").tagName).toBe("SPAN");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Dfn isClient data-testid="el">
      v
    </Dfn>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DFN");
  await screen.findByTestId("el");
});
