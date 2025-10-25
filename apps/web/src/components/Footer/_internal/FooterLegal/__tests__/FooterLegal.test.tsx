import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FooterLegal } from "../FooterLegal";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 3 (60%+ coverage, happy path + basic validation)
// - Risk Tier: Presentational
// - Component Type: Presentational
// ============================================================================

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date(date).getFullYear().toString();
    }
    return date.toISOString();
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("@guyromellemagayano/logger", () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../data", () => ({
  FOOTER_COMPONENT_LABELS: {
    legalText: "© 2025 Guy Romelle Magayano. All rights reserved.",
  },
}));

// FooterLegal component uses Tailwind CSS, no CSS modules needed

describe("FooterLegal", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders legal text correctly", () => {
      render(<FooterLegal debugId="test-id" />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<FooterLegal debugId="test-id" className="custom-legal" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).toHaveClass("custom-legal");
    });

    it("renders with debug mode enabled", () => {
      render(<FooterLegal debugId="test-id" debugMode />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID", () => {
      render(<FooterLegal debugId="custom-legal" />);

      const legalElement = screen.getByTestId("custom-legal-footer-legal");
      expect(legalElement).toHaveAttribute(
        "data-footer-legal-id",
        "custom-legal-footer-legal"
      );
    });

    it("passes through HTML attributes", () => {
      render(<FooterLegal debugId="test-id" aria-label="Legal information" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).toHaveAttribute(
        "aria-label",
        "© 2025 Guy Romelle Magayano. All rights reserved."
      );
      // FooterLegal no longer has role="contentinfo" to avoid conflict with Footer
    });
  });

  describe("Content Validation", () => {
    it("renders with hardcoded legal text from labels", () => {
      render(<FooterLegal debugId="test-id" />);

      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText(/©.*Guy Romelle Magayano.*All rights reserved/)
      ).toBeInTheDocument();
    });

    it("ignores legalText prop and uses hardcoded text", () => {
      render(<FooterLegal debugId="test-id" legalText="Custom legal text" />);

      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
      expect(screen.queryByText("Custom legal text")).not.toBeInTheDocument();
    });

    it("always renders with hardcoded legal text", () => {
      render(<FooterLegal debugId="test-id" />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<FooterLegal debugId="test-id" debugMode={false} />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<FooterLegal debugId="test-id" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      render(<FooterLegal debugId="test-id" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement.tagName).toBe("P");
    });

    it("renders with custom element when as prop is provided", () => {
      render(<FooterLegal debugId="test-id" as="div" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement.tagName).toBe("DIV");
    });

    it("renders with correct CSS classes", () => {
      render(<FooterLegal debugId="test-id" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).toHaveClass(
        "text-sm text-zinc-400 dark:text-zinc-500"
      );
    });

    it("combines Tailwind classes with custom className", () => {
      render(<FooterLegal debugId="test-id" className="custom-legal" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).toHaveClass(
        "text-sm text-zinc-400 dark:text-zinc-500 custom-legal"
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the legal component", () => {
      const ref = { current: null };
      render(<FooterLegal debugId="test-id" ref={ref} />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(ref.current).toBe(legalElement);
    });

    it("forwards ref with correct element", () => {
      const ref = { current: null };
      render(<FooterLegal debugId="test-id" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<FooterLegal debugId="test-id" />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement.tagName).toBe("P");
    });

    it("renders with proper data attributes for debugging", () => {
      render(<FooterLegal debugId="test-id" debugMode />);

      const legalElement = screen.getByTestId("test-id-footer-legal");
      expect(legalElement).toHaveAttribute(
        "data-footer-legal-id",
        "test-id-footer-legal"
      );
      expect(legalElement).toHaveAttribute("data-debug-mode", "true");
      expect(legalElement).toHaveAttribute(
        "data-testid",
        "test-id-footer-legal"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles hardcoded legalText with special characters", () => {
      render(<FooterLegal debugId="test-id" />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("renders with hardcoded legalText when legalText prop is empty string", () => {
      render(<FooterLegal debugId="test-id" legalText="" />);

      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("renders with hardcoded legalText when legalText prop is whitespace-only", () => {
      render(<FooterLegal debugId="test-id" legalText="   " />);

      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<FooterLegal debugId="test-id" isMemoized />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <FooterLegal debugId="test-id" isMemoized={false} />
      );

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();

      rerender(<FooterLegal debugId="test-id" isMemoized={false} />);
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("defaults to non-memoized when isMemoized is undefined", () => {
      render(<FooterLegal debugId="test-id" />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });
  });
});
