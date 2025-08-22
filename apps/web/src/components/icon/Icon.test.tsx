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
  setDisplayName: vi.fn((component, displayName) => {
    component.displayName = displayName;
    return component;
  }),
}));

describe("Icon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Main Icon Component", () => {
    it("throws error when used without children", () => {
      expect(() => render(<Icon data-testid="icon" />)).toThrow(
        "Icon component requires SVG content"
      );
    });

    it("renders with children content", () => {
      render(
        <Icon>
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(
        <Icon ref={ref}>
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      expect(ref.current).toBeInTheDocument();
      expect(ref.current?.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      render(
        <Icon className="custom-class">
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveClass("custom-class");
    });

    it("passes through all SVG props", () => {
      render(
        <Icon width="24" height="24" fill="currentColor">
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("width", "24");
      expect(icon).toHaveAttribute("height", "24");
      expect(icon).toHaveAttribute("fill", "currentColor");
    });

    it("renders children content", () => {
      render(
        <Icon>
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toContainHTML('<path d="M0 0h24v24H0z" />');
    });

    it("uses custom component via 'as' prop", () => {
      const CustomSvg = React.forwardRef<SVGSVGElement, any>(
        function CustomSvg(props, ref) {
          return <svg ref={ref} data-testid="custom-svg" {...props} />;
        }
      );
      render(
        <Icon as={CustomSvg}>
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toBeInTheDocument();
    });

    it("applies data attributes for debugging", () => {
      render(
        <Icon _debugMode={true}>
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-icon-id", "test-id");
      expect(icon).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles internal props correctly", () => {
      render(
        <Icon _internalId="custom-id" _debugMode={true}>
          <path d="M0 0h24v24H0z" />
        </Icon>
      );
      const icon = screen.getByTestId("icon-root");
      expect(icon).toHaveAttribute("data-icon-id", "custom-id");
    });
  });

  describe("X Icon Component", () => {
    it("renders X icon correctly", () => {
      render(<Icon.X />);
      const icon = screen.getByTestId("icon-x-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.X ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.X />);
      const icon = screen.getByTestId("icon-x-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains X icon path", () => {
      render(<Icon.X />);
      const icon = screen.getByTestId("icon-x-root");
      expect(icon.innerHTML).toContain("M13.3174 10.7749L19.1457 4H17.7646");
    });

    it("applies custom styling", () => {
      render(<Icon.X className="text-blue-500" />);
      const icon = screen.getByTestId("icon-x-root");
      expect(icon).toHaveClass("text-blue-500");
    });
  });

  describe("Instagram Icon Component", () => {
    it("renders Instagram icon correctly", () => {
      render(<Icon.Instagram />);
      const icon = screen.getByTestId("icon-instagram-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.Instagram ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.Instagram />);
      const icon = screen.getByTestId("icon-instagram-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains Instagram icon paths", () => {
      render(<Icon.Instagram />);
      const icon = screen.getByTestId("icon-instagram-root");
      expect(icon.innerHTML).toContain("M12 3c-2.444 0-2.75.01-3.71.054");
    });

    it("applies custom styling", () => {
      render(<Icon.Instagram className="text-pink-500" />);
      const icon = screen.getByTestId("icon-instagram-root");
      expect(icon).toHaveClass("text-pink-500");
    });
  });

  describe("LinkedIn Icon Component", () => {
    it("renders LinkedIn icon correctly", () => {
      render(<Icon.LinkedIn />);
      const icon = screen.getByTestId("icon-linkedin-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.LinkedIn ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.LinkedIn />);
      const icon = screen.getByTestId("icon-linkedin-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains LinkedIn icon path", () => {
      render(<Icon.LinkedIn />);
      const icon = screen.getByTestId("icon-linkedin-root");
      expect(icon.innerHTML).toContain("M18.335 18.339H15.67v-4.177");
    });

    it("applies custom styling", () => {
      render(<Icon.LinkedIn className="text-blue-600" />);
      const icon = screen.getByTestId("icon-linkedin-root");
      expect(icon).toHaveClass("text-blue-600");
    });
  });

  describe("GitHub Icon Component", () => {
    it("renders GitHub icon correctly", () => {
      render(<Icon.GitHub />);
      const icon = screen.getByTestId("icon-github-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.GitHub ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.GitHub />);
      const icon = screen.getByTestId("icon-github-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains GitHub icon path", () => {
      render(<Icon.GitHub />);
      const icon = screen.getByTestId("icon-github-root");
      expect(icon.innerHTML).toContain("M12 2C6.475 2 2 6.588");
    });

    it("applies custom styling", () => {
      render(<Icon.GitHub className="text-gray-900" />);
      const icon = screen.getByTestId("icon-github-root");
      expect(icon).toHaveClass("text-gray-900");
    });
  });

  describe("Close Icon Component", () => {
    it("renders Close icon correctly", () => {
      render(<Icon.Close />);
      const icon = screen.getByTestId("icon-close-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.Close ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.Close />);
      const icon = screen.getByTestId("icon-close-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains Close icon path", () => {
      render(<Icon.Close />);
      const icon = screen.getByTestId("icon-close-root");
      expect(icon.innerHTML).toContain(
        "m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
      );
    });

    it("applies custom styling", () => {
      render(<Icon.Close className="text-red-500" />);
      const icon = screen.getByTestId("icon-close-root");
      expect(icon).toHaveClass("text-red-500");
    });
  });

  describe("Sun Icon Component", () => {
    it("renders Sun icon correctly", () => {
      render(<Icon.Sun />);
      const icon = screen.getByTestId("icon-sun-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.Sun ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.Sun />);
      const icon = screen.getByTestId("icon-sun-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains Sun icon paths", () => {
      render(<Icon.Sun />);
      const icon = screen.getByTestId("icon-sun-root");
      expect(icon.innerHTML).toContain("M8 12.25A4.25 4.25 0 0 1 12.25 8");
    });

    it("applies custom styling", () => {
      render(<Icon.Sun className="text-yellow-500" />);
      const icon = screen.getByTestId("icon-sun-root");
      expect(icon).toHaveClass("text-yellow-500");
    });
  });

  describe("Moon Icon Component", () => {
    it("renders Moon icon correctly", () => {
      render(<Icon.Moon />);
      const icon = screen.getByTestId("icon-moon-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.Moon ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.Moon />);
      const icon = screen.getByTestId("icon-moon-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains Moon icon path", () => {
      render(<Icon.Moon />);
      const icon = screen.getByTestId("icon-moon-root");
      expect(icon.innerHTML).toContain(
        "M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47"
      );
    });

    it("applies custom styling", () => {
      render(<Icon.Moon className="text-blue-900" />);
      const icon = screen.getByTestId("icon-moon-root");
      expect(icon).toHaveClass("text-blue-900");
    });
  });

  describe("ChevronDown Icon Component", () => {
    it("renders ChevronDown icon correctly", () => {
      render(<Icon.ChevronDown />);
      const icon = screen.getByTestId("icon-chevron-down-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.ChevronDown ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.ChevronDown />);
      const icon = screen.getByTestId("icon-chevron-down-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains ChevronDown icon path", () => {
      render(<Icon.ChevronDown />);
      const icon = screen.getByTestId("icon-chevron-down-root");
      expect(icon.innerHTML).toContain("M1.75 1.75 4 4.25l2.25-2.5");
    });

    it("applies custom styling", () => {
      render(<Icon.ChevronDown className="text-gray-600" />);
      const icon = screen.getByTestId("icon-chevron-down-root");
      expect(icon).toHaveClass("text-gray-600");
    });
  });

  describe("ChevronRight Icon Component", () => {
    it("renders ChevronRight icon correctly", () => {
      render(<Icon.ChevronRight />);
      const icon = screen.getByTestId("icon-chevron-right-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.ChevronRight ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.ChevronRight />);
      const icon = screen.getByTestId("icon-chevron-right-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains ChevronRight icon path", () => {
      render(<Icon.ChevronRight />);
      const icon = screen.getByTestId("icon-chevron-right-root");
      expect(icon.innerHTML).toContain("M6.75 5.75 9.25 8l-2.5 2.25");
    });

    it("applies custom styling", () => {
      render(<Icon.ChevronRight className="text-gray-600" />);
      const icon = screen.getByTestId("icon-chevron-right-root");
      expect(icon).toHaveClass("text-gray-600");
    });
  });

  describe("ArrowLeft Icon Component", () => {
    it("renders ArrowLeft icon correctly", () => {
      render(<Icon.ArrowLeft />);
      const icon = screen.getByTestId("icon-arrow-left-root");
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe("svg");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon.ArrowLeft ref={ref} />);
      expect(ref.current).toBeInTheDocument();
    });

    it("renders with proper SVG structure", () => {
      render(<Icon.ArrowLeft />);
      const icon = screen.getByTestId("icon-arrow-left-root");
      expect(icon.tagName).toBe("svg");
      expect(icon).toBeInTheDocument();
    });

    it("contains ArrowLeft icon path", () => {
      render(<Icon.ArrowLeft />);
      const icon = screen.getByTestId("icon-arrow-left-root");
      expect(icon.innerHTML).toContain(
        "M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
      );
    });

    it("applies custom styling", () => {
      render(<Icon.ArrowLeft className="text-gray-600" />);
      const icon = screen.getByTestId("icon-arrow-left-root");
      expect(icon).toHaveClass("text-gray-600");
    });
  });

  describe("Accessibility", () => {
    it("renders all icons as SVG elements", () => {
      const { rerender } = render(<Icon.X />);
      expect(screen.getByTestId("icon-x-root").tagName).toBe("svg");

      rerender(<Icon.Instagram />);
      expect(screen.getByTestId("icon-instagram-root").tagName).toBe("svg");

      rerender(<Icon.LinkedIn />);
      expect(screen.getByTestId("icon-linkedin-root").tagName).toBe("svg");

      rerender(<Icon.GitHub />);
      expect(screen.getByTestId("icon-github-root").tagName).toBe("svg");

      rerender(<Icon.Close />);
      expect(screen.getByTestId("icon-close-root").tagName).toBe("svg");

      rerender(<Icon.Sun />);
      expect(screen.getByTestId("icon-sun-root").tagName).toBe("svg");

      rerender(<Icon.Moon />);
      expect(screen.getByTestId("icon-moon-root").tagName).toBe("svg");

      rerender(<Icon.ChevronDown />);
      expect(screen.getByTestId("icon-chevron-down-root").tagName).toBe("svg");

      rerender(<Icon.ChevronRight />);
      expect(screen.getByTestId("icon-chevron-right-root").tagName).toBe("svg");

      rerender(<Icon.ArrowLeft />);
      expect(screen.getByTestId("icon-arrow-left-root").tagName).toBe("svg");
    });
  });

  describe("Compound Component Pattern", () => {
    it("exposes all icon variants as properties", () => {
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
      expect(Icon.Close).toBeDefined();
      expect(Icon.Sun).toBeDefined();
      expect(Icon.Moon).toBeDefined();
      expect(Icon.ChevronDown).toBeDefined();
      expect(Icon.ChevronRight).toBeDefined();
      expect(Icon.ArrowLeft).toBeDefined();
    });

    it("all icon variants are components", () => {
      expect(Icon.X).toBeDefined();
      expect(Icon.Instagram).toBeDefined();
      expect(Icon.LinkedIn).toBeDefined();
      expect(Icon.GitHub).toBeDefined();
      expect(Icon.Close).toBeDefined();
      expect(Icon.Sun).toBeDefined();
      expect(Icon.Moon).toBeDefined();
      expect(Icon.ChevronDown).toBeDefined();
      expect(Icon.ChevronRight).toBeDefined();
      expect(Icon.ArrowLeft).toBeDefined();
    });
  });

  describe("Integration Tests", () => {
    it("works with links for social media", () => {
      render(
        <a href="https://twitter.com/username" aria-label="Follow on X">
          <Icon.X />
        </a>
      );
      const link = screen.getByRole("link");
      const icon = screen.getByTestId("icon-x-root");

      expect(link).toHaveAttribute("href", "https://twitter.com/username");
      expect(link).toHaveAttribute("aria-label", "Follow on X");
      expect(link).toContainElement(icon);
    });

    it("works with multiple icons in a container", () => {
      render(
        <div data-testid="container">
          <Icon.X />
          <Icon.Instagram />
          <Icon.LinkedIn />
          <Icon.GitHub />
          <Icon.Close />
          <Icon.Sun />
          <Icon.Moon />
          <Icon.ChevronDown />
          <Icon.ChevronRight />
          <Icon.ArrowLeft />
        </div>
      );

      expect(screen.getByTestId("container")).toBeInTheDocument();
      expect(screen.getByTestId("icon-x-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-instagram-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-linkedin-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-github-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-close-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-sun-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-moon-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-chevron-down-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-chevron-right-root")).toBeInTheDocument();
      expect(screen.getByTestId("icon-arrow-left-root")).toBeInTheDocument();
    });

    it("supports hover states with Tailwind CSS", () => {
      render(
        <Icon.X className="text-gray-600 transition-colors hover:text-blue-500" />
      );
      const icon = screen.getByTestId("icon-x-root");
      expect(icon).toHaveClass(
        "text-gray-600",
        "hover:text-blue-500",
        "transition-colors"
      );
    });
  });

  describe("Error Handling", () => {
    it("throws error when used without children", () => {
      expect(() => {
        render(<Icon />);
      }).toThrow("Icon component requires SVG content");
    });

    it("throws error when used with null children", () => {
      expect(() => {
        render(<Icon>{null}</Icon>);
      }).toThrow("Icon component requires SVG content");
    });

    it("throws error when used with undefined children", () => {
      expect(() => {
        render(<Icon>{undefined}</Icon>);
      }).toThrow("Icon component requires SVG content");
    });
  });
});
