import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSClient, SClient } from "../index.client";

it("renders an s element (client)", () => {
  render(<SClient data-testid="el">x</SClient>);
  expect(screen.getByTestId("el").tagName).toBe("S");
});

it("renders a memoized s element (client)", () => {
  render(<MemoizedSClient data-testid="el">y</MemoizedSClient>);
  expect(screen.getByTestId("el").tagName).toBe("S");
});
