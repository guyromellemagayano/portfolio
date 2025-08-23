import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DfnClient, MemoizedDfnClient } from "../index.client";

it("renders a dfn element (client)", () => {
  render(<DfnClient data-testid="el">v</DfnClient>);
  expect(screen.getByTestId("el").tagName).toBe("DFN");
});

it("renders memoized dfn element (client)", () => {
  render(<MemoizedDfnClient data-testid="el">v</MemoizedDfnClient>);
  expect(screen.getByTestId("el").tagName).toBe("DFN");
});
