import { beforeEach, vi } from "vitest";

// Mock React for testing (since utils package uses React types)
vi.mock("react", () => ({
  default: {
    // Mock React types used in utils
  },
}));

// Mock process.env for browser-like test environments (jsdom)
if (typeof globalThis.process === "undefined") {
  const mockProcess = {
    env: {
      NODE_ENV: "test",
    },
  } as unknown as typeof globalThis.process;

  globalThis.process = mockProcess;
}

// Global test setup
beforeEach(() => {
  vi.clearAllMocks();
});
