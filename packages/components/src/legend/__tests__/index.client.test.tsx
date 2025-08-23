import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { LegendClient, MemoizedLegendClient } from "../index.client";

it("renders a legend element (client)", () => {
  render(<LegendClient data-testid="el">L</LegendClient>);
  expect(screen.getByTestId("el").tagName).toBe("LEGEND");
});

it("renders memoized legend element (client)", () => {
  render(<MemoizedLegendClient data-testid="el">M</MemoizedLegendClient>);
  expect(screen.getByTestId("el").tagName).toBe("LEGEND");
});
