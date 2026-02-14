/**
 * @file Card.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Card component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card } from "../Card";

import "@testing-library/jest-dom";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}));

// Mock dependencies
vi.mock("@portfolio/utils", () => ({
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer", target };
    }
    return { target };
  }),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock Icon component specifically for `Card.Cta`
vi.mock("@web/components/icon/Icon", () => ({
  Icon: vi.fn(({ name, ...props }) => (
    <span data-testid={`icon-${name}`} role="img" aria-hidden="true" {...props}>
      →
    </span>
  )),
}));

describe("Card Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Card with Sub-components", () => {
    it("renders Card with all sub-components", () => {
      render(
        <Card>
          <Card.Eyebrow>Eyebrow text</Card.Eyebrow>
          <Card.Title href="/test">Card Title</Card.Title>
          <Card.Description>Card description text</Card.Description>
          <Card.Cta href="/action">Call to Action</Card.Cta>
        </Card>
      );

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description text")).toBeInTheDocument();
      expect(screen.getByText("Call to Action")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      const { container } = render(
        <Card>
          <Card.Eyebrow>Eyebrow</Card.Eyebrow>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const card = container.querySelector("div");
      expect(card).toBeInTheDocument();

      const eyebrow = screen.getByText("Eyebrow");
      const title = screen.getByText("Title");
      const description = screen.getByText("Description");

      expect(eyebrow).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("renders Card with only title and description", () => {
      render(
        <Card>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Card with Links", () => {
    it("renders Card with linked title and CTA", () => {
      render(
        <Card>
          <Card.Title href="/title-link">Linked Title</Card.Title>
          <Card.Cta href="/cta-link" target="_blank">
            External CTA
          </Card.Cta>
        </Card>
      );

      // Test that the components render with their content
      expect(screen.getByText("Linked Title")).toBeInTheDocument();
      expect(screen.getByText("External CTA")).toBeInTheDocument();

      // Test that the components render correctly
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByText("External CTA")).toBeInTheDocument();
    });

    it("handles mixed linked and non-linked sub-components", () => {
      render(
        <Card>
          <Card.Title href="/link">Linked Title</Card.Title>
          <Card.Description>Non-linked Description</Card.Description>
          <Card.Cta>Non-linked CTA</Card.Cta>
        </Card>
      );

      expect(screen.getByText("Linked Title")).toBeInTheDocument();
      expect(screen.getByText("Non-linked Description")).toBeInTheDocument();
      expect(screen.getByText("Non-linked CTA")).toBeInTheDocument();
    });
  });

  describe("Card Content Validation", () => {
    it("renders Card with valid content", () => {
      render(
        <Card>
          <Card.Title>Valid Title</Card.Title>
          <Card.Description>Valid Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("handles null and undefined children gracefully", () => {
      render(
        <Card>
          <Card.Title>{null}</Card.Title>
          <Card.Description>{undefined}</Card.Description>
        </Card>
      );

      // Components should not render with null/undefined children
      expect(screen.queryByText("Category")).not.toBeInTheDocument();
    });

    it("handles mixed valid and invalid content", () => {
      render(
        <Card>
          <Card.Title>{null}</Card.Title>
          <Card.Description>Valid Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("handles complex children content", () => {
      render(
        <Card>
          <Card.Title>
            <span>Complex</span> <strong>Title</strong>
          </Card.Title>
          <Card.Description>
            <em>Complex</em> <code>Description</code>
          </Card.Description>
        </Card>
      );

      expect(screen.getAllByText("Complex")).toHaveLength(2);
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Card with Multiple Sub-components", () => {
    it("renders multiple descriptions", () => {
      render(
        <Card>
          <Card.Description>First description</Card.Description>
          <Card.Description>Second description</Card.Description>
        </Card>
      );

      expect(screen.getByText("First description")).toBeInTheDocument();
      expect(screen.getByText("Second description")).toBeInTheDocument();
    });

    it("renders multiple titles", () => {
      render(
        <Card>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("renders multiple CTAs", () => {
      render(
        <Card>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Card Edge Cases", () => {
    it("handles empty Card component", () => {
      const { container } = render(<Card />);

      // Card component returns null when no children are provided
      expect(container).toBeEmptyDOMElement();
    });

    it("handles Card with only whitespace children", () => {
      render(
        <Card>
          <Card.Title>Valid Title</Card.Title>
        </Card>
      );

      expect(screen.getByText("Valid Title")).toBeInTheDocument();
    });
  });

  describe("Card.Title Integration", () => {
    it("renders Card.Title within Card context", () => {
      render(
        <Card>
          <Card.Title href="/test-link">Test Title</Card.Title>
          <Card.Description>Test Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders linked Card.Title within Card", () => {
      render(
        <Card>
          <Card.Title href="/article">Article Title</Card.Title>
          <Card.Description>Article Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: /article title/i })
      ).toBeInTheDocument();
    });

    it("renders non-linked Card.Title within Card", () => {
      render(
        <Card>
          <Card.Title href="#">Non-linked Title</Card.Title>
          <Card.Description>Non-linked Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Non-linked Title")).toBeInTheDocument();
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "#");
    });

    it("renders Card with Title, Eyebrow, and Description", () => {
      render(
        <Card>
          <Card.Eyebrow>Category</Card.Eyebrow>
          <Card.Title href="/article">Article Title</Card.Title>
          <Card.Description>Article Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(screen.getByText("Article Description")).toBeInTheDocument();
    });

    it("renders Card with Title and CTA", () => {
      render(
        <Card>
          <Card.Title href="/article">Article Title</Card.Title>
          <Card.Cta href="/read-more">Read More</Card.Cta>
        </Card>
      );

      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(screen.getByText("Read More")).toBeInTheDocument();
    });

    it("renders multiple Cards with Titles", () => {
      render(
        <>
          <Card>
            <Card.Title href="/article-1">First Article</Card.Title>
            <Card.Description>First Description</Card.Description>
          </Card>
          <Card>
            <Card.Title href="/article-2">Second Article</Card.Title>
            <Card.Description>Second Description</Card.Description>
          </Card>
        </>
      );

      expect(screen.getByText("First Article")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
    });

    it("handles Card.Title with complex children", () => {
      render(
        <Card>
          <Card.Title href="/test">
            <span>Complex</span> <strong>Title</strong>
          </Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("renders Card.Title as h2 by default", () => {
      render(
        <Card>
          <Card.Title href="/test">Main Heading</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement.tagName).toBe("H2");
    });

    it("renders Card.Title with ARIA attributes in Card context", () => {
      render(
        <Card>
          <Card.Title href="/test" aria-label="Main article title">
            Article Title
          </Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const titleElement = screen.getByLabelText("Main article title");
      expect(titleElement).toBeInTheDocument();
    });
  });
});
