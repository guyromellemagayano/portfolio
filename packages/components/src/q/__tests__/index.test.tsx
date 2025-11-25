import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Q } from "..";

it("renders a q element with cite and children", () => {
  render(
    <Q data-testid="el" cite="https://example.com">
      "quote"
    </Q>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("Q");
  expect(el).toHaveAttribute("cite", "https://example.com");
  expect(el).toHaveTextContent('"quote"');
});

it("toggles cite across rerenders", () => {
  const { rerender } = render(
    <Q data-testid="el" cite="a">
      t
    </Q>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("cite", "a");
  rerender(
    <Q data-testid="el" cite="b">
      t
    </Q>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("cite", "b");
});
