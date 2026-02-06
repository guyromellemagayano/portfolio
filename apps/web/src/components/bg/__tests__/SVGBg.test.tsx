/**
 * @file SVGBg.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the SVGBg component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SVGBg, SVGComponent } from "../SVGBg";

import "@testing-library/jest-dom";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: { internalId?: string; debugMode?: boolean } = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// ============================================================================
// SVG COMPONENT TESTS
// ============================================================================

describe("SVGComponent", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders an svg element", () => {
      const { container } = render(<SVGComponent />);

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg?.tagName.toLowerCase()).toBe("svg");
    });

    it("renders children correctly", () => {
      render(
        <SVGComponent>
          <title>Background title</title>
        </SVGComponent>
      );

      expect(screen.getByText("Background title")).toBeInTheDocument();
    });

    it("passes through HTML attributes", () => {
      const { container } = render(
        <SVGComponent id="svg-bg" data-testid="svg-bg" />
      );

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("id", "svg-bg");
      expect(svg).toHaveAttribute("data-testid", "svg-bg");
    });

    it("applies custom className", () => {
      const { container } = render(<SVGComponent className="custom-class" />);

      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("custom-class");
    });
  });

  describe("Content Validation", () => {
    it("renders with null children", () => {
      const { container } = render(<SVGComponent>{null}</SVGComponent>);

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      const { container } = render(<SVGComponent>{undefined}</SVGComponent>);

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("forwards debug data attributes", () => {
      const { container } = render(
        <SVGComponent data-debug-mode="true" data-svg-bg-id="svg-bg" />
      );

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("data-debug-mode", "true");
      expect(svg).toHaveAttribute("data-svg-bg-id", "svg-bg");
    });
  });

  describe("Component Structure Tests", () => {
    it("applies correct base class names", () => {
      const { container } = render(<SVGComponent />);

      const svg = container.querySelector("svg");
      expect(svg).toHaveClass(
        "absolute",
        "top-0",
        "left-[max(50%,25rem)]",
        "h-256",
        "w-512",
        "-translate-x-1/2",
        "mask-[radial-gradient(64rem_64rem_at_top,white,transparent)]",
        "stroke-zinc-200",
        "dark:stroke-zinc-800"
      );
    });

    it("renders defs, pattern, and rect structure", () => {
      const { container } = render(<SVGComponent />);

      const pattern = container.querySelector(
        "pattern#e813992c-7d03-4cc4-a2bd-151760b470a0"
      );
      expect(pattern).toBeInTheDocument();
      expect(pattern).toHaveAttribute("width", "200");
      expect(pattern).toHaveAttribute("height", "200");
      expect(pattern).toHaveAttribute("patternUnits", "userSpaceOnUse");

      const rect = container.querySelector("rect");
      expect(rect).toHaveAttribute(
        "fill",
        "url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
      );
      expect(rect).toHaveAttribute("width", "100%");
      expect(rect).toHaveAttribute("height", "100%");

      const innerSvg = container.querySelector("svg svg");
      expect(innerSvg).toBeInTheDocument();
      expect(innerSvg).toHaveClass(
        "overflow-visible",
        "fill-zinc-50",
        "dark:fill-zinc-800/50"
      );
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref to the svg element", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<SVGComponent ref={ref} />);

      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current?.tagName.toLowerCase()).toBe("svg");
    });
  });

  describe("Accessibility Tests", () => {
    it("marks SVG as aria-hidden", () => {
      const { container } = render(<SVGComponent />);

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("preserves ARIA attributes while enforcing aria-hidden", () => {
      const { container } = render(
        <SVGComponent role="img" aria-label="Decorative background" />
      );

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("role", "img");
      expect(svg).toHaveAttribute("aria-label", "Decorative background");
      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(
        screen.queryByRole("img", { name: /decorative background/i })
      ).not.toBeInTheDocument();
    });

    it("does not allow aria-hidden override", () => {
      const { container } = render(<SVGComponent aria-hidden="false" />);

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
});

// ============================================================================
// SVG BACKGROUND COMPONENT TESTS
// ============================================================================

describe("SVGBg", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders the root container", () => {
      const { container } = render(<SVGBg />);

      const root = container.querySelector("div");
      expect(root).toBeInTheDocument();
    });

    it("renders nested structure with SVGComponent", () => {
      const { container } = render(<SVGBg />);

      const svgElements = container.querySelectorAll("svg");
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it("passes through HTML attributes", () => {
      const { container } = render(
        <SVGBg id="svg-bg-root" data-testid="svg-bg-root" />
      );

      const root = container.querySelector("div");
      expect(root).toHaveAttribute("id", "svg-bg-root");
      expect(root).toHaveAttribute("data-testid", "svg-bg-root");
    });

    it("applies custom className", () => {
      const { container } = render(<SVGBg className="custom-class" />);

      const root = container.querySelector("div");
      expect(root).toHaveClass("custom-class");
    });
  });

  describe("Content Validation", () => {
    it("renders with null children", () => {
      const { container } = render(<SVGBg>{null}</SVGBg>);

      const root = container.querySelector("div");
      expect(root).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      const { container } = render(<SVGBg>{undefined}</SVGBg>);

      const root = container.querySelector("div");
      expect(root).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("forwards debug data attributes", () => {
      const { container } = render(
        <SVGBg data-debug-mode="true" data-svg-bg-id="bg-root" />
      );

      const root = container.querySelector("div");
      expect(root).toHaveAttribute("data-debug-mode", "true");
      expect(root).toHaveAttribute("data-svg-bg-id", "bg-root");
    });
  });

  describe("Component Structure Tests", () => {
    it("applies correct base class names", () => {
      const { container } = render(<SVGBg />);

      const root = container.querySelector("div");
      expect(root).toHaveClass(
        "fixed",
        "inset-0",
        "flex",
        "justify-center",
        "sm:px-8"
      );
    });

    it("renders layout wrappers with expected classes", () => {
      const { container } = render(<SVGBg />);

      const root = container.querySelector("div");
      const outerWrapper = root?.firstElementChild as HTMLElement | null;
      expect(outerWrapper).toBeInTheDocument();
      expect(outerWrapper).toHaveClass(
        "flex",
        "w-full",
        "max-w-7xl",
        "lg:px-8"
      );

      const isolateWrapper =
        outerWrapper?.firstElementChild as HTMLElement | null;
      expect(isolateWrapper).toBeInTheDocument();
      expect(isolateWrapper).toHaveClass(
        "absolute",
        "inset-0",
        "isolate",
        "-z-10",
        "flex",
        "justify-center",
        "overflow-hidden",
        "sm:px-8"
      );
      expect(isolateWrapper?.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref to the root element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SVGBg ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Accessibility Tests", () => {
    it("supports semantic role and label", () => {
      render(<SVGBg role="region" aria-label="Decorative background" />);

      const region = screen.getByRole("region", {
        name: /decorative background/i,
      });
      expect(region).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies ARIA relationships on the root element", () => {
      render(
        <>
          <span id="bg-title">Background</span>
          <span id="bg-description">Decorative SVG grid</span>
          <SVGBg
            role="region"
            aria-labelledby="bg-title"
            aria-describedby="bg-description"
          />
        </>
      );

      const region = screen.getByRole("region");
      expect(region).toHaveAttribute("aria-labelledby", "bg-title");
      expect(region).toHaveAttribute("aria-describedby", "bg-description");
    });
  });
});
