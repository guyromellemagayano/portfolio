import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Samp } from "..";

it("renders a samp element with content", () => {
  render(
    <Samp data-testid="el" className="mono">
      usage: cmd --help
    </Samp>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SAMP");
  expect(el).toHaveClass("mono");
  expect(el).toHaveTextContent("usage: cmd --help");
});

it("toggles class and text across rerenders", () => {
  const { rerender } = render(
    <Samp data-testid="el" className="a">
      A
    </Samp>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveTextContent("A");
  rerender(
    <Samp data-testid="el" className="b">
      B
    </Samp>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
  expect(el).toHaveTextContent("B");
});
