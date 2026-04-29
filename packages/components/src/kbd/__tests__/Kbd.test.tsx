import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Kbd } from "..";

it("renders a kbd element", () => {
  render(<Kbd data-testid="el">⌘K</Kbd>);
  expect(screen.getByTestId("el").tagName).toBe("KBD");
});

it("supports 'as' and toggles", () => {
  const { rerender } = render(
    <Kbd data-testid="a" className="x" aria-hidden="true">
      k
    </Kbd>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");
  rerender(
    <Kbd data-testid="a" as="span" className="y" aria-hidden="false">
      k
    </Kbd>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("SPAN");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
