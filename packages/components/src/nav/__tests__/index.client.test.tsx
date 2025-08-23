import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedNavClient, NavClient } from "../index.client";

it("renders a nav element (client)", () => {
  render(
    <NavClient data-testid="el">
      <ul />
    </NavClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("NAV");
});

it("renders memoized nav element (client)", () => {
  render(
    <MemoizedNavClient data-testid="el">
      <ul />
    </MemoizedNavClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("NAV");
});
