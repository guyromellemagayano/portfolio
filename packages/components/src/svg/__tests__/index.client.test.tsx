import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSvgClient, SvgClient } from "../index.client";

it("renders an svg element (client)", () => {
  render(
    <SvgClient data-testid="el" viewBox="0 0 10 10">
      <rect x="1" y="1" width="8" height="8" />
    </SvgClient>
  );
  expect(screen.getByTestId("el").tagName.toLowerCase()).toBe("svg");
});

it("renders a memoized svg element (client)", () => {
  render(
    <MemoizedSvgClient data-testid="el" viewBox="0 0 10 10">
      <rect x="1" y="1" width="8" height="8" />
    </MemoizedSvgClient>
  );
  expect(screen.getByTestId("el").tagName.toLowerCase()).toBe("svg");
});
