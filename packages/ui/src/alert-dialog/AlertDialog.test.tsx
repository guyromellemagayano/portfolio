import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from ".";

describe("AlertDialog", () => {
  it("renders low-boilerplate accessible content", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent
          description="This action permanently removes the selected project."
          footer={
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </>
          }
          headerProps={{ id: "alert-generated-header" }}
          title="Delete project"
          titleProps={{ className: "custom-title" }}
        />
      </AlertDialog>
    );

    expect(
      screen.getByRole("alertdialog", { name: "Delete project" })
    ).toHaveAccessibleDescription(
      "This action permanently removes the selected project."
    );
    expect(document.getElementById("alert-generated-header")).toHaveAttribute(
      "data-slot",
      "alert-dialog-header"
    );
    expect(screen.getByText("Delete project")).toHaveClass("custom-title");
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("renders manual header and footer slots", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete item</AlertDialogTitle>
            <AlertDialogDescription>Confirm deletion.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(
      screen.getByRole("alertdialog", { name: "Delete item" })
    ).toHaveAccessibleDescription("Confirm deletion.");
    expect(
      document.querySelector('[data-slot="alert-dialog-content"]')
    ).toHaveTextContent("Delete item");
    expect(
      document.querySelector('[data-slot="alert-dialog-footer"]')
    ).toHaveTextContent("Continue");
  });
});
