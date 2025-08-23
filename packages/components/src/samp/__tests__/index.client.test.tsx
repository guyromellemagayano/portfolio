import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSampClient, SampClient } from "../index.client";

it("renders a samp element (client)", () => {
  render(<SampClient data-testid="el">x</SampClient>);
  expect(screen.getByTestId("el").tagName).toBe("SAMP");
});

it("renders a memoized samp element (client)", () => {
  render(<MemoizedSampClient data-testid="el">y</MemoizedSampClient>);
  expect(screen.getByTestId("el").tagName).toBe("SAMP");
});
