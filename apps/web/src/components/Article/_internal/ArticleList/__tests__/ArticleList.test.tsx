import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ArticleList from "../ArticleList";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode = false } = {}) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((...args) =>
    args.some((arg) => arg != null && arg !== "")
  ),
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

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS module
vi.mock("../ArticleList.module.css", () => ({
  default: {
    articleList: "_articleList_3da0c0",
    articleListChildren: "_articleListChildren_3da0c0",
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

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toBeInTheDocument();
      expect(container.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(
        <ArticleList className="custom-class">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <ArticleList aria-label="Article list" role="main">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveAttribute("aria-label", "Article list");
      expect(container).toHaveAttribute("role", "main");
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

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      render(
        <ArticleList debugMode={false}>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply when undefined", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
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

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveClass("_articleList_3da0c0");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <ArticleList className="custom-class">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveClass("_articleList_3da0c0", "custom-class");
    });

    it("renders children wrapper with correct class", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const childrenWrapper = screen
        .getByTestId("test-id-article-list-root")
        .querySelector("._articleListChildren_3da0c0") as HTMLElement;
      expect(childrenWrapper).toBeInTheDocument();
      expect(childrenWrapper).toHaveClass("_articleListChildren_3da0c0");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      render(
        <ArticleList>
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveAttribute(
        "data-article-list-id",
        "test-id-article-list"
      );
    });

    it("renders with custom internal ID when provided", () => {
      render(
        <ArticleList internalId="custom-id">
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("custom-id-article-list-root");
      expect(container).toHaveAttribute(
        "data-article-list-id",
        "custom-id-article-list"
      );
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

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toBeInTheDocument();
    });

    it("supports custom accessibility attributes", () => {
      render(
        <ArticleList
          role="main"
          aria-label="Article list"
          aria-describedby="article-description"
        >
          <div>Article content</div>
        </ArticleList>
      );

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveAttribute("role", "main");
      expect(container).toHaveAttribute("aria-label", "Article list");
      expect(container).toHaveAttribute(
        "aria-describedby",
        "article-description"
      );
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

      const container = screen.getByTestId("test-id-article-list-root");
      const childrenWrapper = container.querySelector(
        "._articleListChildren_3da0c0"
      ) as HTMLElement;
      const content = screen.getByText("Article content");

      expect(container).toContainElement(childrenWrapper);
      expect(childrenWrapper).toContainElement(content);
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple props", () => {
      const start = performance.now();

      render(
        <ArticleList
          className="test"
          internalId="perf-test"
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

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveAttribute("id", "test-id-article-list");
      expect(container).toHaveAttribute("role", "main");
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

      const container = screen.getByTestId("test-id-article-list-root");
      expect(container).toHaveAttribute("data-custom", "test");
      expect(container).toHaveAttribute("aria-label", "Article List");
      expect(container).toHaveAttribute("style");
    });
  });
});
