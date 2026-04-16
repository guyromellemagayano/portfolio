import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Meter } from "..";

it("renders a meter element with attributes", () => {
  render(<Meter data-testid="el" min={0} max={100} value={40} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("METER");
  expect(el).toHaveAttribute("min", "0");
  expect(el).toHaveAttribute("max", "100");
  expect(el).toHaveAttribute("value", "40");
});

it("toggles meter attributes across rerenders", () => {
  const { rerender } = render(
    <Meter data-testid="el" min={0} max={1} value={0.2} />
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("value", "0.2");
  rerender(<Meter data-testid="el" min={0} max={1} value={0.8} />);
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("value", "0.8");
});
