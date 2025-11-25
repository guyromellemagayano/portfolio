import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Output } from "..";

it("renders an output element with form-related attributes", () => {
  render(
    <Output
      data-testid="el"
      name="result"
      form="calc-form"
      htmlFor="a b"
      className="x"
    >
      42
    </Output>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OUTPUT");
  expect(el).toHaveAttribute("name", "result");
  expect(el).toHaveAttribute("form", "calc-form");
  expect(el).toHaveAttribute("for", "a b");
  expect(el).toHaveClass("x");
  expect(el).toHaveTextContent("42");
});

it("toggles attributes and classes across rerenders", () => {
  const { rerender } = render(
    <Output data-testid="el" name="n1" className="a">
      A
    </Output>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("name", "n1");
  expect(el).toHaveClass("a");
  expect(el).toHaveTextContent("A");

  rerender(
    <Output data-testid="el" name="n2" className="b" aria-hidden>
      B
    </Output>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("name", "n2");
  expect(el).toHaveClass("b");
  expect(el).toHaveAttribute("aria-hidden");
  expect(el).toHaveTextContent("B");
});

it("supports the as prop to change the rendered element", () => {
  const { rerender } = render(
    <Output data-testid="el" as="output">
      X
    </Output>
  );
  let el = screen.getByTestId("el");
  expect(el.tagName).toBe("OUTPUT");

  rerender(
    <Output data-testid="el" as="div">
      X
    </Output>
  );
  el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIV");
});
