import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { HeaderClient, MemoizedHeaderClient } from "../index.client";

it("renders a header element (client)", () => {
  render(<HeaderClient data-testid="el">h</HeaderClient>);
  expect(screen.getByTestId("el").tagName).toBe("HEADER");
});

it("renders memoized header element (client)", () => {
  render(<MemoizedHeaderClient data-testid="el">m</MemoizedHeaderClient>);
  expect(screen.getByTestId("el").tagName).toBe("HEADER");
});
