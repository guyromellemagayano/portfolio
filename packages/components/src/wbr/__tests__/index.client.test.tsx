import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedWbrClient, WbrClient } from "../index.client";

it("renders a wbr element (client)", () => {
  render(
    <p>
      super
      <WbrClient data-testid="el" />
      long
    </p>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("WBR");
});

it("renders a memoized wbr element (client)", () => {
  render(
    <p>
      super
      <MemoizedWbrClient data-testid="el" />
      long
    </p>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("WBR");
});
