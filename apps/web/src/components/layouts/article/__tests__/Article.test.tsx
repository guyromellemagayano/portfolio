// Mock next/navigation to ensure useRouter is available
vi.mock("next/navigation", () => ({
  usePathname: () => (globalThis as any).__TEST_PATHNAME__ ?? "/",
  useRouter: () => ({
    back: (globalThis as any).__MOCK_ROUTER_BACK__,
    push: vi.fn(),
    replace: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AppContext } from "@web/app/context";
import type { ArticleLayoutProps } from "@web/components/layouts/article/models";
import type { ArticleWithSlug } from "@web/lib/articles";

import "@testing-library/jest-dom";

// Router mock
const mockBack = (globalThis as any).__MOCK_ROUTER_BACK__;

// Mock design-system components used by the layout
vi.mock("@guyromellemagayano/components", () => {
  const Article = React.forwardRef<HTMLElement, any>((props, ref) => (
    <article ref={ref} data-testid="mock-article" {...props} />
  ));
  Article.displayName = "MockArticle";

  const Button = React.forwardRef<HTMLButtonElement, any>((props, ref) => (
    <button ref={ref} data-testid="mock-button" {...props} />
  ));
  Button.displayName = "MockButton";

  const Div = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  Div.displayName = "MockDiv";

  const Header = React.forwardRef<HTMLElement, any>((props, ref) => (
    <header ref={ref} data-testid="mock-header" {...props} />
  ));
  Header.displayName = "MockHeader";

  const Heading = React.forwardRef<HTMLHeadingElement, any>((props, ref) => (
    <h1 ref={ref} data-testid="mock-heading" {...props} />
  ));
  Heading.displayName = "MockHeading";

  const Span = React.forwardRef<HTMLSpanElement, any>((props, ref) => (
    <span ref={ref} data-testid="mock-span" {...props} />
  ));
  Span.displayName = "MockSpan";

  const Time = React.forwardRef<HTMLTimeElement, any>((props, ref) => (
    <time ref={ref} data-testid="mock-time" {...props} />
  ));
  Time.displayName = "MockTime";

  return { Article, Button, Div, Header, Heading, Span, Time };
});

// Mock icon
vi.mock("@web/components/layouts/article/_internal", () => ({
  ArrowLeftIcon: (props: any) => (
    <svg
      data-testid="mock-arrow-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      {...props}
    />
  ),
}));

// Mock app-level components barrel used by ArticleLayout
vi.mock("@web/components", () => {
  const Container = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-container" {...props} />
  ));
  Container.displayName = "MockContainer";

  const Prose = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-prose" {...props} />
  ));
  Prose.displayName = "MockProse";

  return { Container, Prose };
});

// Mock utility helpers
vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
  formatDate: (date: string) => `Formatted: ${date}`,
}));

let ArticleLayout: any;

