// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Orchestrator
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utils functions
vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

// Mock @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

// Mock @web/components with compound components
vi.mock("@web/components", () => {
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

  return {
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
          <h1>{title}</h1>
          <p>{intro}</p>
          {children}
        </Component>
      ),
    },
  };
});

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, className, unoptimized, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-image"
      {...(unoptimized && { unoptimized: "true" })}
      {...props}
    />
  ),
}));

// Mock data
vi.mock("../../../Layout.data", () => ({
  PROJECTS_COMPONENT_DATA: [
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
  ],
}));

// ============================================================================
// TESTS
// ============================================================================

import { ProjectsPageLayout } from "../ProjectsPageLayout";

describe("ProjectsPageLayout", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("can be imported and rendered", () => {
    render(<ProjectsPageLayout />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).toBeInTheDocument();
  });

  it("renders with custom component ID", () => {
    render(<ProjectsPageLayout debugId="custom-id" />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).toBeInTheDocument();
  });

  it("renders with debug mode enabled", () => {
    render(<ProjectsPageLayout debugMode={true} />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).toBeInTheDocument();
  });

  it("renders the correct title and intro", () => {
    render(<ProjectsPageLayout />);

    expect(
      screen.getByText(/Things I.ve made trying to put my dent in the universe/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I.ve worked on tons of little projects/)
    ).toBeInTheDocument();
  });

  it("renders projects list with correct structure", () => {
    render(<ProjectsPageLayout />);

    const projectsList = screen.getByRole("list");
    expect(projectsList).toBeInTheDocument();
    expect(projectsList).toHaveAttribute("class");
  });

  it("renders all projects from data", () => {
    render(<ProjectsPageLayout />);

    const projectCards = screen.getAllByTestId("mock-card");
    expect(projectCards).toHaveLength(2);
  });

  it("renders project names", () => {
    render(<ProjectsPageLayout />);

    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    render(<ProjectsPageLayout />);

    expect(screen.getByText("Test project description 1")).toBeInTheDocument();
    expect(screen.getByText("Test project description 2")).toBeInTheDocument();
  });

  it("renders project links", () => {
    render(<ProjectsPageLayout />);

    expect(screen.getByText("test1.com")).toBeInTheDocument();
    expect(screen.getByText("test2.com")).toBeInTheDocument();
  });

  it("renders project logos", () => {
    render(<ProjectsPageLayout />);

    const images = screen.getAllByTestId("mock-image");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "/test-logo-1.svg");
    expect(images[1]).toHaveAttribute("src", "/test-logo-2.svg");
  });

  it("renders project logos with correct attributes", () => {
    render(<ProjectsPageLayout />);

    const images = screen.getAllByTestId("mock-image");
    images.forEach((image) => {
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("class");
      expect(image).toHaveAttribute("unoptimized");
    });
  });

  it("renders project headings with links", () => {
    render(<ProjectsPageLayout />);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("Test Project 1");
    expect(headings[1]).toHaveTextContent("Test Project 2");
  });

  it("renders project link icons", () => {
    render(<ProjectsPageLayout />);

    const linkIcons = screen.getAllByTestId("mock-icon-link");
    expect(linkIcons).toHaveLength(2);
  });

  it("renders project link labels", () => {
    render(<ProjectsPageLayout />);

    expect(screen.getByText("test1.com")).toBeInTheDocument();
    expect(screen.getByText("test2.com")).toBeInTheDocument();
  });

  it("renders as correct element type", async () => {
    render(<ProjectsPageLayout />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout.tagName).toBe("DIV");
  });

  it("applies correct CSS classes to projects list", async () => {
    render(<ProjectsPageLayout />);

    const projectsList = screen.getByRole("list");
    expect(projectsList).toHaveAttribute("class");
  });

  it("renders project cards as list items", async () => {
    render(<ProjectsPageLayout />);

    const projectCards = screen.getAllByTestId("mock-card");
    projectCards.forEach((card) => {
      expect(card.tagName).toBe("LI");
    });
  });

  it("applies debug attributes when enabled", async () => {
    render(<ProjectsPageLayout debugMode={true} debugId="debug-test" />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).toHaveAttribute("data-debug-mode", "true");
  });

  it("does not apply debug attributes when disabled", async () => {
    render(<ProjectsPageLayout debugMode={false} />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).not.toHaveAttribute("data-debug-mode");
  });

  it("renders with memoization when isMemoized is true", async () => {
    render(<ProjectsPageLayout isMemoized={true} />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).toBeInTheDocument();
  });

  it("renders without memoization when isMemoized is false", async () => {
    render(<ProjectsPageLayout isMemoized={false} />);

    const layout = screen.getByTestId("mock-layout-simple");
    expect(layout).toBeInTheDocument();
  });

  it("renders projects list with proper role", async () => {
    render(<ProjectsPageLayout />);

    const projectsList = screen.getByRole("list");
    expect(projectsList).toBeInTheDocument();
  });

  it("renders project headings with correct hierarchy", async () => {
    render(<ProjectsPageLayout />);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(2);
  });

  it("renders project images with empty alt text", async () => {
    render(<ProjectsPageLayout />);

    const images = screen.getAllByTestId("mock-image");
    images.forEach((image) => {
      expect(image).toHaveAttribute("alt", "");
    });
  });
});
