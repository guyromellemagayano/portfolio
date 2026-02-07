/**
 * @file Prose.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Prose component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Prose } from "../Prose";

import "@testing-library/jest-dom";

// Mock @web/utils/helpers
vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Prose (Integration)", () => {
  describe("Component Composition", () => {
    it("renders Prose within a full page layout structure", () => {
      const { container } = render(
        <div>
          <header>
            <h1>Page Title</h1>
          </header>
          <main>
            <Prose>
              <h2>Article Title</h2>
              <p>Article content goes here...</p>
            </Prose>
          </main>
          <footer>
            <p>Footer content</p>
          </footer>
        </div>
      );

      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("Article content goes here...")
      ).toBeInTheDocument();
      expect(screen.getByText("Footer content")).toBeInTheDocument();

      const prose = container.querySelector("main > div");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveClass("prose", "dark:prose-invert");
    });

    it("renders Prose with multiple nested components", () => {
      const { container } = render(
        <div>
          <Prose>
            <article>
              <header>
                <h1>Article Header</h1>
                <p>Article meta information</p>
              </header>
              <section>
                <h2>Section Title</h2>
                <p>Section content</p>
                <ul>
                  <li>List item 1</li>
                  <li>List item 2</li>
                </ul>
              </section>
              <footer>
                <p>Article footer</p>
              </footer>
            </article>
          </Prose>
        </div>
      );

      expect(screen.getByText("Article Header")).toBeInTheDocument();
      expect(screen.getByText("Article meta information")).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
      expect(screen.getByText("Article footer")).toBeInTheDocument();

      const prose = container.querySelector("div > div.prose");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveClass("prose", "dark:prose-invert");
    });

    it("renders Prose with roles in different contexts", () => {
      render(
        <div>
          <Prose role="region" aria-label="Main content">
            <h2>Section Title</h2>
            <p>Section content</p>
          </Prose>
          <Prose role="article" aria-label="Article content">
            <h2>Article Title</h2>
            <p>Article content</p>
          </Prose>
        </div>
      );

      const section = screen.getByRole("region", { name: "Main content" });
      const article = screen.getByRole("article", { name: "Article content" });

      expect(section).toBeInTheDocument();
      expect(article).toBeInTheDocument();
      // Prose renders a div; roles are applied via attributes.
      expect(section.tagName).toBe("DIV");
      expect(article.tagName).toBe("DIV");
      expect(section).toHaveClass("prose", "dark:prose-invert");
      expect(article).toHaveClass("prose", "dark:prose-invert");
    });
  });

  describe("ARIA Integration", () => {
    it("integrates with ARIA landmarks and relationships", () => {
      render(
        <div>
          <Prose
            role="main"
            aria-labelledby="main-title"
            aria-describedby="main-description"
          >
            <h1 id="main-title">Main Content</h1>
            <p id="main-description">Main content description</p>
            <section aria-label="Content section">
              <h2>Section Title</h2>
              <p>Section content</p>
            </section>
          </Prose>
        </div>
      );

      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("aria-labelledby", "main-title");
      expect(main).toHaveAttribute("aria-describedby", "main-description");
      expect(main).toHaveClass("prose", "dark:prose-invert");

      const title = screen.getByText("Main Content");
      expect(title).toHaveAttribute("id", "main-title");

      const description = screen.getByText("Main content description");
      expect(description).toHaveAttribute("id", "main-description");

      const section = screen.getByRole("region", { name: "Content section" });
      expect(section).toBeInTheDocument();
    });

    it("maintains ARIA relationships across component hierarchy", () => {
      render(
        <div>
          <Prose
            role="article"
            aria-labelledby="article-title"
            id="article-content"
          >
            <h1 id="article-title">Article Title</h1>
            <p>Article content</p>
            <Prose role="region" aria-labelledby="section-title">
              <h2 id="section-title">Section Title</h2>
              <p>Section content</p>
            </Prose>
          </Prose>
        </div>
      );

      const article = screen.getByRole("article");
      expect(article).toHaveAttribute("aria-labelledby", "article-title");
      expect(article).toHaveAttribute("id", "article-content");
      expect(article).toHaveClass("prose", "dark:prose-invert");

      const section = screen.getByRole("region", { name: "Section Title" });
      expect(section).toHaveAttribute("aria-labelledby", "section-title");
      expect(section).toHaveClass("prose", "dark:prose-invert");
    });
  });

  describe("Styling Integration", () => {
    it("applies prose styling classes correctly with custom classes", () => {
      const { container } = render(
        <div>
          <Prose className="custom-prose-class">
            <h1>Title</h1>
            <p>Content</p>
          </Prose>
        </div>
      );

      const prose = container.querySelector("div > div.prose");
      expect(prose).toHaveClass(
        "prose",
        "dark:prose-invert",
        "custom-prose-class"
      );
    });

    it("integrates with theme-aware styling", () => {
      const { container } = render(
        <div>
          <Prose className="prose-lg">
            <h1>Large Prose</h1>
            <p>Large prose content</p>
          </Prose>
          <Prose className="prose-sm">
            <h1>Small Prose</h1>
            <p>Small prose content</p>
          </Prose>
        </div>
      );

      const proseElements = container.querySelectorAll("div > div.prose");
      expect(proseElements).toHaveLength(2);

      const largeProse = proseElements[0];
      const smallProse = proseElements[1];

      expect(largeProse).toBeInTheDocument();
      expect(smallProse).toBeInTheDocument();
      expect(largeProse).toHaveClass("prose", "dark:prose-invert", "prose-lg");
      expect(smallProse).toHaveClass("prose", "dark:prose-invert", "prose-sm");
    });
  });

  describe("Content Integration", () => {
    it("renders markdown-like content structure", () => {
      const { container } = render(
        <Prose>
          <h1>Main Heading</h1>
          <p>
            Introduction paragraph with <strong>bold text</strong> and{" "}
            <em>italic text</em>.
          </p>
          <h2>Subheading</h2>
          <p>
            Another paragraph with <a href="#link">a link</a>.
          </p>
          <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>
          <blockquote>
            <p>This is a blockquote with important information.</p>
          </blockquote>
          <h3>Code Example</h3>
          <pre>
            <code>const example = &#34;code&#34;;</code>
          </pre>
        </Prose>
      );

      expect(screen.getByText("Main Heading")).toBeInTheDocument();
      expect(
        screen.getByText(/Introduction paragraph with/)
      ).toBeInTheDocument();
      expect(screen.getByText("bold text")).toBeInTheDocument();
      expect(screen.getByText("italic text")).toBeInTheDocument();
      expect(screen.getByText("Subheading")).toBeInTheDocument();
      expect(screen.getByText("a link")).toBeInTheDocument();
      expect(screen.getByText("First item")).toBeInTheDocument();
      expect(
        screen.getByText("This is a blockquote with important information.")
      ).toBeInTheDocument();
      expect(screen.getByText(/const example = "code";/)).toBeInTheDocument();

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveClass("prose", "dark:prose-invert");
    });

    it("handles complex nested content structures", () => {
      const { container } = render(
        <Prose>
          <article>
            <header>
              <h1>Article Title</h1>
              <div>
                <time dateTime="2024-01-01">January 1, 2024</time>
                <span>By Author Name</span>
              </div>
            </header>
            <div>
              <section>
                <h2>Introduction</h2>
                <p>Introduction content</p>
              </section>
              <section>
                <h2>Main Content</h2>
                <p>Main content paragraph 1</p>
                <p>Main content paragraph 2</p>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/image.jpg" alt="Example image" />
                  <figcaption>Image caption</figcaption>
                </figure>
              </section>
              <section>
                <h2>Conclusion</h2>
                <p>Conclusion content</p>
              </section>
            </div>
            <footer>
              <p>Article footer</p>
            </footer>
          </article>
        </Prose>
      );

      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
      expect(screen.getByText("By Author Name")).toBeInTheDocument();
      expect(screen.getByText("Introduction")).toBeInTheDocument();
      expect(screen.getByText("Main Content")).toBeInTheDocument();
      expect(screen.getByText("Conclusion")).toBeInTheDocument();
      expect(screen.getByAltText("Example image")).toBeInTheDocument();
      expect(screen.getByText("Image caption")).toBeInTheDocument();

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveClass("prose", "dark:prose-invert");
    });
  });
});
