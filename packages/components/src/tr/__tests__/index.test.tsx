import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Tr } from "..";

it("renders a tr within a table body", () => {
  render(
    <table>
      <tbody>
        <Tr data-testid="el">
          <td>a</td>
        </Tr>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TR");
});
