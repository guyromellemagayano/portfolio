/**
 * @file ArticleSearch.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the ArticleSearch component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { setCustomDateFormat } from "@web/utils/datetime";

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

const mockUseFuzzySearch = vi.hoisted(() =>
  vi.fn((data: any[]) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const results =
      normalizedQuery.length === 0
        ? data
        : data.filter((article) => {
            const haystack = [
              article.title,
              article.description,
              article.author,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return haystack.includes(normalizedQuery);
          });

    return {
      searchQuery,
      setSearchQuery,
      results,
    };
  })
);

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

describe("ArticleSearch Integration", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const mockArticles = [
    {
      slug: "react-patterns",
      title: "React Patterns",
      description: "Advanced React patterns",
      date: "2023-01-01",
      content: "React content",
      image: "/react.png",
      tags: ["react"],
    },
    {
      slug: "typescript-guides",
      title: "TypeScript Guides",
      description: "Type-safe patterns",
      date: "2023-02-10",
      content: "TypeScript content",
      image: "/ts.png",
      tags: ["typescript"],
    },
  ];

  it("filters results based on the search query", async () => {
    render(<ArticleSearch articles={mockArticles} />);

    const input = screen.getByRole("textbox", {
      name: "Search articles",
    });

    const user = userEvent.setup();
    await user.type(input, "React");

    expect(
      screen.getByRole("link", { name: "React Patterns" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "TypeScript Guides" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Found 1 articles for "React".')
    ).toBeInTheDocument();
  });

  it("shows all articles when the search query is cleared", async () => {
    render(<ArticleSearch articles={mockArticles} />);

    const input = screen.getByRole("textbox", {
      name: "Search articles",
    });

    const user = userEvent.setup();
    await user.type(input, "React");
    await user.clear(input);

    expect(
      screen.getByRole("link", { name: "React Patterns" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "TypeScript Guides" })
    ).toBeInTheDocument();
    expect(screen.getByText("Showing all 2 articles.")).toBeInTheDocument();
  });

  it("shows the empty state when no matches are found", async () => {
    render(<ArticleSearch articles={mockArticles} />);

    const input = screen.getByRole("textbox", {
      name: "Search articles",
    });

    const user = userEvent.setup();
    await user.type(input, "Unknown");

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Try a different search term/i)
    ).toBeInTheDocument();
  });

  it("wires search input ARIA relationships", () => {
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

  it("formats dates for rendered results", () => {
    const mockFormat = vi.mocked(setCustomDateFormat);

    render(<ArticleSearch articles={mockArticles} />);

    expect(mockFormat).toHaveBeenCalledWith("2023-01-01");
    expect(mockFormat).toHaveBeenCalledWith("2023-02-10");
  });
});
