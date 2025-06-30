import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import "@testing-library/jest-dom";

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
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock navigation to prevent JSDOM errors
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    href: "http://localhost:3000",
    origin: "http://localhost:3000",
    protocol: "http:",
    host: "localhost:3000",
    hostname: "localhost",
    port: "3000",
    pathname: "/",
    search: "",
    hash: "",
  },
});

// Mock HTML element navigation methods to prevent JSDOM navigation errors
HTMLAnchorElement.prototype.click = vi.fn();
HTMLAreaElement.prototype.click = vi.fn();

// Mock MutationObserver with proper implementation for testing-library
global.MutationObserver = vi.fn().mockImplementation((callback) => {
  return {
    observe: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn().mockReturnValue([]),
    // Add the callback for testing-library compatibility
    callback,
  };
});

// Mock scrollTo
global.scrollTo = vi.fn();
Element.prototype.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

// Enhanced cleanup function to run after each test to prevent memory leaks
afterEach(() => {
  // Clean up React components first (most important for test isolation)
  cleanup();

  // Clear all timers
  vi.clearAllTimers();

  // Clear all mocks
  vi.clearAllMocks();

  // Clear DOM to prevent test pollution (backup cleanup)
  document.body.innerHTML = "";
  document.head.innerHTML = "";

  // Reset location to prevent navigation state pollution
  if (window.location) {
    Object.assign(window.location, {
      href: "http://localhost:3000",
      pathname: "/",
      search: "",
      hash: "",
    });
  }

  // Reset document.title
  document.title = "";

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});
