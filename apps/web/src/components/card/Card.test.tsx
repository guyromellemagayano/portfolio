import React from "react";

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode || false,
  })),
  setDisplayName: vi.fn((component, name) => {
    component.displayName = name;
    return component;
  }),
}));

// Mock @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => ({
  Article: vi.fn(({ children, ...props }) => (
    <article data-testid="article" {...props}>
      {children}
    </article>
  )),
  Heading: vi.fn(({ children, ...props }) => (
    <h2 data-testid="heading" {...props}>
      {children}
    </h2>
  )),
  P: vi.fn(({ children, ...props }) => (
    <p data-testid="paragraph" {...props}>
      {children}
    </p>
  )),
  Div: vi.fn(({ children, ...props }) => (
    <div data-testid="div" {...props}>
      {children}
    </div>
  )),
  Span: vi.fn(({ children, ...props }) => (
    <span data-testid="span" {...props}>
      {children}
    </span>
  )),
  Time: vi.fn(({ children, ...props }) => (
    <time data-testid="time" {...props}>
      {children}
    </time>
  )),
  Svg: vi.fn(({ children, ...props }) => (
    <svg data-testid="svg" {...props}>
      {children}
    </svg>
  )),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => (
    <a data-testid="link" {...props}>
      {children}
    </a>
  )),
}));

// Mock consolidated CSS module
vi.mock("./Card.module.css", () => ({
  default: {
    card: "card-class",
    cardTitle: "card-title-class",
    cardLinkHeading: "card-link-heading-class",
    cardLinkBackground: "card-link-background-class",
    cardLinkClickableArea: "card-link-clickable-area-class",
    cardLinkContent: "card-link-content-class",
    cardDescription: "card-description-class",
    cardCtaContainer: "card-cta-container-class",
    cardCtaLink: "card-cta-link-class",
    cardCtaIcon: "card-cta-icon-class",
    cardEyebrow: "card-eyebrow-class",
    cardEyebrowDecorated: "card-eyebrow-decorated-class",
    cardEyebrowDecoratorWrapper: "card-eyebrow-decorator-wrapper-class",
    cardEyebrowDecorator: "card-eyebrow-decorator-class",
  },
}));

// Mock ChevronRightIcon
vi.mock("@web/components/card", async () => {
  const actual = await vi.importActual("@web/components/card");
  return {
    ...actual,
    ChevronRightIcon: vi.fn(({ className, ...props }) => (
      <svg data-testid="chevron-right-icon" className={className} {...props}>
        <path d="M9 18l6-6-6-6" />
      </svg>
    )),
  };
});

import { Card } from "@web/components/card";

