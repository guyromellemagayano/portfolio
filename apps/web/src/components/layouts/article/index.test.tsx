import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AppContext } from "@web/app/context";
import type { ArticleWithSlug } from "@web/lib/articles";

import { ArticleLayout, type ArticleLayoutProps } from "./index";

import "@testing-library/jest-dom";

// Mock Next.js router
const mockBack = vi.fn();
const mockRouter = {
  back: mockBack,
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

vi.mock("@guyromellemagayano/components", () => {
  const MockArticle = React.forwardRef<HTMLElement, any>((props, ref) => (
    <article ref={ref} data-testid="mock-article" {...props} />
  ));
  MockArticle.displayName = "MockArticle";

  const MockButton = React.forwardRef<HTMLButtonElement, any>((props, ref) => (
    <button ref={ref} data-testid="mock-button" {...props} />
  ));
  MockButton.displayName = "MockButton";

  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  MockDiv.displayName = "MockDiv";

  const MockHeader = React.forwardRef<HTMLElement, any>((props, ref) => (
    <header ref={ref} data-testid="mock-header" {...props} />
  ));
  MockHeader.displayName = "MockHeader";

  const MockHeading = React.forwardRef<HTMLHeadingElement, any>(
    (props, ref) => <h1 ref={ref} data-testid="mock-heading" {...props} />
  );
  MockHeading.displayName = "MockHeading";

  const MockSpan = React.forwardRef<HTMLSpanElement, any>((props, ref) => (
    <span ref={ref} data-testid="mock-span" {...props} />
  ));
  MockSpan.displayName = "MockSpan";

  const MockTime = React.forwardRef<HTMLTimeElement, any>((props, ref) => (
    <time ref={ref} data-testid="mock-time" {...props} />
  ));
  MockTime.displayName = "MockTime";

  const MockSvg = React.forwardRef<SVGSVGElement, any>((props, ref) => (
    <svg ref={ref} data-testid="mock-svg" {...props} />
  ));
  MockSvg.displayName = "MockSvg";

  return {
    Article: MockArticle,
    Button: MockButton,
    Div: MockDiv,
    Header: MockHeader,
    Heading: MockHeading,
    Span: MockSpan,
    Time: MockTime,
    Svg: MockSvg,
    SvgProps: {},
  };
});

vi.mock("@web/components/container", () => {
  const MockContainer = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-container" {...props} />
  ));
  MockContainer.displayName = "MockContainer";

  return {
    Container: MockContainer,
  };
});

vi.mock("@web/components/prose", () => {
  const MockProse = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-prose" {...props} />
  ));
  MockProse.displayName = "MockProse";

  return {
    Prose: MockProse,
  };
});

// Mock the formatDate function
vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
  formatDate: (date: string) => `Formatted: ${date}`,
}));

