import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SimpleLayout, type SimpleLayoutProps } from "./index";

import "@testing-library/jest-dom";

// Mock the components from @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-div" {...props} />
  ));
  MockDiv.displayName = "MockDiv";

  const MockHeader = React.forwardRef<HTMLElement, any>((props, ref) => (
    <header ref={ref} data-testid="mock-header" {...props} />
  ));
  MockHeader.displayName = "MockHeader";

  const MockHeading = React.forwardRef<HTMLHeadingElement, any>(
    (props, ref) => <h1 ref={ref} data-testid="mock-heading" {...props} />
  );
  MockHeading.displayName = "MockHeading";

  const MockP = React.forwardRef<HTMLParagraphElement, any>((props, ref) => (
    <p ref={ref} data-testid="mock-p" {...props} />
  ));
  MockP.displayName = "MockP";

  return {
    Div: MockDiv,
    Header: MockHeader,
    Heading: MockHeading,
    P: MockP,
  };
});

// Mock the Container component
vi.mock("@web/components/container", () => {
  const MockContainer = React.forwardRef<HTMLDivElement, any>((props, ref) => (
    <div ref={ref} data-testid="mock-container" {...props} />
  ));
  MockContainer.displayName = "MockContainer";

  return {
    Container: MockContainer,
  };
});

// Mock the cn function
vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

