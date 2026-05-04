import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Th } from ".";

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