describe("ArticleLayout Component", () => {
  const mockArticle: ArticleWithSlug = {
    slug: "test-article",
    title: "Test Article Title",
    date: "2024-01-15",
    description: "This is a test article description",
    image: "/images/test-article.jpg",
    tags: ["test", "article"],
  };

  const defaultProps: ArticleLayoutProps = {
    article: mockArticle,
    children: <div data-testid="article-content">Article content here</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders the article layout with all required elements", () => {
      render(<ArticleLayout {...defaultProps} />);

      expect(screen.getByTestId("mock-container")).toBeInTheDocument();
      expect(screen.getByTestId("mock-article")).toBeInTheDocument();
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
      expect(screen.getByTestId("mock-heading")).toBeInTheDocument();
      expect(screen.getByTestId("mock-time")).toBeInTheDocument();
      expect(screen.getByTestId("mock-prose")).toBeInTheDocument();
      expect(screen.getByTestId("article-content")).toBeInTheDocument();
    });

    it("displays the article title correctly", () => {
      render(<ArticleLayout {...defaultProps} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent("Test Article Title");
    });

    it("displays the formatted date correctly", () => {
      render(<ArticleLayout {...defaultProps} />);

      const timeElement = screen.getByTestId("mock-time");
      expect(timeElement).toHaveAttribute("datetime", "2024-01-15");

      const dateSpan = screen.getAllByTestId("mock-span")[1]; // Second span contains the date
      expect(dateSpan).toHaveTextContent("Formatted: 2024-01-15");
    });

    it("renders the date separator correctly", () => {
      render(<ArticleLayout {...defaultProps} />);

      const separatorSpan = screen.getAllByTestId("mock-span")[0]; // First span is the separator
      expect(separatorSpan).toHaveClass(
        "h-4",
        "w-0.5",
        "rounded-full",
        "bg-zinc-200"
      );
    });

    it("renders article content in prose component", () => {
      render(<ArticleLayout {...defaultProps} />);

      const prose = screen.getByTestId("mock-prose");
      expect(prose).toHaveAttribute("data-mdx-content");
      expect(prose).toHaveClass("mt-8");
      expect(prose).toContainElement(screen.getByTestId("article-content"));
    });
  });

  describe("Navigation Button", () => {
    it("renders back button when previousPathname exists", () => {
      const contextValue = { previousPathname: "/articles" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      const backButton = screen.getByTestId("mock-button");
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveAttribute("aria-label", "Go back to articles");
      expect(backButton).toHaveAttribute("type", "button");
    });

    it("does not render back button when previousPathname is undefined", () => {
      const contextValue = { previousPathname: undefined };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();
    });

    it("does not render back button when previousPathname is empty", () => {
      const contextValue = { previousPathname: "" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();
    });

    it("calls router.back when back button is clicked", () => {
      const contextValue = { previousPathname: "/articles" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      const backButton = screen.getByTestId("mock-button");
      fireEvent.click(backButton);

      expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it("renders arrow icon in back button", () => {
      const contextValue = { previousPathname: "/articles" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      const backButton = screen.getByTestId("mock-button");
      const svg = backButton.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 16 16");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Styling and Classes", () => {
    it("applies correct classes to container", () => {
      render(<ArticleLayout {...defaultProps} />);

      const container = screen.getByTestId("mock-container");
      expect(container).toHaveClass("mt-16", "lg:mt-32");
    });

    it("merges custom className with default classes", () => {
      render(<ArticleLayout {...defaultProps} className="custom-class" />);

      const container = screen.getByTestId("mock-container");
      expect(container).toHaveClass("mt-16", "lg:mt-32", "custom-class");
    });

    it("applies correct classes to back button when present", () => {
      const contextValue = { previousPathname: "/articles" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      const backButton = screen.getByTestId("mock-button");
      expect(backButton).toHaveClass(
        "group",
        "mb-8",
        "flex",
        "h-10",
        "w-10",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-white",
        "shadow-md",
        "ring-1",
        "shadow-zinc-800/5",
        "ring-zinc-900/5",
        "transition"
      );
    });

    it("applies correct classes to heading", () => {
      render(<ArticleLayout {...defaultProps} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveClass(
        "mt-6",
        "text-4xl",
        "font-bold",
        "tracking-tight",
        "text-zinc-800",
        "sm:text-5xl",
        "dark:text-zinc-100"
      );
    });

    it("applies correct classes to time element", () => {
      render(<ArticleLayout {...defaultProps} />);

      const timeElement = screen.getByTestId("mock-time");
      expect(timeElement).toHaveClass(
        "order-first",
        "flex",
        "items-center",
        "text-base",
        "text-zinc-400",
        "dark:text-zinc-500"
      );
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all props to container component", () => {
      render(
        <ArticleLayout
          {...defaultProps}
          id="test-container"
          data-testid="custom-container"
          aria-label="Article container"
        />
      );

      const container = screen.getByTestId("custom-container");
      expect(container).toHaveAttribute("id", "test-container");
      expect(container).toHaveAttribute("data-testid", "custom-container");
      expect(container).toHaveAttribute("aria-label", "Article container");
    });

    it("forwards all props to container except article and children", () => {
      const { article, children, ...restProps } = defaultProps;

      render(
        <ArticleLayout
          article={article}
          children={children}
          id="test-id"
          className="test-class"
          data-custom="test-value"
        />
      );

      // The container should be the outermost div with the forwarded props
      const container = screen.getByTestId("mock-container");
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveClass("test-class");
      expect(container).toHaveAttribute("data-custom", "test-value");
    });
  });

  describe("Context Integration", () => {
    it("uses AppContext to determine back button visibility", () => {
      const contextValue = { previousPathname: "/articles" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      expect(screen.getByTestId("mock-button")).toBeInTheDocument();
    });

    it("handles undefined context gracefully", () => {
      render(<ArticleLayout {...defaultProps} />);

      expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();
    });

    it("handles empty context gracefully", () => {
      render(
        <AppContext.Provider value={{}}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      render(<ArticleLayout {...defaultProps} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading.tagName).toBe("H1");
    });

    it("has proper time element with datetime attribute", () => {
      render(<ArticleLayout {...defaultProps} />);

      const timeElement = screen.getByTestId("mock-time");
      expect(timeElement.tagName).toBe("TIME");
      expect(timeElement).toHaveAttribute("datetime", "2024-01-15");
    });

    it("has proper button accessibility when back button is present", () => {
      const contextValue = { previousPathname: "/articles" };

      render(
        <AppContext.Provider value={contextValue}>
          <ArticleLayout {...defaultProps} />
        </AppContext.Provider>
      );

      const backButton = screen.getByTestId("mock-button");
      expect(backButton).toHaveAttribute("aria-label", "Go back to articles");
      expect(backButton).toHaveAttribute("type", "button");
    });

    it("has proper article semantic structure", () => {
      render(<ArticleLayout {...defaultProps} />);

      const article = screen.getByTestId("mock-article");
      expect(article.tagName).toBe("ARTICLE");
    });

    it("has proper header semantic structure", () => {
      render(<ArticleLayout {...defaultProps} />);

      const header = screen.getByTestId("mock-header");
      expect(header.tagName).toBe("HEADER");
    });
  });

  describe("Edge Cases", () => {
    it("handles article with empty title", () => {
      const articleWithEmptyTitle = { ...mockArticle, title: "" };

      render(
        <ArticleLayout {...defaultProps} article={articleWithEmptyTitle} />
      );

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent("");
    });

    it("handles article with very long title", () => {
      const longTitle = "A".repeat(200);
      const articleWithLongTitle = { ...mockArticle, title: longTitle };

      render(
        <ArticleLayout {...defaultProps} article={articleWithLongTitle} />
      );

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent(longTitle);
    });

    it("handles article with special characters in title", () => {
      const specialTitle = "Article with special chars: & < > \" '";
      const articleWithSpecialTitle = { ...mockArticle, title: specialTitle };

      render(
        <ArticleLayout {...defaultProps} article={articleWithSpecialTitle} />
      );

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent(specialTitle);
    });

    it("handles empty children", () => {
      render(<ArticleLayout {...defaultProps} children={null} />);

      const prose = screen.getByTestId("mock-prose");
      expect(prose).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<ArticleLayout {...defaultProps} children={undefined} />);

      const prose = screen.getByTestId("mock-prose");
      expect(prose).toBeInTheDocument();
    });

    it("handles complex children structure", () => {
      const complexChildren = (
        <div>
          <h2>Subheading</h2>
          <p>Paragraph content</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </div>
      );

      render(<ArticleLayout {...defaultProps} children={complexChildren} />);

      expect(screen.getByText("Subheading")).toBeInTheDocument();
      expect(screen.getByText("Paragraph content")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
    });
  });

  describe("Component Display Name", () => {
    it("has correct display name", () => {
      expect(ArticleLayout.displayName).toBe("ArticleLayout");
    });
  });
});
