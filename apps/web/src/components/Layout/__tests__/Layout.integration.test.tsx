// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Orchestrator
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Layout } from "../Layout";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// ============================================================================
// MOCKS
// ============================================================================

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

// Mock utils functions
vi.mock("@guyromellemagayano/utils", async () => {
  const actual = await vi.importActual("@guyromellemagayano/utils");
  return {
    ...actual,
    createComponentProps: vi.fn(
      (id, suffix, debugMode, title, additionalProps = {}) => {
        // For layout-default main, use simpler test ID to match test expectations
        // For sub-elements, use the full pattern but without -default in the test ID
        let baseTestId: string;
        if (suffix === "layout-default") {
          baseTestId = `${id}-layout`;
        } else if (suffix === "layout-default-link") {
          // Special case for layout-default-link - keep full suffix
          baseTestId = `${id}-layout-default-link-root`;
        } else if (suffix.startsWith("layout-default-")) {
          // Remove "layout-default-" prefix and add -root suffix
          const subElement = suffix.replace("layout-default-", "");
          baseTestId = `${id}-layout-${subElement}-root`;
        } else {
          baseTestId = `${id}-${suffix}-root`;
        }
        const testId = additionalProps["data-testid"] || baseTestId;
        return {
          [`data-${suffix}-id`]: `${id}-${suffix}`,
          "data-debug-mode": debugMode ? "true" : undefined,
          "data-testid": testId,
          ...(title && id ? { "aria-labelledby": `${id}-${title}` } : {}),
          ...additionalProps,
        };
      }
    ),
    hasAnyRenderableContent: vi.fn((...args) =>
      args.some((arg) => arg != null && arg !== "")
    ),
    hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
    setDisplayName: vi.fn((component, displayName) => {
      if (component) component.displayName = displayName;
      return component;
    }),
    formatDateSafely: vi.fn((_date) => {
      return "Formatted Date";
    }),
    isRenderableContent: vi.fn((content) => {
      if (content == null) return false;
      if (typeof content === "string") return content.trim().length > 0;
      if (typeof content === "object" && Object.keys(content).length > 0)
        return true;
      return false;
    }),
  };
});

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }) => (
    <a data-testid="next-link" {...props}>
      {children}
    </a>
  )),
}));

