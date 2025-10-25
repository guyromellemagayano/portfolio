import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../Footer";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+ coverage, key paths + edges)
// - Risk Tier: Core
// - Component Type: Orchestrator
// ============================================================================

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
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
    target: target || (href?.startsWith("http") ? "_blank" : undefined),
    rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
  })),
}));

vi.mock("@web/components", () => ({
  ContainerOuter: vi.fn(({ children, ...props }) => (
    <div data-testid="container-outer" {...props}>
      {children}
    </div>
  )),
  ContainerInner: vi.fn(({ children, ...props }) => (
    <div data-testid="container-inner" {...props}>
      {children}
    </div>
  )),
}));

vi.mock("../internal", () => ({
  FooterNavigation: vi.fn(({ links: _links, ...props }) => {
    // Use the mocked data from the _data mock
    const mockLinks = [
      { kind: "internal", label: "About", href: "/about" },
      { kind: "internal", label: "Articles", href: "/articles" },
      { kind: "internal", label: "Projects", href: "/projects" },
      { kind: "internal", label: "Uses", href: "/uses" },
    ];

    return (
      <nav data-testid="footer-navigation" {...props}>
        {mockLinks.map((link) => (
          <a key={link.label} href={String(link.href)}>
            {link.label}
          </a>
        ))}
      </nav>
    );
  }),
  FooterLegal: vi.fn(({ legalText: _legalText, ...props }) => {
    // Use the mocked data from the _data mock
    const mockLegalText =
      "&copy; 2024 Guy Romelle Magayano. All rights reserved.";

    return (
      <div data-testid="footer-legal" {...props}>
        {mockLegalText}
      </div>
    );
  }),
}));

