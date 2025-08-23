import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTdClient, TdClient } from "../index.client";

it("renders a td (client) within a table row", () => {
  render(
    <table>
      <tbody>
        <tr>
          <TdClient data-testid="el">x</TdClient>
        </tr>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TD");
});

it("renders a memoized td (client)", () => {
  render(
    <table>
      <tbody>
        <tr>
          <MemoizedTdClient data-testid="el">y</MemoizedTdClient>
        </tr>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TD");
});
