import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTimeClient, TimeClient } from "../index.client";

it("renders a time element (client)", () => {
  render(
    <TimeClient data-testid="el" dateTime="2020-01-02">
      D
    </TimeClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("TIME");
  expect(el).toHaveAttribute("datetime", "2020-01-02");
});

it("renders a memoized time element (client)", () => {
  render(
    <MemoizedTimeClient data-testid="el" dateTime="2020-01-03">
      E
    </MemoizedTimeClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("TIME");
});
