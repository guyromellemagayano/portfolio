import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedOlClient, OlClient } from "../index.client";

it("renders an ol element (client)", () => {
  render(
    <OlClient data-testid="el">
      <li>a</li>
    </OlClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("OL");
});

it("renders memoized ol element (client)", () => {
  render(
    <MemoizedOlClient data-testid="el">
      <li>a</li>
    </MemoizedOlClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("OL");
});
