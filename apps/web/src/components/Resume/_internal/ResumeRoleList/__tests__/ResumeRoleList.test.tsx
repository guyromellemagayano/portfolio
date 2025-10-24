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

import { ResumeRoleList } from "../ResumeRoleList";

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

// Mock ResumeRoleListItem component
vi.mock("@web/components/Resume/_internal", () => ({
  ResumeRoleListItem: vi.fn(({ roleData, debugId, debugMode, ...props }) => (
    <li
      data-testid="resume-role-list-item"
      role="listitem"
      data-role-list-item-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      data-company={roleData.company}
      data-title={roleData.title}
      {...props}
    >
      {roleData.company} - {roleData.title}
    </li>
  )),
}));

// Mock resume data
vi.mock("../../Resume.data", () => ({
  RESUME_DATA: [
    {
      company: "Planetaria",
      title: "CEO",
      logo: "/logos/planetaria.svg",
      start: "2019",
      end: {
        label: "Present",
        dateTime: "2024",
      },
    },
    {
      company: "Airbnb",
      title: "Product Designer",
      logo: "/logos/airbnb.svg",
      start: "2014",
      end: "2019",
    },
    {
      company: "Facebook",
      title: "iOS Software Engineer",
      logo: "/logos/facebook.svg",
      start: "2011",
      end: "2014",
    },
    {
      company: "Starbucks",
      title: "Shift Supervisor",
      logo: "/logos/starbucks.svg",
      start: "2008",
      end: "2011",
    },
  ],
}));

// ============================================================================
// TESTS
// ============================================================================

