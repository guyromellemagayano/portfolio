/**
 * @file apps/web/src/components/bg/__tests__/SVGBg.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the SVGBg component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SVGBg } from "../SVGBg";

import "@testing-library/jest-dom";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: { internalId?: string; debugMode?: boolean } = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@portfolio/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@portfolio/utils", () => ({
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
// SVG BACKGROUND INTEGRATION TESTS
// ============================================================================

describe("SVGBg Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Layout Composition", () => {
    it("renders SVGBg with SVGComponent structure", () => {
      const { container } = render(<SVGBg />);

      const root = container.querySelector("div");
      expect(root).toBeInTheDocument();

      const svgElements = container.querySelectorAll("svg");
      expect(svgElements.length).toBeGreaterThan(0);

      const pattern = container.querySelector(
        "pattern#e813992c-7d03-4cc4-a2bd-151760b470a0"
      );
      expect(pattern).toBeInTheDocument();

      const rect = container.querySelector("rect");
      expect(rect).toHaveAttribute(
        "fill",
        "url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
      );
    });

    it("maintains layout classes with custom className", () => {
      const { container } = render(<SVGBg className="custom-bg" />);

      const root = container.querySelector("div");
      expect(root).toHaveClass("custom-bg");
      expect(root).toHaveClass("absolute", "inset-0", "flex", "justify-center");
    });

    it("keeps isolate wrapper and SVG hidden from accessibility tree", () => {
      const { container } = render(
        <SVGBg role="region" aria-label="Decorative background" />
      );

      const region = screen.getByRole("region", {
        name: /decorative background/i,
      });
      expect(region).toBeInTheDocument();

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("ARIA Relationships", () => {
    it("preserves ARIA relationships on the root while rendering SVG content", () => {
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
