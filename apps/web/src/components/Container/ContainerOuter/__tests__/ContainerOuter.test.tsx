import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContainerOuter } from "../ContainerOuter";

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
  createComponentProps: vi.fn((componentId, componentType, isDebugMode) => ({
    [`data-${componentType}-id`]: `${componentId}-${componentType}`,
    "data-debug-mode": isDebugMode ? "true" : undefined,
    "data-testid": `${componentId}-${componentType}-root`,
  })),
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("ContainerOuter", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(<ContainerOuter>Outer content</ContainerOuter>);

      expect(screen.getByText("Outer content")).toBeInTheDocument();
      expect(
        screen.getByTestId("test-id-container-outer-root")
      ).toBeInTheDocument();
    });

    it("renders with proper structure", () => {
      render(
        <ContainerOuter>
          <div data-testid="child">Child content</div>
        </ContainerOuter>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      const child = screen.getByTestId("child");

      expect(outerRoot).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Child content");
    });

    it("does not render if children is null", () => {
      const { container } = render(<ContainerOuter>{null}</ContainerOuter>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(
        <ContainerOuter>{undefined}</ContainerOuter>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is false", () => {
      const { container } = render(<ContainerOuter>{false}</ContainerOuter>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render with empty string children", () => {
      const { container } = render(<ContainerOuter>{""}</ContainerOuter>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Props Handling", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ContainerOuter ref={ref}>Ref test</ContainerOuter>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("passes className correctly", () => {
      render(<ContainerOuter className="custom-class">Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveClass("custom-class");
    });

    it("passes other HTML attributes", () => {
      render(
        <ContainerOuter id="test-id" data-test="test-data">
          Content
        </ContainerOuter>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      // Component uses createComponentProps which sets data-container-outer-id, not id
      expect(outerRoot).toHaveAttribute(
        "data-container-outer-id",
        "test-id-container-outer"
      );
      expect(outerRoot).toHaveAttribute("data-test", "test-data");
    });

    it("applies Tailwind CSS classes", () => {
      render(<ContainerOuter>Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveClass("sm:px-8");
    });

    it("merges custom className with Tailwind CSS classes", () => {
      render(<ContainerOuter className="custom-class">Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveClass("custom-class");
      expect(outerRoot).toHaveClass("sm:px-8");
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode when enabled", () => {
      render(<ContainerOuter debugMode={true}>Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when disabled", () => {
      render(<ContainerOuter debugMode={false}>Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode when undefined", () => {
      render(<ContainerOuter>Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component ID", () => {
    it("applies custom component ID", () => {
      render(<ContainerOuter debugId="custom-id">Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("custom-id-container-outer-root");
      expect(outerRoot).toHaveAttribute(
        "data-container-outer-id",
        "custom-id-container-outer"
      );
    });

    it("generates default component ID when not provided", () => {
      render(<ContainerOuter>Content</ContainerOuter>);

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveAttribute(
        "data-container-outer-id",
        "test-id-container-outer"
      );
    });
  });

  describe("Accessibility", () => {
    it("forwards aria attributes", () => {
      render(
        <ContainerOuter aria-label="Outer container" aria-describedby="desc">
          Content
        </ContainerOuter>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveAttribute("aria-label", "Outer container");
      expect(outerRoot).toHaveAttribute("aria-describedby", "desc");
    });

    it("forwards multiple aria attributes", () => {
      render(
        <ContainerOuter
          aria-label="Container"
          aria-describedby="desc"
          aria-labelledby="label"
          aria-hidden="true"
        >
          Content
        </ContainerOuter>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      expect(outerRoot).toHaveAttribute("aria-label", "Container");
      expect(outerRoot).toHaveAttribute("aria-describedby", "desc");
      expect(outerRoot).toHaveAttribute("aria-labelledby", "label");
      expect(outerRoot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Content Types", () => {
    it("handles string children", () => {
      render(<ContainerOuter>String content</ContainerOuter>);
      expect(screen.getByText("String content")).toBeInTheDocument();
    });

    it("handles number children", () => {
      render(<ContainerOuter>{42}</ContainerOuter>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles boolean children", () => {
      render(<ContainerOuter>{true}</ContainerOuter>);
      expect(
        screen.getByTestId("test-id-container-outer-root")
      ).toBeInTheDocument();
    });

    it("handles React elements", () => {
      const ChildComponent = function () {
        return <div data-testid="react-element">React Element</div>;
      };
      render(
        <ContainerOuter>
          <ChildComponent />
        </ContainerOuter>
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

      render(<ContainerOuter>{arrayChildren}</ContainerOuter>);

      expect(screen.getByTestId("array-child-1")).toBeInTheDocument();
      expect(screen.getByTestId("array-child-2")).toBeInTheDocument();
    });

    it("handles mixed content types", () => {
      render(
        <ContainerOuter>
          <div data-testid="element">Element</div>
          String content
          {42}
          {true && <span data-testid="conditional">Conditional</span>}
        </ContainerOuter>
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

      render(<ContainerOuter>{children}</ContainerOuter>);

      expect(screen.getByTestId("child-0")).toBeInTheDocument();
      expect(screen.getByTestId("child-49")).toBeInTheDocument();
    });

    it("handles large content efficiently", () => {
      const largeContent = "x".repeat(5000);
      render(<ContainerOuter>{largeContent}</ContainerOuter>);

      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });

    it("handles dynamic content updates efficiently", () => {
      const { rerender } = render(
        <ContainerOuter>Initial content</ContainerOuter>
      );
      expect(screen.getByText("Initial content")).toBeInTheDocument();

      rerender(<ContainerOuter>Updated content</ContainerOuter>);
      expect(screen.getByText("Updated content")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with other components", () => {
      render(
        <ContainerOuter>
          <header>
            <h1>Header</h1>
          </header>
          <main>
            <p>Main content</p>
          </main>
          <footer>
            <p>Footer</p>
          </footer>
        </ContainerOuter>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("maintains proper DOM structure", () => {
      const { container } = render(
        <ContainerOuter>
          <div data-testid="content">Content</div>
        </ContainerOuter>
      );

      const outerRoot = screen.getByTestId("test-id-container-outer-root");
      const content = screen.getByTestId("content");

      expect(outerRoot).toContainElement(content);
    });

    it("handles nested components", () => {
      render(
        <ContainerOuter>
          <div data-testid="outer">
            <div data-testid="inner">Nested content</div>
          </div>
        </ContainerOuter>
      );

      expect(screen.getByTestId("outer")).toBeInTheDocument();
      expect(screen.getByTestId("inner")).toBeInTheDocument();
      expect(screen.getByText("Nested content")).toBeInTheDocument();
    });
  });

  describe("Layout and Styling", () => {
    it("applies container outer content wrapper", () => {
      render(<ContainerOuter>Content</ContainerOuter>);

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

    it("handles complex layout structures", () => {
      render(
        <ContainerOuter>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div data-testid="left-column">Left column</div>
            <div data-testid="right-column">Right column</div>
          </div>
        </ContainerOuter>
      );

      expect(screen.getByTestId("left-column")).toBeInTheDocument();
      expect(screen.getByTestId("right-column")).toBeInTheDocument();
    });

    it("supports responsive design patterns", () => {
      render(
        <ContainerOuter>
          <div className="responsive-container">
            <div data-testid="mobile-content">Mobile content</div>
            <div data-testid="desktop-content">Desktop content</div>
          </div>
        </ContainerOuter>
      );

      expect(screen.getByTestId("mobile-content")).toBeInTheDocument();
      expect(screen.getByTestId("desktop-content")).toBeInTheDocument();
    });
  });
});
