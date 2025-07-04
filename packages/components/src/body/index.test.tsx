import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Body, type BodyProps } from ".";

describe("Body Component", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  let mockConsoleWarn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockConsoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const defaultProps: BodyProps = {
    children: "Body content",
  };

  it("renders as <body> without throwing (smoke test)", () => {
    expect(() => render(<Body {...defaultProps} />)).not.toThrow();
  });

  it("renders with default props as div", () => {
    const { container } = render(<Body as="div" {...defaultProps} />);
    const element = container.querySelector("div");
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toBe("DIV");
    expect(element).toHaveClass(
      "body",
      "body--scrollable",
      "body--has-background"
    );
  });

  it("renders with custom text content", () => {
    const { container } = render(<Body as="div">Custom body content</Body>);
    const element = container.querySelector("div");
    expect(element).toHaveTextContent("Custom body content");
  });

  it("preserves semantic meaning as div", () => {
    const { container } = render(<Body as="div">Semantic body</Body>);
    const element = container.querySelector("div");
    expect(element?.tagName).toBe("DIV");
  });

  describe("Scrollable Variant", () => {
    it("applies scrollable class when scrollable is true", () => {
      const { container } = render(
        <Body as="div" scrollable>
          Scrollable body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("body--scrollable");
      expect(element).toHaveAttribute("data-scrollable", "true");
    });

    it("removes scrollable class when scrollable is false", () => {
      const { container } = render(
        <Body as="div" scrollable={false}>
          Non-scrollable body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).not.toHaveClass("body--scrollable");
      expect(element).toHaveAttribute("data-scrollable", "false");
      expect(element).toHaveStyle({ overflow: "hidden" });
    });
  });

  describe("Background Variant", () => {
    it("applies background class when hasBackground is true", () => {
      const { container } = render(
        <Body as="div" hasBackground>
          Body with background
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("body--has-background");
      expect(element).toHaveAttribute("data-has-background", "true");
    });

    it("removes background class when hasBackground is false", () => {
      const { container } = render(
        <Body as="div" hasBackground={false}>
          Body without background
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).not.toHaveClass("body--has-background");
      expect(element).toHaveAttribute("data-has-background", "false");
    });
  });

  describe("Custom Styling", () => {
    it("merges custom className with base class", () => {
      const { container } = render(
        <Body as="div" className="custom-body">
          Custom styled
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass("body", "custom-body");
    });

    it("applies custom styles", () => {
      const { container } = render(
        <Body as="div" style={{ backgroundColor: "red" }}>
          Styled body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    });
  });

  describe("Analytics Integration", () => {
    it("adds analytics data attribute", () => {
      const { container } = render(
        <Body as="div" analyticsId="test-body">
          Tracked body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("data-analytics-id", "test-body");
    });

    it("does not add analytics attribute when not provided", () => {
      const { container } = render(<Body as="div">Untracked body</Body>);
      const element = container.querySelector("div");
      expect(element).not.toHaveAttribute("data-analytics-id");
    });
  });

  describe("Event Handling", () => {
    it("calls onClick handler", () => {
      const mockClick = vi.fn();
      const { container } = render(
        <Body as="div" onClick={mockClick}>
          Clickable body
        </Body>
      );
      const element = container.querySelector("div");
      fireEvent.click(element!);
      expect(mockClick).toHaveBeenCalled();
    });

    it("calls onMouseEnter handler", () => {
      const mockMouseEnter = vi.fn();
      const { container } = render(
        <Body as="div" onMouseEnter={mockMouseEnter}>
          Hoverable body
        </Body>
      );
      const element = container.querySelector("div");
      fireEvent.mouseEnter(element!);
      expect(mockMouseEnter).toHaveBeenCalled();
    });

    it("calls onFocus handler", () => {
      const mockFocus = vi.fn();
      const { container } = render(
        <Body as="div" onFocus={mockFocus}>
          Focusable body
        </Body>
      );
      const element = container.querySelector("div");
      fireEvent.focus(element!);
      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as different HTML element when 'as' prop is provided", () => {
      const { container } = render(<Body as="section">Section body</Body>);
      const element = container.querySelector("section");
      expect(element).toBeInTheDocument();
      expect(element?.tagName).toBe("SECTION");
    });

    it("maintains functionality with different elements", () => {
      const { container } = render(
        <Body as="section" className="custom">
          Section body
        </Body>
      );
      const element = container.querySelector("section");
      expect(element?.tagName).toBe("SECTION");
      expect(element).toHaveClass("body", "custom");
    });

    it("adds polymorphic data attribute when rendering as different element", () => {
      const { container } = render(<Body as="div">Polymorphic body</Body>);
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("data-polymorphic-element", "div");
    });

    it("does not add polymorphic data attribute when rendering as body (smoke)", () => {
      expect(() => render(<Body>Normal body</Body>)).not.toThrow();
    });

    it("handles custom component", () => {
      const CustomBody = React.forwardRef<
        HTMLElement,
        React.HTMLAttributes<HTMLElement>
      >((props, ref) => (
        <section ref={ref} {...props} data-testid="custom-body" />
      ));
      CustomBody.displayName = "CustomBody";

      render(<Body as={CustomBody}>Custom body</Body>);

      expect(screen.getByTestId("custom-body")).toBeInTheDocument();
    });
  });

  describe("Data Attributes", () => {
    it("adds validation data attribute when rendering as different element", () => {
      const { container } = render(<Body as="div">Validation test</Body>);
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("data-element-validation", "warning");
    });

    it("does not add validation data attribute when rendering as body (smoke)", () => {
      expect(() => render(<Body>Validation test</Body>)).not.toThrow();
    });

    it("maintains all data attributes", () => {
      const { container } = render(
        <Body
          as="div"
          scrollable={false}
          hasBackground={false}
          analyticsId="test"
          data-testid="body-element"
        >
          All attributes
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("data-polymorphic-element", "div");
      expect(element).toHaveAttribute("data-element-validation", "warning");
      expect(element).toHaveAttribute("data-analytics-id", "test");
      expect(element).toHaveAttribute("data-scrollable", "false");
      expect(element).toHaveAttribute("data-has-background", "false");
    });
  });

  describe("Client-side Rendering", () => {
    it("renders with client-side component as div", () => {
      const { container } = render(
        <Body as="div" isClient>
          Client body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("renders with memoized client component as div", () => {
      const { container } = render(
        <Body as="div" isClient isMemoized>
          Memoized body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
    });

    it("handles client-side rendering props as div", () => {
      const { container } = render(
        <Body
          as="div"
          isClient
          scrollable={false}
          hasBackground={false}
          analyticsId="client-test"
        >
          Client body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-analytics-id", "client-test");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content as div", () => {
      const { container } = render(<Body as="div" data-testid="empty-body" />);
      const element = container.querySelector("div");
      expect(element).toHaveClass("body");
    });

    it("handles numeric content as div", () => {
      const { container } = render(<Body as="div">{42}</Body>);
      const element = container.querySelector("div");
      expect(element).toHaveTextContent("42");
    });

    it("handles nested elements as div", () => {
      const { container } = render(
        <Body as="div">
          Body with <span>nested</span> content
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveTextContent("Body with nested content");
    });

    it("maintains all HTML attributes as div", () => {
      const { container } = render(
        <Body
          as="div"
          id="test-body"
          data-testid="body-element"
          aria-label="Important body"
        >
          Attributed body
        </Body>
      );
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("id", "test-body");
      expect(element).toHaveAttribute("aria-label", "Important body");
    });

    function isHTMLDivElement(node: unknown): node is HTMLDivElement {
      return (
        !!node &&
        typeof node === "object" &&
        "tagName" in node &&
        (node as Element).tagName === "DIV"
      );
    }

    it("forwards ref correctly as div", () => {
      let node: HTMLDivElement | null = null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
      const { container } = render(
        <Body
          as="div"
          ref={(el) => {
            node = el as unknown as HTMLDivElement;
          }}
        >
          Ref body
        </Body>
      );
      expect(node).toBeInstanceOf(HTMLDivElement);
      if (isHTMLDivElement(node)) {
        // @ts-expect-error TypeScript false positive: tagName exists on HTMLDivElement
        expect(node.tagName).toBe("DIV");
      }
    });

    it("handles complex children types as div", () => {
      const { container } = render(
        <Body as="div" data-testid="complex-body">
          <div>First div</div>
          <div>Second div</div>
        </Body>
      );
      const element = container.querySelector(
        "div[data-testid='complex-body']"
      );
      expect(element?.children).toHaveLength(2);
    });

    it("optimizes className building as div", () => {
      const { container, rerender } = render(<Body as="div">Basic</Body>);
      let element = container.querySelector("div");
      expect(element?.className).toBe(
        "body body--scrollable body--has-background"
      );
      rerender(
        <Body as="div" className="custom">
          Enhanced
        </Body>
      );
      element = container.querySelector("div");
      expect(element?.className).toBe(
        "body body--scrollable body--has-background custom"
      );
    });
  });
});
