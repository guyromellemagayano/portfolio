import { fireEvent, render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSummaryClient, SummaryClient } from "../index.client";

it("renders summary (client) inside details and toggles open", () => {
  render(
    <details>
      <SummaryClient data-testid="el">More</SummaryClient>
      <div>content</div>
    </details>
  );
  const el = document.querySelector('[data-testid="el"]') as HTMLElement;
  const details = el.closest("details")!;
  expect(details.open).toBe(false);
  fireEvent.click(el);
  expect(details.open).toBe(true);
});

it("renders memoized summary (client)", () => {
  render(
    <details>
      <MemoizedSummaryClient data-testid="el">More</MemoizedSummaryClient>
    </details>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
});
