import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Pre } from "..";

it("renders a pre element with code text", () => {
  render(
    <Pre data-testid="el" className="block">
      {`const x = 1;\nconsole.log(x);`}
    </Pre>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("PRE");
  expect(el).toHaveClass("block");
  expect(el.textContent).toContain("const x = 1;");
  expect(el.textContent).toContain("console.log(x);");
});

it("toggles class and children across rerenders", () => {
  const { rerender } = render(
    <Pre data-testid="el" className="a">
      A
    </Pre>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveClass("a");
  expect(el).toHaveTextContent("A");
  rerender(
    <Pre data-testid="el" className="b">
      B
    </Pre>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
  expect(el).toHaveTextContent("B");
});
