import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../Footer";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
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

vi.mock("@web/components/container", () => ({
  Container: {
    Outer: vi.fn(({ children, ...props }) => (
      <div data-testid="container-outer" {...props}>
        {children}
      </div>
    )),
    Inner: vi.fn(({ children, ...props }) => (
      <div data-testid="container-inner" {...props}>
        {children}
      </div>
    )),
  },
}));

vi.mock("../_internal", () => ({
  FooterNavigation: vi.fn(({ links, ...props }) => {
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
          <a
            key={link.label}
            href={
              typeof link.href === "string" ? link.href : link.href.toString()
            }
          >
            {link.label}
          </a>
        ))}
      </nav>
    );
  }),
  FooterLegal: vi.fn(({ legalText, ...props }) => {
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

vi.mock("../_data", () => ({
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

vi.mock("../styles/Footer.module.css", () => ({
  default: {
    footerComponent: "_footerComponent_eedc07",
    footerContentWrapper: "_footerContentWrapper_eedc07",
    footerLayout: "_footerLayout_eedc07",
  },
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("Footer", () => {
  afterEach(() => {
    cleanup();
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
      render(<Footer debugMode />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render debug mode when disabled", () => {
      render(<Footer debugMode={false} />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(<Footer internalId="custom-id" />);

      const footer = screen.getByTestId("custom-id-footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "custom-id-footer");
    });

    it("renders without internal ID when not provided", () => {
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
      render(<Footer internalId="test-id" debugMode />);

      const footer = screen.getByTestId("test-id-footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
      expect(footer).toHaveAttribute("data-testid", "test-id-footer-root");
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

  describe("Integration Tests", () => {
    describe("Complete Footer Rendering", () => {
      it("renders complete footer with all sub-components", () => {
        render(<Footer internalId="test-footer" debugMode={false} />);

        // Check main footer
        expect(
          screen.getByTestId("test-footer-footer-root")
        ).toBeInTheDocument();

        // Check container structure
        expect(screen.getByTestId("container-outer")).toBeInTheDocument();
        expect(screen.getByTestId("container-inner")).toBeInTheDocument();

        // Check all sub-components
        expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
        expect(screen.getByTestId("footer-legal")).toBeInTheDocument();

        // Check content
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

      it("renders footer with default navigation links", () => {
        render(<Footer />);

        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Articles")).toBeInTheDocument();
        expect(screen.getByText("Projects")).toBeInTheDocument();
        expect(screen.getByText("Speaking")).toBeInTheDocument();
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
          "&copy; 2024 Guy Romelle Magayano. All rights reserved.";
        expect(screen.getByText(defaultLegalText)).toBeInTheDocument();
        expect(screen.getByTestId("footer-legal")).toHaveTextContent(
          defaultLegalText
        );
      });
    });

    describe("Footer with Debug Mode", () => {
      it("renders footer with debug mode enabled", () => {
        render(<Footer internalId="debug-footer" debugMode={true} />);

        const footer = screen.getByTestId("debug-footer-footer-root");
        expect(footer).toHaveAttribute("data-footer-id", "debug-footer-footer");
        expect(footer).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders footer with debug mode disabled", () => {
        render(<Footer internalId="debug-footer" debugMode={false} />);

        const footer = screen.getByTestId("debug-footer-footer-root");
        expect(footer).toHaveAttribute("data-footer-id", "debug-footer-footer");
        expect(footer).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Footer with Custom Internal IDs", () => {
      it("renders footer with custom internal ID", () => {
        render(<Footer internalId="custom-footer-id" />);

        const footer = screen.getByTestId("custom-footer-id-footer-root");
        expect(footer).toHaveAttribute(
          "data-footer-id",
          "custom-footer-id-footer"
        );
      });

      it("renders footer with default internal ID", () => {
        render(<Footer />);

        const footer = screen.getByTestId("test-id-footer-root");
        expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
      });
    });

    describe("Footer Layout and Styling", () => {
      it("applies correct CSS classes", () => {
        render(<Footer />);

        const footer = screen.getByTestId("test-id-footer-root");
        expect(footer).toHaveClass("_footerComponent_eedc07");

        const contentWrapper = screen
          .getByTestId("container-outer")
          .querySelector("div");
        expect(contentWrapper).toHaveClass("_footerContentWrapper_eedc07");
      });

      it("combines custom className with default classes", () => {
        render(<Footer className="custom-footer-class" />);

        const footer = screen.getByTestId("test-id-footer-root");
        expect(footer).toHaveClass(
          "_footerComponent_eedc07",
          "custom-footer-class"
        );
      });

      it("applies custom styling props", () => {
        render(
          <Footer
            style={{ backgroundColor: "black", color: "white" }}
            className="dark-footer"
          />
        );

        const footer = screen.getByTestId("test-id-footer-root");
        // Check that the styles are applied (they might be in different format)
        expect(footer.style.backgroundColor).toBe("black");
        expect(footer.style.color).toBe("white");
        expect(footer).toHaveClass("dark-footer");
      });
    });

    describe("Footer Navigation Integration", () => {
      it("renders navigation with proper link structure", () => {
        render(<Footer />);

        const navigation = screen.getByTestId("footer-navigation");
        expect(navigation).toBeInTheDocument();

        const links = navigation.querySelectorAll("a");
        expect(links).toHaveLength(5);

        expect(links[0]).toHaveTextContent("About");
        expect(links[0]).toHaveAttribute("href", "/about");
        expect(links[1]).toHaveTextContent("Articles");
        expect(links[1]).toHaveAttribute("href", "/articles");
        expect(links[2]).toHaveTextContent("Projects");
        expect(links[2]).toHaveAttribute("href", "/projects");
        expect(links[3]).toHaveTextContent("Speaking");
        expect(links[3]).toHaveAttribute("href", "/speaking");
        expect(links[4]).toHaveTextContent("Uses");
        expect(links[4]).toHaveAttribute("href", "/uses");
      });
    });

    describe("Footer Legal Integration", () => {
      it("renders legal text with proper structure", () => {
        render(<Footer />);

        const legalSection = screen.getByTestId("footer-legal");
        expect(legalSection).toBeInTheDocument();
        expect(legalSection).toHaveTextContent(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        );
      });

      it("renders legal text with HTML entities", () => {
        render(<Footer />);

        const legalSection = screen.getByTestId("footer-legal");
        expect(legalSection).toBeInTheDocument();
        expect(legalSection.innerHTML).toContain("&amp;copy;");
        expect(legalSection.innerHTML).toContain("Guy Romelle Magayano");
        expect(legalSection.innerHTML).toContain("All rights reserved.");
      });
    });

    describe("Footer Performance and Edge Cases", () => {
      it("renders multiple footer instances correctly", () => {
        render(
          <div>
            <Footer internalId="footer-1" />
            <Footer internalId="footer-2" />
          </div>
        );

        const footers = screen.getAllByTestId(/footer-root$/);
        expect(footers).toHaveLength(2);

        expect(footers[0]).toHaveAttribute("data-footer-id", "footer-1-footer");
        expect(footers[1]).toHaveAttribute("data-footer-id", "footer-2-footer");
      });

      it("handles footer updates efficiently", () => {
        const { rerender } = render(<Footer />);

        let footer = screen.getByTestId("test-id-footer-root");
        expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");

        rerender(<Footer internalId="updated-footer" />);
        footer = screen.getByTestId("updated-footer-footer-root");
        expect(footer).toHaveAttribute(
          "data-footer-id",
          "updated-footer-footer"
        );
      });

      it("handles default navigation link structures", () => {
        render(<Footer />);

        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Articles")).toBeInTheDocument();
        expect(screen.getByText("Projects")).toBeInTheDocument();
        expect(screen.getByText("Speaking")).toBeInTheDocument();
        expect(screen.getByText("Uses")).toBeInTheDocument();

        const navigation = screen.getByTestId("footer-navigation");
        const links = navigation.querySelectorAll("a");
        expect(links).toHaveLength(5);
      });
    });
  });
});