describe("ResumeRoleList", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("OL");
      expect(list).toHaveAttribute("role", "list");
    });

    it("applies custom className", () => {
      render(<ResumeRoleList className="custom-class" />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<ResumeRoleList debugMode={true} />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(<ResumeRoleList debugId="custom-id" />);

      const list = screen.getByTestId("custom-id-resume-role-list-root");
      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "custom-id-resume-role-list"
      );
    });

    it("passes through additional props", () => {
      render(
        <ResumeRoleList data-test="custom-data" aria-label="Work experience" />
      );

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toHaveAttribute("data-test", "custom-data");
      expect(list).toHaveAttribute("aria-label", "Work experience");
    });
  });

  describe("Component Structure", () => {
    it("renders list with correct structure", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute("role", "list");
    });

    it("renders all role list items", () => {
      render(<ResumeRoleList />);

      const roleItems = screen.getAllByTestId("resume-role-list-item");
      expect(roleItems).toHaveLength(4);
    });

    it("renders role items with correct data", () => {
      render(<ResumeRoleList />);

      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(roleItems[0]).toHaveAttribute("data-company", "Planetaria");
      expect(roleItems[0]).toHaveAttribute("data-title", "CEO");

      expect(roleItems[1]).toHaveAttribute("data-company", "Airbnb");
      expect(roleItems[1]).toHaveAttribute("data-title", "Product Designer");

      expect(roleItems[2]).toHaveAttribute("data-company", "Facebook");
      expect(roleItems[2]).toHaveAttribute(
        "data-title",
        "iOS Software Engineer"
      );

      expect(roleItems[3]).toHaveAttribute("data-company", "Starbucks");
      expect(roleItems[3]).toHaveAttribute("data-title", "Shift Supervisor");
    });

    it("applies correct CSS classes", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toHaveAttribute("class");
    });

    it("renders role items with correct keys", () => {
      render(<ResumeRoleList />);

      const roleItems = screen.getAllByTestId("resume-role-list-item");
      expect(roleItems).toHaveLength(4);

      // Each item should have the correct company and title data attributes
      expect(roleItems[0]).toHaveAttribute("data-company", "Planetaria");
      expect(roleItems[1]).toHaveAttribute("data-company", "Airbnb");
      expect(roleItems[2]).toHaveAttribute("data-company", "Facebook");
      expect(roleItems[3]).toHaveAttribute("data-company", "Starbucks");
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<ResumeRoleList />);

      expect(
        screen.getByTestId("test-id-resume-role-list-root")
      ).toBeInTheDocument();
      expect(screen.getAllByTestId("resume-role-list-item")).toHaveLength(4);
    });

    it("renders with custom list component", () => {
      const CustomList = function ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: any;
      }) {
        return (
          <ul data-testid="custom-list" {...props}>
            {children}
          </ul>
        );
      };

      render(<ResumeRoleList as={CustomList} />);

      // The custom component should be rendered instead of the default ol
      // The component will still apply createComponentProps which overrides the test ID
      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("UL"); // Should be UL instead of OL
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ResumeRoleList debugMode={true} />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).toHaveAttribute("data-debug-mode", "true");
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("data-debug-mode", "true");
      });
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ResumeRoleList debugMode={false} />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).not.toHaveAttribute("data-debug-mode");
      roleItems.forEach((item) => {
        expect(item).not.toHaveAttribute("data-debug-mode");
      });
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).not.toHaveAttribute("data-debug-mode");
      roleItems.forEach((item) => {
        expect(item).not.toHaveAttribute("data-debug-mode");
      });
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<ResumeRoleList isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-resume-role-list-root")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<ResumeRoleList isMemoized={false} />);

      expect(
        screen.getByTestId("test-id-resume-role-list-root")
      ).toBeInTheDocument();

      rerender(<ResumeRoleList isMemoized={false} className="updated-class" />);
      expect(
        screen.getByTestId("test-id-resume-role-list-root")
      ).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(<ResumeRoleList />);

      expect(
        screen.getByTestId("test-id-resume-role-list-root")
      ).toBeInTheDocument();

      rerender(<ResumeRoleList className="updated-class" />);
      expect(
        screen.getByTestId("test-id-resume-role-list-root")
      ).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes to all elements", () => {
      render(<ResumeRoleList debugId="test-id" />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "test-id-resume-role-list"
      );
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("data-role-list-item-id", "test-id");
      });
    });

    it("handles debugId prop correctly", () => {
      render(<ResumeRoleList debugId="custom-debug-id" />);

      const list = screen.getByTestId("custom-debug-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "custom-debug-id-resume-role-list"
      );
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute(
          "data-role-list-item-id",
          "custom-debug-id"
        );
      });
    });

    it("renders with correct role attribute", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toHaveAttribute("role", "list");
    });

    it("renders role items with correct role attribute", () => {
      render(<ResumeRoleList />);

      const roleItems = screen.getAllByTestId("resume-role-list-item");
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("role", "listitem");
      });
    });

    it("passes correct props to ResumeRoleListItem components", () => {
      render(<ResumeRoleList debugId="test-id" debugMode={true} />);

      const roleItems = screen.getAllByTestId("resume-role-list-item");

      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("data-role-list-item-id", "test-id");
        expect(item).toHaveAttribute("data-debug-mode", "true");
      });
    });
  });

  describe("Accessibility Tests", () => {
    it("maintains proper semantic structure", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute("role", "list");
      expect(roleItems).toHaveLength(4);
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("role", "listitem");
      });
    });

    it("provides proper data attributes for debugging", () => {
      render(<ResumeRoleList debugMode={true} />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).toHaveAttribute("data-debug-mode", "true");
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("data-debug-mode", "true");
      });
    });

    it("provides proper component IDs for all elements", () => {
      render(<ResumeRoleList />);

      const list = screen.getByTestId("test-id-resume-role-list-root");
      const roleItems = screen.getAllByTestId("resume-role-list-item");

      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "test-id-resume-role-list"
      );
      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("data-role-list-item-id", "test-id");
      });
    });

    it("maintains accessibility during updates", () => {
      const { rerender } = render(<ResumeRoleList debugId="initial" />);

      let list = screen.getByTestId("initial-resume-role-list-root");
      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "initial-resume-role-list"
      );

      rerender(<ResumeRoleList debugId="updated" />);
      list = screen.getByTestId("updated-resume-role-list-root");
      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "updated-resume-role-list"
      );
    });
  });

  describe("Integration Tests", () => {
    it("renders complete role list with all components", () => {
      render(<ResumeRoleList debugId="role-list" debugMode={true} />);

      // Test main list
      const list = screen.getByTestId("role-list-resume-role-list-root");
      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "role-list-resume-role-list"
      );
      expect(list).toHaveAttribute("data-debug-mode", "true");
      expect(list).toHaveAttribute("role", "list");

      // Test role items
      const roleItems = screen.getAllByTestId("resume-role-list-item");
      expect(roleItems).toHaveLength(4);

      roleItems.forEach((item) => {
        expect(item).toHaveAttribute("data-role-list-item-id", "role-list");
        expect(item).toHaveAttribute("data-debug-mode", "true");
        expect(item).toHaveAttribute("role", "listitem");
      });
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(<ResumeRoleList debugId="initial" />);

      let list = screen.getByTestId("initial-resume-role-list-root");
      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "initial-resume-role-list"
      );

      rerender(<ResumeRoleList debugId="updated" />);
      list = screen.getByTestId("updated-resume-role-list-root");
      expect(list).toHaveAttribute(
        "data-resume-role-list-id",
        "updated-resume-role-list"
      );
    });

    it("renders with proper component hierarchy", () => {
      render(<ResumeRoleList />);

      // Test that components are rendered in the correct order
      const list = screen.getByTestId("test-id-resume-role-list-root");
      expect(list).toBeInTheDocument();

      // List should contain role items
      const roleItems = screen.getAllByTestId("resume-role-list-item");
      expect(roleItems).toHaveLength(4);
    });
  });
});
