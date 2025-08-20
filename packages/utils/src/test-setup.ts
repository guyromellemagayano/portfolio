import { beforeEach, vi } from "vitest";

// Mock React for testing (since utils package uses React types)
vi.mock("react", () => ({
  default: {
    // Mock React types used in utils
  },
}));

// Global test setup
beforeEach(() => {
  vi.clearAllMocks();
});
