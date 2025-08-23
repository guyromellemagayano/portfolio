import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTheadClient, TheadClient } from "../index.client";

it("renders a thead (client) within a table", () => {
  render(
    <table>
      <TheadClient data-testid="el">
        <tr>
          <th>H</th>
        </tr>
      </TheadClient>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("THEAD");
});

it("renders a memoized thead (client)", () => {
  render(
    <table>
      <MemoizedTheadClient data-testid="el">
        <tr>
          <th>H</th>
        </tr>
      </MemoizedTheadClient>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("THEAD");
});
