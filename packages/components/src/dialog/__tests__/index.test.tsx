import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Dialog } from "..";

it("renders a dialog element", () => {
  render(<Dialog data-testid="el">Content</Dialog>);
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIALOG");
  expect(el).toHaveTextContent("Content");
});

it("supports 'as' prop", () => {
  render(
    <Dialog as="div" data-testid="el">
      x
    </Dialog>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Dialog isClient data-testid="el">
      c
    </Dialog>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DIALOG");
  await screen.findByTestId("el");
});
