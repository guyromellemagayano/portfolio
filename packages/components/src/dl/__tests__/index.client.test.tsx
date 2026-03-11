import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DlClient, MemoizedDlClient } from "../index.client";

it("renders a dl element (client)", () => {
  render(
    <DlClient data-testid="el">
      <dt>t</dt>
    </DlClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DL");
});

it("renders memoized dl element (client)", () => {
  render(
    <MemoizedDlClient data-testid="el">
      <dt>t</dt>
    </MemoizedDlClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("DL");
});
