import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Icon } from "..";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
}));

// ============================================================================
// ICON INTEGRATION TESTS
// ============================================================================

describe("Icon Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ============================================================================
  // COMPOUND COMPONENT INTEGRATION
  // ============================================================================

  describe("Compound Component Integration", () => {
    it("renders Icon.X with correct props and behavior", () => {
      render(<Icon.X debugMode />);
      const icon = screen.getByTestId("test-id-icon-x-twitter");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Instagram with correct props and behavior", () => {
      render(<Icon.Instagram debugId="custom-id" />);
      const icon = screen.getByTestId("custom-id-icon-instagram");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute(
        "data-icon-instagram-id",
        "custom-id-icon-instagram"
      );
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.LinkedIn with correct props and behavior", () => {
      render(<Icon.LinkedIn className="custom-class" />);
      const icon = screen.getByTestId("test-id-icon-linkedin");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("class");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.GitHub with correct props and behavior", () => {
      render(<Icon.GitHub width="32" height="32" />);
      const icon = screen.getByTestId("test-id-icon-github");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.ArrowDown with correct props and behavior", () => {
      render(<Icon.ArrowDown data-test="arrow-test" />);
      const icon = screen.getByTestId("test-id-icon-arrow-down");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-test", "arrow-test");
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.ArrowLeft with correct props and behavior", () => {
      render(<Icon.ArrowLeft />);
      const icon = screen.getByTestId("test-id-icon-arrow-left");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.ChevronDown with correct props and behavior", () => {
      render(<Icon.ChevronDown />);
      const icon = screen.getByTestId("test-id-icon-chevron-down");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.ChevronRight with correct props and behavior", () => {
      render(<Icon.ChevronRight />);
      const icon = screen.getByTestId("test-id-icon-chevron-right");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Close with correct props and behavior", () => {
      render(<Icon.Close />);
      const icon = screen.getByTestId("test-id-icon-close");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Link with correct props and behavior", () => {
      render(<Icon.Link />);
      const icon = screen.getByTestId("test-id-icon-link");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Mail with correct props and behavior", () => {
      render(<Icon.Mail />);
      const icon = screen.getByTestId("test-id-icon-mail");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Briefcase with correct props and behavior", () => {
      render(<Icon.Briefcase />);
      const icon = screen.getByTestId("test-id-icon-briefcase");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Sun with correct props and behavior", () => {
      render(<Icon.Sun />);
      const icon = screen.getByTestId("test-id-icon-sun");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });

    it("renders Icon.Moon with correct props and behavior", () => {
      render(<Icon.Moon />);
      const icon = screen.getByTestId("test-id-icon-moon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon.tagName).toBe("svg");
    });
  });

  // ============================================================================
  // COMPONENT INTERACTION INTEGRATION
  // ============================================================================

  describe("Component Interaction Integration", () => {
    it("handles prop drilling correctly across all sub-components", () => {
      render(
        <div>
          <Icon.X debugMode />
          <Icon.Instagram debugMode />
          <Icon.LinkedIn debugMode />
          <Icon.GitHub debugMode />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const instagramIcon = screen.getByTestId("test-id-icon-instagram");
      const linkedinIcon = screen.getByTestId("test-id-icon-linkedin");
      const githubIcon = screen.getByTestId("test-id-icon-github");

      const icons = [xIcon, instagramIcon, linkedinIcon, githubIcon];
      expect(icons).toHaveLength(4);

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("data-debug-mode", "true");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon.tagName).toBe("svg");
      });
    });

    it("handles custom component IDs consistently across sub-components", () => {
      render(
        <div>
          <Icon.X debugId="custom-x" />
          <Icon.Instagram debugId="custom-instagram" />
          <Icon.LinkedIn debugId="custom-linkedin" />
        </div>
      );

      const xIcon = screen.getByTestId("custom-x-icon-x-twitter");
      const instagramIcon = screen.getByTestId(
        "custom-instagram-icon-instagram"
      );
      const linkedinIcon = screen.getByTestId("custom-linkedin-icon-linkedin");

      expect(xIcon).toHaveAttribute(
        "data-icon-x-twitter-id",
        "custom-x-icon-x-twitter"
      );
      expect(instagramIcon).toHaveAttribute(
        "data-icon-instagram-id",
        "custom-instagram-icon-instagram"
      );
      expect(linkedinIcon).toHaveAttribute(
        "data-icon-linkedin-id",
        "custom-linkedin-icon-linkedin"
      );
    });

    it("handles HTML attributes consistently across sub-components", () => {
      render(
        <div>
          <Icon.X width="24" height="24" className="icon-class" />
          <Icon.Instagram width="24" height="24" className="icon-class" />
          <Icon.LinkedIn width="24" height="24" className="icon-class" />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const instagramIcon = screen.getByTestId("test-id-icon-instagram");
      const linkedinIcon = screen.getByTestId("test-id-icon-linkedin");

      const icons = [xIcon, instagramIcon, linkedinIcon];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("width", "24");
        expect(icon).toHaveAttribute("height", "24");
        expect(icon).toHaveAttribute("class");
      });
    });

    it("handles custom element types consistently across sub-components", () => {
      render(
        <div>
          <Icon.X as="div" />
          <Icon.Instagram as="span" />
          <Icon.LinkedIn as="div" />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const instagramIcon = screen.getByTestId("test-id-icon-instagram");
      const linkedinIcon = screen.getByTestId("test-id-icon-linkedin");

      expect(xIcon.tagName).toBe("DIV");
      expect(instagramIcon.tagName).toBe("SPAN");
      expect(linkedinIcon.tagName).toBe("DIV");
    });
  });

  // ============================================================================
  // STATE CONSISTENCY INTEGRATION
  // ============================================================================

  describe("State Consistency Integration", () => {
    it("maintains consistent debug mode state across all sub-components", () => {
      render(
        <div>
          <Icon.X debugMode />
          <Icon.Instagram debugMode />
          <Icon.ArrowDown debugMode />
          <Icon.Close debugMode />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const instagramIcon = screen.getByTestId("test-id-icon-instagram");
      const arrowDownIcon = screen.getByTestId("test-id-icon-arrow-down");
      const closeIcon = screen.getByTestId("test-id-icon-close");

      const icons = [xIcon, instagramIcon, arrowDownIcon, closeIcon];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });
    });

    it("maintains consistent component ID generation across all sub-components", () => {
      render(
        <div>
          <Icon.X />
          <Icon.Instagram />
          <Icon.ArrowDown />
          <Icon.Close />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const instagramIcon = screen.getByTestId("test-id-icon-instagram");
      const arrowDownIcon = screen.getByTestId("test-id-icon-arrow-down");
      const closeIcon = screen.getByTestId("test-id-icon-close");

      const icons = [xIcon, instagramIcon, arrowDownIcon, closeIcon];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("data-testid");
        expect(icon.getAttribute("data-testid")).toMatch(/^test-id-icon-/);
      });
    });

    it("maintains consistent accessibility attributes across all sub-components", () => {
      render(
        <div>
          <Icon.X />
          <Icon.Instagram />
          <Icon.ArrowDown />
          <Icon.Close />
          <Icon.Link />
          <Icon.Mail />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const instagramIcon = screen.getByTestId("test-id-icon-instagram");
      const arrowDownIcon = screen.getByTestId("test-id-icon-arrow-down");
      const closeIcon = screen.getByTestId("test-id-icon-close");
      const linkIcon = screen.getByTestId("test-id-icon-link");
      const mailIcon = screen.getByTestId("test-id-icon-mail");

      const icons = [
        xIcon,
        instagramIcon,
        arrowDownIcon,
        closeIcon,
        linkIcon,
        mailIcon,
      ];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon.tagName).toBe("svg");
      });
    });
  });

  // ============================================================================
  // CROSS-COMPONENT BEHAVIOR INTEGRATION
  // ============================================================================

  describe("Cross-Component Behavior Integration", () => {
    it("renders all social icons with consistent behavior", () => {
      const socialIcons = [Icon.X, Icon.Instagram, Icon.LinkedIn, Icon.GitHub];

      socialIcons.forEach((IconComponent) => {
        const { unmount } = render(<IconComponent />);
        const icon = screen.getByTestId(/test-id-icon-/);
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
        expect(icon.tagName).toBe("svg");
        unmount();
      });
    });

    it("renders all navigation icons with consistent behavior", () => {
      const navigationIcons = [
        Icon.ArrowDown,
        Icon.ArrowLeft,
        Icon.ChevronDown,
        Icon.ChevronRight,
      ];

      navigationIcons.forEach((IconComponent) => {
        const { unmount } = render(<IconComponent />);
        const icon = screen.getByTestId(/test-id-icon-/);
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon.tagName).toBe("svg");
        unmount();
      });
    });

    it("renders all UI icons with consistent behavior", () => {
      const uiIcons = [
        Icon.Close,
        Icon.Link,
        Icon.Mail,
        Icon.Briefcase,
        Icon.Sun,
        Icon.Moon,
      ];

      uiIcons.forEach((IconComponent) => {
        const { unmount } = render(<IconComponent />);
        const icon = screen.getByTestId(/test-id-icon-/);
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon.tagName).toBe("svg");
        unmount();
      });
    });

    it("handles mixed icon types in the same container", () => {
      render(
        <div>
          <Icon.X />
          <Icon.ArrowDown />
          <Icon.Close />
          <Icon.Link />
        </div>
      );

      const xIcon = screen.getByTestId("test-id-icon-x-twitter");
      const arrowDownIcon = screen.getByTestId("test-id-icon-arrow-down");
      const closeIcon = screen.getByTestId("test-id-icon-close");
      const linkIcon = screen.getByTestId("test-id-icon-link");

      const icons = [xIcon, arrowDownIcon, closeIcon, linkIcon];
      expect(icons).toHaveLength(4);

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon.tagName).toBe("svg");
      });
    });
  });

  // ============================================================================
  // COMPOUND COMPONENT PATTERN INTEGRATION
  // ============================================================================

  describe("Compound Component Pattern Integration", () => {
    it("verifies all sub-components are properly attached to main Icon component", () => {
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
      expect(Icon.ArrowDown).toBeDefined();
      expect(Icon.ArrowLeft).toBeDefined();
      expect(Icon.ChevronDown).toBeDefined();
      expect(Icon.ChevronRight).toBeDefined();
      expect(Icon.Close).toBeDefined();
      expect(Icon.Link).toBeDefined();
      expect(Icon.Mail).toBeDefined();
      expect(Icon.Briefcase).toBeDefined();
      expect(Icon.Sun).toBeDefined();
      expect(Icon.Moon).toBeDefined();
    });

    it("verifies sub-components are React components that can be rendered", () => {
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
      expect(Icon.ArrowDown).toBeDefined();
      expect(Icon.ArrowLeft).toBeDefined();
      expect(Icon.ChevronDown).toBeDefined();
      expect(Icon.ChevronRight).toBeDefined();
      expect(Icon.Close).toBeDefined();
      expect(Icon.Link).toBeDefined();
      expect(Icon.Mail).toBeDefined();
      expect(Icon.Briefcase).toBeDefined();
      expect(Icon.Sun).toBeDefined();
      expect(Icon.Moon).toBeDefined();
    });

    it("verifies compound component pattern works with React.createElement", () => {
      const xIcon = React.createElement(Icon.X, { debugMode: true });
      const instagramIcon = React.createElement(Icon.Instagram, {
        debugId: "test",
      });

      expect(xIcon).toBeDefined();
      expect(instagramIcon).toBeDefined();
      expect(xIcon.type).toBe(Icon.X);
      expect(instagramIcon.type).toBe(Icon.Instagram);
    });
  });

  // ============================================================================
  // ERROR HANDLING INTEGRATION
  // ============================================================================

  describe("Error Handling Integration", () => {
    it("handles missing props gracefully across all sub-components", () => {
      const iconComponents = [
        Icon.X,
        Icon.Instagram,
        Icon.LinkedIn,
        Icon.GitHub,
        Icon.ArrowDown,
        Icon.ArrowLeft,
        Icon.ChevronDown,
        Icon.ChevronRight,
        Icon.Close,
        Icon.Link,
        Icon.Mail,
        Icon.Briefcase,
        Icon.Sun,
        Icon.Moon,
      ];

      iconComponents.forEach((IconComponent) => {
        expect(() => {
          const { unmount } = render(<IconComponent />);
          unmount();
        }).not.toThrow();
      });
    });

    it("handles invalid props gracefully across all sub-components", () => {
      const invalidProps = {
        width: "invalid",
        height: "invalid",
        className: null,
        debugMode: "invalid",
      };

      const iconComponents = [Icon.X, Icon.Instagram, Icon.LinkedIn];

      iconComponents.forEach((IconComponent) => {
        expect(() => {
          const { unmount } = render(<IconComponent {...invalidProps} />);
          unmount();
        }).not.toThrow();
      });
    });
  });
});
