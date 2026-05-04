import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Fieldset } from ".";

it("renders a fieldset element with legend", () => {
  render(
    <Fieldset data-testid="el">
      <legend>Legend</legend>
      Content
    </Fieldset>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FIELDSET");
  expect(el.querySelector("legend")).toBeInTheDocument();
});

it("supports 'as' prop", () => {
  render(
    <Fieldset as="div" data-testid="el">
      <legend>Legend</legend>
    </Fieldset>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("renders with standard props", async () => {
  render(
    <Fieldset data-testid="el">
      <legend>Legend</legend>
    </Fieldset>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FIELDSET");
  await screen.findByTestId("el");
});
