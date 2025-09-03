import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FooterLegal } from "../FooterLegal";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasMeaningfulText: vi.fn((content) => {
    if (content === null || content === undefined) return false;
    if (typeof content === "string") return content.trim().length > 0;
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date(date).getFullYear().toString();
    }
    return date.toISOString();
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../FooterLegal.module.css", () => ({
  default: {
    footerLegal: "_footerLegal_e53dc9",
  },
}));

describe("FooterLegal", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders legal text correctly", () => {
      render(<FooterLegal legalText="© 2024 All rights reserved." />);

      expect(
        screen.getByText("© 2024 All rights reserved.")
      ).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<FooterLegal legalText="Legal text" className="custom-legal" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveClass("custom-legal");
    });

    it("renders with debug mode enabled", () => {
      render(<FooterLegal legalText="Legal text" _debugMode />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom internal ID", () => {
      render(<FooterLegal legalText="Legal text" _internalId="custom-legal" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveAttribute(
        "data-footer-legal-id",
        "custom-legal-footer-legal"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <FooterLegal
          legalText="Legal text"
          aria-label="Legal information"
          role="contentinfo"
        />
      );

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveAttribute("aria-label", "Legal information");
      expect(legalElement).toHaveAttribute("role", "contentinfo");
    });
  });

  describe("Content Validation", () => {
    it("renders with default legalText when no legalText provided", () => {
      render(<FooterLegal />);

      expect(screen.getByTestId("footer-legal-root")).toBeInTheDocument();
      expect(
        screen.getByText(/&copy;.*Guy Romelle Magayano.*All rights reserved/)
      ).toBeInTheDocument();
    });

    it("does not render when legalText is null", () => {
      render(<FooterLegal legalText={null as any} />);

      expect(screen.queryByTestId("footer-legal-root")).not.toBeInTheDocument();
    });

    it("renders with default legalText when legalText is undefined", () => {
      render(<FooterLegal legalText={undefined as any} />);

      expect(screen.getByTestId("footer-legal-root")).toBeInTheDocument();
      expect(
        screen.getByText(/&copy;.*Guy Romelle Magayano.*All rights reserved/)
      ).toBeInTheDocument();
    });

    it("does not render when legalText is empty string", () => {
      render(<FooterLegal legalText="" />);

      expect(screen.queryByTestId("footer-legal-root")).not.toBeInTheDocument();
    });

    it("renders when legalText is provided", () => {
      render(<FooterLegal legalText="Legal text" />);

      expect(screen.getByTestId("footer-legal-root")).toBeInTheDocument();
      expect(screen.getByText("Legal text")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("does not apply data-debug-mode when debugMode is false", () => {
      render(<FooterLegal legalText="Legal text" _debugMode={false} />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when debugMode is undefined", () => {
      render(<FooterLegal legalText="Legal text" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as p element by default", () => {
      render(<FooterLegal legalText="Legal text" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement.tagName).toBe("P");
    });

    it("renders with correct CSS classes", () => {
      render(<FooterLegal legalText="Legal text" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveClass("_footerLegal_e53dc9");
    });

    it("combines CSS module classes with custom className", () => {
      render(<FooterLegal legalText="Legal text" className="custom-legal" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveClass("_footerLegal_e53dc9 custom-legal");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the legal component", () => {
      const ref = { current: null };
      render(<FooterLegal legalText="Legal text" ref={ref} />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(ref.current).toBe(legalElement);
    });

    it("forwards ref with correct element", () => {
      const ref = { current: null };
      render(<FooterLegal legalText="Legal text" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<FooterLegal legalText="Legal text" />);

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement.tagName).toBe("P");
    });

    it("renders with proper data attributes for debugging", () => {
      render(
        <FooterLegal legalText="Legal text" _internalId="test-id" _debugMode />
      );

      const legalElement = screen.getByTestId("footer-legal-root");
      expect(legalElement).toHaveAttribute(
        "data-footer-legal-id",
        "test-id-footer-legal"
      );
      expect(legalElement).toHaveAttribute("data-debug-mode", "true");
      expect(legalElement).toHaveAttribute("data-testid", "footer-legal-root");
    });
  });

  describe("Edge Cases", () => {
    it("handles legalText with special characters", () => {
      render(<FooterLegal legalText="© 2024 & All rights reserved." />);

      expect(
        screen.getByText("© 2024 & All rights reserved.")
      ).toBeInTheDocument();
    });

    it("handles empty legalText string", () => {
      render(<FooterLegal legalText="" />);

      expect(screen.queryByTestId("footer-legal-root")).not.toBeInTheDocument();
    });

    it("does not render when legalText is whitespace-only", () => {
      render(<FooterLegal legalText="   " />);

      expect(screen.queryByTestId("footer-legal-root")).not.toBeInTheDocument();
    });
  });

  describe("Content Priority", () => {
    it("uses legalText when provided", () => {
      render(<FooterLegal legalText="Default text" />);

      expect(screen.getByText("Default text")).toBeInTheDocument();
    });

    it("uses default legalText when legalText not provided", () => {
      render(<FooterLegal />);

      expect(screen.getByTestId("footer-legal-root")).toBeInTheDocument();
      expect(
        screen.getByText(/&copy;.*Guy Romelle Magayano.*All rights reserved/)
      ).toBeInTheDocument();
    });
  });
});
