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
  FooterNavigation: vi.fn(({ navLinks, ...props }) => (
    <nav data-testid="footer-navigation" {...props}>
      {navLinks?.map((link) => (
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
  )),
  FooterLegal: vi.fn(({ legalText, ...props }) => (
    <div data-testid="footer-legal" {...props}>
      {legalText}
    </div>
  )),
}));

vi.mock("../_data", () => ({
  FOOTER_COMPONENT_LABELS: {
    legalText: "Default Legal Text",
  },
  FOOTER_COMPONENT_NAV_LINKS: [
    { kind: "internal", label: "About", href: "/about" },
    { kind: "internal", label: "Contact", href: "/contact" },
  ],
}));

vi.mock("../Footer.module.css", () => ({
  default: {
    footerComponent: "footerComponent",
    footerContentWrapper: "footerContentWrapper",
    footerLayout: "footerLayout",
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
      expect(screen.getByText("Default Legal Text")).toBeInTheDocument();
    });

    it("renders with custom legal text", () => {
      render(<Footer legalText="Custom Legal Text" />);

      expect(screen.getByText("Custom Legal Text")).toBeInTheDocument();
    });

    it("renders with custom navigation links", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
        { kind: "internal", label: "Blog", href: "/blog" },
      ];

      render(<Footer navLinks={customLinks} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
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
      expect(footer).toHaveClass("footerComponent custom-footer");
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
      const layout = contentWrapper.querySelector(".footerLayout");
      expect(layout).toBeInTheDocument();
    });
  });

  describe("Sub-component Integration", () => {
    it("passes navLinks to FooterNavigation", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
        { kind: "internal", label: "About", href: "/about" },
      ];

      render(<Footer navLinks={customLinks} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("passes legalText to FooterLegal", () => {
      render(<Footer legalText="Custom Legal Text" />);

      expect(screen.getByText("Custom Legal Text")).toBeInTheDocument();
    });

    it("uses default values when props not provided", () => {
      render(<Footer />);

      expect(screen.getByText("Default Legal Text")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
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

    it("renders with empty navLinks array", () => {
      render(<Footer navLinks={[]} />);

      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
    });

    it("renders with empty legalText", () => {
      render(<Footer legalText="" />);

      expect(screen.getByTestId("test-id-footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
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
        expect(screen.getByText("Default Legal Text")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
      });

      it("renders footer with custom navigation links", () => {
        const customLinks = [
          { kind: "internal", label: "Home", href: "/" },
          { kind: "internal", label: "Services", href: "/services" },
          { kind: "external", label: "Blog", href: "https://blog.example.com" },
        ];

        render(<Footer navLinks={customLinks} />);

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Services")).toBeInTheDocument();
        expect(screen.getByText("Blog")).toBeInTheDocument();

        const homeLink = screen.getByText("Home").closest("a");
        const servicesLink = screen.getByText("Services").closest("a");
        const blogLink = screen.getByText("Blog").closest("a");

        expect(homeLink).toHaveAttribute("href", "/");
        expect(servicesLink).toHaveAttribute("href", "/services");
        expect(blogLink).toHaveAttribute("href", "https://blog.example.com");
      });

      it("renders footer with custom legal text", () => {
        const customLegalText = "© 2024 My Company. All rights reserved.";
        render(<Footer legalText={customLegalText} />);

        expect(screen.getByText(customLegalText)).toBeInTheDocument();
        expect(screen.getByTestId("footer-legal")).toHaveTextContent(
          customLegalText
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
        expect(footer).toHaveClass("footerComponent");

        const contentWrapper = screen
          .getByTestId("container-outer")
          .querySelector("div");
        expect(contentWrapper).toHaveClass("footerContentWrapper");
      });

      it("combines custom className with default classes", () => {
        render(<Footer className="custom-footer-class" />);

        const footer = screen.getByTestId("test-id-footer-root");
        expect(footer).toHaveClass("footerComponent", "custom-footer-class");
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
        const navLinks = [
          { kind: "internal", label: "Home", href: "/" },
          { kind: "internal", label: "About", href: "/about" },
        ];

        render(<Footer navLinks={navLinks} />);

        const navigation = screen.getByTestId("footer-navigation");
        expect(navigation).toBeInTheDocument();

        const links = navigation.querySelectorAll("a");
        expect(links).toHaveLength(2);

        expect(links[0]).toHaveTextContent("Home");
        expect(links[0]).toHaveAttribute("href", "/");
        expect(links[1]).toHaveTextContent("About");
        expect(links[1]).toHaveAttribute("href", "/about");
      });

      it("handles external navigation links", () => {
        const navLinks = [
          {
            kind: "external",
            label: "External Site",
            href: "https://external.com",
          },
        ];

        render(<Footer navLinks={navLinks} />);

        const link = screen.getByText("External Site");
        expect(link).toBeInTheDocument();
        expect(link.closest("a")).toHaveAttribute(
          "href",
          "https://external.com"
        );
      });

      it("handles mixed internal and external links", () => {
        const navLinks = [
          { kind: "internal", label: "Internal", href: "/internal" },
          { kind: "external", label: "External", href: "https://external.com" },
        ];

        render(<Footer navLinks={navLinks} />);

        expect(screen.getByText("Internal")).toBeInTheDocument();
        expect(screen.getByText("External")).toBeInTheDocument();

        const internalLink = screen.getByText("Internal").closest("a");
        const externalLink = screen.getByText("External").closest("a");

        expect(internalLink).toHaveAttribute("href", "/internal");
        expect(externalLink).toHaveAttribute("href", "https://external.com");
      });
    });

    describe("Footer Legal Integration", () => {
      it("renders legal text with proper structure", () => {
        const legalText = "© 2024 Company Name. All rights reserved.";
        render(<Footer legalText={legalText} />);

        const legalSection = screen.getByTestId("footer-legal");
        expect(legalSection).toBeInTheDocument();
        expect(legalSection).toHaveTextContent(legalText);
      });

      it("handles legal text with HTML content", () => {
        const legalText =
          "© 2024 <strong>Company Name</strong>. All rights reserved.";
        render(<Footer legalText={legalText} />);

        const legalSection = screen.getByTestId("footer-legal");
        expect(legalSection).toBeInTheDocument();
        // Check that the HTML content is rendered correctly (HTML is escaped)
        expect(legalSection.innerHTML).toContain(
          "&lt;strong&gt;Company Name&lt;/strong&gt;"
        );
        expect(legalSection.innerHTML).toContain("© 2024");
        expect(legalSection.innerHTML).toContain("All rights reserved.");
      });

      it("handles empty legal text gracefully", () => {
        render(<Footer legalText="" />);

        const legalSection = screen.getByTestId("footer-legal");
        expect(legalSection).toBeInTheDocument();
        expect(legalSection).toHaveTextContent("");
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

      it("handles complex navigation link structures", () => {
        const complexLinks = [
          { kind: "internal", label: "Home", href: "/" },
          { kind: "internal", label: "About", href: "/about" },
          {
            kind: "external",
            label: "Documentation",
            href: "https://docs.example.com",
          },
          { kind: "internal", label: "Contact", href: "/contact" },
        ];

        render(<Footer navLinks={complexLinks} />);

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Documentation")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();

        const navigation = screen.getByTestId("footer-navigation");
        const links = navigation.querySelectorAll("a");
        expect(links).toHaveLength(4);
      });
    });
  });
});
