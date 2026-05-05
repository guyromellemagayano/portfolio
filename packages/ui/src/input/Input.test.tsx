import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InputField } from ".";

describe("InputField", () => {
  it("renders low-boilerplate accessible field state", () => {
    render(
      <InputField
        description="Use a work email."
        error="Enter a valid email."
        id="email-helper"
        inputProps={{ type: "email" }}
        label="Email"
        required
      />
    );

    const email = screen.getByRole("textbox", { name: "Email" });

    expect(email).toHaveAttribute("id", "email-helper-control");
    expect(email).toHaveAttribute(
      "aria-describedby",
      "email-helper-description email-helper-error"
    );
    expect(email).toHaveAccessibleDescription(
      "Use a work email. Enter a valid email."
    );
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("required");
    expect(email).toHaveAttribute("type", "email");
  });
});
