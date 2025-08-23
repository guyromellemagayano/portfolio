import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DelClient, MemoizedDelClient } from "../index.client";

it("renders a del element (client)", () => {
  render(<DelClient data-testid="el">x</DelClient>);
  expect(screen.getByTestId("el").tagName).toBe("DEL");
});

it("renders memoized del element (client)", () => {
  render(<MemoizedDelClient data-testid="el">y</MemoizedDelClient>);
  expect(screen.getByTestId("el").tagName).toBe("DEL");
});
