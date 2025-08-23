import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTbodyClient, TbodyClient } from "../index.client";

it("renders a tbody (client) within a table", () => {
  render(
    <table>
      <TbodyClient data-testid="el">
        <tr>
          <td>a</td>
        </tr>
      </TbodyClient>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TBODY");
});

it("renders a memoized tbody (client)", () => {
  render(
    <table>
      <MemoizedTbodyClient data-testid="el">
        <tr>
          <td>a</td>
        </tr>
      </MemoizedTbodyClient>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TBODY");
});
