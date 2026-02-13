import { beforeEach, vi } from "vitest";

// Mock React for testing
vi.mock("react", () => ({
  default: {
    useId: vi.fn(() => "test-id"),
    forwardRef: vi.fn((fn) => fn),
  },
  useId: vi.fn(() => "test-id"),
  forwardRef: vi.fn((fn) => fn),
}));

// Mock the logger
vi.mock("@portfolio/logger", () => ({
  logInfo: vi.fn(),
}));

// Mock environment for debug mode testing
vi.stubGlobal("process", {
  env: {
    NODE_ENV: "development",
  },
});

// Global test setup
beforeEach(() => {
  vi.clearAllMocks();
});
