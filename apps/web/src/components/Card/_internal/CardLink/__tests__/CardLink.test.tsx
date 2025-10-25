import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
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
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockLink(props, ref) {
      const { children, href, target, rel, title, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          rel={rel}
          title={title}
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// Mock CardLinkCustom component
vi.mock("../../CardLinkCustom", () => ({
  CardLinkCustom: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLinkCustom(props, ref) {
      const { children, href, target, title, debugId, debugMode, ...rest } =
        props;

      // Mock the validation logic from the real component
      const isValidLink = (href: any) => href && href !== "" && href !== "#";
      const isRenderableContent = (children: any) => {
        if (
          children === null ||
          children === undefined ||
          children === "" ||
          children === true ||
          children === false ||
          children === 0
        ) {
          return false;
        }
        return true;
      };

      if (!isValidLink(href) || !isRenderableContent(children)) return null;

      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          data-card-link-custom-id={`${debugId || "test-id"}-card-link-custom`}
          data-debug-mode={debugMode ? "true" : undefined}
          data-testid={`${debugId || "test-id"}-card-link-custom-root`}
          {...rest}
        >
          <span
            data-testid={`${debugId || "test-id"}-card-link-custom-span`}
            className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"
          />
          <span
            data-testid={`${debugId || "test-id"}-card-link-custom-span-content`}
            className="relative z-10"
          >
            {children}
          </span>
        </a>
      );
    }
  ),
}));

import { CardLink } from "../../CardLink";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("CardLink", () => {
  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardLink href="/test">Link content</CardLink>);
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders background div element", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container.tagName).toBe("DIV");
    });

    it("applies custom className to background div", () => {
      render(
        <CardLink href="/test" className="custom-class">
          Link content
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveClass("custom-class");
    });

    it("passes through HTML attributes to background div", () => {
      render(
        <CardLink href="/test" id="test-id" data-test="test-data">
          Link content
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      // The component uses createComponentProps which sets data-* attributes, not id
      expect(container).toHaveAttribute(
        "data-testid",
        "test-id-card-link-root"
      );
      expect(container).toHaveAttribute("data-test", "test-data");
    });

    it("renders React Fragment structure with background div and CardLinkCustom", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      // Should have background div
      const backgroundDiv = screen.getByTestId("test-id-card-link-root");
      expect(backgroundDiv).toBeInTheDocument();

      // Should have CardLinkCustom with proper structure
      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();

      // Should have the clickable area span
      const clickableArea = screen.getByTestId(
        "test-id-card-link-custom-span-root"
      );
      expect(clickableArea).toBeInTheDocument();

      // Should have the content span
      const contentSpan = screen.getByTestId(
        "test-id-card-link-custom-span-content-root"
      );
      expect(contentSpan).toBeInTheDocument();
    });
  });

  describe("Link Functionality", () => {
    it("renders CardLinkCustom when href is provided and valid", () => {
      render(<CardLink href="/test-link">Link content</CardLink>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute("href", "/test-link");
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is invalid", () => {
      render(<CardLink href="">Link content</CardLink>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is null", () => {
      render(<CardLink href={null as any}>Link content</CardLink>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is undefined", () => {
      render(<CardLink href={undefined as any}>Link content</CardLink>);

      expect(
        screen.queryByTestId("test-id-card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders CardLinkCustom with correct props when href is valid", () => {
      render(
        <CardLink href="/valid-link" target="_blank" title="Test title">
          Link content
        </CardLink>
      );

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toHaveAttribute("href", "/valid-link");
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("title", "Test title");
    });
  });

  describe("Styling Structure", () => {
    it("renders background element with correct Tailwind classes", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const background = screen.getByTestId("test-id-card-link-root");
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
      render(<CardLink href="/test">Link content</CardLink>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders CardLinkCustom with proper span structure", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();

      // Should have clickable area span
      const clickableArea = screen.getByTestId(
        "test-id-card-link-custom-span-root"
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
      const contentSpan = screen.getByTestId(
        "test-id-card-link-custom-span-content-root"
      );
      expect(contentSpan).toHaveClass("relative", "z-10");
      expect(contentSpan).toHaveTextContent("Link content");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardLink href="/test" />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardLink href="/test">{null}</CardLink>);
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(<CardLink href="/test">{""}</CardLink>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <CardLink href="/test" debugMode={true}>
          Link text
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardLink href="/test">Link text</CardLink>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("applies correct Tailwind classes", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveClass(
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

    it("combines Tailwind + custom classes", () => {
      render(
        <CardLink href="/test" className="custom-class">
          Link content
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveClass(
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

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(
        <CardLink href="/test" debugId="custom-id">
          Link text
        </CardLink>
      );

      const container = screen.getByTestId("custom-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-testid",
        "custom-id-card-link-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <CardLink href="/test" debugId="test-id">
          Link text
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-testid",
        "test-id-card-link-root"
      );
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(
        <CardLink href="/test" isMemoized={true}>
          <div>Memoized link</div>
        </CardLink>
      );

      expect(screen.getByText("Memoized link")).toBeInTheDocument();
    });

    it("renders without memoization by default", () => {
      render(
        <CardLink href="/test">
          <div>Default link</div>
        </CardLink>
      );

      expect(screen.getByText("Default link")).toBeInTheDocument();
    });

    it("maintains memoization across re-renders when isMemoized is true", () => {
      const { rerender } = render(
        <CardLink href="/test" isMemoized={true}>
          <div>Memoized content</div>
        </CardLink>
      );

      const initialElement = screen.getByText("Memoized content");

      // Re-render with same props
      rerender(
        <CardLink href="/test" isMemoized={true}>
          <div>Memoized content</div>
        </CardLink>
      );

      const rerenderedElement = screen.getByText("Memoized content");
      expect(rerenderedElement).toBe(initialElement);
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <CardLink href="/test" isMemoized={false}>
          <div>Non-memoized content</div>
        </CardLink>
      );

      const _initialElement = screen.getByText("Non-memoized content");

      // Re-render with different content to test non-memoization
      rerender(
        <CardLink href="/test" isMemoized={false}>
          <div>Different content</div>
        </CardLink>
      );

      expect(screen.getByText("Different content")).toBeInTheDocument();
      expect(
        screen.queryByText("Non-memoized content")
      ).not.toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardLink href="/test" ref={ref}>
          Link content
        </CardLink>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current).toHaveAttribute(
        "data-testid",
        "test-id-card-link-root"
      );
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardLink href="/test" ref={ref}>
          Link content
        </CardLink>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardLink href="/test">
          <span>Complex</span> content
        </CardLink>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardLink href="/test">Link with special chars: @#$%</CardLink>);
      expect(
        screen.getByText("Link with special chars: @#$%")
      ).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(<CardLink href="/test">{true}</CardLink>);
      // Boolean true is not rendered as text content in React
      expect(screen.getByTestId("test-id-card-link-root")).toBeInTheDocument();
    });

    it("handles number children", () => {
      const { container } = render(<CardLink href="/test">{0}</CardLink>);
      // Component returns null for falsy children like 0
      expect(container.firstChild).toBeNull();
    });
  });
});
