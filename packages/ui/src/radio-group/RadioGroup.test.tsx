import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { RadioGroup, RadioGroupItem, RadioGroupOption } from ".";

describe("RadioGroup", () => {
  it("wires field accessibility state into the radio group", () => {
    render(
      <Field id="plan" invalid required>
        <FieldLabel>Plan</FieldLabel>
        <RadioGroup defaultValue="pro">
          <div>
            <RadioGroupItem id="plan-pro" value="pro" />
            <label htmlFor="plan-pro">Pro</label>
          </div>
        </RadioGroup>
        <FieldDescription>Select one plan.</FieldDescription>
        <FieldError>A plan is required.</FieldError>
      </Field>
    );

    const radioGroup = screen.getByRole("radiogroup", { name: "Plan" });

    expect(radioGroup).toHaveAttribute("id", "plan-control");
    expect(radioGroup).toHaveAttribute("aria-labelledby", "plan-label");
    expect(radioGroup).toHaveAttribute(
      "aria-describedby",
      "plan-description plan-error"
    );
    expect(radioGroup).toHaveAttribute("aria-invalid", "true");
    expect(radioGroup).toHaveAttribute("aria-required", "true");
  });

  it("renders option descriptions and preserves external describedby tokens", () => {
    render(
      <Field id="plan-helper" required>
        <FieldLabel>Plan</FieldLabel>
        <RadioGroup defaultValue="pro">
          <RadioGroupOption
            description="For production teams."
            id="plan-helper-pro"
            label="Pro"
            value="pro"
          />
          <RadioGroupOption
            id="plan-helper-basic"
            itemProps={{ "aria-describedby": "plan-helper-external-note" }}
            label="Basic"
            value="basic"
          />
        </RadioGroup>
        <FieldDescription>Select one plan.</FieldDescription>
      </Field>
    );

    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute(
      "id",
      "plan-helper-pro"
    );
    expect(
      screen.getByRole("radio", { name: "Pro" })
    ).toHaveAccessibleDescription("For production teams.");
    expect(screen.getByRole("radio", { name: "Basic" })).toHaveAttribute(
      "aria-describedby",
      "plan-helper-external-note"
    );
  });
});
