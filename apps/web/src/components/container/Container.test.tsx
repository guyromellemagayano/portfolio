import React from "react";

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Container } from "./Container";

import "@testing-library/jest-dom";

// Mock the external dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Div: React.forwardRef<HTMLDivElement, any>(function MockDiv(props, ref) {
    return <div ref={ref} data-testid="div" {...props} />;
  }),
  DivProps: {},
  DivRef: {},
}));

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (children === null || children === undefined || children === false) {
      return false;
    }
    return true;
  }),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Main Container Component", () => {
    it("renders children inside ContainerInner and ContainerOuter", () => {
      render(
        <Container>
          <div data-testid="child">Hello</div>
        </Container>
      );

      // The child should be present
      expect(screen.getByTestId("child")).toHaveTextContent("Hello");

      // Should render the container structure (multiple divs)
      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
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

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Content");
    });

    it("handles boolean children correctly", () => {
      const { container } = render(<Container>{true}</Container>);
      expect(container.firstChild).toBeInTheDocument();

      const { container: falseContainer } = render(
        <Container>{false}</Container>
      );
      expect(falseContainer.firstChild).toBeNull();
    });

    it("handles number children correctly", () => {
      render(<Container>{42}</Container>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles string children correctly", () => {
      render(<Container>String content</Container>);
      expect(screen.getByText("String content")).toBeInTheDocument();
    });
  });

  describe("Container.Outer Component", () => {
    it("renders children inside container", () => {
      render(
        <Container.Outer>
          <div data-testid="child">Hello</div>
        </Container.Outer>
      );

      expect(screen.getByTestId("child")).toHaveTextContent("Hello");
      expect(screen.getByTestId("container-outer-root")).toBeInTheDocument();
    });

    it("does not render if children is null", () => {
      const { container } = render(<Container.Outer>{null}</Container.Outer>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(
        <Container.Outer>{undefined}</Container.Outer>
      );
      expect(container.firstChild).toBeNull();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Container.Outer ref={ref}>
          <span>Ref test</span>
        </Container.Outer>
      );
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("passes className and other props correctly", () => {
      render(
        <Container.Outer className="outer-class" id="outer-id">
          <span>Props test</span>
        </Container.Outer>
      );
      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveClass("outer-class");
      expect(containerOuterRoot).toHaveAttribute("id", "outer-id");
    });

    it("renders with proper structure", () => {
      render(
        <Container.Outer>
          <span>Content</span>
        </Container.Outer>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Content");
    });

    it("handles boolean children correctly", () => {
      const { container } = render(<Container.Outer>{true}</Container.Outer>);
      expect(container.firstChild).toBeInTheDocument();

      const { container: falseContainer } = render(
        <Container.Outer>{false}</Container.Outer>
      );
      expect(falseContainer.firstChild).toBeNull();
    });
  });

  describe("Container.Inner Component", () => {
    it("renders children inside container", () => {
      render(
        <Container.Inner>
          <div data-testid="child">Hello</div>
        </Container.Inner>
      );

      expect(screen.getByTestId("child")).toHaveTextContent("Hello");
      expect(screen.getByTestId("container-inner-root")).toBeInTheDocument();
    });

    it("does not render if children is null", () => {
      const { container } = render(<Container.Inner>{null}</Container.Inner>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(
        <Container.Inner>{undefined}</Container.Inner>
      );
      expect(container.firstChild).toBeNull();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Container.Inner ref={ref}>
          <span>Ref test</span>
        </Container.Inner>
      );
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("passes className and other props correctly", () => {
      render(
        <Container.Inner className="inner-class" id="inner-id">
          <span>Props test</span>
        </Container.Inner>
      );
      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveClass("inner-class");
      expect(containerInnerRoot).toHaveAttribute("id", "inner-id");
    });

    it("renders with proper structure", () => {
      render(
        <Container.Inner>
          <span>Content</span>
        </Container.Inner>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Content");
    });

    it("handles boolean children correctly", () => {
      const { container } = render(<Container.Inner>{true}</Container.Inner>);
      expect(container.firstChild).toBeInTheDocument();

      const { container: falseContainer } = render(
        <Container.Inner>{false}</Container.Inner>
      );
      expect(falseContainer.firstChild).toBeNull();
    });
  });

  describe("Compound Component Integration", () => {
    it("composes all container components together", () => {
      render(
        <Container>
          <Container.Inner>
            <Container.Outer>
              <div data-testid="nested-content">Nested Content</div>
            </Container.Outer>
          </Container.Inner>
        </Container>
      );

      expect(screen.getByTestId("nested-content")).toHaveTextContent(
        "Nested Content"
      );
      expect(screen.getAllByTestId("container-outer-root")).toHaveLength(2);
      expect(screen.getAllByTestId("container-inner-root")).toHaveLength(2);
    });

    it("handles complex nested structure", () => {
      render(
        <Container className="main-container">
          <Container.Outer className="outer-wrapper">
            <Container.Inner className="inner-wrapper">
              <div data-testid="content">Complex Structure</div>
            </Container.Inner>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("content")).toHaveTextContent(
        "Complex Structure"
      );
    });

    it("supports multiple nested containers", () => {
      render(
        <Container>
          <Container.Inner>
            <div data-testid="content-1">Content 1</div>
          </Container.Inner>
          <Container.Inner>
            <div data-testid="content-2">Content 2</div>
          </Container.Inner>
        </Container>
      );

      expect(screen.getByTestId("content-1")).toHaveTextContent("Content 1");
      expect(screen.getByTestId("content-2")).toHaveTextContent("Content 2");
    });

    it("handles empty container with no children", () => {
      const { container } = render(<Container />);
      expect(container.firstChild).toBeNull();
    });

    it("handles container with empty string children", () => {
      const { container } = render(<Container>{""}</Container>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode to main container", () => {
      render(
        <Container _debugMode={true}>
          <span>Debug Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Outer", () => {
      render(
        <Container.Outer _debugMode={true}>
          <span>Debug Content</span>
        </Container.Outer>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Inner", () => {
      render(
        <Container.Inner _debugMode={true}>
          <span>Debug Content</span>
        </Container.Inner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when false", () => {
      render(
        <Container _debugMode={false}>
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
        <Container _internalId="custom-container-id">
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
        <Container.Outer _internalId="custom-outer-id">
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
        <Container.Inner _internalId="custom-inner-id">
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
        <Container aria-label="Main container">
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "aria-label",
        "Main container"
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
          aria-label="Main container"
          aria-describedby="description"
          aria-hidden="true"
        >
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
      expect(containerOuterRoot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple children", () => {
      const { rerender } = render(
        <Container>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Container>
      );

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();

      // Re-render with same content
      rerender(
        <Container>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Container>
      );

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });

    it("handles empty children efficiently", () => {
      const { container } = render(<Container />);
      expect(container.firstChild).toBeNull();
    });

    it("handles large content efficiently", () => {
      const largeContent = Array.from({ length: 100 }, (_, i) => (
        <div key={i}>Content {i}</div>
      ));

      render(<Container>{largeContent}</Container>);

      expect(screen.getByText("Content 0")).toBeInTheDocument();
      expect(screen.getByText("Content 99")).toBeInTheDocument();
    });

    it("handles dynamic content updates efficiently", () => {
      const { rerender } = render(
        <Container>
          <div>Initial content</div>
        </Container>
      );

      expect(screen.getByText("Initial content")).toBeInTheDocument();

      rerender(
        <Container>
          <div>Updated content</div>
        </Container>
      );

      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
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
      const { container } = render(
        <Container>{() => <div>Function Child</div>}</Container>
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles array children", () => {
      render(
        <Container>
          {[<div key="1">Array Child 1</div>, <div key="2">Array Child 2</div>]}
        </Container>
      );

      expect(screen.getByText("Array Child 1")).toBeInTheDocument();
      expect(screen.getByText("Array Child 2")).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <Container>
          <div>Element</div>
          String content
          {42}
          {true && <span>Conditional</span>}
        </Container>
      );

      expect(screen.getByText("Element")).toBeInTheDocument();
      expect(screen.getByText(/String content/)).toBeInTheDocument();
      expect(screen.getByText(/42/)).toBeInTheDocument();
      expect(screen.getByText("Conditional")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with other components in complex layouts", () => {
      render(
        <Container>
          <Container.Outer>
            <div data-testid="header">Header</div>
            <Container.Inner>
              <div data-testid="main">Main Content</div>
            </Container.Inner>
            <div data-testid="footer">Footer</div>
          </Container.Outer>
        </Container>
      );

      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("main")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      const { container } = render(
        <Container>
          <div>Content</div>
        </Container>
      );

      // Should have proper nesting structure
      const divs = container.querySelectorAll("div");
      expect(divs.length).toBeGreaterThan(1);
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