describe("Card Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Main Card Component", () => {
    it("renders children inside card", () => {
      render(
        <Card>
          <span data-testid="card-child">Card content</span>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      const child = screen.getByTestId("card-child");

      expect(card).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Card content");
    });

    it("applies className and other props", () => {
      render(
        <Card className="custom-class" id="test-id">
          <span>Content</span>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      expect(card).toHaveClass("custom-class");
      expect(card).toHaveAttribute("id", "test-id");
    });

    it("forwards ref to card", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Card ref={ref}>
          <span>Content</span>
        </Card>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("ARTICLE");
    });

    it("includes debug attributes when debug mode is enabled", () => {
      render(
        <Card _debugMode={true}>
          <span>Content</span>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      expect(card).toHaveAttribute("data-card-id", "test-id");
      expect(card).toHaveAttribute("data-debug-mode", "true");
    });

    it("uses custom internal ID when provided", () => {
      render(
        <Card _internalId="custom-card-id">
          <span>Content</span>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      expect(card).toHaveAttribute("data-card-id", "custom-card-id");
    });

    it("renders with proper structure", () => {
      render(
        <Card>
          <span>Content</span>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      expect(card).toHaveClass("group relative flex flex-col items-start");
    });
  });

  describe("CardTitle Component", () => {
    it("renders title without link", () => {
      render(<Card.Title>Card Title</Card.Title>);

      const title = screen.getByTestId("card-title-root");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Card Title");
    });

    it("renders title with link", () => {
      render(
        <Card.Title href="/test-link" target="_blank">
          Card Title
        </Card.Title>
      );

      const title = screen.getByTestId("card-title-root");
      const link = screen.getByTestId("link");

      expect(title).toBeInTheDocument();
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test-link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("applies className and other props", () => {
      render(
        <Card.Title className="title-class" id="title-id">
          Card Title
        </Card.Title>
      );

      const title = screen.getByTestId("card-title-root");
      expect(title).toHaveClass("title-class");
      expect(title).toHaveAttribute("id", "title-id");
    });

    it("includes debug attributes when debug mode is enabled", () => {
      render(<Card.Title _debugMode={true}>Card Title</Card.Title>);

      const title = screen.getByTestId("card-title-root");
      expect(title).toHaveAttribute("data-card-title-id", "test-id");
      expect(title).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render when no children and no href", () => {
      const { container } = render(<Card.Title />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("CardLink Component", () => {
    it("renders link with content", () => {
      render(<Card.Link href="/test-link">Link Content</Card.Link>);

      const link = screen.getByTestId("card-link-root");
      const anchor = screen.getByTestId("link");

      expect(link).toBeInTheDocument();
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", "/test-link");
      expect(anchor).toHaveTextContent("Link Content");
    });

    it("renders without link when no href", () => {
      render(<Card.Link href="">Link Content</Card.Link>);

      const link = screen.getByTestId("card-link-root");
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("Link Content");

      // Should not have an anchor tag when href is empty
      expect(screen.queryByTestId("link")).not.toBeInTheDocument();
    });

    it("applies className and other props", () => {
      render(
        <Card.Link className="link-class" id="link-id" href="/test">
          Link Content
        </Card.Link>
      );

      const link = screen.getByTestId("card-link-root");
      expect(link).toHaveClass("link-class");
      expect(link).toHaveAttribute("id", "link-id");
    });

    it("includes debug attributes when debug mode is enabled", () => {
      render(
        <Card.Link _debugMode={true} href="/test">
          Link Content
        </Card.Link>
      );

      const link = screen.getByTestId("card-link-root");
      expect(link).toHaveAttribute("data-card-link-id", "test-id");
      expect(link).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render when no children and no href", () => {
      const { container } = render(<Card.Link />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("CardDescription Component", () => {
    it("renders description content", () => {
      render(<Card.Description>Card description text</Card.Description>);

      const description = screen.getByTestId("card-description-root");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("Card description text");
    });

    it("applies className and other props", () => {
      render(
        <Card.Description className="desc-class" id="desc-id">
          Description
        </Card.Description>
      );

      const description = screen.getByTestId("card-description-root");
      expect(description).toHaveClass("desc-class");
      expect(description).toHaveAttribute("id", "desc-id");
    });

    it("includes debug attributes when debug mode is enabled", () => {
      render(
        <Card.Description _debugMode={true}>Description</Card.Description>
      );

      const description = screen.getByTestId("card-description-root");
      expect(description).toHaveAttribute(
        "data-card-description-id",
        "test-id"
      );
      expect(description).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render when no children", () => {
      const { container } = render(<Card.Description />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("CardCta Component", () => {
    it("renders CTA with link", () => {
      render(<Card.Cta href="/cta-link">Call to Action</Card.Cta>);

      const cta = screen.getByTestId("card-cta-root");
      const link = screen.getByTestId("link");
      const icon = screen.getByTestId("svg");

      expect(cta).toBeInTheDocument();
      expect(link).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/cta-link");
      expect(link).toHaveTextContent("Call to Action");
    });

    it("renders CTA without link", () => {
      render(<Card.Cta>Call to Action</Card.Cta>);

      const cta = screen.getByTestId("card-cta-root");
      expect(cta).toBeInTheDocument();
      expect(cta).toHaveTextContent("Call to Action");

      // Should not have link or icon
      expect(screen.queryByTestId("link")).not.toBeInTheDocument();
      expect(screen.queryByTestId("svg")).not.toBeInTheDocument();
    });

    it("applies className and other props", () => {
      render(
        <Card.Cta className="cta-class" id="cta-id" href="/test">
          CTA
        </Card.Cta>
      );

      const cta = screen.getByTestId("card-cta-root");
      expect(cta).toHaveClass("cta-class");
      expect(cta).toHaveAttribute("id", "cta-id");
    });

    it("includes debug attributes when debug mode is enabled", () => {
      render(
        <Card.Cta _debugMode={true} href="/test">
          CTA
        </Card.Cta>
      );

      const cta = screen.getByTestId("card-cta-root");
      expect(cta).toHaveAttribute("data-card-cta-id", "test-id");
      expect(cta).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render when no children and no href", () => {
      const { container } = render(<Card.Cta />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("CardEyebrow Component", () => {
    it("renders eyebrow content", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toBeInTheDocument();
      expect(eyebrow).toHaveTextContent("Eyebrow text");
    });

    it("renders with decoration when decorate is true", () => {
      render(<Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toBeInTheDocument();
      expect(eyebrow).toHaveClass("card-eyebrow-decorated-class");
    });

    it("applies className and other props", () => {
      render(
        <Card.Eyebrow className="eyebrow-class" id="eyebrow-id">
          Eyebrow
        </Card.Eyebrow>
      );

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveClass("eyebrow-class");
      expect(eyebrow).toHaveAttribute("id", "eyebrow-id");
    });

    it("includes debug attributes when debug mode is enabled", () => {
      render(<Card.Eyebrow _debugMode={true}>Eyebrow</Card.Eyebrow>);

      const eyebrow = screen.getByTestId("card-eyebrow-root");
      expect(eyebrow).toHaveAttribute("data-card-eyebrow-id", "test-id");
      expect(eyebrow).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render when no children", () => {
      const { container } = render(<Card.Eyebrow />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Integration Tests", () => {
    it("composes all card components together", () => {
      render(
        <Card>
          <Card.Eyebrow decorate>January 2024</Card.Eyebrow>
          <Card.Title href="/article">Article Title</Card.Title>
          <Card.Description>Article description goes here</Card.Description>
          <Card.Cta href="/article">Read more</Card.Cta>
        </Card>
      );

      expect(screen.getByTestId("card-root")).toBeInTheDocument();
      expect(screen.getByTestId("card-eyebrow-root")).toBeInTheDocument();
      expect(screen.getByTestId("card-title-root")).toBeInTheDocument();
      expect(screen.getByTestId("card-description-root")).toBeInTheDocument();
      expect(screen.getByTestId("card-cta-root")).toBeInTheDocument();
    });

    it("handles complex nested content", () => {
      render(
        <Card>
          <Card.Title>
            <span>Complex</span> <strong>Title</strong>
          </Card.Title>
          <Card.Description>
            <em>Italic</em> and <strong>bold</strong> text
          </Card.Description>
        </Card>
      );

      const title = screen.getByTestId("card-title-root");
      const description = screen.getByTestId("card-description-root");

      expect(title).toHaveTextContent("Complex Title");
      expect(description).toHaveTextContent("Italic and bold text");
    });

    it("supports multiple children", () => {
      render(
        <Card>
          <Card.Eyebrow>Date</Card.Eyebrow>
          <Card.Title>Title 1</Card.Title>
          <Card.Title>Title 2</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const titles = screen.getAllByTestId("card-title-root");
      expect(titles).toHaveLength(2);
    });
  });

  describe("Error Handling", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(<Card>{undefined}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles boolean children gracefully", () => {
      const { container } = render(<Card>{true}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles number children gracefully", () => {
      const { container } = render(<Card>{42}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders semantic HTML structure", () => {
      render(
        <Card>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      const title = screen.getByTestId("card-title-root");
      const description = screen.getByTestId("card-description-root");

      expect(card.tagName).toBe("ARTICLE");
      expect(title.tagName).toBe("H2");
      expect(description.tagName).toBe("P");
    });

    it("preserves ARIA attributes", () => {
      render(
        <Card aria-label="Card container" role="article">
          <Card.Title aria-label="Card title">Title</Card.Title>
        </Card>
      );

      const card = screen.getByTestId("card-root");
      const title = screen.getByTestId("card-title-root");

      expect(card).toHaveAttribute("aria-label", "Card container");
      expect(card).toHaveAttribute("role", "article");
      expect(title).toHaveAttribute("aria-label", "Card title");
    });
  });

  describe("CSS Module Integration", () => {
    it("applies CSS module classes", () => {
      render(
        <Card>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const title = screen.getByTestId("card-title-root");
      const description = screen.getByTestId("card-description-root");

      expect(title).toHaveClass("card-title-class");
      expect(description).toHaveClass("card-description-class");
    });

    it("combines CSS module classes with custom classes", () => {
      render(<Card.Title className="custom-title-class">Title</Card.Title>);

      const title = screen.getByTestId("card-title-root");
      expect(title).toHaveClass("card-title-class");
      expect(title).toHaveClass("custom-title-class");
    });
  });

  describe("Performance", () => {
    it("handles many card components efficiently", () => {
      const cards = Array.from({ length: 10 }, (_, i) => (
        <Card key={i}>
          <Card.Title>Title {i}</Card.Title>
          <Card.Description>Description {i}</Card.Description>
        </Card>
      ));

      const startTime = performance.now();
      render(<div>{cards}</div>);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time
      expect(duration).toBeLessThan(1000); // 1 second
    });
  });
});
