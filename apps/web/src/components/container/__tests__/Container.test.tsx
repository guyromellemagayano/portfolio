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
  });

  describe("Main Container Component", () => {
    it("renders children inside ContainerInner and ContainerOuter", () => {
      render(<Container>Test Content</Container>);

      expect(screen.getByTestId("container-outer-root")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner-root")).toBeInTheDocument();
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

    it("forwards ref to ContainerOuter", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);

      expect(ref.current).toBe(screen.getByTestId("container-outer-root"));
    });

    it("passes className and other props to ContainerOuter", () => {
      render(
        <Container className="custom-class" data-testid="custom-testid">
          Content
        </Container>
      );

      const container = screen.getByTestId("custom-testid");
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveAttribute("data-testid", "custom-testid");
    });

    it("renders with proper structure", () => {
      render(<Container>Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      const content = screen.getByText("Content");

      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
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

      expect(screen.getByTestId("container-outer-root")).toBeInTheDocument();
      expect(screen.getByTestId("container-inner-root")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode to main container", () => {
      render(<Container debugMode>Content</Container>);

      const container = screen.getByTestId("container-outer-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Outer", () => {
      render(
        <Container>
          <Container.Outer debugMode>Content</Container.Outer>
        </Container>
      );

      const outer = screen.getAllByTestId("container-outer-root")[1];
      expect(outer).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies debug mode to Container.Inner", () => {
      render(
        <Container>
          <Container.Inner debugMode>Content</Container.Inner>
        </Container>
      );

      const inner = screen.getAllByTestId("container-inner-root")[1];
      expect(inner).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when false", () => {
      render(<Container debugMode={false}>Content</Container>);

      const container = screen.getByTestId("container-outer-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode when undefined", () => {
      render(<Container>Content</Container>);

      const container = screen.getByTestId("container-outer-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("applies custom component ID to main container", () => {
      render(<Container internalId="custom-id">Content</Container>);

      const container = screen.getByTestId("container-outer-root");
      expect(container).toHaveAttribute("data-container-outer-id", "custom-id");
    });

    it("applies custom component ID to Container.Outer", () => {
      render(
        <Container>
          <Container.Outer internalId="custom-outer-id">
            Content
          </Container.Outer>
        </Container>
      );

      const outer = screen.getAllByTestId("container-outer-root")[1];
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

      const inner = screen.getAllByTestId("container-inner-root")[1];
      expect(inner).toHaveAttribute(
        "data-container-inner-id",
        "custom-inner-id"
      );
    });

    it("generates default component ID when not provided", () => {
      render(<Container>Content</Container>);

      const container = screen.getByTestId("container-outer-root");
      expect(container).toHaveAttribute("data-container-outer-id", "test-id");
    });
  });

  describe("Accessibility", () => {
    it("forwards aria attributes to main container", () => {
      render(
        <Container aria-label="Main container" role="main">
          Content
        </Container>
      );

      const container = screen.getByTestId("container-outer-root");
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

      const outer = screen.getAllByTestId("container-outer-root")[1];
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

      const inner = screen.getAllByTestId("container-inner-root")[1];
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

      const container = screen.getByTestId("container-outer-root");
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

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      const content = screen.getByText("Content");

      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
    });

    it("handles CSS module class merging correctly", () => {
      render(<Container className="custom-class">Content</Container>);

      const container = screen.getByTestId("container-outer-root");
      expect(container).toHaveClass("custom-class");
    });
  });
});
