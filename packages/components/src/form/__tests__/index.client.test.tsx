import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { FormClient, MemoizedFormClient } from "../index.client";

it("renders a form element (client)", () => {
  render(
    <FormClient data-testid="el" method="get" action="/q">
      <button />
    </FormClient>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FORM");
  expect(el).toHaveAttribute("method", "get");
  expect(el).toHaveAttribute("action", "/q");
});

it("renders memoized form element (client)", () => {
  render(
    <MemoizedFormClient data-testid="el">
      <button />
    </MemoizedFormClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("FORM");
});
