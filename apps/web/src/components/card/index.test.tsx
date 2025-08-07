import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Card, type CardProps } from "./index";

import "@testing-library/jest-dom";

// Mock Next.js Link component
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <a ref={ref} data-testid="mock-link" {...props} />
  ));
  MockLink.displayName = "MockLink";
  return { default: MockLink };
});

// Mock the components from @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => {
  const MockArticle = React.forwardRef<HTMLElement, any>((props, ref) => (
    <article ref={ref} data-testid="mock-article" {...props} />
  ));
  MockArticle.displayName = "MockArticle";

  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  MockDiv.displayName = "MockDiv";

  const MockHeading = React.forwardRef<HTMLHeadingElement, any>(
    (props, ref) => <h2 ref={ref} data-testid="mock-heading" {...props} />
  );
  MockHeading.displayName = "MockHeading";

  const MockP = React.forwardRef<HTMLParagraphElement, any>((props, ref) => (
    <p ref={ref} data-testid="mock-p" {...props} />
  ));
  MockP.displayName = "MockP";

  const MockSpan = React.forwardRef<HTMLSpanElement, any>((props, ref) => (
    <span ref={ref} data-testid="mock-span" {...props} />
  ));
  MockSpan.displayName = "MockSpan";

  const MockSvg = React.forwardRef<SVGSVGElement, any>((props, ref) => (
    <svg ref={ref} data-testid="mock-svg" {...props} />
  ));
  MockSvg.displayName = "MockSvg";

  const MockTime = React.forwardRef<HTMLTimeElement, any>((props, ref) => (
    <time ref={ref} data-testid="mock-time" {...props} />
  ));
  MockTime.displayName = "MockTime";

  return {
    Article: MockArticle,
    Div: MockDiv,
    Heading: MockHeading,
    P: MockP,
    Span: MockSpan,
    Svg: MockSvg,
    Time: MockTime,
    SvgProps: {},
  };
});

// Mock the cn function
vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

