import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchField, SearchInput } from ".";

describe("SearchInput", () => {
  it("shows clear affordance when forced and calls the clear handler", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(
      <SearchInput
        aria-label="Search work"
        clearLabel="Clear work search"
        onClear={onClear}
        showClear
        value=""
      />
    );

    await user.click(screen.getByRole("button", { name: "Clear work search" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("renders field description and error only when provided", () => {
    render(
      <SearchField
        description="Filter visible entries."
        error="Search failed."
        id="work-search"
        label="Search"
      />
    );

    const search = screen.getByRole("searchbox", { name: "Search" });

    expect(search).toHaveAttribute("id", "work-search-control");
    expect(search).toHaveAccessibleDescription(
      "Filter visible entries. Search failed."
    );
    expect(search).toHaveAttribute("aria-invalid", "true");
  });
});
