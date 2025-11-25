import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Tbody } from "..";

it("renders a tbody within a table", () => {
  render(
    <table>
      <Tbody data-testid="el">
        <tr>
          <td>a</td>
        </tr>
      </Tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TBODY");
});
