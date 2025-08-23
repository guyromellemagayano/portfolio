import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTrClient, TrClient } from "../index.client";

it("renders a tr (client) within a table body", () => {
  render(
    <table>
      <tbody>
        <TrClient data-testid="el">
          <td>a</td>
        </TrClient>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TR");
});

it("renders a memoized tr (client)", () => {
  render(
    <table>
      <tbody>
        <MemoizedTrClient data-testid="el">
          <td>a</td>
        </MemoizedTrClient>
      </tbody>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TR");
});
