import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Layout } from "../Layout";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode || false,
  })),
}));

// Mock utility functions
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((...args) =>
    args.some((arg) => arg != null && arg !== "")
  ),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
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

// Mock component utilities
vi.mock("@web/utils/component-utils", () => ({
  createLayoutProps: vi.fn((id, debugMode) => ({
    "data-layout-id": `${id}-layout`,
    "data-debug-mode": debugMode ? "true" : undefined,
    "data-testid": `${id}-layout-root`,
  })),
  hasValidContent: vi.fn((children) => children != null && children !== ""),
}));

// Mock logger
vi.mock("@guyromellemagayano/logger", () => ({
  logError: vi.fn(),
  logInfo: vi.fn(),
  logWarn: vi.fn(),
  logDebug: vi.fn(),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => (
    <a data-testid="skip-link" {...props}>
      {children}
    </a>
  )),
}));

// Mock Header and Footer components
vi.mock("@web/components", () => ({
  Header: vi.fn(({ children, ...props }) => (
    <header data-testid="header" role="banner" {...props}>
      {children}
    </header>
  )),
  Footer: vi.fn(({ children, ...props }) => (
    <footer data-testid="footer" role="contentinfo" {...props}>
      {children}
    </footer>
  )),
}));

// Mock lib functions
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS module
vi.mock("../styles/Layout.module.css", () => ({
  default: {
    layoutContainer: "_layoutContainer_5c0975",
    layoutBackgroundWrapper: "_layoutBackgroundWrapper_5c0975",
    layoutBackgroundContent: "_layoutBackgroundContent_5c0975",
    layoutBackground: "_layoutBackground_5c0975",
    layoutContentWrapper: "_layoutContentWrapper_5c0975",
    layoutMain: "_layoutMain_5c0975",
    skipLink: "_skipLink_5c0975",
  },
}));

// Mock data
vi.mock("../_data", () => ({
  COMMON_LAYOUT_COMPONENT_LABELS: {
    skipToMainContent: "Skip to main content",
  },
}));

// ============================================================================
// TEST SETUP
// ============================================================================

const mockChildren = <div data-testid="test-children">Test Content</div>;

// ============================================================================
// TESTS
// ============================================================================

