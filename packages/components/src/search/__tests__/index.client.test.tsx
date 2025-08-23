import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSearchClient, SearchClient } from "../index.client";

it("renders a search element (client)", () => {
  render(
    <SearchClient data-testid="el">
      <input aria-label="q" />
    </SearchClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("SEARCH");
});

it("renders a memoized search element (client)", () => {
  render(
    <MemoizedSearchClient data-testid="el">
      <input aria-label="q" />
    </MemoizedSearchClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("SEARCH");
});
