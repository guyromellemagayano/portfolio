import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { HgroupClient, MemoizedHgroupClient } from "../index.client";

it("renders an hgroup element (client)", () => {
  render(
    <HgroupClient data-testid="el">
      <h1>t</h1>
    </HgroupClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("HGROUP");
});

it("renders memoized hgroup element (client)", () => {
  render(
    <MemoizedHgroupClient data-testid="el">
      <h1>t</h1>
    </MemoizedHgroupClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("HGROUP");
});
