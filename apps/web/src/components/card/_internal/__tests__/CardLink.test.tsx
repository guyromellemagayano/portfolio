import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer", target };
    }
    return { target };
  }),
}));

vi.mock("@web/lib", () => ({
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
vi.mock("../CardLinkCustom", () => ({
  CardLinkCustom: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLinkCustom(props, ref) {
      const {
        children,
        href,
        target,
        title,
        _internalId,
        _debugMode,
        ...rest
      } = props;

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
          data-card-link-custom-id={`${_internalId || "test-id"}-card-link-custom`}
          data-debug-mode={_debugMode ? "true" : undefined}
          data-testid={`${_internalId || "test-id"}-card-link-custom-root`}
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// Mock CSS modules
vi.mock("../styles/CardLink.module.css", () => ({
  default: {
    cardLinkBackground: "_cardLinkBackground_a29b80",
    cardLinkClickableArea: "_cardLinkClickableArea_a29b80",
    cardLinkContent: "_cardLinkContent_a29b80",
  },
}));

// Import the component after mocking
import { CardLink } from "../CardLink";

afterEach(cleanup);

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
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("data-test", "test-data");
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

    it("renders children directly when href is invalid", () => {
      render(<CardLink href="">Link content</CardLink>);

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
    it("renders background element with correct CSS class", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const background = screen.getByTestId("test-id-card-link-root");
      expect(background).toBeInTheDocument();
      expect(background).toHaveClass("_cardLinkBackground_a29b80");
    });

    it("renders CardLinkCustom with clickable area and content when href is valid", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const customLink = screen.getByTestId("test-id-card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
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
        <CardLink href="/test" _debugMode={true}>
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
    it("applies correct CSS classes", () => {
      render(<CardLink href="/test">Link content</CardLink>);

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveClass("_cardLinkBackground_a29b80");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <CardLink href="/test" className="custom-class">
          Link content
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveClass(
        "_cardLinkBackground_a29b80",
        "custom-class"
      );
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(
        <CardLink href="/test" _internalId="custom-id">
          Link text
        </CardLink>
      );

      const container = screen.getByTestId("custom-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-card-link-id",
        "custom-id-card-link"
      );
    });

    it("uses provided internalId when available", () => {
      render(
        <CardLink href="/test" _internalId="test-id">
          Link text
        </CardLink>
      );

      const container = screen.getByTestId("test-id-card-link-root");
      expect(container).toHaveAttribute(
        "data-card-link-id",
        "test-id-card-link"
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
      render(<CardLink href="/test">{0}</CardLink>);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });
});
