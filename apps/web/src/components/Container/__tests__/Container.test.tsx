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
        <Container aria-label="Container label">
          Content
        </Container>
      );

      const container = screen.getByTestId("test-id-container-outer-root");
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

    it("handles false children", () => {
      const { container } = render(<Container>{false}</Container>);
      expect(container).toBeEmptyDOMElement();
    });

    it("handles zero children", () => {
      const { container } = render(<Container>{0}</Container>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref correctly to Container", () => {
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

  describe("Compound Component Structure", () => {
    it("exposes Inner as compound component", () => {
      expect(Container.Inner).toBeDefined();
    });

    it("exposes Outer as compound component", () => {
      expect(Container.Outer).toBeDefined();
    });

    it("renders Container.Inner correctly", () => {
      render(<Container.Inner>Inner content</Container.Inner>);

      expect(screen.getByText("Inner content")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-inner-root")
      ).toBeInTheDocument();
    });

    it("renders Container.Outer correctly", () => {
      render(<Container.Outer>Outer content</Container.Outer>);

      expect(screen.getByText("Outer content")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-outer-root")
      ).toBeInTheDocument();
    });

    it("forwards ref correctly to Container.Inner", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container.Inner ref={ref}>Ref test</Container.Inner>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref correctly to Container.Outer", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container.Outer ref={ref}>Ref test</Container.Outer>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });
  });

  describe("Container.Inner Component", () => {
    it("renders with proper structure", () => {
      render(
        <Container.Inner>
          <div data-testid="child">Child content</div>
        </Container.Inner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      const child = screen.getByTestId("child");

      expect(innerRoot).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Child content");
    });

    it("passes className correctly to Container.Inner", () => {
      render(
        <Container.Inner className="custom-class">Content</Container.Inner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("custom-class");
    });

    it("applies Tailwind CSS classes to Container.Inner", () => {
      render(<Container.Inner>Content</Container.Inner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("relative", "px-4", "sm:px-8", "lg:px-12");
    });

    it("merges custom className with Tailwind CSS classes in Container.Inner", () => {
      render(
        <Container.Inner className="custom-class">Content</Container.Inner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("custom-class");
      expect(innerRoot).toHaveClass("relative", "px-4", "sm:px-8", "lg:px-12");
    });

    it("applies debug mode to Container.Inner when enabled", () => {
      render(<Container.Inner debugMode={true}>Content</Container.Inner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies custom component ID to Container.Inner", () => {
      render(<Container.Inner debugId="custom-id">Content</Container.Inner>);

      const innerRoot = screen.getByTestId("custom-id-container-inner-root");
      expect(innerRoot).toHaveAttribute(
        "data-container-inner-id",
        "custom-id-container-inner"
      );
    });

    it("forwards aria attributes to Container.Inner", () => {
      render(
        <Container.Inner aria-label="Inner container" aria-describedby="desc">
          Content
        </Container.Inner>
      );

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute("aria-label", "Inner container");
      expect(innerRoot).toHaveAttribute("aria-describedby", "desc");
    });

    it("renders Container.Inner as custom element when as prop is provided", () => {
      render(<Container.Inner as="section">Content</Container.Inner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot.tagName).toBe("SECTION");
    });
  });

  describe("Container.Outer Component", () => {
    it("renders with proper structure", () => {
      render(
        <Container.Outer>
          <div data-testid="child">Child content</div>
        </Container.Outer>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      const child = screen.getByTestId("child");

      expect(outerRoot).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Child content");
    });

    it("passes className correctly to Container.Outer", () => {
      render(
        <Container.Outer className="custom-class">Content</Container.Outer>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveClass("custom-class");
    });

    it("applies Tailwind CSS classes to Container.Outer", () => {
      render(<Container.Outer>Content</Container.Outer>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveClass("sm:px-8");
    });

    it("merges custom className with Tailwind CSS classes in Container.Outer", () => {
      render(
        <Container.Outer className="custom-class">Content</Container.Outer>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveClass("custom-class");
      expect(outerRoot).toHaveClass("sm:px-8");
    });

    it("applies debug mode to Container.Outer when enabled", () => {
      render(<Container.Outer debugMode={true}>Content</Container.Outer>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("applies custom component ID to Container.Outer", () => {
      render(<Container.Outer debugId="custom-id">Content</Container.Outer>);

      const outerRoot = screen.getByTestId("custom-id-container-outer-root");
      expect(outerRoot).toHaveAttribute(
        "data-container-outer-id",
        "custom-id-container-outer"
      );
    });

    it("forwards aria attributes to Container.Outer", () => {
      render(
        <Container.Outer aria-label="Outer container" aria-describedby="desc">
          Content
        </Container.Outer>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveAttribute("aria-label", "Outer container");
      expect(outerRoot).toHaveAttribute("aria-describedby", "desc");
    });

    it("applies container outer content wrapper classes", () => {
      render(<Container.Outer>Content</Container.Outer>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      const contentWrapper = outerRoot.querySelector("div");

      expect(outerRoot).toContainElement(contentWrapper);
      expect(contentWrapper).toHaveClass(
        "mx-auto",
        "w-full",
        "max-w-7xl",
        "lg:px-8"
      );
    });

    it("renders Container.Outer as custom element when as prop is provided", () => {
      render(<Container.Outer as="section">Content</Container.Outer>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot.tagName).toBe("SECTION");
    });
  });

  describe("Content Types", () => {
    it("handles string children", () => {
      render(<Container>String content</Container>);
      expect(screen.getByText("String content")).toBeInTheDocument();
    });

    it("handles number children", () => {
      render(<Container>{42}</Container>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles React elements", () => {
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

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to main elements", () => {
      render(<Container debugId="aria-test">Container content</Container>);

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

      expect(outerContainer).toBeInTheDocument();
      expect(innerContainer).toBeInTheDocument();
    });

    it("applies correct ARIA labels without ID dependencies", () => {
      render(<Container debugId="aria-test">Container content</Container>);

      const contentElement = screen.getByText("Container content");
      expect(contentElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to content elements", () => {
      render(
        <Container debugId="aria-test" aria-label="Test container">
          Container content
        </Container>
      );

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

      expect(outerContainer).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(
        <Container debugId="aria-test">Container content</Container>
      );

      let outerContainer = screen.getByTestId("aria-test-container-outer-root");
      expect(outerContainer).toBeInTheDocument();

      rerender(<Container debugId="aria-test">Updated content</Container>);

      outerContainer = screen.getByTestId("aria-test-container-outer-root");
      expect(outerContainer).toBeInTheDocument();
    });

    it("ensures proper ARIA landmark structure", () => {
      render(<Container debugId="aria-test">Container content</Container>);

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

      expect(outerContainer).toBeInTheDocument();
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(
        <Container debugId="aria-test">{null}</Container>
      );

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

      expect(outerContainer).toBeInTheDocument();
      expect(outerContainer).toHaveAttribute("aria-expanded", "true");
      expect(outerContainer).toHaveAttribute(
        "aria-controls",
        "container-content"
      );
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
});
