import { spawn } from "child_process";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock child_process
vi.mock("child_process", () => ({
  spawn: vi.fn(),
}));

// Mock fs
vi.mock("fs", () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
}));

// Mock path
vi.mock("path", () => ({
  join: vi.fn((...args) => args.join("/")),
}));

// Import the class to test
import { ComponentTestRunner } from "../libs/test-components";

describe("ComponentTestRunner", () => {
  const mockSpawn = spawn as any;
  const mockExistsSync = existsSync as any;
  const mockReaddirSync = readdirSync as any;
  const mockJoin = join as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findComponents", () => {
    it("should find components with test files", async () => {
      mockReaddirSync.mockReturnValue([
        { name: "button", isDirectory: () => true },
        { name: "input", isDirectory: () => true },
        { name: "utils", isDirectory: () => false },
        { name: "styles.css", isDirectory: () => false },
      ]);

      mockExistsSync.mockImplementation((path: string) => {
        return path.includes("button") || path.includes("input");
      });

      const runner = new ComponentTestRunner();
      const components = await runner.findComponents();

      expect(components).toEqual(["button", "input"]);
      expect(mockReaddirSync).toHaveBeenCalledWith("src", {
        withFileTypes: true,
      });
    });

    it("should return empty array when no components found", async () => {
      mockReaddirSync.mockReturnValue([
        { name: "utils", isDirectory: () => false },
        { name: "styles.css", isDirectory: () => false },
      ]);

      mockExistsSync.mockReturnValue(false);

      const runner = new ComponentTestRunner();
      const components = await runner.findComponents();

      expect(components).toEqual([]);
    });

    it("should handle readdirSync errors", async () => {
      mockReaddirSync.mockImplementation(() => {
        throw new Error("Permission denied");
      });

      const runner = new ComponentTestRunner();
      const components = await runner.findComponents();

      expect(components).toEqual([]);
    });
  });

  describe("runComponentTest", () => {
    it("should run component test successfully", async () => {
      const mockChildProcess = {
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, callback) => {
          if (event === "close") {
            callback(0); // Success
          }
        }),
      };

      mockSpawn.mockReturnValue(mockChildProcess);

      const runner = new ComponentTestRunner();
      const result = await runner.runComponentTest("button");

      expect(mockSpawn).toHaveBeenCalledWith(
        "npx",
        [
          "vitest",
          "run",
          "--config",
          "vitest.light.config.ts",
          "--reporter=verbose",
          "src/button",
        ],
        expect.objectContaining({
          stdio: ["inherit", "pipe", "pipe"],
          env: expect.objectContaining({
            NODE_OPTIONS: "--max-old-space-size=1024",
          }),
        })
      );

      expect(result.success).toBe(true);
    });

    it("should handle test timeout", async () => {
      const mockChildProcess = {
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn(),
        kill: vi.fn(),
      };

      mockSpawn.mockReturnValue(mockChildProcess);

      // Mock setTimeout to trigger timeout immediately
      const originalSetTimeout = global.setTimeout;
      global.setTimeout = vi.fn((callback) => {
        callback();
        return {} as any;
      }) as any;

      const runner = new ComponentTestRunner();
      const result = await runner.runComponentTest("button");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Test timeout");
      expect(result.memoryIssue).toBe(true);

      // Restore setTimeout
      global.setTimeout = originalSetTimeout;
    });

    it("should handle child process errors", async () => {
      const mockChildProcess = {
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, callback) => {
          if (event === "error") {
            callback(new Error("Process error"));
          }
        }),
      };

      mockSpawn.mockReturnValue(mockChildProcess);

      const runner = new ComponentTestRunner();
      const result = await runner.runComponentTest("button");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Process error");
      expect(result.memoryIssue).toBe(false);
    });
  });

  describe("extractTestCount", () => {
    it("should extract test count from stdout", () => {
      const runner = new ComponentTestRunner();

      const stdout1 = "✓ 5 passed";
      const count1 = (runner as any).extractTestCount(stdout1);
      expect(count1).toBe(5);

      const stdout2 = "✓ 1 passed, 2 failed";
      const count2 = (runner as any).extractTestCount(stdout2);
      expect(count2).toBe(1);

      const stdout3 = "No tests found";
      const count3 = (runner as any).extractTestCount(stdout3);
      expect(count3).toBe(0);
    });
  });

  describe("runAll", () => {
    it("should run all component tests", async () => {
      const mockChildProcess = {
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, callback) => {
          if (event === "close") {
            callback(0); // Success
          }
        }),
      };

      mockSpawn.mockReturnValue(mockChildProcess);
      mockReaddirSync.mockReturnValue([
        { name: "button", isDirectory: () => true },
        { name: "input", isDirectory: () => true },
      ]);
      mockExistsSync.mockReturnValue(true);

      const runner = new ComponentTestRunner();
      const success = await runner.runAll();

      expect(success).toBe(true);
      expect(mockSpawn).toHaveBeenCalledTimes(2);
    });

    it("should return false when no components found", async () => {
      mockReaddirSync.mockReturnValue([]);

      const runner = new ComponentTestRunner();
      const success = await runner.runAll();

      expect(success).toBe(false);
    });

    it("should return false when some tests fail", async () => {
      const mockChildProcess = {
        stdout: { on: vi.fn() },
        stderr: { on: vi.fn() },
        on: vi.fn((event, callback) => {
          if (event === "close") {
            callback(1); // Failure
          }
        }),
      };

      mockSpawn.mockReturnValue(mockChildProcess);
      mockReaddirSync.mockReturnValue([
        { name: "button", isDirectory: () => true },
      ]);
      mockExistsSync.mockReturnValue(true);

      const runner = new ComponentTestRunner();
      const success = await runner.runAll();

      expect(success).toBe(false);
    });
  });

  describe("calculateSummary", () => {
    it("should calculate correct summary", () => {
      const runner = new ComponentTestRunner();

      // Mock results
      (runner as any).results = [
        { success: true, duration: 100, testCount: 3 },
        { success: false, duration: 200, testCount: 2 },
        { success: true, duration: 150, testCount: 4 },
        { success: false, duration: 300, memoryIssue: true, testCount: 1 },
      ];

      const summary = (runner as any).calculateSummary();

      expect(summary.passed).toBe(2);
      expect(summary.failed).toBe(2);
      expect(summary.memoryIssues).toBe(1);
      expect(summary.totalTests).toBe(10);
      expect(summary.totalDuration).toBeGreaterThan(0);
    });
  });
});
