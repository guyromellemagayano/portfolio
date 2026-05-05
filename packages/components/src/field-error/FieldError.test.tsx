import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldError } from "../index";

describe("FieldError", () => {
  it("uses explicit error props outside field context", () => {
    render(
      <FieldError id="manual-error" role="status">
        Saved with warnings.
      </FieldError>
    );

    const error = screen.getByRole("status");

    expect(error).toHaveAttribute("id", "manual-error");
    expect(error).not.toHaveAttribute("data-invalid");
  });

  it("does not mark itself invalid when the owning field is valid", () => {
    render(
      <Field id="email">
        <FieldError>Email looks good.</FieldError>
      </Field>
    );

    const error = screen.getByRole("alert");

    expect(error).toHaveAttribute("id", "email-error");
    expect(error).not.toHaveAttribute("data-invalid");
  });
});
