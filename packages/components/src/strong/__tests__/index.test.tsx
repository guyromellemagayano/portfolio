import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Strong } from "..";

it("renders a strong element with text", () => {
  render(
    <Strong data-testid="el" className="bold">
      important
    </Strong>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("STRONG");
  expect(el).toHaveClass("bold");
  expect(el).toHaveTextContent("important");
});

it("toggles class across rerenders", () => {
  const { rerender } = render(
    <Strong data-testid="el" className="a">
      a
    </Strong>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  rerender(
    <Strong data-testid="el" className="b">
      a
    </Strong>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});
