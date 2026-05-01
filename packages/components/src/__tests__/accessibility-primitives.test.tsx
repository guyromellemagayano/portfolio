import React from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Select,
  Textarea,
  VisuallyHidden,
} from "../index";

describe("accessibility primitives", () => {
  it("derives field relationships from the field root", () => {
    render(
      <Field id="email" invalid required>
        <FieldLabel>Email</FieldLabel>
        <Input aria-invalid="false" data-testid="control" required={false} />
        <FieldDescription>Use a work email.</FieldDescription>
        <FieldError>Enter a valid email.</FieldError>
      </Field>
    );

    const field = screen.getByText("Email").closest("[data-component='Field']");

    expect(field).toHaveAttribute("id", "email");
    expect(field).toHaveAttribute("data-invalid", "");
    expect(field).toHaveAttribute("data-required", "");
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-control");
    expect(screen.getByText("Email")).toHaveAttribute("id", "email-label");
    expect(screen.getByTestId("control")).toHaveAttribute(
      "id",
      "email-control"
    );
    expect(screen.getByTestId("control")).toHaveAttribute("required");
    expect(screen.getByText("Use a work email.")).toHaveAttribute(
      "id",
      "email-description"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
    expect(screen.getByTestId("control")).toHaveAttribute(
      "aria-describedby",
      "email-description email-error"
    );
    expect(screen.getByTestId("control")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByTestId("control")).toHaveAttribute("data-invalid", "");
    expect(screen.getByTestId("control")).toHaveAttribute("data-required", "");
  });

  it("wires native textarea and select controls while preserving describedby tokens", () => {
    render(
      <div>
        <Field controlId="custom-profile" id="profile" invalid>
          <FieldLabel>Profile</FieldLabel>
          <Textarea
            aria-describedby="custom-help profile-description"
            data-testid="profile-control"
          />
          <FieldDescription>Short public bio.</FieldDescription>
          <FieldError>Profile is required.</FieldError>
        </Field>
        <Field id="role" required>
          <FieldLabel>Role</FieldLabel>
          <Select data-testid="role-control">
            <option>Engineer</option>
          </Select>
          <FieldDescription>Select the closest role.</FieldDescription>
        </Field>
      </div>
    );

    expect(screen.getByText("Profile")).toHaveAttribute(
      "for",
      "custom-profile"
    );
    expect(screen.getByText("Profile")).toHaveAttribute("id", "profile-label");
    expect(screen.getByTestId("profile-control")).toHaveAttribute(
      "id",
      "custom-profile"
    );
    expect(screen.getByTestId("profile-control")).toHaveAttribute(
      "aria-describedby",
      "custom-help profile-description profile-error"
    );
    expect(screen.getByTestId("role-control")).toHaveAttribute(
      "id",
      "role-control"
    );
    expect(screen.getByTestId("role-control")).toHaveAttribute("required");
    expect(screen.getByTestId("role-control")).toHaveAttribute(
      "aria-describedby",
      "role-description"
    );
  });

  it("keeps visually hidden content in the accessibility tree", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<VisuallyHidden ref={ref}>Screen reader text</VisuallyHidden>);

    expect(screen.getByText("Screen reader text")).toBeInTheDocument();
    expect(ref.current).toHaveStyle({ position: "absolute" });
  });
});
