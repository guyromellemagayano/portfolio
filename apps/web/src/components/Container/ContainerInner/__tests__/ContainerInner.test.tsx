import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContainerInner } from "../ContainerInner";

import "@testing-library/jest-dom";

// Mock the external dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn((id, componentType, debugMode) => ({
    [`data-${componentType}-id`]: `${id}-${componentType}`,
    "data-debug-mode": debugMode ? "true" : undefined,
    "data-testid": `${id}-${componentType}-root`,
  })),
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("ContainerInner", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<ContainerInner>Inner content</ContainerInner>);

      expect(screen.getByText("Inner content")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-inner-root")
      ).toBeInTheDocument();
    });

    it("renders with proper structure", () => {
      render(
        <ContainerInner>
          <div data-testid="child">Child content</div>
        </ContainerInner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      const child = screen.getByTestId("child");

      expect(innerRoot).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Child content");
    });

    it("does not render if children is null", () => {
      const { container } = render(<ContainerInner>{null}</ContainerInner>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(
        <ContainerInner>{undefined}</ContainerInner>
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render if children is false", () => {
      const { container } = render(<ContainerInner>{false}</ContainerInner>);
      expect(container).toBeEmptyDOMElement();
    });

    it("does not render with empty string children", () => {
      const { container } = render(<ContainerInner>{""}</ContainerInner>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Props Handling", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ContainerInner ref={ref}>Ref test</ContainerInner>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("passes className correctly", () => {
      render(<ContainerInner className="custom-class">Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("custom-class");
    });

    it("passes other HTML attributes", () => {
      render(
        <ContainerInner id="test-id" data-test="test-data">
          Content
        </ContainerInner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      // Component uses createComponentProps which sets data-container-inner-id, not id
      expect(innerRoot).toHaveAttribute(
        "data-container-inner-id",
        "test-id-container-inner"
      );
      expect(innerRoot).toHaveAttribute("data-test", "test-data");
    });

    it("applies Tailwind CSS classes", () => {
      render(<ContainerInner>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("relative", "px-4", "sm:px-8", "lg:px-12");
    });

    it("merges custom className with Tailwind CSS classes", () => {
      render(<ContainerInner className="custom-class">Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("custom-class");
      expect(innerRoot).toHaveClass("relative", "px-4", "sm:px-8", "lg:px-12");
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode when enabled", () => {
      render(<ContainerInner debugMode={true}>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when disabled", () => {
      render(<ContainerInner debugMode={false}>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode when undefined", () => {
      render(<ContainerInner>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("applies custom component ID", () => {
      render(<ContainerInner debugId="custom-id">Content</ContainerInner>);

      const innerRoot = screen.getByTestId("custom-id-container-inner-root");
      expect(innerRoot).toHaveAttribute(
        "data-container-inner-id",
        "custom-id-container-inner"
      );
    });

    it("generates default component ID when not provided", () => {
      render(<ContainerInner>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute(
        "data-container-inner-id",
        "test-id-container-inner"
      );
    });
  });

  describe("Accessibility", () => {
    it("forwards aria attributes", () => {
      render(
        <ContainerInner aria-label="Inner container" aria-describedby="desc">
          Content
        </ContainerInner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute("aria-label", "Inner container");
      expect(innerRoot).toHaveAttribute("aria-describedby", "desc");
    });

    it("forwards multiple aria attributes", () => {
      render(
        <ContainerInner
          aria-label="Container"
          aria-describedby="desc"
          aria-labelledby="label"
          aria-hidden="true"
        >
          Content
        </ContainerInner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute("aria-label", "Container");
      expect(innerRoot).toHaveAttribute("aria-describedby", "desc");
      expect(innerRoot).toHaveAttribute("aria-labelledby", "label");
      expect(innerRoot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Content Types", () => {
    it("handles string children", () => {
      render(<ContainerInner>String content</ContainerInner>);
      expect(screen.getByText("String content")).toBeInTheDocument();
    });

    it("handles number children", () => {
      render(<ContainerInner>{42}</ContainerInner>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(<ContainerInner>{true}</ContainerInner>);
      expect(
        screen.getByTestId("test-id-container-inner-root")
      ).toBeInTheDocument();
    });

    it("handles React elements", () => {
      const ChildComponent = function () {
        return <div data-testid="react-element">React Element</div>;
      };
      render(
        <ContainerInner>
          <ChildComponent />
        </ContainerInner>
      );

      expect(screen.getByTestId("react-element")).toBeInTheDocument();
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

      render(<ContainerInner>{arrayChildren}</ContainerInner>);

      expect(screen.getByTestId("array-child-1")).toBeInTheDocument();
      expect(screen.getByTestId("array-child-2")).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <ContainerInner>
          <div data-testid="element">Element</div>
          String content
          {42}
          {true && <span data-testid="conditional">Conditional</span>}
        </ContainerInner>
      );

      expect(screen.getByTestId("element")).toBeInTheDocument();
      expect(screen.getByText(/String content/)).toBeInTheDocument();
      expect(screen.getByText(/42/)).toBeInTheDocument();
      expect(screen.getByTestId("conditional")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("renders efficiently with multiple children", () => {
      const children = Array.from({ length: 50 }, (_, i) => (
        <div key={i} data-testid={`child-${i}`}>
          Child {i}
        </div>
      ));

      render(<ContainerInner>{children}</ContainerInner>);

      expect(screen.getByTestId("child-0")).toBeInTheDocument();
      expect(screen.getByTestId("child-49")).toBeInTheDocument();
    });

    it("handles large content efficiently", () => {
      const largeContent = "x".repeat(5000);
      render(<ContainerInner>{largeContent}</ContainerInner>);

      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });

    it("handles dynamic content updates efficiently", () => {
      const { rerender } = render(
        <ContainerInner>Initial content</ContainerInner>
      );
      expect(screen.getByText("Initial content")).toBeInTheDocument();

      rerender(<ContainerInner>Updated content</ContainerInner>);
      expect(screen.getByText("Updated content")).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(
        <ContainerInner isMemoized={true}>
          <div>Memoized content</div>
        </ContainerInner>
      );

      expect(screen.getByText("Memoized content")).toBeInTheDocument();
    });

    it("renders without memoization by default", () => {
      render(
        <ContainerInner>
          <div>Default content</div>
        </ContainerInner>
      );

      expect(screen.getByText("Default content")).toBeInTheDocument();
    });

    it("maintains memoization across re-renders when isMemoized is true", () => {
      const { rerender } = render(
        <ContainerInner isMemoized={true}>
          <div>Memoized content</div>
        </ContainerInner>
      );

      const initialElement = screen.getByText("Memoized content");

      // Re-render with same props
      rerender(
        <ContainerInner isMemoized={true}>
          <div>Memoized content</div>
        </ContainerInner>
      );

      const rerenderedElement = screen.getByText("Memoized content");
      expect(rerenderedElement).toBe(initialElement);
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <ContainerInner isMemoized={false}>
          <div>Non-memoized content</div>
        </ContainerInner>
      );

      const _initialElement = screen.getByText("Non-memoized content");

      // Re-render with different content to test non-memoization
      rerender(
        <ContainerInner isMemoized={false}>
          <div>Different content</div>
        </ContainerInner>
      );

      expect(screen.getByText("Different content")).toBeInTheDocument();
      expect(
        screen.queryByText("Non-memoized content")
      ).not.toBeInTheDocument();
    });
  });

  describe("Component Element Type", () => {
    it("renders as div by default", () => {
      render(<ContainerInner>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot.tagName).toBe("DIV");
    });

    it("renders as custom element when as prop is provided", () => {
      render(<ContainerInner as="section">Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot.tagName).toBe("SECTION");
    });

    it("renders as span when as prop is span", () => {
      render(<ContainerInner as="span">Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot.tagName).toBe("SPAN");
    });
  });

  describe("Integration", () => {
    it("works with other components", () => {
      render(
        <ContainerInner>
          <header>
            <h1>Header</h1>
          </header>
          <main>
            <p>Main content</p>
          </main>
          <footer>
            <p>Footer</p>
          </footer>
        </ContainerInner>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      const { container } = render(
        <ContainerInner>
          <div data-testid="content">Content</div>
        </ContainerInner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      const content = screen.getByTestId("content");

      expect(innerRoot).toContainElement(content);
    });

    it("handles nested components", () => {
      render(
        <ContainerInner>
          <div data-testid="outer">
            <div data-testid="inner">Nested content</div>
          </div>
        </ContainerInner>
      );

      expect(screen.getByTestId("outer")).toBeInTheDocument();
      expect(screen.getByTestId("inner")).toBeInTheDocument();
      expect(screen.getByText("Nested content")).toBeInTheDocument();
    });
  });
});
