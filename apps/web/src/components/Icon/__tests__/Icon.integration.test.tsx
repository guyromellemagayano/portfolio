import React from "react";

import { cleanup, render } from "@testing-library/react";
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
      [`data-${componentType}-id`]: `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
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
  // NAME PROP INTEGRATION
  // ============================================================================

  describe("Name Prop Integration", () => {
    it("renders X icon with name prop and correct attributes", () => {
      const { container } = render(<Icon name="x" debugMode />);
      const icon = container.querySelector("[data-icon-x-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Instagram icon with name prop and custom ID", () => {
      const { container } = render(
        <Icon name="instagram" debugId="custom-id" />
      );
      const icon = container.querySelector(
        '[data-icon-instagram-id="custom-id-icon-instagram-root"]'
      );
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute(
        "data-icon-instagram-id",
        "custom-id-icon-instagram-root"
      );
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders linkedIn icon with name prop and custom className", () => {
      const { container } = render(
        <Icon name="linkedin" className="custom-class" />
      );
      const icon = container.querySelector("[data-icon-linkedin-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("class");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders GitHub icon with name prop and dimensions", () => {
      const { container } = render(
        <Icon name="github" width="32" height="32" />
      );
      const icon = container.querySelector("[data-icon-github-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ArrowDown icon with name prop and custom data attribute", () => {
      const { container } = render(
        <Icon name="arrow-down" data-test="arrow-test" />
      );
      const icon = container.querySelector("[data-icon-arrow-down-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-test", "arrow-test");
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ArrowLeft icon with name prop", () => {
      const { container } = render(<Icon name="arrow-left" />);
      const icon = container.querySelector("[data-icon-arrow-left-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Briefcase icon with name prop", () => {
      const { container } = render(<Icon name="briefcase" />);
      const icon = container.querySelector("[data-icon-briefcase-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ChevronDown icon with name prop", () => {
      const { container } = render(<Icon name="chevron-down" />);
      const icon = container.querySelector("[data-icon-chevron-down-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ChevronRight icon with name prop", () => {
      const { container } = render(<Icon name="chevron-right" />);
      const icon = container.querySelector("[data-icon-chevron-right-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Close icon with name prop", () => {
      const { container } = render(<Icon name="close" />);
      const icon = container.querySelector("[data-icon-close-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Link icon with name prop", () => {
      const { container } = render(<Icon name="link" />);
      const icon = container.querySelector("[data-icon-link-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Mail icon with name prop", () => {
      const { container } = render(<Icon name="mail" />);
      const icon = container.querySelector("[data-icon-mail-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Sun icon with name prop", () => {
      const { container } = render(<Icon name="sun" />);
      const icon = container.querySelector("[data-icon-sun-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Moon icon with name prop", () => {
      const { container } = render(<Icon name="moon" />);
      const icon = container.querySelector("[data-icon-moon-id]");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });
  });

  // ============================================================================
  // PROP CONSISTENCY INTEGRATION
  // ============================================================================

  describe("Prop Consistency Integration", () => {
    it("handles prop drilling correctly across all icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" debugMode />
          <Icon name="instagram" debugMode />
          <Icon name="linkedin" debugMode />
          <Icon name="github" debugMode />
        </div>
      );

      const xIcon = container.querySelector("[data-icon-x-id]");
      const instagramIcon = container.querySelector("[data-icon-instagram-id]");
      const linkedinIcon = container.querySelector("[data-icon-linkedin-id]");
      const githubIcon = container.querySelector("[data-icon-github-id]");

      const icons = [xIcon, instagramIcon, linkedinIcon, githubIcon];
      expect(icons).toHaveLength(4);

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("data-debug-mode", "true");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon?.tagName).toBe("svg");
      });
    });

    it("handles custom component IDs consistently", () => {
      const { container } = render(
        <div>
          <Icon name="x" debugId="custom-x" />
          <Icon name="instagram" debugId="custom-instagram" />
          <Icon name="linkedin" debugId="custom-linkedin" />
        </div>
      );

      const xIcon = container.querySelector(
        '[data-icon-x-id="custom-x-icon-x-root"]'
      );
      const instagramIcon = container.querySelector(
        '[data-icon-instagram-id="custom-instagram-icon-instagram-root"]'
      );
      const linkedinIcon = container.querySelector(
        '[data-icon-linkedin-id="custom-linkedin-icon-linkedin-root"]'
      );

      expect(xIcon).toHaveAttribute("data-icon-x-id", "custom-x-icon-x-root");
      expect(instagramIcon).toHaveAttribute(
        "data-icon-instagram-id",
        "custom-instagram-icon-instagram-root"
      );
      expect(linkedinIcon).toHaveAttribute(
        "data-icon-linkedin-id",
        "custom-linkedin-icon-linkedin-root"
      );
    });

    it("handles HTML attributes consistently", () => {
      const { container } = render(
        <div>
          <Icon name="x" width="24" height="24" className="icon-class" />
          <Icon
            name="instagram"
            width="24"
            height="24"
            className="icon-class"
          />
          <Icon name="linkedin" width="24" height="24" className="icon-class" />
        </div>
      );

      const xIcon = container.querySelector("[data-icon-x-id]");
      const instagramIcon = container.querySelector("[data-icon-instagram-id]");
      const linkedinIcon = container.querySelector("[data-icon-linkedin-id]");

      const icons = [xIcon, instagramIcon, linkedinIcon];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("width", "24");
        expect(icon).toHaveAttribute("height", "24");
        expect(icon).toHaveAttribute("class");
      });
    });
  });

  // ============================================================================
  // STATE CONSISTENCY INTEGRATION
  // ============================================================================

  describe("State Consistency Integration", () => {
    it("maintains consistent debug mode state across all icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" debugMode />
          <Icon name="instagram" debugMode />
          <Icon name="arrow-down" debugMode />
          <Icon name="close" debugMode />
        </div>
      );

      const xIcon = container.querySelector("[data-icon-x-id]");
      const instagramIcon = container.querySelector("[data-icon-instagram-id]");
      const arrowDownIcon = container.querySelector("[data-icon-arrow-down-id]");
      const closeIcon = container.querySelector("[data-icon-close-id]");

      const icons = [xIcon, instagramIcon, arrowDownIcon, closeIcon];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("data-debug-mode", "true");
        expect(icon).toBeInTheDocument();
      });
    });

    it("maintains consistent component ID generation", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="instagram" />
          <Icon name="arrow-down" />
          <Icon name="close" />
        </div>
      );

      const xIcon = container.querySelector("[data-icon-x-id]");
      const instagramIcon = container.querySelector("[data-icon-instagram-id]");
      const arrowDownIcon = container.querySelector("[data-icon-arrow-down-id]");
      const closeIcon = container.querySelector("[data-icon-close-id]");

      expect(xIcon).toHaveAttribute("data-icon-x-id");
      expect(instagramIcon).toHaveAttribute("data-icon-instagram-id");
      expect(arrowDownIcon).toHaveAttribute("data-icon-arrow-down-id");
      expect(closeIcon).toHaveAttribute("data-icon-close-id");
    });

    it("maintains consistent accessibility attributes", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="instagram" />
          <Icon name="arrow-down" />
          <Icon name="close" />
          <Icon name="link" />
          <Icon name="mail" />
        </div>
      );

      const xIcon = container.querySelector("[data-icon-x-id]");
      const instagramIcon = container.querySelector("[data-icon-instagram-id]");
      const arrowDownIcon = container.querySelector("[data-icon-arrow-down-id]");
      const closeIcon = container.querySelector("[data-icon-close-id]");
      const linkIcon = container.querySelector("[data-icon-link-id]");
      const mailIcon = container.querySelector("[data-icon-mail-id]");

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
        expect(icon?.tagName).toBe("svg");
      });
    });
  });

  // ============================================================================
  // CROSS-ICON BEHAVIOR INTEGRATION
  // ============================================================================

  describe("Cross-Icon Behavior Integration", () => {
    it("renders all social icons with consistent behavior", () => {
      const socialIcons = ["x", "instagram", "linkedin", "github"] as const;

      socialIcons.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector(`[data-icon-${iconName}-id]`);
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
        expect(icon?.tagName).toBe("svg");
        unmount();
      });
    });

    it("renders all navigation icons with consistent behavior", () => {
      const navigationIcons = [
        "arrow-down",
        "arrow-left",
        "chevron-down",
        "chevron-right",
      ] as const;

      navigationIcons.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector(`[data-icon-${iconName}-id]`);
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon?.tagName).toBe("svg");
        unmount();
      });
    });

    it("renders all UI icons with consistent behavior", () => {
      const uiIcons = [
        "close",
        "link",
        "mail",
        "briefcase",
        "sun",
        "moon",
      ] as const;

      uiIcons.forEach((iconName) => {
        const { container, unmount } = render(<Icon name={iconName} />);
        const icon = container.querySelector(`[data-icon-${iconName}-id]`);
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon?.tagName).toBe("svg");
        unmount();
      });
    });

    it("handles mixed icon types in the same container", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="arrow-down" />
          <Icon name="close" />
          <Icon name="link" />
        </div>
      );

      const xIcon = container.querySelector("[data-icon-x-id]");
      const arrowDownIcon = container.querySelector(
        "[data-icon-arrow-down-id]"
      );
      const closeIcon = container.querySelector("[data-icon-close-id]");
      const linkIcon = container.querySelector("[data-icon-link-id]");

      const icons = [xIcon, arrowDownIcon, closeIcon, linkIcon];
      expect(icons).toHaveLength(4);

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon?.tagName).toBe("svg");
      });
    });
  });

  // ============================================================================
  // ERROR HANDLING INTEGRATION
  // ============================================================================

  describe("Error Handling Integration", () => {
    it("handles missing props gracefully", () => {
      const iconNames: IconNames[] = [
        "x",
        "instagram",
        "linkedin",
        "github",
        "arrow-down",
        "arrow-left",
        "chevron-down",
        "chevron-right",
        "close",
        "link",
        "mail",
        "briefcase",
        "sun",
        "moon",
      ];

      iconNames.forEach((iconName) => {
        expect(() => {
          const { unmount } = render(<Icon name={iconName} />);
          unmount();
        }).not.toThrow();
      });
    });

    it("handles custom ARIA attributes correctly", () => {
      const { container } = render(
        <Icon
          name="x"
          role="img"
          aria-label="X (Twitter) icon"
          aria-hidden="false"
        />
      );
      const icon = container.querySelector("[data-icon-x-id]");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon).toHaveAttribute("aria-label", "X (Twitter) icon");
      // Note: Icon component always sets aria-hidden="true" (line 73 in Icon.tsx)
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  // ============================================================================
  // PERFORMANCE INTEGRATION
  // ============================================================================

  describe("Performance Integration", () => {
    it("renders multiple different icons efficiently", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon name="instagram" />
          <Icon name="arrow-down" />
          <Icon name="close" />
          <Icon name="mail" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(5);
      svgs.forEach((svg) => expect(svg).toBeInTheDocument());
    });

    it("handles icon updates efficiently", () => {
      const { rerender, container } = render(<Icon name="x" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();

      rerender(<Icon name="x" className="updated-class" />);
      const updatedIcon = container.querySelector("svg");
      expect(updatedIcon).toHaveAttribute("class");
    });
  });

  // ============================================================================
  // CUSTOM SVG CHILDREN INTEGRATION
  // ============================================================================

  describe("Custom SVG Children Integration", () => {
    it("renders custom SVG alongside named icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" />
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
          <Icon name="instagram" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(3);

      // Named icon
      const xIcon = container.querySelector("[data-icon-x-id]");
      expect(xIcon).toBeInTheDocument();

      // Custom SVG (no data attributes)
      const customIcon = container.querySelector(
        "svg:not([data-icon-x-id]):not([data-icon-instagram-id])"
      );
      expect(customIcon).toBeInTheDocument();
      expect(customIcon?.querySelector("path")).toBeInTheDocument();

      // Named icon
      const instagramIcon = container.querySelector("[data-icon-instagram-id]");
      expect(instagramIcon).toBeInTheDocument();
    });

    it("handles custom SVG with all standard attributes", () => {
      const { container } = render(
        <Icon
          viewBox="0 0 100 100"
          width="100"
          height="100"
          className="custom-icon"
          data-test="custom-svg"
        >
          <circle cx="50" cy="50" r="40" />
          <path d="M30 50 L50 70 L70 30" />
        </Icon>
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 100 100");
      expect(icon).toHaveAttribute("width", "100");
      expect(icon).toHaveAttribute("height", "100");
      expect(icon).toHaveAttribute("class", "custom-icon");
      expect(icon).toHaveAttribute("data-test", "custom-svg");
      expect(icon).toHaveAttribute("role", "img");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.querySelector("circle")).toBeInTheDocument();
      expect(icon?.querySelector("path")).toBeInTheDocument();
    });

    it("maintains consistent behavior between custom and named icons", () => {
      const { container } = render(
        <div>
          <Icon name="x" className="icon-class" width="24" height="24" />
          <Icon className="icon-class" width="24" height="24">
            <path d="M10 10h4v4h-4z" />
          </Icon>
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(2);

      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute("class", "icon-class");
        expect(svg).toHaveAttribute("width", "24");
        expect(svg).toHaveAttribute("height", "24");
        expect(svg).toHaveAttribute("role", "img");
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("handles complex custom SVG structures", () => {
      const { container } = render(
        <Icon viewBox="0 0 200 200">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
              <stop offset="100%" stopColor="#0000ff" stopOpacity="1" />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
          <rect width="200" height="200" fill="url(#grad1)" />
          <circle cx="100" cy="100" r="50" fill="white" filter="url(#blur)" />
          <path d="M50 100 L100 50 L150 100 L100 150 Z" fill="black" />
        </Icon>
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector("defs")).toBeInTheDocument();
      expect(icon?.querySelector("linearGradient")).toBeInTheDocument();
      expect(icon?.querySelector("filter")).toBeInTheDocument();
      expect(icon?.querySelector("rect")).toBeInTheDocument();
      expect(icon?.querySelector("circle")).toBeInTheDocument();
      expect(icon?.querySelector("path")).toBeInTheDocument();
    });

    it("handles custom SVG updates efficiently", () => {
      const { rerender, container } = render(
        <Icon>
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();

      rerender(
        <Icon className="updated-class">
          <path d="M10 10h4v4h-4z" />
        </Icon>
      );
      const updatedIcon = container.querySelector("svg");
      expect(updatedIcon).toHaveAttribute("class", "updated-class");
    });
  });
});

type IconNames =
  | "x"
  | "instagram"
  | "linkedin"
  | "github"
  | "arrow-down"
  | "arrow-left"
  | "briefcase"
  | "chevron-down"
  | "chevron-right"
  | "close"
  | "link"
  | "mail"
  | "sun"
  | "moon";
