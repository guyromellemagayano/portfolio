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

      expect(screen.getByTestId("footer-root")).toBeInTheDocument();
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

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render debug mode when disabled", () => {
      render(<Footer debugMode={false} />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("renders with custom internal ID", () => {
      render(<Footer internalId="custom-id" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "custom-id-footer");
    });

    it("renders without internal ID when not provided", () => {
      render(<Footer />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("custom-footer");
    });

    it("combines CSS module classes with custom className", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("footerComponent custom-footer");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(<Footer aria-label="Site footer" role="contentinfo" />);

      const footer = screen.getByTestId("footer-root");
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

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("id", "main-footer");
      expect(footer).toHaveClass("footer-class");
      expect(footer).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Component Structure", () => {
    it("renders as footer element", () => {
      render(<Footer />);

      const footer = screen.getByTestId("footer-root");
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

      const footer = screen.getByTestId("footer-root");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with proper data attributes for debugging", () => {
      render(<Footer internalId="test-id" debugMode />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
      expect(footer).toHaveAttribute("data-testid", "footer-root");
    });
  });

  describe("Edge Cases", () => {
    it("renders without any props", () => {
      render(<Footer />);

      expect(screen.getByTestId("footer-root")).toBeInTheDocument();
    });

    it("renders with empty navLinks array", () => {
      render(<Footer navLinks={[]} />);

      expect(screen.getByTestId("footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
    });

    it("renders with empty legalText", () => {
      render(<Footer legalText="" />);

      expect(screen.getByTestId("footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
    });
  });
});
