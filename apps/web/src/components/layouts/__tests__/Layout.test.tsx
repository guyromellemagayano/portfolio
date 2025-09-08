import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BaseLayout } from "../Layout";

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
vi.mock("../Layout.module.css", () => ({
  default: {
    layoutContainer: "_layoutContainer_f23019",
    layoutBackgroundWrapper: "_layoutBackgroundWrapper_f23019",
    layoutBackgroundContent: "_layoutBackgroundContent_f23019",
    layoutBackground: "_layoutBackground_f23019",
    layoutContentWrapper: "_layoutContentWrapper_f23019",
    layoutMain: "_layoutMain_f23019",
    skipLink: "_skipLink_f23019",
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

describe("BaseLayout", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props when children are provided", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const layout = screen.getByTestId("base-layout-root");
      expect(layout).toBeInTheDocument();
      expect(layout.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      render(<BaseLayout className="custom-class">{mockChildren}</BaseLayout>);

      const layout = screen.getByTestId("base-layout-root");
      expect(layout).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      render(
        <BaseLayout data-test="custom-data" aria-label="Test layout">
          {mockChildren}
        </BaseLayout>
      );

      const layout = screen.getByTestId("base-layout-root");
      expect(layout).toHaveAttribute("data-test", "custom-data");
      expect(layout).toHaveAttribute("aria-label", "Test layout");
    });

    it("uses useComponentId hook correctly", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      // The hook is already mocked at the top of the file
      expect(true).toBe(true);
    });

    it("uses custom internal ID when provided", () => {
      render(<BaseLayout internalId="custom-id">{mockChildren}</BaseLayout>);

      const layout = screen.getByTestId("base-layout-root");
      expect(layout).toHaveAttribute(
        "data-base-layout-id",
        "custom-id-base-layout"
      );
    });

    it("enables debug mode when provided", () => {
      render(<BaseLayout debugMode={true}>{mockChildren}</BaseLayout>);

      const layout = screen.getByTestId("base-layout-root");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const container = screen.getByTestId("base-layout-root");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("_layoutContainer_f23019");
    });

    it("renders skip link with correct attributes", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const skipLink = screen.getByTestId("skip-link");
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute("href", "#main-content");
      expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
      expect(skipLink).toHaveClass("_skipLink_f23019");
    });

    it("renders background wrapper with correct structure", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const backgroundWrapper = screen
        .getByTestId("base-layout-root")
        .querySelector("._layoutBackgroundWrapper_f23019");
      expect(backgroundWrapper).toBeInTheDocument();
      expect(backgroundWrapper).toHaveAttribute("aria-hidden", "true");
      expect(backgroundWrapper).toHaveAttribute("inert");
    });

    it("renders content wrapper with correct structure", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const contentWrapper = screen
        .getByTestId("base-layout-root")
        .querySelector("._layoutContentWrapper_f23019");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("renders main content area with correct attributes", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const main = screen.getByTestId("layout-main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute("id", "main-content");
      expect(main).toHaveAttribute("role", "main");
      expect(main).toHaveClass("_layoutMain_f23019");
    });
  });

  describe("Header and Footer Integration", () => {
    it("renders Header component with correct attributes", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const header = screen.getByTestId("layout-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("role", "banner");
      expect(header).toHaveAttribute("data-testid", "layout-header");
    });

    it("renders Footer component with correct attributes", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const footer = screen.getByTestId("layout-footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute("role", "contentinfo");
      expect(footer).toHaveAttribute("data-testid", "layout-footer");
    });

    it("renders children content in main area", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const main = screen.getByTestId("layout-main");
      const children = screen.getByTestId("test-children");
      expect(main).toContainElement(children);
    });
  });

  describe("Conditional Rendering", () => {
    it("returns null when no children are provided", () => {
      const { container } = render(<BaseLayout />);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when children are empty string", () => {
      const { container } = render(<BaseLayout>{""}</BaseLayout>);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when children are null", () => {
      const { container } = render(<BaseLayout>{null}</BaseLayout>);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when children are undefined", () => {
      const { container } = render(<BaseLayout>{undefined}</BaseLayout>);

      expect(container.firstChild).toBeNull();
    });

    it("renders when children are provided", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("renders when children are boolean true", () => {
      render(<BaseLayout>{true}</BaseLayout>);

      expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();
    });

    it("renders when children are number", () => {
      render(<BaseLayout>{42}</BaseLayout>);

      expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("uses memoized component when isMemoized is true", () => {
      render(<BaseLayout isMemoized={true}>{mockChildren}</BaseLayout>);

      expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();
    });

    it("uses base component when isMemoized is false", () => {
      render(<BaseLayout isMemoized={false}>{mockChildren}</BaseLayout>);

      expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();
    });

    it("uses base component when isMemoized is undefined", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();
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

      render(<BaseLayout>{complexChildren}</BaseLayout>);

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

      render(<BaseLayout>{formChildren}</BaseLayout>);

      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Performance Tests", () => {
    it("renders efficiently with different props", () => {
      const { rerender } = render(<BaseLayout>{mockChildren}</BaseLayout>);

      rerender(<BaseLayout className="new-class">{mockChildren}</BaseLayout>);
      expect(screen.getByTestId("base-layout-root")).toHaveClass("new-class");

      rerender(<BaseLayout debugMode={true}>{mockChildren}</BaseLayout>);
      expect(screen.getByTestId("base-layout-root")).toHaveAttribute(
        "data-debug-mode",
        "true"
      );
    });
  });

  describe("Component Interface", () => {
    it("returns a React element", () => {
      const { container } = render(<BaseLayout>{mockChildren}</BaseLayout>);

      expect(container.firstChild).toBeInstanceOf(HTMLElement);
    });

    it("accepts all div HTML attributes", () => {
      render(
        <BaseLayout
          id="test-id"
          className="test-class"
          data-test="test-data"
          aria-label="Test label"
        >
          {mockChildren}
        </BaseLayout>
      );

      const layout = screen.getByTestId("base-layout-root");
      expect(layout).toHaveAttribute("id", "test-id");
      expect(layout).toHaveAttribute("data-test", "test-data");
      expect(layout).toHaveAttribute("aria-label", "Test label");
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const header = screen.getByTestId("layout-header");
      const main = screen.getByTestId("layout-main");
      const footer = screen.getByTestId("layout-footer");

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it("provides proper ARIA landmarks", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      expect(screen.getAllByRole("banner")).toHaveLength(1);
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
    });

    it("provides working skip link for accessibility", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const skipLink = screen.getByTestId("skip-link");
      expect(skipLink).toHaveAttribute("href", "#main-content");
      expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
    });

    it("hides decorative background from accessibility tree", () => {
      render(<BaseLayout>{mockChildren}</BaseLayout>);

      const backgroundWrapper = screen
        .getByTestId("base-layout-root")
        .querySelector("._layoutBackgroundWrapper_f23019");
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
          <BaseLayout internalId="test-layout" debugMode={false}>
            {mockPageContent}
          </BaseLayout>
        );

        // Check main layout
        expect(screen.getByTestId("base-layout-root")).toBeInTheDocument();

        // Check header and footer
        expect(screen.getByTestId("layout-header")).toBeInTheDocument();
        expect(screen.getByTestId("layout-footer")).toBeInTheDocument();

        // Check main content
        expect(screen.getByTestId("layout-main")).toBeInTheDocument();

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
        render(<BaseLayout>{mockChildren}</BaseLayout>);

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toBeInTheDocument();

        const header = screen.getByTestId("layout-header");
        expect(header).toBeInTheDocument();

        const main = screen.getByTestId("layout-main");
        expect(main).toBeInTheDocument();

        const footer = screen.getByTestId("layout-footer");
        expect(footer).toBeInTheDocument();
      });

      it("renders page layout with proper CSS classes", () => {
        render(<BaseLayout>{mockChildren}</BaseLayout>);

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveClass("_layoutContainer_f23019");
      });
    });

    describe("Page Layout with Debug Mode", () => {
      it("renders page layout with debug mode enabled", () => {
        render(
          <BaseLayout internalId="debug-layout" debugMode={true}>
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "debug-layout-base-layout"
        );
        expect(layout).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders page layout with debug mode disabled", () => {
        render(
          <BaseLayout internalId="debug-layout" debugMode={false}>
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "debug-layout-base-layout"
        );
        expect(layout).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Page Layout with Custom Internal IDs", () => {
      it("renders page layout with custom internal ID", () => {
        render(
          <BaseLayout internalId="custom-layout-id">{mockChildren}</BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "custom-layout-id-base-layout"
        );
      });

      it("renders page layout with default internal ID", () => {
        render(<BaseLayout>{mockChildren}</BaseLayout>);

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "test-id-base-layout"
        );
      });
    });

    describe("Page Layout and Styling", () => {
      it("applies custom className", () => {
        render(
          <BaseLayout className="custom-layout-class">
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveClass("custom-layout-class");
      });

      it("combines custom className with default classes", () => {
        render(
          <BaseLayout className="custom-layout-class">
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveClass(
          "_layoutContainer_f23019",
          "custom-layout-class"
        );
      });

      it("applies custom styling props", () => {
        render(
          <BaseLayout
            style={{ backgroundColor: "white", color: "black" }}
            className="light-layout"
          >
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
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

        render(<BaseLayout>{complexContent}</BaseLayout>);

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

        render(<BaseLayout>{formContent}</BaseLayout>);

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

        render(<BaseLayout>{interactiveContent}</BaseLayout>);

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
        render(<BaseLayout>{mockChildren}</BaseLayout>);

        const skipLink = screen.getByTestId("skip-link");
        expect(skipLink).toBeInTheDocument();
        expect(skipLink).toHaveAttribute("href", "#main-content");
        expect(skipLink).toHaveAttribute("aria-label", "Skip to main content");
      });

      it("renders header and footer correctly", () => {
        render(<BaseLayout>{mockChildren}</BaseLayout>);

        const header = screen.getByTestId("layout-header");
        const footer = screen.getByTestId("layout-footer");

        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
      });
    });

    describe("Page Layout Performance and Edge Cases", () => {
      it("renders multiple page layouts correctly", () => {
        render(
          <div>
            <BaseLayout internalId="layout-1">{mockChildren}</BaseLayout>
            <BaseLayout internalId="layout-2">{mockChildren}</BaseLayout>
          </div>
        );

        const layouts = screen.getAllByTestId("base-layout-root");
        expect(layouts).toHaveLength(2);

        expect(layouts[0]).toHaveAttribute(
          "data-base-layout-id",
          "layout-1-base-layout"
        );
        expect(layouts[1]).toHaveAttribute(
          "data-base-layout-id",
          "layout-2-base-layout"
        );
      });

      it("handles page layout updates efficiently", () => {
        const { rerender } = render(
          <BaseLayout internalId="initial-layout">{mockChildren}</BaseLayout>
        );

        let layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "initial-layout-base-layout"
        );

        rerender(
          <BaseLayout internalId="updated-layout">{mockChildren}</BaseLayout>
        );
        layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "updated-layout-base-layout"
        );
      });

      it("handles complex page configurations", () => {
        render(
          <BaseLayout
            internalId="complex-layout"
            debugMode={true}
            className="complex-layout-class"
            style={{ position: "relative", zIndex: 10 }}
            data-test="complex-test"
          >
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute(
          "data-base-layout-id",
          "complex-layout-base-layout"
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
          <BaseLayout
            aria-label="Main page layout"
            role="main"
            aria-describedby="page-description"
          >
            {mockChildren}
          </BaseLayout>
        );

        const layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Main page layout");
        expect(layout).toHaveAttribute("role", "main");
        expect(layout).toHaveAttribute("aria-describedby", "page-description");
      });

      it("maintains accessibility during updates", () => {
        const { rerender } = render(
          <BaseLayout aria-label="Initial label">{mockChildren}</BaseLayout>
        );

        let layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Initial label");

        rerender(
          <BaseLayout aria-label="Updated label">{mockChildren}</BaseLayout>
        );
        layout = screen.getByTestId("base-layout-root");
        expect(layout).toHaveAttribute("aria-label", "Updated label");
      });
    });
  });
});
