/**
 * @file Container.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Container component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Container } from "../Container";

import "@testing-library/jest-dom";

// Mock the external dependencies
vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

vi.mock("@web/utils/helpers", () => ({
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
      const { container } = render(
        <Container className="custom-class">Content</Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer).toHaveAttribute("class");
      expect(outerContainer?.className).toContain("custom-class");
    });

    it("passes through HTML attributes", () => {
      const { container } = render(
        <Container aria-label="Container label">Content</Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer).toHaveAttribute("aria-label", "Container label");
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

  describe("Polymorphic Element Types", () => {
    it("renders as div by default", () => {
      const { container } = render(<Container>Content</Container>);

      const outerContainer = container.querySelector("div");
      expect(outerContainer?.tagName).toBe("DIV");
    });

    it("renders as section when as prop is section", () => {
      const { container } = render(<Container as="section">Content</Container>);

      const outerContainer = container.querySelector("section");
      expect(outerContainer?.tagName).toBe("SECTION");
    });

    it("renders as main when as prop is main", () => {
      const { container } = render(<Container as="main">Content</Container>);

      const outerContainer = container.querySelector("main");
      expect(outerContainer?.tagName).toBe("MAIN");
    });

    it("renders as article when as prop is article", () => {
      const { container } = render(
        <Container as="article">Content</Container>
      );

      const outerContainer = container.querySelector("article");
      expect(outerContainer?.tagName).toBe("ARTICLE");
    });

    it("renders as nav when as prop is nav (SEO: semantic navigation)", () => {
      const { container } = render(<Container as="nav">Navigation</Container>);

      const outerContainer = container.querySelector("nav");
      expect(outerContainer?.tagName).toBe("NAV");
    });

    it("renders as header when as prop is header (SEO: semantic header)", () => {
      const { container } = render(
        <Container as="header">Header content</Container>
      );

      const outerContainer = container.querySelector("header");
      expect(outerContainer?.tagName).toBe("HEADER");
    });

    it("renders as footer when as prop is footer (SEO: semantic footer)", () => {
      const { container } = render(
        <Container as="footer">Footer content</Container>
      );

      const outerContainer = container.querySelector("footer");
      expect(outerContainer?.tagName).toBe("FOOTER");
    });

    it("renders as aside when as prop is aside (SEO: semantic aside)", () => {
      const { container } = render(<Container as="aside">Sidebar</Container>);

      const outerContainer = container.querySelector("aside");
      expect(outerContainer?.tagName).toBe("ASIDE");
    });

    it("allows custom props to be passed through", () => {
      const { container } = render(
        <Container data-custom="value" aria-label="Custom container">
          Content
        </Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer).toHaveAttribute("data-custom", "value");
      expect(outerContainer).toHaveAttribute("aria-label", "Custom container");
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
      const { container } = render(
        <Container.Inner>Inner content</Container.Inner>
      );

      expect(screen.getByText("Inner content")).toBeInTheDocument();
      const innerContainer = container.querySelector("div");
      expect(innerContainer).toBeInTheDocument();
    });

    it("renders Container.Outer correctly", () => {
      const { container } = render(
        <Container.Outer>Outer content</Container.Outer>
      );

      expect(screen.getByText("Outer content")).toBeInTheDocument();
      const outerContainer = container.querySelector("div");
      expect(outerContainer).toBeInTheDocument();
    });

    it("renders Container.Inner with polymorphic as prop", () => {
      const { container } = render(
        <Container.Inner as="section">Inner content</Container.Inner>
      );

      const innerRoot = container.querySelector("section");
      expect(innerRoot?.tagName).toBe("SECTION");
    });

    it("renders Container.Outer with polymorphic as prop", () => {
      const { container } = render(
        <Container.Outer as="main">Outer content</Container.Outer>
      );

      const outerRoot = container.querySelector("main");
      expect(outerRoot?.tagName).toBe("MAIN");
    });
  });

  describe("Container.Inner Component", () => {
    it("renders with proper structure", () => {
      const { container } = render(
        <Container.Inner>
          <div data-testid="child">Child content</div>
        </Container.Inner>
      );

      const innerRoot = container.querySelector("div");
      const child = screen.getByTestId("child");

      expect(innerRoot).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Child content");
    });

    it("passes className correctly to Container.Inner", () => {
      const { container } = render(
        <Container.Inner className="custom-class">Content</Container.Inner>
      );

      const innerRoot = container.querySelector("div");
      expect(innerRoot).toHaveClass("custom-class");
    });

    it("applies Tailwind CSS classes to Container.Inner", () => {
      const { container } = render(<Container.Inner>Content</Container.Inner>);

      const innerRoot = container.querySelector("div");
      expect(innerRoot?.className).toContain("relative");
      expect(innerRoot?.className).toContain("px-4");
    });

    it("merges custom className with Tailwind CSS classes in Container.Inner", () => {
      const { container } = render(
        <Container.Inner className="custom-class">Content</Container.Inner>
      );

      const innerRoot = container.querySelector("div");
      expect(innerRoot?.className).toContain("custom-class");
      expect(innerRoot?.className).toContain("relative");
    });

    it("renders Container.Inner with all supported element types", () => {
      const { rerender, container } = render(
        <Container.Inner as="div">Content</Container.Inner>
      );
      expect(container.querySelector("div")?.tagName).toBe("DIV");

      rerender(<Container.Inner as="section">Content</Container.Inner>);
      expect(container.querySelector("section")?.tagName).toBe("SECTION");

      rerender(<Container.Inner as="main">Content</Container.Inner>);
      expect(container.querySelector("main")?.tagName).toBe("MAIN");

      rerender(<Container.Inner as="article">Content</Container.Inner>);
      expect(container.querySelector("article")?.tagName).toBe("ARTICLE");

      rerender(<Container.Inner as="nav">Content</Container.Inner>);
      expect(container.querySelector("nav")?.tagName).toBe("NAV");

      rerender(<Container.Inner as="header">Content</Container.Inner>);
      expect(container.querySelector("header")?.tagName).toBe("HEADER");

      rerender(<Container.Inner as="footer">Content</Container.Inner>);
      expect(container.querySelector("footer")?.tagName).toBe("FOOTER");

      rerender(<Container.Inner as="aside">Content</Container.Inner>);
      expect(container.querySelector("aside")?.tagName).toBe("ASIDE");
    });
  });

  describe("Container.Outer Component", () => {
    it("renders with proper structure", () => {
      const { container } = render(
        <Container.Outer>
          <div data-testid="child">Child content</div>
        </Container.Outer>
      );

      const outerRoot = container.querySelector("div");
      const child = screen.getByTestId("child");

      expect(outerRoot).toBeInTheDocument();
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent("Child content");
    });

    it("passes className correctly to Container.Outer", () => {
      const { container } = render(
        <Container.Outer className="custom-class">Content</Container.Outer>
      );

      const outerRoot = container.querySelector("div");
      expect(outerRoot).toHaveClass("custom-class");
    });

    it("applies Tailwind CSS classes to Container.Outer", () => {
      const { container } = render(<Container.Outer>Content</Container.Outer>);

      const outerRoot = container.querySelector("div");
      expect(outerRoot?.className).toContain("sm:px-8");
    });

    it("merges custom className with Tailwind CSS classes in Container.Outer", () => {
      const { container } = render(
        <Container.Outer className="custom-class">Content</Container.Outer>
      );

      const outerRoot = container.querySelector("div");
      expect(outerRoot?.className).toContain("custom-class");
      expect(outerRoot?.className).toContain("sm:px-8");
    });

    it("forwards aria attributes to Container.Outer", () => {
      const { container } = render(
        <Container.Outer aria-label="Outer container" aria-describedby="desc">
          Content
        </Container.Outer>
      );

      const outerRoot = container.querySelector("div");
      expect(outerRoot).toHaveAttribute("aria-label", "Outer container");
      expect(outerRoot).toHaveAttribute("aria-describedby", "desc");
    });

    it("applies container outer content wrapper classes", () => {
      const { container } = render(<Container.Outer>Content</Container.Outer>);

      const outerRoot = container.querySelector("div");
      const contentWrapper = outerRoot?.querySelector("div");

      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper?.className).toContain("mx-auto");
      expect(contentWrapper?.className).toContain("max-w-7xl");
    });

    it("renders Container.Outer with all supported element types", () => {
      const { rerender, container } = render(
        <Container.Outer as="div">Content</Container.Outer>
      );
      expect(container.querySelector("div")?.tagName).toBe("DIV");

      rerender(<Container.Outer as="section">Content</Container.Outer>);
      expect(container.querySelector("section")?.tagName).toBe("SECTION");

      rerender(<Container.Outer as="main">Content</Container.Outer>);
      expect(container.querySelector("main")?.tagName).toBe("MAIN");

      rerender(<Container.Outer as="article">Content</Container.Outer>);
      expect(container.querySelector("article")?.tagName).toBe("ARTICLE");

      rerender(<Container.Outer as="nav">Content</Container.Outer>);
      expect(container.querySelector("nav")?.tagName).toBe("NAV");

      rerender(<Container.Outer as="header">Content</Container.Outer>);
      expect(container.querySelector("header")?.tagName).toBe("HEADER");

      rerender(<Container.Outer as="footer">Content</Container.Outer>);
      expect(container.querySelector("footer")?.tagName).toBe("FOOTER");

      rerender(<Container.Outer as="aside">Content</Container.Outer>);
      expect(container.querySelector("aside")?.tagName).toBe("ASIDE");
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
          <span data-testid="conditional">Conditional</span>
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


  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA labels to content elements", () => {
      const { container } = render(
        <Container aria-label="Test container">Container content</Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer).toHaveAttribute("aria-label", "Test container");
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender, container } = render(
        <Container>Container content</Container>
      );

      let outerContainer = container.querySelector("div");
      expect(outerContainer).toBeInTheDocument();

      rerender(<Container>Updated content</Container>);

      outerContainer = container.querySelector("div");
      expect(outerContainer).toBeInTheDocument();
    });

    it("handles ARIA attributes when content is missing", () => {
      const { container } = render(<Container>{null}</Container>);

      expect(container).toBeEmptyDOMElement();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      const { container } = render(
        <Container
          aria-expanded="true"
          aria-controls="container-content"
        >
          Container content
        </Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer).toBeInTheDocument();
      expect(outerContainer).toHaveAttribute("aria-expanded", "true");
      expect(outerContainer).toHaveAttribute(
        "aria-controls",
        "container-content"
      );
    });
  });

  describe("SEO Optimization", () => {
    it("supports semantic HTML5 elements for better SEO", () => {
      const { container } = render(
        <Container as="main" aria-label="Main content">
          Main content area
        </Container>
      );

      const mainElement = container.querySelector("main");
      expect(mainElement?.tagName).toBe("MAIN");
      expect(mainElement).toHaveAttribute("aria-label", "Main content");
    });

    it("provides implicit ARIA landmark roles with semantic elements", () => {
      const { container } = render(<Container as="main">Main content</Container>);

      const mainElement = container.querySelector("main");
      expect(mainElement).toBeInTheDocument();
      // <main> has implicit role="main" for SEO and accessibility
    });

    it("supports semantic navigation element (SEO: proper navigation structure)", () => {
      const { container } = render(
        <Container as="nav" aria-label="Main navigation">
          Navigation links
        </Container>
      );

      const navElement = container.querySelector("nav");
      expect(navElement?.tagName).toBe("NAV");
      expect(navElement).toHaveAttribute("aria-label", "Main navigation");
      // <nav> has implicit role="navigation" for SEO
    });

    it("supports semantic article element (SEO: proper article structure)", () => {
      const { container } = render(
        <Container as="article" aria-labelledby="article-title">
          Article content
        </Container>
      );

      const articleElement = container.querySelector("article");
      expect(articleElement?.tagName).toBe("ARTICLE");
      expect(articleElement).toHaveAttribute(
        "aria-labelledby",
        "article-title"
      );
      // <article> has implicit role="article" for SEO
    });

    it("supports semantic section element with aria-label (SEO: proper section structure)", () => {
      const { container } = render(
        <Container as="section" aria-label="Content section">
          Section content
        </Container>
      );

      const sectionElement = container.querySelector("section");
      expect(sectionElement?.tagName).toBe("SECTION");
      expect(sectionElement).toHaveAttribute("aria-label", "Content section");
      // <section> has implicit role="region" when accessible name provided
    });

    it("supports semantic header element (SEO: proper header structure)", () => {
      const { container } = render(
        <Container as="header">Header content</Container>
      );

      const headerElement = container.querySelector("header");
      expect(headerElement?.tagName).toBe("HEADER");
      // <header> has implicit role="banner" for SEO
    });

    it("supports semantic footer element (SEO: proper footer structure)", () => {
      const { container } = render(
        <Container as="footer">Footer content</Container>
      );

      const footerElement = container.querySelector("footer");
      expect(footerElement?.tagName).toBe("FOOTER");
      // <footer> has implicit role="contentinfo" for SEO
    });

    it("supports semantic aside element (SEO: proper complementary content)", () => {
      const { container } = render(
        <Container as="aside" aria-label="Sidebar">
          Sidebar content
        </Container>
      );

      const asideElement = container.querySelector("aside");
      expect(asideElement?.tagName).toBe("ASIDE");
      expect(asideElement).toHaveAttribute("aria-label", "Sidebar");
      // <aside> has implicit role="complementary" for SEO
    });

    it("maintains proper semantic structure for SEO", () => {
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

    it("supports ARIA relationships for better semantic structure (SEO)", () => {
      const { container } = render(
        <Container
          as="article"
          aria-labelledby="article-title"
          aria-describedby="article-description"
        >
          Article content
        </Container>
      );

      const articleElement = container.querySelector("article");
      expect(articleElement).toHaveAttribute("aria-labelledby", "article-title");
      expect(articleElement).toHaveAttribute(
        "aria-describedby",
        "article-description"
      );
      // ARIA relationships help search engines understand content structure
    });
  });


  describe("Custom Props Support", () => {
    it("accepts and passes through custom data attributes", () => {
      const { container } = render(
        <Container data-test-custom="custom-value" data-analytics="track">
          Content
        </Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer).toHaveAttribute("data-test-custom", "custom-value");
      expect(outerContainer).toHaveAttribute("data-analytics", "track");
    });

    it("accepts and passes through event handlers", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Container onClick={handleClick} onMouseEnter={vi.fn()}>
          Content
        </Container>
      );

      const outerContainer = container.querySelector("div");
      outerContainer?.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("merges custom props with component props", () => {
      const { container } = render(
        <Container
          className="custom-class"
          data-custom="value"
          aria-label="Label"
        >
          Content
        </Container>
      );

      const outerContainer = container.querySelector("div");
      expect(outerContainer?.className).toContain("custom-class");
      expect(outerContainer).toHaveAttribute("data-custom", "value");
      expect(outerContainer).toHaveAttribute("aria-label", "Label");
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
