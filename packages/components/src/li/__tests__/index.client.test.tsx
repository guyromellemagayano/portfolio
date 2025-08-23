import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { LiClient, MemoizedLiClient } from "../index.client";

it("renders a li element (client)", () => {
  render(<LiClient data-testid="el">I</LiClient>);
  expect(screen.getByTestId("el").tagName).toBe("LI");
});

it("renders memoized li element (client)", () => {
  render(<MemoizedLiClient data-testid="el">M</MemoizedLiClient>);
  expect(screen.getByTestId("el").tagName).toBe("LI");
});
