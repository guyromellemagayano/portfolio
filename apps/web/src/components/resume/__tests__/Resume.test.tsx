/**
 * @file Resume.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Resume component.
 */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Resume } from "../Resume";

// ============================================================================
// MOCKS
// ============================================================================

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((_namespace: string) => {
    const translations: Record<string, string> = {
      "labels.work": "Work",
      "labels.downloadCV": "Download CV",
      "labels.company": "Company",
      "labels.role": "Role",
      "labels.date": "Date",
    };
    return (key: string) => translations[key] ?? key;
  }),
}));

// Mock @web/utils/helpers
vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  getRoleItemKey: vi.fn(
    (role: { company: string; title: string }, index: number) =>
      `${role.company}-${role.title}-${index}`
  ),
  parseRoleDate: vi.fn((date: string | { label: string; dateTime: string }) => {
    if (typeof date === "string") {
      return { label: date, dateTime: date };
    }
    return date;
  }),
}));

// Mock @web/components
vi.mock("@web/components/button", () => ({
  Button: React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<"a"> & { variant?: string }
  >(function Button({ children, className, href, variant, ...props }, ref) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        data-testid="button"
        data-variant={variant}
        {...props}
      >
        {children}
      </a>
    );
  }),
}));

vi.mock("@web/components/icon", () => ({
  Icon: function Icon({
    name,
    className,
    "aria-hidden": ariaHidden,
    ...props
  }: {
    name: string;
    className?: string;
    "aria-hidden"?: boolean;
    [key: string]: any;
  }) {
    const iconMap: Record<string, string> = {
      "arrow-down": "arrow-down-icon",
      briefcase: "briefcase-icon",
    };
    const testId = iconMap[name] || "icon";
    return (
      <svg
        data-testid={testId}
        className={className}
        aria-hidden={ariaHidden}
        {...props}
      >
        {name}
      </svg>
    );
  },
}));

vi.mock("@web/components/list", () => ({
  List: function List({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
  }) {
    return (
      <ol data-testid="list" className={className} {...props}>
        {children}
      </ol>
    );
  },
  ListItem: function ListItem({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
  }) {
    return (
      <li data-testid="list-item" className={className} {...props}>
        {children}
      </li>
    );
  },
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: function Image({
    src,
    alt,
    className,
    ...props
  }: {
    src: any;
    alt: string;
    className?: string;
    [key: string]: any;
  }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt}
        className={className}
        data-testid="next-image"
        {...props}
      />
    );
  },
}));

// ============================================================================
// TESTS
// ============================================================================

