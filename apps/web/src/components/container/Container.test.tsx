import React from "react";

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Container, ContainerInner, ContainerOuter } from "./Container";

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
  });

  describe("ContainerOuter Component", () => {
    it("renders children inside container", () => {
      render(
        <ContainerOuter>
          <span data-testid="outer-child">Outer</span>
        </ContainerOuter>
      );

      const content = screen.getByTestId("outer-child");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Outer");
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

    it("forwards ref to root div", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ContainerOuter ref={ref}>
          <span>Ref test</span>
        </ContainerOuter>
      );
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("applies className and other props", () => {
      render(
        <ContainerOuter className="outer-class" id="outer-id">
          <span>Props</span>
        </ContainerOuter>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveClass("outer-class");
      expect(containerOuterRoot).toHaveAttribute("id", "outer-id");
    });

    it("renders with proper structure", () => {
      render(
        <ContainerOuter>
          <span>Outer Content</span>
        </ContainerOuter>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Outer Content");
    });
  });

  describe("ContainerInner Component", () => {
    it("renders children inside container", () => {
      render(
        <ContainerInner>
          <span data-testid="inner-child">Inner</span>
        </ContainerInner>
      );

      const content = screen.getByTestId("inner-child");
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Inner");
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

    it("forwards ref to root div", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ContainerInner ref={ref}>
          <span>Ref test</span>
        </ContainerInner>
      );
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("applies className and other props", () => {
      render(
        <ContainerInner className="inner-class" id="inner-id">
          <span>Props</span>
        </ContainerInner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveClass("inner-class");
      expect(containerInnerRoot).toHaveAttribute("id", "inner-id");
    });

    it("renders with proper structure", () => {
      render(
        <ContainerInner>
          <span>Inner Content</span>
        </ContainerInner>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Inner Content");
    });
  });

  describe("Integration Tests", () => {
    it("Container properly composes ContainerOuter and ContainerInner", () => {
      render(
        <Container>
          <span>Test Content</span>
        </Container>
      );

      // Should render the container structure (multiple divs)
      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Test Content");
    });

    it("handles complex nested content", () => {
      render(
        <Container>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
          </div>
        </Container>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Title");
      expect(divs[0]).toHaveTextContent("Paragraph");
    });

    it("supports multiple children", () => {
      render(
        <Container>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </Container>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("First");
      expect(divs[0]).toHaveTextContent("Second");
      expect(divs[0]).toHaveTextContent("Third");
    });
  });

  describe("Error Handling", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(<Container>{""}</Container>);
      expect(container.firstChild).toBeNull();
    });

    it("handles whitespace-only children gracefully", () => {
      const { container } = render(<Container>{"   "}</Container>);
      // The component renders whitespace children, so we should expect content
      expect(container.firstChild).not.toBeNull();
      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("handles boolean children gracefully", () => {
      const { container } = render(<Container>{true}</Container>);
      // The component renders boolean children, so we should expect content
      expect(container.firstChild).not.toBeNull();
      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("handles number children gracefully", () => {
      const { container } = render(<Container>{0}</Container>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("renders semantic HTML structure", () => {
      render(
        <Container>
          <main>Main content</main>
        </Container>
      );

      const divs = screen.getAllByTestId("div");
      expect(divs.length).toBeGreaterThan(0);
      expect(divs[0]).toHaveTextContent("Main content");
    });

    it("preserves ARIA attributes", () => {
      render(
        <Container aria-label="Main container" role="main">
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute(
        "aria-label",
        "Main container"
      );
      expect(containerOuterRoot).toHaveAttribute("role", "main");
    });
  });

  describe("useComponentId Integration", () => {
    it("Container uses useComponentId with default values", () => {
      render(
        <Container>
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-container-outer-id", "test-id");
      expect(containerOuterRoot).not.toHaveAttribute("data-debug-mode");
    });

    it("Container uses useComponentId with custom internal ID", () => {
      render(
        <Container _internalId="custom-container-id">
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-container-outer-id", "custom-container-id");
    });

    it("Container uses useComponentId with debug mode enabled", () => {
      render(
        <Container _debugMode={true}>
          <span>Content</span>
        </Container>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("ContainerOuter uses useComponentId with default values", () => {
      render(
        <ContainerOuter>
          <span>Content</span>
        </ContainerOuter>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-container-outer-id", "test-id");
      expect(containerOuterRoot).not.toHaveAttribute("data-debug-mode");
    });

    it("ContainerOuter uses useComponentId with custom internal ID", () => {
      render(
        <ContainerOuter _internalId="custom-outer-id">
          <span>Content</span>
        </ContainerOuter>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-container-outer-id", "custom-outer-id");
    });

    it("ContainerOuter uses useComponentId with debug mode enabled", () => {
      render(
        <ContainerOuter _debugMode={true}>
          <span>Content</span>
        </ContainerOuter>
      );

      const containerOuterRoot = screen.getByTestId("container-outer-root");
      expect(containerOuterRoot).toHaveAttribute("data-debug-mode", "true");
    });

    it("ContainerInner uses useComponentId with default values", () => {
      render(
        <ContainerInner>
          <span>Content</span>
        </ContainerInner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute("data-container-inner-id", "test-id");
      expect(containerInnerRoot).not.toHaveAttribute("data-debug-mode");
    });

    it("ContainerInner uses useComponentId with custom internal ID", () => {
      render(
        <ContainerInner _internalId="custom-inner-id">
          <span>Content</span>
        </ContainerInner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute("data-container-inner-id", "custom-inner-id");
    });

    it("ContainerInner uses useComponentId with debug mode enabled", () => {
      render(
        <ContainerInner _debugMode={true}>
          <span>Content</span>
        </ContainerInner>
      );

      const containerInnerRoot = screen.getByTestId("container-inner-root");
      expect(containerInnerRoot).toHaveAttribute("data-debug-mode", "true");
    });
  });
});
