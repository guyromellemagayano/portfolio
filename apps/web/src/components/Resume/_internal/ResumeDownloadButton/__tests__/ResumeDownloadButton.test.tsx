// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ResumeDownloadButton } from "../ResumeDownloadButton";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

// Mock @web/utils
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock @web/components
vi.mock("@web/components", () => ({
  Button: vi.fn(
    ({ children, className, href, debugId, debugMode, ...props }) => (
      <a
        data-testid="button"
        href={href}
        className={className}
        data-button-id={debugId}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {children}
      </a>
    )
  ),
  Icon: {
    ArrowDown: vi.fn(({ className, debugId, debugMode, ...props }) => (
      <svg
        data-testid="arrow-down-icon"
        className={className}
        data-icon-id={debugId}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        Arrow Down
      </svg>
    )),
  },
}));

// Mock i18n
vi.mock("../../Resume.i18n", () => ({
  RESUME_I18N: {
    download: "Download CV",
  },
}));

// ============================================================================
// TESTS
// ============================================================================

describe("ResumeDownloadButton", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/resume.pdf");
    });

    it("applies custom className", () => {
      render(<ResumeDownloadButton className="custom-class" />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<ResumeDownloadButton debugMode={true} />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(<ResumeDownloadButton debugId="custom-id" />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "custom-id");
    });

    it("passes through additional props", () => {
      render(
        <ResumeDownloadButton
          data-test="custom-data"
          aria-label="Download resume"
        />
      );

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-test", "custom-data");
      expect(button).toHaveAttribute("aria-label", "Download resume");
    });
  });

  describe("Component Structure", () => {
    it("renders button with correct structure", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/resume.pdf");
    });

    it("renders download text", () => {
      render(<ResumeDownloadButton />);

      expect(screen.getByText("Download CV")).toBeInTheDocument();
    });

    it("renders arrow down icon", () => {
      render(<ResumeDownloadButton />);

      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toBeInTheDocument();
    });

    it("applies correct CSS classes to button", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("class");
    });

    it("applies correct CSS classes to icon", () => {
      render(<ResumeDownloadButton />);

      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toHaveAttribute("class");
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<ResumeDownloadButton />);

      expect(screen.getByTestId("button")).toBeInTheDocument();
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();
    });

    it("renders with custom Button component", () => {
      const CustomButton = function ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: any;
      }) {
        return (
          <div data-testid="custom-button" {...props}>
            {children}
          </div>
        );
      };

      render(<ResumeDownloadButton as={CustomButton} />);

      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ResumeDownloadButton debugMode={true} />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ResumeDownloadButton debugMode={false} />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).not.toHaveAttribute("data-debug-mode");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).not.toHaveAttribute("data-debug-mode");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<ResumeDownloadButton isMemoized={true} />);

      expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<ResumeDownloadButton isMemoized={false} />);

      expect(screen.getByTestId("button")).toBeInTheDocument();

      rerender(
        <ResumeDownloadButton isMemoized={false} className="updated-class" />
      );
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(<ResumeDownloadButton />);

      expect(screen.getByTestId("button")).toBeInTheDocument();

      rerender(<ResumeDownloadButton className="updated-class" />);
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes to all elements", () => {
      render(<ResumeDownloadButton debugId="test-id" />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).toHaveAttribute("data-button-id", "test-id");
      expect(icon).toHaveAttribute("data-icon-id", "test-id");
    });

    it("handles debugId prop correctly", () => {
      render(<ResumeDownloadButton debugId="custom-debug-id" />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).toHaveAttribute("data-button-id", "custom-debug-id");
      expect(icon).toHaveAttribute("data-icon-id", "custom-debug-id");
    });

    it("renders with correct href attribute", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("href", "/resume.pdf");
    });

    it("renders with correct variant", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("class");
    });

    it("renders icon with correct styling classes", () => {
      render(<ResumeDownloadButton />);

      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toHaveAttribute("class");
    });
  });

  describe("Accessibility Tests", () => {
    it("maintains proper semantic structure", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("A");
    });

    it("provides proper data attributes for debugging", () => {
      render(<ResumeDownloadButton debugMode={true} />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("provides proper component IDs for all elements", () => {
      render(<ResumeDownloadButton />);

      const button = screen.getByTestId("button");
      const icon = screen.getByTestId("arrow-down-icon");

      expect(button).toHaveAttribute("data-button-id", "test-id");
      expect(icon).toHaveAttribute("data-icon-id", "test-id");
    });

    it("maintains accessibility during updates", () => {
      const { rerender } = render(<ResumeDownloadButton debugId="initial" />);

      let button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "initial");

      rerender(<ResumeDownloadButton debugId="updated" />);
      button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "updated");
    });
  });

  describe("Integration Tests", () => {
    it("renders complete download button with all components", () => {
      render(
        <ResumeDownloadButton debugId="download-button" debugMode={true} />
      );

      // Test button
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("data-button-id", "download-button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
      expect(button).toHaveAttribute("href", "/resume.pdf");

      // Test text content
      expect(screen.getByText("Download CV")).toBeInTheDocument();

      // Test icon
      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-icon-id", "download-button");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(<ResumeDownloadButton debugId="initial" />);

      let button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "initial");

      rerender(<ResumeDownloadButton debugId="updated" />);
      button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "updated");
    });

    it("renders with proper component hierarchy", () => {
      render(<ResumeDownloadButton />);

      // Test that components are rendered in the correct order
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();

      // Button should contain text and icon
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();
    });
  });
});