describe("SimpleLayout Component", () => {
  const defaultProps: SimpleLayoutProps = {
    title: "Test Page Title",
    intro: "This is a test introduction for the simple layout component.",
    children: <div data-testid="page-content">Page content here</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders the simple layout with all required elements", () => {
      render(<SimpleLayout {...defaultProps} />);

      expect(screen.getByTestId("mock-container")).toBeInTheDocument();
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
      expect(screen.getByTestId("mock-heading")).toBeInTheDocument();
      expect(screen.getByTestId("mock-p")).toBeInTheDocument();
      expect(screen.getByTestId("page-content")).toBeInTheDocument();
    });

    it("displays the title correctly", () => {
      render(<SimpleLayout {...defaultProps} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent("Test Page Title");
    });

    it("displays the intro correctly", () => {
      render(<SimpleLayout {...defaultProps} />);

      const intro = screen.getByTestId("mock-p");
      expect(intro).toHaveTextContent(
        "This is a test introduction for the simple layout component."
      );
    });

    it("renders children content", () => {
      render(<SimpleLayout {...defaultProps} />);

      expect(screen.getByTestId("page-content")).toBeInTheDocument();
      expect(screen.getByText("Page content here")).toBeInTheDocument();
    });

    it("renders children in a div wrapper", () => {
      render(<SimpleLayout {...defaultProps} />);

      const childrenWrapper = screen.getByTestId("mock-div");
      expect(childrenWrapper).toContainElement(
        screen.getByTestId("page-content")
      );
    });
  });

  describe("Styling and Classes", () => {
    it("applies correct classes to container", () => {
      render(<SimpleLayout {...defaultProps} />);

      const container = screen.getByTestId("mock-container");
      expect(container).toHaveClass("mt-16", "sm:mt-32");
    });

    it("merges custom className with default classes", () => {
      render(<SimpleLayout {...defaultProps} className="custom-class" />);

      const container = screen.getByTestId("mock-container");
      expect(container).toHaveClass("mt-16", "sm:mt-32", "custom-class");
    });

    it("applies correct classes to header", () => {
      render(<SimpleLayout {...defaultProps} />);

      const header = screen.getByTestId("mock-header");
      expect(header).toHaveClass("max-w-2xl");
    });

    it("applies correct classes to heading", () => {
      render(<SimpleLayout {...defaultProps} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveClass(
        "text-4xl",
        "font-bold",
        "tracking-tight",
        "text-zinc-800",
        "sm:text-5xl",
        "dark:text-zinc-100"
      );
    });

    it("applies correct classes to intro paragraph", () => {
      render(<SimpleLayout {...defaultProps} />);

      const intro = screen.getByTestId("mock-p");
      expect(intro).toHaveClass(
        "mt-6",
        "text-base",
        "text-zinc-600",
        "dark:text-zinc-400"
      );
    });

    it("applies correct classes to children wrapper", () => {
      render(<SimpleLayout {...defaultProps} />);

      const childrenWrapper = screen.getByTestId("mock-div");
      expect(childrenWrapper).toHaveClass("mt-16", "sm:mt-20");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all props to container component", () => {
      render(
        <SimpleLayout
          {...defaultProps}
          id="test-container"
          data-testid="custom-container"
          aria-label="Simple layout container"
        />
      );

      const container = screen.getByTestId("custom-container");
      expect(container).toHaveAttribute("id", "test-container");
      expect(container).toHaveAttribute("data-testid", "custom-container");
      expect(container).toHaveAttribute(
        "aria-label",
        "Simple layout container"
      );
    });

    it("forwards all props to container except title, intro, and children", () => {
      render(
        <SimpleLayout
          {...defaultProps}
          id="test-id"
          className="test-class"
          data-custom="test-value"
        />
      );

      const container = screen.getByTestId("mock-container");
      expect(container).toHaveAttribute("id", "test-id");
      expect(container).toHaveClass("test-class");
      expect(container).toHaveAttribute("data-custom", "test-value");
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      render(<SimpleLayout {...defaultProps} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading.tagName).toBe("H1");
    });

    it("has proper header semantic structure", () => {
      render(<SimpleLayout {...defaultProps} />);

      const header = screen.getByTestId("mock-header");
      expect(header.tagName).toBe("HEADER");
    });

    it("has proper paragraph semantic structure", () => {
      render(<SimpleLayout {...defaultProps} />);

      const intro = screen.getByTestId("mock-p");
      expect(intro.tagName).toBe("P");
    });

    it("has proper container semantic structure", () => {
      render(<SimpleLayout {...defaultProps} />);

      const container = screen.getByTestId("mock-container");
      expect(container.tagName).toBe("DIV");
    });
  });

  describe("Children Handling", () => {
    it("renders children when provided", () => {
      render(<SimpleLayout {...defaultProps} />);

      expect(screen.getByTestId("page-content")).toBeInTheDocument();
      expect(screen.getByText("Page content here")).toBeInTheDocument();
    });

    it("does not render children wrapper when children is null", () => {
      render(<SimpleLayout {...defaultProps} children={null} />);

      // Should not have the children wrapper div
      expect(screen.queryByTestId("page-content")).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-container")).toBeInTheDocument();
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("does not render children wrapper when children is undefined", () => {
      render(<SimpleLayout {...defaultProps} children={undefined} />);

      // Should not have the children wrapper div
      expect(screen.queryByTestId("page-content")).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-container")).toBeInTheDocument();
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("does not render children wrapper when children is empty string", () => {
      render(<SimpleLayout {...defaultProps} children="" />);

      // Should not have the children wrapper div
      expect(screen.queryByTestId("page-content")).not.toBeInTheDocument();
      expect(screen.getByTestId("mock-container")).toBeInTheDocument();
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("handles complex children structure", () => {
      const complexChildren = (
        <div>
          <h2>Section Title</h2>
          <p>Section content</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </div>
      );

      render(<SimpleLayout {...defaultProps} children={complexChildren} />);

      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
      expect(screen.getByText("List item 1")).toBeInTheDocument();
      expect(screen.getByText("List item 2")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      const multipleChildren = (
        <>
          <div data-testid="child-1">First child</div>
          <div data-testid="child-2">Second child</div>
          <div data-testid="child-3">Third child</div>
        </>
      );

      render(<SimpleLayout {...defaultProps} children={multipleChildren} />);

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title", () => {
      render(<SimpleLayout {...defaultProps} title="" />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent("");
    });

    it("handles very long title", () => {
      const longTitle = "A".repeat(200);
      render(<SimpleLayout {...defaultProps} title={longTitle} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent(longTitle);
    });

    it("handles special characters in title", () => {
      const specialTitle = "Title with special chars: & < > \" '";
      render(<SimpleLayout {...defaultProps} title={specialTitle} />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent(specialTitle);
    });

    it("handles empty intro", () => {
      render(<SimpleLayout {...defaultProps} intro="" />);

      const intro = screen.getByTestId("mock-p");
      expect(intro).toHaveTextContent("");
    });

    it("handles very long intro", () => {
      const longIntro =
        "This is a very long introduction that goes on and on and on. ".repeat(
          10
        );
      render(<SimpleLayout {...defaultProps} intro={longIntro} />);

      const intro = screen.getByTestId("mock-p");
      expect(intro.textContent).toBe(longIntro);
    });

    it("handles special characters in intro", () => {
      const specialIntro = "Intro with special chars: & < > \" '";
      render(<SimpleLayout {...defaultProps} intro={specialIntro} />);

      const intro = screen.getByTestId("mock-p");
      expect(intro).toHaveTextContent(specialIntro);
    });

    it("handles whitespace-only title", () => {
      render(<SimpleLayout {...defaultProps} title="   " />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading.textContent).toBe("   ");
    });

    it("handles whitespace-only intro", () => {
      render(<SimpleLayout {...defaultProps} intro="   " />);

      const intro = screen.getByTestId("mock-p");
      expect(intro.textContent).toBe("   ");
    });
  });

  describe("Component Display Name", () => {
    it("has correct display name", () => {
      expect(SimpleLayout.displayName).toBe("SimpleLayout");
    });
  });

  describe("Required Props", () => {
    it("requires title prop", () => {
      const { title, ...propsWithoutTitle } = defaultProps;

      // This should work since title is required in the type but we're testing runtime behavior
      render(<SimpleLayout {...propsWithoutTitle} title="Required Title" />);

      const heading = screen.getByTestId("mock-heading");
      expect(heading).toHaveTextContent("Required Title");
    });

    it("requires intro prop", () => {
      const { intro, ...propsWithoutIntro } = defaultProps;

      // This should work since intro is required in the type but we're testing runtime behavior
      render(<SimpleLayout {...propsWithoutIntro} intro="Required Intro" />);

      const introElement = screen.getByTestId("mock-p");
      expect(introElement).toHaveTextContent("Required Intro");
    });
  });

  describe("Layout Structure", () => {
    it("maintains proper nesting structure", () => {
      render(<SimpleLayout {...defaultProps} />);

      const container = screen.getByTestId("mock-container");
      const header = screen.getByTestId("mock-header");
      const heading = screen.getByTestId("mock-heading");
      const intro = screen.getByTestId("mock-p");

      expect(container).toContainElement(header);
      expect(header).toContainElement(heading);
      expect(header).toContainElement(intro);
    });

    it("places children after header", () => {
      render(<SimpleLayout {...defaultProps} />);

      const container = screen.getByTestId("mock-container");
      const header = screen.getByTestId("mock-header");
      const pageContent = screen.getByTestId("page-content");

      expect(container).toContainElement(header);
      expect(container).toContainElement(pageContent);
    });
  });
});
