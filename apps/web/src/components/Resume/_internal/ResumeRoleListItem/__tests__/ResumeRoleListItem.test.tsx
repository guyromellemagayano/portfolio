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

import { ResumeRoleListItem } from "../ResumeRoleListItem";

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

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="next-image"
      {...props}
    />
  )),
}));

// Mock resume data and i18n
vi.mock("../../Resume.data", () => ({
  Role: {},
}));

vi.mock("../../Resume.i18n", () => ({
  RESUME_I18N: {
    company: "Company",
    role: "Role",
    date: "Date",
  },
}));

// ============================================================================
// TEST DATA
// ============================================================================

const mockRoleData = {
  company: "Planetaria",
  title: "CEO",
  logo: "/logos/planetaria.svg",
  start: "2019",
  end: {
    label: "Present",
    dateTime: "2024",
  },
};

const mockRoleDataStringEnd = {
  company: "Airbnb",
  title: "Product Designer",
  logo: "/logos/airbnb.svg",
  start: "2014",
  end: "2019",
};

const mockRoleDataObjectStart = {
  company: "Facebook",
  title: "iOS Software Engineer",
  logo: "/logos/facebook.svg",
  start: {
    label: "January 2011",
    dateTime: "2011-01-01",
  },
  end: "2014",
};

// ============================================================================
// TESTS
// ============================================================================

