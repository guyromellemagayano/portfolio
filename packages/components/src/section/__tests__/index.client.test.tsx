import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSectionClient, SectionClient } from "../index.client";

it("renders a section element (client)", () => {
  render(
    <SectionClient data-testid="el">
      <p>a</p>
    </SectionClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("SECTION");
});

it("renders a memoized section element (client)", () => {
  render(
    <MemoizedSectionClient data-testid="el">
      <p>b</p>
    </MemoizedSectionClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("SECTION");
});
