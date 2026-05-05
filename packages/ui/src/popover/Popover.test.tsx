import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from ".";

describe("Popover", () => {
  it("generates accessible labelling for titled content", () => {
    render(
      <Popover open>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent description="Popover description" title="Popover title">
          Popover content
        </PopoverContent>
      </Popover>
    );

    const content = document.querySelector('[data-slot="popover-content"]');

    expect(content).toHaveAttribute("aria-labelledby");
    expect(content).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Popover title")).toHaveAttribute(
      "data-slot",
      "popover-title"
    );
    expect(screen.getByText("Popover description")).toHaveAttribute(
      "data-slot",
      "popover-description"
    );
  });

  it("supports manual header composition", () => {
    render(
      <Popover open>
        <PopoverTrigger>Open custom popover</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Manual popover</PopoverTitle>
            <PopoverDescription>Manual description</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Manual popover")).toHaveAttribute(
      "data-slot",
      "popover-title"
    );
    expect(screen.getByText("Manual description")).toHaveAttribute(
      "data-slot",
      "popover-description"
    );
  });
});
