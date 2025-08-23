import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { LabelClient, MemoizedLabelClient } from "../index.client";

it("renders a label element (client)", () => {
  render(
    <>
      <input id="y" />
      <LabelClient data-testid="el" htmlFor="y">
        Name
      </LabelClient>
    </>
  );
  expect(screen.getByTestId("el").tagName).toBe("LABEL");
});

it("renders memoized label element (client)", () => {
  render(
    <>
      <input id="z" />
      <MemoizedLabelClient data-testid="el" htmlFor="z">
        Name
      </MemoizedLabelClient>
    </>
  );
  expect(screen.getByTestId("el").tagName).toBe("LABEL");
});
