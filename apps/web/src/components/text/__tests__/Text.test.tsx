/**
 * @file Text.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Text component.
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

describe("Text", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Heading", () => {
    describe("Basic Rendering", () => {
      it("renders h1 by default", () => {
        render(<Heading>Primary Heading</Heading>);

        const heading = screen.getByRole("heading", {
          level: 1,
          name: "Primary Heading",
        });
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe("H1");
      });

      it("renders with specified heading level", () => {
        render(<Heading as="h3">Tertiary Heading</Heading>);

        const heading = screen.getByRole("heading", {
          level: 3,
          name: "Tertiary Heading",
        });
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe("H3");
      });
    });

    describe("Props and Attributes", () => {
      it("applies custom className", () => {
        render(<Heading className="custom-class">Heading</Heading>);

        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toHaveClass("custom-class");
      });

      it("passes through additional props", () => {
        render(
          <Heading id="heading-id" data-testid="heading">
            Heading
          </Heading>
        );

        const heading = screen.getByTestId("heading");
        expect(heading).toHaveAttribute("id", "heading-id");
      });
    });

    describe("Content Validation", () => {
      it("returns null when children are empty string", () => {
        const { container } = render(<Heading>{""}</Heading>);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when children are null", () => {
        const { container } = render(<Heading>{null}</Heading>);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when children are undefined", () => {
        const { container } = render(<Heading>{undefined}</Heading>);
        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  describe("SubHeading", () => {
    describe("Basic Rendering", () => {
      it("renders as paragraph with default styles", () => {
        render(<SubHeading>Subheading</SubHeading>);

        const subheading = screen.getByText("Subheading");
        expect(subheading).toBeInTheDocument();
        expect(subheading.tagName).toBe("P");
        expect(subheading).toHaveClass("font-mono", "uppercase");
      });
    });

    describe("Props and Attributes", () => {
      it("merges custom className with defaults", () => {
        render(
          <SubHeading className="custom-class">Custom Subheading</SubHeading>
        );

        const subheading = screen.getByText("Custom Subheading");
        expect(subheading).toHaveClass("custom-class", "font-mono");
      });

      it("passes through additional props", () => {
        render(
          <SubHeading data-testid="subheading" id="subheading-id">
            Subheading
          </SubHeading>
        );

        const subheading = screen.getByTestId("subheading");
        expect(subheading).toHaveAttribute("id", "subheading-id");
      });
    });

    describe("Content Validation", () => {
      it("returns null when children are empty string", () => {
        const { container } = render(<SubHeading>{""}</SubHeading>);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when children are null", () => {
        const { container } = render(<SubHeading>{null}</SubHeading>);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when children are undefined", () => {
        const { container } = render(<SubHeading>{undefined}</SubHeading>);
        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  describe("Lead", () => {
    describe("Basic Rendering", () => {
      it("renders as paragraph with default styles", () => {
        render(<Lead>Lead text</Lead>);

        const lead = screen.getByText("Lead text");
        expect(lead).toBeInTheDocument();
        expect(lead.tagName).toBe("P");
        expect(lead).toHaveClass("text-xl", "text-zinc-500");
      });
    });

    describe("Props and Attributes", () => {
      it("merges custom className with defaults", () => {
        render(<Lead className="custom-lead">Custom lead</Lead>);

        const lead = screen.getByText("Custom lead");
        expect(lead).toHaveClass("custom-lead", "text-xl");
      });

      it("passes through additional props", () => {
        render(
          <Lead data-testid="lead" id="lead-id">
            Lead content
          </Lead>
        );

        const lead = screen.getByTestId("lead");
        expect(lead).toHaveAttribute("id", "lead-id");
      });
    });

    describe("Content Validation", () => {
      it("returns null when children are empty string", () => {
        const { container } = render(<Lead>{""}</Lead>);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when children are null", () => {
        const { container } = render(<Lead>{null}</Lead>);
        expect(container).toBeEmptyDOMElement();
      });

      it("returns null when children are undefined", () => {
        const { container } = render(<Lead>{undefined}</Lead>);
        expect(container).toBeEmptyDOMElement();
      });
    });
  });
});
