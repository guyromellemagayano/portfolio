import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSubClient, SubClient } from "../index.client";

it("renders a sub element (client)", () => {
  render(<SubClient data-testid="el">x</SubClient>);
  expect(screen.getByTestId("el").tagName).toBe("SUB");
});

it("renders a memoized sub element (client)", () => {
  render(<MemoizedSubClient data-testid="el">y</MemoizedSubClient>);
  expect(screen.getByTestId("el").tagName).toBe("SUB");
});
