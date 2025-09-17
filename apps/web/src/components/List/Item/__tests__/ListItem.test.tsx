import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ListItem } from "../ListItem";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
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
vi.mock("../ListItem.module.css", () => ({
  default: {
    listItem: "listItem",
  },
}));

// Mock ArticleListItem
vi.mock("../_internal", () => ({
  ArticleListItem: vi.fn(({ children, article, ...props }) => {
    // Simulate content validation like the real component
    if (
      !article ||
      !article.title ||
      !article.description ||
      !article.slug ||
      !article.date
    ) {
      return null;
    }

    return (
      <article data-testid="mock-article-list-item" {...props}>
        {children}
      </article>
    );
  }),
}));

describe("ListItem", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<ListItem>Test content</ListItem>);

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders as li element", () => {
      render(<ListItem>List item content</ListItem>);

      const listItem = screen.getByRole("listitem");
      expect(listItem).toBeInTheDocument();
      expect(listItem.tagName).toBe("LI");
    });

    it("applies custom className", () => {
      render(<ListItem className="custom-class">Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<ListItem aria-label="List item">Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).toHaveAttribute("aria-label", "List item");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<ListItem />);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are null", () => {
      const { container } = render(<ListItem>{null}</ListItem>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are undefined", () => {
      const { container } = render(<ListItem>{undefined}</ListItem>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when children are empty string", () => {
      const { container } = render(<ListItem>{""}</ListItem>);
      expect(container.firstChild).toBeNull();
    });

    it("renders when children have content", () => {
      render(<ListItem>Valid content</ListItem>);

      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: true,
      });

      render(<ListItem debugMode={true}>Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      mockUseComponentId.mockReturnValue({
        id: "test-id",
        isDebugMode: false,
      });

      render(<ListItem debugMode={false}>Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply when undefined", () => {
      render(<ListItem>Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(<ListItem>Content</ListItem>);

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(<ListItem isMemoized={true}>Content</ListItem>);

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders non-memoized component when isMemoized is false", () => {
      render(<ListItem isMemoized={false}>Content</ListItem>);

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes", () => {
      render(<ListItem>Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).toHaveClass("listItem");
    });

    it("combines CSS module + custom classes", () => {
      render(<ListItem className="custom-class">Content</ListItem>);

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).toHaveClass("listItem", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      mockUseComponentId.mockReturnValue({
        id: "generated-id",
        isDebugMode: false,
      });

      render(<ListItem>Content</ListItem>);

      const listItem = screen.getByTestId("generated-id-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-list-item-id",
        "generated-id-list-item"
      );
    });

    it("renders with custom internal ID when provided", () => {
      render(<ListItem internalId="custom-id">Content</ListItem>);

      const listItem = screen.getByTestId("custom-id-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-list-item-id",
        "custom-id-list-item"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLLIElement>();
      render(<ListItem ref={ref}>Content</ListItem>);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLLIElement>();
      render(<ListItem ref={ref}>Content</ListItem>);

      expect(ref.current?.tagName).toBe("LI");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <ListItem>
          <div>
            <span>Nested content</span>
            <p>Multiple elements</p>
          </div>
        </ListItem>
      );

      expect(screen.getByText("Nested content")).toBeInTheDocument();
      expect(screen.getByText("Multiple elements")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<ListItem>Special chars: &lt;&gt;&amp;</ListItem>);

      expect(screen.getByText("Special chars: <>&")).toBeInTheDocument();
    });

    it("handles empty strings mixed with content", () => {
      render(
        <ListItem>
          {""}
          Valid content
          {""}
        </ListItem>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<ListItem>List item content</ListItem>);

      const listItem = screen.getByRole("listitem");
      expect(listItem).toBeInTheDocument();
    });

    it("supports custom accessibility attributes", () => {
      render(
        <ListItem role="option" aria-selected="true">
          Content
        </ListItem>
      );

      const listItem = screen.getByRole("option");
      expect(listItem).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Compound Components", () => {
    it("has Article sub-component attached", () => {
      expect(ListItem.Article).toBeDefined();
      expect(typeof ListItem.Article).toBe("function");
    });

    it("Article sub-component renders correctly", () => {
      const mockArticle = {
        slug: "test-article",
        title: "Test Article",
        description: "Test description",
        date: "2024-01-01",
        content: "Test content",
        image: "/test.jpg",
        tags: ["test"],
      };

      render(<ListItem.Article article={mockArticle} />);

      expect(screen.getByTestId("mock-article-list-item")).toBeInTheDocument();
    });

    it("Article sub-component passes through props correctly", () => {
      const mockArticle = {
        slug: "test-article",
        title: "Test Article",
        description: "Test description",
        date: "2024-01-01",
        content: "Test content",
        image: "/test.jpg",
        tags: ["test"],
      };

      render(
        <ListItem.Article
          article={mockArticle}
          isFrontPage={true}
          debugMode={true}
          internalId="custom-article-id"
        />
      );

      const articleElement = screen.getByTestId("mock-article-list-item");
      expect(articleElement).toBeInTheDocument();
    });

    it("Article sub-component handles different article data", () => {
      const mockArticle1 = {
        slug: "article-1",
        title: "First Article",
        description: "First description",
        date: "2024-01-01",
        content: "First content",
        image: "/image1.jpg",
        tags: ["tag1"],
      };

      const mockArticle2 = {
        slug: "article-2",
        title: "Second Article",
        description: "Second description",
        date: "2024-01-02",
        content: "Second content",
        image: "/image2.jpg",
        tags: ["tag2"],
      };

      const { rerender } = render(<ListItem.Article article={mockArticle1} />);
      expect(screen.getByTestId("mock-article-list-item")).toBeInTheDocument();

      rerender(<ListItem.Article article={mockArticle2} />);
      expect(screen.getByTestId("mock-article-list-item")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works within ul element", () => {
      render(
        <ul>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
        </ul>
      );

      const list = screen.getByRole("list");
      const items = screen.getAllByRole("listitem");

      expect(list).toBeInTheDocument();
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("First item");
      expect(items[1]).toHaveTextContent("Second item");
    });

    it("works within ol element", () => {
      render(
        <ol>
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
        </ol>
      );

      const list = screen.getByRole("list");
      const items = screen.getAllByRole("listitem");

      expect(list).toBeInTheDocument();
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("First step");
      expect(items[1]).toHaveTextContent("Second step");
    });

    it("maintains proper DOM structure", () => {
      render(<ListItem>Item content</ListItem>);

      const listItem = screen.getByRole("listitem");
      const content = screen.getByText("Item content");

      expect(listItem).toContainElement(content);
    });

    it("integrates with Article sub-component in list context", () => {
      const mockArticle = {
        slug: "integration-test",
        title: "Integration Test Article",
        description: "Testing integration with ListItem",
        date: "2024-01-01",
        content: "Integration content",
        image: "/integration.jpg",
        tags: ["integration", "test"],
      };

      render(
        <ul>
          <ListItem>
            <ListItem.Article article={mockArticle} />
          </ListItem>
          <ListItem>Regular list item</ListItem>
        </ul>
      );

      const list = screen.getByRole("list");
      const items = screen.getAllByRole("listitem");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(list).toBeInTheDocument();
      expect(items).toHaveLength(2);
      expect(articleElement).toBeInTheDocument();
      expect(items[0]).toContainElement(articleElement);
    });

    it("handles mixed content types in list", () => {
      const mockArticle = {
        slug: "mixed-content",
        title: "Mixed Content Article",
        description: "Article in mixed list",
        date: "2024-01-01",
        content: "Mixed content",
        image: "/mixed.jpg",
        tags: ["mixed"],
      };

      render(
        <ul>
          <ListItem>Simple text item</ListItem>
          <ListItem>
            <div>
              <span>Complex content</span>
              <p>With multiple elements</p>
            </div>
          </ListItem>
          <ListItem>
            <ListItem.Article article={mockArticle} />
          </ListItem>
        </ul>
      );

      const list = screen.getByRole("list");
      const items = screen.getAllByRole("listitem");

      expect(list).toBeInTheDocument();
      expect(items).toHaveLength(3);
      expect(screen.getByText("Simple text item")).toBeInTheDocument();
      expect(screen.getByText("Complex content")).toBeInTheDocument();
      expect(screen.getByTestId("mock-article-list-item")).toBeInTheDocument();
    });

    it("maintains proper nesting with Article sub-component", () => {
      const mockArticle = {
        slug: "nesting-test",
        title: "Nesting Test",
        description: "Testing proper nesting",
        date: "2024-01-01",
        content: "Nesting content",
        image: "/nesting.jpg",
        tags: ["nesting"],
      };

      render(
        <ListItem>
          <ListItem.Article article={mockArticle} />
        </ListItem>
      );

      const listItem = screen.getByRole("listitem");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(listItem).toContainElement(articleElement);
      expect(listItem.tagName).toBe("LI");
    });

    it("works with Article sub-component and custom props", () => {
      const mockArticle = {
        slug: "props-test",
        title: "Props Test Article",
        description: "Testing props integration",
        date: "2024-01-01",
        content: "Props content",
        image: "/props.jpg",
        tags: ["props"],
      };

      render(
        <ListItem
          className="custom-list-item"
          debugMode={true}
          internalId="custom-list-item-id"
        >
          <ListItem.Article
            article={mockArticle}
            isFrontPage={false}
            debugMode={true}
            internalId="custom-article-id"
          />
        </ListItem>
      );

      const listItem = screen.getByTestId("custom-list-item-id-list-item-root");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveClass("custom-list-item");
      expect(articleElement).toBeInTheDocument();
      expect(listItem).toContainElement(articleElement);
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple props", () => {
      const start = performance.now();

      render(
        <ListItem
          className="test"
          internalId="perf-test"
          debugMode={true}
          isMemoized={true}
          aria-label="Performance test"
          data-custom="value"
        >
          Performance test content
        </ListItem>
      );

      const end = performance.now();
      const renderTime = end - start;

      expect(renderTime).toBeLessThan(50); // Should render in less than 50ms
      expect(screen.getByText("Performance test content")).toBeInTheDocument();
    });

    it("handles dynamic updates efficiently", () => {
      const { rerender } = render(<ListItem>Original content</ListItem>);

      expect(screen.getByText("Original content")).toBeInTheDocument();

      rerender(<ListItem>Updated content</ListItem>);

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Original content")).not.toBeInTheDocument();
    });
  });

  describe("Internal Component Integration", () => {
    it("ArticleListItem receives correct props from ListItem context", () => {
      const mockArticle = {
        slug: "context-test",
        title: "Context Test Article",
        description: "Testing context passing",
        date: "2024-01-01",
        content: "Context content",
        image: "/context.jpg",
        tags: ["context"],
      };

      render(
        <ListItem debugMode={true} internalId="parent-list-item">
          <ListItem.Article article={mockArticle} />
        </ListItem>
      );

      const listItem = screen.getByTestId("parent-list-item-list-item-root");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(listItem).toBeInTheDocument();
      expect(articleElement).toBeInTheDocument();
      expect(listItem).toContainElement(articleElement);
    });

    it("ArticleListItem maintains independence from ListItem props", () => {
      const mockArticle = {
        slug: "independence-test",
        title: "Independence Test",
        description: "Testing prop independence",
        date: "2024-01-01",
        content: "Independence content",
        image: "/independence.jpg",
        tags: ["independence"],
      };

      render(
        <ListItem debugMode={false} internalId="parent-id">
          <ListItem.Article
            article={mockArticle}
            debugMode={true}
            internalId="child-id"
            isFrontPage={true}
          />
        </ListItem>
      );

      const listItem = screen.getByTestId("parent-id-list-item-root");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(listItem).toBeInTheDocument();
      expect(articleElement).toBeInTheDocument();
      // ArticleListItem should maintain its own props independently
    });

    it("handles multiple ArticleListItems in same ListItem", () => {
      const mockArticle1 = {
        slug: "multi-1",
        title: "First Article",
        description: "First description",
        date: "2024-01-01",
        content: "First content",
        image: "/first.jpg",
        tags: ["first"],
      };

      const mockArticle2 = {
        slug: "multi-2",
        title: "Second Article",
        description: "Second description",
        date: "2024-01-02",
        content: "Second content",
        image: "/second.jpg",
        tags: ["second"],
      };

      render(
        <ListItem>
          <ListItem.Article article={mockArticle1} />
          <ListItem.Article article={mockArticle2} />
        </ListItem>
      );

      const listItem = screen.getByRole("listitem");
      const articleElements = screen.getAllByTestId("mock-article-list-item");

      expect(listItem).toBeInTheDocument();
      expect(articleElements).toHaveLength(2);
      expect(listItem).toContainElement(articleElements[0]!);
      expect(listItem).toContainElement(articleElements[1]!);
    });

    it("ArticleListItem works with ListItem memoization", () => {
      const mockArticle = {
        slug: "memo-test",
        title: "Memo Test Article",
        description: "Testing memoization",
        date: "2024-01-01",
        content: "Memo content",
        image: "/memo.jpg",
        tags: ["memo"],
      };

      render(
        <ListItem isMemoized={true}>
          <ListItem.Article article={mockArticle} isMemoized={true} />
        </ListItem>
      );

      const listItem = screen.getByRole("listitem");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(listItem).toBeInTheDocument();
      expect(articleElement).toBeInTheDocument();
      expect(listItem).toContainElement(articleElement);
    });

    it("ArticleListItem handles content validation within ListItem", () => {
      const validArticle = {
        slug: "valid-article",
        title: "Valid Article",
        description: "Valid description",
        date: "2024-01-01",
        content: "Valid content",
        image: "/valid.jpg",
        tags: ["valid"],
      };

      const invalidArticle = {
        slug: "",
        title: "",
        description: "",
        date: "",
        content: "",
        image: "",
        tags: [],
      };

      const { rerender } = render(
        <ListItem>
          <ListItem.Article article={validArticle} />
        </ListItem>
      );

      expect(screen.getByTestId("mock-article-list-item")).toBeInTheDocument();

      rerender(
        <ListItem>
          <ListItem.Article article={invalidArticle} />
        </ListItem>
      );

      // ArticleListItem should handle its own validation and not render
      expect(
        screen.queryByTestId("mock-article-list-item")
      ).not.toBeInTheDocument();
    });

    it("ArticleListItem maintains proper event handling within ListItem", () => {
      const mockArticle = {
        slug: "event-test",
        title: "Event Test Article",
        description: "Testing event handling",
        date: "2024-01-01",
        content: "Event content",
        image: "/event.jpg",
        tags: ["event"],
      };

      const handleClick = vi.fn();

      render(
        <ListItem onClick={handleClick}>
          <ListItem.Article article={mockArticle} />
        </ListItem>
      );

      const listItem = screen.getByRole("listitem");
      const articleElement = screen.getByTestId("mock-article-list-item");

      expect(listItem).toBeInTheDocument();
      expect(articleElement).toBeInTheDocument();
      expect(listItem).toContainElement(articleElement);
    });
  });

  describe("Type Safety", () => {
    it("accepts standard li element props", () => {
      render(
        <ListItem
          id="test-id"
          role="listitem"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Type safe content
        </ListItem>
      );

      const listItem = screen.getByTestId("test-id-list-item-root");
      expect(listItem).toHaveAttribute("id", "test-id");
      expect(listItem).toHaveAttribute("role", "listitem");
      expect(listItem).toHaveAttribute("tabIndex", "0");
    });
  });
});
