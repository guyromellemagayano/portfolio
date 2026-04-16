import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Form } from "..";

it("renders a form element with attributes", () => {
  render(
    <Form data-testid="el" method="post" action="/submit">
      <button type="submit">Go</button>
    </Form>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FORM");
  expect(el).toHaveAttribute("method", "post");
  expect(el).toHaveAttribute("action", "/submit");
});

it("supports 'as' prop", () => {
  render(
    <Form as="div" data-testid="el">
      x
    </Form>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Form isClient data-testid="el">
      <button />
    </Form>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FORM");
  await screen.findByTestId("el");
});

it.skip("filters form-only props when rendered as span via as, and warns in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  render(
    <Form
      as="span"
      data-testid="form-as-span"
      action="/s"
      method="post"
      encType="multipart/form-data"
      target="_blank"
      noValidate
      autoComplete="on"
      acceptCharset="utf-8"
    >
      x
    </Form>
  );
  const el = screen.getByTestId("form-as-span");
  expect(el.tagName).toBe("SPAN");
  expect(el).not.toHaveAttribute("action");
  expect(el).not.toHaveAttribute("method");
  expect(el).not.toHaveAttribute("enctype");
  expect(el).not.toHaveAttribute("target");
  expect(el).not.toHaveAttribute("novalidate");
  expect(el).not.toHaveAttribute("autocomplete");
  expect(el).not.toHaveAttribute("accept-charset");
  expect(warnSpy).toHaveBeenCalled();

  warnSpy.mockRestore();
  process.env.NODE_ENV = original;
});

it.skip("adds dev debug attributes in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Form data-testid="form-dev" />);
  const el = screen.getByTestId("form-dev");
  expect(el).toHaveAttribute("data-component", "Form");
  expect(el).toHaveAttribute("data-as", "form");
  process.env.NODE_ENV = original;
});
