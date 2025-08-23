import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Hgroup } from "..";

it("renders an hgroup element with headings", () => {
  render(
    <Hgroup data-testid="el">
      <h1>Title</h1>
      <h2>Sub</h2>
    </Hgroup>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("HGROUP");
  expect(el.querySelectorAll("h1,h2").length).toBeGreaterThan(0);
});

it("supports 'as' and attribute toggles", () => {
  const { rerender } = render(
    <Hgroup data-testid="a" className="x" aria-hidden="true">
      <h1>t</h1>
    </Hgroup>
  );
  expect(screen.getByTestId("a")).toHaveClass("x");
  expect(screen.getByTestId("a")).toHaveAttribute("aria-hidden", "true");

  rerender(
    <Hgroup data-testid="a" as="div" className="y" aria-hidden="false">
      <h1>t</h1>
    </Hgroup>
  );
  const el = screen.getByTestId("a");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveClass("y");
  expect(el).toHaveAttribute("aria-hidden", "false");
});
