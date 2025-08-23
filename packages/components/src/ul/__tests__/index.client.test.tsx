import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedUlClient, UlClient } from "../index.client";

it("renders a ul element (client)", () => {
  render(
    <UlClient data-testid="el">
      <li>a</li>
    </UlClient>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("UL");
});

it("renders a memoized ul element (client)", () => {
  render(
    <MemoizedUlClient data-testid="el">
      <li>a</li>
    </MemoizedUlClient>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("UL");
});
