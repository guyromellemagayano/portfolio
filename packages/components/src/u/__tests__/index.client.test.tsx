import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedUClient, UClient } from "../index.client";

it("renders a u element (client)", () => {
  render(<UClient data-testid="el">x</UClient>);
  expect(screen.getByTestId("el").tagName).toBe("U");
});

it("renders a memoized u element (client)", () => {
  render(<MemoizedUClient data-testid="el">y</MemoizedUClient>);
  expect(screen.getByTestId("el").tagName).toBe("U");
});