describe("Resume", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();
      expect(resume?.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
      const { container } = render(<Resume className="custom-class" />);

      const resume = container.querySelector("div");
      expect(resume).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
      const { container } = render(
        <Resume data-test="custom-data" aria-label="Resume section" />
      );

      const resume = container.querySelector("div");
      expect(resume).toHaveAttribute("data-test", "custom-data");
      expect(resume).toHaveAttribute("aria-label", "Resume section");
    });
  });

  describe("Component Structure", () => {
    it("renders container with correct structure", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();
      expect(resume?.tagName).toBe("DIV");
    });

    it("renders all internal components", () => {
      render(<Resume />);

      // ResumeTitle renders as h2 with briefcase icon
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();

      // ResumeRoleList renders as list
      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();

      // ResumeDownloadButton renders as button
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Download CV")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      expect(resume).toHaveClass("rounded-2xl");
      expect(resume).toHaveClass("border");
    });

    it("renders with custom container element", () => {
      const { container } = render(<Resume as="section" />);

      const resume = container.querySelector("section");
      expect(resume).toBeInTheDocument();
      expect(resume?.tagName).toBe("SECTION");
    });

    it("renders with article element", () => {
      const { container } = render(<Resume as="article" />);

      const resume = container.querySelector("article");
      expect(resume).toBeInTheDocument();
      expect(resume?.tagName).toBe("ARTICLE");
    });
  });

  describe("Content Validation", () => {
    it("renders when no additional props provided", () => {
      render(<Resume />);

      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("renders resume role list items", () => {
      render(<Resume />);

      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);
    });

    it("renders company names and titles from resume data", () => {
      render(<Resume />);

      // Should render at least one company name
      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("CEO")).toBeInTheDocument();
    });
  });

  describe("Polymorphic Element Types", () => {
    it("renders as div by default", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      expect(resume?.tagName).toBe("DIV");
    });

    it("renders as section when as prop is section", () => {
      const { container } = render(<Resume as="section" />);

      const resume = container.querySelector("section");
      expect(resume?.tagName).toBe("SECTION");
    });

    it("renders as article when as prop is article", () => {
      const { container } = render(<Resume as="article" />);

      const resume = container.querySelector("article");
      expect(resume?.tagName).toBe("ARTICLE");
    });
  });

  describe("Component-Specific Tests", () => {
    it("renders all internal components in correct order", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      const title = screen.getByRole("heading", { level: 2 });
      const list = screen.getByTestId("list");
      const button = screen.getByTestId("button");

      // Check that all components are within the resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);

      // Check order (title should come before list, list before button)
      const children = Array.from(resume?.children || []);
      expect(children[0]).toBe(title);
      expect(children[1]).toBe(list);
      expect(children[2]).toBe(button);
    });

    it("renders ResumeTitle with correct structure", () => {
      render(<Resume />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();
    });

    it("renders ResumeDownloadButton with correct href and variant", () => {
      render(<Resume />);

      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("href", "/resume.pdf");
      expect(button).toHaveAttribute("data-variant", "primary");
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();
    });

    it("renders ResumeRoleList with role list items", () => {
      render(<Resume />);

      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBe(4); // RESUME_DATA has 4 items
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("renders ResumeTitle as native heading", () => {
      render(<Resume />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
    });

    it("renders role list items with proper structure", () => {
      render(<Resume />);

      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBeGreaterThan(0);

      listItems.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });

    it("maintains accessibility during updates", () => {
      const { rerender, container } = render(<Resume />);

      let resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();

      rerender(<Resume className="updated-class" />);
      resume = container.querySelector("div");
      expect(resume).toHaveClass("updated-class");
    });

    it("renders with proper container structure", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();
      expect(resume?.tagName).toBe("DIV");
    });
  });

  describe("Accessibility (a11y)", () => {
    it("hides decorative icons from screen readers", () => {
      render(<Resume />);

      const briefcaseIcon = screen.getByTestId("briefcase-icon");
      expect(briefcaseIcon).toHaveAttribute("aria-hidden", "true");

      const arrowDownIcon = screen.getByTestId("arrow-down-icon");
      expect(arrowDownIcon).toHaveAttribute("aria-hidden", "true");
    });

    it("provides screen-reader-only labels for definition terms", () => {
      render(<Resume />);

      // Company, Role, Date dt elements use sr-only (visually hidden, available to SR)
      const dts = document.querySelectorAll("dt.sr-only");
      expect(dts.length).toBeGreaterThan(0);
    });

    it("labels date range with aria-label", () => {
      render(<Resume />);

      // At least one date range dd has aria-label "X until Y"
      const dateDds = document.querySelectorAll(
        'dd[aria-label][class*="ml-auto"]'
      );
      expect(dateDds.length).toBeGreaterThan(0);
      expect(dateDds[0]).toHaveAttribute(
        "aria-label",
        expect.stringMatching(/\d{4} until (\d{4}|Present)/)
      );
    });

    it("uses time elements with dateTime for dates", () => {
      render(<Resume />);

      const timeElements = document.querySelectorAll("time[dateTime]");
      expect(timeElements.length).toBeGreaterThan(0);
      timeElements.forEach((time) => {
        expect(time).toHaveAttribute("dateTime");
      });
    });

    it("hides decorative dash from screen readers", () => {
      render(<Resume />);

      const hiddenSpan = document.querySelector('span[aria-hidden="true"]');
      expect(hiddenSpan).toBeInTheDocument();
      expect(hiddenSpan?.textContent?.trim()).toBe("—");
    });

    it("download link has descriptive visible text", () => {
      render(<Resume />);

      const link = screen.getByRole("link", { name: /download cv/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/resume.pdf");
    });
  });

  describe("SEO", () => {
    it("supports semantic container elements (section, article)", () => {
      const { container } = render(<Resume as="section" />);
      expect(container.querySelector("section")).toBeInTheDocument();

      const { container: c2 } = render(<Resume as="article" />);
      expect(c2.querySelector("article")).toBeInTheDocument();
    });

    it("uses single h2 for resume section title", () => {
      render(<Resume />);

      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent("Work");
    });

    it("uses ordered list for role list", () => {
      render(<Resume />);

      const list = screen.getByTestId("list");
      expect(list.tagName).toBe("OL");
    });

    it("uses definition list for role metadata (company, role, date)", () => {
      render(<Resume />);

      const dls = document.querySelectorAll("dl");
      expect(dls.length).toBeGreaterThan(0);
    });

    it("images have descriptive alt text", () => {
      render(<Resume />);

      const images = screen.getAllByTestId("next-image");
      expect(images.length).toBe(4);
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
        expect((img.getAttribute("alt") ?? "").length).toBeGreaterThan(0);
      });
      expect(images[0]).toHaveAttribute("alt", "Planetaria");
    });

    it("time elements have dateTime in ISO-friendly format", () => {
      render(<Resume />);

      const timeElements = document.querySelectorAll("time[dateTime]");
      expect(timeElements.length).toBeGreaterThan(0);
      timeElements.forEach((time) => {
        const dt = time.getAttribute("dateTime");
        expect(dt).toBeTruthy();
        // Year-only or full date
        expect(dt).toMatch(/^\d{4}$|^\d{4}-\d{2}-\d{2}/);
      });
    });

    it("download link has visible descriptive text for SEO", () => {
      render(<Resume />);

      const link = screen.getByRole("link", { name: /download cv/i });
      expect(link).toHaveTextContent("Download CV");
    });
  });
});
