import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedProgressClient, ProgressClient } from "../index.client";

it("renders a progress element (client)", () => {
  render(<ProgressClient data-testid="el" value={5} max={10} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("PROGRESS");
  expect(el).toHaveAttribute("value", "5");
});

it("renders a memoized progress element (client)", () => {
  render(<MemoizedProgressClient data-testid="el" value={1} max={2} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("PROGRESS");
  expect(el).toHaveAttribute("max", "2");
});
