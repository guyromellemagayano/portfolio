import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Select } from "..";

it.skip("filters select-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Select
      as="div"
      data-testid="sel-as-div"
      multiple
      size={3}
      required
      defaultValue="a"
    >
      <option value="a">A</option>
    </Select>
  );
  const el = screen.getByTestId("sel-as-div");
  expect(el.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("multiple");
  expect(el).not.toHaveAttribute("size");
  expect(el).not.toHaveAttribute("required");
  expect(el).not.toHaveAttribute("value");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug data attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <Select data-testid="sel-dev">
      <option value="x">X</option>
    </Select>
  );
  const el = screen.getByTestId("sel-dev");
  expect(el).toHaveAttribute("data-component", "Select");
  expect(el).toHaveAttribute("data-as", "select");
  process.env.NODE_ENV = original;
});

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
  expect(el).not.toHaveAttribute("disabled");
  rerender(
    <Select data-testid="el" disabled required>
      <option>a</option>
    </Select>
  );
  el = screen.getByTestId("el");
  expect(el.tagName).toBe("SELECT");
  expect(el).toHaveAttribute("disabled");
  expect(el).toHaveAttribute("required");
});
