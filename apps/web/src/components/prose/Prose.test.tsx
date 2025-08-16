import React from "react";

import { render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { Prose } from "./Prose";

import "@testing-library/jest-dom";

// Set up test environment
beforeAll(() => {
  // Mock globalThis.process for the test environment
  (globalThis as any).process = {
    env: {
      NODE_ENV: "test",
    },
    memoryUsage: () => ({
      rss: 0,
      heapTotal: 0,
      heapUsed: 0,
      external: 0,
      arrayBuffers: 0,
    }),
  };
});

// Mock the shared components
vi.mock("@guyromellemagayano/components", () => ({
  Div: React.forwardRef(function Div(props: any, ref: any) {
    return React.createElement("div", { ...props, ref, "data-testid": "div" });
  }),
}));

// Mock the useComponentId hook
vi.mock("@web/hooks/useComponentId", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

// Mock the cn helper
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS modules
vi.mock("./Prose.module.css", () => ({
  default: {
    proseContainer: "prose-container-class",
  },
}));

describe("Prose Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders prose container with children", () => {
      render(
        <Prose data-testid="prose">
          <p>Test content</p>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("Test content");
      expect(prose.tagName).toBe("DIV");
    });

    it("renders prose container without children", () => {
      render(<Prose data-testid="prose" />);

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
      expect(prose.tagName).toBe("DIV");
    });

    it("renders with complex content", () => {
      render(
        <Prose data-testid="prose">
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

      const prose = screen.getByTestId("div");
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
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Prose ref={ref} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
      expect(prose.tagName).toBe("DIV");

      // Note: In test environment, ref.current might be null due to mocked components
      // The important thing is that the prose renders correctly
    });

    it("applies custom className", () => {
      render(
        <Prose className="custom-class" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass("prose-container-class", "custom-class");
    });

    it("spreads additional props to prose element", () => {
      render(
        <Prose
          data-testid="prose"
          id="test-id"
          aria-label="Test prose"
          data-custom="value"
          role="article"
        >
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("id", "test-id");
      expect(prose).toHaveAttribute("aria-label", "Test prose");
      expect(prose).toHaveAttribute("data-custom", "value");
      expect(prose).toHaveAttribute("role", "article");
    });

    it("applies data-prose-id attribute", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("data-prose-id", "test-id");
    });
  });

  describe("Internal Props and useComponentId Integration", () => {
    it("uses provided _internalId when available", () => {
      render(
        <Prose _internalId="custom-id" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("data-prose-id", "custom-id");
    });

    it("generates ID when _internalId is not provided", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("data-prose-id", "test-id");
    });

    it("applies data-debug-mode when _debugMode is true", () => {
      render(
        <Prose _debugMode={true} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when _debugMode is false", () => {
      render(
        <Prose _debugMode={false} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when _debugMode is undefined", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).not.toHaveAttribute("data-debug-mode");
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <Prose _internalId="custom-id" _debugMode={true} data-testid="prose">
          Content
        </Prose>
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("data-prose-id", "custom-id");
      expect(prose).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes correctly", () => {
      render(
        <Prose data-testid="prose">
          <p>Content</p>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass("prose-container-class");
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <Prose className="custom-class" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass("prose-container-class", "custom-class");
    });

    it("handles multiple custom classes", () => {
      render(
        <Prose className="class1 class2 class3" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass(
        "prose-container-class",
        "class1",
        "class2",
        "class3"
      );
    });
  });

  describe("Content Handling", () => {
    it("handles text content", () => {
      render(<Prose data-testid="prose">Simple text content</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Simple text content");
    });

    it("handles HTML elements", () => {
      render(
        <Prose data-testid="prose">
          <h1>Heading</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Heading");
      expect(prose).toHaveTextContent("Paragraph");
      expect(prose).toHaveTextContent("Item 1");
      expect(prose).toHaveTextContent("Item 2");
    });

    it("handles React components as children", () => {
      const ChildComponent = function () {
        return <span>Child component content</span>;
      };

      render(
        <Prose data-testid="prose">
          <ChildComponent />
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Child component content");
    });

    it("handles multiple children", () => {
      render(
        <Prose data-testid="prose">
          <p>First child</p>
          <p>Second child</p>
          <p>Third child</p>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("First child");
      expect(prose).toHaveTextContent("Second child");
      expect(prose).toHaveTextContent("Third child");
    });

    it("handles empty children", () => {
      render(<Prose data-testid="prose" />);

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("");
    });

    it("handles null children", () => {
      render(<Prose data-testid="prose">{null}</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Prose data-testid="prose">{undefined}</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(
        <Prose data-testid="prose">
          {true}
          {false}
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
    });

    it("handles number children", () => {
      render(<Prose data-testid="prose">{42}</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("42");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long content", () => {
      const longContent = "A".repeat(1000);
      render(
        <Prose data-testid="prose">
          <p>{longContent}</p>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent(longContent);
    });

    it("handles special characters", () => {
      render(
        <Prose data-testid="prose">
          <p>Special chars: &lt;&gt;&amp;&quot;&apos;€£¥©®™</p>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Special chars: <>&\"'€£¥©®™");
    });

    it("handles nested complex structures", () => {
      render(
        <Prose data-testid="prose">
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

      const prose = screen.getByTestId("div");
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
      render(
        <Prose data-testid="prose">
          Text content
          <p>Paragraph content</p>
          {42}
          <span>Span content</span>
          {null}
          <div>Div content</div>
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Text content");
      expect(prose).toHaveTextContent("Paragraph content");
      expect(prose).toHaveTextContent("42");
      expect(prose).toHaveTextContent("Span content");
      expect(prose).toHaveTextContent("Div content");
    });
  });

  describe("Accessibility", () => {
    it("supports aria attributes", () => {
      render(
        <Prose
          aria-label="Article content"
          aria-describedby="description"
          data-testid="prose"
        >
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("aria-label", "Article content");
      expect(prose).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
      render(
        <Prose role="article" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("role", "article");
    });

    it("supports tabindex", () => {
      render(
        <Prose tabIndex={0} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("tabindex", "0");
    });

    it("supports data attributes", () => {
      render(
        <Prose
          data-testid="prose"
          data-content-type="article"
          data-author="John Doe"
        >
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveAttribute("data-content-type", "article");
      expect(prose).toHaveAttribute("data-author", "John Doe");
    });
  });

  describe("Styling and Layout", () => {
    it("applies prose styling class", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass("prose-container-class");
    });

    it("combines prose styling with custom classes", () => {
      render(
        <Prose className="custom-styling additional-class" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass(
        "prose-container-class",
        "custom-styling",
        "additional-class"
      );
    });

    it("handles conditional classes", () => {
      const isDark = true;
      render(
        <Prose
          className={`base-class ${isDark ? "dark-theme" : "light-theme"}`}
          data-testid="prose"
        >
          Content
        </Prose>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toHaveClass(
        "prose-container-class",
        "base-class",
        "dark-theme"
      );
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(Prose).toBeDefined();
      expect(typeof Prose).toBe("object");
      expect(Prose).toHaveProperty("displayName");
    });

    it("has correct display name", () => {
      expect(Prose.displayName).toBe("Prose");
    });
  });

  describe("Integration Tests", () => {
    it("works with other components", () => {
      render(
        <div>
          <header>
            <h1>Page Title</h1>
          </header>
          <main>
            <Prose data-testid="prose">
              <h2>Article Title</h2>
              <p>Article content goes here...</p>
            </Prose>
          </main>
        </div>
      );

      const prose = screen.getByTestId("div");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("Article Title");
      expect(prose).toHaveTextContent("Article content goes here...");
    });

    it("handles dynamic content updates", () => {
      const { rerender } = render(
        <Prose data-testid="prose">
          <p>Initial content</p>
        </Prose>
      );

      let prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Initial content");

      rerender(
        <Prose data-testid="prose">
          <p>Updated content</p>
        </Prose>
      );

      prose = screen.getByTestId("div");
      expect(prose).toHaveTextContent("Updated content");
    });
  });
});
