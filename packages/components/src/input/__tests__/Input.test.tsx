import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Input } from "..";

it("renders an input with default type text and changes value", () => {
  render(<Input data-testid="el" defaultValue="a" />);
  const el = screen.getByTestId("el") as HTMLInputElement;
  expect(el.tagName).toBe("INPUT");
  expect(el.type).toBe("text");
  expect(el.value).toBe("a");
  fireEvent.change(el, { target: { value: "b" } });
  expect(el.value).toBe("b");
});

it("respects type prop and toggles attributes", () => {
  const { rerender } = render(
    <Input data-testid="el" type="number" min={1} max={5} />
  );
  let el = screen.getByTestId("el") as HTMLInputElement;
  expect(el.type).toBe("number");
  expect(el).toHaveAttribute("min", "1");
  expect(el).toHaveAttribute("max", "5");
  rerender(<Input data-testid="el" type="email" required />);
  el = screen.getByTestId("el") as HTMLInputElement;
  expect(el.type).toBe("email");
  expect(el).toBeRequired();
});

it("passes through invalid type to input without crashing (documented behavior)", () => {
  render(<Input data-testid="el" type={"invalid" as any} />);
  const el = screen.getByTestId("el") as HTMLInputElement;
  expect(el).toHaveAttribute("type", "invalid");
});
