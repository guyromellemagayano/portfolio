import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from ".";

describe("Dialog", () => {
  it("renders low-boilerplate accessible content", () => {
    render(
      <Dialog open>
        <DialogContent
          closeLabel="Close profile editor"
          description="Update the account details shown on your public profile."
          footer={<button type="button">Save profile</button>}
          title="Edit profile"
        >
          <p>Profile form fields</p>
        </DialogContent>
      </Dialog>
    );

    expect(
      screen.getByRole("dialog", { name: "Edit profile" })
    ).toHaveAccessibleDescription(
      "Update the account details shown on your public profile."
    );
    expect(
      screen.getByRole("button", { name: "Close profile editor" })
    ).toBeInTheDocument();
    expect(screen.getByText("Close profile editor")).toHaveAttribute(
      "data-slot",
      "visually-hidden"
    );
    expect(screen.getByText("Save profile").parentElement).toHaveAttribute(
      "data-slot",
      "dialog-footer"
    );
  });

  it("renders manual header and footer slots", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button type="button">Close dialog</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(
      screen.getByRole("dialog", { name: "Dialog title" })
    ).toHaveAccessibleDescription("Dialog description");
    expect(
      document.querySelector('[data-slot="dialog-header"]')
    ).toHaveTextContent("Dialog title");
    expect(
      document.querySelector('[data-slot="dialog-footer"]')
    ).toHaveTextContent("Close dialog");
  });

  it("notifies when the close control is activated", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Dialog onOpenChange={handleOpenChange} open>
        <DialogContent closeLabel="Dismiss editor" title="Editor" />
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Dismiss editor" }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
