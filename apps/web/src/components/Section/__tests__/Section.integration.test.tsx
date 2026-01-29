/**
 * @file Section.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Section component.
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

describe("Section Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Component Composition", () => {
    it("renders complete Section structure with all sub-components", () => {
      const { container } = render(
        <Section title="Integration Test">
          <div>
            <p>Section content</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();

      const grid = section?.querySelector("div");
      expect(grid).toBeInTheDocument();
      expect(grid?.className).toContain("grid");

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Integration Test");
      expect(heading.tagName).toBe("H2");

      expect(section).toHaveTextContent("Section content");
      expect(section).toHaveTextContent("Item 1");
      expect(section).toHaveTextContent("Item 2");
    });

    it("maintains proper component hierarchy", () => {
      const { container } = render(
        <Section title="Hierarchy Test">
          <p>Content</p>
        </Section>
      );

      const section = container.querySelector("section");
      const grid = section?.firstElementChild;
      expect(section).toContainElement(grid ?? null);

      const heading = screen.getByRole("heading", { level: 2 });
      const contentWrapper = grid?.children[1];
      expect(section).toContainElement(heading);
      expect(grid?.childElementCount).toBe(2);
      expect(contentWrapper).toBeInTheDocument();
    });

    it("handles multiple Section instances", () => {
      const { container } = render(
        <div>
          <Section title="First Section">
            <p>First content</p>
          </Section>
          <Section title="Second Section">
            <p>Second content</p>
          </Section>
        </div>
      );

      expect(screen.getByText("First Section")).toBeInTheDocument();
      expect(screen.getByText("Second Section")).toBeInTheDocument();
      expect(screen.getByText("First content")).toBeInTheDocument();
      expect(screen.getByText("Second content")).toBeInTheDocument();

      const sections = container.querySelectorAll("section");
      expect(sections).toHaveLength(2);
    });

    it("works within a full page layout", () => {
      render(
        <div>
          <header>
            <h1>Page Title</h1>
          </header>
          <main>
            <Section title="Main Section">
              <p>Main content</p>
            </Section>
          </main>
          <footer>
            <p>Footer</p>
          </footer>
        </div>
      );

      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Main Section")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });

  describe("Styling Integration", () => {
    it("applies styling classes correctly across all components", () => {
      const { container } = render(
        <Section title="Styling Test" className="custom-section">
          <p>Content</p>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass("custom-section");
      expect(section).toHaveClass("md:border-l");

      const grid = section?.firstElementChild;
      expect(grid).toHaveClass("grid");
      expect(grid).toHaveClass("max-w-3xl");

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-sm");
      expect(heading).toHaveClass("font-semibold");

      const contentWrapper = grid?.children[1];
      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper).toHaveClass("md:col-span-3");
    });
  });

  describe("Accessibility and SEO Integration", () => {
    it("section has aria-labelledby pointing to title id", () => {
      const { container } = render(
        <Section title="ARIA Section">
          <p>Section content</p>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby");

      const titleId = section?.getAttribute("aria-labelledby");
      const titleEl = titleId ? document.getElementById(titleId) : null;
      expect(titleEl).toBeInTheDocument();
      expect(titleEl).toHaveTextContent("ARIA Section");
    });

    it("maintains proper heading hierarchy in page context", () => {
      render(
        <div>
          <h1>Page Title</h1>
          <Section title="Section Title">
            <p>Content</p>
          </Section>
        </div>
      );

      const h1 = screen.getByRole("heading", { level: 1 });
      const h2 = screen.getByRole("heading", { level: 2 });

      expect(h1).toHaveTextContent("Page Title");
      expect(h2).toHaveTextContent("Section Title");
    });

    it("polymorphic as preserves aria-labelledby", () => {
      const { container } = render(
        <Section title="Article Section" as="article">
          <p>Content</p>
        </Section>
      );

      const article = container.querySelector("article");
      expect(article).toHaveAttribute("aria-labelledby");
      const titleId = article?.getAttribute("aria-labelledby");
      const titleEl = titleId ? document.getElementById(titleId) : null;
      expect(titleEl).toHaveTextContent("Article Section");
    });

    it("single h2 per section for SEO", () => {
      render(
        <Section title="SEO Heading">
          <p>Content</p>
        </Section>
      );

      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent("SEO Heading");
    });

    it("passes through aria-label and id on section root", () => {
      const { container } = render(
        <Section
          title="Label Test"
          id="section-about"
          aria-label="About section"
        >
          <p>Content</p>
        </Section>
      );

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("id", "section-about");
      expect(section).toHaveAttribute("aria-label", "About section");
      expect(section).toHaveAttribute("aria-labelledby");
    });
  });
});
