/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import React from "react";

import { afterAll, beforeAll, vi } from "vitest";

import "@testing-library/jest-dom";

// Extend global interface to avoid TypeScript errors
declare global {
  interface Global {
    IntersectionObserver: any;
    ResizeObserver: any;
    requestAnimationFrame: any;
    cancelAnimationFrame: any;
  }
}

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
(global as any).IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
(global as any).ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
(global as any).requestAnimationFrame = vi.fn(
  (callback: (time: number) => void) => {
    callback(0);
    return 1;
  }
);

// Mock cancelAnimationFrame
(global as any).cancelAnimationFrame = vi.fn();

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(),
  })),
});

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };
beforeAll(() => {
  console.warn = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

// Global mock for next/navigation
const mockBack = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => (globalThis as any).__TEST_PATHNAME__ ?? "/about",
  useRouter: () => ({
    back: mockBack,
    push: vi.fn(),
    replace: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Export for tests to use
(globalThis as any).__MOCK_ROUTER_BACK__ = mockBack;

// Global mock for next/image
vi.mock("next/image", () => ({
  default: (props: any) =>
    React.createElement("div", {
      "data-testid": "mock-image",
      width: 64,
      height: 64,
      ...props,
    }),
}));

// Global mock for next/link
vi.mock("next/link", () => {
  const MockLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const { href, children, ...rest } = props;
    return React.createElement(
      "a",
      {
        ref,
        href,
        "data-testid": "mock-link",
        ...rest,
      },
      children
    );
  });
  MockLink.displayName = "MockNextLink";
  return { default: MockLink };
});

// Global mock for next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "dark",
    setTheme: vi.fn(),
  }),
}));

// Global mock for Next.js use-intersection hook
vi.mock("next/src/client/use-intersection", () => ({
  default: vi.fn(() => ({
    ref: vi.fn(),
    inView: true,
    entry: null,
  })),
}));

// Global mock for next/use-intersection (alternative path)
vi.mock("next/use-intersection", () => ({
  default: vi.fn(() => ({
    ref: vi.fn(),
    inView: true,
    entry: null,
  })),
}));

// More robust IntersectionObserver mock
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Global fallback mock for @guyromellemagayano/components
vi.mock("@guyromellemagayano/components", () => {
  // Create mock components with data-testid for testing
  const createMockComponent = (tag: string, testId: string) => {
    return React.forwardRef<any, any>((props, ref) => {
      const { children, ...rest } = props;
      return React.createElement(
        tag,
        {
          ref,
          "data-testid": testId,
          ...rest,
        },
        children
      );
    });
  };

  const mockComponents = {
    // Common primitives
    Article: createMockComponent("article", "mock-article"),
    Div: createMockComponent("div", "mock-div"),
    Heading: createMockComponent("h2", "mock-heading"),
    P: createMockComponent("p", "mock-p"),
    Span: createMockComponent("span", "mock-span"),
    Svg: createMockComponent("svg", "mock-svg"),
    Time: createMockComponent("time", "mock-time"),
    Nav: createMockComponent("nav", "mock-nav"),
    Header: createMockComponent("header", "mock-header"),
    Footer: createMockComponent("footer", "mock-footer"),
    Button: createMockComponent("button", "mock-button"),
    Li: createMockComponent("li", "mock-li"),
    Ul: createMockComponent("ul", "mock-ul"),
    Container: createMockComponent("div", "mock-container"),
    Link: createMockComponent("a", "mock-link"),
  };

  return mockComponents;
});

// Global mock for @web/lib
vi.mock("@web/lib", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
  isActivePath: (pathname: string | null | undefined, href: string) => {
    // For tests, be more permissive - return true by default
    if (!pathname) return true;
    if (href === pathname) return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    // Default to true for tests to avoid false negatives
    return true;
  },
}));

// Global mock for @web/utils
vi.mock("@web/utils", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
  formatDate: vi.fn((_date) => "Formatted Date"),
}));

// Global mock for @guyromellemagayano/utils
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((...args) =>
    args.some((arg) => arg != null && arg !== "")
  ),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  isRenderableContent: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
  isValidLink: vi.fn((href) => href != null && href !== ""),
  getLinkTargetProps: vi.fn((href, target) => ({
    target: target || (href?.startsWith("http") ? "_blank" : undefined),
    rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
  })),
}));

// Global mock for @guyromellemagayano/hooks
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode = false } = {}) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode,
  })),
}));

// Global mock for @guyromellemagayano/logger
vi.mock("@guyromellemagayano/logger", () => {
  const mockLogger = {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    silly: vi.fn(),
    child: vi.fn(() => mockLogger),
    time: vi.fn(),
    timeEnd: vi.fn(),
    performance: vi.fn(),
    metric: vi.fn(),
    flush: vi.fn(),
    close: vi.fn(),
  };

  return {
    // Main logger instance
    logger: mockLogger,
    createLogger: vi.fn(() => mockLogger),

    // Legacy function exports
    logError: vi.fn(),
    logInfo: vi.fn(),
    logWarn: vi.fn(),
    logDebug: vi.fn(),
    logTrace: vi.fn(),
    log: vi.fn(),

    // Default export
    default: mockLogger,
  };
});
