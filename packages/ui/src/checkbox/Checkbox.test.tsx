import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { Checkbox, CheckboxField } from ".";

describe("Checkbox", () => {
  it("wires field accessibility state into the checkbox", () => {
    render(
      <Field id="terms" invalid required>
        <FieldLabel>Accept terms</FieldLabel>
        <Checkbox />
        <FieldDescription>Required before continuing.</FieldDescription>
        <FieldError>Accept the terms to continue.</FieldError>
      </Field>
    );

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

    expect(checkbox).toHaveAttribute("id", "terms-control");
    expect(checkbox).toHaveAttribute("aria-labelledby", "terms-label");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "terms-description terms-error"
    );
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(checkbox).toHaveAttribute("data-invalid", "");
    expect(checkbox).toHaveAttribute("data-required", "");
  });

  it("renders custom indicators and low-boilerplate field state", () => {
    render(
      <div>
        <Checkbox aria-label="Custom checkbox">
          <span data-testid="custom-checkbox-indicator">Selected</span>
        </Checkbox>
        <CheckboxField
          description="Required before continuing."
          error="Accept the terms to continue."
          id="terms-helper"
          label="Accept terms"
          required
        />
      </div>
    );

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

    expect(screen.getByTestId("custom-checkbox-indicator")).toHaveTextContent(
      "Selected"
    );
    expect(checkbox).toHaveAttribute("id", "terms-helper-control");
    expect(checkbox).toHaveAccessibleDescription(
      "Required before continuing. Accept the terms to continue."
    );
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");
  });

  it("omits optional helper text and error wiring when not provided", () => {
    render(
      <CheckboxField id="compact-terms" invalid={false} label="Compact terms" />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Compact terms" });

    expect(checkbox).toHaveAttribute("id", "compact-terms-control");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "compact-terms-description"
    );
    expect(checkbox).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
