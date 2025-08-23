import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MainClient, MemoizedMainClient } from "../index.client";

it("renders a main element (client)", () => {
  render(<MainClient data-testid="el">c</MainClient>);
  expect(screen.getByTestId("el").tagName).toBe("MAIN");
});

it("renders memoized main element (client)", () => {
  render(<MemoizedMainClient data-testid="el">m</MemoizedMainClient>);
  expect(screen.getByTestId("el").tagName).toBe("MAIN");
});
