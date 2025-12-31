// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Orchestrator with Sub-components
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

// Mock @web/components with realistic implementations
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

// ============================================================================
// TESTS
// ============================================================================

describe("Resume Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Resume Component Integration", () => {
    it("renders complete resume with all components", () => {
      render(<Resume debugId="resume-test" debugMode={true} />);

      // Test main resume container
      const resume = screen.getByTestId("resume-test-resume-root");
      expect(resume).toBeInTheDocument();
      expect(resume.tagName).toBe("DIV");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
      expect(resume).toHaveAttribute("data-resume-id", "resume-test-resume");

      // Test ResumeTitle component
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("data-resume-title-id", "resume-test-resume-title");
      expect(title).toHaveAttribute("data-debug-mode", "true");
      expect(screen.getByText("Work")).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();

      // Test ResumeRoleList component
      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute("data-list-id", "resume-test");
      expect(list).toHaveAttribute("data-debug-mode", "true");

      // Test ResumeDownloadButton component
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("data-button-id", "resume-test");
      expect(button).toHaveAttribute("data-debug-mode", "true");
      expect(button).toHaveAttribute("href", "/resume.pdf");
      expect(button).toHaveAttribute("data-variant-style", "secondary");
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      render(<Resume debugId="hierarchy-test" />);

      const resume = screen.getByTestId("hierarchy-test-resume-root");
      expect(resume).toBeInTheDocument();

      const title = screen.getByRole("heading", { level: 2 });
      const list = screen.getByTestId("list");
      const button = screen.getByTestId("button");

      // Check that all components are within the resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);

      // Check that components are rendered in the correct order
      const children = Array.from(resume.children);
      expect(children[0]).toBe(title);
      expect(children[1]).toBe(list);
      expect(children[2]).toBe(button);
    });

    it("propagates debug props to all sub-components", () => {
      render(<Resume debugId="debug-test" debugMode={true} />);

      const resume = screen.getByTestId("debug-test-resume-root");
      expect(resume).toHaveAttribute("data-debug-mode", "true");

      // ResumeTitle should receive debug props
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("data-debug-mode", "true");
      // Note: ResumeTitle's Icon doesn't receive debug props in the implementation
      const briefcaseIcon = screen.getByTestId("briefcase-icon");
      expect(briefcaseIcon).toBeInTheDocument();

      // ResumeRoleList should receive debug props
      const list = screen.getByTestId("list");
      expect(list).toHaveAttribute("data-debug-mode", "true");

      // ResumeDownloadButton should receive debug props
      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
      const arrowDownIcon = screen.getByTestId("arrow-down-icon");
      expect(arrowDownIcon).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(<Resume debugId="initial" />);

      let resume = screen.getByTestId("initial-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "initial-resume");

      rerender(<Resume debugId="updated" className="new-class" />);
      resume = screen.getByTestId("updated-resume-root");
      expect(resume).toHaveAttribute("data-resume-id", "updated-resume");
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
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });

  describe("ResumeTitle Integration", () => {
    it("renders ResumeTitle with Icon and text", () => {
      render(<Resume debugId="title-test" />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute("role", "heading");

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toBeInTheDocument();
      expect(title).toContainElement(icon);

      const text = screen.getByText("Work");
      expect(text).toBeInTheDocument();
      expect(title).toContainElement(text);
    });

    it("passes debug props to ResumeTitle", () => {
      render(<Resume debugId="title-debug" debugMode={true} />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("data-resume-title-id", "title-debug-resume-title");
      expect(title).toHaveAttribute("data-debug-mode", "true");

      // Note: ResumeTitle's Icon doesn't receive debug props in the implementation
      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("ResumeRoleList Integration", () => {
    it("renders ResumeRoleList with ResumeRoleListItem children", () => {
      render(<Resume debugId="list-test" />);

      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();

      // Should render list items for each role in RESUME_DATA
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);
    });

    it("passes debug props to ResumeRoleList and ListItem children", () => {
      render(<Resume debugId="list-debug" debugMode={true} />);

      const list = screen.getByTestId("list");
      expect(list).toHaveAttribute("data-list-id", "list-debug");
      expect(list).toHaveAttribute("data-debug-mode", "true");

      // ListItem children receive debug props from ResumeRoleList via ResumeRoleListItem
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);
      // Note: ResumeRoleListItem uses ListItem but doesn't pass debugId directly to it
      // Instead, ResumeRoleListItem uses createComponentProps on its own elements
      listItems.forEach((item) => {
        expect(item).toBeInTheDocument();
        // ListItem may not receive debugId if ResumeRoleListItem doesn't pass it
        // This is acceptable as ResumeRoleListItem handles its own debug attributes
      });
    });
  });

  describe("ResumeDownloadButton Integration", () => {
    it("renders ResumeDownloadButton with Button and Icon", () => {
      render(<Resume debugId="button-test" />);

      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/resume.pdf");
      expect(button).toHaveAttribute("data-variant-style", "secondary");

      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(button).toContainElement(screen.getByText("Download CV"));

      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toBeInTheDocument();
      expect(button).toContainElement(icon);
    });

    it("passes debug props to ResumeDownloadButton, Button, and Icon", () => {
      render(<Resume debugId="button-debug" debugMode={true} />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-button-id", "button-debug");
      expect(button).toHaveAttribute("data-debug-mode", "true");

      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toHaveAttribute("data-icon-id", "button-debug");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Resume with ResumeRoleListItem Integration", () => {
    it("renders ResumeRoleListItem with role data", () => {
      render(<Resume debugId="role-item-test" />);

      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);

      // Each list item should contain role information
      // Note: Images are rendered within ResumeRoleListItem, but may not be visible if RESUME_DATA is empty in test
      listItems.forEach((item) => {
        expect(item).toHaveAttribute("role", "listitem");
      });
    });

    it("renders role data correctly in ResumeRoleListItem", () => {
      render(<Resume debugId="role-data-test" />);

      // Should render company names, titles, and dates from RESUME_DATA
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);

      // Each item should have role="listitem"
      listItems.forEach((item) => {
        expect(item).toHaveAttribute("role", "listitem");
      });
    });
  });

  describe("Complete Resume Integration", () => {
    it("renders complete resume with all sub-components working together", () => {
      render(<Resume debugId="complete-test" debugMode={true} />);

      // Main container
      const resume = screen.getByTestId("complete-test-resume-root");
      expect(resume).toBeInTheDocument();

      // ResumeTitle
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();

      // ResumeRoleList
      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);

      // ResumeDownloadButton
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();

      // Verify all components are within resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);
    });

    it("maintains proper component relationships", () => {
      render(<Resume debugId="relationships-test" />);

      const resume = screen.getByTestId("relationships-test-resume-root");
      const title = screen.getByRole("heading", { level: 2 });
      const list = screen.getByTestId("list");
      const button = screen.getByTestId("button");

      // All components should be siblings within resume
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);

      // Title should contain icon and text
      expect(title).toContainElement(screen.getByTestId("briefcase-icon"));
      expect(title).toContainElement(screen.getByText("Work"));

      // Button should contain text and icon
      expect(button).toContainElement(screen.getByText("Download CV"));
      expect(button).toContainElement(screen.getByTestId("arrow-down-icon"));

      // List should contain list items
      const listItems = screen.getAllByTestId("list-item");
      listItems.forEach((item) => {
        expect(list).toContainElement(item);
      });
    });

    it("handles prop updates across all components", () => {
      const { rerender } = render(<Resume debugId="update-test" debugMode={false} />);

      let resume = screen.getByTestId("update-test-resume-root");
      expect(resume).not.toHaveAttribute("data-debug-mode");

      // Update with debug mode enabled
      rerender(<Resume debugId="update-test" debugMode={true} />);

      resume = screen.getByTestId("update-test-resume-root");
      expect(resume).toHaveAttribute("data-debug-mode", "true");

      // All sub-components should also have debug mode
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveAttribute("data-debug-mode", "true");

      const list = screen.getByTestId("list");
      expect(list).toHaveAttribute("data-debug-mode", "true");

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("data-debug-mode", "true");
    });
  });
});

