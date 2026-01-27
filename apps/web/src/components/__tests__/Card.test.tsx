/**
 * @file Card.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Card component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Card, MemoizedCard } from "../Card";

// Mock dependencies
vi.mock("@web/components/icon/Icon", () => ({
  Icon: vi.fn(({ name, ...props }) => (
    <span data-testid={`icon-${name}`} {...props}>
      →
    </span>
  )),
}));

vi.mock("@guyromellemagayano/utils", () => ({
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

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { href, target, title, rel, children, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href ?? ""}
          target={target}
          title={title}
          rel={rel}
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// ============================================================================
// CARD CTA COMPONENT TESTS
// ============================================================================

describe("Card.Cta", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      expect(screen.getByText("Call to action")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card.Cta className="custom-class">Call to action</Card.Cta>
      );

      const ctaElement = container.querySelector("div");
      expect(ctaElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Cta data-testid="custom-testid" aria-label="CTA">
          Call to action
        </Card.Cta>
      );

      const ctaElement = screen.getByTestId("custom-testid");
      expect(ctaElement).toBeInTheDocument();
      expect(ctaElement).toHaveAttribute("aria-label", "CTA");
    });
  });

  describe("Link Functionality", () => {
    it("renders CardLinkCustom when href is provided and valid", () => {
      render(<Card.Cta href="/test-link">Call to action</Card.Cta>);

      const link = screen.getByRole("link", { name: /call to action/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test-link");
      expect(screen.getByText("Call to action")).toBeInTheDocument();
      expect(screen.getByTestId("icon-chevron-right")).toBeInTheDocument();
    });

    it("renders children directly when href is invalid", () => {
      render(<Card.Cta href="#">Call to action</Card.Cta>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Call to action")).toBeInTheDocument();
      expect(
        screen.queryByTestId("icon-chevron-right")
      ).not.toBeInTheDocument();
    });

    it("renders children directly when href is not provided", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Call to action")).toBeInTheDocument();
      expect(
        screen.queryByTestId("icon-chevron-right")
      ).not.toBeInTheDocument();
    });

    it("renders CardLinkCustom with correct props when href is valid", () => {
      render(
        <Card.Cta href="/valid-link" target="_blank" title="Test title">
          Call to action
        </Card.Cta>
      );

      const link = screen.getByRole("link", { name: "Test title" });
      expect(link).toHaveAttribute("href", "/valid-link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
      expect(screen.getByTestId("icon-chevron-right")).toBeInTheDocument();
    });

    it("applies aria-hidden to decorative chevron icon", () => {
      render(<Card.Cta href="/test-link">Call to action</Card.Cta>);

      const icon = screen.getByTestId("icon-chevron-right");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Cta />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Cta>{null}</Card.Cta>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Cta>{""}</Card.Cta>);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with valid children", () => {
      render(<Card.Cta>Valid content</Card.Cta>);
      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as div element by default", () => {
      const { container } = render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = container.querySelector("div");
      expect(ctaElement).toBeInTheDocument();
      expect(ctaElement?.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      const { container } = render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = container.querySelector("div");
      expect(ctaElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "flex",
        "items-start",
        "text-sm",
        "font-medium",
        "text-amber-500"
      );
    });

    it("combines Tailwind + custom classes", () => {
      const { container } = render(
        <Card.Cta className="custom-class">Call to action</Card.Cta>
      );

      const ctaElement = container.querySelector("div");
      expect(ctaElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "flex",
        "items-start",
        "text-sm",
        "font-medium",
        "text-amber-500",
        "custom-class"
      );
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as div by default", () => {
      const { container } = render(<Card.Cta>Call to action</Card.Cta>);

      const ctaElement = container.querySelector("div");
      expect(ctaElement?.tagName).toBe("DIV");
    });

    it("renders as section when as prop is section", () => {
      const { container } = render(
        <Card.Cta as="section">Call to action</Card.Cta>
      );

      const ctaElement = container.querySelector("section");
      expect(ctaElement?.tagName).toBe("SECTION");
    });

    it("renders as article when as prop is article", () => {
      const { container } = render(
        <Card.Cta as="article">Call to action</Card.Cta>
      );

      const ctaElement = container.querySelector("article");
      expect(ctaElement?.tagName).toBe("ARTICLE");
    });

    it("renders as main when as prop is main", () => {
      const { container } = render(
        <Card.Cta as="main">Call to action</Card.Cta>
      );

      const ctaElement = container.querySelector("main");
      expect(ctaElement?.tagName).toBe("MAIN");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Cta>
          <span>Click</span> <strong>here</strong>
        </Card.Cta>
      );

      expect(screen.getByText("Click")).toBeInTheDocument();
      expect(screen.getByText("here")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Cta>Special chars: &lt;&gt;&amp;</Card.Cta>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      const { container } = render(<Card.Cta>{true}</Card.Cta>);
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Cta>{0}</Card.Cta>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Memoization", () => {
    it("Card.Cta renders correctly", () => {
      render(<Card.Cta>Call to action</Card.Cta>);

      expect(screen.getByText("Call to action")).toBeInTheDocument();
    });

    it("Card.Cta re-renders when props change", () => {
      const { rerender } = render(<Card.Cta>Initial content</Card.Cta>);

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(<Card.Cta>Updated content</Card.Cta>);

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD DESCRIPTION COMPONENT TESTS
// ============================================================================

describe("Card.Description", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Description>Card description</Card.Description>);

      expect(screen.getByText("Card description")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card.Description className="custom-class">
          Card description
        </Card.Description>
      );

      const descriptionElement = container.querySelector("p");
      expect(descriptionElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Description aria-label="Description">
          Card description
        </Card.Description>
      );

      const descriptionElement = screen.getByLabelText("Description");
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Description />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Description>{null}</Card.Description>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Description>{""}</Card.Description>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      const { container } = render(<Card.Description>{true}</Card.Description>);
      expect(container.querySelector("p")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Description>{0}</Card.Description>);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with valid children", () => {
      render(<Card.Description>Valid content</Card.Description>);
      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      const { container } = render(
        <Card.Description>Card description</Card.Description>
      );

      const descriptionElement = container.querySelector("p");
      expect(descriptionElement?.tagName).toBe("P");
    });

    it("applies correct CSS classes", () => {
      const { container } = render(
        <Card.Description>Card description</Card.Description>
      );

      const descriptionElement = container.querySelector("p");
      expect(descriptionElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "text-sm",
        "text-zinc-600",
        "dark:text-zinc-400"
      );
    });

    it("combines Tailwind + custom classes", () => {
      const { container } = render(
        <Card.Description className="custom-class">
          Card description
        </Card.Description>
      );

      const descriptionElement = container.querySelector("p");
      expect(descriptionElement).toHaveClass(
        "relative",
        "z-10",
        "mt-2",
        "text-sm",
        "text-zinc-600",
        "dark:text-zinc-400",
        "custom-class"
      );
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as p by default", () => {
      const { container } = render(
        <Card.Description>Card description</Card.Description>
      );

      const descriptionElement = container.querySelector("p");
      expect(descriptionElement?.tagName).toBe("P");
    });

    it("renders as div when as prop is div", () => {
      const { container } = render(
        <Card.Description as="div">Card description</Card.Description>
      );

      const descriptionElement = container.querySelector("div");
      expect(descriptionElement?.tagName).toBe("DIV");
    });

    it("renders as span when as prop is span", () => {
      const { container } = render(
        <Card.Description as="span">Card description</Card.Description>
      );

      const descriptionElement = container.querySelector("span");
      expect(descriptionElement?.tagName).toBe("SPAN");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Description>
          <strong>Bold</strong> and <em>italic</em> text
        </Card.Description>
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Description>Special chars: &lt;&gt;&amp;</Card.Description>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles multiple props together", () => {
      render(
        <Card.Description className="multi-class" aria-label="Multi prop test">
          Multi prop test
        </Card.Description>
      );

      const descriptionElement = screen.getByLabelText("Multi prop test");
      expect(descriptionElement).toHaveClass("multi-class");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD EYEBROW COMPONENT TESTS
// ============================================================================

describe("Card.Eyebrow", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card.Eyebrow className="custom-class">Eyebrow</Card.Eyebrow>
      );

      const eyebrow = container.querySelector("p");
      expect(eyebrow).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(<Card.Eyebrow aria-label="Eyebrow">Eyebrow text</Card.Eyebrow>);

      const eyebrow = screen.getByLabelText("Eyebrow");
      expect(eyebrow).toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Eyebrow />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Eyebrow>{null}</Card.Eyebrow>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Eyebrow>{""}</Card.Eyebrow>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      const { container } = render(<Card.Eyebrow>{true}</Card.Eyebrow>);
      // Boolean true is not rendered as text content in React
      expect(container.querySelector("p")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Eyebrow>{0}</Card.Eyebrow>);
      // Component returns null for falsy children like 0
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Memoization", () => {
    it("Card.Eyebrow renders correctly", () => {
      render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
    });

    it("Card.Eyebrow re-renders when props change", () => {
      const { rerender } = render(<Card.Eyebrow>Initial text</Card.Eyebrow>);

      expect(screen.getByText("Initial text")).toBeInTheDocument();

      // Re-render with different content
      rerender(<Card.Eyebrow>Updated text</Card.Eyebrow>);

      expect(screen.getByText("Updated text")).toBeInTheDocument();
      expect(screen.queryByText("Initial text")).not.toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      const { container } = render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = container.querySelector("p");
      expect(eyebrow?.tagName).toBe("P");
    });

    it("applies correct CSS classes", () => {
      const { container } = render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = container.querySelector("p");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500"
      );
    });

    it("combines Tailwind + custom classes", () => {
      const { container } = render(
        <Card.Eyebrow className="custom-class">Eyebrow</Card.Eyebrow>
      );

      const eyebrow = container.querySelector("p");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500",
        "custom-class"
      );
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as p by default", () => {
      const { container } = render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = container.querySelector("p");
      expect(eyebrow?.tagName).toBe("P");
    });

    it("renders as time when as prop is time", () => {
      const { container } = render(
        <Card.Eyebrow as="time">Eyebrow text</Card.Eyebrow>
      );

      const eyebrow = container.querySelector("time");
      expect(eyebrow?.tagName).toBe("TIME");
    });
  });

  describe("Decorative Styling", () => {
    it("renders with decoration when decorate is true", () => {
      const { container } = render(
        <Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>
      );

      const eyebrow = container.querySelector("p");
      expect(eyebrow).toHaveClass("pl-3.5");
    });

    it("does not apply decoration when decorate is false", () => {
      const { container } = render(
        <Card.Eyebrow decorate={false}>Eyebrow text</Card.Eyebrow>
      );

      const eyebrow = container.querySelector("p");
      expect(eyebrow).not.toHaveClass("pl-3.5");
    });

    it("does not apply decoration when decorate is undefined", () => {
      const { container } = render(<Card.Eyebrow>Eyebrow text</Card.Eyebrow>);

      const eyebrow = container.querySelector("p");
      expect(eyebrow).not.toHaveClass("pl-3.5");
    });

    it("renders decorative span when decorate is true", () => {
      const { container } = render(
        <Card.Eyebrow decorate>Eyebrow text</Card.Eyebrow>
      );

      const decorateSpan = container.querySelector('span[aria-hidden="true"]');
      expect(decorateSpan).toBeInTheDocument();
      expect(decorateSpan).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Eyebrow>
          <span>Featured</span> <strong>content</strong>
        </Card.Eyebrow>
      );

      expect(screen.getByText("Featured")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Eyebrow>Special chars: &lt;&gt;&amp;</Card.Eyebrow>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("combines decoration with custom className", () => {
      const { container } = render(
        <Card.Eyebrow decorate className="custom-class">
          Eyebrow text
        </Card.Eyebrow>
      );

      const eyebrow = container.querySelector("p");
      expect(eyebrow).toHaveClass(
        "relative",
        "z-10",
        "order-first",
        "mb-3",
        "flex",
        "items-center",
        "text-sm",
        "text-wrap",
        "text-zinc-400",
        "dark:text-zinc-500",
        "pl-3.5",
        "custom-class"
      );
    });

    it("handles multiple props together", () => {
      render(
        <Card.Eyebrow
          decorate={true}
          className="multi-class"
          aria-label="Multi prop test"
        >
          Multi prop test
        </Card.Eyebrow>
      );

      const eyebrow = screen.getByLabelText("Multi prop test");
      expect(eyebrow).toHaveClass("multi-class");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD LINK COMPONENT TESTS
// ============================================================================

describe("Card.Link", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders as div element by default", () => {
      const { container } = render(
        <Card.Link href="/test">Link content</Card.Link>
      );

      const linkContainer = container.querySelector("div");
      expect(linkContainer?.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card.Link href="/test" className="custom-class">
          Link content
        </Card.Link>
      );

      // className is applied to the background div (first child div of outer div)
      const outerDiv = container.querySelector("div");
      const background = outerDiv?.querySelector("div:first-child");
      expect(background).toBeInTheDocument();
      expect(background).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Link href="/test" data-test="test-data">
          Link content
        </Card.Link>
      );

      const link = screen.getByRole("link", { name: /link content/i });
      expect(link.closest("div")).toHaveAttribute("data-test", "test-data");
    });

    it("renders structure with background div and CardLinkCustom", () => {
      const { container } = render(
        <Card.Link href="/test">Link content</Card.Link>
      );

      // Should have container div
      const linkContainer = container.querySelector("div");
      expect(linkContainer).toBeInTheDocument();

      // Should have background div
      const backgroundDiv = container.querySelector("div > div");
      expect(backgroundDiv).toBeInTheDocument();

      // Should have CardLinkCustom (link)
      const customLink = screen.getByRole("link");
      expect(customLink).toBeInTheDocument();
    });
  });

  describe("Link Functionality", () => {
    it("renders CardLinkCustom when href is provided and valid", () => {
      render(<Card.Link href="/test-link">Link content</Card.Link>);

      const customLink = screen.getByRole("link", { name: /link content/i });
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute("href", "/test-link");
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is invalid", () => {
      render(<Card.Link href="">Link content</Card.Link>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is null", () => {
      render(<Card.Link href={null as any}>Link content</Card.Link>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is undefined", () => {
      render(<Card.Link href={undefined as any}>Link content</Card.Link>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders CardLinkCustom with correct props when href is valid", () => {
      render(
        <Card.Link href="/valid-link" target="_blank" title="Test title">
          Link content
        </Card.Link>
      );

      const customLink = screen.getByRole("link", { name: "Test title" });
      expect(customLink).toHaveAttribute("href", "/valid-link");
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("title", "Test title");
    });
  });

  describe("Styling Structure", () => {
    it("renders background element with correct Tailwind classes", () => {
      const { container } = render(
        <Card.Link href="/test">Link content</Card.Link>
      );

      const outerDiv = container.querySelector("div");
      const background = outerDiv?.querySelector("div:first-child");
      expect(background).toBeInTheDocument();
      expect(background).toHaveClass(
        "absolute",
        "-inset-x-4",
        "-inset-y-6",
        "z-0",
        "scale-95",
        "bg-zinc-50",
        "opacity-0",
        "transition",
        "group-hover:scale-100",
        "group-hover:opacity-100",
        "sm:-inset-x-6",
        "sm:rounded-2xl",
        "dark:bg-zinc-800/50"
      );
    });

    it("renders CardLinkCustom with clickable area and content when href is valid", () => {
      render(<Card.Link href="/test">Link content</Card.Link>);

      const customLink = screen.getByRole("link");
      expect(customLink).toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders CardLinkCustom with proper span structure", () => {
      const { container } = render(
        <Card.Link href="/test">Link content</Card.Link>
      );

      const customLink = screen.getByRole("link");
      expect(customLink).toBeInTheDocument();

      // Should have clickable area span
      const clickableArea = container.querySelector(
        'a[href="/test"] > span:first-child'
      );
      expect(clickableArea).toHaveClass(
        "absolute",
        "-inset-x-4",
        "-inset-y-6",
        "z-20",
        "sm:-inset-x-6",
        "sm:rounded-2xl"
      );

      // Should have content span
      const contentSpan = container.querySelector(
        'a[href="/test"] > span:last-child'
      );
      expect(contentSpan).toHaveClass("relative", "z-10");
      expect(contentSpan).toHaveTextContent("Link content");
    });

    it("combines Tailwind + custom classes", () => {
      const { container } = render(
        <Card.Link href="/test" className="custom-class">
          Link content
        </Card.Link>
      );

      const outerDiv = container.querySelector("div");
      const background = outerDiv?.querySelector("div:first-child");
      expect(background).toBeInTheDocument();
      expect(background).toHaveClass(
        "absolute",
        "-inset-x-4",
        "-inset-y-6",
        "z-0",
        "scale-95",
        "bg-zinc-50",
        "opacity-0",
        "transition",
        "group-hover:scale-100",
        "group-hover:opacity-100",
        "sm:-inset-x-6",
        "sm:rounded-2xl",
        "dark:bg-zinc-800/50",
        "custom-class"
      );
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Link href="/test" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Link href="/test">{null}</Card.Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card.Link href="/test">{""}</Card.Link>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      const { container } = render(<Card.Link href="/test">{true}</Card.Link>);
      // Boolean true is not rendered as text content in React
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<Card.Link href="/test">{0}</Card.Link>);
      // Component returns null for falsy children like 0
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Memoization", () => {
    it("Card.Link renders without memoization by default", () => {
      render(
        <Card.Link href="/test">
          <div>Default link</div>
        </Card.Link>
      );

      expect(screen.getByText("Default link")).toBeInTheDocument();
    });

    it("Card.Link re-renders when props change", () => {
      const { rerender } = render(
        <Card.Link href="/test">
          <div>Initial content</div>
        </Card.Link>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card.Link href="/test">
          <div>Updated content</div>
        </Card.Link>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with correct element type", () => {
      const { container } = render(
        <Card.Link href="/test">Link content</Card.Link>
      );

      const linkContainer = container.querySelector("div");
      expect(linkContainer?.tagName).toBe("DIV");
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as div by default", () => {
      const { container } = render(
        <Card.Link href="/test">Link content</Card.Link>
      );

      const linkContainer = container.querySelector("div");
      expect(linkContainer?.tagName).toBe("DIV");
    });

    it("renders as section when as prop is section", () => {
      const { container } = render(
        <Card.Link as="section" href="/test">
          Link content
        </Card.Link>
      );

      const linkContainer = container.querySelector("section");
      expect(linkContainer?.tagName).toBe("SECTION");
    });

    it("renders as article when as prop is article", () => {
      const { container } = render(
        <Card.Link as="article" href="/test">
          Link content
        </Card.Link>
      );

      const linkContainer = container.querySelector("article");
      expect(linkContainer?.tagName).toBe("ARTICLE");
    });

    it("renders as span when as prop is span", () => {
      const { container } = render(
        <Card.Link as="span" href="/test">
          Link content
        </Card.Link>
      );

      const linkContainer = container.querySelector("span");
      expect(linkContainer?.tagName).toBe("SPAN");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Link href="/test">
          <span>Complex</span> content
        </Card.Link>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Link href="/test">Link with special chars: @#$%</Card.Link>);
      expect(
        screen.getByText("Link with special chars: @#$%")
      ).toBeInTheDocument();
    });

    it("handles multiple props together", () => {
      render(
        <Card.Link
          href="/test"
          className="multi-class"
          target="_blank"
          title="Multi prop test"
        >
          Multi prop test
        </Card.Link>
      );

      const customLink = screen.getByRole("link", { name: /multi prop test/i });
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("title", "Multi prop test");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD LINK CUSTOM COMPONENT TESTS
// ============================================================================

describe("Card.LinkCustom", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.LinkCustom href="/test-link">Link content</Card.LinkCustom>);

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(<Card.LinkCustom href="/test-link">Link content</Card.LinkCustom>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("applies custom className", () => {
      render(
        <Card.LinkCustom href="/test-link" className="custom-class">
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByRole("link");
      expect(linkElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.LinkCustom href="/test-link" title="Link">
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByRole("link");
      expect(linkElement).toHaveAttribute("aria-label", "Link");
    });

    it("sets aria-label from title prop", () => {
      render(
        <Card.LinkCustom href="/test-link" title="Custom title">
          Link content
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Custom title");
      expect(link).toHaveAttribute("title", "Custom title");
    });

    it("does not set aria-label when title is not provided", () => {
      render(<Card.LinkCustom href="/test-link">Link content</Card.LinkCustom>);

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("aria-label");
      expect(link).not.toHaveAttribute("title");
    });
  });

  describe("Link Properties", () => {
    it("passes through link attributes", () => {
      render(
        <Card.LinkCustom href="/test" target="_blank" title="Test title">
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });

    it("adds rel attribute for external links", () => {
      render(
        <Card.LinkCustom href="https://example.com" target="_blank">
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("does not add rel attribute for internal links", () => {
      render(
        <Card.LinkCustom href="/internal-link" target="_self">
          Link text
        </Card.LinkCustom>
      );

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("rel");
    });

    it("handles invalid href by rendering with empty href", () => {
      const { container } = render(
        <Card.LinkCustom href="">Link text</Card.LinkCustom>
      );

      // When href is invalid, linkHref becomes null, so href becomes undefined
      // React renders href={undefined} as href=""
      const anchor = container.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", "");
    });

    it("handles null href by rendering with empty href", () => {
      const { container } = render(
        <Card.LinkCustom href={null as any}>Link text</Card.LinkCustom>
      );

      const anchor = container.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", "");
    });

    it("handles undefined href by rendering with empty href", () => {
      const { container } = render(
        <Card.LinkCustom href={undefined as any}>Link text</Card.LinkCustom>
      );

      const anchor = container.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", "");
    });
  });

  describe("Component Structure", () => {
    it("renders as anchor element", () => {
      render(<Card.LinkCustom href="/test-link">Link content</Card.LinkCustom>);

      const linkElement = screen.getByRole("link");
      expect(linkElement.tagName).toBe("A");
    });

    it("applies correct CSS classes", () => {
      render(<Card.LinkCustom href="/test-link">Link content</Card.LinkCustom>);

      const linkElement = screen.getByRole("link");
      expect(linkElement).toBeInTheDocument();
    });

    it("combines CSS module + custom classes", () => {
      render(
        <Card.LinkCustom href="/test-link" className="custom-class">
          Link content
        </Card.LinkCustom>
      );

      const linkElement = screen.getByRole("link");
      expect(linkElement).toHaveClass("custom-class");
    });
  });

  describe("Memoization", () => {
    it("Card.LinkCustom renders correctly", () => {
      render(<Card.LinkCustom href="/test-link">Link content</Card.LinkCustom>);

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("Card.LinkCustom re-renders when props change", () => {
      const { rerender } = render(
        <Card.LinkCustom href="/test-link">Initial content</Card.LinkCustom>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card.LinkCustom href="/test-link">Updated content</Card.LinkCustom>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.LinkCustom href="/test-link">
          <span>Complex</span> <strong>content</strong>
        </Card.LinkCustom>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(
        <Card.LinkCustom href="/test-link">
          Special chars: &lt;&gt;&amp;
        </Card.LinkCustom>
      );

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("does not render when children are empty", () => {
      const { container } = render(
        <Card.LinkCustom href="/test-link">{""}</Card.LinkCustom>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children are null", () => {
      const { container } = render(
        <Card.LinkCustom href="/test-link">{null}</Card.LinkCustom>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when children are undefined", () => {
      const { container } = render(
        <Card.LinkCustom href="/test-link">{undefined}</Card.LinkCustom>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("handles boolean children", () => {
      render(<Card.LinkCustom href="/test-link">{true}</Card.LinkCustom>);

      // Boolean true is not rendered as text content in React but link element renders
      const linkElement = screen.getByRole("link");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.tagName).toBe("A");
    });

    it("handles number children", () => {
      const { container } = render(
        <Card.LinkCustom href="/test-link">{0}</Card.LinkCustom>
      );

      // Component returns null for falsy children like 0
      expect(container).toBeEmptyDOMElement();
    });

    it("handles multiple props together", () => {
      render(
        <Card.LinkCustom
          href="https://example.com"
          className="multi-class"
          target="_blank"
          title="Multi prop test"
        >
          Multi prop test
        </Card.LinkCustom>
      );

      const linkElement = screen.getByRole("link", {
        name: /multi prop test/i,
      });
      expect(linkElement).toHaveClass("multi-class");
      expect(linkElement).toHaveAttribute("href", "https://example.com");
      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("title", "Multi prop test");
      expect(linkElement).toHaveAttribute("aria-label", "Multi prop test");
      expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
      expect(screen.getByText("Multi prop test")).toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD TITLE COMPONENT TESTS
// ============================================================================

describe("Card.Title", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card.Title className="custom-class" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = container.querySelector("h2");
      expect(titleElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card.Title href="#" aria-label="Title">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByLabelText("Title");
      expect(titleElement).toBeInTheDocument();
    });
  });

  describe("Link Functionality", () => {
    it("renders with link when href is provided and valid", () => {
      render(<Card.Title href="/test-link">Card title</Card.Title>);

      const link = screen.getByRole("link", { name: /card title/i });
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("renders without link when href is not valid", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("passes through link attributes", () => {
      render(
        <Card.Title href="/test" target="_blank" title="Test title">
          Card title
        </Card.Title>
      );

      const link = screen.getByRole("link", { name: "Test title" });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<Card.Title href="#" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<Card.Title href="#">{null}</Card.Title>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when only href is provided without children", () => {
      const { container } = render(<Card.Title href="/test" />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders children without link when href is invalid", () => {
      render(<Card.Title href="#">Valid children</Card.Title>);
      expect(screen.getByText("Valid children")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders as h2 element by default", () => {
      const { container } = render(
        <Card.Title href="#">Card title</Card.Title>
      );

      const titleElement = container.querySelector("h2");
      expect(titleElement?.tagName).toBe("H2");
    });

    it("applies CSS classes", () => {
      const { container } = render(
        <Card.Title href="#">Card title</Card.Title>
      );

      const titleElement = container.querySelector("h2");
      expect(titleElement).toHaveClass(
        "text-base",
        "font-semibold",
        "tracking-tight",
        "text-zinc-800",
        "dark:text-zinc-100"
      );
    });

    it("combines custom classes", () => {
      const { container } = render(
        <Card.Title className="custom-class" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = container.querySelector("h2");
      expect(titleElement).toHaveClass("custom-class");
    });
  });

  describe("Element Props", () => {
    it("passes through element props on h2", () => {
      render(
        <Card.Title href="#" id="title-id" tabIndex={0}>
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement.tagName).toBe("H2");
      expect(titleElement).toHaveAttribute("id", "title-id");
      expect(titleElement).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main layout elements", () => {
      render(<Card.Title href="#">Card title</Card.Title>);

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(
        <Card.Title
          aria-labelledby="title-id"
          aria-describedby="desc-id"
          href="#"
        >
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toHaveAttribute("aria-labelledby", "title-id");
      expect(titleElement).toHaveAttribute("aria-describedby", "desc-id");
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(
        <Card.Title id="title-id" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByRole("heading", { level: 2 });
      expect(titleElement).toHaveAttribute("id", "title-id");
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <Card.Title aria-label="Clickable card title" href="#">
          Card title
        </Card.Title>
      );

      const titleElement = screen.getByLabelText("Clickable card title");
      expect(titleElement).toBeInTheDocument();
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Card.Title href="#" />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card.Title href="#">
          <span>Complex</span> <strong>title</strong>
        </Card.Title>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card.Title href="#">Special chars: &lt;&gt;&amp;</Card.Title>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("Card.Title renders correctly", () => {
      render(
        <Card.Title href="#">
          <div>Title content</div>
        </Card.Title>
      );

      expect(screen.getByText("Title content")).toBeInTheDocument();
    });

    it("Card.Title re-renders when props change", () => {
      const { rerender } = render(
        <Card.Title href="#">
          <div>Initial content</div>
        </Card.Title>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card.Title href="#">
          <div>Updated content</div>
        </Card.Title>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });

    it("Card.Title with invalid link renders correctly", () => {
      render(
        <Card.Title href="#">
          <div>Title with invalid link</div>
        </Card.Title>
      );

      expect(screen.getByText("Title with invalid link")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });
});

// ============================================================================
// CARD COMPONENT TESTS
// ============================================================================

describe("Card", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card className="custom-class">
          <div>Card content</div>
        </Card>
      );

      const card = container.querySelector("div");
      expect(card).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <Card data-testid="custom-testid" aria-label="Card label">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByTestId("custom-testid");
      expect(card).toHaveAttribute("aria-label", "Card label");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined/empty children", () => {
      const { container } = render(<Card>{undefined}</Card>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Component Structure", () => {
    it("renders as div element by default", () => {
      const { container } = render(<Card>Card content</Card>);

      const card = container.querySelector("div");
      expect(card?.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      const { container } = render(<Card>Card content</Card>);

      const card = container.querySelector("div");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start"
      );
    });

    it("combines Tailwind classes + custom classes", () => {
      const { container } = render(
        <Card className="custom-class">Card content</Card>
      );

      const card = container.querySelector("div");
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("Component Rendering", () => {
    it("Card renders correctly with children", () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("Card re-renders when props change", () => {
      const { rerender } = render(
        <Card>
          <div>Initial content</div>
        </Card>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <Card>
          <div>Updated content</div>
        </Card>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });

    it("Card maintains consistent rendering across re-renders", () => {
      const { rerender } = render(
        <Card>
          <div>Consistent content</div>
        </Card>
      );

      const initialElement = screen.getByText("Consistent content");
      expect(initialElement).toBeInTheDocument();

      // Re-render with same props
      rerender(
        <Card>
          <div>Consistent content</div>
        </Card>
      );

      const rerenderedElement = screen.getByText("Consistent content");
      expect(rerenderedElement).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <Card>
          <div>
            <span>Complex</span> <strong>content</strong>
          </div>
        </Card>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<Card>Special chars: &lt;&gt;&amp;</Card>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles empty string children", () => {
      const { container } = render(<Card>{""}</Card>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles false children", () => {
      const { container } = render(<Card>{false}</Card>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles zero children", () => {
      const { container } = render(<Card>{0}</Card>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles mixed valid and invalid children", () => {
      render(
        <Card>
          {null}
          <div>Valid content</div>
          {undefined}
          <span>More content</span>
        </Card>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
      expect(screen.getByText("More content")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      const { container } = render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      const card = container.querySelector("div");
      expect(card).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(
        <Card aria-label="Custom card" aria-describedby="card-description">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByLabelText("Custom card");
      expect(card).toHaveAttribute("aria-describedby", "card-description");
    });

    it("supports role attribute", () => {
      render(
        <Card role="region">
          <div>Card content</div>
        </Card>
      );

      const card = screen.getByRole("region");
      expect(card).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      const { container } = render(<Card>Card content</Card>);

      // Card renders as div by default
      const cardElement = container.querySelector("div");
      expect(cardElement).toBeInTheDocument();
      expect(cardElement?.tagName).toBe("DIV");
    });

    it("applies correct ARIA relationships between elements", () => {
      const { container } = render(<Card>Card content</Card>);

      const cardElement = container.querySelector("div");

      // Card should be present
      expect(cardElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels without ID dependencies", () => {
      render(<Card>Card content</Card>);

      // Content should be present (no ID needed)
      const contentElement = screen.getByText("Card content");
      expect(contentElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to content elements", () => {
      render(<Card aria-label="Test card">Card content</Card>);

      // Card should have descriptive label
      const cardElement = screen.getByLabelText("Test card");
      expect(cardElement).toBeInTheDocument();
    });

    it("applies ARIA attributes with different IDs", () => {
      const { container } = render(<Card>Card content</Card>);

      const cardElement = container.querySelector("div");

      // Should be present
      expect(cardElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender, container } = render(<Card>Card content</Card>);

      // Initial render
      let cardElement = container.querySelector("div");
      expect(cardElement).toBeInTheDocument();

      // Update with different content
      rerender(<Card>Updated content</Card>);

      // ARIA attributes should be maintained
      cardElement = container.querySelector("div");
      expect(cardElement).toBeInTheDocument();
    });

    it("ensures proper ARIA landmark structure", () => {
      const { container } = render(<Card>Card content</Card>);

      // Card renders as div element
      const cardElement = container.querySelector("div");
      expect(cardElement).toBeInTheDocument();
      expect(cardElement?.tagName).toBe("DIV");
    });

    it("applies conditional ARIA attributes correctly", () => {
      const { container } = render(<Card>Card content</Card>);

      const cardElement = container.querySelector("div");

      // Should be present
      expect(cardElement).toBeInTheDocument();
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Card>{null}</Card>);

      // Component should not render when no content
      expect(container).toBeEmptyDOMElement();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <Card aria-expanded="true" aria-controls="card-content">
          Card content
        </Card>
      );

      const cardElement = screen.getByText("Card content").closest("div");

      // Should maintain both component ARIA attributes and custom ones
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveAttribute("aria-expanded", "true");
      expect(cardElement).toHaveAttribute("aria-controls", "card-content");
    });
  });

  describe("CSS and Styling", () => {
    it("applies base Tailwind CSS classes", () => {
      const { container } = render(<Card>Card content</Card>);

      const card = container.querySelector("div");
      expect(card).toHaveClass(
        "group",
        "relative",
        "flex",
        "flex-col",
        "items-start"
      );
    });

    it("merges custom className with base classes", () => {
      const { container } = render(
        <Card className="custom-card-class">Card content</Card>
      );

      const card = container.querySelector("div");
      expect(card).toHaveClass("custom-card-class");
    });

    it("handles multiple custom classes", () => {
      const { container } = render(
        <Card className="class1 class2 class3">Card content</Card>
      );

      const card = container.querySelector("div");
      expect(card).toHaveClass("class1", "class2", "class3");
    });

    it("handles empty className gracefully", () => {
      const { container } = render(<Card className="">Card content</Card>);

      const card = container.querySelector("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all HTML div attributes", () => {
      render(
        <Card
          id="card-1"
          tabIndex={0}
          data-custom="value"
          style={{ backgroundColor: "red" }}
        >
          Card content
        </Card>
      );

      const card = screen.getByText("Card content").closest("div");
      expect(card).toHaveAttribute("id", "card-1");
      expect(card).toHaveAttribute("tabIndex", "0");
      expect(card).toHaveAttribute("data-custom", "value");
      expect(card?.style.backgroundColor).toBe("red");
    });

    it("forwards event handlers", () => {
      const onClick = vi.fn();

      render(<Card onClick={onClick}>Card content</Card>);

      const card = screen.getByText("Card content").closest("div");

      card?.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Memoization", () => {
    it("Card renders without memoization by default", () => {
      render(
        <Card>
          <div>Default Card</div>
        </Card>
      );

      expect(screen.getByText("Default Card")).toBeInTheDocument();
    });

    it("MemoizedCard renders with memoization", () => {
      render(
        <MemoizedCard>
          <div>Memoized Card</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Memoized Card")).toBeInTheDocument();
    });

    it("MemoizedCard maintains memoization across re-renders with same props", () => {
      const { rerender } = render(
        <MemoizedCard>
          <div>Memoized content</div>
        </MemoizedCard>
      );

      // Re-render with same props
      rerender(
        <MemoizedCard>
          <div>Memoized content</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Memoized content")).toBeInTheDocument();
    });

    it("MemoizedCard re-renders when props change", () => {
      const { rerender } = render(
        <MemoizedCard>
          <div>Initial content</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      // Re-render with different content
      rerender(
        <MemoizedCard>
          <div>Updated content</div>
        </MemoizedCard>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });
  });
});
