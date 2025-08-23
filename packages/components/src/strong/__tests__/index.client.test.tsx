import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedStrongClient, StrongClient } from "../index.client";

it("renders a strong element (client)", () => {
  render(<StrongClient data-testid="el">z</StrongClient>);
  expect(screen.getByTestId("el").tagName).toBe("STRONG");
});

it("renders a memoized strong element (client)", () => {
  render(<MemoizedStrongClient data-testid="el">w</MemoizedStrongClient>);
  expect(screen.getByTestId("el").tagName).toBe("STRONG");
});
