/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom";
import { afterAll, beforeAll, vi } from "vitest";

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
