import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContainerInner } from "../ContainerInner";

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
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn((id, componentType, debugMode) => ({
    [`data-${componentType}-id`]: `${id}-${componentType}`,
    "data-debug-mode": debugMode ? "true" : undefined,
    "data-testid": `${id}-${componentType}-root`,
  })),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS modules
vi.mock("../ContainerInner.module.css", () => ({
  default: {
    containerInner: "containerInner",
    containerInnerContent: "containerInnerContent",
  },
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
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is undefined", () => {
      const { container } = render(
        <ContainerInner>{undefined}</ContainerInner>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render if children is false", () => {
      const { container } = render(<ContainerInner>{false}</ContainerInner>);
      expect(container.firstChild).toBeNull();
    });

    it("does not render with empty string children", () => {
      const { container } = render(<ContainerInner>{""}</ContainerInner>);
      expect(container.firstChild).toBeNull();
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
      expect(innerRoot).toHaveAttribute("id", "test-id");
      expect(innerRoot).toHaveAttribute("data-test", "test-data");
    });

    it("applies CSS module classes", () => {
      render(<ContainerInner>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      // CSS module classes are hashed, so we check that the class contains the expected pattern
      expect(innerRoot.className).toMatch(/containerInner/);
    });

    it("merges custom className with CSS module classes", () => {
      render(<ContainerInner className="custom-class">Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveClass("custom-class");
      // CSS module classes are hashed, so we check that the class contains the expected pattern
      expect(innerRoot.className).toMatch(/containerInner/);
    });
  });

  describe("Debug Mode", () => {
    it("applies debug mode when enabled", () => {
      render(<ContainerInner _debugMode={true}>Content</ContainerInner>);

      const innerRoot = screen.getByTestId("test-id-container-inner-root");
      expect(innerRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode when disabled", () => {
      render(<ContainerInner _debugMode={false}>Content</ContainerInner>);

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
      render(<ContainerInner _internalId="custom-id">Content</ContainerInner>);

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
