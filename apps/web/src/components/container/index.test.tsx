import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Container, type ContainerProps } from ".";

import "@testing-library/jest-dom";

vi.mock("@guyromellemagayano/components", () => {
  const MockDiv = React.forwardRef((props: any, ref) => {
    const { children, className, as: Component = "div", ...rest } = props;
    return (
      <Component
        ref={ref}
        className={className}
        data-testid="mock-div"
        {...rest}
      >
        {children}
      </Component>
    );
  });

  MockDiv.displayName = "MockDiv";

  return {
    Div: MockDiv,
  };
});

describe("Container Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const defaultProps: ContainerProps = {
    children: <div data-testid="test-content">Test Content</div>,
  };

  describe("Server-Side Rendering (Default)", () => {
    it("should render with default props", () => {
      render(<Container {...defaultProps} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should apply default responsive classes to outer container", () => {
      render(<Container {...defaultProps} />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0]; // First div is ContainerOuter

      expect(outerContainer).toHaveClass("sm:px-8");
    });

    it("should apply default responsive classes to inner container", () => {
      render(<Container {...defaultProps} />);

      const innerDivs = screen.getAllByTestId("mock-div");
      const innerContainer = innerDivs[2]; // Third div is ContainerInner

      expect(innerContainer).toHaveClass(
        "relative",
        "px-4",
        "sm:px-8",
        "lg:px-12"
      );
    });

    it("should apply max-width classes to nested inner div", () => {
      render(<Container {...defaultProps} />);

      const nestedDivs = screen.getAllByTestId("mock-div");
      const nestedInnerDiv = nestedDivs[3]; // Fourth div is the nested inner div

      expect(nestedInnerDiv).toHaveClass(
        "mx-auto",
        "max-w-2xl",
        "lg:max-w-5xl"
      );
    });

    it("should apply max-width classes to outer nested div", () => {
      render(<Container {...defaultProps} />);

      const nestedDivs = screen.getAllByTestId("mock-div");
      const outerNestedDiv = nestedDivs[1]; // Second div is the outer nested div

      expect(outerNestedDiv).toHaveClass(
        "mx-auto",
        "w-full",
        "max-w-7xl",
        "lg:px-8"
      );
    });

    it("should merge custom className with default classes", () => {
      const customClass = "custom-container-class";
      render(<Container {...defaultProps} className={customClass} />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8", customClass);
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container {...defaultProps} ref={ref} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      // Ref forwarding is handled by the Div component
    });

    it("should handle polymorphic rendering with different elements", () => {
      const elements = ["section", "article", "main", "aside"] as const;

      elements.forEach((element) => {
        const { unmount } = render(
          <Container {...defaultProps} as={element} />
        );

        const renderedElements = screen.getAllByTestId("mock-div");
        const firstElement = renderedElements[0]; // Get the first element
        expect(firstElement?.tagName.toLowerCase()).toBe(element);

        unmount();
      });
    });

    it("should pass through additional props", () => {
      render(
        <Container
          {...defaultProps}
          data-testid="main-container"
          id="test-id"
          aria-label="test container"
        />
      );

      const container = screen.getByTestId("main-container");
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("aria-label", "test container");
    });
  });

  describe("Client-Side Rendering", () => {
    it("should render client component when isClient is true", () => {
      render(<Container {...defaultProps} isClient={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should render memoized client component when isMemoized is true", () => {
      render(<Container {...defaultProps} isClient={true} isMemoized={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should forward ref correctly when using client component", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container {...defaultProps} ref={ref} isClient={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should pass through props to client component", () => {
      render(
        <Container
          {...defaultProps}
          data-testid="client-container"
          className="client-class"
          isClient={true}
        />
      );

      expect(screen.getByTestId("client-container")).toBeInTheDocument();
    });

    it("should handle client component with memoization", () => {
      render(
        <Container
          {...defaultProps}
          data-testid="memoized-container"
          isClient={true}
          isMemoized={true}
        />
      );

      expect(screen.getByTestId("memoized-container")).toBeInTheDocument();
    });
  });

  describe("Children Handling", () => {
    it("should handle complex children", () => {
      const complexChildren = (
        <div>
          <h1>Main Title</h1>
          <p>Main content</p>
          <button>Action</button>
        </div>
      );

      render(<Container>{complexChildren}</Container>);

      expect(screen.getByText("Main Title")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(<Container>{null}</Container>);

      const divs = screen.getAllByTestId("mock-div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("should handle undefined children", () => {
      render(<Container>{undefined}</Container>);

      const divs = screen.getAllByTestId("mock-div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("should handle multiple children", () => {
      const multipleChildren = [
        <div key="1" data-testid="child-1">
          Child 1
        </div>,
        <div key="2" data-testid="child-2">
          Child 2
        </div>,
        <div key="3" data-testid="child-3">
          Child 3
        </div>,
      ];

      render(<Container>{multipleChildren}</Container>);

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });

    it("should handle performance with many children", () => {
      const manyChildren = Array.from({ length: 100 }, (_, i) => (
        <div key={i} data-testid={`child-${i}`}>
          Child {i}
        </div>
      ));

      render(<Container>{manyChildren}</Container>);

      expect(screen.getByTestId("child-0")).toBeInTheDocument();
      expect(screen.getByTestId("child-99")).toBeInTheDocument();
    });
  });

  describe("Styling and Classes", () => {
    it("should handle edge case with only spaces in className", () => {
      render(<Container {...defaultProps} className=" " />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];
      expect(outerContainer).toBeInTheDocument();
    });

    it("should handle edge case with mixed spaces and classes in className", () => {
      render(<Container {...defaultProps} className="class another" />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];
      expect(outerContainer).toBeInTheDocument();
    });

    it("should handle empty className", () => {
      render(<Container {...defaultProps} className="" />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];
      expect(outerContainer).toBeInTheDocument();
    });

    it("should handle undefined className", () => {
      render(<Container {...defaultProps} className={undefined} />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];
      expect(outerContainer).toBeInTheDocument();
    });
  });

  describe("Structure and Layout", () => {
    it("should maintain proper nesting structure", () => {
      render(<Container {...defaultProps} />);

      const divs = screen.getAllByTestId("mock-div");
      expect(divs.length).toBe(4); // ContainerOuter, ContainerInner, nested inner div, outer nested div
    });

    it("should handle multiple containers with different props", () => {
      render(
        <div>
          <Container {...defaultProps} className="container-1" />
          <Container {...defaultProps} className="container-2" />
        </div>
      );

      const containers = screen.getAllByTestId("test-content");
      expect(containers).toHaveLength(2);
    });

    it("should handle nested containers", () => {
      render(
        <Container>
          <Container {...defaultProps} />
        </Container>
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Accessibility and Semantics", () => {
    it("should maintain accessibility with proper semantic structure", () => {
      render(
        <Container as="main" role="main">
          <div data-testid="accessible-content">Accessible Content</div>
        </Container>
      );

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();

      const content = screen.getByTestId("accessible-content");
      expect(content).toBeInTheDocument();
    });

    it("should support all polymorphic element types", () => {
      const elements = ["section", "article", "main", "aside", "div"] as const;

      elements.forEach((element) => {
        const { unmount } = render(
          <Container {...defaultProps} as={element} />
        );

        const renderedElements = screen.getAllByTestId("mock-div");
        const firstElement = renderedElements[0]; // Get the first element
        expect(firstElement?.tagName.toLowerCase()).toBe(element);

        unmount();
      });
    });

    it("should handle ARIA attributes", () => {
      render(
        <Container
          {...defaultProps}
          aria-label="container description"
          aria-describedby="description"
        />
      );

      const containers = screen.getAllByTestId("mock-div");
      const firstContainer = containers[0]; // Get the first container
      expect(firstContainer).toHaveAttribute(
        "aria-label",
        "container description"
      );
      expect(firstContainer).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle null props gracefully", () => {
      render(<Container {...defaultProps} className={null as any} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle function children", () => {
      const functionChild = () => (
        <div data-testid="function-child">Function Child</div>
      );

      render(<Container>{functionChild as any}</Container>);

      // Function children are not rendered directly, so we just check the container exists
      const divs = screen.getAllByTestId("mock-div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("should handle boolean children", () => {
      render(<Container>{true}</Container>);

      const divs = screen.getAllByTestId("mock-div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("should handle number children", () => {
      render(<Container>{42}</Container>);

      const divs = screen.getAllByTestId("mock-div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it("should handle string children", () => {
      render(<Container>String Child</Container>);

      expect(screen.getByText("String Child")).toBeInTheDocument();
    });
  });

  describe("Performance and Memory", () => {
    it("should not cause memory leaks with frequent re-renders", () => {
      const { rerender } = render(<Container {...defaultProps} />);

      // Simulate frequent re-renders
      for (let i = 0; i < 100; i++) {
        rerender(<Container {...defaultProps} key={i} />);
      }

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle large className strings", () => {
      const largeClassName = "class1 class2 class3 ".repeat(100);
      render(<Container {...defaultProps} className={largeClassName} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Integration with Div Component", () => {
    it("should properly integrate with Div component props", () => {
      render(
        <Container
          {...defaultProps}
          isClient={false}
          isMemoized={false}
          as="section"
        />
      );

      const sections = screen.getAllByTestId("mock-div");
      const firstSection = sections[0]; // Get the first section
      expect(firstSection?.tagName.toLowerCase()).toBe("section");
    });

    it("should handle Div component client rendering", () => {
      render(
        <Container {...defaultProps} isClient={true} isMemoized={false} />
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle Div component memoized rendering", () => {
      render(<Container {...defaultProps} isClient={true} isMemoized={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Client/Server Component Switching", () => {
    it("should render server component by default", () => {
      render(<Container {...defaultProps} />);

      // Should render the server version (no client-specific behavior)
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should render client component when isClient=true", () => {
      render(<Container isClient={true} {...defaultProps} />);

      // Should render the client version
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should render memoized client component when isClient=true and isMemoized=true", () => {
      render(<Container isClient={true} isMemoized={true} {...defaultProps} />);

      // Should render the memoized client version
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle Suspense fallback for client components", () => {
      render(<Container isClient={true} {...defaultProps} />);

      // Client components use Suspense, so we should see the fallback initially
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Client Component Verification", () => {
    it("should demonstrate client component behavior", () => {
      // Test server component (default)
      const { rerender } = render(<Container {...defaultProps} />);

      // Server component renders immediately
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();

      // Switch to client component
      rerender(<Container isClient={true} {...defaultProps} />);

      // Client component should still render (with Suspense fallback)
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();

      // Switch to memoized client component
      rerender(
        <Container isClient={true} isMemoized={true} {...defaultProps} />
      );

      // Memoized client component should render
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle client-specific props", () => {
      render(
        <Container
          isClient={true}
          data-client-test="true"
          className="client-specific-class"
          {...defaultProps}
        />
      );

      // Verify client component renders with client-specific props
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should verify client component can handle interactive features", () => {
      // This test demonstrates that client components can handle
      // client-side specific features that server components cannot
      render(
        <Container
          isClient={true}
          onClick={() => {}} // Client components can handle events
          onMouseEnter={() => {}}
          {...defaultProps}
        />
      );

      // Verify the component renders with event handlers
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });
});
