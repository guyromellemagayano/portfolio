import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { InsClient, MemoizedInsClient } from "../index.client";

it("renders an ins element (client)", () => {
  render(<InsClient data-testid="el">i</InsClient>);
  expect(screen.getByTestId("el").tagName).toBe("INS");
});

it("renders memoized ins element (client)", () => {
  render(<MemoizedInsClient data-testid="el">m</MemoizedInsClient>);
  expect(screen.getByTestId("el").tagName).toBe("INS");
});
