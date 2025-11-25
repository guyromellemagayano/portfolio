import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Data } from "..";

it("renders a data element", () => {
  render(
    <Data data-testid="el" value="42">
      forty-two
    </Data>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DATA");
  expect(el).toHaveTextContent("forty-two");
  expect(el).toHaveAttribute("value", "42");
});

it("supports 'as' prop", () => {
  render(
    <Data as="span" data-testid="el" value="1">
      x
    </Data>
  );
  expect(screen.getByTestId("el").tagName).toBe("SPAN");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Data isClient data-testid="el" value="1">
      c
    </Data>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DATA");
  await screen.findByTestId("el");
});

it("toggles value across rerenders", () => {
  const { rerender } = render(
    <Data data-testid="el" value="1">
      x
    </Data>
  );
  expect(screen.getByTestId("el")).toHaveAttribute("value", "1");
  rerender(
    <Data data-testid="el" value="2">
      x
    </Data>
  );
  expect(screen.getByTestId("el")).toHaveAttribute("value", "2");
});

it("supports classes/styles/data/aria", () => {
  render(
    <Data
      data-testid="el"
      className="d"
      style={{ color: "green" }}
      data-x="1"
      aria-hidden="true"
      value="v"
    >
      t
    </Data>
  );
  const el = screen.getByTestId("el");
  expect(el).toHaveClass("d");
  expect(el).toHaveStyle({ color: "rgb(0, 128, 0)" });
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");
});
