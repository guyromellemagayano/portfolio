import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { HrClient, MemoizedHrClient } from "../index.client";

it("renders an hr element (client)", () => {
  render(<HrClient data-testid="el" />);
  expect(screen.getByTestId("el").tagName).toBe("HR");
});

it("renders memoized hr element (client)", () => {
  render(<MemoizedHrClient data-testid="el" />);
  expect(screen.getByTestId("el").tagName).toBe("HR");
});
