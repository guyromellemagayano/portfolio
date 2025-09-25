import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Footer from "../Footer";

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
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  formatDateSafely: vi.fn((date, options) => {
    if (options?.year === "numeric") {
      return new Date(date).getFullYear().toString();
    }
    return date.toISOString();
  }),
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

vi.mock("../_internal", () => ({
  FooterNavigation: vi.fn(({ ...props }) => {
    // Use the mocked data from the _data mock
    const mockLinks = [
      { kind: "internal", label: "About", href: "/about" },
      { kind: "internal", label: "Articles", href: "/articles" },
      { kind: "internal", label: "Projects", href: "/projects" },
      { kind: "internal", label: "Speaking", href: "/speaking" },
      { kind: "internal", label: "Uses", href: "/uses" },
    ];

    return (
      <nav data-testid="footer-navigation" {...props}>
        {mockLinks.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    );
  }),
  FooterLegal: vi.fn(({ ...props }) => {
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

vi.mock("@web/components/_shared", () => ({
  FOOTER_COMPONENT_LABELS: {
    legalText: "&copy; 2024 Guy Romelle Magayano. All rights reserved.",
  },
  FOOTER_COMPONENT_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Articles", href: "/articles" },
    { kind: "internal", label: "Projects", href: "/projects" },
    { kind: "internal", label: "Speaking", href: "/speaking" },
    { kind: "internal", label: "Uses", href: "/uses" },
  ],
}));

vi.mock("../Footer.module.css", () => ({
  default: {
    footerComponent: "_footerComponent_eedc07",
    footerContentWrapper: "_footerContentWrapper_eedc07",
    footerLayout: "_footerLayout_eedc07",
  },
}));

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

      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner")).toBeInTheDocument();
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        )
      ).toBeInTheDocument();
    });

    it("renders with default legal text from internal data", () => {
      render(<Footer />);

      expect(
        screen.getByText(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        )
      ).toBeInTheDocument();
    });

    it("renders with default navigation links from internal data", () => {
      render(<Footer />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders with debug mode enabled", () => {
      render(<Footer debugId="test-id" debugMode />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render debug mode when disabled", () => {
      render(<Footer debugId="test-id" debugMode={false} />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debug ID", () => {
      render(<Footer debugId="custom-id" />);

      const footer = screen.getByTestId("custom-id-footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "custom-id-footer");
    });

    it("renders without debug ID when not provided", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveClass("custom-footer");
    });

    it("combines CSS module classes with custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveClass("_footerComponent_eedc07 custom-footer");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(<Footer aria-label="Site footer" role="contentinfo" />);

      const footer = screen.getByTestId("test-id-footer-root");
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

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveAttribute("id", "main-footer");
      expect(footer).toHaveClass("footer-class");
      expect(footer).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Component Structure", () => {
    it("renders as footer element", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with proper container structure", () => {
      render(<Footer />);

      expect(screen.getByTestId("container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner")).toBeInTheDocument();
    });

    it("renders with proper layout structure", () => {
      render(<Footer />);

      const contentWrapper = screen.getByTestId("container-outer");
      const layout = contentWrapper.querySelector("._footerLayout_eedc07");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Sub-component Integration", () => {
    it("renders FooterNavigation with internal data", () => {
      render(<Footer />);

      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    it("renders FooterLegal with internal data", () => {
      render(<Footer />);

      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        )
      ).toBeInTheDocument();
    });

    it("uses internal data for all sub-components", () => {
      render(<Footer />);

      expect(
        screen.getByText(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with proper semantic structure", () => {
      render(<Footer />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with proper data attributes for debugging", () => {
      render(<Footer debugId="test-id" debugMode />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
      expect(footer).toHaveAttribute("data-testid", "test-id-footer-root");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Footer isMemoized={true} />);
      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<Footer isMemoized={false} />);

      rerender(<Footer isMemoized={false} />);
      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without any props", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
    });

    it("renders with default navigation links", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("renders with default legal text", () => {
      render(<Footer />);

      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
      expect(
        screen.getByText(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        )
      ).toBeInTheDocument();
    });
  });
});
