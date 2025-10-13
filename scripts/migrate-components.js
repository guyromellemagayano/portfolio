#!/usr/bin/env node

/**
 * @fileoverview Component Migration Script
 * @description Migrates existing components to follow enterprise standards
 * @author Guy Romelle Magayano
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const COMPONENTS_DIR = join(__dirname, "../apps/web/src/components");
const IGNORE_DIRS = ["node_modules", ".git", "dist", "build"];

// Component classification templates
const COMPONENT_CLASSIFICATION_TEMPLATE = `// ============================================================================
// COMPONENT CLASSIFICATION
// - Type: {{TYPE}}
// - Testing: {{TESTING}}
// - Structure: {{STRUCTURE}}
// - Risk Tier: {{RISK_TIER}}
// - Data Source: {{DATA_SOURCE}}
// ============================================================================`;

const TEST_CLASSIFICATION_TEMPLATE = `// ============================================================================
// TEST CLASSIFICATION
// - Test Type: {{TEST_TYPE}}
// - Coverage: {{COVERAGE}}
// - Risk Tier: {{RISK_TIER}}
// - Component Type: {{COMPONENT_TYPE}}
// ============================================================================`;

// Component type detection
function detectComponentType(filePath, content) {
  const fileName = basename(filePath, ".tsx");
  const dirName = dirname(filePath).split("/").pop();

  // Check for sub-components
  if (filePath.includes("/_internal/")) {
    return "Sub-Component";
  }

  // Check for compound components (has sub-components)
  if (
    content.includes("Component.SubComponent") ||
    content.includes("_internal/") ||
    dirName.includes("Card") ||
    dirName.includes("Tabs") ||
    dirName.includes("Accordion")
  ) {
    return "Compound";
  }

  // Check for orchestrator components (imports multiple components)
  const importMatches = content.match(/import.*from.*components/g) || [];
  if (importMatches.length > 2) {
    return "Orchestrator";
  }

  // Check for utility components (simple wrappers)
  if (
    content.includes("Container") ||
    content.includes("Section") ||
    content.includes("Grid")
  ) {
    return "Utility";
  }

  // Default to presentational
  return "Presentational";
}

// Get component classification details
function getComponentClassification(componentType) {
  const classifications = {
    Compound: {
      type: "Compound",
      testing: "Unit + Integration tests (both required)",
      structure: "_internal/ folder with sub-components",
      riskTier: "Tier 1 (90%+ coverage, comprehensive edge cases)",
      dataSource: "Static data (no external data fetching)",
    },
    Orchestrator: {
      type: "Orchestrator",
      testing: "Unit tests only (integration happens at parent level)",
      structure: "Flat, imports other components",
      riskTier: "Tier 2 (80%+ coverage, key paths + edges)",
      dataSource: "Static data (no external data fetching)",
    },
    Presentational: {
      type: "Presentational",
      testing: "Unit tests only",
      structure: "Single file + tests + constants/Component.i18n.ts",
      riskTier: "Tier 3 (60%+ coverage, happy path + basic validation)",
      dataSource: "Static data (no external data fetching)",
    },
    Utility: {
      type: "Utility",
      testing: "Basic unit tests (60% coverage acceptable)",
      structure: "Single file",
      riskTier: "Tier 3 (60%+ coverage, happy path + basic validation)",
      dataSource: "Static data (no external data fetching)",
    },
    "Sub-Component": {
      type: "Sub-Component",
      testing: "Unit tests only",
      structure: "Internal sub-component",
      riskTier: "Tier 3 (60%+ coverage, happy path + basic validation)",
      dataSource: "Static data (no external data fetching)",
    },
  };

  return classifications[componentType] || classifications["Presentational"];
}

// Get test classification details
function getTestClassification(componentType) {
  const classifications = {
    Compound: {
      testType: "Unit + Integration",
      coverage: "Tier 1 (90%+)",
      riskTier: "Critical",
      componentType: "Compound",
    },
    Orchestrator: {
      testType: "Unit",
      coverage: "Tier 2 (80%+)",
      riskTier: "Core",
      componentType: "Orchestrator",
    },
    Presentational: {
      testType: "Unit",
      coverage: "Tier 3 (60%+)",
      riskTier: "Presentational",
      componentType: "Presentational",
    },
    Utility: {
      testType: "Unit",
      coverage: "Tier 3 (60%+)",
      riskTier: "Presentational",
      componentType: "Utility",
    },
  };

  return classifications[componentType] || classifications["Presentational"];
}

// Add component classification comment
function addComponentClassification(content, componentType) {
  const classification = getComponentClassification(componentType);

  const classificationComment = COMPONENT_CLASSIFICATION_TEMPLATE.replace(
    "{{TYPE}}",
    classification.type
  )
    .replace("{{TESTING}}", classification.testing)
    .replace("{{STRUCTURE}}", classification.structure)
    .replace("{{RISK_TIER}}", classification.riskTier)
    .replace("{{DATA_SOURCE}}", classification.dataSource);

  // Check if classification already exists
  if (content.includes("COMPONENT CLASSIFICATION")) {
    return content;
  }

  // Add at the top of the file
  return `${classificationComment}\n\n${content}`;
}

// Add test classification comment
function addTestClassification(content, componentType) {
  const classification = getTestClassification(componentType);

  const classificationComment = TEST_CLASSIFICATION_TEMPLATE.replace(
    "{{TEST_TYPE}}",
    classification.testType
  )
    .replace("{{COVERAGE}}", classification.coverage)
    .replace("{{RISK_TIER}}", classification.riskTier)
    .replace("{{COMPONENT_TYPE}}", classification.componentType);

  // Check if classification already exists
  if (content.includes("TEST CLASSIFICATION")) {
    return content;
  }

  // Add at the top of the file
  return `${classificationComment}\n\n${content}`;
}

// Add isMemoized prop to component interfaces
function addMemoizationProp(content) {
  // Check if isMemoized prop already exists
  if (content.includes("isMemoized?: boolean")) {
    return content;
  }

  // Find component props interface
  const propsInterfaceRegex = /export interface (\w+Props)[^{]*{([^}]*)}/;
  const match = content.match(propsInterfaceRegex);

  if (match) {
    const [fullMatch, interfaceName, props] = match;
    const newProps =
      props.trim() +
      "\n  /** Whether to enable memoization */\n  isMemoized?: boolean;";
    const newInterface = fullMatch.replace(props, newProps);
    return content.replace(fullMatch, newInterface);
  }

  return content;
}

