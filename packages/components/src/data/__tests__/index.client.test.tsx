import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DataClient, MemoizedDataClient } from "../index.client";

it("renders a data element (client)", () => {
  render(
    <DataClient data-testid="el" value="1">
      x
    </DataClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DATA");
  expect(el).toHaveAttribute("value", "1");
});

it("renders memoized data element (client)", () => {
  render(
    <MemoizedDataClient data-testid="el" value="2">
      y
    </MemoizedDataClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DATA");
  expect(el).toHaveAttribute("value", "2");
});

it("renders as custom element with 'as' prop (client)", () => {
  render(
    <DataClient as="span" data-testid="custom" value="v">
      c
    </DataClient>
  );
  expect(screen.getByTestId("custom").tagName).toBe("SPAN");
});
