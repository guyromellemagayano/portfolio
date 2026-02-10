/**
 * @file ArticleSearch.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the ArticleSearch component.
 */

import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleSearch } from "../ArticleSearch";

import "@testing-library/jest-dom";

const mockUseTranslations = vi.hoisted(() =>
  vi.fn(() => (key: string, values?: Record<string, number | string>) => {
    const translations: Record<
      string,
      string | ((params?: Record<string, number | string>) => string)
    > = {
      cta: "Read article",
      "search.labels.searchArticles": "Search articles",
      "search.labels.noArticlesFound": "No articles found",
      "search.labels.tryDifferentSearchTerm": "Try a different search term",
      "search.labels.showingAllArticles": ({ count } = {}) =>
        `Showing all ${count} articles.`,
      "search.labels.foundResults": ({ count, query } = {}) =>
        `Found ${count} articles for \"${query}\".`,
      "search.labels.searchLandmark": "Search articles",
      "search.labels.resultsRegion": "Search results",
    };

    const entry = translations[key];
    return typeof entry === "function" ? entry(values) : entry ?? key;
  })
);

const mockSetSearchQuery = vi.hoisted(() => vi.fn());
const mockUseFuzzySearch = vi.hoisted(() => vi.fn());

vi.mock("next-intl", () => ({
  useTranslations: mockUseTranslations,
}));

vi.mock("@web/utils/search", () => ({
  useFuzzySearch: (...args: unknown[]) => mockUseFuzzySearch(...args),
}));

vi.mock("@web/utils/datetime", () => ({
  setCustomDateFormat: vi.fn((date: string) =>
    date ? `Formatted ${date}` : ""
  ),
}));

vi.mock("@web/components/card", () => {
  const MockCard = Object.assign(
    function MockCard(props: any) {
      const { children, as: Component = "div", ...rest } = props;
      return (
        <Component data-testid="mock-card" {...rest}>
          {children}
        </Component>
      );
    },
    {
      Title: function MockCardTitle(props: any) {
        const { children, href, as: Component = "h2", ...rest } = props;
        const hrefString = href ? String(href) : undefined;
        return (
          <Component data-testid="mock-card-title" {...rest}>
            {hrefString ? <a href={hrefString}>{children}</a> : children}
          </Component>
        );
      },
      Eyebrow: function MockCardEyebrow(props: any) {
        const {
          children,
          as: Component = "p",
          dateTime,
          decorate,
          ...rest
        } = props;
        return (
          <Component
            data-testid="mock-card-eyebrow"
            dateTime={dateTime}
            data-decorate={decorate ? "true" : undefined}
            {...rest}
          >
            {children}
          </Component>
        );
      },
      Description: function MockCardDescription(props: any) {
        const { children, ...rest } = props;
        return (
          <p data-testid="mock-card-description" {...rest}>
            {children}
          </p>
        );
      },
      Cta: function MockCardCta(props: any) {
        const { children, href, ...rest } = props;
        const hrefString = href ? String(href) : undefined;
        return (
          <div data-testid="mock-card-cta" {...rest}>
            {hrefString ? <a href={hrefString}>{children}</a> : children}
          </div>
        );
      },
    }
  );

  return { Card: MockCard };
});

vi.mock("@web/components/form", () => ({
  Form: function MockForm(props: any) {
    const { children, as: Component = "form", ...rest } = props;
    return (
      <Component data-testid="mock-form" {...rest}>
        {children}
      </Component>
    );
  },
}));

vi.mock("@web/components/icon", () => ({
  Icon: function MockIcon(props: any) {
    return <span data-testid="mock-icon" {...props} />;
  },
}));

describe("ArticleSearch", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const mockArticles = [
    {
      slug: "intro-to-react",
      title: "Intro to React",
      description: "Learn React basics",
      date: "2023-01-01",
      content: "React content",
      image: "/react.png",
      tags: ["react"],
    },
    {
      slug: "nextjs-tips",
      title: "Next.js Tips",
      description: "Tips for Next.js",
      date: "2023-02-02",
      content: "Next.js content",
      image: "/next.png",
      tags: ["next"],
    },
  ];

  it("renders search form and input with accessible labels", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    render(<ArticleSearch articles={mockArticles} />);

    const searchForm = screen.getByRole("search", {
      name: "Search articles",
    });
    expect(searchForm).toBeInTheDocument();

    const input = screen.getByRole("textbox", {
      name: "Search articles",
    });
    expect(input).toHaveAttribute("placeholder", "Search articles");
  });

  it("renders the root element as a div by default", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    const { container } = render(<ArticleSearch articles={mockArticles} />);
    const root = container.firstElementChild as HTMLElement | null;

    expect(root?.tagName).toBe("DIV");
  });

  it("renders article cards and formatted dates", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    render(<ArticleSearch articles={mockArticles} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Intro to React" })
    ).toHaveAttribute("href", "/articles/intro-to-react");
    expect(screen.getByText("Learn React basics")).toBeInTheDocument();

    const formattedDates = screen.getAllByText("Formatted 2023-01-01");
    expect(formattedDates.length).toBeGreaterThan(0);

    expect(screen.getAllByTestId("mock-card-cta")).toHaveLength(2);
  });

  it("shows empty state when no results are found", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "React",
      setSearchQuery: mockSetSearchQuery,
      results: [],
    });

    render(<ArticleSearch articles={mockArticles} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Try a different search term/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Found 0 articles for "React".')
    ).toBeInTheDocument();
  });

  it("handles empty article lists", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: [],
    });

    render(<ArticleSearch articles={[]} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    expect(screen.getByText("Showing all 0 articles.")).toBeInTheDocument();
  });

  it("calls setSearchQuery when typing in the input", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    render(<ArticleSearch articles={mockArticles} />);

    const input = screen.getByRole("textbox", {
      name: "Search articles",
    });

    fireEvent.change(input, { target: { value: "Next" } });

    expect(mockSetSearchQuery).toHaveBeenCalled();
    expect(mockSetSearchQuery).toHaveBeenLastCalledWith("Next");
  });

  it("wires search input ARIA relationships", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    render(<ArticleSearch articles={mockArticles} />);

    const input = screen.getByRole("textbox", {
      name: "Search articles",
    });

    const describedById = input.getAttribute("aria-describedby");
    const controlsId = input.getAttribute("aria-controls");

    expect(describedById).toBeTruthy();
    expect(controlsId).toBeTruthy();

    const status = document.getElementById(describedById as string);
    const resultsRegion = screen.getByRole("region", {
      name: "Search results",
    });

    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(resultsRegion.id).toBe(controlsId);
  });

  it("forwards refs to the root element", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    const ref = React.createRef<HTMLDivElement>();

    render(<ArticleSearch articles={mockArticles} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through debug attributes", () => {
    mockUseFuzzySearch.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      results: mockArticles,
    });

    const { container } = render(
      <ArticleSearch articles={mockArticles} data-debug-mode="true" />
    );

    const root = container.firstElementChild as HTMLElement | null;
    expect(root).toBeTruthy();
    expect(root).toHaveAttribute("data-debug-mode", "true");
  });
});
