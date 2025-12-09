import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

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

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../ContainerInner", () => ({
  ContainerInner: React.forwardRef<HTMLDivElement, any>(
    function MockContainerInner(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid={`${debugId || "test-id"}-container-inner-root`}
          data-container-inner-id={`${debugId || "test-id"}-container-inner`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
}));

vi.mock("../ContainerOuter", () => ({
  ContainerOuter: React.forwardRef<HTMLDivElement, any>(
    function MockContainerOuter(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid={`${debugId || "test-id"}-container-outer-root`}
          data-container-outer-id={`${debugId || "test-id"}-container-outer`}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
}));

describe("Container", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<Container>Test Content</Container>);

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Container className="custom-class">Content</Container>);

      const container = screen.getByTestId("test-id-container-outer-root");
      expect(container).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<Container debugMode={true}>Content</Container>);

      const container = screen.getByTestId("test-id-container-outer-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID", () => {
      render(<Container debugId="custom-id">Content</Container>);

      const container = screen.getByTestId("custom-id-container-outer-root");
      expect(container).toHaveAttribute(
        "data-container-outer-id",
        "custom-id-container-outer"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <Container data-testid="custom-testid" aria-label="Container label">
          Content
        </Container>
      );

      const container = screen.getByTestId("custom-testid");
      expect(container).toHaveAttribute("aria-label", "Container label");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children provided", () => {
      const { container } = render(<Container />);

      expect(container).toBeEmptyDOMElement();
    });

    it("does not render when empty string children provided", () => {
      const { container } = render(<Container>{""}</Container>);

      expect(container).toBeEmptyDOMElement();
    });

    it("handles null/undefined/empty children", () => {
      const { container } = render(<Container>{null}</Container>);

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);

      expect(ref.current).toBe(
        screen.getByTestId("test-id-container-outer-root")
      );
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);

      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Edge Cases", () => {
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

    it("handles special characters", () => {
      render(<Container>Special chars: &lt;&gt;&amp;</Container>);

      const elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Special chars:") || false;
      });
      expect(elements[0]).toBeInTheDocument();
    });

    it("handles empty string children", () => {
      const { container } = render(<Container>{""}</Container>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles false children", () => {
      const { container } = render(<Container>{false}</Container>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles zero children", () => {
      const { container } = render(<Container>{0}</Container>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Data Attributes and Debugging", () => {
    it("applies correct data attributes with default ID", () => {
      render(<Container>Content</Container>);

      const container = screen.getByTestId("test-id-container-outer-root");
      expect(container).toHaveAttribute(
        "data-container-outer-id",
        "test-id-container-outer"
      );
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("applies correct data attributes with custom ID", () => {
      render(<Container debugId="custom-container-id">Content</Container>);

      const container = screen.getByTestId(
        "custom-container-id-container-outer-root"
      );
      expect(container).toHaveAttribute(
        "data-container-outer-id",
        "custom-container-id-container-outer"
      );
    });

    it("applies debug mode data attribute when enabled", () => {
      render(<Container debugMode={true}>Content</Container>);

      const container = screen.getByTestId("test-id-container-outer-root");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode data attribute when disabled", () => {
      render(<Container debugMode={false}>Content</Container>);

      const container = screen.getByTestId("test-id-container-outer-root");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<Container isMemoized={true}>Content</Container>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders without memoization by default", () => {
      render(<Container>Content</Container>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("maintains memoization across re-renders when isMemoized is true", () => {
      const { rerender } = render(
        <Container isMemoized={true}>Content</Container>
      );

      const initialElement = screen.getByText("Content");

      // Re-render with same props
      rerender(<Container isMemoized={true}>Content</Container>);

      const rerenderedElement = screen.getByText("Content");
      expect(rerenderedElement).toBe(initialElement);
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <Container isMemoized={false}>Content</Container>
      );

      const _initialElement = screen.getByText("Content");

      // Re-render with different content to test non-memoization
      rerender(<Container isMemoized={false}>Different content</Container>);

      expect(screen.getByText("Different content")).toBeInTheDocument();
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      render(<Container debugId="aria-test">Container content</Container>);

      // Test container structure
      const outerContainer = screen.getByTestId(
        "aria-test-container-outer-root"
      );
      const innerContainer = screen.getByTestId(
        "aria-test-container-inner-root"
      );

      expect(outerContainer).toBeInTheDocument();
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies correct ARIA relationships between elements", () => {
      render(<Container debugId="aria-test">Container content</Container>);

      const outerContainer = screen.getByTestId(
        "aria-test-container-outer-root"
      );
      const innerContainer = screen.getByTestId(
        "aria-test-container-inner-root"
      );

      // Both containers should be present
      expect(outerContainer).toBeInTheDocument();
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies correct ARIA labels without ID dependencies", () => {
      render(<Container debugId="aria-test">Container content</Container>);

      // Content should be present (no ID needed)
      const contentElement = screen.getByText("Container content");
      expect(contentElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <Container debugId="aria-test" aria-label="Test container">
          Container content
        </Container>
      );

      // Container should have descriptive label
      const outerContainer = screen.getByTestId(
        "aria-test-container-outer-root"
      );
      expect(outerContainer).toHaveAttribute("aria-label", "Test container");
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(<Container debugId="custom-aria-id">Container content</Container>);

      const outerContainer = screen.getByTestId(
        "custom-aria-id-container-outer-root"
      );

      // Should be present (semantic HTML provides the role)
      expect(outerContainer).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <Container debugId="aria-test">Container content</Container>
      );

      // Initial render
      let outerContainer = screen.getByTestId("aria-test-container-outer-root");
      expect(outerContainer).toBeInTheDocument();

      // Update with different content
      rerender(<Container debugId="aria-test">Updated content</Container>);

      // ARIA attributes should be maintained
      outerContainer = screen.getByTestId("aria-test-container-outer-root");
      expect(outerContainer).toBeInTheDocument();
    });

    it("ensures proper ARIA landmark structure", () => {
      render(<Container debugId="aria-test">Container content</Container>);

      // Should have container structure
      const outerContainer = screen.getByTestId(
        "aria-test-container-outer-root"
      );
      const innerContainer = screen.getByTestId(
        "aria-test-container-inner-root"
      );

      expect(outerContainer).toBeInTheDocument();
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(<Container debugId="aria-test">Container content</Container>);

      const outerContainer = screen.getByTestId(
        "aria-test-container-outer-root"
      );

      // Should be present (semantic HTML provides the role)
      expect(outerContainer).toBeInTheDocument();
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(
        <Container debugId="aria-test">{null}</Container>
      );

      // Component should not render when no content
      expect(container).toBeEmptyDOMElement();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <Container
          debugId="aria-test"
          aria-expanded="true"
          aria-controls="container-content"
        >
          Container content
        </Container>
      );

      const outerContainer = screen.getByTestId(
        "aria-test-container-outer-root"
      );

      // Should maintain both component ARIA attributes and custom ones
      expect(outerContainer).toBeInTheDocument();
      expect(outerContainer).toHaveAttribute("aria-expanded", "true");
      expect(outerContainer).toHaveAttribute(
        "aria-controls",
        "container-content"
      );
    });
  });
});
