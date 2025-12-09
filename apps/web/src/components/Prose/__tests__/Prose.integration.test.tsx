// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational (non-polymorphic, div-only)
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MemoizedProse, Prose } from "../Prose";

import "@testing-library/jest-dom";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: any = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

// Mock CSS modules
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Prose (Integration)", () => {
  describe("Component Composition", () => {
    it("renders Prose within a full page layout structure", () => {
      render(
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
    });

    it("renders Prose with multiple nested components", () => {
      render(
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

      const section = screen.getByRole("region", { name: "Section Title" });
      expect(section).toHaveAttribute("aria-labelledby", "section-title");
    });
  });

  describe("Styling Integration", () => {
    it("applies prose styling classes correctly with custom classes", () => {
      render(
        <div>
          <Prose className="custom-prose-class">
            <h1>Title</h1>
            <p>Content</p>
          </Prose>
        </div>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
    });

    it("integrates with theme-aware styling", () => {
      render(
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

      const largeProse = screen
        .getByText("Large Prose")
        .closest("[data-testid]");
      const smallProse = screen
        .getByText("Small Prose")
        .closest("[data-testid]");

      expect(largeProse).toBeInTheDocument();
      expect(smallProse).toBeInTheDocument();
      expect(largeProse).toHaveAttribute("class");
      expect(smallProse).toHaveAttribute("class");
    });
  });

  describe("Content Integration", () => {
    it("renders markdown-like content structure", () => {
      render(
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
    });

    it("handles complex nested content structures", () => {
      render(
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
    });
  });

  describe("Memoization Integration", () => {
    it("MemoizedProse works correctly in component composition", () => {
      render(
        <div>
          <MemoizedProse>
            <h1>Memoized Title</h1>
            <p>Memoized content</p>
          </MemoizedProse>
        </div>
      );

      expect(screen.getByText("Memoized Title")).toBeInTheDocument();
      expect(screen.getByText("Memoized content")).toBeInTheDocument();

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
    });

    it("MemoizedProse maintains performance with multiple instances", () => {
      render(
        <div>
          <MemoizedProse>
            <h1>First Prose</h1>
            <p>First content</p>
          </MemoizedProse>
          <MemoizedProse>
            <h1>Second Prose</h1>
            <p>Second content</p>
          </MemoizedProse>
          <MemoizedProse>
            <h1>Third Prose</h1>
            <p>Third content</p>
          </MemoizedProse>
        </div>
      );

      expect(screen.getByText("First Prose")).toBeInTheDocument();
      expect(screen.getByText("Second Prose")).toBeInTheDocument();
      expect(screen.getByText("Third Prose")).toBeInTheDocument();

      const proseElements = screen.getAllByTestId(/test-id-prose-root/);
      expect(proseElements).toHaveLength(3);
    });
  });

  describe("Debug Mode Integration", () => {
    it("applies debug mode across multiple Prose instances", () => {
      render(
        <div>
          <Prose debugMode={true} debugId="prose-1">
            <p>First prose</p>
          </Prose>
          <Prose debugMode={true} debugId="prose-2">
            <p>Second prose</p>
          </Prose>
        </div>
      );

      const firstProse = screen.getByTestId("prose-1-prose-root");
      const secondProse = screen.getByTestId("prose-2-prose-root");

      expect(firstProse).toHaveAttribute("data-debug-mode", "true");
      expect(secondProse).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles mixed debug mode states", () => {
      render(
        <div>
          <Prose debugMode={true} debugId="debug-prose">
            <p>Debug prose</p>
          </Prose>
          <Prose debugMode={false} debugId="no-debug-prose">
            <p>No debug prose</p>
          </Prose>
          <Prose debugId="default-prose">
            <p>Default prose</p>
          </Prose>
        </div>
      );

      const debugProse = screen.getByTestId("debug-prose-prose-root");
      const noDebugProse = screen.getByTestId("no-debug-prose-prose-root");
      const defaultProse = screen.getByTestId("default-prose-prose-root");

      expect(debugProse).toHaveAttribute("data-debug-mode", "true");
      expect(noDebugProse).not.toHaveAttribute("data-debug-mode");
      expect(defaultProse).not.toHaveAttribute("data-debug-mode");
    });
  });
});
