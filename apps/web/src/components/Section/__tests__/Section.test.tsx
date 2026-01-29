/**
 * @file Section.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Section component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Section } from "../Section";

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

describe("Section", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders section with title and children", () => {
      const { container } = render(
        <Section title="Test Section">
          <p>Test content</p>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent("Test Section");
      expect(section).toHaveTextContent("Test content");
      expect(section?.tagName).toBe("SECTION");
    });

    it("returns null when no title and no children", () => {
      const { container } = render(<Section title="" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when title is whitespace only and no children", () => {
      const { container } = render(<Section title="   " />);
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when children is empty and title provided", () => {
      const { container } = render(<Section title="Title">{null}</Section>);
      expect(container).toBeEmptyDOMElement();
    });

    it("returns null when title is empty string", () => {
      const { container } = render(
        <Section title="">
          <p>Content</p>
        </Section>
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Props and Attributes", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Section title="Custom Class" className="custom-class">
          Content
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass("custom-class");
    });

    it("spreads additional props to section element", () => {
      const { container } = render(
        <Section
          title="Props Test"
          id="test-id"
          aria-label="Test section"
          data-custom="value"
        >
          Content
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("id", "test-id");
      expect(section).toHaveAttribute("aria-label", "Test section");
      expect(section).toHaveAttribute("data-custom", "value");
    });

    it("passes through HTML attributes", () => {
      const { container } = render(
        <Section title="Attr Test" data-testid="section-root">
          Content
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("data-testid", "section-root");
    });
  });

  describe("Content Structure", () => {
    it("renders grid structure with SectionGrid", () => {
      const { container } = render(
        <Section title="Grid Test">
          <p>Grid content</p>
        </Section>
      );

      const section = container.querySelector("section");
      const grid = section?.querySelector("div");
      expect(grid).toBeInTheDocument();
      expect(grid?.className).toContain("grid");
    });

    it("renders title as heading inside grid", () => {
      render(<Section title="Grid Title Test">Content</Section>);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Grid Title Test");
      expect(heading.tagName).toBe("H2");
    });

    it("renders content inside grid", () => {
      const { container } = render(
        <Section title="Grid Content Test">
          <p>Grid content</p>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveTextContent("Grid content");
    });

    it("renders both title and content in grid", () => {
      render(
        <Section title="Both Test">
          <p>Both content</p>
        </Section>
      );

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Both Test"
      );
      expect(screen.getByText("Both content")).toBeInTheDocument();
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as section by default", () => {
      const { container } = render(<Section title="Default">Content</Section>);

      const section = container.querySelector("section");
      expect(section?.tagName).toBe("SECTION");
    });

    it("renders as div when as prop is div", () => {
      const { container } = render(
        <Section title="Div Section" as="div">
          Content
        </Section>
      );

      const root = container.querySelector("div");
      expect(root).toBeInTheDocument();
      expect(root?.tagName).toBe("DIV");
      expect(root).toHaveTextContent("Div Section");
    });

    it("renders as article when as prop is article", () => {
      const { container } = render(
        <Section title="Article Section" as="article">
          Content
        </Section>
      );

      const article = container.querySelector("article");
      expect(article?.tagName).toBe("ARTICLE");
      expect(article).toHaveTextContent("Article Section");
    });
  });

  describe("SectionTitle behavior", () => {
    it("renders title with correct classes", () => {
      render(<Section title="Heading Test">Content</Section>);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass("text-sm");
      expect(title).toHaveClass("font-semibold");
    });

    it("renders title with id when used in Section", () => {
      render(<Section title="ID Test">Content</Section>);

      const title = screen.getByRole("heading", { level: 2 });
      const id = title.getAttribute("id");
      expect(id).toBeTruthy();
      expect(id!.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Section title="Complex Children">
          <div>
            <h3>Sub heading</h3>
            <p>Paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </Section>
      );

      expect(screen.getByText("Complex Children")).toBeInTheDocument();
      expect(screen.getByText("Sub heading")).toBeInTheDocument();
      expect(screen.getByText("Paragraph content")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <Section title="Multiple Children">
          <p>First child</p>
          <p>Second child</p>
        </Section>
      );

      expect(screen.getByText("Multiple Children")).toBeInTheDocument();
      expect(screen.getByText("First child")).toBeInTheDocument();
      expect(screen.getByText("Second child")).toBeInTheDocument();
    });

    it("trims title for emptiness check", () => {
      const { container } = render(
        <Section title="  ">
          <p>Content</p>
        </Section>
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Accessibility (a11y)", () => {
    it("labels section with aria-labelledby pointing to title id", () => {
      const { container } = render(
        <Section title="A11y Section">
          <p>Content</p>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby");

      const titleId = section?.getAttribute("aria-labelledby");
      expect(titleId).toBeTruthy();

      const title = document.getElementById(titleId ?? "");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("A11y Section");
    });

    it("uses native heading for section title", () => {
      render(<Section title="Heading A11y">Content</Section>);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.tagName).toBe("H2");
    });

    it("maintains accessibility when props are updated", () => {
      const { rerender, container } = render(
        <Section title="Initial">
          <p>Content</p>
        </Section>
      );

      let section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby");

      rerender(
        <Section title="Updated">
          <p>Content</p>
        </Section>
      );

      section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Updated"
      );
    });
  });

  describe("SEO", () => {
    it("uses semantic section by default", () => {
      const { container } = render(
        <Section title="SEO Section">Content</Section>
      );

      const section = container.querySelector("section");
      expect(section?.tagName).toBe("SECTION");
    });

    it("supports semantic container elements (div, article)", () => {
      const { container: c1 } = render(
        <Section title="Div" as="div">
          Content
        </Section>
      );
      expect(c1.querySelector("div")).toBeInTheDocument();

      const { container: c2 } = render(
        <Section title="Article" as="article">
          Content
        </Section>
      );
      expect(c2.querySelector("article")).toBeInTheDocument();
    });

    it("uses single h2 for section title", () => {
      render(<Section title="Single H2">Content</Section>);

      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent("Single H2");
    });

    it("region has accessible name via aria-labelledby", () => {
      const { container } = render(
        <Section title="Region Label">Content</Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby");
      const id = section?.getAttribute("aria-labelledby");
      const labelEl = id ? document.getElementById(id) : null;
      expect(labelEl).toHaveTextContent("Region Label");
    });
  });

  describe("Component API", () => {
    it("has correct component type and displayName", () => {
      expect(Section).toBeDefined();
      expect(typeof Section).toBe("function");
      expect(Section.displayName).toBe("Section");
    });
  });
});
