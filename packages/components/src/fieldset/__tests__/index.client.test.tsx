import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { FieldsetClient, MemoizedFieldsetClient } from "../index.client";

it("renders a fieldset element (client)", () => {
  render(
    <FieldsetClient data-testid="el">
      <legend>Legend</legend>
    </FieldsetClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("FIELDSET");
});

it("renders memoized fieldset element (client)", () => {
  render(
    <MemoizedFieldsetClient data-testid="el">
      <legend>Legend</legend>
    </MemoizedFieldsetClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("FIELDSET");
});