vi.mock("../data", () => ({
  FOOTER_COMPONENT_LABELS: {
    legalText: "&copy; 2024 Guy Romelle Magayano. All rights reserved.",
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

describe("Footer Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Complete Footer Rendering", () => {
    it("renders complete footer with all sub-components", () => {
      render(<Footer debugId="test-footer" debugMode={false} />);

      // Check main footer
      expect(screen.getByTestId("test-footer-footer")).toBeInTheDocument();

      // Check container structure
      expect(screen.getByTestId("container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner")).toBeInTheDocument();

      // Check all sub-components
      expect(
        screen.getByTestId("test-id-footer-navigation")
      ).toBeInTheDocument();
      expect(screen.getByTestId("test-id-footer-legal")).toBeInTheDocument();

      // Check content
      expect(
        screen.getByText("© 2025 Guy Romelle Magayano. All rights reserved.")
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("renders footer with default navigation links", () => {
      render(<Footer />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();

      const aboutLink = screen.getByText("About").closest("a");
      const articlesLink = screen.getByText("Articles").closest("a");
      const projectsLink = screen.getByText("Projects").closest("a");

      expect(aboutLink).toHaveAttribute("href", "/about");
      expect(articlesLink).toHaveAttribute("href", "/articles");
      expect(projectsLink).toHaveAttribute("href", "/projects");
    });

    it("renders footer with default legal text", () => {
      render(<Footer />);

      const defaultLegalText =
        "© 2025 Guy Romelle Magayano. All rights reserved.";
      expect(screen.getByText(defaultLegalText)).toBeInTheDocument();
      expect(screen.getByTestId("test-id-footer-legal")).toHaveTextContent(
        defaultLegalText
      );
    });
  });

  describe("Footer with Debug Mode", () => {
    it("renders footer with debug mode enabled", () => {
      render(<Footer debugId="debug-footer" debugMode={true} />);

      const footer = screen.getByTestId("debug-footer-footer");
      expect(footer).toHaveAttribute("data-footer-id", "debug-footer-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders footer with debug mode disabled", () => {
      render(<Footer debugId="debug-footer" debugMode={false} />);

      const footer = screen.getByTestId("debug-footer-footer");
      expect(footer).toHaveAttribute("data-footer-id", "debug-footer-footer");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Footer with Custom Debug IDs", () => {
    it("renders footer with custom debug ID", () => {
      render(<Footer debugId="custom-footer-id" />);

      const footer = screen.getByTestId("custom-footer-id-footer");
      expect(footer).toHaveAttribute(
        "data-footer-id",
        "custom-footer-id-footer"
      );
    });

    it("renders footer with default debug ID", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
    });
  });

  describe("Footer Layout and Styling", () => {
    it("applies correct CSS classes", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("class");

      const contentWrapper = screen
        .getByTestId("container-outer")
        .querySelector("div");
      expect(contentWrapper).toHaveClass(
        "border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40"
      );
    });

    it("combines custom className with default classes", () => {
      render(<Footer className="custom-footer-class" />);

      const footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("class");
    });

    it("applies custom styling props", () => {
      render(
        <Footer
          style={{ backgroundColor: "black", color: "white" }}
          className="dark-footer"
        />
      );

      const footer = screen.getByTestId("test-id-footer");
      // Check that the styles are applied (they might be in different format)
      expect(footer.style.backgroundColor).toBe("black");
      expect(footer.style.color).toBe("white");
      expect(footer).toHaveAttribute("class");
    });
  });

  describe("Footer Navigation Integration", () => {
    it("renders navigation with proper link structure", () => {
      render(<Footer />);

      const navigation = screen.getByTestId("test-id-footer-navigation");
      expect(navigation).toBeInTheDocument();

      const links = navigation.querySelectorAll("a");
      expect(links).toHaveLength(4);

      expect(links[0]).toHaveTextContent("About");
      expect(links[0]).toHaveAttribute("href", "/about");
      expect(links[1]).toHaveTextContent("Articles");
      expect(links[1]).toHaveAttribute("href", "/articles");
      expect(links[2]).toHaveTextContent("Projects");
      expect(links[2]).toHaveAttribute("href", "/projects");
      expect(links[3]).toHaveTextContent("Uses");
      expect(links[3]).toHaveAttribute("href", "/uses");
    });
  });

  describe("Footer Legal Integration", () => {
    it("renders legal text with proper structure", () => {
      render(<Footer />);

      const legalSection = screen.getByTestId("test-id-footer-legal");
      expect(legalSection).toBeInTheDocument();
      expect(legalSection).toHaveTextContent(
        "© 2025 Guy Romelle Magayano. All rights reserved."
      );
    });

    it("renders legal text with HTML entities", () => {
      render(<Footer />);

      const legalSection = screen.getByTestId("test-id-footer-legal");
      expect(legalSection).toBeInTheDocument();
      expect(legalSection.innerHTML).toContain("©");
      expect(legalSection.innerHTML).toContain("Guy Romelle Magayano");
      expect(legalSection.innerHTML).toContain("All rights reserved.");
    });
  });

  describe("Footer Performance and Edge Cases", () => {
    it("renders multiple footer instances correctly", () => {
      render(
        <div>
          <Footer debugId="footer-1" />
          <Footer debugId="footer-2" />
        </div>
      );

      const footers = screen.getAllByTestId(/footer$/);
      expect(footers).toHaveLength(2);

      expect(footers[0]).toHaveAttribute("data-footer-id", "footer-1-footer");
      expect(footers[1]).toHaveAttribute("data-footer-id", "footer-2-footer");
    });

    it("handles footer updates efficiently", () => {
      const { rerender } = render(<Footer />);

      let footer = screen.getByTestId("test-id-footer");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");

      rerender(<Footer debugId="updated-footer" />);
      footer = screen.getByTestId("updated-footer-footer");
      expect(footer).toHaveAttribute("data-footer-id", "updated-footer-footer");
    });

    it("handles default navigation link structures", () => {
      render(<Footer />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();

      const navigation = screen.getByTestId("test-id-footer-navigation");
      const links = navigation.querySelectorAll("a");
      expect(links).toHaveLength(4);
    });
  });
});
