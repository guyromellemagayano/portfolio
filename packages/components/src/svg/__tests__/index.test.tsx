import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Svg } from "..";

it("renders an svg element with attributes and children", () => {
  render(
    <Svg data-testid="el" viewBox="0 0 10 10" width={10} height={10}>
      <circle cx="5" cy="5" r="4" />
    </Svg>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName.toLowerCase()).toBe("svg");
  expect(el).toHaveAttribute("viewBox", "0 0 10 10");
  expect(el.querySelector("circle")).not.toBeNull();
});
