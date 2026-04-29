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
