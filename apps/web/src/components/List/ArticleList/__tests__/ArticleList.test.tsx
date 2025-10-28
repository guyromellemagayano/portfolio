// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleList } from "../ArticleList";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

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
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock shared labels
vi.mock("../../List.i18n", () => ({
  LIST_I18N: {
    articleList: "Article list",
    articles: "Articles",
  },
}));

describe("ArticleList", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <ArticleList>
          <div data-testid="article-1">Article 1</div>
          <div data-testid="article-2">Article 2</div>
        </ArticleList>
      );

      expect(screen.getByTestId("article-1")).toBeInTheDocument();
      expect(screen.getByTestId("article-2")).toBeInTheDocument();
    });

    it("renders as div element", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(
        <ArticleList className="custom-class">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(
        <ArticleList aria-label="Custom article list" role="main">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      // Component now has its own role="region" and aria-label
      expect(container).toHaveAttribute("aria-label", "Article list");
      expect(container).toHaveAttribute("role", "region");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<ArticleList />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are null", () => {
      const { container } = render(<ArticleList>{null}</ArticleList>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are undefined", () => {
      const { container } = render(<ArticleList>{undefined}</ArticleList>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are empty string", () => {
      const { container } = render(<ArticleList>{""}</ArticleList>);
      expect(container.firstChild).toBeNull();
    });

    it("renders when children have content", () => {
      render(
        <ArticleList>
          <div>Valid content</div>
        </ArticleList>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <ArticleList debugMode={true}>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      render(
        <ArticleList debugMode={false}>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply when undefined", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(
        <ArticleList>
          <div>Content</div>
        </ArticleList>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(
        <ArticleList isMemoized={true}>
          <div>Content</div>
        </ArticleList>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(
        <ArticleList isMemoized={false}>
          <div>Content</div>
        </ArticleList>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toHaveAttribute("class");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <ArticleList className="custom-class">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toHaveAttribute("class");
    });

    it("renders children directly without wrapper", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const content = screen.getByText("Article content");
      expect(content).toBeInTheDocument();
      expect(content.tagName).toBe("DIV");
    });
  });

  describe("Component ID", () => {
    it("uses useComponentId hook correctly", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );
      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: undefined,
      });
    });

    it("uses custom debug ID when provided", () => {
      render(
        <ArticleList debugId="custom-id">
          <div>Article content</div>
        </ArticleList>
      );
      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: "custom-id",
        debugMode: undefined,
      });
    });

    it("enables debug mode when provided", () => {
      render(
        <ArticleList debugMode={true}>
          <div>Article content</div>
        </ArticleList>
      );
      expect(mockUseComponentId).toHaveBeenCalledWith({
        debugId: undefined,
        debugMode: true,
      });
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ArticleList ref={ref}>
          <div>Article content</div>
        </ArticleList>
      );

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ArticleList ref={ref}>
          <div>Article content</div>
        </ArticleList>
      );

      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <ArticleList>
          <div>
            <h2>Article Title</h2>
            <p>Article content with multiple elements</p>
            <ul>
              <li>Point 1</li>
              <li>Point 2</li>
            </ul>
          </div>
        </ArticleList>
      );

      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("Article content with multiple elements")
      ).toBeInTheDocument();
      expect(screen.getByText("Point 1")).toBeInTheDocument();
      expect(screen.getByText("Point 2")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(
        <ArticleList>
          <div>Special chars: &lt;&gt;&amp;</div>
        </ArticleList>
      );

      expect(screen.getByText("Special chars: <>&")).toBeInTheDocument();
    });

    it("handles empty strings mixed with content", () => {
      render(
        <ArticleList>
          {""}
          <div>Valid content</div>
          {""}
        </ArticleList>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(
        <ArticleList>
          <article>Article content</article>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toBeInTheDocument();
    });

    it("supports custom accessibility attributes", () => {
      render(
        <ArticleList
          role="main"
          aria-label="Custom article list"
          aria-describedby="article-description"
        >
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      // Component now has its own role="region" and aria-label
      expect(container).toHaveAttribute("role", "region");
      expect(container).toHaveAttribute("aria-label", "Article list");
      expect(container).toHaveAttribute(
        "aria-describedby",
        "article-description"
      );
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      // Test region role
      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });
      expect(regionElement).toBeInTheDocument();

      // Test list role
      const listElement = screen.getByRole("list", { name: "Articles" });
      expect(listElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });

      // Region should have aria-label (no longer uses aria-labelledby)
      expect(regionElement).toHaveAttribute("aria-label", "Article list");
    });

    it("applies correct ARIA labels without ID dependencies", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      // Heading should be present but hidden (no ID needed)
      const headingElement = screen.getByText("Article list");
      expect(headingElement).toBeInTheDocument();
      expect(headingElement).toHaveAttribute("aria-hidden", "true");

      // List should have aria-label (no ID needed)
      const listElement = screen.getByRole("list", { name: "Articles" });
      expect(listElement).toHaveAttribute("aria-label", "Articles");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      // Region should have descriptive label
      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });
      expect(regionElement).toHaveAttribute("aria-label", "Article list");

      // List should have descriptive label
      const listElement = screen.getByRole("list", { name: "Articles" });
      expect(listElement).toHaveAttribute("aria-label", "Articles");
    });

    it("hides decorative elements from screen readers", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      // Heading should be hidden from screen readers
      const headingElement = screen.getByText("Article list");
      expect(headingElement).toHaveAttribute("aria-hidden", "true");
    });

    it("applies correct heading level ARIA attribute", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      const headingElement = screen.getByText("Article list");
      expect(headingElement).toBeInTheDocument();
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(
        <ArticleList debugId="custom-aria-id">
          <div>Article content</div>
        </ArticleList>
      );

      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });
      const headingElement = screen.getByText("Article list");
      const listElement = screen.getByRole("list", { name: "Articles" });

      // Should have aria-label (no ID dependencies)
      expect(regionElement).toHaveAttribute("aria-label", "Article list");
      expect(headingElement).toBeInTheDocument();
      expect(listElement).toHaveAttribute("aria-label", "Articles");
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <ArticleList debugId="aria-test">
          <div>Original content</div>
        </ArticleList>
      );

      // Initial render
      let regionElement = screen.getByRole("region", { name: "Article list" });
      expect(regionElement).toHaveAttribute("aria-label", "Article list");

      // Update with different content
      rerender(
        <ArticleList debugId="aria-test">
          <div>Updated content</div>
        </ArticleList>
      );

      // ARIA attributes should be maintained
      regionElement = screen.getByRole("region", { name: "Article list" });
      expect(regionElement).toHaveAttribute("aria-label", "Article list");
    });

    it("ensures proper ARIA landmark structure", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      // Should have region landmark
      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });
      expect(regionElement).toBeInTheDocument();

      // Should have heading landmark
      const headingElement = screen.getByText("Article list");
      expect(headingElement).toBeInTheDocument();

      // Should have list landmark
      const listElement = screen.getByRole("list", { name: "Articles" });
      expect(listElement).toBeInTheDocument();
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(
        <ArticleList debugId="aria-test">
          <div>Article content</div>
        </ArticleList>
      );

      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });

      // Should have aria-label (no ID dependencies)
      expect(regionElement).toHaveAttribute("aria-label", "Article list");
    });

    it("handles ARIA attributes when no children are provided", () => {
      const { container } = render(<ArticleList debugId="aria-test" />);

      // Component should not render when no children
      expect(container.firstChild).toBeNull();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <ArticleList
          debugId="aria-test"
          aria-expanded="true"
          aria-controls="article-content"
        >
          <div>Article content</div>
        </ArticleList>
      );

      const regionElement = screen.getByRole("region", {
        name: "Article list",
      });

      // Should maintain both component ARIA attributes and custom ones
      expect(regionElement).toHaveAttribute("aria-label", "Article list");
      expect(regionElement).toHaveAttribute("aria-expanded", "true");
      expect(regionElement).toHaveAttribute("aria-controls", "article-content");
    });
  });

  describe("Integration", () => {
    it("works with multiple article components", () => {
      render(
        <ArticleList>
          <article>
            <h2>First Article</h2>
            <p>First article content</p>
          </article>
          <article>
            <h2>Second Article</h2>
            <p>Second article content</p>
          </article>
        </ArticleList>
      );

      expect(screen.getByText("First Article")).toBeInTheDocument();
      expect(screen.getByText("First article content")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
      expect(screen.getByText("Second article content")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      const content = screen.getByText("Article content");

      expect(container).toContainElement(content);
      expect(content).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple props", () => {
      const start = performance.now();

      render(
        <ArticleList
          debugId="perf-test"
          debugMode={true}
          isMemoized={true}
          aria-label="Performance test"
          data-custom="value"
        >
          <div>Performance test content</div>
        </ArticleList>
      );

      const end = performance.now();
      const renderTime = end - start;

      expect(renderTime).toBeLessThan(50); // Should render in less than 50ms
      expect(screen.getByText("Performance test content")).toBeInTheDocument();
    });

    it("handles dynamic updates efficiently", () => {
      const { rerender } = render(
        <ArticleList>
          <div>Original content</div>
        </ArticleList>
      );

      expect(screen.getByText("Original content")).toBeInTheDocument();

      rerender(
        <ArticleList>
          <div>Updated content</div>
        </ArticleList>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Original content")).not.toBeInTheDocument();
    });
  });

  describe("Type Safety", () => {
    it("accepts standard div element props", () => {
      render(
        <ArticleList
          id="test-id"
          role="main"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          <div>Type safe content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("role", "region");
      expect(container).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );
      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all div HTML attributes", () => {
      render(
        <ArticleList
          data-custom="test"
          aria-label="Article List"
          style={{ backgroundColor: "white" }}
        >
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list");
      expect(container).toHaveAttribute("data-custom", "test");
      expect(container).toHaveAttribute("aria-label", "Article list");
      expect(container).toHaveAttribute("style");
    });
  });
});
