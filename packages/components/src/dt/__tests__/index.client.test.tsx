import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DtClient, MemoizedDtClient } from "../index.client";

it("renders a dt element (client)", () => {
  render(<DtClient data-testid="el">t</DtClient>);
  expect(screen.getByTestId("el").tagName).toBe("DT");
});

it("renders memoized dt element (client)", () => {
  render(<MemoizedDtClient data-testid="el">t</MemoizedDtClient>);
  expect(screen.getByTestId("el").tagName).toBe("DT");
});
