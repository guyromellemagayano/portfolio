import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// @guyromellemagayano/utils is mocked globally in test-setup.ts

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock Container sub-components
vi.mock("../internal", () => ({
  ContainerInner: React.forwardRef<HTMLDivElement, any>(
    function MockContainerInner(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="test-id-container-inner-root"
          data-container-inner-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
  ContainerOuter: React.forwardRef<HTMLDivElement, any>(
    function MockContainerOuter(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="test-id-container-outer-root"
          data-container-outer-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
}));

describe("Container Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Container with Sub-components", () => {
    it("renders Container with ContainerOuter and ContainerInner", () => {
      render(<Container>Test Content</Container>);

      expect(
        screen.getByTestId("test-id-container-outer-root")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-inner-root")
      ).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      render(<Container>Content</Container>);

      const outer = screen.getByTestId("test-id-container-outer-root");
      const inner = screen.getByTestId("test-id-container-inner-root");
      const content = screen.getByText("Content");

      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
    });

    it("renders Container with complex nested content", () => {
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
  });

  describe("Container Orchestration", () => {
    it("automatically wraps content in ContainerOuter and ContainerInner", () => {
      render(<Container>Test Content</Container>);

      const outer = screen.getByTestId("test-id-container-outer-root");
      const inner = screen.getByTestId("test-id-container-inner-root");
      const content = screen.getByText("Test Content");

      expect(outer).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
    });

    it("ensures proper nesting hierarchy: ContainerOuter > ContainerInner > Content", () => {
      render(<Container>Nested Content</Container>);

      const outer = screen.getByTestId("test-id-container-outer-root");
      const inner = screen.getByTestId("test-id-container-inner-root");
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
  });

  describe("Container Content Validation", () => {
    it("renders Container with valid content", () => {
      render(<Container>Valid Content</Container>);

      expect(screen.getByText("Valid Content")).toBeInTheDocument();
    });

    it("handles null and undefined children gracefully", () => {
      const { container } = render(<Container>{null}</Container>);

      // Container should return null when no children are provided
      expect(container).toBeEmptyDOMElement();
    });

    it("handles mixed valid and invalid content", () => {
      render(
        <Container>
          {null}
          <div>Valid Content</div>
          {undefined}
        </Container>
      );

      expect(screen.getByText("Valid Content")).toBeInTheDocument();
    });

    it("handles complex children content", () => {
      render(
        <Container>
          <div>
            <span>Complex</span> <strong>content</strong>
          </div>
        </Container>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });
  });

  describe("Container with Multiple Content Types", () => {
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

  describe("Container Edge Cases", () => {
    it("handles empty Container component", () => {
      const { container } = render(<Container />);

      // Container component returns null when no children are provided
      expect(container).toBeEmptyDOMElement();
    });

    it("handles Container with only whitespace children", () => {
      const { container } = render(<Container>{""}</Container>);

      expect(container).toBeEmptyDOMElement();
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

  describe("Container Performance", () => {
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

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Container Integration with Other Components", () => {
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

      const outer = screen.getByTestId("test-id-container-outer-root");
      const inner = screen.getByTestId("test-id-container-inner-root");
      const content = screen.getByText("Content");

      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
    });

    it("handles CSS module class merging correctly", () => {
      render(<Container className="custom-class">Content</Container>);

      const outer = screen.getByTestId("test-id-container-outer-root");
      expect(outer).toHaveClass("custom-class");
    });
  });
});