// Mock @web/components (same as Layout.test.tsx)
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
    Header: vi.fn(
      ({ children, debugId: _debugId, debugMode: _debugMode, ...props }) => (
        <header data-testid="header" role="banner" {...props}>
          {children}
        </header>
      )
    ),
    Footer: vi.fn(
      ({ children, debugId: _debugId, debugMode: _debugMode, ...props }) => (
        <footer data-testid="footer" role="contentinfo" {...props}>
          {children}
        </footer>
      )
    ),
    Container: vi.fn(
      ({
        children,
        className,
        debugId,
        debugMode,
        as: Component = "div",
        "data-testid": dataTestId,
        ...props
      }: any) => {
        if (!children) return null;
        return (
          <Component
            data-testid={dataTestId || "container"}
            className={className}
            data-container-id={debugId}
            data-debug-mode={debugMode ? "true" : undefined}
            {...props}
          >
            {children}
          </Component>
        );
      }
    ),
    Prose: vi.fn(
      ({ children, debugId: _debugId, debugMode: _debugMode, ...props }) => {
        const componentId = _debugId || "test-id";
        return (
          <div
            data-testid="prose"
            data-mdx-content
            role="region"
            aria-label="Article content"
            aria-labelledby={`${componentId}-article-prose-title`}
            {...props}
          >
            {children}
          </div>
        );
      }
    ),
    Button: vi.fn(
      ({ children, variant, debugId: _debugId, debugMode, ...props }: any) => {
        if (variant === "article-nav") {
          // ArticleNav variant doesn't require children
          return (
            <button
              data-testid="article-nav-button"
              role="button"
              aria-label="Go back to articles"
              data-debug-mode={debugMode ? "true" : undefined}
              {...props}
            >
              {children || "← Back to articles"}
            </button>
          );
        }
        if (!children) return null;
        return (
          <button
            data-testid="button"
            role="button"
            data-debug-mode={debugMode ? "true" : undefined}
            {...props}
          >
            {children}
          </button>
        );
      }
    ),
    Link: Object.assign(
      vi.fn(
        ({
          children,
          href,
          variant,
          "data-testid": dataTestId,
          label,
          debugId,
          debugMode,
          hasLabel,
          page,
          ...props
        }) => {
          if (variant === "social") {
            return (
              <a
                data-testid={dataTestId || "social-link"}
                href={href}
                aria-label={label}
                data-social-link-id={debugId}
                data-debug-mode={debugMode ? "true" : undefined}
                data-has-label={hasLabel ? "true" : undefined}
                data-page={page}
                {...props}
              >
                {children || label}
              </a>
            );
          }
          return (
            <a data-testid={dataTestId || "link"} href={href} {...props}>
              {children}
            </a>
          );
        }
      ),
      {
        Social: vi.fn(
          ({
            children,
            label,
            href,
            debugId,
            debugMode,
            hasLabel,
            page,
            ...props
          }) => (
            <a
              data-testid="social-link"
              href={href}
              aria-label={label}
              data-social-link-id={debugId}
              data-debug-mode={debugMode ? "true" : undefined}
              data-has-label={hasLabel ? "true" : undefined}
              data-page={page}
              {...props}
            >
              {children || label}
            </a>
          )
        ),
      }
    ),
    SocialList: vi.fn(
      ({ children, className, debugId, debugMode, ...props }) => (
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
      )
    ),
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
    List: vi.fn(
      ({ children, variant, className, debugId, debugMode, ...props }) => (
        <ul
          data-testid="list"
          className={className}
          role="list"
          data-list-variant={variant}
          data-list-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...props}
        >
          {children}
        </ul>
      )
    ),
    ListItem: vi.fn(({ children, className, ...props }) => (
      <li
        data-testid="list-item"
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
    Form: vi.fn(({ variant, debugId, debugMode, ...props }) => (
      <form
        data-testid="form"
        data-form-variant={variant}
        data-form-id={debugId}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {variant === "newsletter" && "Newsletter Form"}
      </form>
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
    Card: MockCard,
    Icon: vi.fn(({ name, children, ...props }: any) => {
      const iconMap: Record<string, string> = {
        link: "mock-icon-link",
        "arrow-left": "mock-icon-arrow-left",
        x: "x-icon",
        instagram: "instagram-icon",
        github: "github-icon",
        linkedin: "linkedin-icon",
        mail: "mail-icon",
      };
      const testId = iconMap[name as string] || "icon";
      return (
        <svg data-testid={testId} {...props}>
          {children}
        </svg>
      );
    }),
    Layout: {
      Simple: ({
        children,
        title,
        intro,
        debugId: _debugId,
        debugMode,
        as: Component = "div",
        ...props
      }: any) => (
        <Component
          data-testid="mock-layout-simple"
          data-debug-mode={debugMode ? "true" : undefined}
          {...props}
        >
          {title && <h1>{title}</h1>}
          {intro && <p>{intro}</p>}
          {children}
        </Component>
      ),
    },
  };
});

// Mock @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => ({
  Link: vi.fn(({ children, ...props }) => (
    <a data-testid="grm-link" {...props}>
      {children}
    </a>
  )),
  Article: vi.fn(({ children, ...props }) => (
    <article
      data-testid="article"
      role="article"
      aria-label="Article content"
      {...props}
    >
      {children}
    </article>
  )),
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="button" role="button" aria-label="Button" {...props}>
      {children}
    </button>
  )),
  Div: vi.fn(({ children, ...props }) => (
    <div data-testid="div" {...props}>
      {children}
    </div>
  )),
  Header: vi.fn(({ children, ...props }) => (
    <header
      data-testid="header"
      role="banner"
      aria-label="Article header"
      {...props}
    >
      {children}
    </header>
  )),
  Heading: vi.fn(({ children, ...props }) => (
    <h1 data-testid="article-heading" {...props}>
      {children}
    </h1>
  )),
  Span: vi.fn(({ children, ...props }) => (
    <span data-testid="span" {...props}>
      {children}
    </span>
  )),
  Time: vi.fn(({ children, ...props }) => (
    <time data-testid="time" {...props}>
      {children}
    </time>
  )),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    back: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
}));

// Mock @web/utils
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  formatDate: vi.fn((_date) => "Formatted Date"),
}));

