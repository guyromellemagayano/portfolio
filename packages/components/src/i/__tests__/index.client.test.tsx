import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { IClient, MemoizedIClient } from "../index.client";

it("renders an i element (client)", () => {
  render(<IClient data-testid="el">i</IClient>);
  expect(screen.getByTestId("el").tagName).toBe("I");
});

it("renders memoized i element (client)", () => {
  render(<MemoizedIClient data-testid="el">m</MemoizedIClient>);
  expect(screen.getByTestId("el").tagName).toBe("I");
});
