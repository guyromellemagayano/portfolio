import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { HeadingClient, MemoizedHeadingClient } from "../index.client";

it("renders a heading element (client)", () => {
  render(<HeadingClient data-testid="el">A</HeadingClient>);
  expect(screen.getByTestId("el").tagName).toBe("H1");
});

it("renders a memoized heading element (client)", () => {
  render(
    <MemoizedHeadingClient data-testid="el" as="h4">
      B
    </MemoizedHeadingClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("H4");
});