describe("ArticleLayout", () => {
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
    children: <div data-testid="article-content">Article content</div>,
  } as any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const mod = await import("@web/components/layouts/article");
    ArticleLayout = mod.ArticleLayout;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders container, article, header, title, date, and prose", () => {
    render(<ArticleLayout {...defaultProps} />);

    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
    expect(screen.getByTestId("mock-article")).toBeInTheDocument();
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-heading")).toHaveTextContent(
      "Test Article Title"
    );

    const time = screen.getByTestId("mock-time");
    expect(time).toHaveAttribute("datetime", "2024-01-15");

    const spans = screen.getAllByTestId("mock-span");
    expect(spans[1]).toHaveTextContent("Formatted: 2024-01-15");

    const prose = screen.getByTestId("mock-prose");
    expect(prose).toHaveAttribute("data-mdx-content");
    expect(prose).toContainElement(screen.getByTestId("article-content"));
  });

  it("shows back button when previousPathname exists and calls router.back on click", () => {
    render(
      <AppContext.Provider value={{ previousPathname: "/articles" }}>
        <ArticleLayout {...defaultProps} />
      </AppContext.Provider>
    );

    const btn = screen.getByTestId("mock-button");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("mock-arrow-icon")).toBeInTheDocument();
  });

  it("does not show back button if previousPathname is falsy", () => {
    const { rerender } = render(
      <AppContext.Provider value={{ previousPathname: undefined }}>
        <ArticleLayout {...defaultProps} />
      </AppContext.Provider>
    );
    expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();

    rerender(
      <AppContext.Provider value={{ previousPathname: "" }}>
        <ArticleLayout {...defaultProps} />
      </AppContext.Provider>
    );
    expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();
  });

  it("applies default and custom classes to container", () => {
    render(<ArticleLayout {...defaultProps} className="custom-class" />);
    const container = screen.getByTestId("mock-container");
    expect(container).toHaveClass("mt-16");
    expect(container).toHaveClass("lg:mt-32");
    expect(container).toHaveClass("custom-class");
  });

  it("renders prose only when children are provided", () => {
    const { rerender } = render(<ArticleLayout {...defaultProps} />);
    expect(screen.getByTestId("mock-prose")).toBeInTheDocument();

    rerender(<ArticleLayout article={mockArticle}>{null}</ArticleLayout>);
    expect(screen.queryByTestId("mock-prose")).not.toBeInTheDocument();

    rerender(<ArticleLayout article={mockArticle}>{undefined}</ArticleLayout>);
    expect(screen.queryByTestId("mock-prose")).not.toBeInTheDocument();
  });

  it("renders article + prose but no heading/time when only children are provided", () => {
    render(
      <ArticleLayout>
        <div data-testid="only-children">Only children</div>
      </ArticleLayout>
    );

    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
    expect(screen.getByTestId("only-children")).toBeInTheDocument();
    expect(screen.getByTestId("mock-article")).toBeInTheDocument();
    expect(screen.getByTestId("mock-prose")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-heading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-time")).not.toBeInTheDocument();
  });

  it("does not render article structure when both article and children are absent", () => {
    render((<ArticleLayout />) as any);
    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-article")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-prose")).not.toBeInTheDocument();
  });

  it("forwards ref to the Container element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ArticleLayout {...defaultProps} ref={ref} />);
    const container = screen.getByTestId("mock-container");
    expect(ref.current).toBe(container);
  });

  it("forwards id/aria/data-* props to the Container", () => {
    render(
      <ArticleLayout
        {...defaultProps}
        id="article-container"
        data-testid="custom-container"
        aria-label="Article container"
        data-x="123"
      />
    );
    const container = screen.getByTestId("custom-container");
    expect(container).toHaveAttribute("id", "article-container");
    expect(container).toHaveAttribute("aria-label", "Article container");
    expect(container).toHaveAttribute("data-x", "123");
  });

  it("omits heading when article.title is empty or undefined", () => {
    const articleEmptyTitle = { ...mockArticle, title: "" } as any;
    const articleNoTitle = { ...mockArticle } as any;
    delete articleNoTitle.title;

    const { rerender } = render(
      <ArticleLayout {...defaultProps} article={articleEmptyTitle} />
    );
    expect(screen.queryByTestId("mock-heading")).not.toBeInTheDocument();

    rerender(<ArticleLayout {...defaultProps} article={articleNoTitle} />);
    expect(screen.queryByTestId("mock-heading")).not.toBeInTheDocument();
  });

  it("omits time when article.date is undefined", () => {
    const articleNoDate = { ...mockArticle } as any;
    delete articleNoDate.date;
    render(<ArticleLayout {...defaultProps} article={articleNoDate} />);
    expect(screen.queryByTestId("mock-time")).not.toBeInTheDocument();
  });

  it("renders the date separator span with expected classes", () => {
    render(<ArticleLayout {...defaultProps} />);
    const spans = screen.getAllByTestId("mock-span");
    const separator = spans[0];
    expect(separator).toHaveClass(
      "h-4",
      "w-0.5",
      "rounded-full",
      "bg-zinc-200"
    );
  });
});
