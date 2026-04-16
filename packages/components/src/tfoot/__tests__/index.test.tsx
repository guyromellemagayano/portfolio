import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Tfoot } from "..";

it("renders a tfoot within a table", () => {
  render(
    <table>
      <Tfoot data-testid="el">
        <tr>
          <td>f</td>
        </tr>
      </Tfoot>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TFOOT");
});
