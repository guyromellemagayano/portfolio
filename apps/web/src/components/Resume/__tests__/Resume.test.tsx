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
vi.mock("@guyromellemagayano/utils", async () => {
  const actual = await vi.importActual("@guyromellemagayano/utils");
  return {
    ...actual,
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
  };
});

// Mock @web/utils
vi.mock("@web/utils", async () => {
  const actual = await vi.importActual("@web/utils");
  return {
    ...actual,
    cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  };
});

// Mock @web/components
vi.mock("@web/components", async () => {
  const actual = await vi.importActual("@web/components");
  return {
    ...actual,
    Button: vi.fn(
      ({ children, className, href, variantStyle, debugId, debugMode, ...props }) => (
        <a
          data-testid="button"
          href={href}
          className={className}
          data-button-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          data-variant-style={variantStyle}
          {...props}
        >
          {children}
        </a>
      )
    ),
    Icon: vi.fn(({ name, className, debugId, debugMode, ...props }) => {
      const iconMap: Record<string, string> = {
        "arrow-down": "arrow-down-icon",
        briefcase: "briefcase-icon",
      };
      const testId = iconMap[name as string] || "icon";
      return (
        <svg
          data-testid={testId}
          className={className}
          data-icon-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...props}
        >
          {name}
        </svg>
      );
    }),
    List: vi.fn(
      ({ children, className, debugId, debugMode, ...props }) => (
        <ol
          data-testid="list"
          className={className}
          data-list-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...props}
        >
          {children}
        </ol>
      )
    ),
    ListItem: vi.fn(
      ({ children, className, role, debugId, debugMode, ...props }) => (
        <li
          data-testid="list-item"
          className={className}
          role={role}
          data-list-item-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...props}
        >
          {children}
        </li>
      )
    ),
  };
});

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : ""}
      alt={alt}
      className={className}
      data-testid="next-image"
      {...props}
    />
  )),
}));

// Mock Resume i18n and data (these are internal to Resume.tsx)
// We don't need to mock them since they're constants in the component file

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

      // ResumeTitle renders as h2 with briefcase icon
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();

      // ResumeRoleList renders as list
      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();

      // ResumeDownloadButton renders as button
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Download CV")).toBeInTheDocument();
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

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("SECTION");
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<Resume />);

      expect(screen.getByTestId("test-id-resume-root")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
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
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const list = screen.getByTestId("list");
      expect(list).toHaveAttribute("data-debug-mode", "true");

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<Resume debugMode={false} />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).not.toHaveAttribute("data-debug-mode");

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).not.toHaveAttribute("data-debug-mode");

      const list = screen.getByTestId("list");
      expect(list).not.toHaveAttribute("data-debug-mode");

      const button = screen.getByTestId("button");
      expect(button).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      expect(resume).not.toHaveAttribute("data-debug-mode");

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).not.toHaveAttribute("data-debug-mode");

      const list = screen.getByTestId("list");
      expect(list).not.toHaveAttribute("data-debug-mode");

      const button = screen.getByTestId("button");
      expect(button).not.toHaveAttribute("data-debug-mode");
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
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("data-resume-title-id", "parent-id-resume-title");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const list = screen.getByTestId("list");
      expect(list).toHaveAttribute("data-list-id", "parent-id");
      expect(list).toHaveAttribute("data-debug-mode", "true");

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "parent-id");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders all internal components in correct order", () => {
      render(<Resume />);

      const resume = screen.getByTestId("test-id-resume-root");
      const title = screen.getByRole("heading", { level: 2 });
      const list = screen.getByTestId("list");
      const button = screen.getByTestId("button");

      // Check that all components are within the resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);

      // Check order (title should come before list, list before button)
      const children = Array.from(resume.children);
      expect(children[0]).toBe(title);
      expect(children[1]).toBe(list);
      expect(children[2]).toBe(button);
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
});
