import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Textarea } from "..";

it("renders a textarea and updates value", () => {
  render(<Textarea data-testid="el" name="t" defaultValue="a" rows={3} />);
  const el = screen.getByTestId("el") as HTMLTextAreaElement;
  expect(el.tagName).toBe("TEXTAREA");
  expect(el.value).toBe("a");
  fireEvent.change(el, { target: { value: "b" } });
  expect(el.value).toBe("b");
});

it("toggles attributes across rerenders", () => {
  const { rerender } = render(
    <Textarea data-testid="el" readOnly={false} disabled={false} />
  );
  let el = screen.getByTestId("el");
  expect(el).not.toHaveAttribute("readonly");
  expect(el).toBeEnabled();
  rerender(<Textarea data-testid="el" readOnly disabled />);
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("readonly");
  expect(el).toBeDisabled();
});
