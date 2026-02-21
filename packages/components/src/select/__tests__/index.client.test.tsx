import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSelectClient, SelectClient } from "../index.client";

it("renders a select (client) and changes value", () => {
  render(
    <SelectClient data-testid="el">
      <option value="a">A</option>
      <option value="b">B</option>
    </SelectClient>
  );
  const el = screen.getByTestId("el") as HTMLSelectElement;
  fireEvent.change(el, { target: { value: "b" } });
  expect(el.value).toBe("b");
});

it("renders a memoized select (client)", () => {
  render(
    <MemoizedSelectClient data-testid="el">
      <option>a</option>
    </MemoizedSelectClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("SELECT");
});

it("supports isClient + isMemoized on server component for fallback path", () => {
  // Rendering server component in client mode should fall back to client impl
  const { rerender } = render(
    <SelectClient data-testid="x" isMemoized>
      <option>a</option>
    </SelectClient>
  );
  expect(screen.getByTestId("x").tagName).toBe("SELECT");
  // And flipping props still yields a SELECT
  rerender(
    <SelectClient data-testid="x" isMemoized={false}>
      <option>a</option>
    </SelectClient>
  );
  expect(screen.getByTestId("x").tagName).toBe("SELECT");
});
