// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AboutPageLayout } from "../AboutPageLayout";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("@web/components", () => ({
  Container: vi.fn(({ children, className, debugId, debugMode, ...props }) => (
    <div
      data-testid="container"
      className={className}
      data-container-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  )),
  Link: {
    Social: vi.fn(({ children, label, href, debugId, debugMode, ...props }) => (
      <a
        data-testid="social-link"
        href={href}
        aria-label={label}
        data-social-link-id={debugId}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {children || label}
      </a>
    )),
  },
  SocialList: vi.fn(({ children, className, debugId, debugMode, ...props }) => (
    <ul
      data-testid="social-list"
      className={className}
      role="list"
      data-social-list-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      {children}
    </ul>
  )),
  SocialListItem: vi.fn(({ children, className, ...props }) => (
    <li
      data-testid="social-list-item"
      className={className}
      role="listitem"
      {...props}
    >
      {children}
    </li>
  )),
  Icon: {
    X: "XIcon",
    Instagram: "InstagramIcon",
    GitHub: "GitHubIcon",
    LinkedIn: "LinkedInIcon",
    Mail: "MailIcon",
  },
}));

vi.mock("@web/images/portrait.jpg", () => ({
  default: "/mock-portrait.jpg",
}));

vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, sizes, className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-testid="portrait-image"
      src={src}
      alt={alt}
      sizes={sizes}
      className={className}
      {...props}
    />
  )),
}));

vi.mock("../Layout.data", () => ({
  SOCIAL_LIST_COMPONENT_LABELS: [
    {
      slug: "x",
      label: "Follow on X",
      icon: "XIcon",
      href: "https://x.com/guyromellemagayano",
    },
    {
      slug: "instagram",
      label: "Follow on Instagram",
      icon: "InstagramIcon",
      href: "https://www.instagram.com/guyromellemagayano",
    },
    {
      slug: "github",
      label: "Follow on GitHub",
      icon: "GitHubIcon",
      href: "https://github.com/guyromellemagayano",
    },
    {
      slug: "linkedin",
      label: "Follow on LinkedIn",
      icon: "LinkedInIcon",
      href: "https://www.linkedin.com/in/guyromellemagayano",
    },
    {
      slug: "email",
      label: "aspiredtechie2010@gmail.com",
      icon: "MailIcon",
      href: "mailto:aspiredtechie2010@gmail.com",
    },
  ],
}));

