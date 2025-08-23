import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTfootClient, TfootClient } from "../index.client";

it("renders a tfoot (client) within a table", () => {
  render(
    <table>
      <TfootClient data-testid="el">
        <tr>
          <td>f</td>
        </tr>
      </TfootClient>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TFOOT");
});

it("renders a memoized tfoot (client)", () => {
  render(
    <table>
      <MemoizedTfootClient data-testid="el">
        <tr>
          <td>f</td>
        </tr>
      </MemoizedTfootClient>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TFOOT");
});
