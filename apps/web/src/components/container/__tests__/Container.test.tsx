import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

import "@testing-library/jest-dom";

// Mock the external dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Div: React.forwardRef<HTMLDivElement, any>(function MockDiv(props, ref) {
    return <div ref={ref} data-testid="div" {...props} />;
  }),
}));

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
  createCompoundComponent: vi.fn((name, component, hook, subcomponents) => {
    const WrappedComponent = function (props: any) {
      const { internalId, debugMode, ...rest } = props;
      const { id, isDebugMode } = hook({ internalId, debugMode });
      return React.createElement(component, {
        ...rest,
        componentId: id,
        isDebugMode,
      });
    };
    Object.entries(subcomponents).forEach(([key, SubComponent]) => {
      (WrappedComponent as any)[key] = SubComponent;
    });
    return WrappedComponent;
  }),
  createCompoundComponentWithManualAttach: vi.fn(
    (name, component, hook, options) => {
      const WrappedComponent = function (props: any) {
        const { internalId, debugMode, ...rest } = props;
        const { id, isDebugMode } = hook({ internalId, debugMode });
        return React.createElement(component, {
          ...rest,
          componentId: id,
          isDebugMode,
        });
      };
      return WrappedComponent;
    }
  ),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock internal components
vi.mock("../_internal/ContainerOuter", () => ({
  ContainerOuter: React.forwardRef<HTMLDivElement, any>(
    function MockContainerOuter(props, ref) {
      const { children, internalId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="container-outer-root"
          data-container-outer-id={internalId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          <div data-testid="container-outer-content">{children}</div>
        </div>
      );
    }
  ),
}));

vi.mock("../_internal/ContainerInner", () => ({
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
}));

describe("Container", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Main Container Component", () => {
    it("renders children inside ContainerInner and ContainerOuter", () => {
      render(
        <Container>
          <div data-testid="child">Hello</div>
        </Container>
      );

      expect(screen.getByTestId("child")).toHaveTextContent("Hello");
      expect(screen.getByTestId("container-outer-root")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner-root")).toBeInTheDocument();
    });

    it("does not render if children is null", () => {
      const { container } = render(<Container>{null}</Container>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(<Container>{undefined}</Container>);
      expect(container.firstChild).toBeNull();
    });

    it("forwards ref to ContainerOuter", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Container ref={ref}>
          <span>Ref test</span>
        </Container>
      );
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("passes className and other props to ContainerOuter", () => {
      render(
        <Container className="custom-class" id="test-id">
          <span>Props test</span>
        </Container>
      );
      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveClass("custom-class");
      expect(containerOuterRoot).toHaveAttribute("id", "test-id");
    });

    it("renders with proper structure", () => {
      render(
        <Container>
          <span>Content</span>
        </Container>
      );

      const outerRoot = screen.getByTestId("container-outer-root");
      const innerRoot = screen.getByTestId("container-inner-root");
      const content = screen.getByText("Content");

      expect(outerRoot).toBeInTheDocument();
      expect(innerRoot).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  describe("Compound Component Integration", () => {
    it("composes all container components together", () => {
      render(
        <Container>
          <Container.Inner>
            <Container.Outer>
              <div data-testid="content-1">Content 1</div>
            </Container.Outer>
            <div data-testid="content-2">Content 2</div>
          </Container.Inner>
        </Container>
      );

      expect(screen.getByTestId("content-1")).toHaveTextContent("Content 1");
      expect(screen.getByTestId("content-2")).toHaveTextContent("Content 2");
    });

    it("handles complex nested structure", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <div data-testid="nested-content">Nested Content</div>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("nested-content")).toHaveTextContent(
        "Nested Content"
      );
    });

    it("supports multiple nested containers", () => {
      render(
        <Container>
          <Container.Outer>
            <Container.Inner>
              <Container.Outer>
                <Container.Inner>
                  <div data-testid="deep-content">Deep Content</div>
                </Container.Inner>
              </Container.Outer>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("deep-content")).toHaveTextContent(
        "Deep Content"
      );
    });

    it("handles empty container with no children", () => {
      const { container } = render(<Container />);
      expect(container.firstChild).toBeNull();
    });

    it("handles container with empty string children", () => {
      const { container } = render(<Container>{""}</Container>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode to main container", () => {
      render(
        <Container debugMode={true}>
          <span>Debug Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Outer", () => {
      render(
        <Container.Outer debugMode={true}>
          <span>Debug Content</span>
        </Container.Outer>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Inner", () => {
      render(
        <Container.Inner debugMode={true}>
          <span>Debug Content</span>
        </Container.Inner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when false", () => {
      render(
        <Container debugMode={false}>
          <span>Debug Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode when undefined", () => {
      render(
        <Container>
          <span>Debug Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("applies custom component ID to main container", () => {
      render(
        <Container internalId="custom-container-id">
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "data-container-outer-id",
        "custom-container-id"
      );
    });

    it("applies custom component ID to Container.Outer", () => {
      render(
        <Container.Outer internalId="custom-outer-id">
          <span>Content</span>
        </Container.Outer>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "data-container-outer-id",
        "custom-outer-id"
      );
    });

    it("applies custom component ID to Container.Inner", () => {
      render(
        <Container.Inner internalId="custom-inner-id">
          <span>Content</span>
        </Container.Inner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute(
        "data-container-inner-id",
        "custom-inner-id"
      );
    });

    it("generates default component ID when not provided", () => {
      render(
        <Container>
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "data-container-outer-id",
        "test-id"
      );
    });
  });

  describe("Accessibility", () => {
    it("forwards aria attributes to main container", () => {
      render(
        <Container aria-label="Main container" aria-describedby="description">
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "aria-label",
        "Main container"
      );
      expect(containerOuterRoot).toHaveAttribute(
        "aria-describedby",
        "description"
      );
    });

    it("forwards aria attributes to Container.Outer", () => {
      render(
        <Container.Outer aria-label="Outer container">
          <span>Content</span>
        </Container.Outer>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "aria-label",
        "Outer container"
      );
    });

    it("forwards aria attributes to Container.Inner", () => {
      render(
        <Container.Inner aria-label="Inner container">
          <span>Content</span>
        </Container.Inner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute(
        "aria-label",
        "Inner container"
      );
    });

    it("forwards multiple aria attributes", () => {
      render(
        <Container
          aria-label="Container"
          aria-describedby="desc"
          aria-labelledby="label"
          aria-hidden="true"
        >
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("aria-label", "Container");
      expect(containerOuterRoot).toHaveAttribute("aria-describedby", "desc");
      expect(containerOuterRoot).toHaveAttribute("aria-labelledby", "label");
      expect(containerOuterRoot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple children", () => {
      const children = Array.from({ length: 100 }, (_, i) => (
        <div key={i} data-testid={`child-${i}`}>
          Child {i}
        </div>
      ));

      render(<Container>{children}</Container>);

      expect(screen.getByTestId("child-0")).toBeInTheDocument();
      expect(screen.getByTestId("child-99")).toBeInTheDocument();
    });

    it("handles empty children efficiently", () => {
      const { container } = render(<Container />);
      expect(container.firstChild).toBeNull();
    });

    it("handles large content efficiently", () => {
      const largeContent = "x".repeat(10000);
      render(<Container>{largeContent}</Container>);

      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });

    it("handles dynamic content updates efficiently", () => {
      const { rerender } = render(<Container>Initial content</Container>);
      expect(screen.getByText("Initial content")).toBeInTheDocument();

      rerender(<Container>Updated content</Container>);
      expect(screen.getByText("Updated content")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles React elements as children", () => {
      const ChildComponent = function () {
        return <div data-testid="react-element">React Element</div>;
      };
      render(
        <Container>
          <ChildComponent />
        </Container>
      );

      expect(screen.getByTestId("react-element")).toBeInTheDocument();
    });

    it("handles function children", () => {
      const ChildFunction = function () {
        return <div data-testid="function-child">Function Child</div>;
      };
      render(
        <Container>
          <ChildFunction />
        </Container>
      );

      expect(screen.getByTestId("function-child")).toBeInTheDocument();
    });

    it("handles array children", () => {
      const arrayChildren = [
        <div key="1" data-testid="array-child-1">
          Array Child 1
        </div>,
        <div key="2" data-testid="array-child-2">
          Array Child 2
        </div>,
      ];

      render(<Container>{arrayChildren}</Container>);

      expect(screen.getByTestId("array-child-1")).toBeInTheDocument();
      expect(screen.getByTestId("array-child-2")).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <Container>
          <div data-testid="element">Element</div>
          String content
          {42}
          {true && <span data-testid="conditional">Conditional</span>}
        </Container>
      );

      expect(screen.getByTestId("element")).toBeInTheDocument();
      expect(screen.getByText(/String content/)).toBeInTheDocument();
      expect(screen.getByText(/42/)).toBeInTheDocument();
      expect(screen.getByTestId("conditional")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <Container>
          <header>
            <h1>Header</h1>
          </header>
          <main>
            <section>
              <h2>Section</h2>
              <p>Content</p>
            </section>
          </main>
          <footer>
            <p>Footer</p>
          </footer>
        </Container>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Section")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      const { container } = render(
        <Container>
          <div data-testid="content">Content</div>
        </Container>
      );

      const outerRoot = screen.getByTestId("container-outer-root");
      const innerRoot = screen.getByTestId("container-inner-root");
      const content = screen.getByTestId("content");

      expect(outerRoot).toContainElement(innerRoot);
      expect(innerRoot).toContainElement(content);
    });

    it("handles CSS module class merging correctly", () => {
      render(
        <Container className="custom-class additional-class">
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveClass("custom-class");
      expect(containerOuterRoot).toHaveClass("additional-class");
    });
  });
});
