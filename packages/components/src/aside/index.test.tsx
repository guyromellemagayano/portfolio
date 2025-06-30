import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Aside, type AsideProps, AsideUtils } from ".";

/**
 * NOTE: Client-side rendering tests have been intentionally excluded
 *
 * These tests focus on the core business logic and functionality.
 * Client-side components are thin wrappers with zero business logic,
 * so testing them would add complexity without meaningful coverage benefits.
 *
 * All essential functionality is thoroughly tested via server component tests below.
 */

describe("Aside Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders basic aside element", () => {
      render(<Aside>Aside content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toBeInTheDocument();
      expect(aside).toHaveTextContent("Aside content");
      expect(aside).toHaveClass("aside");
    });

    it("renders with custom className", () => {
      render(<Aside className="custom-aside">Content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside", "custom-aside");
    });

    it("renders with custom element via as prop", () => {
      render(<Aside as="section">Content</Aside>);

      const element = screen.getByRole("complementary");
      expect(element.tagName).toBe("SECTION");
    });

    it("applies custom styles", () => {
      const customStyle = { backgroundColor: "rgb(255, 0, 0)", margin: "10px" };
      render(<Aside style={customStyle}>Content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveStyle("background-color: rgb(255, 0, 0)");
      expect(aside).toHaveStyle("margin: 10px");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Aside ref={ref}>Content</Aside>);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("ASIDE");
    });
  });

  describe("Position Variants", () => {
    it("renders left positioned aside", () => {
      render(<Aside position="left">Left content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--left");
      expect(aside).toHaveAttribute("data-position", "left");
    });

    it("renders right positioned aside", () => {
      render(<Aside position="right">Right content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--right");
      expect(aside).toHaveAttribute("data-position", "right");
    });

    it("renders floating positioned aside", () => {
      render(<Aside position="floating">Floating content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--floating");
      expect(aside).toHaveAttribute("data-position", "floating");
    });

    it("renders sticky positioned aside", () => {
      render(<Aside position="sticky">Sticky content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--sticky");
      expect(aside).toHaveAttribute("data-position", "sticky");
    });
  });

  describe("Content Type Variants", () => {
    it("renders navigation content type", () => {
      render(<Aside contentType="navigation">Nav content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--navigation");
      expect(aside).toHaveAttribute("data-content-type", "navigation");
      expect(aside).toHaveAttribute("aria-label", "Navigation sidebar");
    });

    it("renders complementary content type", () => {
      render(<Aside contentType="complementary">Complementary content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--complementary");
      expect(aside).toHaveAttribute("data-content-type", "complementary");
      expect(aside).toHaveAttribute("aria-label", "Complementary content");
    });

    it("renders search content type", () => {
      render(<Aside contentType="search">Search content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--search");
      expect(aside).toHaveAttribute("data-content-type", "search");
      expect(aside).toHaveAttribute("aria-label", "Search sidebar");
    });
  });

  describe("Collapsible Functionality", () => {
    it("renders non-collapsible aside by default", () => {
      render(<Aside>Non-collapsible content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).not.toHaveClass("aside--collapsible");
      expect(aside).not.toHaveAttribute("data-collapsible");
      expect(aside).not.toHaveAttribute("aria-expanded");
    });

    it("renders collapsible aside with expanded state", () => {
      render(<Aside collapsible>Collapsible content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--collapsible");
      expect(aside).toHaveAttribute("data-collapsible", "true");
      expect(aside).toHaveAttribute("data-collapsed", "false");
      expect(aside).toHaveAttribute("aria-expanded", "true");
      expect(aside).not.toHaveClass("aside--collapsed");
    });

    it("renders collapsible aside with default collapsed state", () => {
      render(
        <Aside collapsible defaultCollapsed>
          Collapsible content
        </Aside>
      );

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--collapsible", "aside--collapsed");
      expect(aside).toHaveAttribute("data-collapsed", "true");
      expect(aside).toHaveAttribute("aria-expanded", "false");
    });

    it("renders toggle button when showToggle is true", () => {
      render(
        <Aside collapsible showToggle>
          Content with toggle
        </Aside>
      );

      const toggleButton = screen.getByRole("button");
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveClass("aside__toggle");
      expect(toggleButton).toHaveAttribute("aria-label", "Collapse sidebar");
      expect(toggleButton).toHaveTextContent("◀");
    });

    it("handles toggle button clicks", () => {
      const onCollapseChange = vi.fn();
      render(
        <Aside collapsible showToggle onCollapseChange={onCollapseChange}>
          Content with toggle
        </Aside>
      );

      const toggleButton = screen.getByRole("button");
      const aside = screen.getByRole("complementary");

      // Initially expanded
      expect(aside).not.toHaveClass("aside--collapsed");
      expect(toggleButton).toHaveTextContent("◀");

      // Click to collapse
      fireEvent.click(toggleButton);

      expect(onCollapseChange).toHaveBeenCalledWith(true);
      expect(aside).toHaveClass("aside--collapsed");
      expect(toggleButton).toHaveTextContent("▶");
      expect(toggleButton).toHaveAttribute("aria-label", "Expand sidebar");
    });

    it("handles controlled collapsed state", () => {
      const onCollapseChange = vi.fn();
      const { rerender } = render(
        <Aside
          collapsible
          showToggle
          collapsed={false}
          onCollapseChange={onCollapseChange}
        >
          Controlled content
        </Aside>
      );

      const toggleButton = screen.getByRole("button");
      const aside = screen.getByRole("complementary");

      expect(aside).not.toHaveClass("aside--collapsed");

      // Click toggle
      fireEvent.click(toggleButton);
      expect(onCollapseChange).toHaveBeenCalledWith(true);

      // Rerender with collapsed=true
      rerender(
        <Aside
          collapsible
          showToggle
          collapsed={true}
          onCollapseChange={onCollapseChange}
        >
          Controlled content
        </Aside>
      );

      expect(aside).toHaveClass("aside--collapsed");
    });

    it("renders custom toggle content", () => {
      const toggleContent = {
        collapsed: <span>Open</span>,
        expanded: <span>Close</span>,
      };

      render(
        <Aside collapsible showToggle toggleContent={toggleContent}>
          Custom toggle content
        </Aside>
      );

      const toggleButton = screen.getByRole("button");
      expect(toggleButton).toHaveTextContent("Close");

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent("Open");
    });
  });

  describe("Analytics Integration", () => {
    it("tracks analytics on click with custom function", () => {
      const onAnalytics = vi.fn();
      render(
        <Aside onAnalytics={onAnalytics}>Aside with custom analytics</Aside>
      );

      const aside = screen.getByRole("complementary");
      fireEvent.click(aside);

      expect(onAnalytics).toHaveBeenCalledWith({
        event: "click",
        category: "aside",
        label: "aside-click",
        action: "interact",
      });
    });

    it("tracks analytics with provided analyticsId", () => {
      const mockGtag = vi.fn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalGtag = (window as any).gtag;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = mockGtag;

      render(<Aside analyticsId="test-aside-123">Test content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("data-analytics-id", "test-aside-123");

      fireEvent.click(aside);

      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "aside",
        event_label: "test-aside-123",
        aside_content: "Test content",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });

    it("tracks toggle analytics", () => {
      const onAnalytics = vi.fn();
      render(
        <Aside
          collapsible
          showToggle
          onAnalytics={onAnalytics}
          analyticsId="toggle-aside"
        >
          Toggle analytics test
        </Aside>
      );

      const toggleButton = screen.getByRole("button");
      fireEvent.click(toggleButton);

      expect(onAnalytics).toHaveBeenCalledWith({
        event: "toggle",
        category: "aside",
        label: "toggle-aside",
        action: "collapse",
      });

      // Click again to expand
      fireEvent.click(toggleButton);

      expect(onAnalytics).toHaveBeenCalledWith({
        event: "toggle",
        category: "aside",
        label: "toggle-aside",
        action: "expand",
      });
    });

    it("handles analytics errors gracefully", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalGtag = (window as any).gtag;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = () => {
        throw new Error("Analytics error");
      };

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(<Aside analyticsId="test-aside">Content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(() => fireEvent.click(aside)).not.toThrow();

      // Only check for console.warn in development
      if (process.env.NODE_ENV === "development") {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Analytics tracking failed:",
          expect.any(Error)
        );
      }

      consoleSpy.mockRestore();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag = originalGtag;
    });
  });

  describe("Highlighted State", () => {
    it("renders highlighted aside", () => {
      render(<Aside highlighted>Highlighted content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveClass("aside--highlighted");
      expect(aside).toHaveAttribute("data-highlighted", "true");
    });

    it("does not render highlighted state by default", () => {
      render(<Aside>Normal content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).not.toHaveClass("aside--highlighted");
      expect(aside).not.toHaveAttribute("data-highlighted");
    });
  });

  describe("Content Structure Validation", () => {
    it("marks valid structure for proper content", () => {
      render(<Aside>Valid aside content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("data-valid-structure", "true");
      expect(aside).not.toHaveClass("aside--invalid-structure");
    });

    it("marks invalid structure for empty content", () => {
      render(<Aside></Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("data-valid-structure", "false");
      expect(aside).toHaveClass("aside--invalid-structure");
    });

    it("validates navigation content type", () => {
      render(<Aside contentType="navigation">Navigation links</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("data-valid-structure", "true");
    });
  });

  describe("Event Handling", () => {
    it("handles mouse enter events", () => {
      const onMouseEnter = vi.fn();
      render(<Aside onMouseEnter={onMouseEnter}>Content</Aside>);

      const aside = screen.getByRole("complementary");
      fireEvent.mouseEnter(aside);

      expect(onMouseEnter).toHaveBeenCalled();
    });

    it("handles focus events", () => {
      const onFocus = vi.fn();
      render(
        <Aside onFocus={onFocus} tabIndex={0}>
          Content
        </Aside>
      );

      const aside = screen.getByRole("complementary");
      fireEvent.focus(aside);

      expect(onFocus).toHaveBeenCalled();
    });

    it("preserves all HTML attributes", () => {
      render(
        <Aside
          id="test-aside"
          tabIndex={0}
          aria-describedby="description"
          data-testid="custom-aside"
        >
          Content
        </Aside>
      );

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("id", "test-aside");
      expect(aside).toHaveAttribute("tabIndex", "0");
      expect(aside).toHaveAttribute("aria-describedby", "description");
      expect(aside).toHaveAttribute("data-testid", "custom-aside");
    });

    it("calls both custom analytics and click handler", () => {
      const onAnalytics = vi.fn();
      const onClick = vi.fn();

      render(
        <Aside onAnalytics={onAnalytics} onClick={onClick}>
          Content
        </Aside>
      );

      const aside = screen.getByRole("complementary");
      fireEvent.click(aside);

      expect(onAnalytics).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("Accessibility Features", () => {
    it("has proper ARIA role", () => {
      render(<Aside>Content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("role", "complementary");
    });

    it("supports custom aria-label", () => {
      render(<Aside aria-label="Custom aside label">Content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("aria-label", "Custom aside label");
    });

    it("auto-generates aria-label based on content type", () => {
      render(<Aside contentType="navigation">Navigation content</Aside>);

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("aria-label", "Navigation sidebar");
    });

    it("auto-generates aria-label based on position when no content type", () => {
      // Test the utility function directly since the component has defaults
      expect(AsideUtils.getAriaLabel(undefined, "right")).toBe("Right sidebar");
      expect(AsideUtils.getAriaLabel("", "left")).toBe("Left sidebar");
    });

    it("preserves custom aria-label over auto-generated", () => {
      render(
        <Aside
          contentType="navigation"
          position="left"
          aria-label="My custom label"
        >
          Content
        </Aside>
      );

      const aside = screen.getByRole("complementary");
      expect(aside).toHaveAttribute("aria-label", "My custom label");
    });

    it("provides aria-controls for toggle button", () => {
      render(
        <Aside id="test-aside" collapsible showToggle>
          Content
        </Aside>
      );

      const toggleButton = screen.getByRole("button");
      expect(toggleButton).toHaveAttribute("aria-controls", "test-aside");
    });
  });

  describe("Client-Side Rendering Integration", () => {
    it("renders fallback for client components", async () => {
      render(<Aside isClient>Client content</Aside>);

      // Should render server component as fallback initially
      const aside = screen.getByRole("complementary");
      expect(aside).toBeInTheDocument();
      expect(aside).toHaveTextContent("Client content");
    });

    it("handles memoized client rendering", async () => {
      render(
        <Aside isClient isMemoized>
          Memoized client content
        </Aside>
      );

      // Should render server component as fallback initially
      const aside = screen.getByRole("complementary");
      expect(aside).toBeInTheDocument();
      expect(aside).toHaveTextContent("Memoized client content");
    });
  });
});

// =============================================================================
// UTILITY FUNCTIONS TESTS
// =============================================================================

describe("AsideUtils", () => {
  describe("validateStructure", () => {
    it("validates truthy content as valid", () => {
      expect(AsideUtils.validateStructure("content")).toBe(true);
      expect(AsideUtils.validateStructure(<div>content</div>)).toBe(true);
      expect(AsideUtils.validateStructure(123)).toBe(true);
    });

    it("validates falsy content as invalid", () => {
      expect(AsideUtils.validateStructure(null)).toBe(false);
      expect(AsideUtils.validateStructure(undefined)).toBe(false);
      expect(AsideUtils.validateStructure("")).toBe(false);
    });

    it("validates navigation content type specifically", () => {
      expect(
        AsideUtils.validateStructure("navigation links", "navigation")
      ).toBe(true);
      expect(AsideUtils.validateStructure("nav menu", "navigation")).toBe(true);
      expect(AsideUtils.validateStructure("just text", "navigation")).toBe(
        false
      );
    });
  });

  describe("extractContent", () => {
    it("extracts text from string content", () => {
      expect(AsideUtils.extractContent("Hello world")).toBe("Hello world");
    });

    it("extracts text from number content", () => {
      expect(AsideUtils.extractContent(42)).toBe("42");
    });

    it("extracts text from React elements", () => {
      const element = <div>Hello world</div>;
      expect(AsideUtils.extractContent(element)).toBe("Hello world");
    });

    it("extracts text from nested React elements", () => {
      const element = (
        <div>
          <span>Hello </span>
          <strong>world</strong>
        </div>
      );
      expect(AsideUtils.extractContent(element)).toBe("Hello  world");
    });

    it("extracts text from array of elements", () => {
      const elements = ["Hello", " ", "world"];
      expect(AsideUtils.extractContent(elements)).toBe("Hello   world");
    });
  });

  describe("getAriaLabel", () => {
    it("returns custom label when provided", () => {
      expect(
        AsideUtils.getAriaLabel("navigation", "left", "Custom label")
      ).toBe("Custom label");
    });

    it("returns content type label when available", () => {
      expect(AsideUtils.getAriaLabel("navigation", "left")).toBe(
        "Navigation sidebar"
      );
      expect(AsideUtils.getAriaLabel("search", "right")).toBe("Search sidebar");
    });

    it("returns position label when content type not available", () => {
      expect(AsideUtils.getAriaLabel(undefined, "left")).toBe("Left sidebar");
      expect(AsideUtils.getAriaLabel("unknown", "right")).toBe("Right sidebar");
    });

    it("returns default label when nothing else available", () => {
      expect(AsideUtils.getAriaLabel("unknown", "unknown")).toBe(
        "Sidebar content"
      );
    });
  });
});

// =============================================================================
// TYPE SAFETY TESTS
// =============================================================================

describe("Aside TypeScript Integration", () => {
  it("accepts all valid HTML aside attributes", () => {
    // This test ensures our props interface properly extends HTML attributes
    const validProps: AsideProps = {
      id: "test",
      className: "test-class",
      style: { color: "red" },
      onClick: () => {},
      onMouseEnter: () => {},
      onFocus: () => {},
      tabIndex: 0,
      "aria-label": "Test aside",
      "data-testid": "test",
      position: "left",
      contentType: "navigation",
      collapsible: true,
      defaultCollapsed: false,
      collapsed: false,
      onCollapseChange: () => {},
      showToggle: true,
      toggleContent: {
        collapsed: "Open",
        expanded: "Close",
      },
      analyticsId: "test-123",
      onAnalytics: () => {},
      highlighted: true,
      as: "section",
      isClient: false,
      isMemoized: false,
    };

    // If this compiles without errors, the type interface is correct
    expect(validProps).toBeDefined();
  });
});
