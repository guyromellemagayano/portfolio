import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { I } from "..";

it("renders an i element", () => {
  render(<I data-testid="el">italic</I>);
  expect(screen.getByTestId("el").tagName).toBe("I");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <I data-testid="a" className="x" aria-hidden="true">
      t
    </I>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <I data-testid="a" as="span" className="y" aria-hidden="false">
      t
    </I>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
