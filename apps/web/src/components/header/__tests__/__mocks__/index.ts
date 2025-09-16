import { vi } from "vitest";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/about"),
}));

// Mock the lib
vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
  isActivePath: vi.fn(() => true), // Return true by default for tests
  AVATAR_COMPONENT_LABELS: {
    link: "/",
    src: "/src/images/avatar.jpg",
    home: "Home",
  },
  THEME_TOGGLE_LABELS: {
    toggleTheme: "Toggle theme",
  },
}));

// Mock the useComponentId hook
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => {
    return {
      id: options.internalId || "test-id",
      isDebugMode: options.debugMode || false,
    };
  }),
}));

// Mock the utils
vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn((id, suffix, debugMode, additionalProps = {}) => {
    const attributes: Record<string, string> = {};

    // Always add data attributes - use fallback values if needed
    const actualId = id || "test-id";
    const actualSuffix = suffix || "component";

    attributes[`data-${actualSuffix}-id`] = `${actualId}-${actualSuffix}`;
    attributes["data-testid"] = `${actualId}-${actualSuffix}-root`;

    // Only include data-debug-mode when debugMode is strictly true
    if (debugMode === true) {
      attributes["data-debug-mode"] = "true";
    }

    return {
      ...attributes,
      ...additionalProps,
    };
  }),
  isRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  hasValidContent: vi.fn((content) => {
    if (content == null) return false;
    if (typeof content === "string") return content.trim() !== "";
    if (Array.isArray(content))
      return content.some((item) => item != null && item !== "");
    return true;
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  isValidLink: vi.fn((href) => {
    if (!href) return false;
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    if (hrefString === "#" || hrefString === "") return false;
    return true;
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (!href) return { target: "_self" };
    const hrefString = typeof href === "string" ? href : href?.toString() || "";
    const isExternal = hrefString.startsWith("http");
    const shouldOpenNewTab =
      target === "_blank" || (isExternal && target !== "_self");
    return {
      target: shouldOpenNewTab ? "_blank" : "_self",
      rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
    };
  }),
  hasAnyRenderableContent: vi.fn((...values) => {
    return values.some((value) => {
      if (value === false || value === null || value === undefined) {
        return false;
      }
      if (typeof value === "string" && value.length === 0) {
        return false;
      }
      return true;
    });
  }),
  filterValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return [];
    return links.filter((link) => {
      if (!link || typeof link !== "object") return false;
      if (!link.label || typeof link.label !== "string") return false;
      if (!link.href || typeof link.href !== "string") return false;
      if (link.href === "" || link.href === "#") return false;
      // Check for kind property if it exists
      if (link.kind && link.kind !== "internal") return false;
      return true;
    });
  }),
  hasValidNavigationLinks: vi.fn((links) => {
    if (!Array.isArray(links)) return false;
    return links.length > 0;
  }),
  isValidNavigationLink: vi.fn((link) => {
    if (!link || typeof link !== "object") return false;
    if (!link.label || typeof link.label !== "string") return false;
    if (!link.href || typeof link.href !== "string") return false;
    if (link.href === "" || link.href === "#") return false;
    // Check for kind property if it exists
    if (link.kind && link.kind !== "internal") return false;
    return true;
  }),
}));

// Mock the web utils
vi.mock("@web/utils", () => ({
  isActivePath: vi.fn(() => true), // Always return true for testing
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, className, ...props }) => {
    const React = require("react");
    return React.createElement(
      "a",
      {
        "data-testid": "next-link",
        href,
        className,
        ...props,
      },
      children
    );
  }),
}));

// Mock Header data
vi.mock("../_internal/_data", () => ({
  DESKTOP_HEADER_NAV_LINKS: [
    { kind: "internal", href: "/about", label: "About" },
    { kind: "internal", href: "/articles", label: "Articles" },
    { kind: "internal", href: "/projects", label: "Projects" },
    { kind: "internal", href: "/speaking", label: "Speaking" },
    { kind: "internal", href: "/uses", label: "Uses" },
  ],
  MOBILE_HEADER_NAV_LINKS: [
    { kind: "internal", href: "/about", label: "About" },
    { kind: "internal", href: "/articles", label: "Articles" },
    { kind: "internal", href: "/projects", label: "Projects" },
    { kind: "internal", href: "/speaking", label: "Speaking" },
    { kind: "internal", href: "/uses", label: "Uses" },
  ],
}));
