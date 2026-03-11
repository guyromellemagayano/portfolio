import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Thead } from "..";

it("renders a thead within a table", () => {
  render(
    <table>
      <Thead data-testid="el">
        <tr>
          <th>H</th>
        </tr>
      </Thead>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("THEAD");
});
