import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Hr } from "..";

it("renders an hr element", () => {
  render(<Hr data-testid="el" />);
  expect(screen.getByTestId("el").tagName).toBe("HR");
});

it("supports 'as' and attribute toggles", () => {
  const { rerender } = render(
    <Hr data-testid="el" className="a" aria-hidden="true" />
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveAttribute("aria-hidden", "true");
  rerender(<Hr data-testid="el" as="div" className="b" aria-hidden="false" />);
  el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("b");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
