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
  // NAME PROP INTEGRATION
  // ============================================================================

  describe("Name Prop Integration", () => {
    it("renders X icon with name prop and correct attributes", () => {
      const { container } = render(<Icon name="X" debugMode />);
      const icon = container.querySelector('[data-icon-X-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-debug-mode", "true");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Instagram icon with name prop and custom ID", () => {
      const { container } = render(<Icon name="Instagram" debugId="custom-id" />);
      const icon = container.querySelector('[data-icon-Instagram-id="custom-id-icon-Instagram"]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute(
        "data-icon-Instagram-id",
        "custom-id-icon-Instagram"
      );
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders LinkedIn icon with name prop and custom className", () => {
      const { container } = render(<Icon name="LinkedIn" className="custom-class" />);
      const icon = container.querySelector('[data-icon-LinkedIn-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("class");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders GitHub icon with name prop and dimensions", () => {
      const { container } = render(<Icon name="GitHub" width="32" height="32" />);
      const icon = container.querySelector('[data-icon-GitHub-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ArrowDown icon with name prop and custom data attribute", () => {
      const { container } = render(<Icon name="ArrowDown" data-test="arrow-test" />);
      const icon = container.querySelector('[data-icon-ArrowDown-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("data-test", "arrow-test");
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ArrowLeft icon with name prop", () => {
      const { container } = render(<Icon name="ArrowLeft" />);
      const icon = container.querySelector('[data-icon-ArrowLeft-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Briefcase icon with name prop", () => {
      const { container } = render(<Icon name="Briefcase" />);
      const icon = container.querySelector('[data-icon-Briefcase-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ChevronDown icon with name prop", () => {
      const { container } = render(<Icon name="ChevronDown" />);
      const icon = container.querySelector('[data-icon-ChevronDown-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders ChevronRight icon with name prop", () => {
      const { container } = render(<Icon name="ChevronRight" />);
      const icon = container.querySelector('[data-icon-ChevronRight-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Close icon with name prop", () => {
      const { container } = render(<Icon name="Close" />);
      const icon = container.querySelector('[data-icon-Close-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Link icon with name prop", () => {
      const { container } = render(<Icon name="Link" />);
      const icon = container.querySelector('[data-icon-Link-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Mail icon with name prop", () => {
      const { container } = render(<Icon name="Mail" />);
      const icon = container.querySelector('[data-icon-Mail-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Sun icon with name prop", () => {
      const { container } = render(<Icon name="Sun" />);
      const icon = container.querySelector('[data-icon-Sun-id]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.tagName).toBe("svg");
    });

    it("renders Moon icon with name prop", () => {
      const { container } = render(<Icon name="Moon" />);
      const icon = container.querySelector('[data-icon-Moon-id]');
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
          <Icon name="X" debugMode />
          <Icon name="Instagram" debugMode />
          <Icon name="LinkedIn" debugMode />
          <Icon name="GitHub" debugMode />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id]');
      const instagramIcon = container.querySelector('[data-icon-Instagram-id]');
      const linkedinIcon = container.querySelector('[data-icon-LinkedIn-id]');
      const githubIcon = container.querySelector('[data-icon-GitHub-id]');

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
          <Icon name="X" debugId="custom-x" />
          <Icon name="Instagram" debugId="custom-instagram" />
          <Icon name="LinkedIn" debugId="custom-linkedin" />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id="custom-x-icon-X"]');
      const instagramIcon = container.querySelector('[data-icon-Instagram-id="custom-instagram-icon-Instagram"]');
      const linkedinIcon = container.querySelector('[data-icon-LinkedIn-id="custom-linkedin-icon-LinkedIn"]');

      expect(xIcon).toHaveAttribute("data-icon-X-id", "custom-x-icon-X");
      expect(instagramIcon).toHaveAttribute(
        "data-icon-Instagram-id",
        "custom-instagram-icon-Instagram"
      );
      expect(linkedinIcon).toHaveAttribute(
        "data-icon-LinkedIn-id",
        "custom-linkedin-icon-LinkedIn"
      );
    });

    it("handles HTML attributes consistently", () => {
      const { container } = render(
        <div>
          <Icon name="X" width="24" height="24" className="icon-class" />
          <Icon name="Instagram" width="24" height="24" className="icon-class" />
          <Icon name="LinkedIn" width="24" height="24" className="icon-class" />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id]');
      const instagramIcon = container.querySelector('[data-icon-Instagram-id]');
      const linkedinIcon = container.querySelector('[data-icon-LinkedIn-id]');

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
          <Icon name="X" debugMode />
          <Icon name="Instagram" debugMode />
          <Icon name="ArrowDown" debugMode />
          <Icon name="Close" debugMode />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id]');
      const instagramIcon = container.querySelector('[data-icon-Instagram-id]');
      const arrowDownIcon = container.querySelector('[data-icon-ArrowDown-id]');
      const closeIcon = container.querySelector('[data-icon-Close-id]');

      const icons = [xIcon, instagramIcon, arrowDownIcon, closeIcon];

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("data-debug-mode", "true");
        expect(icon).toBeInTheDocument();
      });
    });

    it("maintains consistent component ID generation", () => {
      const { container } = render(
        <div>
          <Icon name="X" />
          <Icon name="Instagram" />
          <Icon name="ArrowDown" />
          <Icon name="Close" />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id]');
      const instagramIcon = container.querySelector('[data-icon-Instagram-id]');
      const arrowDownIcon = container.querySelector('[data-icon-ArrowDown-id]');
      const closeIcon = container.querySelector('[data-icon-Close-id]');

      expect(xIcon).toHaveAttribute("data-icon-X-id");
      expect(instagramIcon).toHaveAttribute("data-icon-Instagram-id");
      expect(arrowDownIcon).toHaveAttribute("data-icon-ArrowDown-id");
      expect(closeIcon).toHaveAttribute("data-icon-Close-id");
    });

    it("maintains consistent accessibility attributes", () => {
      const { container } = render(
        <div>
          <Icon name="X" />
          <Icon name="Instagram" />
          <Icon name="ArrowDown" />
          <Icon name="Close" />
          <Icon name="Link" />
          <Icon name="Mail" />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id]');
      const instagramIcon = container.querySelector('[data-icon-Instagram-id]');
      const arrowDownIcon = container.querySelector('[data-icon-ArrowDown-id]');
      const closeIcon = container.querySelector('[data-icon-Close-id]');
      const linkIcon = container.querySelector('[data-icon-Link-id]');
      const mailIcon = container.querySelector('[data-icon-Mail-id]');

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
      const socialIcons = ["X", "Instagram", "LinkedIn", "GitHub"] as const;

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
        "ArrowDown",
        "ArrowLeft",
        "ChevronDown",
        "ChevronRight",
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
      const uiIcons = ["Close", "Link", "Mail", "Briefcase", "Sun", "Moon"] as const;

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
          <Icon name="X" />
          <Icon name="ArrowDown" />
          <Icon name="Close" />
          <Icon name="Link" />
        </div>
      );

      const xIcon = container.querySelector('[data-icon-X-id]');
      const arrowDownIcon = container.querySelector('[data-icon-ArrowDown-id]');
      const closeIcon = container.querySelector('[data-icon-Close-id]');
      const linkIcon = container.querySelector('[data-icon-Link-id]');

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
        "X",
        "Instagram",
        "LinkedIn",
        "GitHub",
        "ArrowDown",
        "ArrowLeft",
        "ChevronDown",
        "ChevronRight",
        "Close",
        "Link",
        "Mail",
        "Briefcase",
        "Sun",
        "Moon",
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
          name="X"
          role="img"
          aria-label="X (Twitter) icon"
          aria-hidden="false"
        />
      );
      const icon = container.querySelector('[data-icon-X-id]');
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
          <Icon name="X" />
          <Icon name="Instagram" />
          <Icon name="ArrowDown" />
          <Icon name="Close" />
          <Icon name="Mail" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(5);
      svgs.forEach((svg) => expect(svg).toBeInTheDocument());
    });

    it("handles icon updates efficiently", () => {
      const { rerender, container } = render(<Icon name="X" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();

      rerender(<Icon name="X" className="updated-class" />);
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
          <Icon name="X" />
          <Icon>
            <path d="M10 10h4v4h-4z" />
          </Icon>
          <Icon name="Instagram" />
        </div>
      );

      const svgs = container.querySelectorAll("svg");
      expect(svgs).toHaveLength(3);

      // Named icon
      const xIcon = container.querySelector("[data-icon-X-id]");
      expect(xIcon).toBeInTheDocument();

      // Custom SVG (no data attributes)
      const customIcon = container.querySelector("svg:not([data-icon-X-id]):not([data-icon-Instagram-id])");
      expect(customIcon).toBeInTheDocument();
      expect(customIcon?.querySelector("path")).toBeInTheDocument();

      // Named icon
      const instagramIcon = container.querySelector("[data-icon-Instagram-id]");
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
          <Icon name="X" className="icon-class" width="24" height="24" />
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
  | "X"
  | "Instagram"
  | "LinkedIn"
  | "GitHub"
  | "ArrowDown"
  | "ArrowLeft"
  | "Briefcase"
  | "ChevronDown"
  | "ChevronRight"
  | "Close"
  | "Link"
  | "Mail"
  | "Sun"
  | "Moon";
