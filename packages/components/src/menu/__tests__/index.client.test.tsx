import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedMenuClient, MenuClient } from "../index.client";

it("renders a menu element (client)", () => {
  render(
    <MenuClient data-testid="el">
      <li>One</li>
    </MenuClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("MENU");
});

it("renders memoized menu element (client)", () => {
  render(
    <MemoizedMenuClient data-testid="el">
      <li>One</li>
    </MemoizedMenuClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("MENU");
});
