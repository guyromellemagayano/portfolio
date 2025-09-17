import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardTitle } from "../..";

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
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock component utilities
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  createComponentProps: vi.fn((id, componentType, debugMode) => {
    return {
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": `${id}-${componentType}-root`,
    };
  }),
}));

// Mock CardLinkCustom
vi.mock("../CardLink/CardLinkCustom", () => ({
  CardLinkCustom: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLinkCustom(props, ref) {
      const { children, href, target, title, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          data-testid="card-link-custom"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

// Mock CSS modules
vi.mock("../CardTitle.module.css", () => ({
  default: {
    cardTitleHeading: "_cardTitleHeading_9c3d2e",
  },
}));

// Mock Next.js Link component to avoid intersection observer issues
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { href, target, title, children, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          data-testid="card-link-custom-root"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

describe("CardTitle", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <CardTitle className="custom-class" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardTitle href="#" data-testid="custom-testid" aria-label="Title">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("aria-label", "Title");
    });
  });

  describe("Link Functionality", () => {
    it("renders with link when href is provided and valid", () => {
      render(<CardTitle href="/test-link">Card title</CardTitle>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("renders without link when href is not valid", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Card title")).toBeInTheDocument();
    });

    it("passes through link attributes", () => {
      render(
        <CardTitle href="/test" target="_blank" title="Test title">
          Card title
        </CardTitle>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardTitle />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardTitle>{null}</CardTitle>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render when only href is provided without children", () => {
      const { container } = render(<CardTitle href="/test" />);
      expect(container.firstChild).toBeNull();
    });

    it("renders children without link when href is invalid", () => {
      render(<CardTitle href="#">Valid children</CardTitle>);
      expect(screen.getByText("Valid children")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <CardTitle _debugMode={true} href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as h2 element", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement.tagName).toBe("H2");
    });

    it("applies correct CSS classes", () => {
      render(<CardTitle href="#">Card title</CardTitle>);

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveClass("_cardTitleHeading_9c3d2e");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <CardTitle className="custom-class" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveClass(
        "_cardTitleHeading_9c3d2e",
        "custom-class"
      );
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(
        <CardTitle _internalId="custom-id" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("custom-id-card-title-root");
      expect(titleElement).toHaveAttribute(
        "data-card-title-id",
        "custom-id-card-title"
      );
    });

    it("uses provided internalId when available", () => {
      render(
        <CardTitle _internalId="test-id" href="#">
          Card title
        </CardTitle>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute(
        "data-card-title-id",
        "test-id-card-title"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <CardTitle ref={ref} href="#">
          Card title
        </CardTitle>
      );

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <CardTitle ref={ref} href="#">
          Card title
        </CardTitle>
      );

      expect(ref.current?.tagName).toBe("H2");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardTitle href="#">
          <span>Complex</span> <strong>title</strong>
        </CardTitle>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardTitle href="#">Special chars: &lt;&gt;&amp;</CardTitle>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
