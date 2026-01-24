/**
 * @file Container.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Container component.
 */

import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
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
          Conditional
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

  describe("Container Compound Component Integration", () => {
    it("works with Container.Inner as standalone component", () => {
      render(<Container.Inner>Inner standalone</Container.Inner>);

      expect(screen.getByText("Inner standalone")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-inner-root")
      ).toBeInTheDocument();
    });

    it("works with Container.Outer as standalone component", () => {
      render(<Container.Outer>Outer standalone</Container.Outer>);

      expect(screen.getByText("Outer standalone")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-outer-root")
      ).toBeInTheDocument();
    });

    it("maintains proper structure when using compound components separately", () => {
      render(
        <Container.Outer>
          <Container.Inner>Nested compound</Container.Inner>
        </Container.Outer>
      );

      const outer = screen.getByTestId("test-id-container-outer-root");
      const inner = screen.getByTestId("test-id-container-inner-root");
      const content = screen.getByText("Nested compound");

      expect(outer).toContainElement(inner);
      expect(inner).toContainElement(content);
    });

    it("handles polymorphic as prop through compound component structure", () => {
      // Test Container with polymorphic as prop
      const { unmount: unmountContainer } = render(
        <Container as="main">Content</Container>
      );

      const outer = screen.getByTestId("test-id-container-outer-root");
      expect(outer.tagName).toBe("MAIN");

      unmountContainer();

      // Test Container.Inner with polymorphic as prop (standalone)
      const { unmount: unmountInner } = render(
        <Container.Inner as="section">Inner content</Container.Inner>
      );
      const inner = screen.getByTestId("test-id-container-inner-root");
      expect(inner.tagName).toBe("SECTION");

      unmountInner();

      // Test Container.Outer with polymorphic as prop (standalone)
      render(<Container.Outer as="article">Outer content</Container.Outer>);
      const outerStandalone = screen.getByTestId("test-id-container-outer-root");
      expect(outerStandalone.tagName).toBe("ARTICLE");
    });

    it("supports custom props through compound component structure", () => {
      render(
        <Container
          as="main"
          data-custom="value"
          aria-label="Main container"
          onClick={vi.fn()}
        >
          Content
        </Container>
      );

      const outer = screen.getByTestId("test-id-container-outer-root");
      expect(outer.tagName).toBe("MAIN");
      expect(outer).toHaveAttribute("data-custom", "value");
      expect(outer).toHaveAttribute("aria-label", "Main container");
    });
  });

  describe("Container Layout Structure", () => {
    it("applies correct outer container wrapper classes", () => {
      render(<Container>Content</Container>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      const outerContentWrapper = outerRoot.querySelector("div");

      expect(outerContentWrapper).toHaveClass(
        "mx-auto",
        "w-full",
        "max-w-7xl",
        "lg:px-8"
      );
    });

    it("applies correct inner container wrapper classes", () => {
      render(<Container>Content</Container>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      const innerContentWrapper = innerRoot.querySelector("div");

      expect(innerContentWrapper).toHaveClass(
        "mx-auto",
        "max-w-2xl",
        "lg:max-w-5xl"
      );
    });

    it("handles complex layout structures", () => {
      render(
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div data-testid="left-column">Left column</div>
            <div data-testid="right-column">Right column</div>
          </div>
        </Container>
      );

      expect(screen.getByTestId("left-column")).toBeInTheDocument();
      expect(screen.getByTestId("right-column")).toBeInTheDocument();
    });

    it("supports responsive design patterns", () => {
      render(
        <Container>
          <div className="responsive-container">
            <div data-testid="mobile-content">Mobile content</div>
            <div data-testid="desktop-content">Desktop content</div>
          </div>
        </Container>
      );

      expect(screen.getByTestId("mobile-content")).toBeInTheDocument();
      expect(screen.getByTestId("desktop-content")).toBeInTheDocument();
    });
  });

  describe("Container with React 19 Ref Support", () => {
    it("accepts ref as prop in Container component", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("ref works with polymorphic as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Container as="main" ref={ref as React.Ref<HTMLElement>}>
          Content
        </Container>
      );

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("MAIN");
    });

    it("ref works with Container.Inner standalone", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container.Inner ref={ref}>Inner content</Container.Inner>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("ref works with Container.Outer standalone", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container.Outer ref={ref}>Outer content</Container.Outer>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Container with Custom Props", () => {
    it("passes custom props through Container to ContainerOuter", () => {
      render(
        <Container
          data-custom="value"
          aria-label="Custom"
          onClick={vi.fn()}
        >
          Content
        </Container>
      );

      const outer = screen.getByTestId("test-id-container-outer-root");
      expect(outer).toHaveAttribute("data-custom", "value");
      expect(outer).toHaveAttribute("aria-label", "Custom");
    });

    it("handles event handlers correctly", () => {
      const handleClick = vi.fn();
      const handleMouseEnter = vi.fn();

      render(
        <Container onClick={handleClick} onMouseEnter={handleMouseEnter}>
          Content
        </Container>
      );

      const outer = screen.getByTestId("test-id-container-outer-root");
      fireEvent.click(outer);
      fireEvent.mouseEnter(outer);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });
  });
});
