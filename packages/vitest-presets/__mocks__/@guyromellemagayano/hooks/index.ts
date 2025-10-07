import { vi } from "vitest";

// ============================================================================
// CENTRALIZED HOOK MOCKS
// ============================================================================

/**
 * Mock useComponentId hook with consistent behavior
 */
export const useComponentId = vi.fn((options = {}) => ({
  componentId: options.debugId || "test-id",
  isDebugMode: options.debugMode || false,
  id: options.debugId || "test-id", // For backward compatibility
}));

/**
 * Mock useRouter hook for Next.js navigation
 */
export const useRouter = vi.fn(() => ({
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
}));

/**
 * Mock usePathname hook for Next.js navigation
 */
export const usePathname = vi.fn(() => "/");

/**
 * Mock useSearchParams hook for Next.js navigation
 */
export const useSearchParams = vi.fn(() => new URLSearchParams());

/**
 * Mock useIntersection hook for intersection observer
 */
export const useIntersection = vi.fn(() => ({
  ref: vi.fn(),
  inView: true,
  entry: null,
}));

/**
 * Mock useInView hook for intersection observer
 */
export const useInView = vi.fn(() => ({
  ref: vi.fn(),
  inView: true,
  entry: null,
}));
