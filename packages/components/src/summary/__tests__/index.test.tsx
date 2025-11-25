import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Summary } from "..";

it("renders summary inside details and toggles open", () => {
  render(
    <details>
      <Summary data-testid="el">More</Summary>
      <div>content</div>
    </details>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SUMMARY");
  const details = el.closest("details")!;
  expect(details.open).toBe(false);
  fireEvent.click(el);
  expect(details.open).toBe(true);
});
