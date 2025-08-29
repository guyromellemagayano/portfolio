import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

// Mock dependencies
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
    if (component) {
      component.displayName = displayName;
    }
    return component;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock internal components for consistent behavior
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
            data-container-outer-id={internalId || "test-id"}
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
            data-container-inner-id={internalId || "test-id"}
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

describe("Container Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    // Clear any leftover elements
    document.body.innerHTML = "";
  });

  describe("Compound Component Usage", () => {
    it("renders Container with manual ContainerOuter and ContainerInner", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>Content inside inner container</Container.Inner>
          </Container.Outer>
        </Container>
      );

      // Check that all container elements are rendered
      const mainContainer = screen.getByTestId("container-root");
      const outerContainer = screen.getByTestId("container-outer-root");
      const innerContainer = screen.getByTestId("container-inner-root");

      expect(mainContainer).toBeInTheDocument();
      expect(outerContainer).toBeInTheDocument();
      expect(innerContainer).toBeInTheDocument();
      expect(
        screen.getByText("Content inside inner container")
      ).toBeInTheDocument();
    });

    it("renders multiple nested containers", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <Container.Outer>
                <Container.Inner>Nested content</Container.Inner>
              </Container.Outer>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      // Should have multiple outer and inner containers
      const outerContainers = screen.getAllByTestId("container-outer-root");
      const innerContainers = screen.getAllByTestId("container-inner-root");

      expect(outerContainers).toHaveLength(2);
      expect(innerContainers).toHaveLength(2);
      expect(screen.getByText("Nested content")).toBeInTheDocument();
    });

    it("renders Container.Outer without Container.Inner", () => {
      render(
        <Container>
          <Container.Outer>Content in outer only</Container.Outer>
        </Container>
      );

      // Should have 1 outer container and no inner containers
      const outerContainers = screen.getAllByTestId("container-outer-root");
      const innerContainers = screen.queryAllByTestId("container-inner-root");

      expect(outerContainers).toHaveLength(1);
      expect(innerContainers).toHaveLength(0);
      expect(screen.getByText("Content in outer only")).toBeInTheDocument();
    });

    it("renders Container.Inner without Container.Outer", () => {
      render(
        <Container>
          <Container.Inner>Content in inner only</Container.Inner>
        </Container>
      );

      // Should have 1 inner container and no outer containers
      const outerContainers = screen.queryAllByTestId("container-outer-root");
      const innerContainers = screen.getAllByTestId("container-inner-root");

      expect(outerContainers).toHaveLength(0);
      expect(innerContainers).toHaveLength(1);
      expect(screen.getByText("Content in inner only")).toBeInTheDocument();
    });

    it("renders Container with direct content", () => {
      render(<Container>Direct content in container</Container>);

      // Should have only the main container
      const mainContainer = screen.getByTestId("container-root");
      const outerContainers = screen.queryAllByTestId("container-outer-root");
      const innerContainers = screen.queryAllByTestId("container-inner-root");

      expect(mainContainer).toBeInTheDocument();
      expect(outerContainers).toHaveLength(0);
      expect(innerContainers).toHaveLength(0);
      expect(
        screen.getByText("Direct content in container")
      ).toBeInTheDocument();
    });
  });

  describe("Component ID and Debug Mode", () => {
    it("passes internalId and debugMode to sub-components", () => {
      render(
        <Container internalId="custom-container" debugMode={true}>
          <Container.Outer internalId="custom-outer" debugMode={true}>
            <Container.Inner internalId="custom-inner" debugMode={true}>
              Test content
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      const mainContainer = screen.getByTestId("container-root");
      const outerContainer = screen.getByTestId("container-outer-root");
      const innerContainer = screen.getByTestId("container-inner-root");

      // Check the main container
      expect(mainContainer).toHaveAttribute(
        "data-container-id",
        "custom-container"
      );
      expect(mainContainer).toHaveAttribute("data-debug-mode", "true");

      // Check the outer container
      expect(outerContainer).toHaveAttribute(
        "data-container-outer-id",
        "custom-outer"
      );
      expect(outerContainer).toHaveAttribute("data-debug-mode", "true");

      // Check the inner container
      expect(innerContainer).toHaveAttribute(
        "data-container-inner-id",
        "custom-inner"
      );
      expect(innerContainer).toHaveAttribute("data-debug-mode", "true");
    });

    it("uses default IDs when not provided", () => {
      const { container } = render(
        <Container>
          <Container.Outer>
            <Container.Inner>Test content</Container.Inner>
          </Container.Outer>
        </Container>
      );

      const mainContainer = container.querySelector(
        '[data-testid="container-root"]'
      );
      const outerContainer = container.querySelector(
        '[data-testid="container-outer-root"]'
      );
      const innerContainer = container.querySelector(
        '[data-testid="container-inner-root"]'
      );

      // Check the main container
      expect(mainContainer).toHaveAttribute("data-container-id", "test-id");

      // Check the outer container - just verify the attribute exists
      expect(outerContainer).toHaveAttribute("data-container-outer-id");

      // Check the inner container - just verify the attribute exists
      expect(innerContainer).toHaveAttribute("data-container-inner-id");
    });
  });

  describe("Styling and Classes", () => {
    it("applies custom className to sub-components", () => {
      render(
        <Container>
          <Container.Outer className="custom-outer-class">
            <Container.Inner className="custom-inner-class">
              Test content
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      const outerContainer = screen.getByTestId("container-outer-root");
      const innerContainer = screen.getByTestId("container-inner-root");

      // Check the outer container
      expect(outerContainer).toHaveClass("custom-outer-class");
      // Check the inner container
      expect(innerContainer).toHaveClass("custom-inner-class");
    });

    it("combines CSS module classes with custom classes", () => {
      render(
        <Container>
          <Container.Outer className="custom-outer">
            <Container.Inner className="custom-inner">
              Test content
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      const outerContainer = screen.getByTestId("container-outer-root");
      const innerContainer = screen.getByTestId("container-inner-root");

      // The cn function should combine the classes
      expect(outerContainer.className).toContain("custom-outer");
      expect(innerContainer.className).toContain("custom-inner");
    });
  });

  describe("Content Rendering", () => {
    it("renders complex nested content", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <div data-testid="nested-div">
                <h1>Main Title</h1>
                <p>Paragraph content</p>
                <ul>
                  <li>List item 1</li>
                  <li>List item 2</li>
                </ul>
              </div>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("nested-div")).toBeInTheDocument();
      expect(screen.getByText("Main Title")).toBeInTheDocument();
      expect(screen.getByText("Paragraph content")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
    });

    it("renders function children correctly", () => {
      const renderFunction = () => (
        <span data-testid="function-child">Function content</span>
      );

      render(
        <Container>
          <Container.Outer>
            <Container.Inner>{renderFunction()}</Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("function-child")).toBeInTheDocument();
      expect(screen.getByText("Function content")).toBeInTheDocument();
    });

    it("renders array children correctly", () => {
      const arrayChildren = [
        <div key="1" data-testid="array-child-1">
          Array item 1
        </div>,
        <div key="2" data-testid="array-child-2">
          Array item 2
        </div>,
      ];

      render(
        <Container>
          <Container.Outer>
            <Container.Inner>{arrayChildren}</Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("array-child-1")).toBeInTheDocument();
      expect(screen.getByTestId("array-child-2")).toBeInTheDocument();
      expect(screen.getByText("Array item 1")).toBeInTheDocument();
      expect(screen.getByText("Array item 2")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards refs to Container.Outer", () => {
      const outerRef = React.createRef<HTMLDivElement>();

      render(
        <Container>
          <Container.Outer ref={outerRef}>
            <Container.Inner>Test content</Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(outerRef.current).toBeInTheDocument();
      expect(outerRef.current).toHaveAttribute(
        "data-testid",
        "container-outer-root"
      );
    });

    it("forwards refs to Container.Inner", () => {
      const innerRef = React.createRef<HTMLDivElement>();

      render(
        <Container>
          <Container.Outer>
            <Container.Inner ref={innerRef}>Test content</Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(innerRef.current).toBeInTheDocument();
      expect(innerRef.current).toHaveAttribute(
        "data-testid",
        "container-inner-root"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(
        <Container>
          <Container.Outer>
            <Container.Inner></Container.Inner>
          </Container.Outer>
        </Container>
      );

      const mainContainer = container.querySelector(
        '[data-testid="container-root"]'
      );
      const outerContainer = container.querySelector(
        '[data-testid="container-outer-root"]'
      );
      const innerContainer = container.querySelector(
        '[data-testid="container-inner-root"]'
      );

      expect(mainContainer).toBeInTheDocument();
      expect(outerContainer).toBeInTheDocument();
      // Both outer and inner containers render (empty children are still considered renderable)
      expect(innerContainer).toBeInTheDocument();
    });

    it("handles whitespace-only children", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner> </Container.Inner>
          </Container.Outer>
        </Container>
      );

      const outerContainer = screen.getByTestId("container-outer-root");
      const innerContainer = screen.getByTestId("container-inner-root");

      expect(outerContainer).toBeInTheDocument();
      expect(innerContainer).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              Text content
              <div data-testid="mixed-div">Div content</div>
              {null}
              {undefined}
              <span data-testid="mixed-span">Span content</span>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByText("Text content")).toBeInTheDocument();
      expect(screen.getByTestId("mixed-div")).toBeInTheDocument();
      expect(screen.getByTestId("mixed-span")).toBeInTheDocument();
      expect(screen.getByText("Div content")).toBeInTheDocument();
      expect(screen.getByText("Span content")).toBeInTheDocument();
    });
  });

  describe("Real-world Usage Patterns", () => {
    it("simulates a typical page layout", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <header data-testid="page-header">
                <h1>Page Title</h1>
                <nav>Navigation</nav>
              </header>
              <main data-testid="page-main">
                <section>
                  <h2>Section Title</h2>
                  <p>Section content goes here.</p>
                </section>
              </main>
              <footer data-testid="page-footer">
                <p>Footer content</p>
              </footer>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("page-header")).toBeInTheDocument();
      expect(screen.getByTestId("page-main")).toBeInTheDocument();
      expect(screen.getByTestId("page-footer")).toBeInTheDocument();
      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(
        screen.getByText("Section content goes here.")
      ).toBeInTheDocument();
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("simulates a card layout with containers", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <div data-testid="card" className="card">
                <Container.Outer>
                  <Container.Inner>
                    <h3>Card Title</h3>
                    <p>Card description</p>
                    <button>Card Action</button>
                  </Container.Inner>
                </Container.Outer>
              </div>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description")).toBeInTheDocument();
      expect(screen.getByText("Card Action")).toBeInTheDocument();
    });
  });
});
