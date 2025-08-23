import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import {
  MemoizedObjectClient,
  ObjectClient as ObjectTagClient,
} from "../index.client";

it("renders an object element (client)", () => {
  render(<ObjectTagClient data-testid="el" data="/a" />);
  expect(screen.getByTestId("el").tagName).toBe("OBJECT");
});

it("renders memoized object element (client)", () => {
  render(<MemoizedObjectClient data-testid="el" data="/b" />);
  expect(screen.getByTestId("el").tagName).toBe("OBJECT");
});
