import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../Footer";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) {
      component.displayName = displayName;
    }
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
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date(date).getFullYear().toString();
    }
    return date.toISOString();
  }),
  hasValidNavigationLinks: vi.fn((links) => {
    if (links === null || links === undefined) return false;
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
  filterValidNavigationLinks: vi.fn((links) => {
    if (!links || !Array.isArray(links)) return [];
    return links.filter((link) => {
      return (
        link &&
        typeof link.label === "string" &&
        link.label.length > 0 &&
        link.href !== null &&
        link.href !== undefined
      );
    });
  }),
  isValidLink: vi.fn((href) => {
    return href && typeof href === "string" && href.length > 0;
  }),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || "_self",
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  })),
}));

vi.mock("@web/components", () => ({
  ContainerOuter: vi.fn(({ children, ...props }) => (
    <div data-testid="test-id-container-outer" {...props}>
      {children}
    </div>
  )),
  ContainerInner: vi.fn(({ children, ...props }) => (
    <div data-testid="test-id-container-inner" {...props}>
      {children}
    </div>
  )),
}));

vi.mock("./_internal", () => ({
  FooterNavigation: ({ ...props }) => (
    <nav data-testid="test-id-footer-navigation" {...props}>
      <a href="/about">About</a>
      <a href="/articles">Articles</a>
      <a href="/projects">Projects</a>
      <a href="/speaking">Speaking</a>
      <a href="/uses">Uses</a>
    </nav>
  ),
  FooterLegal: ({ ...props }) => (
    <div data-testid="test-id-footer-legal" {...props}>
      © 2025 Guy Romelle Magayano. All rights reserved.
    </div>
  ),
}));

vi.mock("./_data", () => ({
  FOOTER_COMPONENT_LABELS: {
    legalText: "© 2025 Guy Romelle Magayano. All rights reserved.",
  },
  FOOTER_COMPONENT_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
    { kind: "internal", label: "Projects", href: "/projects" },

    { kind: "internal", label: "Uses", href: "/uses" },
  ],
}));

// Footer component uses Tailwind CSS, no CSS modules needed

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("Footer", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders footer with default content", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer")).toBeInTheDocument();
      expect(screen.getByTestId("test-id-container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("test-id-container-inner")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-footer-navigation")
      ).toBeInTheDocument();
      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("renders with default legal text from internal data", () => {
      render(<Footer />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("renders with default navigation links from internal data", () => {
      render(<Footer />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders with debug mode enabled", () => {
      render(<Footer debugId="test-id" debugMode />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render debug mode when disabled", () => {
      render(<Footer debugId="test-id" debugMode={false} />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debug ID", () => {
      render(<Footer debugId="custom-id" />);

      const footer = screen.getByTestId("custom-id-footer");
      expect(footer).toHaveAttribute("data-footer-id", "custom-id-footer");
    });

    it("renders without debug ID when not provided", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("class");
    });

    it("combines Tailwind classes with custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("class");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(<Footer aria-label="Site footer" role="contentinfo" />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("aria-label", "Site footer");
      expect(footer).toHaveAttribute("role", "contentinfo");
    });

    it("passes through all standard HTML attributes", () => {
      render(
        <Footer
          id="main-footer"
          className="footer-class"
          style={{ backgroundColor: "black" }}
          data-custom="value"
        />
      );

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("id", "main-footer");
      expect(footer).toHaveAttribute("class");
      expect(footer).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Component Structure", () => {
    it("renders as footer element", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with proper container structure", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("test-id-container-inner")).toBeInTheDocument();
    });

    it("renders with proper layout structure", () => {
      render(<Footer />);

      const contentWrapper = screen.getByTestId("test-id-container-outer");
      const firstDiv = contentWrapper.querySelector("div");
      expect(firstDiv).toHaveAttribute("class");

      // Check for the inner layout div (ContainerInner > div)
      const containerInner = screen.getByTestId("test-id-container-inner");
      const layoutDiv = containerInner.querySelector("div");
      expect(layoutDiv).toHaveAttribute("class");
    });
  });

  describe("Sub-component Integration", () => {
    it("renders FooterNavigation with internal data", () => {
      render(<Footer />);

      expect(
        screen.getByTestId("test-id-footer-navigation")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("renders FooterLegal with internal data", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("uses internal data for all sub-components", () => {
      render(<Footer />);

      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with proper data attributes for debugging", () => {
      render(<Footer debugId="test-id" debugMode />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
      expect(footer).toHaveAttribute("data-testid", "test-id-footer");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main footer elements", () => {
      render(<Footer debugId="aria-test" />);

      // Test footer element
      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toBeInTheDocument();
      expect(footerElement.tagName).toBe("FOOTER");
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<Footer debugId="aria-test" />);

      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toHaveAttribute("role", "contentinfo");
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(<Footer debugId="aria-test" />);

      // Footer should have unique ID
      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toHaveAttribute(
        "data-footer-id",
        "aria-test-footer"
      );
    });

    it("applies correct ARIA labels to content elements", () => {
      render(<Footer debugId="aria-test" aria-label="Site footer" />);

      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toHaveAttribute("aria-label", "Site footer");
    });

    it("handles ARIA attributes when content is missing", () => {
      render(<Footer debugId="aria-test" />);

      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toHaveAttribute("role", "contentinfo");
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(<Footer debugId="different-test" />);

      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toHaveAttribute(
        "data-footer-id",
        "different-test-footer"
      );
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Footer isMemoized={true} />);
      expect(screen.getByTestId("test-id-footer")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<Footer isMemoized={false} />);

      rerender(<Footer isMemoized={false} />);
      expect(screen.getByTestId("test-id-footer")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without any props", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer")).toBeInTheDocument();
    });

    it("renders with default navigation links", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-footer-navigation")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("renders with default legal text", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer")).toBeInTheDocument();
      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
    });
  });
});
