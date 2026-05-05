import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  Toaster,
  ToastTitle,
} from ".";

describe("Toast", () => {
  it("renders toast slots, intents, actions, and close labels", () => {
    render(
      <Toaster>
        <Toast open intent="success">
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Profile saved.</ToastDescription>
          <ToastAction altText="Undo save">Undo</ToastAction>
          <ToastClose closeLabel="Dismiss saved message" />
        </Toast>
        <Toast open intent="error">
          <ToastTitle>Failed</ToastTitle>
        </Toast>
        <Toast open intent="warning">
          <ToastTitle>Review</ToastTitle>
        </Toast>
        <Toast open>
          <ToastTitle>Queued</ToastTitle>
        </Toast>
      </Toaster>
    );

    expect(screen.getByText("Saved")).toHaveAttribute(
      "data-slot",
      "toast-title"
    );
    expect(screen.getByText("Profile saved.")).toHaveAttribute(
      "data-slot",
      "toast-description"
    );
    expect(
      document.querySelector('[data-slot="toast-action"]')
    ).toHaveTextContent("Undo");
    expect(
      screen.getByText("Failed").closest('[data-slot="toast"]')
    ).toHaveAttribute("data-intent", "error");
    expect(
      screen.getByText("Review").closest('[data-slot="toast"]')
    ).toHaveAttribute("data-intent", "warning");
    expect(
      screen.getByText("Queued").closest('[data-slot="toast"]')
    ).toHaveAttribute("data-intent", "neutral");
    expect(
      document.querySelector('[data-slot="toast-close"]')
    ).toHaveTextContent("Dismiss saved message");
    expect(
      document.querySelector('[data-slot="toast-viewport"]')
    ).toHaveAttribute("data-slot", "toast-viewport");
  });
});
