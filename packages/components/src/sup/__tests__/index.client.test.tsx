import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSupClient, SupClient } from "../index.client";

it("renders a sup element (client)", () => {
  render(<SupClient data-testid="el">x</SupClient>);
  expect(screen.getByTestId("el").tagName).toBe("SUP");
});

it("renders a memoized sup element (client)", () => {
  render(<MemoizedSupClient data-testid="el">y</MemoizedSupClient>);
  expect(screen.getByTestId("el").tagName).toBe("SUP");
});
