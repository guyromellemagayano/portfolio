import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Ul } from ".";

it("renders a ul with li children and toggles class", () => {
  const { rerender } = render(
    <Ul data-testid="el" className="a">
      <li>1</li>
      <li>2</li>
    </Ul>
  );
  let el = screen.getByTestId("el");
  expect(el.tagName).toBe("UL");
  expect(el.querySelectorAll("li").length).toBe(2);
  expect(el).toHaveClass("a");
  rerender(
    <Ul data-testid="el" className="b">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </Ul>
  );
  el = screen.getByTestId("el");
  expect(el.querySelectorAll("li").length).toBe(3);
  expect(el).toHaveClass("b");
});
