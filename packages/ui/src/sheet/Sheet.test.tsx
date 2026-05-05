import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from ".";

describe("Sheet", () => {
  it("renders low-boilerplate accessible content", () => {
    render(
      <Sheet open>
        <SheetContent
          closeLabel="Close filters"
          description="Refine the visible project list."
          footer={<button type="button">Apply filters</button>}
          title="Project filters"
        >
          <p>Filter controls</p>
        </SheetContent>
      </Sheet>
    );

    expect(
      screen.getByRole("dialog", { name: "Project filters" })
    ).toHaveAccessibleDescription("Refine the visible project list.");
    expect(
      screen.getByRole("button", { name: "Close filters" })
    ).toBeInTheDocument();
    expect(screen.getByText("Close filters")).toHaveAttribute(
      "data-slot",
      "visually-hidden"
    );
    expect(screen.getByText("Apply filters").parentElement).toHaveAttribute(
      "data-slot",
      "sheet-footer"
    );
  });

  it("supports side variants and manual slots", () => {
    render(
      <Sheet open>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Sheet title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <button type="button">Apply filters</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    expect(
      screen.getByRole("dialog", { name: "Sheet title" })
    ).toHaveAccessibleDescription("Sheet description");
    expect(document.querySelector('[data-slot="sheet-content"]')).toHaveClass(
      "left-0"
    );
    expect(
      document.querySelector('[data-slot="sheet-footer"]')
    ).toHaveTextContent("Apply filters");
  });

  it("notifies when the close control is activated", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Sheet onOpenChange={handleOpenChange} open>
        <SheetContent closeLabel="Dismiss filters" title="Filters" />
      </Sheet>
    );

    await user.click(screen.getByRole("button", { name: "Dismiss filters" }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
