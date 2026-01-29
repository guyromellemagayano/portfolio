/**
 * @file Prose.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Prose component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Prose } from "../Prose";

import "@testing-library/jest-dom";

// Mock @web/utils/helpers
vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

describe("Prose", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders prose container with children", () => {
      const { container } = render(
        <Prose>
          <p>Test content</p>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("Test content");
      expect(prose.tagName).toBe("DIV");
    });

    it("renders prose container without children", () => {
      const { container } = render(<Prose />);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
      expect(prose.tagName).toBe("DIV");
    });

    it("renders with complex content", () => {
      const { container } = render(
        <Prose>
          <h1>Main Heading</h1>
          <p>
            This is a paragraph with <strong>bold text</strong> and{" "}
            <em>italic text</em>.
          </p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
          <blockquote>
            <p>This is a blockquote</p>
          </blockquote>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("Main Heading");
      expect(prose).toHaveTextContent("This is a paragraph with");
      expect(prose).toHaveTextContent("bold text");
      expect(prose).toHaveTextContent("italic text");
      expect(prose).toHaveTextContent("List item 1");
      expect(prose).toHaveTextContent("List item 2");
      expect(prose).toHaveTextContent("This is a blockquote");
    });
  });

  describe("Props and Attributes", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Prose className="custom-class">Content</Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveClass("prose", "dark:prose-invert", "custom-class");
    });

    it("spreads additional props to prose element", () => {
      const { container } = render(
        <Prose
          id="test-id"
          aria-label="Test prose"
          data-custom="value"
          role="article"
        >
          Content
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveAttribute("id", "test-id");
      expect(prose).toHaveAttribute("aria-label", "Test prose");
      expect(prose).toHaveAttribute("data-custom", "value");
      expect(prose).toHaveAttribute("role", "article");
    });
  });

  describe("Styling", () => {
    it("applies prose styling classes correctly", () => {
      const { container } = render(
        <Prose>
          <p>Content</p>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveClass("prose", "dark:prose-invert");
    });

    it("combines custom className with prose classes", () => {
      const { container } = render(
        <Prose className="custom-class">Content</Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveClass("prose", "dark:prose-invert", "custom-class");
    });

    it("handles multiple custom classes", () => {
      const { container } = render(
        <Prose className="class1 class2 class3">Content</Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveClass(
        "prose",
        "dark:prose-invert",
        "class1",
        "class2",
        "class3"
      );
    });
  });

  describe("Content Handling", () => {
    it("handles text content", () => {
      const { container } = render(<Prose>Simple text content</Prose>);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("Simple text content");
    });

    it("handles HTML elements", () => {
      const { container } = render(
        <Prose>
          <h1>Heading</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("Heading");
      expect(prose).toHaveTextContent("Paragraph");
      expect(prose).toHaveTextContent("Item 1");
      expect(prose).toHaveTextContent("Item 2");
    });

    it("handles React components as children", () => {
      const ChildComponent = function () {
        return <span>Child component content</span>;
      };

      const { container } = render(
        <Prose>
          <ChildComponent />
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("Child component content");
    });

    it("handles multiple children", () => {
      const { container } = render(
        <Prose>
          <p>First child</p>
          <p>Second child</p>
          <p>Third child</p>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("First child");
      expect(prose).toHaveTextContent("Second child");
      expect(prose).toHaveTextContent("Third child");
    });

    it("handles empty children", () => {
      const { container } = render(<Prose />);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
    });

    it("handles null children", () => {
      const { container } = render(<Prose>{null}</Prose>);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      const { container } = render(<Prose>{undefined}</Prose>);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      const { container } = render(
        <Prose>
          {true}
          {false}
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Prose>{42}</Prose>);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("42");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long content", () => {
      const longContent = "A".repeat(1000);
      const { container } = render(
        <Prose>
          <p>{longContent}</p>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent(longContent);
    });

    it("handles special characters", () => {
      const { container } = render(
        <Prose>
          <p>Special chars: &lt;&gt;&amp;&quot;&apos;€£¥©®™</p>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("Special chars: <>&\"'€£¥©®™");
    });

    it("handles nested complex structures", () => {
      const { container } = render(
        <Prose>
          <div>
            <h1>Main Title</h1>
            <section>
              <h2>Section Title</h2>
              <article>
                <h3>Article Title</h3>
                <p>
                  Article content with <strong>bold</strong> and <em>italic</em>{" "}
                  text.
                </p>
                <blockquote>
                  <p>Nested blockquote</p>
                  <cite>Citation</cite>
                </blockquote>
              </article>
            </section>
            <aside>
              <p>Sidebar content</p>
            </aside>
          </div>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("Main Title");
      expect(prose).toHaveTextContent("Section Title");
      expect(prose).toHaveTextContent("Article Title");
      expect(prose).toHaveTextContent("Article content with");
      expect(prose).toHaveTextContent("bold");
      expect(prose).toHaveTextContent("italic");
      expect(prose).toHaveTextContent("Nested blockquote");
      expect(prose).toHaveTextContent("Citation");
      expect(prose).toHaveTextContent("Sidebar content");
    });

    it("handles mixed content types", () => {
      const { container } = render(
        <Prose>
          Text content
          <p>Paragraph content</p>
          {42}
          <span>Span content</span>
          {null}
          <div>Div content</div>
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveTextContent("Text content");
      expect(prose).toHaveTextContent("Paragraph content");
      expect(prose).toHaveTextContent("42");
      expect(prose).toHaveTextContent("Span content");
      expect(prose).toHaveTextContent("Div content");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(<Prose role="main">Content</Prose>);

      // Test the main content area
      const mainElement = screen.getByRole("main");
      expect(mainElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      const { container } = render(
        <Prose
          aria-labelledby="prose-title"
          aria-describedby="prose-description"
        >
          Content
        </Prose>
      );

      const proseElement = container.firstChild as HTMLElement;

      // The title should label prose
      expect(proseElement).toHaveAttribute("aria-labelledby", "prose-title");

      // Prose should be described by the description
      expect(proseElement).toHaveAttribute(
        "aria-describedby",
        "prose-description"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      const { container } = render(<Prose id="prose-content">Content</Prose>);

      // Prose should have unique ID
      const proseElement = container.firstChild as HTMLElement;
      expect(proseElement).toHaveAttribute("id", "prose-content");
    });

    it("applies correct ARIA labels to content elements", () => {
      const { container } = render(
        <Prose aria-label="Article content">Content</Prose>
      );

      // Prose element should have descriptive label
      const proseElement = container.firstChild as HTMLElement;
      expect(proseElement).toHaveAttribute("aria-label", "Article content");
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Prose />);

      const proseElement = container.firstChild as HTMLElement;

      // Should not have aria-labelledby when not provided
      expect(proseElement).not.toHaveAttribute("aria-labelledby");
    });

    it("supports aria attributes", () => {
      const { container } = render(
        <Prose aria-label="Article content" aria-describedby="description">
          Content
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveAttribute("aria-label", "Article content");
      expect(prose).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
      const { container } = render(<Prose role="article">Content</Prose>);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveAttribute("role", "article");
    });

    it("supports tabindex", () => {
      const { container } = render(<Prose tabIndex={0}>Content</Prose>);

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveAttribute("tabindex", "0");
    });

    it("supports data attributes", () => {
      const { container } = render(
        <Prose data-content-type="article" data-author="John Doe">
          Content
        </Prose>
      );

      const prose = container.firstChild as HTMLElement;
      expect(prose).toHaveAttribute("data-content-type", "article");
      expect(prose).toHaveAttribute("data-author", "John Doe");
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(Prose).toBeDefined();
      expect(typeof Prose).toBe("function");
      expect(Prose).toHaveProperty("displayName");
    });

    it("has correct display name", () => {
      expect(Prose.displayName).toBe("Prose");
    });
  });
});