// Add test cleanup to test files
function addTestCleanup(content) {
  // Check if cleanup already exists
  if (content.includes("afterEach") && content.includes("cleanup")) {
    return content;
  }

  // Add cleanup import if not present
  if (!content.includes("import { cleanup")) {
    content = content.replace(
      /import { render, screen } from "@testing-library\/react";/,
      'import { cleanup, render, screen } from "@testing-library/react";'
    );
  }

  // Add afterEach import if not present
  if (!content.includes("import { afterEach")) {
    content = content.replace(
      /import { describe, expect, it, vi } from "vitest";/,
      'import { afterEach, describe, expect, it, vi } from "vitest";'
    );
  }

  // Add cleanup hook
  const describeRegex = /describe\("([^"]+)", \(\) => \{/;
  const match = content.match(describeRegex);

  if (match) {
    const [fullMatch, testName] = match;
    const cleanupHook = `  afterEach(() => {\n    cleanup();\n    vi.clearAllMocks();\n  });\n\n`;
    const newDescribe = fullMatch + "\n" + cleanupHook;
    return content.replace(fullMatch, newDescribe);
  }

  return content;
}

// Process a single file
function processFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    let newContent = content;
    let modified = false;

    // Process component files
    if (filePath.endsWith(".tsx") && !filePath.includes("__tests__")) {
      const componentType = detectComponentType(filePath, content);

      // Add component classification
      const contentWithClassification = addComponentClassification(
        newContent,
        componentType
      );
      if (contentWithClassification !== newContent) {
        newContent = contentWithClassification;
        modified = true;
      }

      // Add memoization prop
      const contentWithMemoization = addMemoizationProp(newContent);
      if (contentWithMemoization !== newContent) {
        newContent = contentWithMemoization;
        modified = true;
      }
    }

    // Process test files
    if (filePath.includes("__tests__") && filePath.endsWith(".test.tsx")) {
      const componentType = detectComponentType(filePath, content);

      // Add test classification
      const contentWithClassification = addTestClassification(
        newContent,
        componentType
      );
      if (contentWithClassification !== newContent) {
        newContent = contentWithClassification;
        modified = true;
      }

      // Add test cleanup
      const contentWithCleanup = addTestCleanup(newContent);
      if (contentWithCleanup !== newContent) {
        newContent = contentWithCleanup;
        modified = true;
      }
    }

    // Write file if modified
    if (modified) {
      writeFileSync(filePath, newContent, "utf8");
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Recursively process directory
function processDirectory(dirPath) {
  let processedCount = 0;

  try {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const itemPath = join(dirPath, item);
      const stat = statSync(itemPath);

      if (stat.isDirectory()) {
        if (!IGNORE_DIRS.includes(item)) {
          processedCount += processDirectory(itemPath);
        }
      } else if (item.endsWith(".tsx")) {
        if (processFile(itemPath)) {
          processedCount++;
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }

  return processedCount;
}

// Main execution
function main() {
  console.log("🚀 Starting component migration...\n");

  const processedCount = processDirectory(COMPONENTS_DIR);

  console.log(`\n✨ Migration complete! Updated ${processedCount} files.`);
  console.log("\n📋 Next steps:");
  console.log("1. Run tests to ensure everything still works");
  console.log("2. Run ESLint to check for any remaining issues");
  console.log("3. Run Prettier to format the updated files");
  console.log("4. Review the changes and commit");
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { detectComponentType, processDirectory, processFile };
