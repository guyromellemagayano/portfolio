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

it.skip("filters textarea-only props when rendered as div via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Textarea
      as="div"
      data-testid="ta-as-div"
      defaultValue="x"
      placeholder="p"
      rows={4}
      cols={20}
      required
      readOnly
    />
  );
  const el = screen.getByTestId("ta-as-div");
  expect(el.tagName).toBe("DIV");
  expect(el).not.toHaveAttribute("placeholder");
  expect(el).not.toHaveAttribute("rows");
  expect(el).not.toHaveAttribute("cols");
  expect(el).not.toBeRequired();
  expect(el).not.toHaveAttribute("readonly");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Textarea data-testid="ta-dev" />);
  const el = screen.getByTestId("ta-dev");
  expect(el).toHaveAttribute("data-component", "Textarea");
  expect(el).toHaveAttribute("data-as", "textarea");
  process.env.NODE_ENV = original;
});
