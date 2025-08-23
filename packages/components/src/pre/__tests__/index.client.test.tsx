import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedPreClient, PreClient } from "../index.client";

it("renders a pre element (client)", () => {
  render(<PreClient data-testid="el">X</PreClient>);
  expect(screen.getByTestId("el").tagName).toBe("PRE");
});

it("renders a memoized pre element (client)", () => {
  render(<MemoizedPreClient data-testid="el">Y</MemoizedPreClient>);
  expect(screen.getByTestId("el").tagName).toBe("PRE");
});
