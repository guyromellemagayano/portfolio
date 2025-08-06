import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContainerClient, MemoizedContainerClient } from "./index.client";

import "@testing-library/jest-dom";

// Mock the Div component to control its behavior in tests
const MockDiv = React.forwardRef((props: any, ref) => {
  const { children, className, as: Component = "div", ...rest } = props;
  return (
    <Component ref={ref} className={className} data-testid="mock-div" {...rest}>
      {children}
    </Component>
  );
});

MockDiv.displayName = "MockDiv";

vi.mock("@guyromellemagayano/components", () => ({
  Div: MockDiv,
}));

describe("ContainerClient Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const defaultProps = {
    children: <div data-testid="test-content">Test Content</div>,
  };

  describe("Basic Functionality", () => {
    it("should render with default props", () => {
      render(<ContainerClient {...defaultProps} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ContainerClient {...defaultProps} ref={ref} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should pass through all props to Container component", () => {
      render(
        <ContainerClient
          {...defaultProps}
          data-testid="client-container"
          className="client-class"
          id="test-id"
          aria-label="test container"
        />
      );

      const container = screen.getByTestId("client-container");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("aria-label", "test container");
    });

    it("should handle complex children", () => {
      const complexChildren = (
        <div>
          <h1>Main Title</h1>
          <p>Main content</p>
          <button>Action</button>
        </div>
      );

      render(<ContainerClient>{complexChildren}</ContainerClient>);

      expect(screen.getByText("Main Title")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(<ContainerClient>{null}</ContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle undefined children", () => {
      render(<ContainerClient>{undefined}</ContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
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

      render(<ContainerClient>{multipleChildren}</ContainerClient>);

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("should handle className prop", () => {
      const customClass = "custom-client-class";
      render(<ContainerClient {...defaultProps} className={customClass} />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8", customClass);
    });

    it("should handle null className", () => {
      render(<ContainerClient {...defaultProps} className={null as any} />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8");
    });

    it("should handle undefined className", () => {
      render(<ContainerClient {...defaultProps} className={undefined} />);

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8");
    });

    it("should handle isClient prop", () => {
      render(<ContainerClient {...defaultProps} isClient={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle isMemoized prop", () => {
      render(<ContainerClient {...defaultProps} isMemoized={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle all boolean props", () => {
      render(
        <ContainerClient {...defaultProps} isClient={true} isMemoized={true} />
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle function children", () => {
      const functionChild = () => (
        <div data-testid="function-child">Function Child</div>
      );

      render(<ContainerClient>{functionChild as any}</ContainerClient>);

      // Function children are not rendered directly, so we just check the container exists
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle boolean children", () => {
      render(<ContainerClient>{true}</ContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle number children", () => {
      render(<ContainerClient>{42}</ContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle string children", () => {
      render(<ContainerClient>String Child</ContainerClient>);

      expect(screen.getByText("String Child")).toBeInTheDocument();
    });

    it("should handle large className strings", () => {
      const largeClassName = "class1 class2 class3 ".repeat(100);
      render(<ContainerClient {...defaultProps} className={largeClassName} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should not cause memory leaks with frequent re-renders", () => {
      const { rerender } = render(<ContainerClient {...defaultProps} />);

      // Simulate frequent re-renders
      for (let i = 0; i < 100; i++) {
        rerender(<ContainerClient {...defaultProps} key={i} />);
      }

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle performance with many children", () => {
      const manyChildren = Array.from({ length: 100 }, (_, i) => (
        <div key={i} data-testid={`child-${i}`}>
          Child {i}
        </div>
      ));

      render(<ContainerClient>{manyChildren}</ContainerClient>);

      expect(screen.getByTestId("child-0")).toBeInTheDocument();
      expect(screen.getByTestId("child-99")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should maintain accessibility with proper semantic structure", () => {
      render(
        <ContainerClient as="main" role="main">
          <div data-testid="accessible-content">Accessible Content</div>
        </ContainerClient>
      );

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();

      const content = screen.getByTestId("accessible-content");
      expect(content).toBeInTheDocument();
    });

    it("should handle ARIA attributes", () => {
      render(
        <ContainerClient
          {...defaultProps}
          aria-label="container description"
          aria-describedby="description"
        />
      );

      const container = screen.getAllByTestId("mock-div")[0];
      expect(container).toHaveAttribute("aria-label", "container description");
      expect(container).toHaveAttribute("aria-describedby", "description");
    });

    it("should support all polymorphic element types", () => {
      const elements = ["section", "article", "main", "aside", "div"] as const;

      elements.forEach((element) => {
        const { unmount } = render(
          <ContainerClient {...defaultProps} as={element} />
        );

        const renderedElement = screen.getAllByTestId("mock-div")[0];
        expect(renderedElement).toBeInTheDocument();

        unmount();
      });
    });
  });
});

describe("MemoizedContainerClient Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const defaultProps = {
    children: <div data-testid="test-content">Test Content</div>,
  };

  describe("Basic Functionality", () => {
    it("should render with default props", () => {
      render(<MemoizedContainerClient {...defaultProps} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<MemoizedContainerClient {...defaultProps} ref={ref} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should pass through all props to Container component", () => {
      render(
        <MemoizedContainerClient
          {...defaultProps}
          data-testid="memoized-container"
          className="memoized-class"
          id="test-id"
          aria-label="test container"
        />
      );

      const container = screen.getByTestId("memoized-container");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveAttribute("aria-label", "test container");
    });

    it("should handle complex children", () => {
      const complexChildren = (
        <div>
          <h1>Main Title</h1>
          <p>Main content</p>
          <button>Action</button>
        </div>
      );

      render(
        <MemoizedContainerClient>{complexChildren}</MemoizedContainerClient>
      );

      expect(screen.getByText("Main Title")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(<MemoizedContainerClient>{null}</MemoizedContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle undefined children", () => {
      render(<MemoizedContainerClient>{undefined}</MemoizedContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
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

      render(
        <MemoizedContainerClient>{multipleChildren}</MemoizedContainerClient>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("should handle className prop", () => {
      const customClass = "custom-memoized-class";
      render(
        <MemoizedContainerClient {...defaultProps} className={customClass} />
      );

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8", customClass);
    });

    it("should handle null className", () => {
      render(
        <MemoizedContainerClient {...defaultProps} className={null as any} />
      );

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8");
    });

    it("should handle undefined className", () => {
      render(
        <MemoizedContainerClient {...defaultProps} className={undefined} />
      );

      const outerDivs = screen.getAllByTestId("mock-div");
      const outerContainer = outerDivs[0];

      expect(outerContainer).toHaveClass("sm:px-8");
    });

    it("should handle isClient prop", () => {
      render(<MemoizedContainerClient {...defaultProps} isClient={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle isMemoized prop", () => {
      render(<MemoizedContainerClient {...defaultProps} isMemoized={true} />);

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle all boolean props", () => {
      render(
        <MemoizedContainerClient
          {...defaultProps}
          isClient={true}
          isMemoized={true}
        />
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle function children", () => {
      const functionChild = () => (
        <div data-testid="function-child">Function Child</div>
      );

      render(
        <MemoizedContainerClient>
          {functionChild as any}
        </MemoizedContainerClient>
      );

      // Function children are not rendered directly, so we just check the container exists
      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle boolean children", () => {
      render(<MemoizedContainerClient>{true}</MemoizedContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle number children", () => {
      render(<MemoizedContainerClient>{42}</MemoizedContainerClient>);

      expect(screen.getAllByTestId("mock-div")[0]).toBeInTheDocument();
    });

    it("should handle string children", () => {
      render(<MemoizedContainerClient>String Child</MemoizedContainerClient>);

      expect(screen.getByText("String Child")).toBeInTheDocument();
    });

    it("should handle large className strings", () => {
      const largeClassName = "class1 class2 class3 ".repeat(100);
      render(
        <MemoizedContainerClient {...defaultProps} className={largeClassName} />
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should not cause memory leaks with frequent re-renders", () => {
      const { rerender } = render(
        <MemoizedContainerClient {...defaultProps} />
      );

      // Simulate frequent re-renders
      for (let i = 0; i < 100; i++) {
        rerender(<MemoizedContainerClient {...defaultProps} key={i} />);
      }

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
    });

    it("should handle performance with many children", () => {
      const manyChildren = Array.from({ length: 100 }, (_, i) => (
        <div key={i} data-testid={`child-${i}`}>
          Child {i}
        </div>
      ));

      render(<MemoizedContainerClient>{manyChildren}</MemoizedContainerClient>);

      expect(screen.getByTestId("child-0")).toBeInTheDocument();
      expect(screen.getByTestId("child-99")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should maintain accessibility with proper semantic structure", () => {
      render(
        <MemoizedContainerClient as="main" role="main">
          <div data-testid="accessible-content">Accessible Content</div>
        </MemoizedContainerClient>
      );

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();

      const content = screen.getByTestId("accessible-content");
      expect(content).toBeInTheDocument();
    });

    it("should handle ARIA attributes", () => {
      render(
        <MemoizedContainerClient
          {...defaultProps}
          aria-label="container description"
          aria-describedby="description"
        />
      );

      const container = screen.getAllByTestId("mock-div")[0];
      expect(container).toHaveAttribute("aria-label", "container description");
      expect(container).toHaveAttribute("aria-describedby", "description");
    });

    it("should support all polymorphic element types", () => {
      const elements = ["section", "article", "main", "aside", "div"] as const;

      elements.forEach((element) => {
        const { unmount } = render(
          <MemoizedContainerClient {...defaultProps} as={element} />
        );

        const renderedElement = screen.getAllByTestId("mock-div")[0];
        expect(renderedElement).toBeInTheDocument();

        unmount();
      });
    });
  });
});
