/**
 * @file Text.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Text component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Heading, Lead, SubHeading } from "../Text";

import "@testing-library/jest-dom";

// ============================================================================
// MOCKS
// ============================================================================

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ")
  ),
}));

// ============================================================================
// TESTS
// ============================================================================

describe("Text Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Composed Text Content", () => {
    it("renders composed content with subheading, heading, and lead", () => {
      const { container } = render(
        <section>
          <SubHeading>Overview</SubHeading>
          <Heading as="h2">Section Title</Heading>
          <Lead>Supporting lead text</Lead>
        </section>
      );

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();

      const subheading = screen.getByText("Overview");
      const heading = screen.getByRole("heading", {
        level: 2,
        name: "Section Title",
      });
      const lead = screen.getByText("Supporting lead text");

      expect(subheading.tagName).toBe("P");
      expect(heading.tagName).toBe("H2");
      expect(lead.tagName).toBe("P");

      const children = Array.from(section?.children ?? []);
      expect(children[0]).toBe(subheading);
      expect(children[1]).toBe(heading);
      expect(children[2]).toBe(lead);
    });

    it("supports multiple heading levels in a composed layout", () => {
      render(
        <div>
          <Heading as="h1">Primary Title</Heading>
          <Heading as="h3">Tertiary Title</Heading>
        </div>
      );

      expect(
        screen.getByRole("heading", { level: 1, name: "Primary Title" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: "Tertiary Title" })
      ).toBeInTheDocument();
    });

    it("merges className overrides across composed text elements", () => {
      render(
        <div>
          <Heading className="heading-class">Heading</Heading>
          <SubHeading className="subheading-class">Subheading</SubHeading>
          <Lead className="lead-class">Lead content</Lead>
        </div>
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("heading-class");

      const subheading = screen.getByText("Subheading");
      expect(subheading).toHaveClass("subheading-class", "font-mono");

      const lead = screen.getByText("Lead content");
      expect(lead).toHaveClass("lead-class", "text-xl");
    });
  });
});
