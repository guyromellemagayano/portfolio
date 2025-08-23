import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DdClient, MemoizedDdClient } from "../index.client";

it("renders a dd element (client)", () => {
  render(<DdClient data-testid="el">v</DdClient>);
  expect(screen.getByTestId("el").tagName).toBe("DD");
});

it("renders memoized dd element (client)", () => {
  render(<MemoizedDdClient data-testid="el">v</MemoizedDdClient>);
  expect(screen.getByTestId("el").tagName).toBe("DD");
});