describe("Card Component", () => {
  const defaultProps: CardProps = {
    children: <div data-testid="card-content">Card content here</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders the card with default article element", () => {
      render(<Card {...defaultProps} />);

      expect(screen.getByText("Card content here")).toBeInTheDocument();
      expect(screen.getByTestId("mock-article")).toBeInTheDocument();
    });

    it("renders children content", () => {
      render(<Card {...defaultProps} />);

      expect(screen.getByTestId("card-content")).toBeInTheDocument();
      expect(screen.getByText("Card content here")).toBeInTheDocument();
    });

    it("applies correct default classes", () => {
      render(<Card {...defaultProps} />);

      const article = screen.getByTestId("mock-article");
      expect(article).toHaveClass("group relative flex flex-col items-start");
    });
  });

  describe("Styling and Props", () => {
    it("merges custom className with default classes", () => {
      render(<Card {...defaultProps} className="custom-class" />);

      const article = screen.getByTestId("mock-article");
      expect(article).toHaveClass(
        "custom-class group relative flex flex-col items-start"
      );
    });

    it("forwards additional props to the rendered element", () => {
      render(
        <Card
          {...defaultProps}
          id="test-card"
          data-testid="custom-card"
          aria-label="Test card"
        />
      );

      const card = screen.getByTestId("custom-card");
      expect(card).toHaveAttribute("id", "test-card");
      expect(card).toHaveAttribute("data-testid", "custom-card");
      expect(card).toHaveAttribute("aria-label", "Test card");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all props except 'as' and 'className'", () => {
      render(
        <Card
          {...defaultProps}
          id="test-id"
          data-custom="test-value"
          aria-describedby="description"
        />
      );

      const article = screen.getByTestId("mock-article");
      expect(article).toHaveAttribute("id", "test-id");
      expect(article).toHaveAttribute("data-custom", "test-value");
      expect(article).toHaveAttribute("aria-describedby", "description");
    });

    it("handles empty children", () => {
      render(<Card>{null}</Card>);

      expect(screen.queryByTestId("card-content")).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-article")).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Card>{undefined}</Card>);

      expect(screen.queryByTestId("card-content")).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-article")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children structure", () => {
      const complexChildren = (
        <div>
          <h2>Card Title</h2>
          <p>Card description</p>
          <button>Action</button>
        </div>
      );

      render(<Card>{complexChildren}</Card>);

      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      const multipleChildren = (
        <>
          <div data-testid="child-1">First child</div>
          <div data-testid="child-2">Second child</div>
          <div data-testid="child-3">Third child</div>
        </>
      );

      render(<Card>{multipleChildren}</Card>);

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });
  });

  describe("Component Display Name", () => {
    it("has correct display name", () => {
      expect(Card.displayName).toBe("Card");
    });
  });

  describe("Semantic HTML", () => {
    it("renders as an article element", () => {
      render(<Card {...defaultProps} />);

      expect(screen.getByTestId("mock-article")).toBeInTheDocument();
    });
  });

  describe("Card.Link Component", () => {
    describe("Basic Rendering", () => {
      it("renders with default props", () => {
        render(<Card.Link href="/test">Link content</Card.Link>);

        expect(screen.getByText("Link content")).toBeInTheDocument();
        expect(screen.getByTestId("mock-link")).toBeInTheDocument();
      });

      it("applies hover effect background", () => {
        render(<Card.Link href="/test">Link content</Card.Link>);

        expect(screen.getByTestId("mock-div")).toHaveClass(
          "absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"
        );
      });

      it("renders without href when not provided", () => {
        render(<Card.Link href="/test">Link content</Card.Link>);

        expect(screen.getByText("Link content")).toBeInTheDocument();
        expect(screen.getByTestId("mock-link")).toBeInTheDocument();
      });

      it("renders background div even when no children", () => {
        const { container } = render(<Card.Link href="/test" />);
        expect(container.firstChild).not.toBeNull();
        expect(screen.getByTestId("mock-div")).toBeInTheDocument();
      });
    });

    describe("Link Props", () => {
      it("forwards href, target, and title props", () => {
        render(
          <Card.Link href="/test" target="_blank" title="Test link">
            Link content
          </Card.Link>
        );

        const link = screen.getByTestId("mock-link");
        expect(link).toHaveAttribute("href", "/test");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("title", "Test link");
      });

      it("uses default values when not provided", () => {
        render(<Card.Link href="/test">Link content</Card.Link>);

        const link = screen.getByTestId("mock-link");
        expect(link).toHaveAttribute("href", "/test");
        expect(link).toHaveAttribute("target", "_self");
        expect(link).toHaveAttribute("title", "");
      });
    });

    describe("Accessibility", () => {
      it("provides proper focus area", () => {
        render(<Card.Link href="/test">Link content</Card.Link>);

        const spans = screen.getAllByTestId("mock-span");
        expect(spans[0]).toHaveClass(
          "absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"
        );
      });

      it("wraps content in relative z-10 span", () => {
        render(<Card.Link href="/test">Link content</Card.Link>);

        const contentSpan = screen.getAllByTestId("mock-span")[1];
        expect(contentSpan).toHaveClass("relative z-10");
        expect(contentSpan).toHaveTextContent("Link content");
      });
    });
  });

  describe("Card.Title Component", () => {
    describe("Basic Rendering", () => {
      it("renders as h2 element", () => {
        render(<Card.Title href="/test">Card Title</Card.Title>);

        expect(screen.getByTestId("mock-heading")).toBeInTheDocument();
        expect(screen.getByText("Card Title")).toBeInTheDocument();
      });

      it("applies correct default classes", () => {
        render(<Card.Title href="/test">Card Title</Card.Title>);

        const heading = screen.getByTestId("mock-heading");
        expect(heading).toHaveClass(
          "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
        );
      });

      it("renders heading even when no children", () => {
        const { container } = render(<Card.Title href="/test" />);
        expect(container.firstChild).not.toBeNull();
        expect(screen.getByTestId("mock-heading")).toBeInTheDocument();
      });
    });

    describe("Link Integration", () => {
      it("wraps content in Card.Link when href is provided", () => {
        render(<Card.Title href="/test">Card Title</Card.Title>);

        expect(screen.getByTestId("mock-link")).toBeInTheDocument();
        expect(screen.getByText("Card Title")).toBeInTheDocument();
      });

      it("forwards link props correctly", () => {
        render(
          <Card.Title href="/test" target="_blank" title="Test title">
            Card Title
          </Card.Title>
        );

        const link = screen.getByTestId("mock-link");
        expect(link).toHaveAttribute("href", "/test");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("title", "Test title");
      });

      it("renders with link when href is provided", () => {
        render(<Card.Title href="/test">Card Title</Card.Title>);

        expect(screen.getByTestId("mock-link")).toBeInTheDocument();
        expect(screen.getByText("Card Title")).toBeInTheDocument();
      });
    });

    describe("Props Forwarding", () => {
      it("forwards additional props to heading", () => {
        render(
          <Card.Title href="/test" id="test-title" data-testid="custom-title">
            Card Title
          </Card.Title>
        );

        const heading = screen.getByTestId("custom-title");
        expect(heading).toHaveAttribute("id", "test-title");
      });
    });
  });

  describe("Card.Description Component", () => {
    describe("Basic Rendering", () => {
      it("renders as p element", () => {
        render(<Card.Description>Card description</Card.Description>);

        expect(screen.getByTestId("mock-p")).toBeInTheDocument();
        expect(screen.getByText("Card description")).toBeInTheDocument();
      });

      it("applies correct default classes", () => {
        render(<Card.Description>Card description</Card.Description>);

        const paragraph = screen.getByTestId("mock-p");
        expect(paragraph).toHaveClass(
          "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400"
        );
      });

      it("returns null when no children", () => {
        const { container } = render(<Card.Description />);
        expect(container.firstChild).toBeNull();
      });
    });

    describe("Props Forwarding", () => {
      it("forwards additional props to paragraph", () => {
        render(
          <Card.Description id="test-desc" data-testid="custom-desc">
            Card description
          </Card.Description>
        );

        const paragraph = screen.getByTestId("custom-desc");
        expect(paragraph).toHaveAttribute("id", "test-desc");
      });
    });
  });

  describe("Card.Cta Component", () => {
    describe("Basic Rendering", () => {
      it("renders as div element", () => {
        render(<Card.Cta href="/test">Call to action</Card.Cta>);

        expect(screen.getByTestId("mock-div")).toBeInTheDocument();
        expect(screen.getByText("Call to action")).toBeInTheDocument();
      });

      it("applies correct default classes", () => {
        render(<Card.Cta href="/test">Call to action</Card.Cta>);

        const div = screen.getByTestId("mock-div");
        expect(div).toHaveClass(
          "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500"
        );
      });

      it("has aria-hidden attribute", () => {
        render(<Card.Cta href="/test">Call to action</Card.Cta>);

        const div = screen.getByTestId("mock-div");
        expect(div).toHaveAttribute("aria-hidden", "true");
      });
    });

    describe("Link Integration", () => {
      it("wraps content in Link when href is provided", () => {
        render(<Card.Cta href="/test">Call to action</Card.Cta>);

        expect(screen.getByTestId("mock-link")).toBeInTheDocument();
        expect(screen.getByText("Call to action")).toBeInTheDocument();
      });

      it("includes chevron icon when href is provided", () => {
        render(<Card.Cta href="/test">Call to action</Card.Cta>);

        expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
      });

      it("forwards link props correctly", () => {
        render(
          <Card.Cta href="/test" target="_blank" title="Test CTA">
            Call to action
          </Card.Cta>
        );

        const link = screen.getByTestId("mock-link");
        expect(link).toHaveAttribute("href", "/test");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("title", "Test CTA");
      });

      it("renders with link when href is provided", () => {
        render(<Card.Cta href="/test">Call to action</Card.Cta>);

        expect(screen.getByTestId("mock-link")).toBeInTheDocument();
        expect(screen.getByTestId("mock-svg")).toBeInTheDocument();
      });
    });

    describe("Props Forwarding", () => {
      it("forwards additional props to div", () => {
        render(
          <Card.Cta href="/test" id="test-cta" data-testid="custom-cta">
            Call to action
          </Card.Cta>
        );

        const div = screen.getByTestId("custom-cta");
        expect(div).toHaveAttribute("id", "test-cta");
      });
    });
  });

  describe("Card.Eyebrow Component", () => {
    describe("Basic Rendering", () => {
      it("renders as time element", () => {
        render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

        expect(screen.getByTestId("mock-time")).toBeInTheDocument();
        expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
      });

      it("applies correct default classes", () => {
        render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

        const timeElement = screen.getByTestId("mock-time");
        expect(timeElement).toHaveClass(
          "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
        );
      });
    });

    describe("Decoration", () => {
      it("adds decoration when decorate prop is true", () => {
        render(<Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>);

        const timeElement = screen.getByTestId("mock-time");
        expect(timeElement).toHaveClass("pl-3.5");
        const spans = screen.getAllByTestId("mock-span");
        expect(spans[0]).toHaveClass(
          "absolute inset-y-0 left-0 flex items-center"
        );
      });

      it("does not add decoration when decorate prop is false", () => {
        render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

        const timeElement = screen.getByTestId("mock-time");
        expect(timeElement).not.toHaveClass("pl-3.5");
      });

      it("renders decoration line when decorate is true", () => {
        render(<Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>);

        const decorationSpan = screen.getAllByTestId("mock-span")[1];
        expect(decorationSpan).toHaveClass(
          "h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
        );
      });
    });

    describe("Props Forwarding", () => {
      it("forwards additional props to time element", () => {
        render(
          <Card.Eyebrow id="test-eyebrow" data-testid="custom-eyebrow">
            Eyebrow text
          </Card.Eyebrow>
        );

        const timeElement = screen.getByTestId("custom-eyebrow");
        expect(timeElement).toHaveAttribute("id", "test-eyebrow");
      });
    });
  });

  describe("Component Integration", () => {
    it("renders all sub-components together", () => {
      render(
        <Card>
          <Card.Eyebrow>Category</Card.Eyebrow>
          <Card.Title href="/test">Card Title</Card.Title>
          <Card.Description>Card description</Card.Description>
          <Card.Cta href="/test">Read more</Card.Cta>
        </Card>
      );

      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description")).toBeInTheDocument();
      expect(screen.getByText("Read more")).toBeInTheDocument();
    });

    it("handles complex nested structure", () => {
      render(
        <Card>
          <Card.Eyebrow decorate>Featured</Card.Eyebrow>
          <Card.Title href="/article" target="_blank" title="Read article">
            Article Title
          </Card.Title>
          <Card.Description>
            This is a comprehensive description of the article content.
          </Card.Description>
          <Card.Cta href="/article" target="_blank">
            Continue reading
          </Card.Cta>
        </Card>
      );

      expect(screen.getByText("Featured")).toBeInTheDocument();
      expect(screen.getByText("Article Title")).toBeInTheDocument();
      expect(
        screen.getByText(
          "This is a comprehensive description of the article content."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Continue reading")).toBeInTheDocument();
    });
  });

  describe("Display Names", () => {
    it("has correct display names for all components", () => {
      expect(Card.displayName).toBe("Card");
      expect(Card.Link.displayName).toBe("CardLink");
      expect(Card.Title.displayName).toBe("CardTitle");
      expect(Card.Description.displayName).toBe("CardDescription");
      expect(Card.Cta.displayName).toBe("CardCta");
      expect(Card.Eyebrow.displayName).toBe("CardEyebrow");
    });
  });
});
