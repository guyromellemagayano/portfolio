import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Icon } from "../Icon";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

describe("Icon Integration", () => {
  afterEach(() => {
    cleanup();
  });

  // ============================================================================
  // COMPOUND COMPONENT STRUCTURE TESTS
  // ============================================================================

  describe("Compound Component Structure", () => {
    it("has attached sub-components", () => {
      // Verify that the Icon component has the expected sub-components
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
      expect(Icon.Close).toBeDefined();
      expect(Icon.Sun).toBeDefined();
      expect(Icon.Moon).toBeDefined();
      expect(Icon.ChevronDown).toBeDefined();
      expect(Icon.ChevronRight).toBeDefined();
      expect(Icon.ArrowLeft).toBeDefined();
    });

    it("sub-components are properly typed", () => {
      expect(typeof Icon.X).toBe("function");
      expect(typeof Icon.Instagram).toBe("function");
      expect(typeof Icon.LinkedIn).toBe("function");
      expect(typeof Icon.GitHub).toBe("function");
      expect(typeof Icon.Close).toBe("function");
      expect(typeof Icon.Sun).toBe("function");
      expect(typeof Icon.Moon).toBe("function");
      expect(typeof Icon.ChevronDown).toBe("function");
      expect(typeof Icon.ChevronRight).toBe("function");
      expect(typeof Icon.ArrowLeft).toBe("function");
    });
  });

  // ============================================================================
  // SOCIAL ICON INTEGRATION TESTS
  // ============================================================================

  describe("Social Icon Integration", () => {
    it("renders X (Twitter) icon correctly", () => {
      render(<Icon.X />);
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders Instagram icon correctly", () => {
      render(<Icon.Instagram />);
      const icon = screen.getByTestId("icon-instagram");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders LinkedIn icon correctly", () => {
      render(<Icon.LinkedIn />);
      const icon = screen.getByTestId("icon-linkedin");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders GitHub icon correctly", () => {
      render(<Icon.GitHub />);
      const icon = screen.getByTestId("icon-github");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });
  });

  // ============================================================================
  // UI ICON INTEGRATION TESTS
  // ============================================================================

  describe("UI Icon Integration", () => {
    it("renders Close icon correctly", () => {
      render(<Icon.Close />);
      const icon = screen.getByTestId("icon-close");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders Sun icon correctly", () => {
      render(<Icon.Sun />);
      const icon = screen.getByTestId("icon-sun");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders Moon icon correctly", () => {
      render(<Icon.Moon />);
      const icon = screen.getByTestId("icon-moon");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });
  });

  // ============================================================================
  // NAVIGATION ICON INTEGRATION TESTS
  // ============================================================================

  describe("Navigation Icon Integration", () => {
    it("renders ChevronDown icon correctly", () => {
      render(<Icon.ChevronDown />);
      const icon = screen.getByTestId("icon-chevron-down");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders ChevronRight icon correctly", () => {
      render(<Icon.ChevronRight />);
      const icon = screen.getByTestId("icon-chevron-right");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("renders ArrowLeft icon correctly", () => {
      render(<Icon.ArrowLeft />);
      const icon = screen.getByTestId("icon-arrow-left");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });
  });

  // ============================================================================
  // COMPOUND COMPONENT USAGE TESTS
  // ============================================================================

  describe("Compound Component Usage", () => {
    it("allows usage of main Icon component with children", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });

    it("allows usage of predefined icons", () => {
      render(<Icon.X />);
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toBeInTheDocument();
    });

    it("supports mixing main Icon and predefined icons", () => {
      const { container } = render(
        <div>
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
          <Icon.X />
          <Icon.Close />
        </div>
      );

      expect(
        container.querySelector('[data-testid="icon-root"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="icon-x-twitter"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="icon-close"]')
      ).toBeInTheDocument();
    });
  });

  // ============================================================================
  // PROPS INTEGRATION TESTS
  // ============================================================================

  describe("Props Integration", () => {
    it("passes props correctly to main Icon component", () => {
      render(
        <Icon className="custom-class" debugMode={true} internalId="test-id">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveClass("custom-class");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("data-icon-id", "test-id-icon");
    });

    it("passes props correctly to predefined icons", () => {
      render(
        <Icon.X
          className="custom-class"
          _debugMode={true}
          _internalId="test-id"
        />
      );
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toHaveClass("custom-class");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("data-icon-id", "test-id-icon-x-twitter");
    });

    it("handles memoization on main Icon component", () => {
      render(
        <Icon isMemoized={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACCESSIBILITY INTEGRATION TESTS
  // ============================================================================

  describe("Accessibility Integration", () => {
    it("main Icon component has proper accessibility attributes", () => {
      render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("predefined icons have proper accessibility attributes", () => {
      render(<Icon.X />);
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("all icons maintain consistent accessibility structure", () => {
      const icons = [
        <Icon.X key="x" />,
        <Icon.Instagram key="instagram" />,
        <Icon.LinkedIn key="linkedin" />,
        <Icon.GitHub key="github" />,
        <Icon.Close key="close" />,
        <Icon.Sun key="sun" />,
        <Icon.Moon key="moon" />,
        <Icon.ChevronDown key="chevron-down" />,
        <Icon.ChevronRight key="chevron-right" />,
        <Icon.ArrowLeft key="arrow-left" />,
      ];

      icons.forEach((icon) => {
        const { container } = render(icon);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  // ============================================================================
  // STYLING INTEGRATION TESTS
  // ============================================================================

  describe("Styling Integration", () => {
    it("main Icon component applies custom className", () => {
      render(
        <Icon className="custom-class">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("predefined icons apply custom className", () => {
      render(<Icon.X className="custom-class" />);
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toHaveClass("custom-class");
    });

    it("all icons support SVG attributes", () => {
      render(
        <Icon.X
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 24 24"
        />
      );
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });

  // ============================================================================
  // DEBUG MODE INTEGRATION TESTS
  // ============================================================================

  describe("Debug Mode Integration", () => {
    it("main Icon component applies debug mode correctly", () => {
      render(
        <Icon debugMode={true}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("predefined icons apply debug mode correctly", () => {
      render(<Icon.X _debugMode={true} />);
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("debug mode is consistent across all icon types", () => {
      const icons = [
        <Icon debugMode={true} key="main">
          <path d="M10 10h4v4h-4z" />
        </Icon>,
        <Icon.X _debugMode={true} key="x" />,
        <Icon.Close _debugMode={true} key="close" />,
      ];

      icons.forEach((icon) => {
        const { container } = render(icon);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("data-debug-mode", "true");
      });
    });
  });

  // ============================================================================
  // COMPONENT ID INTEGRATION TESTS
  // ============================================================================

  describe("Component ID Integration", () => {
    it("main Icon component applies component ID correctly", () => {
      render(
        <Icon internalId="test-id">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-icon-id", "test-id-icon");
    });

    it("predefined icons apply component ID correctly", () => {
      render(<Icon.X _internalId="test-id" />);
      const icon = screen.getByTestId("icon-x-twitter");
      expect(icon).toHaveAttribute("data-icon-id", "test-id-icon-x-twitter");
    });

    it("component IDs are unique across different icon types", () => {
      const { container } = render(
        <div>
          <Icon internalId="main">
            <path d="M10 10h4v4h-4z" />
          </Icon>
          <Icon.X _internalId="x" />
          <Icon.Close _internalId="close" />
        </div>
      );

      const mainIcon = container.querySelector('[data-icon-id="main-icon"]');
      const xIcon = container.querySelector(
        '[data-icon-id="x-icon-x-twitter"]'
      );
      const closeIcon = container.querySelector('[data-icon-id="close"]');

      expect(mainIcon).toBeInTheDocument();
      expect(xIcon).toBeInTheDocument();
      expect(closeIcon).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EDGE CASES INTEGRATION TESTS
  // ============================================================================

  describe("Edge Cases Integration", () => {
    it("handles complex usage scenarios", () => {
      const { container } = render(
        <div>
          <Icon
            className="main-icon"
            debugMode={true}
            internalId="main"
            isMemoized={true}
          >
            <path d="M10 10h4v4h-4z" />
          </Icon>
          <Icon.X
            className="social-icon"
            _debugMode={true}
            _internalId="social"
          />
          <Icon.Close className="ui-icon" _debugMode={false} _internalId="ui" />
        </div>
      );

      // Verify all icons render correctly
      expect(
        container.querySelector('[data-testid="icon-root"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="icon-x-twitter"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="icon-close"]')
      ).toBeInTheDocument();

      // Verify classes are applied
      expect(container.querySelector(".main-icon")).toBeInTheDocument();
      expect(container.querySelector(".social-icon")).toBeInTheDocument();
      expect(container.querySelector(".ui-icon")).toBeInTheDocument();

      // Verify debug modes
      expect(
        container.querySelector('[data-debug-mode="true"]')
      ).toBeInTheDocument();
      // Note: Close icon with _debugMode={false} doesn't have data-debug-mode attribute
      // This is the expected behavior - only true values get the attribute
    });

    it("handles empty content gracefully", () => {
      const { container } = render(<Icon>{null}</Icon>);
      expect(container.firstChild).toBeNull();
    });

    it("handles undefined props gracefully", () => {
      render(
        <Icon internalId={undefined} debugMode={undefined}>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });
  });
});
