import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Slot } from "..";

it("renders a slot element with name", () => {
  render(<Slot data-testid="el" name="summary" />);
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("SLOT");
  expect(el).toHaveAttribute("name", "summary");
});
