import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSmallClient, SmallClient } from "../index.client";

it("renders a small element (client)", () => {
  render(<SmallClient data-testid="el">x</SmallClient>);
  expect(screen.getByTestId("el").tagName).toBe("SMALL");
});

it("renders a memoized small element (client)", () => {
  render(<MemoizedSmallClient data-testid="el">y</MemoizedSmallClient>);
  expect(screen.getByTestId("el").tagName).toBe("SMALL");
});
