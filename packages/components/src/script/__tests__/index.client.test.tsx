import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedScriptClient, ScriptClient } from "../index.client";

it("renders a script element (client) in head", () => {
  render(<ScriptClient data-testid="el" src="/b.js" defer />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
});

it("renders a memoized script element (client) in head", () => {
  render(<MemoizedScriptClient data-testid="el" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
});
