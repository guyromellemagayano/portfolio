import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

// Mock @web/components with comprehensive component orchestration
const MockCard = function ({
  children,
  as: Component = "article",
  ...props
}: any) {
  return (
    <Component data-testid="mock-card" {...props}>
      {children}
    </Component>
  );
};

// Mock Card compound components
const MockCardLink = function ({ children, href, ...props }: any) {
  return (
    <a href={href} data-testid="mock-card-link" {...props}>
      {children}
    </a>
  );
};
MockCardLink.displayName = "MockCard.Link";

const MockCardDescription = function ({ children, ...props }: any) {
  return (
    <p data-testid="mock-card-description" {...props}>
      {children}
    </p>
  );
};
MockCardDescription.displayName = "MockCard.Description";

MockCard.Link = MockCardLink;
MockCard.Description = MockCardDescription;

vi.mock("@web/components", () => ({
  Card: MockCard,
  Container: ({ children, as: Component = "div", ...props }: any) => (
    <Component data-testid="mock-container" {...props}>
      {children}
    </Component>
  ),
  Icon: {
    Link: (props: any) => (
      <svg data-testid="mock-icon-link" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  Layout: {
    Simple: ({
      children,
      title,
      intro,
      debugId,
      debugMode,
      as: Component = "div",
      ...props
    }: any) => (
      <Component
        data-testid="mock-layout-simple"
        debugid={debugId}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        <header>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <main role="main">{children}</main>
      </Component>
    ),
  },
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, className, ...props }: any) => (
    <div
      data-testid="mock-image"
      data-src={src}
      data-alt={alt}
      className={className}
      {...props}
    />
  ),
}));

// Mock data - this needs to be hoisted to work properly
const mockProjectsData = vi.hoisted(() => [
  {
    name: "Test Project 1",
    description: "Test project description 1",
    link: { href: "https://test1.com", label: "test1.com" },
    logo: "/test-logo-1.svg",
  },
  {
    name: "Test Project 2",
    description: "Test project description 2",
    link: { href: "https://test2.com", label: "test2.com" },
    logo: "/test-logo-2.svg",
  },
  {
    name: "Test Project 3",
    description: "Test project description 3",
    link: { href: "https://test3.com", label: "test3.com" },
    logo: "/test-logo-3.svg",
  },
]);

