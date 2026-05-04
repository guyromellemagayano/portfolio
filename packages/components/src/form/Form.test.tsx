import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Form } from ".";

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

it("renders with standard props", async () => {
  render(
    <Form data-testid="el">
      <button />
    </Form>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("FORM");
  await screen.findByTestId("el");
});