describe("AboutPageLayout", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<AboutPageLayout />);

      const container = screen.getByTestId("container");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("class");
    });

    it("applies custom className", () => {
      render(<AboutPageLayout className="custom-class" />);

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<AboutPageLayout debugMode={true} />);

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(<AboutPageLayout debugId="custom-id" />);

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-container-id", "custom-id");
    });

    it("passes through additional props", () => {
      render(
        <AboutPageLayout
          data-test="custom-data"
          aria-label="About page layout"
        />
      );

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-test", "custom-data");
      expect(container).toHaveAttribute("aria-label", "About page layout");
    });
  });

  describe("Component Structure", () => {
    it("renders layout with correct structure", () => {
      render(<AboutPageLayout />);

      const container = screen.getByTestId("container");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("class");
    });

    it("renders portrait image with correct attributes", () => {
      render(<AboutPageLayout />);

      const image = screen.getByTestId("portrait-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/mock-portrait.jpg");
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute(
        "sizes",
        "(min-width: 1024px) 32rem, 20rem"
      );
      expect(image).toHaveAttribute("class");
    });

    it("renders heading with correct content", () => {
      render(<AboutPageLayout />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toContain(
        "Spencer Sharp. I live in New York City, where I design the future."
      );
    });

    it("renders all paragraphs with correct content", () => {
      render(<AboutPageLayout />);

      const paragraphs = screen.getAllByTestId(
        "test-id-about-page-layout-content-text-paragraph"
      );
      expect(paragraphs).toHaveLength(4);

      // Test that paragraphs contain expected content
      expect(paragraphs[0]?.textContent).toContain(
        "loved making things for as long as I can remember"
      );
      expect(paragraphs[1]).toHaveTextContent(
        "The only thing I loved more than computers as a kid was space"
      );
      expect(paragraphs[2]).toHaveTextContent(
        "I spent the next few summers indoors working on a rocket design"
      );
      expect(paragraphs[3]?.textContent).toContain("founder of Planetaria");
    });

    it("renders social links section", () => {
      render(<AboutPageLayout />);

      const socialList = screen.getByTestId("social-list");
      expect(socialList).toBeInTheDocument();
      expect(socialList).toHaveAttribute("role", "list");
    });

    it("renders all social list items", () => {
      render(<AboutPageLayout />);

      const socialListItems = screen.getAllByTestId("social-list-item");
      expect(socialListItems).toHaveLength(5);
    });

    it("renders all social links with correct attributes", () => {
      render(<AboutPageLayout />);

      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(5);

      expect(socialLinks[0]).toHaveAttribute(
        "href",
        "https://x.com/guyromellemagayano"
      );
      expect(socialLinks[0]).toHaveAttribute("aria-label", "Follow on X");

      expect(socialLinks[1]).toHaveAttribute(
        "href",
        "https://www.instagram.com/guyromellemagayano"
      );
      expect(socialLinks[1]).toHaveAttribute(
        "aria-label",
        "Follow on Instagram"
      );

      expect(socialLinks[2]).toHaveAttribute(
        "href",
        "https://github.com/guyromellemagayano"
      );
      expect(socialLinks[2]).toHaveAttribute("aria-label", "Follow on GitHub");

      expect(socialLinks[3]).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/guyromellemagayano"
      );
      expect(socialLinks[3]).toHaveAttribute(
        "aria-label",
        "Follow on LinkedIn"
      );

      expect(socialLinks[4]).toHaveAttribute(
        "href",
        "mailto:aspiredtechie2010@gmail.com"
      );
      expect(socialLinks[4]).toHaveAttribute(
        "aria-label",
        "aspiredtechie2010@gmail.com"
      );
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<AboutPageLayout />);

      expect(screen.getByTestId("container")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByTestId("portrait-image")).toBeInTheDocument();
    });

    it("renders with custom Container component", () => {
      const CustomContainer = function ({
        children,
        ...props
      }: {
        children: React.ReactNode;
        [key: string]: any;
      }) {
        return (
          <section data-testid="custom-container" {...props}>
            {children}
          </section>
        );
      };

      render(<AboutPageLayout as={CustomContainer} />);

      expect(screen.getByTestId("custom-container")).toBeInTheDocument();
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<AboutPageLayout debugMode={true} />);

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(<AboutPageLayout debugMode={false} />);

      const container = screen.getByTestId("container");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(<AboutPageLayout />);

      const container = screen.getByTestId("container");
      expect(container).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<AboutPageLayout isMemoized={true} />);

      expect(screen.getByTestId("container")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<AboutPageLayout isMemoized={false} />);

      expect(screen.getByTestId("container")).toBeInTheDocument();

      rerender(
        <AboutPageLayout isMemoized={false} className="updated-class" />
      );
      expect(screen.getByTestId("container")).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(<AboutPageLayout />);

      expect(screen.getByTestId("container")).toBeInTheDocument();

      rerender(<AboutPageLayout className="updated-class" />);
      expect(screen.getByTestId("container")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles missing social list data gracefully", () => {
      vi.doMock("../Layout.data", () => ({
        SOCIAL_LIST_COMPONENT_LABELS: null,
      }));

      render(<AboutPageLayout />);

      expect(screen.getByTestId("container")).toBeInTheDocument();
      // Social list is always rendered with default data
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
    });

    it("handles empty social list data gracefully", () => {
      vi.doMock("../Layout.data", () => ({
        SOCIAL_LIST_COMPONENT_LABELS: [],
      }));

      render(<AboutPageLayout />);

      expect(screen.getByTestId("container")).toBeInTheDocument();
      // Social list is always rendered with default data
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
    });

    it("handles complex nested content", () => {
      render(<AboutPageLayout />);

      // Test that all content sections are present
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByTestId("portrait-image")).toBeInTheDocument();
      const paragraphs = screen.getAllByTestId(
        "test-id-about-page-layout-content-text-paragraph"
      );
      expect(paragraphs[0]?.textContent).toContain(
        "loved making things for as long as I can remember"
      );
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes to all elements", () => {
      render(<AboutPageLayout debugId="test-id" />);

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-container-id", "test-id");
    });

    it("handles debugId prop correctly", () => {
      render(<AboutPageLayout debugId="custom-debug-id" />);

      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-container-id", "custom-debug-id");
    });

    it("renders social links with correct styling classes", () => {
      render(<AboutPageLayout />);

      const socialListItems = screen.getAllByTestId("social-list-item");

      // Check that Instagram, GitHub, LinkedIn have mt-4 class
      expect(socialListItems[1]).toHaveAttribute("class");
      expect(socialListItems[2]).toHaveAttribute("class");
      expect(socialListItems[3]).toHaveAttribute("class");

      // Check that email has special styling
      expect(socialListItems[4]).toHaveAttribute("class");
    });

    it("renders email link with special page prop", () => {
      render(<AboutPageLayout />);

      const socialLinks = screen.getAllByTestId("social-link");
      const emailLink = socialLinks[4];

      expect(emailLink).toHaveAttribute(
        "href",
        "mailto:aspiredtechie2010@gmail.com"
      );
    });
  });

  describe("Accessibility Tests", () => {
    it("maintains proper semantic structure", () => {
      render(<AboutPageLayout />);

      const heading = screen.getByRole("heading", { level: 1 });
      const socialList = screen.getByRole("list");
      const socialListItems = screen.getAllByRole("listitem");

      expect(heading).toBeInTheDocument();
      expect(socialList).toBeInTheDocument();
      expect(socialListItems).toHaveLength(5);
    });

    it("provides proper ARIA labels for social links", () => {
      render(<AboutPageLayout />);

      const socialLinks = screen.getAllByTestId("social-link");

      expect(socialLinks[0]).toHaveAttribute("aria-label", "Follow on X");
      expect(socialLinks[1]).toHaveAttribute(
        "aria-label",
        "Follow on Instagram"
      );
      expect(socialLinks[2]).toHaveAttribute("aria-label", "Follow on GitHub");
      expect(socialLinks[3]).toHaveAttribute(
        "aria-label",
        "Follow on LinkedIn"
      );
      expect(socialLinks[4]).toHaveAttribute(
        "aria-label",
        "aspiredtechie2010@gmail.com"
      );
    });

    it("provides proper image alt text", () => {
      render(<AboutPageLayout />);

      const image = screen.getByTestId("portrait-image");
      expect(image).toHaveAttribute("alt", "");
    });
  });

  describe("Integration Tests", () => {
    it("renders complete about page layout with all components", () => {
      render(<AboutPageLayout debugId="about-page" debugMode={true} />);

      // Test main container
      const container = screen.getByTestId("container");
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("data-container-id", "about-page");
      expect(container).toHaveAttribute("data-debug-mode", "true");

      // Test portrait image
      const image = screen.getByTestId("portrait-image");
      expect(image).toBeInTheDocument();

      // Test heading
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();

      // Test paragraphs
      const paragraphs = screen.getAllByTestId(
        "about-page-about-page-layout-content-text-paragraph"
      );
      expect(paragraphs[0]?.textContent).toContain(
        "loved making things for as long as I can remember"
      );
      expect(paragraphs[1]).toHaveTextContent(
        "The only thing I loved more than computers as a kid was space"
      );
      expect(paragraphs[2]).toHaveTextContent(
        "I spent the next few summers indoors working on a rocket design"
      );
      expect(paragraphs[3]?.textContent).toContain("founder of Planetaria");

      // Test social links
      const socialList = screen.getByTestId("social-list");
      expect(socialList).toBeInTheDocument();

      const socialListItems = screen.getAllByTestId("social-list-item");
      expect(socialListItems).toHaveLength(5);

      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(5);
    });

    it("handles component updates efficiently", () => {
      const { rerender } = render(<AboutPageLayout debugId="initial" />);

      let container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-container-id", "initial");

      rerender(<AboutPageLayout debugId="updated" />);
      container = screen.getByTestId("container");
      expect(container).toHaveAttribute("data-container-id", "updated");
    });
  });
});
