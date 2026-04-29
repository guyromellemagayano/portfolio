import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Select } from "..";

it("renders a select with options and supports change", () => {
  render(
    <Select data-testid="el" name="sel">
      <option value="a">A</option>
      <option value="b">B</option>
    </Select>
  );
  const el = screen.getByTestId("el") as HTMLSelectElement;
  expect(el.tagName).toBe("SELECT");
  expect(el.options.length).toBe(2);
  fireEvent.change(el, { target: { value: "b" } });
  expect(el.value).toBe("b");
});

it("toggles multiple and size attributes", () => {
  const { rerender } = render(
    <Select data-testid="el" size={1} multiple={false}>
      <option>a</option>
    </Select>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("size", "1");
  expect(el).not.toHaveAttribute("multiple");
  rerender(
    <Select data-testid="el" size={3} multiple>
      <option>a</option>
    </Select>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("size", "3");
  expect(el).toHaveAttribute("multiple");
});

it("supports the as prop and disabled/required toggles", () => {
  const { rerender } = render(
    <Select data-testid="el" as="div" disabled={false}>
      <option>a</option>
    </Select>
  );
  let el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIV");
  expect(el).toBeEnabled();
  rerender(
    <Select data-testid="el" disabled required>
      <option>a</option>
    </Select>
  );
  el = screen.getByTestId("el");
  expect(el.tagName).toBe("SELECT");
  expect(el).toBeDisabled();
  expect(el).toBeRequired();
});