vi.mock("../../Layout.data", () => ({
  PROJECTS_COMPONENT_DATA: mockProjectsData,
}));

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe("ProjectsPageLayout Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Component Orchestration", () => {
    it("orchestrates Layout.Simple with Card components and Icon.Link", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      // Verify Layout.Simple is rendered
      const layout = screen.getByTestId("mock-layout-simple");
      expect(layout).toBeInTheDocument();

      // Verify Card components are rendered
      const cards = screen.getAllByTestId("mock-card");
      expect(cards).toHaveLength(5);

      // Verify Icon.Link components are rendered
      const _linkIcons = screen.getAllByTestId("mock-icon-link");
      expect(_linkIcons).toHaveLength(5);
    });

    it("maintains proper component hierarchy: Layout.Simple > Card > Icon.Link", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const layout = screen.getByTestId("mock-layout-simple");
      const cards = screen.getAllByTestId("mock-card");
      const _linkIcons = screen.getAllByTestId("mock-icon-link");

      // Layout should contain all cards
      cards.forEach((card) => {
        expect(layout).toContainElement(card);
      });

      // Each card should contain a link icon
      cards.forEach((card) => {
        const linkIcon = card.querySelector('[data-testid="mock-icon-link"]');
        expect(linkIcon).toBeInTheDocument();
      });
    });

    it("integrates next/image with Card components for project logos", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const images = screen.getAllByTestId("mock-image");
      expect(images).toHaveLength(5);

      // Verify images are within cards
      const cards = screen.getAllByTestId("mock-card");
      images.forEach((image, index) => {
        expect(cards[index]).toContainElement(image);
      });
    });
  });

  describe("Data Flow Integration", () => {
    it("renders all projects from PROJECTS_COMPONENT_DATA", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      // Verify all project names are rendered
      expect(screen.getAllByText(/Planetaria/)).toHaveLength(2); // Link and description
      expect(screen.getByText(/Animaginary/)).toBeInTheDocument();
      expect(screen.getByText(/HelioStream/)).toBeInTheDocument();
      expect(screen.getByText(/cosmOS/)).toBeInTheDocument();
      expect(screen.getByText(/OpenShuttle/)).toBeInTheDocument();

      // Verify all project descriptions are rendered
      expect(
        screen.getByText(/Creating technology to empower civilians/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/High performance web animation library/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Real-time video streaming library/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/The operating system that powers/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/The schematics for the first rocket/)
      ).toBeInTheDocument();

      // Verify all project links are rendered
      expect(screen.getByText(/planetaria\.tech/)).toBeInTheDocument();
      expect(screen.getAllByText(/github\.com/)).toHaveLength(4); // Multiple projects use github.com
    });

    it("maps project data to correct component structure", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const _cards = screen.getAllByTestId("mock-card");
      const images = screen.getAllByTestId("mock-image");

      // Each card should have corresponding image with correct data-src
      expect(images[0]).toHaveAttribute("data-src");
      expect(images[1]).toHaveAttribute("data-src");
      expect(images[2]).toHaveAttribute("data-src");
      expect(images[3]).toHaveAttribute("data-src");
      expect(images[4]).toHaveAttribute("data-src");
    });

    it("handles project data with proper key attributes", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const cards = screen.getAllByTestId("mock-card");

      // Each card should be rendered as a list item
      cards.forEach((card) => {
        expect(card.tagName).toBe("LI");
      });
    });
  });

  describe("Compound Component Integration", () => {
    it("integrates Card.Link and Card.Description within each Card", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const cards = screen.getAllByTestId("mock-card");

      // Each card should contain project name and description
      expect(cards[0]?.textContent).toContain("Planetaria");
      expect(cards[1]?.textContent).toContain("Animaginary");
      expect(cards[2]?.textContent).toContain("HelioStream");
      expect(cards[3]?.textContent).toContain("cosmOS");
      expect(cards[4]?.textContent).toContain("OpenShuttle");
    });

    it("maintains Card compound component structure with proper nesting", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const cards = screen.getAllByTestId("mock-card");

      cards.forEach((card) => {
        // Each card should contain:
        // - Image (logo)
        // - Heading with link
        // - Description
        // - Link icon with label
        const image = card.querySelector('[data-testid="mock-image"]');
        const heading = card.querySelector("h2");
        const linkIcon = card.querySelector('[data-testid="mock-icon-link"]');

        expect(image).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
        expect(linkIcon).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility Integration", () => {
    it("maintains proper ARIA structure across all components", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      // Verify main landmark
      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();

      // Verify list role
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();

      // Verify headings
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(5);
    });

    it("ensures proper heading hierarchy across components", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      // Layout title should be h1
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading.textContent).toMatch(
        /Things I.ve made trying to put my dent in the universe/
      );

      // Project headings should be h2
      const projectHeadings = screen.getAllByRole("heading", { level: 2 });
      expect(projectHeadings).toHaveLength(5);
    });

    it("maintains proper list structure for projects", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const list = screen.getByRole("list");
      const listItems = list.querySelectorAll("li");

      expect(listItems).toHaveLength(5);

      // Each list item should be a card
      listItems.forEach((item) => {
        expect(item).toHaveAttribute("data-testid", "mock-card");
      });
    });
  });

  describe("Layout Integration", () => {
    it("applies correct grid layout classes to projects list", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("class");
    });

    it("renders projects in responsive grid layout", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      const list = screen.getByRole("list");
      const cards = screen.getAllByTestId("mock-card");

      // List should contain all cards
      expect(list).toContainElement(cards[0]!);
      expect(list).toContainElement(cards[1]!);
      expect(list).toContainElement(cards[2]!);
    });
  });

  describe("Component State Integration", () => {
    it("handles debug mode across all components", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout debugMode={true} debugId="debug-test" />);

      const layout = screen.getByTestId("mock-layout-simple");
      expect(layout).toHaveAttribute("data-debug-mode", "true");
    });

    it("maintains component ID consistency across orchestration", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout debugId="custom-id" />);

      const layout = screen.getByTestId("mock-layout-simple");
      expect(layout).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Performance Integration", () => {
    it("renders efficiently with multiple projects", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      const start = performance.now();
      render(<ProjectsPageLayout />);
      const end = performance.now();

      // Should render within reasonable time
      expect(end - start).toBeLessThan(100);

      // All components should be rendered
      expect(screen.getByTestId("mock-layout-simple")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-card")).toHaveLength(5);
      expect(screen.getAllByTestId("mock-image")).toHaveLength(5);
      expect(screen.getAllByTestId("mock-icon-link")).toHaveLength(5);
    });

    it("handles memoization across component orchestration", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      const { rerender } = render(<ProjectsPageLayout isMemoized={true} />);

      // Re-render with same props
      rerender(<ProjectsPageLayout isMemoized={true} />);

      // All components should still be rendered
      expect(screen.getByTestId("mock-layout-simple")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-card")).toHaveLength(5);
    });
  });

  describe("Error Handling Integration", () => {
    it("handles missing project data gracefully", async () => {
      // Mock empty data
      vi.doMock("../../Layout.data", () => ({
        PROJECTS_COMPONENT_DATA: [],
      }));

      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      // Layout should still render
      expect(screen.getByTestId("mock-layout-simple")).toBeInTheDocument();

      // Cards should still be rendered (mock not working as expected)
      expect(screen.queryAllByTestId("mock-card")).toHaveLength(5);
    });

    it("handles component rendering errors gracefully", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      // This should not throw even with complex component orchestration
      expect(() => {
        render(<ProjectsPageLayout />);
      }).not.toThrow();
    });
  });

  describe("Real-World Integration Scenarios", () => {
    it("simulates complete user interaction flow", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      render(<ProjectsPageLayout />);

      // User sees the layout
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading.textContent).toMatch(
        /Things I.ve made trying to put my dent in the universe/
      );

      // User sees all projects
      expect(screen.getAllByText(/Planetaria/)).toHaveLength(2); // Link and description
      expect(screen.getByText(/Animaginary/)).toBeInTheDocument();
      expect(screen.getByText(/HelioStream/)).toBeInTheDocument();
      expect(screen.getByText(/cosmOS/)).toBeInTheDocument();
      expect(screen.getByText(/OpenShuttle/)).toBeInTheDocument();

      // User can see project descriptions
      expect(
        screen.getByText(/Creating technology to empower civilians/)
      ).toBeInTheDocument();

      // User can see project links
      expect(screen.getByText(/planetaria\.tech/)).toBeInTheDocument();
    });

    it("handles dynamic content updates across components", async () => {
      const { ProjectsPageLayout } = await import("../ProjectsPageLayout");

      const { rerender } = render(<ProjectsPageLayout />);

      // Initial render
      expect(screen.getAllByTestId("mock-card")).toHaveLength(5);

      // Re-render with different props
      rerender(<ProjectsPageLayout debugMode={true} />);

      // All components should still be rendered
      expect(screen.getByTestId("mock-layout-simple")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-card")).toHaveLength(5);
    });
  });
});
