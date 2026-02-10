/**
 * @file Article.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Article component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Article } from "../Article";

import "@testing-library/jest-dom";

const mockUseTranslations = vi.hoisted(() =>
  vi.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      cta: "Read article",
      articleDate: "Published on",
    };
    return translations[key] || key;
  })
);

// Mock dependencies

vi.mock("@guyromellemagayano/utils", () => ({
  formatDateSafely: vi.fn((date) => {
    if (!date) return "";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) return "";
      return new Intl.DateTimeFormat("en-US").format(dateObj);
    } catch {
      return "";
    }
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: mockUseTranslations,
}));

// Mock Card component with a realistic structure
vi.mock("../../card", () => {
  const MockCard = Object.assign(
    function MockCard(props: any) {
      const {
        children,
        className,
        as: Component = "div",
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        ...rest
      } = props;

      return React.createElement(
        Component,
        {
          className,
          "aria-labelledby": ariaLabelledBy,
          "aria-describedby": ariaDescribedBy,
          "data-testid": "mock-card",
          ...rest,
        },
        children
      );
    },
    {
      Title: function MockCardTitle(props: any) {
        const { children, href, id, as: Component = "h2", ...rest } = props;
        // Handle href as string (component creates string paths, not URL objects)
        const hrefString = href ? String(href) : undefined;
        return (
          <Component data-testid="mock-card-title" id={id} {...rest}>
            {hrefString ? <a href={hrefString}>{children}</a> : children}
          </Component>
        );
      },
      Eyebrow: function MockCardEyebrow(props: any) {
        const {
          children,
          dateTime,
          "aria-label": ariaLabel,
          as: Component = "time",
          ...rest
        } = props;
        return React.createElement(
          Component,
          {
            dateTime,
            "aria-label": ariaLabel,
            "data-testid": "mock-card-eyebrow",
            ...rest,
          },
          children
        );
      },
      Description: function MockCardDescription(props: any) {
        const { children, id, ...rest } = props;
        return (
          <p data-testid="mock-card-description" id={id} {...rest}>
            {children}
          </p>
        );
      },
      Cta: function MockCardCta(props: any) {
        const { children, href, title, ...rest } = props;
        // Mock CardLinkCustom behavior: sets title attribute and aria-label when title exists and children aren't descriptive
        // Since our children are descriptive ("Read article"), aria-label is not set, but title attribute is set
        const hasDescriptiveText =
          typeof children === "string"
            ? children.trim().length > 0
            : React.Children.count(children) > 0;
        const ariaLabel = title && !hasDescriptiveText ? title : undefined;

        const linkProps: Record<string, any> = { href };
        if (title) {
          // CardLinkCustom sets title={title ?? undefined}, so we set it if title is truthy
          linkProps.title = String(title);
        }
        if (ariaLabel) {
          linkProps["aria-label"] = String(ariaLabel);
        }

        return (
          <div data-testid="mock-card-cta" {...rest}>
            {href ? <a {...linkProps}>{children}</a> : children}
          </div>
        );
      },
    }
  );

  return {
    Card: MockCard,
    default: MockCard,
  };
});

describe("Article Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const mockArticle = {
    slug: "test-article",
    title: "Test Article Title",
    description: "This is a test article description",
    date: "2023-01-01",
    content: "Test content",
    image: "/test-image.jpg",
    tags: ["test", "article"],
  };

  describe("Article with Card Sub-components", () => {
    it("renders Article with all Card sub-components in correct order", () => {
      render(<Article article={mockArticle} />);

      const card = screen.getByTestId("mock-card");
      expect(card).toBeInTheDocument();

      // Verify all subcomponents are present
      const title = screen.getByTestId("mock-card-title");
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      const description = screen.getByTestId("mock-card-description");
      // CTA only renders when title, date, and description all exist
      const cta = screen.getByTestId("mock-card-cta");

      expect(title).toBeInTheDocument();
      expect(eyebrow).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(cta).toBeInTheDocument();

      // Verify content
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      // CTA should render when all required fields exist
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy and relationships", () => {
      render(<Article article={mockArticle} />);

      const card = screen.getByTestId("mock-card");
      const title = screen.getByTestId("mock-card-title");
      const description = screen.getByTestId("mock-card-description");

      // Verify ARIA relationships (SEO: proper semantic structure)
      expect(card).toHaveAttribute("aria-labelledby");
      expect(card).toHaveAttribute("aria-describedby");

      // Verify IDs match (generated by useId)
      const titleId = title.getAttribute("id");
      const descriptionId = description.getAttribute("id");
      expect(titleId).toBeTruthy();
      expect(descriptionId).toBeTruthy();
      expect(card).toHaveAttribute("aria-labelledby", titleId);
      expect(card).toHaveAttribute("aria-describedby", descriptionId);
    });

    it("correctly formats and passes article data to Card sub-components", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        title: "  Trimmed Title  ",
        description: "  Trimmed Description  ",
        slug: "  trimmed-slug  ",
        date: "  2023-01-01  ",
      };

      render(<Article article={articleWithWhitespace} />);

      // Verify trimmed content is passed to subcomponents
      expect(screen.getByText("Trimmed Title")).toBeInTheDocument();
      expect(screen.getByText("Trimmed Description")).toBeInTheDocument();

      // Verify date is formatted and passed correctly
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrow).toHaveAttribute("dateTime", "2023-01-01");

      // Verify slug is trimmed and used in href (title link)
      const titleElement = screen.getByTestId("mock-card-title");
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute("href", "/articles/trimmed-slug");
    });

    it("handles article with valid date and creates href for title link", () => {
      render(<Article article={mockArticle} />);

      const title = screen.getByTestId("mock-card-title");
      const link = title.querySelector("a");

      // Link should exist when slug is valid
      expect(link).toHaveAttribute("href", "/articles/test-article");
    });

    it("handles article with invalid date and still renders CTA", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };

      render(<Article article={articleWithInvalidDate} />);

      // Component should still render
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      // Eyebrow renders (date is present), but formatted date can be empty
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrow).toHaveAttribute("dateTime", "invalid-date");
      expect(eyebrow.textContent).toBe("");

      // CTA renders because title + date (non-empty string) + description exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("applies correct ARIA attributes across all sub-components", () => {
      render(<Article article={mockArticle} />);

      // Card element (div by default)
      const card = screen.getByTestId("mock-card");
      expect(card).toBeInTheDocument();
      expect(card.tagName).toBe("DIV");
      expect(card).toHaveAttribute("aria-labelledby");
      expect(card).toHaveAttribute("aria-describedby");

      // Title with h2 (SEO: proper heading hierarchy)
      const title = screen.getByTestId("mock-card-title");
      expect(title.tagName).toBe("H2");

      // Eyebrow with aria-label and dateTime (SEO: proper time semantics)
      const eyebrow = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrow).toHaveAttribute("aria-label");
      expect(eyebrow).toHaveAttribute("dateTime");
      expect(eyebrow).toHaveAttribute(
        "aria-label",
        expect.stringContaining("Published on")
      );
    });

    it("handles article updates and maintains component structure", () => {
      const { rerender } = render(<Article article={mockArticle} />);

      // Initial render
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();

      // Update article
      const updatedArticle = {
        ...mockArticle,
        title: "Updated Title",
        description: "Updated Description",
      };

      rerender(<Article article={updatedArticle} />);

      // Verify updated content
      expect(screen.getByText("Updated Title")).toBeInTheDocument();
      expect(screen.getByText("Updated Description")).toBeInTheDocument();

      // Verify structure is maintained
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      // CTA only renders when title, date, and description all exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("handles edge case with minimal article data", () => {
      const minimalArticle = {
        slug: "minimal",
        title: "Minimal Title",
        description: "Minimal Description",
        date: "",
      };

      render(<Article article={minimalArticle} />);

      // Component should still render
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByText("Minimal Title")).toBeInTheDocument();
      expect(screen.getByText("Minimal Description")).toBeInTheDocument();

      // CTA should not render when date is invalid/empty
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles article with tags array", () => {
      const articleWithTags = {
        ...mockArticle,
        tags: ["react", "typescript", "testing"],
      };

      render(<Article article={articleWithTags} />);

      // Component should render correctly
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("maintains accessibility structure across all sub-components", () => {
      render(<Article article={mockArticle} />);

      // Verify Card element (div by default)
      const card = screen.getByTestId("mock-card");
      expect(card).toBeInTheDocument();
      expect(card.tagName).toBe("DIV");
      expect(card).toHaveAttribute("aria-labelledby");
      expect(card).toHaveAttribute("aria-describedby");

      // Verify heading structure (SEO: proper heading hierarchy)
      const heading = screen.getByTestId("mock-card-title");
      expect(heading.tagName).toBe("H2");

      // Verify time element (SEO: proper date/time semantics)
      const time = screen.getByTestId("mock-card-eyebrow");
      expect(time.tagName).toBe("TIME");
      expect(time).toHaveAttribute("dateTime");
      expect(time).toHaveAttribute("aria-label");
    });
  });

  describe("Article with Custom Props Integration", () => {
    it("integrates custom props with article rendering", () => {
      render(
        <Article<{ "data-analytics": string }>
          article={mockArticle}
          data-analytics="article-view"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "article-view");
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    });

    it("integrates custom props with ARIA attributes", () => {
      render(
        <Article<{ "data-aria-custom": string }>
          article={mockArticle}
          data-aria-custom="aria-integration"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "data-aria-custom",
        "aria-integration"
      );
      expect(articleElement).toHaveAttribute("aria-labelledby");
    });

    it("handles multiple custom props with article updates", () => {
      const { rerender } = render(
        <Article<{
          "data-analytics": string;
          "data-tracking": string;
          "data-context": string;
        }>
          article={mockArticle}
          data-analytics="click-event"
          data-tracking="user-action"
          data-context="main-page"
        />
      );

      let articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "click-event");
      expect(articleElement).toHaveAttribute("data-tracking", "user-action");
      expect(articleElement).toHaveAttribute("data-context", "main-page");

      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(
        <Article<{
          "data-analytics": string;
          "data-tracking": string;
          "data-context": string;
        }>
          article={updatedArticle}
          data-analytics="updated-event"
          data-tracking="updated-action"
          data-context="updated-page"
        />
      );

      articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "updated-event");
      expect(articleElement).toHaveAttribute("data-tracking", "updated-action");
      expect(articleElement).toHaveAttribute("data-context", "updated-page");
    });

    it("preserves custom props when article data changes", () => {
      const { rerender } = render(
        <Article<{ "data-persist": string }>
          article={mockArticle}
          data-persist="persistent-value"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "data-persist",
        "persistent-value"
      );

      const updatedArticle = {
        ...mockArticle,
        title: "New Title",
        description: "New Description",
      };

      rerender(
        <Article<{ "data-persist": string }>
          article={updatedArticle}
          data-persist="persistent-value"
        />
      );

      const updatedElement = screen.getByTestId("mock-card");
      expect(updatedElement).toHaveAttribute(
        "data-persist",
        "persistent-value"
      );
      expect(screen.getByText("New Title")).toBeInTheDocument();
      expect(screen.getByText("New Description")).toBeInTheDocument();
    });

    it("works with custom props", () => {
      render(
        <Article<{ "data-custom": string }>
          article={mockArticle}
          data-custom="custom-value"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "custom-value");
    });

    it("integrates custom props with Card component structure", () => {
      render(
        <Article<{ "data-structure": string }>
          article={mockArticle}
          data-structure="card-integration"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute(
        "data-structure",
        "card-integration"
      );

      // Verify all subcomponents still render correctly
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });
  });
});
