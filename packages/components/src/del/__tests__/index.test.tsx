import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Del } from "..";

it("renders a del element", () => {
  render(<Del data-testid="el">Removed</Del>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DEL");
  expect(el).toHaveTextContent("Removed");
});

it("supports 'as' prop", () => {
  render(
    <Del as="span" data-testid="el">
      x
    </Del>
  );
  expect(screen.getByTestId("el").tagName).toBe("SPAN");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Del isClient data-testid="el">
      x
    </Del>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DEL");
  await screen.findByTestId("el");
});
