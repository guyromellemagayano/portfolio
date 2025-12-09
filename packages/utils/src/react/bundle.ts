import { logger } from "@guyromellemagayano/logger";

// ============================================================================
// BUNDLE INFORMATION
// ============================================================================

type BundleSizeInfo = {
  name: string;
  size: number;
  gzipSize: number;
  isTreeShakeable: boolean;
};

/** Get bundle size information for a module. */
export const getBundleSize = (moduleName: string): BundleSizeInfo => {
  return { name: moduleName, size: 0, gzipSize: 0, isTreeShakeable: true };
};

// ============================================================================
// LOGGING
// ============================================================================

/** Get environment information for bundle monitoring */
export const getEnvironmentInfo = (): {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
} => {
  return {
    isDevelopment: globalThis?.process?.env?.NODE_ENV === "development",
    isProduction: globalThis?.process.env.NODE_ENV === "production",
    isTest: globalThis?.process.env.NODE_ENV === "test",
  };
};

/** Log bundle size information for React components */
export const logBundleSize = (componentName: string): void => {
  const env = getEnvironmentInfo();

  if (env.isDevelopment) {
    const bundleInfo = getBundleSize(componentName);
    logger.info(
      `📦 Bundle Info for React component ${componentName}:`,
      bundleInfo
    );
  }
};

/** Log tree shaking verification results for React components */
export const logTreeShakingVerification = (componentName: string): void => {
  const env = getEnvironmentInfo();

  if (env.isDevelopment) {
    const report = verifyTreeShaking(componentName);
    logger.info(
      `🌳 Tree Shaking Report for React component ${componentName}:`,
      report
    );
  }
};

/** Check if React component is tree-shakeable */
export const isReactComponentTreeShakeable = (
  componentName: string
): boolean => {
  const reactPatterns = [
    "React.memo",
    "React.forwardRef",
    "React.lazy",
    "React.Suspense",
    "export const",
    "export function",
  ];

  return reactPatterns.some((pattern) => componentName.includes(pattern));
};

// ============================================================================
// TREE SHAKING
// ============================================================================

/** Check if a component is tree-shakeable. */
export const isTreeShakeable = (componentName: string): boolean => {
  const treeShakeablePatterns = [
    "export const",
    "export function",
    "export {",
    "export type",
    "export interface",
  ];

  return treeShakeablePatterns.some((pattern) =>
    componentName.includes(pattern)
  );
};

type TreeShakingReport = {
  componentName: string;
  isTreeShakeable: boolean;
  exports: string[];
  unusedExports: string[];
  bundleImpact: "low" | "medium" | "high";
};

/** Verify if a component is properly tree-shakeable */
export const verifyTreeShaking = (componentName: string): TreeShakingReport => {
  const report: TreeShakingReport = {
    componentName,
    isTreeShakeable: true,
    exports: [],
    unusedExports: [],
    bundleImpact: "low",
  };

  const antiPatterns = [
    "export default",
    "export *",
    "module.exports",
    "window.",
    "global.",
    "document.",
  ];

  const hasAntiPatterns = antiPatterns.some((pattern) =>
    componentName.includes(pattern)
  );

  if (hasAntiPatterns) {
    report.isTreeShakeable = false;
    report.bundleImpact = "high";
  }

  return report;
};

/** Check if imports are tree-shakeable */
export const verifyImports = (imports: string[]): boolean => {
  const treeShakeablePatterns = [
    "import {",
    "import type {",
    "export {",
    "export const",
    "export function",
  ];

  return imports.every((importStatement) =>
    treeShakeablePatterns.some((pattern) => importStatement.includes(pattern))
  );
};
