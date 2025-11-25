import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Heading } from "..";

it("renders default h1 and toggles via as prop", () => {
  const { rerender } = render(
    <Heading data-testid="el" className="h">
      Title
    </Heading>
  );
  let el = screen.getByTestId("el");
  expect(el.tagName).toBe("H1");
  expect(el).toHaveClass("h");
  rerender(
    <Heading data-testid="el" as="h3">
      Title
    </Heading>
  );
  el = screen.getByTestId("el");
  expect(el.tagName).toBe("H3");
});

it("supports client/memoized branches and ref forwarding", () => {
  // Server component branches do not attach refs synchronously in this setup
  render(
    <Heading data-testid="el" isClient>
      X
    </Heading>
  );
  expect(screen.getByTestId("el").tagName).toBe("H1");
  render(
    <Heading data-testid="el2" isClient isMemoized as="h2">
      Y
    </Heading>
  );
  expect(screen.getByTestId("el2").tagName).toBe("H2");
});