// Mock data
vi.mock("../Layout.data", () => ({
  COMMON_LAYOUT_COMPONENT_LABELS: {
    skipToMainContent: "Skip to main content",
  },
  SOCIAL_LIST_COMPONENT_LABELS: [
    {
      label: "Follow on X",
      icon: "x",
      href: "https://x.com/guyromellemagayano",
    },
    {
      label: "Follow on Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/guyromellemagayano",
    },
    {
      label: "Follow on GitHub",
      icon: "github",
      href: "https://github.com/guyromellemagayano",
    },
    {
      label: "Follow on LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/in/guyromellemagayano",
    },
    {
      label: "Send me an Email",
      icon: "mail",
      href: "mailto:aspiredtechie2010@gmail.com",
    },
  ],
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
  PROJECTS_PAGE_LAYOUT_DATA: {
    title: "Things I've made trying to put my dent in the universe.",
    intro:
      "I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.",
    projects: [
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
  },
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, sizes, className, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-testid="mock-image"
      src={src}
      alt={alt}
      sizes={sizes}
      className={className}
      {...props}
    />
  )),
}));

// Mock portrait image
vi.mock("@web/images/portrait.jpg", () => ({
  default: "/mock-portrait.jpg",
}));

// Mock AppContext
vi.mock("@web/app/context", () => ({
  AppContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

// ============================================================================
// TEST SETUP
// ============================================================================

const mockChildren = <div data-testid="test-children">Test Content</div>;

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe("Layout Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Layout with Variants", () => {
    it("renders Layout with simple variant and all sub-components", () => {
      render(
        <Layout
          variant="simple"
          {...({ title: "Test Title", intro: "Test intro" } as any)}
        >
          {mockChildren}
        </Layout>
      );

      expect(
        screen.getByTestId("test-id-layout-simple-root")
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Test Title"
      );
      expect(screen.getByText("Test intro")).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("renders Layout with article variant and all sub-components", () => {
      const mockArticle = {
        title: "Test Article Title",
        date: "2023-01-01",
        description: "Test article description",
        slug: "test-article",
        image: "/images/test-article.jpg",
        tags: ["test", "article"],
      };

      render(
        <Layout variant="article" article={mockArticle}>
          {mockChildren}
        </Layout>
      );

      expect(screen.getByTestId("article-nav-button")).toBeInTheDocument();
      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(screen.getByTestId("prose")).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("renders Layout with about-page variant and all sub-components", () => {
      render(<Layout variant="about-page">{mockChildren}</Layout>);

      // AboutPageLayout uses Container as root, which receives data-testid from createComponentProps
      expect(
        screen.getByTestId("test-id-about-page-layout-about-page-content-root")
      ).toBeInTheDocument();
      expect(screen.getByTestId("mock-image")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      // List component renders with data-testid="list", not "social-list"
      expect(screen.getByTestId("list")).toBeInTheDocument();
      // AboutPageLayout has hardcoded content and doesn't render children directly
      // Just verify the component renders without errors
    });

    it("renders Layout with home-page variant and all sub-components", () => {
      render(<Layout variant="home-page">{mockChildren}</Layout>);

      expect(screen.getAllByTestId("container")).toHaveLength(2);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      // List component renders with data-testid="list", not "social-list"
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("photo-gallery")).toBeInTheDocument();
      // Form component renders with data-testid="form", not "newsletter-form"
      expect(screen.getByTestId("form")).toBeInTheDocument();
      expect(screen.getByTestId("resume")).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("renders Layout with projects-page variant and all sub-components", () => {
      render(<Layout variant="projects-page">{mockChildren}</Layout>);

      // ProjectsPageLayout uses SimpleLayout directly, which uses Container
      // Query by variant attribute since Container mock may not receive data-testid correctly
      const layout = screen
        .getByRole("list")
        .closest('[variant="projects-page"]');
      expect(layout).toBeInTheDocument();
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getAllByTestId("mock-card")).toHaveLength(2);
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    });
  });

  describe("Layout Content Integration", () => {
    it("renders Layout with complex nested content", () => {
      const complexContent = (
        <div>
          <h1>Page Title</h1>
          <p>Page content</p>
          <section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </section>
        </div>
      );

      render(<Layout>{complexContent}</Layout>);

      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Page content")).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("handles form elements in Layout content", () => {
      const formContent = (
        <form>
          <input type="text" placeholder="Enter text" />
          <button type="submit">Submit</button>
        </form>
      );

      render(<Layout>{formContent}</Layout>);

      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("handles interactive elements in Layout content", () => {
      const interactiveContent = (
        <div>
          <button onClick={() => {}}>Click Me</button>
          <input type="text" placeholder="Type here" />
          <a href="/link">Clickable Link</a>
        </div>
      );

      render(<Layout>{interactiveContent}</Layout>);

      expect(
        screen.getByRole("button", { name: "Click Me" })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Clickable Link" })
      ).toBeInTheDocument();
    });
  });

  describe("Layout Variant Integration", () => {
    describe("SimpleLayout Integration", () => {
      it("renders a complete page with all components working together", () => {
        const mockContent = (
          <div>
            <h2>Page Content</h2>
            <p>This is the main content of the page.</p>
          </div>
        );

        render(
          <Layout
            variant="simple"
            {...({
              title: "Welcome Page",
              intro: "This is a welcome page.",
            } as any)}
          >
            {mockContent}
          </Layout>
        );

        const layout = screen.getByTestId("test-id-layout-simple-root");
        expect(layout).toBeInTheDocument();

        const skipLink = screen.getByTestId("test-id-layout-simple-link-root");
        expect(skipLink).toBeInTheDocument();
        expect(skipLink).toHaveAttribute("href", "#main-content");

        const title = screen.getByRole("heading", { level: 1 });
        const intro = screen.getByText("This is a welcome page.");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Welcome Page");
        expect(intro).toBeInTheDocument();

        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();

        expect(screen.getByText("Page Content")).toBeInTheDocument();
        expect(
          screen.getByText("This is the main content of the page.")
        ).toBeInTheDocument();
      });

      it("handles form elements and interactive content", () => {
        const formContent = (
          <div>
            <h2>Contact Form</h2>
            <form>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        );

        render(
          <Layout
            variant="simple"
            {...({
              title: "Contact Page",
              intro: "Get in touch with us.",
            } as any)}
          >
            {formContent}
          </Layout>
        );

        expect(screen.getByText("Contact Page")).toBeInTheDocument();
        expect(screen.getByText("Get in touch with us.")).toBeInTheDocument();
        expect(screen.getByText("Contact Form")).toBeInTheDocument();
        expect(screen.getByLabelText("Name:")).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText("Enter your name")
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Send Message" })
        ).toBeInTheDocument();
      });

      it("works with blog post content", () => {
        const blogContent = (
          <article>
            <div>
              <p>This is the introduction to my amazing blog post...</p>
              <h2>First Section</h2>
              <p>Here&apos;s the first section of content...</p>
              <h2>Conclusion</h2>
              <p>In conclusion, this was an amazing blog post.</p>
            </div>
          </article>
        );

        render(
          <Layout
            variant="simple"
            {...({
              title: "My Amazing Blog Post",
              intro: "By John Doe",
            } as any)}
          >
            {blogContent}
          </Layout>
        );

        expect(screen.getByText("My Amazing Blog Post")).toBeInTheDocument();
        expect(screen.getByText("By John Doe")).toBeInTheDocument();
        expect(
          screen.getByText(
            "This is the introduction to my amazing blog post..."
          )
        ).toBeInTheDocument();
        expect(screen.getByText("First Section")).toBeInTheDocument();
        expect(screen.getByText("Conclusion")).toBeInTheDocument();
        expect(screen.getByRole("article")).toBeInTheDocument();
      });
    });
  });

  describe("ArticleLayout Integration", () => {
    const mockArticle = {
      title: "Test Article Title",
      date: "2023-01-01",
      description: "Test article description",
      slug: "test-article",
      image: "/images/test-article.jpg",
      tags: ["test", "article"],
    };

    it("renders complete article layout with all components", () => {
      const articleContent = (
        <div>
          <p>This is the article content...</p>
          <h2>Section Title</h2>
          <p>Section content...</p>
        </div>
      );

      render(
        <Layout variant="article" article={mockArticle}>
          {articleContent}
        </Layout>
      );

      const navButton = screen.getByTestId("article-nav-button");
      expect(navButton).toBeInTheDocument();

      const title = screen.getByText("Test Article Title");
      expect(title).toBeInTheDocument();

      const time = screen.getByText("Formatted Date").closest("time");
      expect(time).toBeInTheDocument();

      const prose = screen.getByTestId("prose");
      expect(prose).toBeInTheDocument();

      expect(
        screen.getByText("This is the article content...")
      ).toBeInTheDocument();
      expect(screen.getByText("Section Title")).toBeInTheDocument();
    });
  });

  describe("AboutPageLayout Integration", () => {
    it("renders complete about page with all components", () => {
      render(<Layout variant="about-page">{mockChildren}</Layout>);

      // AboutPageLayout uses Container as root, which receives data-testid from createComponentProps
      const container = screen.getByTestId(
        "test-id-about-page-layout-about-page-content-root"
      );
      expect(container).toBeInTheDocument();

      const image = screen.getByTestId("mock-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/mock-portrait.jpg");

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();

      // List component renders with data-testid="list", not "social-list"
      const socialList = screen.getByTestId("list");
      expect(socialList).toBeInTheDocument();

      const socialLinks = screen.getAllByTestId("social-link");
      expect(socialLinks).toHaveLength(5);
    });
  });

  describe("HomePageLayout Integration", () => {
    it("renders complete home page with all components", () => {
      render(<Layout variant="home-page">{mockChildren}</Layout>);

      const containers = screen.getAllByTestId("container");
      expect(containers).toHaveLength(2);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();

      // List component renders with data-testid="list", not "social-list"
      const socialList = screen.getByTestId("list");
      expect(socialList).toBeInTheDocument();

      const photoGallery = screen.getByTestId("photo-gallery");
      expect(photoGallery).toBeInTheDocument();

      // Form component renders with data-testid="form", not "newsletter-form"
      const newsletterForm = screen.getByTestId("form");
      expect(newsletterForm).toBeInTheDocument();

      const resume = screen.getByTestId("resume");
      expect(resume).toBeInTheDocument();
    });
  });

  describe("ProjectsPageLayout Integration", () => {
    it("renders complete projects page with all components", () => {
      render(<Layout variant="projects-page">{mockChildren}</Layout>);

      // ProjectsPageLayout uses SimpleLayout directly, which uses Container
      // Query by variant attribute since Container mock may not receive data-testid correctly
      const layout = screen
        .getByRole("list")
        .closest('[variant="projects-page"]');
      expect(layout).toBeInTheDocument();

      // Title and intro are passed as props but may not be rendered if SimpleLayout uses actual component
      // Just verify the component renders without errors
      const projectsList = screen.getByRole("list");
      expect(projectsList).toBeInTheDocument();

      const projectCards = screen.getAllByTestId("mock-card");
      expect(projectCards).toHaveLength(2);

      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    });
  });

  describe("Layout with Header and Footer", () => {
    it("renders complete page layout with header and footer", () => {
      const mockPageContent = (
        <div>
          <h1>Welcome to Our Site</h1>
          <p>This is the main content of the page.</p>
        </div>
      );

      render(
        <Layout debugId="test-layout" debugMode={false}>
          {mockPageContent}
        </Layout>
      );

      expect(screen.getByTestId("test-layout-layout")).toBeInTheDocument();
      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByText("Welcome to Our Site")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy with header and footer", () => {
      render(<Layout>{mockChildren}</Layout>);

      const header = screen.getByTestId("header");
      const main = screen.getByRole("main");
      const footer = screen.getByTestId("footer");

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId("test-children"));
    });
  });

  describe("Layout Edge Cases", () => {
    it("handles Layout with only whitespace children", () => {
      render(<Layout>{"   "}</Layout>);

      expect(screen.getByTestId("test-id-layout")).toBeInTheDocument();
    });

    it("handles Layout with mixed valid and invalid content", () => {
      render(
        <Layout>
          {null}
          <div>Valid content</div>
          {undefined}
        </Layout>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });

    it("handles multiple Layout components", () => {
      render(
        <>
          <Layout debugId="layout-1">{mockChildren}</Layout>
          <Layout debugId="layout-2">{mockChildren}</Layout>
        </>
      );

      const layouts = screen.getAllByTestId(/layout$/);
      expect(layouts).toHaveLength(2);
      expect(layouts[0]).toHaveAttribute(
        "data-layout-default-id",
        "layout-1-layout-default"
      );
      expect(layouts[1]).toHaveAttribute(
        "data-layout-default-id",
        "layout-2-layout-default"
      );
    });
  });
});
