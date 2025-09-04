import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

import "@testing-library/jest-dom";

// Mock the external dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (children === null || children === undefined) {
      return false;
    }
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock internal components
vi.mock(
  "../_internal/ContainerOuter",
  () => ({
    ContainerOuter: React.forwardRef<HTMLDivElement, any>(
      function MockContainerOuter(props, ref) {
        const {
          children,
          internalId,
          debugMode,
          "data-testid": dataTestId,
          ...rest
        } = props;
        return (
          <div
            ref={ref}
            data-container-outer-id={internalId}
            data-debug-mode={debugMode ? "true" : undefined}
            data-testid={dataTestId || "container-outer-root"}
            {...rest}
          >
            <div data-testid="container-outer-content">{children}</div>
          </div>
        );
      }
    ),
  }),
  { virtual: true }
);

vi.mock(
  "../_internal/ContainerInner",
  () => ({
    ContainerInner: React.forwardRef<HTMLDivElement, any>(
      function MockContainerInner(props, ref) {
        const { children, internalId, debugMode, ...rest } = props;
        return (
          <div
            ref={ref}
            data-testid="container-inner-root"
            data-container-inner-id={internalId}
            data-debug-mode={debugMode ? "true" : undefined}
            {...rest}
          >
            <div data-testid="container-inner-content">{children}</div>
          </div>
        );
      }
    ),
  }),
  { virtual: true }
);

