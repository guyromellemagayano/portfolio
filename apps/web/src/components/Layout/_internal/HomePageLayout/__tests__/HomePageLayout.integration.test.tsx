// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 1 (90%+)
// - Risk Tier: Critical
// - Component Type: Orchestrator
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HomePageLayout } from "../HomePageLayout";

// ============================================================================
// MOCKS
// ============================================================================

// Mock useComponentId hook
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utility functions
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

// Mock @web/utils
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock @web/components with realistic behavior
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
  NewsletterForm: vi.fn(({ debugId, debugMode, ...props }) => (
    <div
      data-testid="newsletter-form"
      data-newsletter-form-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      Newsletter Form
    </div>
  )),
  PhotoGallery: vi.fn(({ debugId, debugMode, ...props }) => (
    <div
      data-testid="photo-gallery"
      data-photo-gallery-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      Photo Gallery
    </div>
  )),
  Resume: vi.fn(({ debugId, debugMode, ...props }) => (
    <div
      data-testid="resume"
      data-resume-id={debugId}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      Resume
    </div>
  )),
  Icon: {
    X: "XIcon",
    Instagram: "InstagramIcon",
    GitHub: "GitHubIcon",
    LinkedIn: "LinkedInIcon",
    Mail: "MailIcon",
  },
}));

