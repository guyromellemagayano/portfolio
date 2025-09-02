import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardCta } from "../CardCta";

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

// Mock Icon component
vi.mock("@web/components", () => ({
  Icon: {
    ChevronRight: () => <div data-testid="icon-chevron-right">→</div>,
  },
}));

// Mock CardLinkCustom
vi.mock("../CardLink/CardLinkCustom", () => ({
  CardLinkCustom: React.forwardRef<HTMLAnchorElement, any>(
    function MockCardLinkCustom(props, ref) {
      const { children, href, target, title, className, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          className={className}
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
vi.mock("../CardCta.module.css", () => ({
  default: {
    cardCtaContainer: "cardCtaContainer",
    cardCtaLink: "cardCtaLink",
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

describe("CardCta", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<CardCta>Call to action</CardCta>);

      expect(screen.getByText("Call to action")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<CardCta className="custom-class">Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <CardCta data-testid="custom-testid" aria-label="CTA">
          Call to action
        </CardCta>
      );

      const ctaElement = screen.getByTestId("custom-testid");
      expect(ctaElement).toHaveAttribute("aria-label", "CTA");
    });
  });

  describe("Link Functionality", () => {
    it("renders with link when href is provided and valid", () => {
      render(<CardCta href="/test-link">Call to action</CardCta>);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test-link");
    });

    it("renders without link when href is not valid", () => {
      render(<CardCta href="#">Call to action</CardCta>);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Call to action")).toBeInTheDocument();
    });

    it("passes through link attributes", () => {
      render(
        <CardCta href="/test" target="_blank" title="Test title">
          Call to action
        </CardCta>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("title", "Test title");
    });

    it("renders chevron icon when link is provided", () => {
      render(<CardCta href="/test-link">Call to action</CardCta>);

      const icon = screen.getByTestId("icon-chevron-right");
      expect(icon).toBeInTheDocument();
    });

    it("does not render chevron icon when no link", () => {
      render(<CardCta>Call to action</CardCta>);

      expect(
        screen.queryByTestId("icon-chevron-right")
      ).not.toBeInTheDocument();
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<CardCta />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null/undefined children", () => {
      const { container } = render(<CardCta>{null}</CardCta>);
      expect(container.firstChild).toBeNull();
    });

    it("handles empty string children", () => {
      const { container } = render(<CardCta>{""}</CardCta>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<CardCta _debugMode={true}>Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(<CardCta>Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as div element", () => {
      render(<CardCta>Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(<CardCta>Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).toHaveClass("cardCtaContainer");
    });

    it("combines CSS module + custom classes", () => {
      render(<CardCta className="custom-class">Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).toHaveClass("cardCtaContainer", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(<CardCta _internalId="custom-id">Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).toHaveAttribute(
        "data-card-cta-id",
        "custom-id-card-cta"
      );
    });

    it("uses provided internalId when available", () => {
      render(<CardCta _internalId="test-id">Call to action</CardCta>);

      const ctaElement = screen.getByTestId("card-cta-root");
      expect(ctaElement).toHaveAttribute(
        "data-card-cta-id",
        "test-id-card-cta"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardCta ref={ref}>Call to action</CardCta>);

      expect(ref.current).toBeInTheDocument();
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardCta ref={ref}>Call to action</CardCta>);

      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <CardCta>
          <span>Click</span> <strong>here</strong>
        </CardCta>
      );

      expect(screen.getByText("Click")).toBeInTheDocument();
      expect(screen.getByText("here")).toBeInTheDocument();
    });

    it("handles special characters", () => {
      render(<CardCta>Special chars: &lt;&gt;&amp;</CardCta>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      const { container } = render(<CardCta>{true}</CardCta>);
      expect(container.firstChild).toBeNull();
    });

    it("handles number children", () => {
      const { container } = render(<CardCta>{0}</CardCta>);
      expect(container.firstChild).toBeNull();
    });
  });
});
