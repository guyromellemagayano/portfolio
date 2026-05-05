import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from ".";

describe("DropdownMenu", () => {
  it("renders menu content with analytics, shortcuts, and destructive state", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem
            analytics={{ event: "menu_click", placement: "account_menu" }}
            shortcut="P"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem destructive>
            Delete
            <DropdownMenuShortcut>Del</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(
      document.querySelector('[data-slot="dropdown-menu-content"]')
    ).toHaveAttribute("role", "menu");
    expect(
      document.querySelector('[data-slot="dropdown-menu-label"]')
    ).toHaveTextContent("Account");
    expect(screen.getByRole("menuitem", { name: "Profile P" })).toHaveAttribute(
      "data-analytics-event",
      "menu_click"
    );
    expect(screen.getByText("P")).toHaveAttribute(
      "data-slot",
      "dropdown-menu-shortcut"
    );
    expect(document.querySelector("[data-destructive]")).toHaveTextContent(
      "Delete"
    );
    expect(
      screen.getByRole("menuitem", { name: "Disabled item" })
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      document.querySelector('[data-slot="dropdown-menu-separator"]')
    ).toHaveAttribute("role", "separator");
  });
});
