import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedSlotClient, SlotClient } from "../index.client";

it("renders a slot element (client)", () => {
  render(<SlotClient data-testid="el" name="content" />);
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SLOT");
});

it("renders a memoized slot element (client)", () => {
  render(<MemoizedSlotClient data-testid="el" name="content" />);
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SLOT");
});
