import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MarkClient, MemoizedMarkClient } from "../index.client";

it("renders a mark element (client)", () => {
  render(<MarkClient data-testid="el">m</MarkClient>);
  expect(screen.getByTestId("el").tagName).toBe("MARK");
});

it("renders memoized mark element (client)", () => {
  render(<MemoizedMarkClient data-testid="el">mm</MemoizedMarkClient>);
  expect(screen.getByTestId("el").tagName).toBe("MARK");
});
