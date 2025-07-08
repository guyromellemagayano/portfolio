#!/usr/bin/env node

import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

import { logError, logInfo } from "@guyromellemagayano/logger";

import {
  scaffoldComponent,
  validateComponentName,
} from "./libs/scaffold-component";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

const SRC_DIR = path.join(__dirname, "..", "src");

async function main(): Promise<void> {
  try {
    logInfo("🎯 React Component Scaffolder");
    logInfo("==============================");

    // Get component name
    const name = await ask("Enter component name (PascalCase): ");

    if (!name) {
      logError("❌ Component name is required");
      process.exit(1);
    }

    // Validate component name
    const validation = validateComponentName(name);
    if (!validation.isValid) {
      logError(`❌ Invalid component name: ${validation.error}`);
      process.exit(1);
    }

    // Check if component already exists
    const componentDir = path.join(SRC_DIR, name.toLowerCase());
    const fs = await import("fs");

    if (fs.existsSync(componentDir)) {
      const overwrite = await ask(
        `Component '${name}' already exists. Overwrite? (y/N): `
      );

      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        logInfo("❌ Scaffolding cancelled");
        process.exit(0);
      }
    }

    // Scaffold the component
    const result = await scaffoldComponent({ name, overwrite: true }, SRC_DIR);

    if (result.success) {
      logInfo("🎉 Component scaffolded successfully!");
      logInfo(`📁 Location: ${componentDir}`);
      logInfo(`📄 Files created: ${result.filesCreated.length}`);

      result.filesCreated.forEach((file) => {
        logInfo(`  ✅ ${path.relative(process.cwd(), file)}`);
      });
    } else {
      logError("❌ Scaffolding failed:");
      result.errors.forEach((error) => {
        logError(`  ❌ ${error}`);
      });
      process.exit(1);
    }
  } catch (error) {
    logError("❌ Unexpected error:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logError("❌ Fatal error:", error);
    process.exit(1);
  });
}
