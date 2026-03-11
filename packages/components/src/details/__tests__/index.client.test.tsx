import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DetailsClient, MemoizedDetailsClient } from "../index.client";

it("renders a details element (client)", () => {
  render(
    <DetailsClient data-testid="el">
      <summary>Sum</summary>
    </DetailsClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DETAILS");
});

it("renders memoized details element (client)", () => {
  render(
    <MemoizedDetailsClient data-testid="el">
      <summary>Sum</summary>
    </MemoizedDetailsClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DETAILS");
});
