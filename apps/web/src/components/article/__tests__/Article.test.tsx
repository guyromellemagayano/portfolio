/**
 * @file Article.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Article component.
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

// Mock Card component
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

describe("Article", () => {
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

  describe("Basic Rendering", () => {
    it("renders article correctly", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("renders as div element (Card default)", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(<Article article={mockArticle} className="custom-class" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(<Article article={mockArticle} data-custom="value" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Article Content", () => {
    it("renders article title as Card.Title with correct href", () => {
      render(<Article article={mockArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      // Title link should be inside the title element
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");
    });

    it("renders article description as Card.Description", () => {
      render(<Article article={mockArticle} />);

      expect(
        screen.getByText("This is a test article description")
      ).toBeInTheDocument();
    });

    it("renders formatted date as Card.Eyebrow with time element", () => {
      render(<Article article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement.tagName).toBe("TIME");
      expect(eyebrowElement).toHaveAttribute("dateTime", "2023-01-01");
    });

    it("renders CTA button with correct text when all required fields exist", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("does not render CTA when title is missing", () => {
      const articleWithoutTitle = {
        ...mockArticle,
        title: "",
      };
      render(<Article article={articleWithoutTitle} />);

      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("does not render CTA when date is missing", () => {
      const articleWithoutDate = {
        ...mockArticle,
        date: "",
      };
      render(<Article article={articleWithoutDate} />);

      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("does not render CTA when description is missing", () => {
      const articleWithoutDescription = {
        ...mockArticle,
        description: "",
      };
      render(<Article article={articleWithoutDescription} />);

      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });
  });

  describe("Content Rendering", () => {
    it("does not render with null article", () => {
      const { container } = render(<Article article={null as any} />);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render with undefined article", () => {
      const { container } = render(<Article article={undefined as any} />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with empty strings (trims and uses defaults)", () => {
      const articleWithEmptyStrings = {
        ...mockArticle,
        title: "",
        description: "",
        date: "",
      };
      render(<Article article={articleWithEmptyStrings} />);

      // Component renders but with empty/trimmed content
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("trims whitespace from title", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        title: "  Trimmed Title  ",
      };
      render(<Article article={articleWithWhitespace} />);

      expect(screen.getByText("Trimmed Title")).toBeInTheDocument();
    });

    it("trims whitespace from description", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        description: "  Trimmed Description  ",
      };
      render(<Article article={articleWithWhitespace} />);

      expect(screen.getByText("Trimmed Description")).toBeInTheDocument();
    });

    it("trims whitespace from slug", () => {
      const articleWithWhitespace = {
        ...mockArticle,
        slug: "  trimmed-slug  ",
      };
      render(<Article article={articleWithWhitespace} />);

      // Title link should have trimmed slug
      const titleElement = screen.getByTestId("mock-card-title");
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute("href", "/articles/trimmed-slug");
    });

    it("handles null/undefined title", () => {
      const articleWithNullTitle = {
        ...mockArticle,
        title: null as any,
      };
      render(<Article article={articleWithNullTitle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      // CTA should not render when title is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles null/undefined description", () => {
      const articleWithNullDescription = {
        ...mockArticle,
        description: null as any,
      };
      render(<Article article={articleWithNullDescription} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      // CTA should not render when description is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles null/undefined date", () => {
      const articleWithNullDate = {
        ...mockArticle,
        date: null as any,
      };
      render(<Article article={articleWithNullDate} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      // CTA should not render when date is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });

    it("handles invalid date (formatted date may be empty but CTA still renders)", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };
      render(<Article article={articleWithInvalidDate} />);

      // Component should still render
      expect(screen.getByTestId("mock-card")).toBeInTheDocument();

      // Eyebrow renders (date is present), but formatted date can be empty
      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute("dateTime", "invalid-date");
      expect(eyebrowElement).toBeEmptyDOMElement();

      // CTA renders because title + date (non-empty string) + description exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("creates href for title link when slug is valid", () => {
      render(<Article article={mockArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");
    });

    it("handles tags array", () => {
      const articleWithTags = {
        ...mockArticle,
        tags: ["tag1", "tag2", "  tag3  "],
      };
      render(<Article article={articleWithTags} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("handles empty tags array", () => {
      const articleWithEmptyTags = {
        ...mockArticle,
        tags: [],
      };
      render(<Article article={articleWithEmptyTags} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("handles missing image", () => {
      const articleWithoutImage = {
        ...mockArticle,
        image: undefined,
      };
      render(<Article article={articleWithoutImage} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with correct Card structure", () => {
      render(<Article article={mockArticle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-eyebrow")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      // CTA only renders when title, date, and description all exist
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("renders without CTA when title is missing", () => {
      const articleWithoutTitle = {
        ...mockArticle,
        title: "",
      };
      render(<Article article={articleWithoutTitle} />);

      expect(screen.getByTestId("mock-card")).toBeInTheDocument();
      expect(screen.queryByTestId("mock-card-cta")).not.toBeInTheDocument();
    });
  });

  describe("Internationalization", () => {
    it("uses translations for CTA text", () => {
      render(<Article article={mockArticle} />);

      expect(mockUseTranslations).toHaveBeenCalledWith("article");
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("uses translations for article date label", () => {
      render(<Article article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute(
        "aria-label",
        expect.stringContaining("Published on")
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles article with special characters in title", () => {
      const specialArticle = {
        ...mockArticle,
        title: "Special chars: <>&",
      };

      render(<Article article={specialArticle} />);

      expect(screen.getByText("Special chars: <>&")).toBeInTheDocument();
    });

    it("handles article with special characters in description", () => {
      const specialArticle = {
        ...mockArticle,
        description: "Description with <>&",
      };

      render(<Article article={specialArticle} />);

      expect(screen.getByText("Description with <>&")).toBeInTheDocument();
    });

    it("handles article with very long title", () => {
      const longTitle = "A".repeat(200);
      const longTitleArticle = {
        ...mockArticle,
        title: longTitle,
      };

      render(<Article article={longTitleArticle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles article with very long description", () => {
      const longDesc = "B".repeat(500);
      const longDescArticle = {
        ...mockArticle,
        description: longDesc,
      };

      render(<Article article={longDescArticle} />);

      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted date", () => {
      render(<Article article={mockArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toBeInTheDocument();
      expect(eyebrowElement).toHaveAttribute("dateTime", "2023-01-01");
    });

    it("handles different date formats", () => {
      const differentDateArticle = {
        ...mockArticle,
        date: "2023-12-25",
      };

      render(<Article article={differentDateArticle} />);

      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute("dateTime", "2023-12-25");
    });

    it("handles null date", () => {
      const articleWithNullDate = {
        ...mockArticle,
        date: null as any,
      };

      render(<Article article={articleWithNullDate} />);

      // Eyebrow should not render when date is null
      expect(screen.queryByTestId("mock-card-eyebrow")).not.toBeInTheDocument();
      // CTA should not render when date is missing
      expect(screen.queryByText("Read article")).not.toBeInTheDocument();
    });
  });

  describe("Article Slug Integration", () => {
    it("uses article slug for title link when slug is valid", () => {
      render(<Article article={mockArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");
    });

    it("creates href for title link when slug is valid regardless of date validity", () => {
      const articleWithInvalidDate = {
        ...mockArticle,
        date: "invalid-date",
      };

      render(<Article article={articleWithInvalidDate} />);

      // Title link should still be created if slug is valid
      const titleElement = screen.getByTestId("mock-card-title");
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute("href", "/articles/test-article");

      // CTA still renders when date is a non-empty string (even if formatting fails)
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
      expect(screen.getByText("Read article")).toBeInTheDocument();
    });

    it("handles different slug formats", () => {
      const differentSlugArticle = {
        ...mockArticle,
        slug: "different-article-slug",
      };

      render(<Article article={differentSlugArticle} />);

      const titleElement = screen.getByTestId("mock-card-title");
      const titleLink = titleElement.querySelector("a");
      expect(titleLink).toHaveAttribute(
        "href",
        "/articles/different-article-slug"
      );
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple props", () => {
      const complexArticle = {
        ...mockArticle,
        title: "Complex Article",
        description: "Complex description with lots of content",
      };

      render(<Article article={complexArticle} />);

      expect(screen.getByText("Complex Article")).toBeInTheDocument();
      expect(
        screen.getByText("Complex description with lots of content")
      ).toBeInTheDocument();
    });

    it("handles dynamic article updates efficiently", () => {
      const { rerender } = render(<Article article={mockArticle} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();

      const updatedArticle = {
        ...mockArticle,
        title: "Updated Article Title",
        description: "Updated description",
      };

      rerender(<Article article={updatedArticle} />);

      expect(screen.getByText("Updated Article Title")).toBeInTheDocument();
      expect(screen.getByText("Updated description")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
      expect(articleElement).toHaveAttribute("aria-labelledby");
      expect(articleElement).toHaveAttribute("aria-describedby");
    });

    it("supports aria attributes", () => {
      render(<Article article={mockArticle} data-custom="value" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "value");
    });

    it("renders as div element (Card default)", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement.tagName).toBe("DIV");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA relationships between elements", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");

      // The title should label the article (SEO: proper semantic structure)
      expect(articleElement).toHaveAttribute("aria-labelledby");

      // Article should be described by the description
      expect(articleElement).toHaveAttribute("aria-describedby");
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(<Article article={mockArticle} />);

      const articleElement = screen.getByTestId("mock-card");

      // Title should have unique ID (generated by useId)
      const titleElement = screen.getByTestId("mock-card-title");
      const titleId = titleElement.getAttribute("id");
      expect(titleId).toBeTruthy();
      // useId generates IDs like "_r_1e_-title" in test environment
      expect(titleId).toMatch(/-title$/);

      // Description should have unique ID
      const descriptionElement = screen.getByTestId("mock-card-description");
      const descriptionId = descriptionElement.getAttribute("id");
      expect(descriptionId).toBeTruthy();
      // useId generates IDs like "_r_1e_-description" in test environment
      expect(descriptionId).toMatch(/-description$/);

      // IDs should match ARIA relationships (SEO: proper semantic structure)
      expect(articleElement).toHaveAttribute("aria-labelledby", titleId);
      expect(articleElement).toHaveAttribute("aria-describedby", descriptionId);
    });

    it("applies correct ARIA labels to content elements", () => {
      render(<Article article={mockArticle} />);

      // Date element should have a descriptive label (SEO: proper time semantics)
      const eyebrowElement = screen.getByTestId("mock-card-eyebrow");
      expect(eyebrowElement).toHaveAttribute("aria-label");
      expect(eyebrowElement).toHaveAttribute("dateTime");
    });

    it("uses h2 heading for title (SEO: proper heading hierarchy)", () => {
      render(<Article article={mockArticle} />);

      // Title should be h2 (SEO: default heading level for card titles)
      const titleElement = screen.getByTestId("mock-card-title");
      expect(titleElement.tagName).toBe("H2");
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(<Article article={mockArticle} />);

      // Initial render
      const articleElement = screen.getByTestId("mock-card");
      const initialTitleId = articleElement.getAttribute("aria-labelledby");
      expect(initialTitleId).toBeTruthy();

      // Update with different article
      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(<Article article={updatedArticle} />);

      // ARIA attributes should still be present
      const updatedArticleElement = screen.getByTestId("mock-card");
      expect(updatedArticleElement).toHaveAttribute("aria-labelledby");
      expect(updatedArticleElement).toHaveAttribute("aria-describedby");
    });

    it("ensures proper semantic structure (SEO: proper heading hierarchy)", () => {
      render(<Article article={mockArticle} />);

      // Should have div element (Card default)
      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
      expect(articleElement.tagName).toBe("DIV");

      // Should have heading (SEO: proper heading hierarchy)
      const headingElement = screen.getByRole("heading", { level: 2 });
      expect(headingElement).toBeInTheDocument();
    });
  });

  describe("Custom Props Type Safety", () => {
    it("accepts and passes through custom string props", () => {
      render(<Article article={mockArticle} customProp="test-value" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("customProp", "test-value");
    });

    it("accepts and passes through custom data attributes", () => {
      render(<Article article={mockArticle} data-custom="custom-data" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-custom", "custom-data");
    });

    it("accepts multiple custom props", () => {
      render(<Article article={mockArticle} customProp="value" count={42} />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("customProp", "value");
      expect(articleElement).toHaveAttribute("count", "42");
    });

    it("works with custom props and standard Card props", () => {
      render(
        <Article
          article={mockArticle}
          data-analytics="article-view"
          className="custom-article"
        />
      );

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-analytics", "article-view");
      expect(articleElement).toHaveAttribute("class");
    });

    it("works with custom props", () => {
      render(<Article article={mockArticle} data-tracking="article-render" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-tracking", "article-render");
    });

    it("preserves custom props through component updates", () => {
      const { rerender } = render(
        <Article article={mockArticle} data-persist="initial" />
      );

      let articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-persist", "initial");

      const updatedArticle = { ...mockArticle, title: "Updated Title" };
      rerender(<Article article={updatedArticle} data-persist="updated" />);

      articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toHaveAttribute("data-persist", "updated");
    });

    it("allows custom props without explicit generic type", () => {
      // TypeScript should infer custom props from usage
      // Note: React converts non-standard prop names to lowercase in DOM
      render(<Article article={mockArticle} customProp="inferred-type" />);

      const articleElement = screen.getByTestId("mock-card");
      expect(articleElement).toBeInTheDocument();
      // React converts prop names to lowercase for non-standard attributes
      expect(articleElement).toHaveAttribute("customprop", "inferred-type");
    });
  });
});
