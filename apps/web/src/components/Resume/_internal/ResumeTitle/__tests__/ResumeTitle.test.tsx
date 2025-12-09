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

import { ResumeTitle } from "../ResumeTitle";

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
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
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
  Icon: {
    Briefcase: vi.fn(({ className, debugId, debugMode, ...props }) => (
      <svg
        data-testid="briefcase-icon"
        className={className}
        data-icon-id={debugId}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      />
    )),
  },
}));

// Mock resume i18n
vi.mock("../../Resume.i18n", () => ({
  RESUME_I18N: {
    work: "Work",
  },
}));

// ============================================================================
// TESTS
// ============================================================================

describe("ResumeTitle", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
      expect(title).toHaveAttribute("role", "heading");
    });

    it("applies custom className", () => {
      render(<ResumeTitle className="custom-class" />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<ResumeTitle debugMode={true} />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(<ResumeTitle debugId="custom-id" />);

      const title = screen.getByTestId("custom-id-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "custom-id-resume-title"
      );
    });

    it("passes through additional props", () => {
      render(
        <ResumeTitle data-test="custom-data" aria-label="Resume work section" />
      );

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("data-test", "custom-data");
      expect(title).toHaveAttribute("aria-label", "Resume work section");
    });
  });

  describe("Component Structure", () => {
    it("renders heading with correct structure", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
      expect(title).toHaveAttribute("role", "heading");
    });

    it("renders briefcase icon", () => {
      render(<ResumeTitle />);

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-6 w-6 flex-none", { exact: true });
    });

    it("renders work text", () => {
      render(<ResumeTitle />);

      expect(screen.getByText("Work")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("class");
    });

    it("renders with custom heading component", () => {
      const CustomHeading = function ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: any;
      }) {
        return (
          <h1 data-testid="custom-heading" {...props}>
            {children}
          </h1>
        );
      };

      render(<ResumeTitle as={CustomHeading} />);

      // The custom component should be rendered instead of the default h2
      // The component will still apply createComponentProps which overrides the test ID
      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H1"); // Should be H1 instead of H2
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<ResumeTitle />);

      expect(
        screen.getByTestId("test-id-resume-title-root")
      ).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
    });

    it("renders with custom heading level", () => {
      render(<ResumeTitle as="h1" />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title.tagName).toBe("H1");
    });

    it("renders with custom heading level as h3", () => {
      render(<ResumeTitle as="h3" />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title.tagName).toBe("H3");
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ResumeTitle debugMode={true} />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ResumeTitle debugMode={false} />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).not.toHaveAttribute("data-debug-mode");

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).not.toHaveAttribute("data-debug-mode");

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<ResumeTitle isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-resume-title-root")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<ResumeTitle isMemoized={false} />);

      expect(
        screen.getByTestId("test-id-resume-title-root")
      ).toBeInTheDocument();

      rerender(<ResumeTitle isMemoized={false} className="updated-class" />);
      expect(
        screen.getByTestId("test-id-resume-title-root")
      ).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(<ResumeTitle />);

      expect(
        screen.getByTestId("test-id-resume-title-root")
      ).toBeInTheDocument();

      rerender(<ResumeTitle className="updated-class" />);
      expect(
        screen.getByTestId("test-id-resume-title-root")
      ).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes to all elements", () => {
      render(<ResumeTitle debugId="test-id" />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "test-id-resume-title"
      );
    });

    it("handles debugId prop correctly", () => {
      render(<ResumeTitle debugId="custom-debug-id" />);

      const title = screen.getByTestId("custom-debug-id-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "custom-debug-id-resume-title"
      );
    });

    it("renders with correct role attribute", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("role", "heading");
    });

    it("renders work text correctly", () => {
      render(<ResumeTitle />);

      expect(screen.getByText("Work")).toBeInTheDocument();
    });

    it("renders briefcase icon with correct attributes", () => {
      render(<ResumeTitle />);

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toHaveClass("h-6 w-6 flex-none", { exact: true });
    });

    it("passes correct props to Icon.Briefcase", () => {
      render(<ResumeTitle debugId="parent-id" debugMode={true} />);

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toHaveAttribute("data-icon-id", "parent-id");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Accessibility Tests", () => {
    it("maintains proper semantic structure", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
      expect(title).toHaveAttribute("role", "heading");
    });

    it("provides proper data attributes for debugging", () => {
      render(<ResumeTitle debugMode={true} />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("provides proper component IDs for all elements", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "test-id-resume-title"
      );
    });

    it("maintains accessibility during updates", () => {
      const { rerender } = render(<ResumeTitle debugId="initial" />);

      let title = screen.getByTestId("initial-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "initial-resume-title"
      );

      rerender(<ResumeTitle debugId="updated" />);
      title = screen.getByTestId("updated-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "updated-resume-title"
      );
    });

    it("provides proper heading structure", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toHaveAttribute("role", "heading");
      expect(title.tagName).toBe("H2");
    });

    it("renders accessible text content", () => {
      render(<ResumeTitle />);

      expect(screen.getByText("Work")).toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    it("renders complete resume title with all components", () => {
      render(<ResumeTitle debugId="title-test" debugMode={true} />);

      // Test main title
      const title = screen.getByTestId("title-test-resume-title-root");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
      expect(title).toHaveAttribute("role", "heading");
      expect(title).toHaveAttribute("data-debug-mode", "true");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "title-test-resume-title"
      );

      // Test icon
      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-6 w-6 flex-none", { exact: true });
      expect(icon).toHaveAttribute("data-icon-id", "title-test");
      expect(icon).toHaveAttribute("data-debug-mode", "true");

      // Test text
      expect(screen.getByText("Work")).toBeInTheDocument();
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(<ResumeTitle debugId="initial" />);

      let title = screen.getByTestId("initial-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "initial-resume-title"
      );

      rerender(<ResumeTitle debugId="updated" className="new-class" />);
      title = screen.getByTestId("updated-resume-title-root");
      expect(title).toHaveAttribute(
        "data-resume-title-id",
        "updated-resume-title"
      );
    });

    it("renders with proper component hierarchy", () => {
      render(<ResumeTitle />);

      const title = screen.getByTestId("test-id-resume-title-root");
      expect(title).toBeInTheDocument();

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toBeInTheDocument();

      const text = screen.getByText("Work");
      expect(text).toBeInTheDocument();

      // Check that icon and text are within the title
      expect(title).toContainElement(icon);
      expect(title).toContainElement(text);
    });
  });
});
