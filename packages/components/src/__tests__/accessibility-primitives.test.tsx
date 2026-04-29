import React from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  VisuallyHidden,
} from "../index";

describe("accessibility primitives", () => {
  it("derives field label, description, and error ids from the field root", () => {
    render(
      <Field id="email" invalid required>
        <FieldLabel>Email</FieldLabel>
        <Input
          aria-describedby="email-description email-error"
          aria-invalid="true"
          data-testid="control"
          id="email-control"
        />
        <FieldDescription>Use a work email.</FieldDescription>
        <FieldError>Enter a valid email.</FieldError>
      </Field>
    );

    const field = screen.getByText("Email").closest("[data-component='Field']");

    expect(field).toHaveAttribute("id", "email");
    expect(field).toHaveAttribute("data-invalid", "");
    expect(field).toHaveAttribute("data-required", "");
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-control");
    expect(screen.getByText("Use a work email.")).toHaveAttribute(
      "id",
      "email-description"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
    expect(screen.getByTestId("control")).toHaveAttribute(
      "aria-describedby",
      "email-description email-error"
    );
  });

  it("keeps visually hidden content in the accessibility tree", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<VisuallyHidden ref={ref}>Screen reader text</VisuallyHidden>);

    expect(screen.getByText("Screen reader text")).toBeInTheDocument();
    expect(ref.current).toHaveStyle({ position: "absolute" });
  });
});
