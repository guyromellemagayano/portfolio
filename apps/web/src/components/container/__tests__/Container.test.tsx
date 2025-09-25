import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

import "@testing-library/jest-dom";

// Mock the external dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasAnyRenderableContent: vi.fn((...values) => {
    return values.some((value) => {
      if (value === false || value === null || value === undefined) {
        return false;
      }
      if (typeof value === "string" && value.length === 0) {
        return false;
      }
      return true;
    });
  }),
  hasValidContent: vi.fn((children) => {
    if (children === null || children === undefined || children === "") {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (componentId, componentType, isDebugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${componentId}-${componentType}`,
      "data-debug-mode": isDebugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] ||
        `${componentId}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("@web/components", () => ({
  ContainerOuter: React.forwardRef<HTMLDivElement, any>(
    function MockContainerOuter(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="container-outer-root"
          data-container-outer-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
  ContainerInner: React.forwardRef<HTMLDivElement, any>(
    function MockContainerInner(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="container-inner-root"
          data-container-inner-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
}));

vi.mock("../Container.module.css", () => ({
  default: { container: "_container_5a36cf" },
}));

describe("Container", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Main Container Component", () => {
    it("renders children directly", () => {
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

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);

      expect(ref.current).toBe(screen.getByTestId("container-outer-root"));
    });

    it("passes className and other props", () => {
      render(
        <Container className="custom-class" id="custom-id">
          Content
        </Container>
      );

      const container = screen.getByTestId("container-outer-root");
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveAttribute("id", "custom-id");
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

  describe("Container Orchestration", () => {
    it("automatically wraps content in ContainerOuter and ContainerInner", () => {
      render(<Container>Test Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      const content = screen.getByText("Test Content");

      expect(outer).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
    });

    it("ensures proper nesting hierarchy: ContainerOuter > ContainerInner > Content", () => {
      render(<Container>Nested Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      const content = screen.getByText("Nested Content");

      // Verify the nesting hierarchy
      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
      // Content is contained in outer through inner (transitive containment)
      expect(outer).toContainElement(content);
    });

    it("handles complex nested content through the hierarchy", () => {
      render(
        <Container>
          <div>Level 1</div>
          <div>Level 2</div>
        </Container>
      );

      expect(screen.getByText("Level 1")).toBeInTheDocument();
      expect(screen.getByText("Level 2")).toBeInTheDocument();
    });

    it("returns null when no children provided", () => {
      const { container } = render(<Container />);

      expect(container.firstChild).toBeNull();
    });

    it("returns null when empty string children provided", () => {
      render(<Container>{""}</Container>);

      expect(
        screen.queryByTestId("container-outer-root")
      ).not.toBeInTheDocument();
    });
  });

  describe("Debug Mode Integration", () => {
    it("passes debug mode to both ContainerOuter and ContainerInner", () => {
      render(<Container debugMode>Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      expect(outer).toHaveAttribute("data-debug-mode", "true");
      expect(inner).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not pass debug mode when false", () => {
      render(<Container debugMode={false}>Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      expect(outer).not.toHaveAttribute("data-debug-mode");
      expect(inner).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID Integration", () => {
    it("passes the same component ID to both ContainerOuter and ContainerInner", () => {
      render(<Container debugId="custom-id">Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      expect(outer).toHaveAttribute("data-container-outer-id", "custom-id");
      expect(inner).toHaveAttribute("data-container-inner-id", "custom-id");
    });

    it("generates and passes the same default component ID to both sub-components", () => {
      render(<Container>Content</Container>);

      const outer = screen.getByTestId("container-outer-root");
      const inner = screen.getByTestId("container-inner-root");
      expect(outer).toHaveAttribute("data-container-outer-id", "test-id");
      expect(inner).toHaveAttribute("data-container-inner-id", "test-id");
    });
  });

  describe("Accessibility Integration", () => {
    it("forwards aria attributes to ContainerOuter (the outer wrapper)", () => {
      render(
        <Container aria-label="Main container" role="main">
          Content
        </Container>
      );

      const outer = screen.getByTestId("container-outer-root");
      expect(outer).toHaveAttribute("aria-label", "Main container");
      expect(outer).toHaveAttribute("role", "main");
    });

    it("forwards multiple aria attributes to the outer wrapper", () => {
      render(
        <Container
          aria-label="Container"
          aria-describedby="description"
          aria-hidden="false"
        >
          Content
        </Container>
      );

      const outer = screen.getByTestId("container-outer-root");
      expect(outer).toHaveAttribute("aria-label", "Container");
      expect(outer).toHaveAttribute("aria-describedby", "description");
      expect(outer).toHaveAttribute("aria-hidden", "false");
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
      render(<Container>{ChildFunction()}</Container>);

      expect(screen.getByText("Function Child")).toBeInTheDocument();
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

      const outer = screen.getByTestId("container-outer-root");
      expect(outer).toHaveClass("custom-class");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Container isMemoized={true}>Content</Container>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <Container isMemoized={false}>Content</Container>
      );

      rerender(<Container isMemoized={false}>Different content</Container>);
      expect(screen.getByText("Different content")).toBeInTheDocument();
    });
  });
});
