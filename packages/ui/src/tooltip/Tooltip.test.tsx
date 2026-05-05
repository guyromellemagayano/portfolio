import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from ".";

describe("Tooltip", () => {
  it("renders labelled tooltip content through the provider", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent label="Tooltip label" />
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip label");
    expect(
      document.querySelector('[data-slot="tooltip-content"]')
    ).toHaveTextContent("Tooltip label");
    expect(
      document.querySelector('[data-slot="tooltip-content"]')
    ).toHaveAttribute("data-slot", "tooltip-content");
  });

  it("falls back to children when no label is provided", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Manual tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("Manual tooltip");
  });
});
