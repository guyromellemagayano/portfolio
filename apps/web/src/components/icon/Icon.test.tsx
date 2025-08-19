import React from "react";

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Icon } from "./Icon";

import "@testing-library/jest-dom";

// Mock the external dependencies
vi.mock("@guyromellemagayano/components", () => ({
  Svg: React.forwardRef<SVGSVGElement, any>(function MockSvg(props, ref) {
    return <svg ref={ref} data-testid="svg" {...props} />;
  }),
  SvgProps: {},
  SvgRef: {},
}));

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options) => ({
    id: options?.internalId || "test-id",
    isDebugMode: options?.debugMode || false,
  })),
}));

describe("Icon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Main Icon Component", () => {
    it("renders with default props", () => {
      render(<Icon data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon ref={ref} data-testid="icon" />);
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(<Icon className="custom-class" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveClass("custom-class");
    });

    it("passes through all SVG props", () => {
      render(
        <Icon width="24" height="24" fill="currentColor" data-testid="icon" />
      );
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });

    it("renders children content", () => {
      render(
        <Icon data-testid="icon">
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon");
      expect(icon).toContainHTML('<path d="M0 0h24v24H0z" />');
    });

    it("uses custom component via 'as' prop", () => {
      const CustomSvg = React.forwardRef<SVGSVGElement, any>(
        function CustomSvg(props, ref) {
          return <svg ref={ref} data-testid="custom-svg" {...props} />;
        }
      );
      render(<Icon as={CustomSvg} data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("applies data attributes for debugging", () => {
      render(<Icon _debugMode={true} data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("data-icon-id", "test-id");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles internal props correctly", () => {
      render(
        <Icon _internalId="custom-id" _debugMode={true} data-testid="icon" />
      );
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("data-icon-id", "custom-id");
    });
  });

  describe("X Icon Component", () => {
    it("renders X icon correctly", () => {
      render(<Icon.X data-testid="x-icon" />);
      const icon = screen.getByTestId("x-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.X ref={ref} data-testid="x-icon" />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.X data-testid="x-icon" />);
      const icon = screen.getByTestId("x-icon");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains X icon path", () => {
      render(<Icon.X data-testid="x-icon" />);
      const icon = screen.getByTestId("x-icon");
      expect(icon.innerHTML).toContain("M13.3174 10.7749L19.1457 4H17.7646");
    });

    it("applies custom styling", () => {
      render(<Icon.X className="text-blue-500" data-testid="x-icon" />);
      const icon = screen.getByTestId("x-icon");
      expect(icon).toHaveClass("text-blue-500");
    });
  });

  describe("Instagram Icon Component", () => {
    it("renders Instagram icon correctly", () => {
      render(<Icon.Instagram data-testid="instagram-icon" />);
      const icon = screen.getByTestId("instagram-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.Instagram ref={ref} data-testid="instagram-icon" />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.Instagram data-testid="instagram-icon" />);
      const icon = screen.getByTestId("instagram-icon");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains Instagram icon paths", () => {
      render(<Icon.Instagram data-testid="instagram-icon" />);
      const icon = screen.getByTestId("instagram-icon");
      expect(icon.innerHTML).toContain("M12 3c-2.444 0-2.75.01-3.71.054");
    });

    it("applies custom styling", () => {
      render(
        <Icon.Instagram
          className="text-pink-500"
          data-testid="instagram-icon"
        />
      );
      const icon = screen.getByTestId("instagram-icon");
      expect(icon).toHaveClass("text-pink-500");
    });
  });

  describe("LinkedIn Icon Component", () => {
    it("renders LinkedIn icon correctly", () => {
      render(<Icon.LinkedIn data-testid="linkedin-icon" />);
      const icon = screen.getByTestId("linkedin-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.LinkedIn ref={ref} data-testid="linkedin-icon" />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.LinkedIn data-testid="linkedin-icon" />);
      const icon = screen.getByTestId("linkedin-icon");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains LinkedIn icon path", () => {
      render(<Icon.LinkedIn data-testid="linkedin-icon" />);
      const icon = screen.getByTestId("linkedin-icon");
      expect(icon.innerHTML).toContain("M18.335 18.339H15.67v-4.177");
    });

    it("applies custom styling", () => {
      render(
        <Icon.LinkedIn className="text-blue-600" data-testid="linkedin-icon" />
      );
      const icon = screen.getByTestId("linkedin-icon");
      expect(icon).toHaveClass("text-blue-600");
    });
  });

  describe("GitHub Icon Component", () => {
    it("renders GitHub icon correctly", () => {
      render(<Icon.GitHub data-testid="github-icon" />);
      const icon = screen.getByTestId("github-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.GitHub ref={ref} data-testid="github-icon" />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.GitHub data-testid="github-icon" />);
      const icon = screen.getByTestId("github-icon");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains GitHub icon path", () => {
      render(<Icon.GitHub data-testid="github-icon" />);
      const icon = screen.getByTestId("github-icon");
      expect(icon.innerHTML).toContain("M12 2C6.475 2 2 6.588");
    });

    it("applies custom styling", () => {
      render(
        <Icon.GitHub className="text-gray-900" data-testid="github-icon" />
      );
      const icon = screen.getByTestId("github-icon");
      expect(icon).toHaveClass("text-gray-900");
    });
  });

  describe("Accessibility", () => {
    it("renders all icons as SVG elements", () => {
      const { rerender } = render(<Icon.X data-testid="icon" />);
      expect(screen.getByTestId("icon").tagName).toBe("svg");

      rerender(<Icon.Instagram data-testid="icon" />);
      expect(screen.getByTestId("icon").tagName).toBe("svg");

      rerender(<Icon.LinkedIn data-testid="icon" />);
      expect(screen.getByTestId("icon").tagName).toBe("svg");

      rerender(<Icon.GitHub data-testid="icon" />);
      expect(screen.getByTestId("icon").tagName).toBe("svg");
    });
  });

  describe("Compound Component Pattern", () => {
    it("exposes all icon variants as properties", () => {
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
    });

    it("all icon variants are components", () => {
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
    });
  });

  describe("Integration Tests", () => {
    it("works with links for social media", () => {
      render(
        <a href="https://twitter.com/username" aria-label="Follow on X">
          <Icon.X data-testid="x-icon" />
        </a>
      );
      const link = screen.getByRole("link");
      const icon = screen.getByTestId("x-icon");

      expect(link).toHaveAttribute("href", "https://twitter.com/username");
      expect(link).toHaveAttribute("aria-label", "Follow on X");
      expect(link).toContainElement(icon);
    });

    it("works with multiple icons in a container", () => {
      render(
        <div data-testid="container">
          <Icon.X data-testid="x-icon" />
          <Icon.Instagram data-testid="instagram-icon" />
          <Icon.LinkedIn data-testid="linkedin-icon" />
          <Icon.GitHub data-testid="github-icon" />
        </div>
      );

      expect(screen.getByTestId("container")).toBeInTheDocument();
      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
      expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
      expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
      expect(screen.getByTestId("github-icon")).toBeInTheDocument();
    });

    it("supports hover states with Tailwind CSS", () => {
      render(
        <Icon.X
          className="text-gray-600 transition-colors hover:text-blue-500"
          data-testid="x-icon"
        />
      );
      const icon = screen.getByTestId("x-icon");
      expect(icon).toHaveClass(
        "text-gray-600",
        "hover:text-blue-500",
        "transition-colors"
      );
    });
  });

  describe("Error Handling", () => {
    it("handles missing props gracefully", () => {
      render(<Icon />);
      const icon = screen.getByTestId("svg");
      expect(icon).toBeInTheDocument();
    });

    it("handles null children", () => {
      render(<Icon>{null}</Icon>);
      const icon = screen.getByTestId("svg");
      expect(icon).toBeInTheDocument();
    });

    it("handles undefined children", () => {
      render(<Icon>{undefined}</Icon>);
      const icon = screen.getByTestId("svg");
      expect(icon).toBeInTheDocument();
    });
  });
});
