/**
 * @file Container.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Container component.
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

// Mock dependencies
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
      const { container } = render(<Container>Test Content</Container>);

      const outer = container.querySelector("div");
      const inner = outer?.querySelector("div");
      expect(outer).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      const { container } = render(<Container>Content</Container>);

      const outer = container.querySelector("div");
      const inner = outer?.querySelector("div");
      const content = screen.getByText("Content");

      expect(outer).toContainElement(inner || null);
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
      const { container } = render(<Container>Test Content</Container>);

      const outer = container.querySelector("div");
      const inner = outer?.querySelector("div");
      const content = screen.getByText("Test Content");

      expect(outer).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      expect(outer).toContainElement(inner || null);
      expect(inner).toContainElement(content);
    });

    it("ensures proper nesting hierarchy: ContainerOuter > ContainerInner > Content", () => {
      const { container } = render(<Container>Nested Content</Container>);

      const outer = container.querySelector("div");
      const inner = outer?.querySelector("div");
      const content = screen.getByText("Nested Content");

      // Verify the nesting hierarchy
      expect(outer).toContainElement(inner || null);
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
      const { container } = render(
        <Container>
          <div>Content</div>
        </Container>
      );

      const outer = container.querySelector("div");
      const inner = outer?.querySelector("div");
      const content = screen.getByText("Content");

      expect(outer).toContainElement(inner || null);
      expect(inner).toContainElement(content);
    });

    it("handles CSS module class merging correctly", () => {
      const { container } = render(
        <Container className="custom-class">Content</Container>
      );

      const outer = container.querySelector("div");
      expect(outer?.className).toContain("custom-class");
    });
  });

  describe("Container Compound Component Integration", () => {
    it("works with Container.Inner as standalone component", () => {
      const { container } = render(
        <Container.Inner>Inner standalone</Container.Inner>
      );

      expect(screen.getByText("Inner standalone")).toBeInTheDocument();
      const inner = container.querySelector("div");
      expect(inner).toBeInTheDocument();
    });

    it("works with Container.Outer as standalone component", () => {
      const { container } = render(
        <Container.Outer>Outer standalone</Container.Outer>
      );

      expect(screen.getByText("Outer standalone")).toBeInTheDocument();
      const outer = container.querySelector("div");
      expect(outer).toBeInTheDocument();
    });

    it("maintains proper structure when using compound components separately", () => {
      const { container } = render(
        <Container.Outer>
          <Container.Inner>Nested compound</Container.Inner>
        </Container.Outer>
      );

      const outer = container.querySelector("div");
      const inner = outer?.querySelector("div");
      const content = screen.getByText("Nested compound");

      expect(outer).toContainElement(inner || null);
      expect(inner).toContainElement(content);
    });

    it("handles polymorphic as prop through compound component structure", () => {
      // Test Container with polymorphic as prop
      const { unmount: unmountContainer, container: container1 } = render(
        <Container as="main">Content</Container>
      );

      const outer = container1.querySelector("main");
      expect(outer?.tagName).toBe("MAIN");

      unmountContainer();

      // Test Container.Inner with polymorphic as prop (standalone)
      const { unmount: unmountInner, container: container2 } = render(
        <Container.Inner as="section">Inner content</Container.Inner>
      );
      const inner = container2.querySelector("section");
      expect(inner?.tagName).toBe("SECTION");

      unmountInner();

      // Test Container.Outer with polymorphic as prop (standalone)
      const { container: container3 } = render(
        <Container.Outer as="article">Outer content</Container.Outer>
      );
      const outerStandalone = container3.querySelector("article");
      expect(outerStandalone?.tagName).toBe("ARTICLE");
    });

    it("supports all semantic HTML5 elements for SEO optimization", () => {
      const semanticElements: Array<
        | "div"
        | "section"
        | "main"
        | "article"
        | "nav"
        | "header"
        | "footer"
        | "aside"
      > = [
        "div",
        "section",
        "main",
        "article",
        "nav",
        "header",
        "footer",
        "aside",
      ];

      semanticElements.forEach((elementType) => {
        const { container, unmount } = render(
          <Container as={elementType}>Content</Container>
        );

        const element = container.querySelector(elementType);
        expect(element?.tagName).toBe(elementType.toUpperCase());
        unmount();
      });
    });

    it("supports custom props through compound component structure", () => {
      const { container } = render(
        <Container
          as="main"
          data-custom="value"
          aria-label="Main container"
          onClick={vi.fn()}
        >
          Content
        </Container>
      );

      const outer = container.querySelector("main");
      expect(outer?.tagName).toBe("MAIN");
      expect(outer).toHaveAttribute("data-custom", "value");
      expect(outer).toHaveAttribute("aria-label", "Main container");
    });
  });

  describe("Container Layout Structure", () => {
    it("applies correct outer container wrapper classes", () => {
      const { container } = render(<Container>Content</Container>);

      const outerRoot = container.querySelector("div");
      const outerContentWrapper = outerRoot?.querySelector("div");

      expect(outerContentWrapper?.className).toContain("mx-auto");
      expect(outerContentWrapper?.className).toContain("max-w-7xl");
    });

    it("applies correct inner container wrapper classes", () => {
      const { container } = render(<Container>Content</Container>);

      const outerRoot = container.querySelector("div");
      const outerWrapper = outerRoot?.querySelector("div");
      const innerRoot = outerWrapper?.querySelector("div");
      const innerContentWrapper = innerRoot?.querySelector("div");

      expect(innerContentWrapper?.className).toContain("mx-auto");
      expect(innerContentWrapper?.className).toContain("max-w-2xl");
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

  describe("Container with Custom Props", () => {
    it("passes custom props through Container to ContainerOuter", () => {
      const { container } = render(
        <Container data-custom="value" aria-label="Custom" onClick={vi.fn()}>
          Content
        </Container>
      );

      const outer = container.querySelector("div");
      expect(outer).toHaveAttribute("data-custom", "value");
      expect(outer).toHaveAttribute("aria-label", "Custom");
    });

    it("handles event handlers correctly", () => {
      const handleClick = vi.fn();
      const handleMouseEnter = vi.fn();

      const { container } = render(
        <Container onClick={handleClick} onMouseEnter={handleMouseEnter}>
          Content
        </Container>
      );

      const outer = container.querySelector("div");
      if (outer) {
        fireEvent.click(outer);
        fireEvent.mouseEnter(outer);
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe("SEO Optimization Integration", () => {
    it("supports semantic HTML5 structure for optimal SEO", () => {
      const { container } = render(
        <Container as="main" aria-label="Main content area">
          <Container as="article" aria-labelledby="article-title">
            Article content
          </Container>
        </Container>
      );

      const mainElement = container.querySelector("main");
      const articleElement = mainElement?.querySelector("article");
      expect(mainElement?.tagName).toBe("MAIN");
      expect(articleElement?.tagName).toBe("ARTICLE");
      // Proper semantic nesting improves SEO understanding
    });

    it("supports ARIA landmark roles for better SEO", () => {
      const { container } = render(
        <Container as="main" aria-label="Main content">
          Main content
        </Container>
      );

      const mainElement = container.querySelector("main");
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveAttribute("aria-label", "Main content");
      // <main> has implicit role="main" for SEO
    });

    it("maintains proper semantic structure across all semantic elements", () => {
      const semanticTests = [
        { as: "main", expectedRole: "main" },
        { as: "nav", expectedRole: "navigation" },
        { as: "article", expectedRole: "article" },
        { as: "section", expectedRole: "region" },
        { as: "header", expectedRole: "banner" },
        { as: "footer", expectedRole: "contentinfo" },
        { as: "aside", expectedRole: "complementary" },
      ];

      semanticTests.forEach(({ as, expectedRole }) => {
        const { container, unmount } = render(
          <Container
            as={
              as as
                | "div"
                | "section"
                | "main"
                | "article"
                | "nav"
                | "header"
                | "footer"
                | "aside"
            }
            aria-label="Test"
          >
            Content
          </Container>
        );

        const element = container.querySelector(as);
        expect(element?.tagName).toBe(as.toUpperCase());
        expect(element).toHaveAttribute("aria-label", "Test");
        // Semantic elements have implicit ARIA roles for SEO
        unmount();
      });
    });
  });
});
