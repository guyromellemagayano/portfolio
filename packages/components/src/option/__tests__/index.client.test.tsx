import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedOptionClient, OptionClient } from "../index.client";

it("renders an option element (client)", () => {
  render(
    <select>
      <OptionClient data-testid="el" value="x">
        X
      </OptionClient>
    </select>
  );
  expect(screen.getByTestId("el").tagName).toBe("OPTION");
});

it("renders memoized option element (client)", () => {
  render(
    <select>
      <MemoizedOptionClient data-testid="el" value="y">
        Y
      </MemoizedOptionClient>
    </select>
  );
  expect(screen.getByTestId("el").tagName).toBe("OPTION");
});