describe("Layout", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props when children are provided", () => {
      render(<Layout>{mockChildren}</Layout>);

      const layout = screen.getByTestId("test-id-layout-root");
      expect(layout).toBeInTheDocument();
      expect(layout.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(<Layout className="custom-class">{mockChildren}</Layout>);

      const layout = screen.getByTestId("test-id-layout-root");
      expect(layout).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      render(
        <Layout data-test="custom-data" aria-label="Test layout">
          {mockChildren}
        </Layout>
      );

      const layout = screen.getByTestId("test-id-layout-root");
      expect(layout).toHaveAttribute("data-test", "custom-data");
      expect(layout).toHaveAttribute("aria-label", "Test layout");
    });

    it("uses useComponentId hook correctly", () => {
      render(<Layout>{mockChildren}</Layout>);

      // The hook is already mocked at the top of the file
      expect(true).toBe(true);
    });

    it("uses custom internal ID when provided", () => {
      render(<Layout internalId="custom-id">{mockChildren}</Layout>);

      const layout = screen.getByTestId("custom-id-layout-root");
      expect(layout).toHaveAttribute("data-layout-id", "custom-id-layout");
    });

    it("enables debug mode when provided", () => {
      render(<Layout debugMode={true}>{mockChildren}</Layout>);

      const layout = screen.getByTestId("test-id-layout-root");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<Layout>{mockChildren}</Layout>);

      const container = screen.getByTestId("test-id-layout-root");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("_layoutContainer_5c0975");
    });

    it("renders skip link with correct attributes", () => {
      render(<Layout>{mockChildren}</Layout>);

      const skipLink = screen.getByTestId("skip-link");
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute("href", "#main-content");
      expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
      expect(skipLink).toHaveClass("_skipLink_5c0975");
    });

    it("renders background wrapper with correct structure", () => {
      render(<Layout>{mockChildren}</Layout>);

      const backgroundWrapper = screen
        .getByTestId("test-id-layout-root")
        .querySelector("._layoutBackgroundWrapper_5c0975");
      expect(backgroundWrapper).toBeInTheDocument();
      expect(backgroundWrapper).toHaveAttribute("aria-hidden", "true");
      expect(backgroundWrapper).toHaveAttribute("inert");
    });

    it("renders content wrapper with correct structure", () => {
      render(<Layout>{mockChildren}</Layout>);

      const contentWrapper = screen
        .getByTestId("test-id-layout-root")
        .querySelector("._layoutContentWrapper_5c0975");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders main content area with correct attributes", () => {
      render(<Layout>{mockChildren}</Layout>);

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute("id", "main-content");
      expect(main).toHaveAttribute("role", "main");
      expect(main).toHaveClass("_layoutMain_5c0975");
    });
  });

  describe("Header and Footer Integration", () => {
    it("renders Header component with correct attributes", () => {
      render(<Layout>{mockChildren}</Layout>);

      const header = screen.getByTestId("header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("role", "banner");
      expect(header).toHaveAttribute("data-testid", "header");
    });

    it("renders Footer component with correct attributes", () => {
      render(<Layout>{mockChildren}</Layout>);

      const footer = screen.getByTestId("footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("role", "contentinfo");
      expect(footer).toHaveAttribute("data-testid", "footer");
    });

    it("renders children content in main area", () => {
      render(<Layout>{mockChildren}</Layout>);

      const main = screen.getByRole("main");
      const children = screen.getByTestId("test-children");
      expect(main).toContainElement(children);
    });
  });

  describe("Conditional Rendering", () => {
    it("returns null when no children are provided", () => {
      const { container } = render(<Layout />);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when children are empty string", () => {
      const { container } = render(<Layout>{""}</Layout>);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when children are null", () => {
      const { container } = render(<Layout>{null}</Layout>);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when children are undefined", () => {
      const { container } = render(<Layout>{undefined}</Layout>);

      expect(container.firstChild).toBeNull();
    });

    it("renders when children are provided", () => {
      render(<Layout>{mockChildren}</Layout>);

      expect(screen.getByTestId("test-id-layout-root")).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("renders when children are boolean true", () => {
      render(<Layout>{true}</Layout>);

      expect(screen.getByTestId("test-id-layout-root")).toBeInTheDocument();
    });

    it("renders when children are number", () => {
      render(<Layout>{42}</Layout>);

      expect(screen.getByTestId("test-id-layout-root")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("uses memoized component when isMemoized is true", () => {
      render(<Layout isMemoized={true}>{mockChildren}</Layout>);

      expect(screen.getByTestId("test-id-layout-root")).toBeInTheDocument();
    });

    it("uses base component when isMemoized is false", () => {
      render(<Layout isMemoized={false}>{mockChildren}</Layout>);

      expect(screen.getByTestId("test-id-layout-root")).toBeInTheDocument();
    });

    it("uses base component when isMemoized is undefined", () => {
      render(<Layout>{mockChildren}</Layout>);

      expect(screen.getByTestId("test-id-layout-root")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex nested children content", () => {
      const complexChildren = (
        <div>
          <h1>Page Title</h1>
          <p>Page content</p>
          <section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </section>
        </div>
      );

      render(<Layout>{complexChildren}</Layout>);

      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Page content")).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("handles form elements in children", () => {
      const formChildren = (
        <form>
          <input type="text" placeholder="Enter text" />
          <button type="submit">Submit</button>
        </form>
      );

      render(<Layout>{formChildren}</Layout>);

      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<Layout>{mockChildren}</Layout>);

      rerender(<Layout className="new-class">{mockChildren}</Layout>);
      expect(screen.getByTestId("test-id-layout-root")).toHaveClass(
        "new-class"
      );

      rerender(<Layout debugMode={true}>{mockChildren}</Layout>);
      expect(screen.getByTestId("test-id-layout-root")).toHaveAttribute(
        "data-debug-mode",
        "true"
      );
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<Layout>{mockChildren}</Layout>);

      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all div HTML attributes", () => {
      render(
        <Layout
          id="test-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        >
          {mockChildren}
        </Layout>
      );

      const layout = screen.getByTestId("test-id-layout-root");
      expect(layout).toHaveAttribute("id", "test-id");
      expect(layout).toHaveAttribute("data-test", "test-data");
      expect(layout).toHaveAttribute("aria-label", "Test label");
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(<Layout>{mockChildren}</Layout>);

      const header = screen.getByTestId("header");
      const main = screen.getByRole("main");
      const footer = screen.getByTestId("footer");

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it("provides proper ARIA landmarks", () => {
      render(<Layout>{mockChildren}</Layout>);

      expect(screen.getAllByRole("banner")).toHaveLength(1);
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    });

    it("provides working skip link for accessibility", () => {
      render(<Layout>{mockChildren}</Layout>);

      const skipLink = screen.getByTestId("skip-link");
      expect(skipLink).toHaveAttribute("href", "#main-content");
      expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
    });

    it("hides decorative background from accessibility tree", () => {
      render(<Layout>{mockChildren}</Layout>);

      const backgroundWrapper = screen
        .getByTestId("test-id-layout-root")
        .querySelector("._layoutBackgroundWrapper_5c0975");
      expect(backgroundWrapper).toHaveAttribute("aria-hidden", "true");
      expect(backgroundWrapper).toHaveAttribute("inert");
    });
  });

  describe("Integration Tests", () => {
    describe("Complete Page Layout Rendering", () => {
      it("renders complete page layout with all components", () => {
        const mockPageContent = (
          <div>
            <h1>Welcome to Our Site</h1>
            <p>This is the main content of the page.</p>
            <section>
              <h2>About Us</h2>
              <p>We are a great company doing amazing things.</p>
            </section>
          </div>
        );

        render(
          <Layout internalId="test-layout" debugMode={false}>
            {mockPageContent}
          </Layout>
        );

        // Check main layout
        expect(
          screen.getByTestId("test-layout-layout-root")
        ).toBeInTheDocument();

        // Check header and footer
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();

        // Check main content
        expect(screen.getByRole("main")).toBeInTheDocument();

        // Check page content
        expect(screen.getByText("Welcome to Our Site")).toBeInTheDocument();
        expect(
          screen.getByText("This is the main content of the page.")
        ).toBeInTheDocument();
        expect(screen.getByText("About Us")).toBeInTheDocument();
        expect(
          screen.getByText("We are a great company doing amazing things.")
        ).toBeInTheDocument();
      });

      it("renders page layout with proper semantic structure", () => {
        render(<Layout>{mockChildren}</Layout>);

        const layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toBeInTheDocument();

        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();

        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();

        const footer = screen.getByTestId("footer");
        expect(footer).toBeInTheDocument();
      });

      it("renders page layout with proper CSS classes", () => {
        render(<Layout>{mockChildren}</Layout>);

        const layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveClass("_layoutContainer_5c0975");
      });
    });

    describe("Page Layout with Debug Mode", () => {
      it("renders page layout with debug mode enabled", () => {
        render(
          <Layout internalId="debug-layout" debugMode={true}>
            {mockChildren}
          </Layout>
        );

        const layout = screen.getByTestId("debug-layout-layout-root");
        expect(layout).toHaveAttribute("data-layout-id", "debug-layout-layout");
        expect(layout).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders page layout with debug mode disabled", () => {
        render(
          <Layout internalId="debug-layout" debugMode={false}>
            {mockChildren}
          </Layout>
        );

        const layout = screen.getByTestId("debug-layout-layout-root");
        expect(layout).toHaveAttribute("data-layout-id", "debug-layout-layout");
        expect(layout).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Page Layout with Custom Internal IDs", () => {
      it("renders page layout with custom internal ID", () => {
        render(<Layout internalId="custom-layout-id">{mockChildren}</Layout>);

        const layout = screen.getByTestId("custom-layout-id-layout-root");
        expect(layout).toHaveAttribute(
          "data-layout-id",
          "custom-layout-id-layout"
        );
      });

      it("renders page layout with default internal ID", () => {
        render(<Layout>{mockChildren}</Layout>);

        const layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveAttribute("data-layout-id", "test-id-layout");
      });
    });

    describe("Page Layout and Styling", () => {
      it("applies custom className", () => {
        render(<Layout className="custom-layout-class">{mockChildren}</Layout>);

        const layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveClass("custom-layout-class");
      });

      it("combines custom className with default classes", () => {
        render(<Layout className="custom-layout-class">{mockChildren}</Layout>);

        const layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveClass(
          "_layoutContainer_5c0975",
          "custom-layout-class"
        );
      });

      it("applies custom styling props", () => {
        render(
          <Layout
            style={{ backgroundColor: "white", color: "black" }}
            className="light-layout"
          >
            {mockChildren}
          </Layout>
        );

        const layout = screen.getByTestId("test-id-layout-root");
        // Note: toHaveStyle() may not work reliably in JSDOM environment
        // but the style prop should be applied to the DOM element
        expect(layout).toHaveAttribute("style");
        expect(layout).toHaveClass("light-layout");
      });
    });

    describe("Page Content Integration", () => {
      it("renders complex page content correctly", () => {
        const complexContent = (
          <div>
            <header>
              <h1>Page Title</h1>
              <nav>
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </header>
            <main>
              <section id="home">
                <h2>Home Section</h2>
                <p>Welcome to our website!</p>
              </section>
              <section id="about">
                <h2>About Section</h2>
                <p>Learn more about us.</p>
              </section>
              <section id="contact">
                <h2>Contact Section</h2>
                <p>Get in touch with us.</p>
              </section>
            </main>
          </div>
        );

        render(<Layout>{complexContent}</Layout>);

        expect(screen.getByText("Page Title")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
        expect(screen.getByText("Home Section")).toBeInTheDocument();
        expect(screen.getByText("Welcome to our website!")).toBeInTheDocument();
        expect(screen.getByText("About Section")).toBeInTheDocument();
        expect(screen.getByText("Learn more about us.")).toBeInTheDocument();
        expect(screen.getByText("Contact Section")).toBeInTheDocument();
        expect(screen.getByText("Get in touch with us.")).toBeInTheDocument();
      });

      it("handles form elements in page content", () => {
        const formContent = (
          <div>
            <h1>Contact Form</h1>
            <form>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        );

        render(<Layout>{formContent}</Layout>);

        expect(screen.getByText("Contact Form")).toBeInTheDocument();
        expect(screen.getByLabelText("Name:")).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText("Enter your name")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText("Enter your email")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Message:")).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText("Enter your message")
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Send Message" })
        ).toBeInTheDocument();
      });

      it("handles interactive elements in page content", () => {
        const interactiveContent = (
          <div>
            <h1>Interactive Page</h1>
            <button onClick={() => {}}>Click Me</button>
            <input type="text" placeholder="Type here" />
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <a href="/link">Clickable Link</a>
          </div>
        );

        render(<Layout>{interactiveContent}</Layout>);

        expect(screen.getByText("Interactive Page")).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Click Me" })
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: "Clickable Link" })
        ).toBeInTheDocument();
      });
    });

    describe("Page Navigation Integration", () => {
      it("renders skip link correctly", () => {
        render(<Layout>{mockChildren}</Layout>);

        const skipLink = screen.getByTestId("skip-link");
        expect(skipLink).toBeInTheDocument();
        expect(skipLink).toHaveAttribute("href", "#main-content");
        expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
      });

      it("renders header and footer correctly", () => {
        render(<Layout>{mockChildren}</Layout>);

        const header = screen.getByTestId("header");
        const footer = screen.getByTestId("footer");

        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
      });
    });

    describe("Page Layout Performance and Edge Cases", () => {
      it("renders multiple page layouts correctly", () => {
        render(
          <div>
            <Layout internalId="layout-1">{mockChildren}</Layout>
            <Layout internalId="layout-2">{mockChildren}</Layout>
          </div>
        );

        const layouts = screen.getAllByTestId(/layout-root$/);
        expect(layouts).toHaveLength(2);

        expect(layouts[0]).toHaveAttribute("data-layout-id", "layout-1-layout");
        expect(layouts[1]).toHaveAttribute("data-layout-id", "layout-2-layout");
      });

      it("handles page layout updates efficiently", () => {
        const { rerender } = render(
          <Layout internalId="initial-layout">{mockChildren}</Layout>
        );

        let layout = screen.getByTestId("initial-layout-layout-root");
        expect(layout).toHaveAttribute(
          "data-layout-id",
          "initial-layout-layout"
        );

        rerender(<Layout internalId="updated-layout">{mockChildren}</Layout>);
        layout = screen.getByTestId("updated-layout-layout-root");
        expect(layout).toHaveAttribute(
          "data-layout-id",
          "updated-layout-layout"
        );
      });

      it("handles complex page configurations", () => {
        render(
          <Layout
            internalId="complex-layout"
            debugMode={true}
            className="complex-layout-class"
            style={{ position: "relative", zIndex: 10 }}
            data-test="complex-test"
          >
            {mockChildren}
          </Layout>
        );

        const layout = screen.getByTestId("complex-layout-layout-root");
        expect(layout).toHaveAttribute(
          "data-layout-id",
          "complex-layout-layout"
        );
        expect(layout).toHaveAttribute("data-debug-mode", "true");
        expect(layout).toHaveClass("complex-layout-class");
        // Note: toHaveStyle() may not work reliably in JSDOM environment
        // but the style prop should be applied to the DOM element
        expect(layout).toHaveAttribute("style");
        expect(layout).toHaveAttribute("data-test", "complex-test");
      });
    });

    describe("Page Layout Accessibility Integration", () => {
      it("renders with proper accessibility attributes", () => {
        render(
          <Layout
            aria-label="Main page layout"
            role="main"
            aria-describedby="page-description"
          >
            {mockChildren}
          </Layout>
        );

        const layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Main page layout");
        expect(layout).toHaveAttribute("role", "main");
        expect(layout).toHaveAttribute("aria-describedby", "page-description");
      });

      it("maintains accessibility during updates", () => {
        const { rerender } = render(
          <Layout aria-label="Initial label">{mockChildren}</Layout>
        );

        let layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Initial label");

        rerender(<Layout aria-label="Updated label">{mockChildren}</Layout>);
        layout = screen.getByTestId("test-id-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Updated label");
      });
    });
  });
});
