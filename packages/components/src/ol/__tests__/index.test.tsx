import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Ol } from "..";

it("renders an ol element with attributes", () => {
  render(
    <Ol data-testid="el" start={3} type="A" reversed>
      <li>a</li>
    </Ol>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OL");
  expect(el).toHaveAttribute("start", "3");
  expect(el).toHaveAttribute("type", "A");
  expect(el).toHaveAttribute("reversed");
});

it("toggles attributes across rerenders", () => {
  const { rerender } = render(
    <Ol data-testid="el" start={1}>
      <li>a</li>
    </Ol>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("start", "1");
  rerender(
    <Ol data-testid="el" start={5}>
      <li>a</li>
    </Ol>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("start", "5");
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <Ol data-testid="ol-dev">
      <li>a</li>
    </Ol>
  );
  const el = screen.getByTestId("ol-dev");
  expect(el).toHaveAttribute("data-component", "Ol");
  expect(el).toHaveAttribute("data-as", "ol");
  process.env.NODE_ENV = original;
});
