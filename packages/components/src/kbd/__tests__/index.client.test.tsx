import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { KbdClient, MemoizedKbdClient } from "../index.client";

it("renders a kbd element (client)", () => {
  render(<KbdClient data-testid="el">k</KbdClient>);
  expect(screen.getByTestId("el").tagName).toBe("KBD");
});

it("renders memoized kbd element (client)", () => {
  render(<MemoizedKbdClient data-testid="el">m</MemoizedKbdClient>);
  expect(screen.getByTestId("el").tagName).toBe("KBD");
});
