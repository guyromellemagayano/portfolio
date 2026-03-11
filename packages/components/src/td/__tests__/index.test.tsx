import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Td } from "..";

it("renders a td within a table row", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Td data-testid="el" colSpan={2}>
            a
          </Td>
        </tr>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TD");
  expect(el).toHaveAttribute("colspan", "2");
});

it.skip("filters td-only props when rendered as span via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Td
      as="span"
      data-testid="td-as-span"
      colSpan={2}
      rowSpan={3}
      headers="h1 h2"
    >
      x
    </Td>
  );
  const el = document.querySelector('[data-testid="td-as-span"]');
  expect(el!.tagName).toBe("SPAN");
  expect(el).not.toHaveAttribute("colspan");
  expect(el).not.toHaveAttribute("rowspan");
  expect(el).not.toHaveAttribute("headers");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <table>
      <tbody>
        <tr>
          <Td data-testid="td-dev">D</Td>
        </tr>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="td-dev"]');
  expect(el).not.toBeNull();
  expect(el).toHaveAttribute("data-component", "Td");
  expect(el).toHaveAttribute("data-as", "td");
  process.env.NODE_ENV = original;
});
