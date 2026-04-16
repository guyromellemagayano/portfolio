import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DialogClient, MemoizedDialogClient } from "../index.client";

it("renders a dialog element (client)", () => {
  render(<DialogClient data-testid="el">x</DialogClient>);
  expect(screen.getByTestId("el").tagName).toBe("DIALOG");
});

it("renders memoized dialog element (client)", () => {
  render(<MemoizedDialogClient data-testid="el">x</MemoizedDialogClient>);
  expect(screen.getByTestId("el").tagName).toBe("DIALOG");
});
