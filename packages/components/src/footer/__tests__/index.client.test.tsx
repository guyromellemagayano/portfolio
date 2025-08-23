import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { FooterClient, MemoizedFooterClient } from "../index.client";

it("renders a footer element (client)", () => {
  render(<FooterClient data-testid="el">f</FooterClient>);
  expect(screen.getByTestId("el").tagName).toBe("FOOTER");
});

it("renders memoized footer element (client)", () => {
  render(<MemoizedFooterClient data-testid="el">m</MemoizedFooterClient>);
  expect(screen.getByTestId("el").tagName).toBe("FOOTER");
});