describe("Container", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Main Container Component", () => {
    it("renders children directly", () => {
      render(<Container>Test Content</Container>);

      expect(screen.getByTestId("container-root")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("does not render if children is null", () => {
      const { container } = render(<Container>{null}</Container>);

      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(<Container>{undefined}</Container>);

      expect(container.firstChild).toBeNull();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);

      expect(ref.current).toBe(screen.getByTestId("container-root"));
    });

    it("passes className and other props", () => {
      render(
        <Container className="custom-class" id="custom-id">
          Content
        </Container>
      );

      const container = screen.getByTestId("container-root");
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveAttribute("id", "custom-id");
    });

    it("renders with proper structure", () => {
      render(<Container>Content</Container>);

      const container = screen.getByTestId("container-root");
      const content = screen.getByText("Content");

      expect(container).toContainElement(content);
    });
  });

  describe("Compound Component Integration", () => {
    it("composes all container components together", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>Nested Content</Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("container-root")).toBeInTheDocument();
      expect(screen.getByTestId("container-outer-root")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner-root")).toBeInTheDocument();
      expect(screen.getByText("Nested Content")).toBeInTheDocument();
    });

    it("handles complex nested structure", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <div>Level 1</div>
              <Container.Outer>
                <Container.Inner>Level 2</Container.Inner>
              </Container.Outer>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByText("Level 1")).toBeInTheDocument();
      expect(screen.getByText("Level 2")).toBeInTheDocument();
    });

    it("supports multiple nested containers", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>First</Container.Inner>
          </Container.Outer>
          <Container.Outer>
            <Container.Inner>Second</Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
    });

    it("handles empty container with no children", () => {
      const { container } = render(<Container />);

      expect(container.firstChild).toBeNull();
    });

    it("handles container with empty string children", () => {
      render(<Container>{""}</Container>);

      expect(screen.getByTestId("container-root")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode to main container", () => {
      render(<Container debugMode>Content</Container>);

      const container = screen.getByTestId("container-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Outer", () => {
      render(
        <Container>
          <Container.Outer debugMode>Content</Container.Outer>
        </Container>
      );

      const outer = screen.getByTestId("container-outer-root");
      expect(outer).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Inner", () => {
      render(
        <Container>
          <Container.Inner debugMode>Content</Container.Inner>
        </Container>
      );

      const inner = screen.getByTestId("container-inner-root");
      expect(inner).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when false", () => {
      render(<Container debugMode={false}>Content</Container>);

      const container = screen.getByTestId("container-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode when undefined", () => {
      render(<Container>Content</Container>);

      const container = screen.getByTestId("container-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("applies custom component ID to main container", () => {
      render(<Container internalId="custom-id">Content</Container>);

      const container = screen.getByTestId("container-root");
      expect(container).toHaveAttribute("data-container-id", "custom-id");
    });

    it("applies custom component ID to Container.Outer", () => {
      render(
        <Container>
          <Container.Outer internalId="custom-outer-id">
            Content
          </Container.Outer>
        </Container>
      );

      const outer = screen.getByTestId("container-outer-root");
      expect(outer).toHaveAttribute(
        "data-container-outer-id",
        "custom-outer-id"
      );
    });

    it("applies custom component ID to Container.Inner", () => {
      render(
        <Container>
          <Container.Inner internalId="custom-inner-id">
            Content
          </Container.Inner>
        </Container>
      );

      const inner = screen.getByTestId("container-inner-root");
      expect(inner).toHaveAttribute(
        "data-container-inner-id",
        "custom-inner-id"
      );
    });

    it("generates default component ID when not provided", () => {
      render(<Container>Content</Container>);

      const container = screen.getByTestId("container-root");
      expect(container).toHaveAttribute("data-container-id", "test-id");
    });
  });

  describe("Accessibility", () => {
    it("forwards aria attributes to main container", () => {
      render(
        <Container aria-label="Main container" role="main">
          Content
        </Container>
      );

      const container = screen.getByTestId("container-root");
      expect(container).toHaveAttribute("aria-label", "Main container");
      expect(container).toHaveAttribute("role", "main");
    });

    it("forwards aria attributes to Container.Outer", () => {
      render(
        <Container>
          <Container.Outer aria-label="Outer container" role="region">
            Content
          </Container.Outer>
        </Container>
      );

      const outer = screen.getByTestId("container-outer-root");
      expect(outer).toHaveAttribute("aria-label", "Outer container");
      expect(outer).toHaveAttribute("role", "region");
    });

    it("forwards aria attributes to Container.Inner", () => {
      render(
        <Container>
          <Container.Inner aria-label="Inner container" role="contentinfo">
            Content
          </Container.Inner>
        </Container>
      );

      const inner = screen.getByTestId("container-inner-root");
      expect(inner).toHaveAttribute("aria-label", "Inner container");
      expect(inner).toHaveAttribute("role", "contentinfo");
    });

    it("forwards multiple aria attributes", () => {
      render(
        <Container
          aria-label="Container"
          aria-describedby="description"
          aria-hidden="false"
        >
          Content
        </Container>
      );

      const container = screen.getByTestId("container-root");
      expect(container).toHaveAttribute("aria-label", "Container");
      expect(container).toHaveAttribute("aria-describedby", "description");
      expect(container).toHaveAttribute("aria-hidden", "false");
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple children", () => {
      const children = Array.from({ length: 100 }, (_, i) => (
        <div key={i}>Child {i}</div>
      ));

      render(<Container>{children}</Container>);

      expect(screen.getByText("Child 0")).toBeInTheDocument();
      expect(screen.getByText("Child 99")).toBeInTheDocument();
    });

    it("handles empty children efficiently", () => {
      const { container } = render(<Container>{null}</Container>);

      expect(container.firstChild).toBeNull();
    });

    it("handles large content efficiently", () => {
      const largeContent = "x".repeat(10000);
      render(<Container>{largeContent}</Container>);

      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });

    it("handles dynamic content updates efficiently", () => {
      const { rerender } = render(<Container>Initial</Container>);

      expect(screen.getByText("Initial")).toBeInTheDocument();

      rerender(<Container>Updated</Container>);

      expect(screen.getByText("Updated")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles React elements as children", () => {
      const ChildComponent = function () {
        return <span>Child Component</span>;
      };
      render(
        <Container>
          <ChildComponent />
        </Container>
      );

      expect(screen.getByText("Child Component")).toBeInTheDocument();
    });

    it("handles function children", () => {
      const ChildFunction = () => "Function Child";
      render(<Container>{ChildFunction}</Container>);

      // Function children are not rendered by isRenderableContent
      expect(screen.queryByText(/Function Child/)).not.toBeInTheDocument();
    });

    it("handles array children", () => {
      const children = ["Text 1", "Text 2", "Text 3"];
      render(<Container>{children}</Container>);

      expect(screen.getByText(/Text 1/)).toBeInTheDocument();
      expect(screen.getByText(/Text 2/)).toBeInTheDocument();
      expect(screen.getByText(/Text 3/)).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <Container>
          Text
          <div>Element</div>
          {42}
          {true && "Conditional"}
        </Container>
      );

      expect(screen.getByText(/Text/)).toBeInTheDocument();
      expect(screen.getByText("Element")).toBeInTheDocument();
      expect(screen.getByText(/42/)).toBeInTheDocument();
      expect(screen.getByText(/Conditional/)).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <Container>
          <header>Header</header>
          <main>
            <section>Section 1</section>
            <section>Section 2</section>
          </main>
          <footer>Footer</footer>
        </Container>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 2")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      render(
        <Container>
          <div>Content</div>
        </Container>
      );

      const container = screen.getByTestId("container-root");
      const content = screen.getByText("Content");

      expect(container).toContainElement(content);
    });

    it("handles CSS module class merging correctly", () => {
      render(<Container className="custom-class">Content</Container>);

      const container = screen.getByTestId("container-root");
      expect(container).toHaveClass("custom-class");
    });
  });

  describe("Integration Tests", () => {
    describe("Compound Component Usage", () => {
      it("renders Container.Outer correctly", () => {
        render(
          <Container.Outer internalId="test-outer" debugMode={false}>
            Outer Content
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toBeInTheDocument();
        expect(outer).toHaveAttribute("data-container-outer-id", "test-outer");
        expect(outer).not.toHaveAttribute("data-debug-mode");
        expect(screen.getByText("Outer Content")).toBeInTheDocument();
      });

      it("renders Container.Inner correctly", () => {
        render(
          <Container.Inner internalId="test-inner" debugMode={false}>
            Inner Content
          </Container.Inner>
        );

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toBeInTheDocument();
        expect(inner).toHaveAttribute("data-container-inner-id", "test-inner");
        expect(inner).not.toHaveAttribute("data-debug-mode");
        expect(screen.getByText("Inner Content")).toBeInTheDocument();
      });

      it("renders nested Container components", () => {
        render(
          <Container.Outer internalId="outer" debugMode={false}>
            <Container.Inner internalId="inner" debugMode={false}>
              Nested Content
            </Container.Inner>
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        const inner = screen.getByTestId("container-inner-root");

        expect(outer).toBeInTheDocument();
        expect(inner).toBeInTheDocument();
        expect(screen.getByText("Nested Content")).toBeInTheDocument();
      });
    });

    describe("Container with Debug Mode", () => {
      it("renders Container.Outer with debug mode enabled", () => {
        render(
          <Container.Outer internalId="debug-outer" debugMode={true}>
            Debug Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute("data-container-outer-id", "debug-outer");
        expect(outer).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders Container.Inner with debug mode enabled", () => {
        render(
          <Container.Inner internalId="debug-inner" debugMode={true}>
            Debug Inner
          </Container.Inner>
        );

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveAttribute("data-container-inner-id", "debug-inner");
        expect(inner).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders Container.Outer with debug mode disabled", () => {
        render(
          <Container.Outer internalId="debug-outer" debugMode={false}>
            No Debug Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute("data-container-outer-id", "debug-outer");
        expect(outer).not.toHaveAttribute("data-debug-mode");
      });

      it("renders Container.Inner with debug mode disabled", () => {
        render(
          <Container.Inner internalId="debug-inner" debugMode={false}>
            No Debug Inner
          </Container.Inner>
        );

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveAttribute("data-container-inner-id", "debug-inner");
        expect(inner).not.toHaveAttribute("data-debug-mode");
      });
    });

    describe("Container with Custom Internal IDs", () => {
      it("renders Container.Outer with custom internal ID", () => {
        render(
          <Container.Outer internalId="custom-outer-id">
            Custom Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute(
          "data-container-outer-id",
          "custom-outer-id"
        );
      });

      it("renders Container.Inner with custom internal ID", () => {
        render(
          <Container.Inner internalId="custom-inner-id">
            Custom Inner
          </Container.Inner>
        );

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveAttribute(
          "data-container-inner-id",
          "custom-inner-id"
        );
      });

      it("renders Container.Outer with default internal ID", () => {
        render(<Container.Outer>Default Outer</Container.Outer>);

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute("data-container-outer-id", "test-id");
      });

      it("renders Container.Inner with default internal ID", () => {
        render(<Container.Inner>Default Inner</Container.Inner>);

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveAttribute("data-container-inner-id", "test-id");
      });
    });

    describe("Container Layout and Styling", () => {
      it("applies custom className to Container.Outer", () => {
        render(
          <Container.Outer className="custom-outer-class">
            Styled Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveClass("custom-outer-class");
      });

      it("applies custom className to Container.Inner", () => {
        render(
          <Container.Inner className="custom-inner-class">
            Styled Inner
          </Container.Inner>
        );

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveClass("custom-inner-class");
      });

      it("applies custom styling props to Container.Outer", () => {
        render(
          <Container.Outer
            style={{ backgroundColor: "black", color: "white" }}
            className="dark-outer"
          >
            Dark Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveStyle({ backgroundColor: "black", color: "white" });
        expect(outer).toHaveClass("dark-outer");
      });

      it("applies custom styling props to Container.Inner", () => {
        render(
          <Container.Inner
            style={{ padding: "20px", margin: "10px" }}
            className="spaced-inner"
          >
            Spaced Inner
          </Container.Inner>
        );

        const inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveStyle({ padding: "20px", margin: "10px" });
        expect(inner).toHaveClass("spaced-inner");
      });
    });

    describe("Container Content Integration", () => {
      it("renders complex content in Container.Outer", () => {
        render(
          <Container.Outer>
            <header>Header</header>
            <main>
              <section>Section 1</section>
              <section>Section 2</section>
            </main>
            <footer>Footer</footer>
          </Container.Outer>
        );

        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Section 1")).toBeInTheDocument();
        expect(screen.getByText("Section 2")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
      });

      it("renders complex content in Container.Inner", () => {
        render(
          <Container.Inner>
            <div>
              <h1>Title</h1>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
            </div>
          </Container.Inner>
        );

        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
        expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
      });

      it("handles form elements in Container.Outer", () => {
        render(
          <Container.Outer>
            <form>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <button type="submit">Submit</button>
            </form>
          </Container.Outer>
        );

        expect(screen.getByLabelText("Name:")).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Submit" })
        ).toBeInTheDocument();
      });

      it("handles form elements in Container.Inner", () => {
        render(
          <Container.Inner>
            <form>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
              <button type="submit">Send</button>
            </form>
          </Container.Inner>
        );

        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Send" })
        ).toBeInTheDocument();
      });
    });

    describe("Container Performance and Edge Cases", () => {
      it("renders multiple container instances correctly", () => {
        render(
          <div>
            <Container.Outer internalId="outer-1">Outer 1</Container.Outer>
            <Container.Inner internalId="inner-1">Inner 1</Container.Inner>
            <Container.Outer internalId="outer-2">Outer 2</Container.Outer>
            <Container.Inner internalId="inner-2">Inner 2</Container.Inner>
          </div>
        );

        const outers = screen.getAllByTestId("container-outer-root");
        const inners = screen.getAllByTestId("container-inner-root");

        expect(outers).toHaveLength(2);
        expect(inners).toHaveLength(2);

        expect(outers[0]).toHaveAttribute("data-container-outer-id", "outer-1");
        expect(outers[1]).toHaveAttribute("data-container-outer-id", "outer-2");
        expect(inners[0]).toHaveAttribute("data-container-inner-id", "inner-1");
        expect(inners[1]).toHaveAttribute("data-container-inner-id", "inner-2");
      });

      it("handles container updates efficiently", () => {
        const { rerender } = render(
          <Container.Outer internalId="initial-outer">Initial</Container.Outer>
        );

        let outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute(
          "data-container-outer-id",
          "initial-outer"
        );

        rerender(
          <Container.Outer internalId="updated-outer">Updated</Container.Outer>
        );
        outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute(
          "data-container-outer-id",
          "updated-outer"
        );
      });

      it("handles complex container configurations", () => {
        render(
          <Container.Outer
            internalId="complex-outer"
            debugMode={true}
            className="complex-outer-class"
            style={{ position: "relative", zIndex: 10 }}
            data-test="complex-test"
          >
            Complex Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute(
          "data-container-outer-id",
          "complex-outer"
        );
        expect(outer).toHaveAttribute("data-debug-mode", "true");
        expect(outer).toHaveClass("complex-outer-class");
        expect(outer).toHaveStyle({ position: "relative", zIndex: 10 });
        expect(outer).toHaveAttribute("data-test", "complex-test");
      });
    });

    describe("Container Accessibility Integration", () => {
      it("renders with proper accessibility attributes", () => {
        render(
          <Container.Outer
            aria-label="Main container"
            role="main"
            aria-describedby="container-description"
          >
            Accessible Outer
          </Container.Outer>
        );

        const outer = screen.getByTestId("container-outer-root");
        expect(outer).toHaveAttribute("aria-label", "Main container");
        expect(outer).toHaveAttribute("role", "main");
        expect(outer).toHaveAttribute(
          "aria-describedby",
          "container-description"
        );
      });

      it("maintains accessibility during updates", () => {
        const { rerender } = render(
          <Container.Inner aria-label="Initial label" />
        );

        let inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveAttribute("aria-label", "Initial label");

        rerender(<Container.Inner aria-label="Updated label" />);
        inner = screen.getByTestId("container-inner-root");
        expect(inner).toHaveAttribute("aria-label", "Updated label");
      });
    });
  });
});
