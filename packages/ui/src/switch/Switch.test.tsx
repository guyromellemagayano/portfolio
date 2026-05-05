import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldDescription, FieldLabel } from "../field";
import { Switch, SwitchField } from ".";

describe("Switch", () => {
  it("wires field accessibility state into the switch", () => {
    render(
      <Field id="updates" required>
        <FieldLabel>Email updates</FieldLabel>
        <Switch />
        <FieldDescription>Receive product updates.</FieldDescription>
      </Field>
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email updates",
    });

    expect(switchControl).toHaveAttribute("id", "updates-control");
    expect(switchControl).toHaveAttribute("aria-labelledby", "updates-label");
    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      "updates-description"
    );
    expect(switchControl).toHaveAttribute("aria-required", "true");
  });

  it("renders custom thumbs and low-boilerplate field state", () => {
    render(
      <div>
        <Switch aria-label="Custom switch">
          <span data-testid="custom-switch-thumb">On</span>
        </Switch>
        <SwitchField
          description="Receive product updates."
          error="Choose whether to receive updates."
          id="updates-helper"
          label="Email updates"
          required
        />
      </div>
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email updates",
    });

    expect(screen.getByTestId("custom-switch-thumb")).toHaveTextContent("On");
    expect(switchControl).toHaveAttribute("id", "updates-helper-control");
    expect(switchControl).toHaveAccessibleDescription(
      "Receive product updates. Choose whether to receive updates."
    );
    expect(switchControl).toHaveAttribute("aria-invalid", "true");
    expect(switchControl).toHaveAttribute("aria-required", "true");
  });

  it("omits optional helper text and error wiring when not provided", () => {
    render(
      <SwitchField
        id="compact-updates"
        invalid={false}
        label="Compact updates"
      />
    );

    const switchControl = screen.getByRole("switch", {
      name: "Compact updates",
    });

    expect(switchControl).toHaveAttribute("id", "compact-updates-control");
    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      "compact-updates-description"
    );
    expect(switchControl).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
