import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { FigureClient, MemoizedFigureClient } from "../index.client";

it("renders a figure element (client)", () => {
  render(
    <FigureClient data-testid="el">
      <figcaption>c</figcaption>
    </FigureClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("FIGURE");
});

it("renders memoized figure element (client)", () => {
  render(
    <MemoizedFigureClient data-testid="el">
      <figcaption>m</figcaption>
    </MemoizedFigureClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("FIGURE");
});
