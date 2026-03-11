import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedOptgroupClient, OptgroupClient } from "../index.client";

it("renders an optgroup element (client)", () => {
  render(
    <select>
      <OptgroupClient data-testid="el" label="G">
        <option>One</option>
      </OptgroupClient>
    </select>
  );
  expect(screen.getByTestId("el").tagName).toBe("OPTGROUP");
});

it("renders memoized optgroup element (client)", () => {
  render(
    <select>
      <MemoizedOptgroupClient data-testid="el" label="G">
        <option>One</option>
      </MemoizedOptgroupClient>
    </select>
  );
  expect(screen.getByTestId("el").tagName).toBe("OPTGROUP");
});
