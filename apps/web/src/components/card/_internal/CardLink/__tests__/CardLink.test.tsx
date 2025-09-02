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
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href || href === "#" || href === "") {
      return { target: "_self" };
    }
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString?.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date().getFullYear().toString();
    }
    return date.toISOString();
  }),
  createCompoundComponent: vi.fn((displayName, component) => {
    component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CardLinkCustom component
vi.mock("../CardLinkCustom", () => ({
  CardLinkCustom: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLinkCustom(props, ref) {
      const { href, target, title, children, className, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          className={className}
          data-testid="card-link-custom-root"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// Mock CSS modules
vi.mock("../CardLink.module.css", () => ({
  default: {
    cardLinkBackground: "cardLinkBackground",
    cardLinkClickableArea: "cardLinkClickableArea",
    cardLinkContent: "cardLinkContent",
  },
}));

// Mock Next.js Link component to avoid intersection observer issues
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { href, target, title, children, ...rest } = props;
      return (
        <a ref={ref} href={href} target={target} title={title} {...rest}>
          {children}
        </a>
      );
    }
  ),
}));

import { CardLink } from "../CardLink";

describe("CardLink", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardLink>Link content</CardLink>);

      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders as div element", () => {
      render(<CardLink>Link content</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(<CardLink className="custom-class">Link content</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardLink id="test-id" data-test="test-data">
          Link content
        </CardLink>
      );

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("data-test", "test-data");
    });
  });

  describe("Link Functionality", () => {
    it("renders CardLinkCustom when href is provided and valid", () => {
      render(<CardLink href="/test-link">Link content</CardLink>);

      const customLink = screen.getByTestId("card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute("href", "/test-link");
    });

    it("renders CardLinkCustom with correct props", () => {
      render(
        <CardLink href="/test-link" target="_blank" title="Test title">
          Link content
        </CardLink>
      );

      const customLink = screen.getByTestId("card-link-custom-root");
      expect(customLink).toHaveAttribute("href", "/test-link");
      expect(customLink).toHaveAttribute("target", "_blank");
      expect(customLink).toHaveAttribute("title", "Test title");
    });

    it("renders children directly when href is invalid", () => {
      render(<CardLink href="">Link content</CardLink>);

      expect(
        screen.queryByTestId("card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });

    it("renders children directly when href is not provided", () => {
      render(<CardLink>Link content</CardLink>);

      expect(
        screen.queryByTestId("card-link-custom-root")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Link content")).toBeInTheDocument();
    });
  });

  describe("Styling Structure", () => {
    it("renders background element", () => {
      render(<CardLink>Link content</CardLink>);

      const background = screen.getByTestId("card-link-root");
      expect(background).toBeInTheDocument();
      expect(background).toHaveClass("_cardLinkBackground_cfdd0d");
    });

    it("renders clickable area and content when link is provided", () => {
      render(<CardLink href="/test-link">Link content</CardLink>);

      const customLink = screen.getByTestId("card-link-custom-root");
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveTextContent("Link content");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardLink />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardLink>{null}</CardLink>);
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(<CardLink>{""}</CardLink>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<CardLink _debugMode={true}>Link text</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardLink>Link text</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes", () => {
      render(<CardLink>Link content</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveClass("_cardLinkBackground_cfdd0d");
    });

    it("combines CSS module + custom classes", () => {
      render(<CardLink className="custom-class">Link content</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveClass(
        "_cardLinkBackground_cfdd0d",
        "custom-class"
      );
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(<CardLink _internalId="custom-id">Link text</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveAttribute(
        "data-card-link-id",
        "custom-id-card-link"
      );
    });

    it("uses provided internalId when available", () => {
      render(<CardLink _internalId="test-id">Link text</CardLink>);

      const container = screen.getByTestId("card-link-root");
      expect(container).toHaveAttribute(
        "data-card-link-id",
        "test-id-card-link"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardLink ref={ref}>Link content</CardLink>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current).toHaveAttribute("data-testid", "card-link-root");
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardLink ref={ref}>Link content</CardLink>);

      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardLink>
          <span>Complex</span> <strong>content</strong>
        </CardLink>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardLink>Special chars: &lt;&gt;&amp;</CardLink>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      const { container } = render(<CardLink>{true}</CardLink>);
      expect(container.firstChild).toBeNull();
    });

    it("handles number children", () => {
      const { container } = render(<CardLink>{0}</CardLink>);
      expect(container.firstChild).toBeNull();
    });
  });
});
