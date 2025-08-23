import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { EmClient, MemoizedEmClient } from "../index.client";

it("renders an em element (client)", () => {
  render(<EmClient data-testid="el">t</EmClient>);
  expect(screen.getByTestId("el").tagName).toBe("EM");
});

it("renders memoized em element (client)", () => {
  render(<MemoizedEmClient data-testid="el">t</MemoizedEmClient>);
  expect(screen.getByTestId("el").tagName).toBe("EM");
});