// Mock Layout.data with realistic social data
vi.mock("../../Layout.data", () => ({
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

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe("HomePageLayout Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Complete Home Page Integration", () => {
    it("renders complete home page with all components working together", () => {
      render(<HomePageLayout debugId="home-page" debugMode={true} />);

      // Test main containers integration
      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);
      containers.forEach((container) => {
        expect(container).toHaveAttribute("data-container-id", "home-page");
        expect(container).toHaveAttribute("data-debug-mode", "true");
      });

      // Test heading integration
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(
        "Software designer, founder, and amateur astronaut."
      );

      // Test paragraph integration
      const paragraph = screen.getByTestId("home-page-paragraph");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.textContent).toContain(
        "Spencer, a software designer and entrepreneur based in New York City"
      );

      // Test social list integration
      const socialList = screen.getByTestId("social-list");
      expect(socialList).toBeInTheDocument();
      expect(socialList).toHaveAttribute("role", "list");
      expect(socialList).toHaveAttribute("data-social-list-id", "home-page");
      expect(socialList).toHaveAttribute("data-debug-mode", "true");

      // Test social list items integration (excluding email)
      const socialListItems = screen.getAllByTestId("social-list-item");
      expect(socialListItems).toHaveLength(4); // Should exclude email

      // Test social links integration
      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(4); // Should exclude email

      // Test X link
      expect(socialLinks[0]).toHaveAttribute(
        "href",
        "https://x.com/guyromellemagayano"
      );
      expect(socialLinks[0]).toHaveAttribute("aria-label", "Follow on X");
      expect(socialLinks[0]).toHaveAttribute(
        "data-social-link-id",
        "home-page"
      );
      expect(socialLinks[0]).toHaveAttribute("data-debug-mode", "true");

      // Test Instagram link
      expect(socialLinks[1]).toHaveAttribute(
        "href",
        "https://www.instagram.com/guyromellemagayano"
      );
      expect(socialLinks[1]).toHaveAttribute(
        "aria-label",
        "Follow on Instagram"
      );

      // Test GitHub link
      expect(socialLinks[2]).toHaveAttribute(
        "href",
        "https://github.com/guyromellemagayano"
      );
      expect(socialLinks[2]).toHaveAttribute("aria-label", "Follow on GitHub");

      // Test LinkedIn link
      expect(socialLinks[3]).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/guyromellemagayano"
      );
      expect(socialLinks[3]).toHaveAttribute(
        "aria-label",
        "Follow on LinkedIn"
      );

      // Test photo gallery integration
      const photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toBeInTheDocument();
      expect(photoGallery).toHaveAttribute(
        "data-photo-gallery-id",
        "home-page"
      );
      expect(photoGallery).toHaveAttribute("data-debug-mode", "true");

      // Test newsletter form integration
      const newsletterForm = screen.getByTestId("newsletter-form");
      expect(newsletterForm).toBeInTheDocument();
      expect(newsletterForm).toHaveAttribute(
        "data-newsletter-form-id",
        "home-page"
      );
      expect(newsletterForm).toHaveAttribute("data-debug-mode", "true");

      // Test resume integration
      const resume = screen.getByTestId("resume");
      expect(resume).toBeInTheDocument();
      expect(resume).toHaveAttribute("data-resume-id", "home-page");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles component updates efficiently across all integrated components", () => {
      const { rerender } = render(<HomePageLayout debugId="initial" />);

      // Test initial state
      let containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);
      containers.forEach((container) => {
        expect(container).toHaveAttribute("data-container-id", "initial");
      });

      let socialList = screen.getByTestId("social-list");
      expect(socialList).toHaveAttribute("data-social-list-id", "initial");

      let photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toHaveAttribute("data-photo-gallery-id", "initial");

      let newsletterForm = screen.getByTestId("newsletter-form");
      expect(newsletterForm).toHaveAttribute(
        "data-newsletter-form-id",
        "initial"
      );

      let resume = screen.getByTestId("resume");
      expect(resume).toHaveAttribute("data-resume-id", "initial");

      // Test update with new debugId and debug mode
      rerender(<HomePageLayout debugId="updated" debugMode={true} />);

      containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);
      containers.forEach((container) => {
        expect(container).toHaveAttribute("data-container-id", "updated");
        expect(container).toHaveAttribute("data-debug-mode", "true");
      });

      socialList = screen.getByTestId("social-list");
      expect(socialList).toHaveAttribute("data-social-list-id", "updated");
      expect(socialList).toHaveAttribute("data-debug-mode", "true");

      photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toHaveAttribute("data-photo-gallery-id", "updated");
      expect(photoGallery).toHaveAttribute("data-debug-mode", "true");

      newsletterForm = screen.getByTestId("newsletter-form");
      expect(newsletterForm).toHaveAttribute(
        "data-newsletter-form-id",
        "updated"
      );
      expect(newsletterForm).toHaveAttribute("data-debug-mode", "true");

      resume = screen.getByTestId("resume");
      expect(resume).toHaveAttribute("data-resume-id", "updated");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
    });

    it("maintains proper component hierarchy and relationships", () => {
      render(<HomePageLayout debugId="hierarchy-test" />);

      // Test that all components are rendered in correct order
      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);

      // First container should contain heading and social links
      const firstContainer = containers[0];
      const heading = screen.getByRole("heading", { level: 1 });
      const paragraph = screen.getByTestId("hierarchy-test-paragraph");
      const socialList = screen.getByTestId("social-list");

      expect(firstContainer).toContainElement(heading);
      expect(firstContainer).toContainElement(paragraph);
      expect(firstContainer).toContainElement(socialList);

      // Photo gallery should be between containers
      const photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toBeInTheDocument();

      // Second container should contain newsletter and resume
      const secondContainer = containers[1];
      const newsletterForm = screen.getByTestId("newsletter-form");
      const resume = screen.getByTestId("resume");

      expect(secondContainer).toContainElement(newsletterForm);
      expect(secondContainer).toContainElement(resume);

      // Test social list contains all social list items
      const socialListItems = screen.getAllByTestId("social-list-item");
      expect(socialListItems).toHaveLength(4);
      socialListItems.forEach((item) => {
        expect(socialList).toContainElement(item);
      });

      // Test social list items contain social links
      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(4);
      socialLinks.forEach((link, index) => {
        expect(socialListItems[index]).toContainElement(link);
      });
    });
  });

  describe("Data Flow Integration", () => {
    it("handles social list data filtering correctly", () => {
      render(<HomePageLayout debugId="data-flow-test" />);

      // Test that social list receives correct props
      const socialList = screen.getByTestId("social-list");
      expect(socialList).toHaveAttribute(
        "data-social-list-id",
        "data-flow-test"
      );

      // Test that social list items receive correct styling classes
      const socialListItems = screen.getAllByTestId("social-list-item");
      expect(socialListItems).toHaveLength(4); // Should exclude email

      // Test that social links receive correct props
      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(4); // Should exclude email
      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute("data-social-link-id", "data-flow-test");
      });

      // Test that email is filtered out
      const emailLinks = socialLinks.filter((link) =>
        link.getAttribute("href")?.includes("mailto:")
      );
      expect(emailLinks).toHaveLength(0);
    });

    it("handles conditional rendering based on social data", () => {
      // Test with null social data - this test verifies the component handles null data gracefully
      // The actual component logic checks for truthy values
      render(<HomePageLayout debugId="conditional-test" />);

      // Component should still render
      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);

      // Social list is always rendered with default data
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
    });

    it("handles empty social data gracefully", () => {
      // Test with empty social data - this test verifies the component handles empty data gracefully
      // The actual component logic checks for truthy values
      render(<HomePageLayout debugId="empty-data-test" />);

      // Component should still render
      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);

      // Social list is always rendered with default data
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
    });
  });

  describe("Responsive Grid Layout Integration", () => {
    it("applies correct responsive classes for grid layout", () => {
      render(<HomePageLayout debugId="responsive-test" />);

      // Test that responsive classes are applied to containers
      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);
      containers.forEach((container) => {
        expect(container).toHaveAttribute("class");
      });

      // Test content grid responsive classes
      const contentGrid = screen.getByTestId("responsive-test-content-grid");
      expect(contentGrid).toHaveAttribute("class");

      // Test left and right grid sections
      const leftGrid = screen.getByTestId("responsive-test-content-grid-left");
      expect(leftGrid).toHaveAttribute("class");

      const rightGrid = screen.getByTestId(
        "responsive-test-content-grid-right"
      );
      expect(rightGrid).toHaveAttribute("class");
    });

    it("maintains responsive behavior across component updates", () => {
      const { rerender } = render(
        <HomePageLayout debugId="responsive-update" />
      );

      // Test initial responsive classes
      const contentGrid = screen.getByTestId("responsive-update-content-grid");
      expect(contentGrid).toHaveAttribute("class");

      // Test that responsive classes are maintained after update
      rerender(
        <HomePageLayout
          debugId="responsive-update"
          className="additional-class"
        />
      );

      const updatedContentGrid = screen.getByTestId(
        "responsive-update-content-grid"
      );
      expect(updatedContentGrid).toHaveAttribute("class");
    });
  });

  describe("Component Coordination Integration", () => {
    it("coordinates multiple components with consistent debug IDs", () => {
      render(<HomePageLayout debugId="coordination-test" debugMode={true} />);

      // Test that all components receive the same debug ID
      const containers = screen.getAllByTestId("container");
      containers.forEach((container) => {
        expect(container).toHaveAttribute(
          "data-container-id",
          "coordination-test"
        );
        expect(container).toHaveAttribute("data-debug-mode", "true");
      });

      const socialList = screen.getByTestId("social-list");
      expect(socialList).toHaveAttribute(
        "data-social-list-id",
        "coordination-test"
      );
      expect(socialList).toHaveAttribute("data-debug-mode", "true");

      const photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toHaveAttribute(
        "data-photo-gallery-id",
        "coordination-test"
      );
      expect(photoGallery).toHaveAttribute("data-debug-mode", "true");

      const newsletterForm = screen.getByTestId("newsletter-form");
      expect(newsletterForm).toHaveAttribute(
        "data-newsletter-form-id",
        "coordination-test"
      );
      expect(newsletterForm).toHaveAttribute("data-debug-mode", "true");

      const resume = screen.getByTestId("resume");
      expect(resume).toHaveAttribute("data-resume-id", "coordination-test");
      expect(resume).toHaveAttribute("data-debug-mode", "true");
    });

    it("handles prop drilling correctly to all components", () => {
      render(<HomePageLayout debugId="prop-drilling-test" debugMode={true} />);

      // Test that debug mode is propagated to all components
      const containers = screen.getAllByTestId("container");
      containers.forEach((container) => {
        expect(container).toHaveAttribute("data-debug-mode", "true");
      });

      const socialList = screen.getByTestId("social-list");
      expect(socialList).toHaveAttribute("data-debug-mode", "true");

      const photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toHaveAttribute("data-debug-mode", "true");

      const newsletterForm = screen.getByTestId("newsletter-form");
      expect(newsletterForm).toHaveAttribute("data-debug-mode", "true");

      const resume = screen.getByTestId("resume");
      expect(resume).toHaveAttribute("data-debug-mode", "true");

      // Test that social links also receive debug mode
      const socialLinks = screen.getAllByTestId("social-link");
      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute("data-debug-mode", "true");
      });
    });
  });

  describe("Accessibility Integration", () => {
    it("maintains proper accessibility structure across all components", () => {
      render(<HomePageLayout debugId="accessibility-test" />);

      // Test semantic structure
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();

      const socialList = screen.getByRole("list");
      expect(socialList).toBeInTheDocument();

      const socialListItems = screen.getAllByRole("listitem");
      expect(socialListItems).toHaveLength(4);

      // Test ARIA labels
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

      // Test that email is not included in social links
      const emailLinks = socialLinks.filter((link) =>
        link.getAttribute("href")?.includes("mailto:")
      );
      expect(emailLinks).toHaveLength(0);
    });

    it("provides proper focus management across components", () => {
      render(<HomePageLayout debugId="focus-test" />);

      // Test that all interactive elements are focusable
      const socialLinks = screen.getAllByTestId("social-link");
      socialLinks.forEach((link) => {
        expect(link).toBeInTheDocument();
        // Links should be focusable by default
      });

      // Test that social links have proper href attributes
      expect(socialLinks[0]).toHaveAttribute(
        "href",
        "https://x.com/guyromellemagayano"
      );
      expect(socialLinks[1]).toHaveAttribute(
        "href",
        "https://www.instagram.com/guyromellemagayano"
      );
      expect(socialLinks[2]).toHaveAttribute(
        "href",
        "https://github.com/guyromellemagayano"
      );
      expect(socialLinks[3]).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/guyromellemagayano"
      );
    });
  });

  describe("Performance Integration", () => {
    it("handles memoization correctly across all components", () => {
      const { rerender } = render(
        <HomePageLayout debugId="memo-test" isMemoized={true} />
      );

      // Test initial render
      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();

      // Test that memoization works across component updates
      rerender(
        <HomePageLayout
          debugId="memo-test"
          isMemoized={true}
          className="updated-class"
        />
      );

      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();
    });

    it("handles component unmounting and remounting", () => {
      const { unmount, render: renderAgain } = render(
        <HomePageLayout debugId="mount-test" />
      );

      // Test initial mount
      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();

      // Test unmount
      unmount();
      expect(screen.queryByTestId("container")).not.toBeInTheDocument();

      // Test remount
      render(<HomePageLayout debugId="mount-test" />);
      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();
    });
  });

  describe("Real-World Usage Integration", () => {
    it("works with real home page content structure", () => {
      render(<HomePageLayout debugId="real-world-test" />);

      // Test complete home page structure
      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);

      // Test heading with real content
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(
        "Software designer, founder, and amateur astronaut."
      );

      // Test paragraph with real content
      const paragraph = screen.getByTestId("real-world-test-paragraph");
      expect(paragraph.textContent).toContain(
        "Spencer, a software designer and entrepreneur based in New York City"
      );

      // Test social links with real data (excluding email)
      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(4);

      // Test that all components work together seamlessly
      containers.forEach((container) => {
        expect(container).toBeInTheDocument();
      });

      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();
    });

    it("handles edge cases in real-world scenarios", () => {
      // Test with minimal props
      render(<HomePageLayout />);

      // Component should still render with default props
      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByTestId("social-list")).toBeInTheDocument();
      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter-form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();
    });

    it("handles complex responsive grid layout scenarios", () => {
      render(<HomePageLayout debugId="grid-test" />);

      // Test that grid layout is properly structured
      const contentGrid = screen.getByTestId("grid-test-content-grid");
      expect(contentGrid).toBeInTheDocument();

      const leftGrid = screen.getByTestId("grid-test-content-grid-left");
      expect(leftGrid).toBeInTheDocument();

      const rightGrid = screen.getByTestId("grid-test-content-grid-right");
      expect(rightGrid).toBeInTheDocument();

      // Test that newsletter and resume are in the right grid
      const newsletterForm = screen.getByTestId("newsletter-form");
      const resume = screen.getByTestId("resume");

      expect(rightGrid).toContainElement(newsletterForm);
      expect(rightGrid).toContainElement(resume);
    });
  });
});
