import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Table } from "..";

it("renders a table with head and body", () => {
  render(
    <Table data-testid="el" role="table">
      <thead>
        <tr>
          <th>H1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>C1</td>
        </tr>
      </tbody>
    </Table>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("TABLE");
  expect(el.querySelector("thead")).not.toBeNull();
  expect(el.querySelector("tbody")).not.toBeNull();
});

it("supports caption and class toggles", () => {
  const { rerender } = render(
    <Table data-testid="el" className="a">
      <caption>A</caption>
    </Table>
  );
  let el = screen.getByTestId("el");
  expect(el.querySelector("caption")).not.toBeNull();
  expect(el).toHaveClass("a");
  rerender(
    <Table data-testid="el" className="b">
      <caption>B</caption>
    </Table>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveClass("b");
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <Table data-testid="tbl-dev">
      <tbody>
        <tr>
          <td>x</td>
        </tr>
      </tbody>
    </Table>
  );
  const el = screen.getByTestId("tbl-dev");
  expect(el).toHaveAttribute("data-component", "Table");
  expect(el).toHaveAttribute("data-as", "table");
  process.env.NODE_ENV = original;
});
