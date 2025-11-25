import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Section } from "..";

it("renders a section element with heading", () => {
  render(
    <Section data-testid="el" className="wrap">
      <h2>Title</h2>
    </Section>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SECTION");
  expect(el).toHaveClass("wrap");
  expect(el.querySelector("h2")).not.toBeNull();
});

it("toggles data attributes across rerenders", () => {
  const { rerender } = render(
    <Section data-testid="el" data-x="1">
      x
    </Section>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("data-x", "1");
  rerender(
    <Section data-testid="el" data-x="2">
      x
    </Section>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("data-x", "2");
});
