#!/usr/bin/env node

import { type ChildProcess, spawn } from "child_process";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { performance } from "perf_hooks";

const COMPONENT_DIR = "src";
const MAX_MEMORY_MB = 1024; // 1GB memory limit per test
const TIMEOUT_MS = 30000; // 30 second timeout per component

interface TestResult {
  component: string;
  success: boolean;
  duration: number;
  error?: string;
  memoryIssue: boolean;
  testCount?: number;
}

interface TestSummary {
  passed: number;
  failed: number;
  memoryIssues: number;
  totalTests: number;
  totalDuration: number;
}

/**
 * Memory-efficient component test runner
 * Runs each component test individually to prevent memory overflow
 */
class ComponentTestRunner {
  private results: TestResult[] = [];
  private readonly totalStartTime: number;

  constructor() {
    this.totalStartTime = performance.now();
  }

  async findComponents(): Promise<string[]> {
    try {
      const entries = readdirSync(COMPONENT_DIR, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => {
          const testFile = join(COMPONENT_DIR, name, "index.test.tsx");
          return existsSync(testFile);
        });
    } catch (error) {
      console.error("❌ Failed to find components:", (error as Error).message);
      return [];
    }
  }

  async runComponentTest(componentName: string): Promise<TestResult> {
    const startTime = performance.now();
    const testPath = `${COMPONENT_DIR}/${componentName}`;

    console.log(`\n🧪 Testing ${componentName}...`);

    return new Promise<TestResult>((resolve) => {
      const childProcess: ChildProcess = spawn(
        "npx",
        [
          "vitest",
          "run",
          "--config",
          "vitest.light.config.ts",
          "--reporter=verbose",
          testPath,
        ],
        {
          stdio: ["inherit", "pipe", "pipe"],
          env: {
            ...process.env,
            NODE_OPTIONS: `--max-old-space-size=${MAX_MEMORY_MB}`,
          },
        }
      );

      let stdout = "";
      let stderr = "";

      childProcess.stdout?.on("data", (data: Buffer) => {
        stdout += data.toString();
      });

      childProcess.stderr?.on("data", (data: Buffer) => {
        stderr += data.toString();
      });

      const timeout = setTimeout(() => {
        childProcess.kill("SIGKILL");
        resolve({
          component: componentName,
          success: false,
          error: "Test timeout",
          duration: performance.now() - startTime,
          memoryIssue: true,
        });
      }, TIMEOUT_MS);

      childProcess.on("close", (code: number | null) => {
        clearTimeout(timeout);
        const duration = performance.now() - startTime;
        const success = code === 0;

        const result: TestResult = {
          component: componentName,
          success,
          duration,
          error: !success ? stderr || undefined : undefined,
          memoryIssue: stderr.includes("heap") || stderr.includes("memory"),
          testCount: this.extractTestCount(stdout),
        };

        if (success) {
          console.log(`✅ ${componentName} passed (${Math.round(duration)}ms)`);
        } else {
          console.log(`❌ ${componentName} failed (${Math.round(duration)}ms)`);
          if (result.memoryIssue) {
            console.log(`💾 Memory issue detected in ${componentName}`);
          }
        }

        resolve(result);
      });

      childProcess.on("error", (error: Error) => {
        clearTimeout(timeout);
        resolve({
          component: componentName,
          success: false,
          error: error.message,
          duration: performance.now() - startTime,
          memoryIssue: false,
        });
      });
    });
  }

  private extractTestCount(stdout: string): number {
    const match = stdout.match(/(\d+) passed/);
    return match && match[1] ? parseInt(match[1], 10) : 0;
  }

  async runAll(): Promise<boolean> {
    console.log("🚀 Starting memory-efficient component testing...\n");

    const components = await this.findComponents();

    if (components.length === 0) {
      console.log("❌ No components found with test files");
      return false;
    }

    console.log(
      `📋 Found ${components.length} components: ${components.join(", ")}\n`
    );

    // Run each component test individually
    for (const component of components) {
      const result = await this.runComponentTest(component);
      this.results.push(result);

      // Force garbage collection between tests
      if (global.gc) {
        global.gc();
      }

      // Small delay to allow memory cleanup
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    }

    this.printSummary();
    return this.results.every((r) => r.success);
  }

  private calculateSummary(): TestSummary {
    const totalDuration = performance.now() - this.totalStartTime;
    const passed = this.results.filter((r) => r.success).length;
    const failed = this.results.filter((r) => !r.success).length;
    const memoryIssues = this.results.filter((r) => r.memoryIssue).length;
    const totalTests = this.results.reduce(
      (sum, r) => sum + (r.testCount || 0),
      0
    );

    return {
      passed,
      failed,
      memoryIssues,
      totalTests,
      totalDuration,
    };
  }

  private printSummary(): void {
    const summary = this.calculateSummary();

    console.log("\n" + "=".repeat(60));
    console.log("📊 TEST SUMMARY");
    console.log("=".repeat(60));
    console.log(
      `✅ Passed: ${summary.passed}/${this.results.length} components`
    );
    console.log(
      `❌ Failed: ${summary.failed}/${this.results.length} components`
    );
    console.log(`💾 Memory Issues: ${summary.memoryIssues} components`);
    console.log(`🧪 Total Tests: ${summary.totalTests}`);
    console.log(`⏱️  Total Duration: ${Math.round(summary.totalDuration)}ms`);

    if (summary.failed > 0) {
      console.log("\n❌ Failed Components:");
      this.results
        .filter((r) => !r.success)
        .forEach((r) => {
          console.log(`  • ${r.component}: ${r.error || "Unknown error"}`);
        });
    }

    if (summary.memoryIssues > 0) {
      console.log("\n💾 Components with Memory Issues:");
      this.results
        .filter((r) => r.memoryIssue)
        .forEach((r) => {
          console.log(`  • ${r.component}`);
        });
      console.log("\n💡 Consider optimizing these components for memory usage");
    }

    console.log("=".repeat(60));
  }
}

// Run the tests
async function main(): Promise<void> {
  const runner = new ComponentTestRunner();

  try {
    const success = await runner.runAll();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error("💥 Test runner crashed:", (error as Error).message);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
