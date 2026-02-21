import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Input } from "..";

it.skip("filters input-only props when rendered as span via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Input
      as="span"
      data-testid="inp-as-span"
      type="email"
      required
      readOnly
      defaultValue="x"
    />
  );
  const el = screen.getByTestId("inp-as-span");
  expect(el.tagName).toBe("SPAN");
  expect(el).not.toHaveAttribute("type");
  expect(el).not.toHaveAttribute("required");
  expect(el).not.toHaveAttribute("readonly");
  expect(el).not.toHaveAttribute("value");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug data attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Input data-testid="inp-dev" />);
  const el = screen.getByTestId("inp-dev");
  expect(el).toHaveAttribute("data-component", "Input");
  expect(el).toHaveAttribute("data-as", "input");
  process.env.NODE_ENV = original;
});

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
  expect(el).toHaveAttribute("required");
});

it("passes through invalid type to input without crashing (documented behavior)", () => {
  render(<Input data-testid="el" type={"invalid" as any} />);
  const el = screen.getByTestId("el") as HTMLInputElement;
  expect(el).toHaveAttribute("type", "invalid");
});
