import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PaginationControls } from ".";

describe("PaginationControls", () => {
  it("supports omitted edge controls and fallback page keys", () => {
    render(
      <PaginationControls
        aria-label="Filtered pages"
        next={null}
        pages={[
          { label: "One" },
          { label: <span>Current page</span> },
          {
            ellipsisProps: { className: "opacity-60" },
            label: "Skipped filtered pages",
            type: "ellipsis",
          },
        ]}
        previous={null}
      />
    );

    const navigation = screen.getByRole("navigation", {
      name: "Filtered pages",
    });

    expect(navigation).toHaveAttribute("data-slot", "pagination");
    expect(screen.queryByRole("link", { name: "Previous page" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Next page" })).toBeNull();
    expect(screen.getByText("One")).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.getByText("Current page").closest('[data-slot="pagination-link"]')
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.getByText("Skipped filtered pages").parentElement
    ).toHaveClass("opacity-60");
  });
});
