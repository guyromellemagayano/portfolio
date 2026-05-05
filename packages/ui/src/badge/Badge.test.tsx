import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BadgeList, StatusBadge } from ".";

describe("Badge", () => {
  it("renders status variants and preserves list semantics", () => {
    render(
      <BadgeList aria-label="Build states">
        <StatusBadge status="error">Failed</StatusBadge>
        <StatusBadge status="info">Queued</StatusBadge>
        <StatusBadge status="neutral">Idle</StatusBadge>
        <StatusBadge status="warning">Delayed</StatusBadge>
      </BadgeList>
    );

    expect(screen.getByRole("list", { name: "Build states" })).toHaveAttribute(
      "data-slot",
      "badge-list"
    );
    expect(screen.getByText("Failed")).toHaveAttribute("data-status", "error");
    expect(screen.getByText("Failed")).toHaveClass("text-destructive");
    expect(screen.getByText("Queued")).toHaveAttribute("data-status", "info");
    expect(screen.getByText("Queued")).toHaveClass("text-primary");
    expect(screen.getByText("Idle")).toHaveAttribute("data-status", "neutral");
    expect(screen.getByText("Delayed")).toHaveAttribute(
      "data-status",
      "warning"
    );
    expect(screen.getByText("Delayed")).toHaveClass("text-amber-700");
  });
});
