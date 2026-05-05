import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Textarea, TextareaField } from ".";

describe("TextareaField", () => {
  it("renders low-boilerplate accessible field state", () => {
    render(
      <TextareaField
        description="Share the project context."
        error="Project context is required."
        id="message-helper"
        label="Message"
        textareaProps={{ rows: 4 }}
      />
    );

    const message = screen.getByRole("textbox", { name: "Message" });

    expect(message).toHaveAttribute("id", "message-helper-control");
    expect(message).toHaveAccessibleDescription(
      "Share the project context. Project context is required."
    );
    expect(message).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("rows", "4");
  });

  it("renders plain textarea and compact field variants", () => {
    render(
      <div>
        <Textarea aria-label="Standalone message" />
        <TextareaField id="compact-message" label="Compact message" />
      </div>
    );

    const standalone = screen.getByRole("textbox", {
      name: "Standalone message",
    });
    const compact = screen.getByRole("textbox", { name: "Compact message" });

    expect(standalone).toHaveAttribute("data-slot", "textarea");
    expect(compact).toHaveAttribute("id", "compact-message-control");
    expect(compact).toHaveAttribute(
      "aria-describedby",
      "compact-message-description"
    );
    expect(compact).not.toHaveAttribute("aria-invalid");
  });
});
