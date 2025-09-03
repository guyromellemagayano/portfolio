import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../Footer";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "default-footer",
    isDebugMode: debugMode || false,
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

describe("Footer Integration", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Complete Footer Rendering", () => {
    it("renders complete footer with all sub-components", () => {
      render(<Footer internalId="test-footer" debugMode={false} />);

      // Check main footer
      expect(screen.getByTestId("footer-root")).toBeInTheDocument();

      // Check container structure
      expect(screen.getByTestId("container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner")).toBeInTheDocument();

      // Check all sub-components
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();

      // Check default content
      expect(screen.getByText("Default Legal Text")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders with custom navigation links", () => {
      const customLinks = [
        { kind: "internal", label: "Home", href: "/" },
        { kind: "internal", label: "Contact", href: "/contact" },
      ];

      render(<Footer navLinks={customLinks} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders with custom legal text", () => {
      render(
        <Footer
          legalText="Custom Legal Text"
          internalId="custom-footer"
          debugMode={true}
        />
      );

      expect(screen.getByText("Custom Legal Text")).toBeInTheDocument();

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "custom-footer-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Sub-component Integration", () => {
    it("integrates with FooterNavigation component", () => {
      render(<Footer />);

      // Verify that the FooterNavigation component is rendered
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
    });

    it("integrates with FooterLegal component", () => {
      render(<Footer />);

      // Verify that the FooterLegal component is rendered
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
    });
  });

  describe("Accessibility Integration", () => {
    it("renders with proper accessibility attributes", () => {
      render(<Footer aria-label="Site footer" role="contentinfo" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("aria-label", "Site footer");
      expect(footer).toHaveAttribute("role", "contentinfo");
    });

    it("maintains semantic structure", () => {
      render(<Footer />);

      const footer = screen.getByTestId("footer-root");
      expect(footer.tagName).toBe("FOOTER");
    });
  });

  describe("Styling Integration", () => {
    it("renders with proper CSS classes", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("custom-footer");
    });

    it("combines CSS module classes correctly", () => {
      render(<Footer className="custom-footer" />);

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveClass("footerComponent custom-footer");
    });
  });

  describe("Data Integration", () => {
    it("uses default data when no props provided", () => {
      render(<Footer />);

      expect(screen.getByText("Default Legal Text")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("overrides default data with custom props", () => {
      const customLinks = [
        { kind: "internal", label: "Custom Link", href: "/custom" },
      ];

      render(<Footer navLinks={customLinks} legalText="Custom Legal" />);

      expect(screen.getByText("Custom Legal")).toBeInTheDocument();
      expect(screen.getByText("Custom Link")).toBeInTheDocument();
      expect(screen.queryByText("Default Legal Text")).not.toBeInTheDocument();
      expect(screen.queryByText("About")).not.toBeInTheDocument();
    });
  });

  describe("Container Integration", () => {
    it("properly integrates with Container components", () => {
      render(<Footer />);

      const containerOuter = screen.getByTestId("container-outer");
      const containerInner = screen.getByTestId("container-inner");

      expect(containerOuter).toBeInTheDocument();
      expect(containerInner).toBeInTheDocument();

      // Verify the container structure contains the footer content
      expect(containerOuter).toContainElement(containerInner);
    });

    it("maintains proper layout structure", () => {
      render(<Footer />);

      const contentWrapper = screen.getByTestId("container-outer");
      const layout = contentWrapper.querySelector(".footerLayout");

      expect(layout).toBeInTheDocument();
      expect(layout).toContainElement(screen.getByTestId("footer-navigation"));
      expect(layout).toContainElement(screen.getByTestId("footer-legal"));
    });
  });

  describe("Props Integration", () => {
    it("passes all props correctly to sub-components", () => {
      const customLinks = [
        { kind: "internal", label: "Test Link", href: "/test" },
      ];

      render(
        <Footer
          navLinks={customLinks}
          legalText="Test Legal"
          internalId="test-id"
          debugMode
          className="test-class"
        />
      );

      // Check that props are passed through correctly
      expect(screen.getByText("Test Link")).toBeInTheDocument();
      expect(screen.getByText("Test Legal")).toBeInTheDocument();

      const footer = screen.getByTestId("footer-root");
      expect(footer).toHaveAttribute("data-footer-id", "test-id-footer");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
      expect(footer).toHaveClass("test-class");
    });

    it("handles empty and edge case props", () => {
      render(<Footer navLinks={[]} legalText="" />);

      // Should still render the footer structure
      expect(screen.getByTestId("footer-root")).toBeInTheDocument();
      expect(screen.getByTestId("footer-navigation")).toBeInTheDocument();
      expect(screen.getByTestId("footer-legal")).toBeInTheDocument();
    });
  });
});
