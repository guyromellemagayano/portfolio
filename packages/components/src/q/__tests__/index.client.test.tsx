import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedQClient, QClient } from "../index.client";

it("renders a q element (client)", () => {
  render(<QClient data-testid="el">q</QClient>);
  expect(screen.getByTestId("el").tagName).toBe("Q");
});

it("renders a memoized q element (client)", () => {
  render(<MemoizedQClient data-testid="el">qq</MemoizedQClient>);
  expect(screen.getByTestId("el").tagName).toBe("Q");
});
