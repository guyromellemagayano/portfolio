import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Th } from "..";

it("renders a th within a table head", () => {
  render(
    <table>
      <thead>
        <tr>
          <Th data-testid="el" scope="col">
            H
          </Th>
        </tr>
      </thead>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TH");
  expect(el).toHaveAttribute("scope", "col");
});

it.skip("filters th-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Th
      as="div"
      data-testid="th-as-div"
      scope="row"
      colSpan={2}
      rowSpan={3}
      headers="a b"
      abbr="A"
    >
      X
    </Th>
  );
  const el = document.querySelector('[data-testid="th-as-div"]');
  expect(el!.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("scope");
  expect(el).not.toHaveAttribute("colspan");
  expect(el).not.toHaveAttribute("rowspan");
  expect(el).not.toHaveAttribute("headers");
  expect(el).not.toHaveAttribute("abbr");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <table>
      <thead>
        <tr>
          <Th data-testid="th-dev">D</Th>
        </tr>
      </thead>
    </table>
  );
  const el = document.querySelector('[data-testid="th-dev"]');
  expect(el).not.toBeNull();
  expect(el).toHaveAttribute("data-component", "Th");
  expect(el).toHaveAttribute("data-as", "th");
  process.env.NODE_ENV = original;
});
