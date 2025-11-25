import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Em } from "..";

it("renders an em element", () => {
  render(<Em data-testid="el">Italic</Em>);
  expect(screen.getByTestId("el").tagName).toBe("EM");
});

it("supports 'as' prop", () => {
  render(
    <Em as="span" data-testid="el">
      x
    </Em>
  );
  expect(screen.getByTestId("el").tagName).toBe("SPAN");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Em isClient data-testid="el">
      t
    </Em>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("EM");
  await screen.findByTestId("el");
});
