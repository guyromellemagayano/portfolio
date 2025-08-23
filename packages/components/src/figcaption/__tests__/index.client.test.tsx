import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { FigcaptionClient, MemoizedFigcaptionClient } from "../index.client";

it("renders a figcaption element (client)", () => {
  render(<FigcaptionClient data-testid="el">c</FigcaptionClient>);
  expect(screen.getByTestId("el").tagName).toBe("FIGCAPTION");
});

it("renders memoized figcaption element (client)", () => {
  render(
    <MemoizedFigcaptionClient data-testid="el">m</MemoizedFigcaptionClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("FIGCAPTION");
});