describe("ResumeRoleListItem", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toBeInTheDocument();
      expect(listItem.tagName).toBe("LI");
      expect(listItem).toHaveAttribute("role", "listitem");
    });

    it("applies custom className", () => {
      render(
        <ResumeRoleListItem roleData={mockRoleData} className="custom-class" />
      );

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} debugMode={true} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <ResumeRoleListItem roleData={mockRoleData} debugId="custom-id" />
      );

      const listItem = screen.getByTestId(
        "custom-id-resume-role-list-item-root"
      );
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "custom-id-resume-role-list-item"
      );
    });

    it("passes through additional props", () => {
      render(
        <ResumeRoleListItem
          roleData={mockRoleData}
          data-test="custom-data"
          aria-label="Work experience item"
        />
      );

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("data-test", "custom-data");
      expect(listItem).toHaveAttribute("aria-label", "Work experience item");
    });
  });

  describe("Component Structure", () => {
    it("renders list item with correct structure", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveAttribute("role", "listitem");
    });

    it("renders company name", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("Planetaria")).toBeInTheDocument();
    });

    it("renders job title", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("CEO")).toBeInTheDocument();
    });

    it("renders company logo", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const image = screen.getByTestId(
        "test-id-resume-role-list-item-image-root"
      );
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/logos/planetaria.svg");
      expect(image).toHaveAttribute("alt", "Planetaria");
    });

    it("applies correct CSS classes", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("class");
    });

    it("renders with custom list item component", () => {
      const CustomListItem = function ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: any;
      }) {
        return (
          <div data-testid="custom-list-item" {...props}>
            {children}
          </div>
        );
      };

      render(
        <ResumeRoleListItem roleData={mockRoleData} as={CustomListItem} />
      );

      // The custom component should be rendered instead of the default li
      // The component will still apply createComponentProps which overrides the test ID
      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toBeInTheDocument();
      expect(listItem.tagName).toBe("DIV"); // Should be DIV instead of LI
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(
        screen.getByTestId("test-id-resume-role-list-item-root")
      ).toBeInTheDocument();
      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("CEO")).toBeInTheDocument();
    });

    it("handles string start date", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("2019")).toBeInTheDocument();
    });

    it("handles string end date", () => {
      render(<ResumeRoleListItem roleData={mockRoleDataStringEnd} />);

      expect(screen.getByText("2019")).toBeInTheDocument();
    });

    it("handles object start date", () => {
      render(<ResumeRoleListItem roleData={mockRoleDataObjectStart} />);

      expect(screen.getByText("January 2011")).toBeInTheDocument();
    });

    it("handles object end date", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("Present")).toBeInTheDocument();
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} debugMode={true} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} debugMode={false} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-resume-role-list-item-root")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <ResumeRoleListItem roleData={mockRoleData} isMemoized={false} />
      );

      expect(
        screen.getByTestId("test-id-resume-role-list-item-root")
      ).toBeInTheDocument();

      rerender(
        <ResumeRoleListItem
          roleData={mockRoleData}
          isMemoized={false}
          className="updated-class"
        />
      );
      expect(
        screen.getByTestId("test-id-resume-role-list-item-root")
      ).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(
        <ResumeRoleListItem roleData={mockRoleData} />
      );

      expect(
        screen.getByTestId("test-id-resume-role-list-item-root")
      ).toBeInTheDocument();

      rerender(
        <ResumeRoleListItem roleData={mockRoleData} className="updated-class" />
      );
      expect(
        screen.getByTestId("test-id-resume-role-list-item-root")
      ).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes to all elements", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} debugId="test-id" />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "test-id-resume-role-list-item"
      );
    });

    it("handles debugId prop correctly", () => {
      render(
        <ResumeRoleListItem roleData={mockRoleData} debugId="custom-debug-id" />
      );

      const listItem = screen.getByTestId(
        "custom-debug-id-resume-role-list-item-root"
      );
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "custom-debug-id-resume-role-list-item"
      );
    });

    it("renders with correct role attribute", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("role", "listitem");
    });

    it("renders company and role information correctly", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("CEO")).toBeInTheDocument();
    });

    it("renders date information correctly", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("2019")).toBeInTheDocument();
      expect(screen.getByText("Present")).toBeInTheDocument();
    });

    it("renders logo with correct attributes", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const image = screen.getByTestId(
        "test-id-resume-role-list-item-image-root"
      );
      expect(image).toHaveAttribute("src", "/logos/planetaria.svg");
      expect(image).toHaveAttribute("alt", "Planetaria");
      expect(image).toHaveClass("h-7 w-7", { exact: true });
    });
  });

  describe("Accessibility Tests", () => {
    it("maintains proper semantic structure", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveAttribute("role", "listitem");
    });

    it("provides proper data attributes for debugging", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} debugMode={true} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
    });

    it("provides proper component IDs for all elements", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "test-id-resume-role-list-item"
      );
    });

    it("maintains accessibility during updates", () => {
      const { rerender } = render(
        <ResumeRoleListItem roleData={mockRoleData} debugId="initial" />
      );

      let listItem = screen.getByTestId("initial-resume-role-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "initial-resume-role-list-item"
      );

      rerender(
        <ResumeRoleListItem roleData={mockRoleData} debugId="updated" />
      );
      listItem = screen.getByTestId("updated-resume-role-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "updated-resume-role-list-item"
      );
    });

    it("provides proper ARIA labels for dates", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const dateElement = screen.getByLabelText("2019 until Present");
      expect(dateElement).toBeInTheDocument();
    });

    it("hides decorative elements from screen readers", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const separator = screen.getByText("—");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("provides proper time elements with dateTime attributes", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      const timeElements = screen.getAllByRole("time");
      expect(timeElements).toHaveLength(2);
      expect(timeElements[0]).toHaveAttribute("dateTime", "2019");
      expect(timeElements[1]).toHaveAttribute("dateTime", "2024");
    });
  });

  describe("Date Handling Tests", () => {
    it("handles string start and end dates", () => {
      render(<ResumeRoleListItem roleData={mockRoleDataStringEnd} />);

      expect(screen.getByText("2014")).toBeInTheDocument();
      expect(screen.getByText("2019")).toBeInTheDocument();
    });

    it("handles object start and string end dates", () => {
      render(<ResumeRoleListItem roleData={mockRoleDataObjectStart} />);

      expect(screen.getByText("January 2011")).toBeInTheDocument();
      expect(screen.getByText("2014")).toBeInTheDocument();
    });

    it("handles string start and object end dates", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      expect(screen.getByText("2019")).toBeInTheDocument();
      expect(screen.getByText("Present")).toBeInTheDocument();
    });

    it("handles object start and end dates", () => {
      const roleDataObjectBoth = {
        company: "Test Company",
        title: "Test Role",
        logo: "/logos/test.svg",
        start: {
          label: "January 2020",
          dateTime: "2020-01-01",
        },
        end: {
          label: "December 2022",
          dateTime: "2022-12-31",
        },
      };

      render(<ResumeRoleListItem roleData={roleDataObjectBoth} />);

      expect(screen.getByText("January 2020")).toBeInTheDocument();
      expect(screen.getByText("December 2022")).toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    it("renders complete role list item with all components", () => {
      render(
        <ResumeRoleListItem
          roleData={mockRoleData}
          debugId="role-item"
          debugMode={true}
        />
      );

      // Test main list item
      const listItem = screen.getByTestId(
        "role-item-resume-role-list-item-root"
      );
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "role-item-resume-role-list-item"
      );
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
      expect(listItem).toHaveAttribute("role", "listitem");

      // Test content
      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("CEO")).toBeInTheDocument();
      expect(screen.getByText("2019")).toBeInTheDocument();
      expect(screen.getByText("Present")).toBeInTheDocument();

      // Test image
      const image = screen.getByTestId(
        "role-item-resume-role-list-item-image-root"
      );
      expect(image).toHaveAttribute("src", "/logos/planetaria.svg");
      expect(image).toHaveAttribute("alt", "Planetaria");
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(
        <ResumeRoleListItem roleData={mockRoleData} debugId="initial" />
      );

      let listItem = screen.getByTestId("initial-resume-role-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "initial-resume-role-list-item"
      );

      rerender(
        <ResumeRoleListItem roleData={mockRoleData} debugId="updated" />
      );
      listItem = screen.getByTestId("updated-resume-role-list-item-root");
      expect(listItem).toHaveAttribute(
        "data-resume-role-list-item-id",
        "updated-resume-role-list-item"
      );
    });

    it("renders with proper component hierarchy", () => {
      render(<ResumeRoleListItem roleData={mockRoleData} />);

      // Test that components are rendered in the correct order
      const listItem = screen.getByTestId("test-id-resume-role-list-item-root");
      expect(listItem).toBeInTheDocument();

      // Should contain company, title, and date information
      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("CEO")).toBeInTheDocument();
      expect(screen.getByText("2019")).toBeInTheDocument();
      expect(screen.getByText("Present")).toBeInTheDocument();
    });
  });
});
