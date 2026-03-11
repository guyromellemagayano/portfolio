import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedThClient, ThClient } from "../index.client";

it("renders a th (client) within a table head", () => {
  render(
    <table>
      <thead>
        <tr>
          <ThClient data-testid="el">H</ThClient>
        </tr>
      </thead>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TH");
});

it("renders a memoized th (client)", () => {
  render(
    <table>
      <thead>
        <tr>
          <MemoizedThClient data-testid="el">H</MemoizedThClient>
        </tr>
      </thead>
    </table>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TH");
});
