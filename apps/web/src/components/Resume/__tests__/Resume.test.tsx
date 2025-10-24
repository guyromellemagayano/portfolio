// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Orchestrator
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Resume } from "../Resume";

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

// Mock internal components
vi.mock("../_internal", () => ({
  ResumeTitle: vi.fn(({ debugId, debugMode, ...props }) => (
    <div
      data-testid="resume-title"
      data-title-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      Resume Title
    </div>
  )),
  ResumeRoleList: vi.fn(({ debugId, debugMode, ...props }) => (
    <div
      data-testid="resume-role-list"
      data-role-list-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      Resume Role List
    </div>
  )),
  ResumeDownloadButton: vi.fn(({ debugId, debugMode, ...props }) => (
    <div
      data-testid="resume-download-button"
      data-download-button-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      Resume Download Button
    </div>
  )),
}));

// ============================================================================
// TESTS
// ============================================================================

describe("Resume", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(<Resume className="custom-class" />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<Resume debugMode={true} />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(<Resume debugId="custom-id" />);

      const resume = screen.getByTestId("custom-id-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "custom-id-resume");
    });

    it("passes through additional props", () => {
      render(<Resume data-test="custom-data" aria-label="Resume section" />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("data-test", "custom-data");
      expect(resume).toHaveAttribute("aria-label", "Resume section");
    });
  });

  describe("Component Structure", () => {
    it("renders container with correct structure", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("DIV");
    });

    it("renders all internal components", () => {
      render(<Resume />);

      expect(screen.getByTestId("resume-title")).toBeInTheDocument();
      expect(screen.getByTestId("resume-role-list")).toBeInTheDocument();
      expect(screen.getByTestId("resume-download-button")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("class");
    });

    it("renders with custom container component", () => {
      const CustomContainer = function ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: any;
      }) {
        return (
          <section data-testid="custom-container" {...props}>
            {children}
          </section>
        );
      };

      render(<Resume as={CustomContainer} />);

      // The custom component should be rendered instead of the default div
      // The component will still apply createComponentProps which overrides the test ID
      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("SECTION"); // Should be SECTION instead of DIV
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<Resume />);

      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();
      expect(screen.getByTestId("resume-title")).toBeInTheDocument();
      expect(screen.getByTestId("resume-role-list")).toBeInTheDocument();
      expect(screen.getByTestId("resume-download-button")).toBeInTheDocument();
    });

    it("renders with custom container element", () => {
      render(<Resume as="section" />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume.tagName).toBe("SECTION");
    });

    it("renders with custom container element as article", () => {
      render(<Resume as="article" />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume.tagName).toBe("ARTICLE");
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<Resume debugMode={true} />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("data-debug-mode", "true");

      // Check that debug mode is passed to all internal components
      const title = screen.getByTestId("resume-title");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const roleList = screen.getByTestId("resume-role-list");
      expect(roleList).toHaveAttribute("data-debug-mode", "true");

      const downloadButton = screen.getByTestId("resume-download-button");
      expect(downloadButton).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<Resume debugMode={false} />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).not.toHaveAttribute("data-debug-mode");

      // Check that debug mode is not passed to internal components
      const title = screen.getByTestId("resume-title");
      expect(title).not.toHaveAttribute("data-debug-mode");

      const roleList = screen.getByTestId("resume-role-list");
      expect(roleList).not.toHaveAttribute("data-debug-mode");

      const downloadButton = screen.getByTestId("resume-download-button");
      expect(downloadButton).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).not.toHaveAttribute("data-debug-mode");

      // Check that debug mode is not passed to internal components
      const title = screen.getByTestId("resume-title");
      expect(title).not.toHaveAttribute("data-debug-mode");

      const roleList = screen.getByTestId("resume-role-list");
      expect(roleList).not.toHaveAttribute("data-debug-mode");

      const downloadButton = screen.getByTestId("resume-download-button");
      expect(downloadButton).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Resume isMemoized={true} />);

      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<Resume isMemoized={false} />);

      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();

      rerender(<Resume isMemoized={false} className="updated-class" />);
      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(<Resume />);

      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();

      rerender(<Resume className="updated-class" />);
      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes to all elements", () => {
      render(<Resume debugId="test-id" />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "test-id-resume");
    });

    it("handles debugId prop correctly", () => {
      render(<Resume debugId="custom-debug-id" />);

      const resume = screen.getByTestId("custom-debug-id-resume-root");
      expect(resume).toHaveAttribute(
        "data-resume-id",
        "custom-debug-id-resume"
      );
    });

    it("passes correct props to internal components", () => {
      render(<Resume debugId="parent-id" debugMode={true} />);

      // Check that all internal components receive the correct props
      const title = screen.getByTestId("resume-title");
      expect(title).toHaveAttribute("data-title-id", "parent-id");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const roleList = screen.getByTestId("resume-role-list");
      expect(roleList).toHaveAttribute("data-role-list-id", "parent-id");
      expect(roleList).toHaveAttribute("data-debug-mode", "true");

      const downloadButton = screen.getByTestId("resume-download-button");
      expect(downloadButton).toHaveAttribute(
        "data-download-button-id",
        "parent-id"
      );
      expect(downloadButton).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders all internal components in correct order", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      const title = screen.getByTestId("resume-title");
      const roleList = screen.getByTestId("resume-role-list");
      const downloadButton = screen.getByTestId("resume-download-button");

      // Check that all components are within the resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(roleList);
      expect(resume).toContainElement(downloadButton);

      // Check order (title should come before role list, role list before download button)
      const children = Array.from(resume.children);
      expect(children[0]).toBe(title);
      expect(children[1]).toBe(roleList);
      expect(children[2]).toBe(downloadButton);
    });
  });

  describe("Accessibility Tests", () => {
    it("maintains proper semantic structure", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("DIV");
    });

    it("provides proper data attributes for debugging", () => {
      render(<Resume debugMode={true} />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
    });

    it("provides proper component IDs for all elements", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "test-id-resume");
    });

    it("maintains accessibility during updates", () => {
      const { rerender } = render(<Resume debugId="initial" />);

      let resume = screen.getByTestId("initial-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "initial-resume");

      rerender(<Resume debugId="updated" />);
      resume = screen.getByTestId("updated-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "updated-resume");
    });

    it("renders with proper container structure", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("DIV");
    });
  });

  describe("Integration Tests", () => {
    it("renders complete resume with all components", () => {
      render(<Resume debugId="resume-test" debugMode={true} />);

      // Test main resume container
      const resume = screen.getByTestId("resume-test-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("DIV");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
      expect(resume).toHaveAttribute("data-resume-id", "resume-test-resume");

      // Test all internal components
      const title = screen.getByTestId("resume-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("data-title-id", "resume-test");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const roleList = screen.getByTestId("resume-role-list");
      expect(roleList).toBeInTheDocument();
      expect(roleList).toHaveAttribute("data-role-list-id", "resume-test");
      expect(roleList).toHaveAttribute("data-debug-mode", "true");

      const downloadButton = screen.getByTestId("resume-download-button");
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toHaveAttribute(
        "data-download-button-id",
        "resume-test"
      );
      expect(downloadButton).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(<Resume debugId="initial" />);

      let resume = screen.getByTestId("initial-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "initial-resume");

      rerender(<Resume debugId="updated" className="new-class" />);
      resume = screen.getByTestId("updated-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "updated-resume");
    });

    it("renders with proper component hierarchy", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();

      const title = screen.getByTestId("resume-title");
      const roleList = screen.getByTestId("resume-role-list");
      const downloadButton = screen.getByTestId("resume-download-button");

      // Check that all components are within the resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(roleList);
      expect(resume).toContainElement(downloadButton);

      // Check that components are rendered in the correct order
      const children = Array.from(resume.children);
      expect(children[0]).toBe(title);
      expect(children[1]).toBe(roleList);
      expect(children[2]).toBe(downloadButton);
    });

    it("maintains component structure during updates", () => {
      const { rerender } = render(<Resume debugId="structure-test" />);

      let resume = screen.getByTestId("structure-test-resume-root");
      expect(resume).toBeInTheDocument();

      // Update with new props
      rerender(<Resume debugId="structure-test" className="updated-class" />);

      resume = screen.getByTestId("structure-test-resume-root");
      expect(resume).toBeInTheDocument();

      // Verify all internal components are still present
      expect(screen.getByTestId("resume-title")).toBeInTheDocument();
      expect(screen.getByTestId("resume-role-list")).toBeInTheDocument();
      expect(screen.getByTestId("resume-download-button")).toBeInTheDocument();
    });
  });
});
