/**
 * React-specific bundle monitoring utilities
 * Uses the framework-agnostic utilities from the bundle module
 */

import { logInfo } from "@guyromellemagayano/logger";

import {
  getBundleSize,
  getEnvironmentInfo,
  verifyTreeShaking,
} from "../bundle";

/**
 * Log bundle size information for React components
 */
export function logBundleSize(componentName: string): void {
  const env = getEnvironmentInfo();

  if (env.isDevelopment) {
    const bundleInfo = getBundleSize(componentName);
    logInfo(`📦 Bundle Info for React component ${componentName}:`, bundleInfo);
  }
}

/**
 * Log tree shaking verification results for React components
 */
export function logTreeShakingVerification(componentName: string): void {
  const env = getEnvironmentInfo();

  if (env.isDevelopment) {
    const report = verifyTreeShaking(componentName);
    logInfo(
      `🌳 Tree Shaking Report for React component ${componentName}:`,
      report
    );
  }
}

/**
 * Check if React component is tree-shakeable
 * Includes React-specific patterns
 */
export function isReactComponentTreeShakeable(componentName: string): boolean {
  const reactPatterns = [
    "React.memo",
    "React.forwardRef",
    "React.lazy",
    "React.Suspense",
    "export const",
    "export function",
  ];

  return reactPatterns.some((pattern) => componentName.includes(pattern));
}
