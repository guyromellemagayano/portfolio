/**
 * @file Resume.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Resume component.
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
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      "resume.ariaLabels": {
        work: "Work",
        downloadCV: "Download CV",
        company: "Company",
        role: "Role",
        date: "Date",
      },
    };
    return (key: string) => {
      const translation = translations[namespace];
      return translation?.[key] || key;
    };
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

describe("Resume Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Resume Component Integration", () => {
    it("renders complete resume with all components", () => {
      const { container } = render(<Resume />);

      // Test main resume container
      const resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();
      expect(resume?.tagName).toBe("DIV");

      // Test ResumeTitle component
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();

      // Test ResumeRoleList component
      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();

      // Test ResumeDownloadButton component
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/resume.pdf");
      expect(button).toHaveAttribute("data-variant", "secondary");
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();

      const title = screen.getByRole("heading", { level: 2 });
      const list = screen.getByTestId("list");
      const button = screen.getByTestId("button");

      // Check that all components are within the resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);

      // Check that components are rendered in the correct order
      const children = Array.from(resume?.children || []);
      expect(children[0]).toBe(title);
      expect(children[1]).toBe(list);
      expect(children[2]).toBe(button);
    });

    it("handles component updates efficiently", () => {
      const { rerender, container } = render(<Resume />);

      let resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();

      rerender(<Resume className="new-class" />);
      resume = container.querySelector("div");
      expect(resume).toHaveClass("new-class");
    });

    it("maintains component structure during updates", () => {
      const { rerender } = render(<Resume />);

      // Verify all internal components are present
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();

      // Update with new props
      rerender(<Resume className="updated-class" />);

      // Verify all internal components are still present
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });

  describe("ResumeTitle Integration", () => {
    it("renders ResumeTitle with Icon and text", () => {
      render(<Resume />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");

      const icon = screen.getByTestId("briefcase-icon");
      expect(icon).toBeInTheDocument();
      expect(title).toContainElement(icon);

      const text = screen.getByText("Work");
      expect(text).toBeInTheDocument();
      expect(title).toContainElement(text);
    });

    it("renders ResumeTitle with correct structure", () => {
      render(<Resume />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("flex");
      expect(title).toHaveClass("text-sm");
      expect(title).toHaveClass("font-semibold");
    });
  });

  describe("ResumeRoleList Integration", () => {
    it("renders ResumeRoleList with ResumeRoleListItem children", () => {
      render(<Resume />);

      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();

      // Should render list items for each role in RESUME_DATA (4 items)
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBe(4);
    });

    it("renders all role data correctly", () => {
      render(<Resume />);

      // Should render all companies from RESUME_DATA
      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("Airbnb")).toBeInTheDocument();
      expect(screen.getByText("Facebook")).toBeInTheDocument();
      expect(screen.getByText("Starbucks")).toBeInTheDocument();

      // Should render all titles
      expect(screen.getByText("CEO")).toBeInTheDocument();
      expect(screen.getByText("Product Designer")).toBeInTheDocument();
      expect(screen.getByText("iOS Software Engineer")).toBeInTheDocument();
      expect(screen.getByText("Shift Supervisor")).toBeInTheDocument();
    });

    it("renders role dates correctly", () => {
      render(<Resume />);

      // Should render date ranges for roles (using getAllByText since dates may appear multiple times)
      expect(screen.getAllByText("2019").length).toBeGreaterThan(0);
      expect(screen.getAllByText("2014").length).toBeGreaterThan(0);
      expect(screen.getAllByText("2011").length).toBeGreaterThan(0);
      expect(screen.getAllByText("2008").length).toBeGreaterThan(0);
    });
  });

  describe("ResumeDownloadButton Integration", () => {
    it("renders ResumeDownloadButton with Button and Icon", () => {
      render(<Resume />);

      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/resume.pdf");
      expect(button).toHaveAttribute("data-variant", "secondary");

      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(button).toContainElement(screen.getByText("Download CV"));

      const icon = screen.getByTestId("arrow-down-icon");
      expect(icon).toBeInTheDocument();
      expect(button).toContainElement(icon);
    });

    it("renders ResumeDownloadButton with correct classes", () => {
      render(<Resume />);

      const button = screen.getByTestId("button");
      expect(button).toHaveClass("group");
      expect(button).toHaveClass("mt-6");
      expect(button).toHaveClass("w-full");
    });
  });

  describe("Resume with ResumeRoleListItem Integration", () => {
    it("renders ResumeRoleListItem with role data", () => {
      render(<Resume />);

      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBe(4);

      // Each list item should contain role information
      listItems.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });

    it("renders role data correctly in ResumeRoleListItem", () => {
      render(<Resume />);

      // Should render company names, titles, and dates from RESUME_DATA
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBe(4);

      // Verify structure: each item should have company, title, and dates
      expect(screen.getByText("Planetaria")).toBeInTheDocument();
      expect(screen.getByText("CEO")).toBeInTheDocument();
    });

    it("renders images for each role", () => {
      render(<Resume />);

      const images = screen.getAllByTestId("next-image");
      expect(images.length).toBe(4); // One image per role
    });
  });

  describe("Complete Resume Integration", () => {
    it("renders complete resume with all sub-components working together", () => {
      const { container } = render(<Resume />);

      // Main container
      const resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();

      // ResumeTitle
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(screen.getByText("Work")).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();

      // ResumeRoleList
      const list = screen.getByTestId("list");
      expect(list).toBeInTheDocument();
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBe(4);

      // ResumeDownloadButton
      const button = screen.getByTestId("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Download CV")).toBeInTheDocument();
      expect(screen.getByTestId("arrow-down-icon")).toBeInTheDocument();

      // Verify all components are within resume container
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);
    });

    it("maintains proper component relationships", () => {
      const { container } = render(<Resume />);

      const resume = container.querySelector("div");
      const title = screen.getByRole("heading", { level: 2 });
      const list = screen.getByTestId("list");
      const button = screen.getByTestId("button");

      // All components should be siblings within resume
      expect(resume).toContainElement(title);
      expect(resume).toContainElement(list);
      expect(resume).toContainElement(button);

      // Title should contain icon and text
      expect(title).toContainElement(screen.getByTestId("briefcase-icon"));
      expect(title).toContainElement(screen.getByText("Work"));

      // Button should contain text and icon
      expect(button).toContainElement(screen.getByText("Download CV"));
      expect(button).toContainElement(screen.getByTestId("arrow-down-icon"));

      // List should contain list items
      const listItems = screen.getAllByTestId("list-item");
      listItems.forEach((item) => {
        expect(list).toContainElement(item);
      });
    });

    it("handles prop updates across all components", () => {
      const { rerender, container } = render(<Resume />);

      let resume = container.querySelector("div");
      expect(resume).toBeInTheDocument();

      // Update with new className
      rerender(<Resume className="updated-class" />);

      resume = container.querySelector("div");
      expect(resume).toHaveClass("updated-class");

      // All sub-components should still be present
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByTestId("list")).toBeInTheDocument();
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });

  describe("SEO and Accessibility Integration", () => {
    it("renders full resume with correct semantic structure for SEO", () => {
      const { container } = render(<Resume as="section" />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Work");

      const list = screen.getByTestId("list");
      expect(list.tagName).toBe("OL");

      const link = screen.getByRole("link", { name: /download cv/i });
      expect(link).toHaveAttribute("href", "/resume.pdf");
      expect(link).toHaveTextContent("Download CV");
    });

    it("all role list items have definition lists with dt/dd structure", () => {
      render(<Resume />);

      const listItems = screen.getAllByTestId("list-item");
      expect(listItems.length).toBe(4);

      listItems.forEach((li) => {
        const dl = li.querySelector("dl");
        expect(dl).toBeInTheDocument();
        const dts = li.querySelectorAll("dt");
        const dds = li.querySelectorAll("dd");
        expect(dts.length).toBeGreaterThan(0);
        expect(dds.length).toBeGreaterThan(0);
      });
    });

    it("all images have descriptive alt text", () => {
      render(<Resume />);

      const images = screen.getAllByTestId("next-image");
      const expectedAlts = ["Planetaria", "Airbnb", "Facebook", "Starbucks"];

      expect(images.length).toBe(4);
      images.forEach((img, i) => {
        expect(img).toHaveAttribute("alt", expectedAlts[i]);
      });
    });

    it("decorative icons are hidden from screen readers", () => {
      render(<Resume />);

      expect(screen.getByTestId("briefcase-icon")).toHaveAttribute(
        "aria-hidden",
        "true"
      );
      expect(screen.getByTestId("arrow-down-icon")).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    });

    it("date ranges have aria-label and time with dateTime", () => {
      render(<Resume />);

      const dateDds = document.querySelectorAll(
        'dd[aria-label][class*="ml-auto"]'
      );
      expect(dateDds.length).toBe(4);

      const timeElements = document.querySelectorAll("time[dateTime]");
      expect(timeElements.length).toBeGreaterThanOrEqual(4);
    });

    it("decorative dash in date range is aria-hidden", () => {
      render(<Resume />);

      const hiddenDashes = document.querySelectorAll(
        'span[aria-hidden="true"]'
      );
      const dashSpan = Array.from(hiddenDashes).find(
        (el) => el.textContent?.trim() === "—"
      );
      expect(dashSpan).toBeInTheDocument();
    });
  });
});
