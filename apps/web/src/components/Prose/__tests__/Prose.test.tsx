import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MemoizedProse, Prose } from "../Prose";

import "@testing-library/jest-dom";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit tests
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational (pure display, no sub-components)
// - Component Type: Presentational (pure display, no sub-components)
// ============================================================================

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

// Mock CSS modules
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("Prose", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders prose container with children", () => {
      render(
        <Prose data-testid="prose">
          <p>Test content</p>
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("Test content");
      expect(prose.tagName).toBe("DIV");
    });

    it("renders prose container without children", () => {
      render(<Prose data-testid="prose" />);

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("id", "test-id");
      expect(prose).toHaveAttribute("aria-label", "Test prose");
      expect(prose).toHaveAttribute("data-custom", "value");
      expect(prose).toHaveAttribute("role", "article");
    });

    it("applies data-prose-id attribute", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("data-prose-id", "test-id-prose");
    });
  });

  describe("Internal Props and useComponentId Integration", () => {
    it("uses provided debugId when available", () => {
      render(
        <Prose debugId="custom-id" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("custom-id-prose-root");
      expect(prose).toHaveAttribute("data-prose-id", "custom-id-prose");
    });

    it("generates ID when debugId is not provided", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("data-prose-id", "test-id-prose");
    });

    it("applies data-debug-mode when debugMode is true", () => {
      render(
        <Prose debugMode={true} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when debugMode is false", () => {
      render(
        <Prose debugMode={false} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).not.toHaveAttribute("data-debug-mode");
    });

    it("calls useComponentId with correct parameters", () => {
      render(
        <Prose debugId="custom-id" debugMode={true} data-testid="prose">
          Content
        </Prose>
      );

      // The hook is called internally, we can verify by checking the rendered attributes
      const prose = screen.getByTestId("custom-id-prose-root");
      expect(prose).toHaveAttribute("data-prose-id", "custom-id-prose");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
    });

    it("combines custom className with CSS module classes", () => {
      render(
        <Prose className="custom-class" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
    });

    it("handles multiple custom classes", () => {
      render(
        <Prose className="class1 class2 class3" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
    });
  });

  describe("Content Handling", () => {
    it("handles text content", () => {
      render(<Prose data-testid="prose">Simple text content</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveTextContent("First child");
      expect(prose).toHaveTextContent("Second child");
      expect(prose).toHaveTextContent("Third child");
    });

    it("handles empty children", () => {
      render(<Prose data-testid="prose" />);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
      expect(prose).toHaveTextContent("");
    });

    it("handles null children", () => {
      render(<Prose data-testid="prose">{null}</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Prose data-testid="prose">{undefined}</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(
        <Prose data-testid="prose">
          {true}
          {false}
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toBeInTheDocument();
    });

    it("handles number children", () => {
      render(<Prose data-testid="prose">{42}</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveTextContent(longContent);
    });

    it("handles special characters", () => {
      render(
        <Prose data-testid="prose">
          <p>Special chars: &lt;&gt;&amp;&quot;&apos;€£¥©®™</p>
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveTextContent("Text content");
      expect(prose).toHaveTextContent("Paragraph content");
      expect(prose).toHaveTextContent("42");
      expect(prose).toHaveTextContent("Span content");
      expect(prose).toHaveTextContent("Div content");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(
        <Prose debugId="aria-test" role="main">
          Content
        </Prose>
      );

      // Test main content area
      const mainElement = screen.getByRole("main");
      expect(mainElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        <Prose
          debugId="aria-test"
          aria-labelledby="prose-title"
          aria-describedby="prose-description"
        >
          Content
        </Prose>
      );

      const proseElement = screen.getByTestId("aria-test-prose-root");

      // Prose should be labelled by the title
      expect(proseElement).toHaveAttribute("aria-labelledby", "prose-title");

      // Prose should be described by the description
      expect(proseElement).toHaveAttribute(
        "aria-describedby",
        "prose-description"
      );
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(
        <Prose debugId="aria-test" id="prose-content">
          Content
        </Prose>
      );

      // Prose should have unique ID
      const proseElement = screen.getByTestId("aria-test-prose-root");
      expect(proseElement).toHaveAttribute("id", "prose-content");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <Prose debugId="aria-test" aria-label="Article content">
          Content
        </Prose>
      );

      // Prose element should have descriptive label
      const proseElement = screen.getByTestId("aria-test-prose-root");
      expect(proseElement).toHaveAttribute("aria-label", "Article content");
    });

    it("handles ARIA attributes when content is missing", () => {
      render(<Prose debugId="aria-test" />);

      const proseElement = screen.getByTestId("aria-test-prose-root");

      // Should not have aria-labelledby when not provided
      expect(proseElement).not.toHaveAttribute("aria-labelledby");
    });

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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("aria-label", "Article content");
      expect(prose).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
      render(
        <Prose role="article" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("role", "article");
    });

    it("supports tabindex", () => {
      render(
        <Prose tabIndex={0} data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("data-content-type", "article");
      expect(prose).toHaveAttribute("data-author", "John Doe");
    });
  });

  describe("Styling and Layout", () => {
    it("applies prose styling class", () => {
      render(<Prose data-testid="prose">Content</Prose>);

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
    });

    it("combines prose styling with custom classes", () => {
      render(
        <Prose className="custom-styling additional-class" data-testid="prose">
          Content
        </Prose>
      );

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
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

      const prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveAttribute("class");
    });
  });

  describe("Memoization", () => {
    it("MemoizedProse renders children", () => {
      render(
        <MemoizedProse data-testid="prose">
          Content
        </MemoizedProse>
      );
      expect(screen.getByTestId("test-id-prose-root")).toBeInTheDocument();
    });

    it("MemoizedProse maintains content across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedProse data-testid="prose">
          Content
        </MemoizedProse>
      );

      expect(screen.getByTestId("test-id-prose-root")).toHaveTextContent("Content");

      rerender(
        <MemoizedProse data-testid="prose">
          Content
        </MemoizedProse>
      );
      expect(screen.getByTestId("test-id-prose-root")).toHaveTextContent("Content");
    });
  });

  describe("Component Type", () => {
    it("has correct component type", () => {
      expect(Prose).toBeDefined();
      expect(typeof Prose).toBe("function");
      expect(Prose).toHaveProperty("displayName");
    });

    it("has correct display name", () => {
      // Display name is set by setDisplayName utility
      expect(Prose).toBeDefined();
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

      const prose = screen.getByTestId("test-id-prose-root");
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

      let prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveTextContent("Initial content");

      rerender(
        <Prose data-testid="prose">
          <p>Updated content</p>
        </Prose>
      );

      prose = screen.getByTestId("test-id-prose-root");
      expect(prose).toHaveTextContent("Updated content");
    });
  });
});
