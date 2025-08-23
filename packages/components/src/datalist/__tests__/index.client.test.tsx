import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DatalistClient, MemoizedDatalistClient } from "../index.client";

it("renders a datalist element (client)", () => {
  render(
    <DatalistClient data-testid="el">
      <option />
    </DatalistClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DATALIST");
});

it("renders memoized datalist element (client)", () => {
  render(
    <MemoizedDatalistClient data-testid="el">
      <option />
    </MemoizedDatalistClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DATALIST");
});

it("supports 'as' prop (client)", () => {
  render(
    <DatalistClient as="div" data-testid="el">
      x
    </DatalistClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});
