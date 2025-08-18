import { useId } from "react";

import { logInfo } from "@guyromellemagayano/logger";

/**
 * Attempts to extract component name from the call stack.
 * Looks for the actual exported component name, not displayName.
 * Falls back to "Component" if unable to detect.
 */
function getComponentNameFromStack(): string {
  try {
    // Get the call stack
    const stack = new Error().stack;
    if (!stack) return "Component";

    // Split stack into lines and find the component call
    const lines = stack.split("\n");

    // Look for the component function call (usually 3-4 levels up)
    for (let i = 3; i < Math.min(lines.length, 8); i++) {
      const line = lines[i];

      // Skip if line is undefined
      if (!line) continue;

      // Look for the actual component function name (export const ComponentName).
      // This will be the function name from the export const declaration.
      const reactComponentMatch = line.match(/at\s+(\w+)\s+\(/);
      if (reactComponentMatch && reactComponentMatch[1]) {
        const functionName = reactComponentMatch[1];

        // Filter out common non-component function names
        const nonComponentNames = [
          "useComponentId",
          "render",
          "React",
          "forwardRef",
          "Component",
          "Object",
          "Function",
          "anonymous",
          "default",
        ];

        if (!nonComponentNames.includes(functionName)) {
          return functionName;
        }
      }
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    // Silently fall back to default
  }

  return "Component";
}

interface UseComponentIdOptions {
  internalId?: string;
  debugMode?: boolean;
}
interface UseComponentIdReturn {
  id: string;
  isDebugMode: boolean;
}

/**
 * Shared hook for component ID generation and debug logging.
 * Automatically detects component name from calling context.
 */
export function useComponentId({
  internalId,
  debugMode = false,
}: UseComponentIdOptions = {}): UseComponentIdReturn {
  // Always call hooks at the top level
  const generatedId = useId();
  const id = internalId || generatedId;

  // Auto-detect component name from export const declaration
  const detectedComponentName = getComponentNameFromStack();

  // Cross-environment safety for debug logging
  const isDebugMode =
    debugMode && globalThis?.process?.env?.NODE_ENV === "development";

  // Internal debug logging
  if (isDebugMode) {
    logInfo(`${detectedComponentName} rendered with ID: ${id}`);
  }

  return {
    id,
    isDebugMode,
  };
}
