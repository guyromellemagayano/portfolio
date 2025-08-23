import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { InputClient, MemoizedInputClient } from "../index.client";

it("renders an input (client) and changes value", () => {
  render(<InputClient data-testid="el" defaultValue="x" />);
  const el = screen.getByTestId("el") as HTMLInputElement;
  expect(el.value).toBe("x");
  fireEvent.change(el, { target: { value: "y" } });
  expect(el.value).toBe("y");
});

it("renders a memoized input (client)", () => {
  render(<MemoizedInputClient data-testid="el" type="password" />);
  const el = screen.getByTestId("el") as HTMLInputElement;
  expect(el.type).toBe("password");
});
