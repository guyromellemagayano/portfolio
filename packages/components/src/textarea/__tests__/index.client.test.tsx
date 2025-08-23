import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTextareaClient, TextareaClient } from "../index.client";

it("renders a textarea (client) and updates value", () => {
  render(<TextareaClient data-testid="el" defaultValue="x" />);
  const el = screen.getByTestId("el") as HTMLTextAreaElement;
  expect(el.value).toBe("x");
  fireEvent.change(el, { target: { value: "y" } });
  expect(el.value).toBe("y");
});

it("renders a memoized textarea (client)", () => {
  render(<MemoizedTextareaClient data-testid="el" />);
  expect(screen.getByTestId("el").tagName).toBe("TEXTAREA");
});
