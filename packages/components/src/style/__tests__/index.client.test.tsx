import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedStyleClient, StyleClient } from "../index.client";

it("renders a style element (client) in head", () => {
  render(<StyleClient data-testid="el">a{}</StyleClient>, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
});

it("renders a memoized style element (client) in head", () => {
  render(<MemoizedStyleClient data-testid="el">b{}</MemoizedStyleClient>, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
});
