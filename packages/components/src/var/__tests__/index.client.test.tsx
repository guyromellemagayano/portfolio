import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedVarClient, VarClient } from "../index.client";

it("renders a var element (client)", () => {
  render(<VarClient data-testid="el">x</VarClient>);
  expect(screen.getByTestId("el").tagName).toBe("VAR");
});

it("renders a memoized var element (client)", () => {
  render(<MemoizedVarClient data-testid="el">y</MemoizedVarClient>);
  expect(screen.getByTestId("el").tagName).toBe("VAR");
});
