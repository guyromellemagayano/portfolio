import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedOutputClient, OutputClient } from "../index.client";

it("renders an output element (client)", () => {
  render(
    <OutputClient data-testid="el" name="n">
      C
    </OutputClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OUTPUT");
  expect(el).toHaveTextContent("C");
});

it("renders a memoized output element (client)", () => {
  render(
    <MemoizedOutputClient data-testid="el" name="m">
      M
    </MemoizedOutputClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OUTPUT");
  expect(el).toHaveTextContent("M");
});
