import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Progress } from "..";

it("renders a progress element with value range", () => {
  render(<Progress data-testid="el" value={40} max={100} />);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("PROGRESS");
  expect(el).toHaveAttribute("value", "40");
  expect(el).toHaveAttribute("max", "100");
});

it("toggles values across rerenders", () => {
  const { rerender } = render(
    <Progress data-testid="el" value={10} max={50} />
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("value", "10");
  expect(el).toHaveAttribute("max", "50");
  rerender(<Progress data-testid="el" value={25} max={75} />);
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("value", "25");
  expect(el).toHaveAttribute("max", "75");
});
