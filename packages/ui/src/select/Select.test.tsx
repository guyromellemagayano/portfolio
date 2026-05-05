import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import {
  Select,
  SelectContent,
  SelectField,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from ".";

describe("Select", () => {
  it("wires field accessibility state into the trigger", () => {
    render(
      <Field id="choice" invalid required>
        <FieldLabel>Choice</FieldLabel>
        <Select defaultValue="one" open>
          <SelectTrigger>
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Numbers</SelectLabel>
              <SelectItem value="one">One</SelectItem>
            </SelectGroup>
            <SelectSeparator />
          </SelectContent>
        </Select>
        <FieldDescription>Choose one option.</FieldDescription>
        <FieldError>Choice is required.</FieldError>
      </Field>
    );

    const trigger = document.querySelector('[data-slot="select-trigger"]');

    expect(trigger).toHaveAttribute("id", "choice-control");
    expect(trigger).toHaveAttribute(
      "aria-describedby",
      "choice-description choice-error"
    );
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-required", "true");
    expect(trigger).not.toHaveAttribute("required");
    expect(
      document.querySelector('[data-slot="select-label"]')
    ).toHaveTextContent("Numbers");
    expect(
      document.querySelector('[data-slot="select-separator"]')
    ).toHaveAttribute("data-slot", "select-separator");
  });

  it("renders a low-boilerplate accessible select field", () => {
    render(
      <SelectField
        description="Choose the work type."
        error="Select one option."
        id="role-helper"
        label="Role"
        placeholder="Choose a role"
        required
        selectProps={{ defaultValue: "engineering" }}
      >
        <SelectItem value="engineering">Engineering</SelectItem>
      </SelectField>
    );

    const role = screen.getByRole("combobox", { name: "Role" });

    expect(role).toHaveAttribute("id", "role-helper-control");
    expect(role).toHaveAttribute(
      "aria-describedby",
      "role-helper-description role-helper-error"
    );
    expect(role).toHaveAccessibleDescription(
      "Choose the work type. Select one option."
    );
    expect(role).toHaveAttribute("aria-invalid", "true");
    expect(role).toHaveAttribute("aria-required", "true");
  });

  it("uses value placeholder overrides and omits helper wiring when absent", () => {
    render(
      <SelectField
        id="compact-role"
        label="Compact role"
        placeholder="Fallback role"
        required
        valueProps={{ placeholder: "Override role" }}
      >
        <SelectItem value="engineering">Engineering</SelectItem>
      </SelectField>
    );

    const role = screen.getByRole("combobox", { name: "Compact role" });

    expect(role).toHaveAttribute("id", "compact-role-control");
    expect(role).toHaveAttribute(
      "aria-describedby",
      "compact-role-description"
    );
    expect(role).not.toHaveAttribute("aria-invalid");
    expect(role).toHaveTextContent("Override role");
  });
});
