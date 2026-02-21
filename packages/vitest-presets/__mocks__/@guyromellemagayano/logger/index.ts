/**
 * @file packages/vitest-presets/__mocks__/@guyromellemagayano/logger/index.ts
 * @author Guy Romelle Magayano
 * @description Centralized Vitest logger mocks exposing default and named logging utilities.
 */

import { vi } from "vitest";

// ============================================================================
// CENTRALIZED LOGGER MOCKS
// ============================================================================

/** Mock logger with consistent behavior */
const mockLogger: {
  info: ReturnType<typeof vi.fn>;
  warn: ReturnType<typeof vi.fn>;
  error: ReturnType<typeof vi.fn>;
  debug: ReturnType<typeof vi.fn>;
  log: ReturnType<typeof vi.fn>;
} = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

/** Default export for logger */
export default mockLogger;

/** Named export for logger */
export const logger = mockLogger;

/** Named exports for individual log functions */
export const logInfo = mockLogger.info as (...args: unknown[]) => void;
export const logWarn = mockLogger.warn as (...args: unknown[]) => void;
export const logError = mockLogger.error as (...args: unknown[]) => void;
export const logDebug = mockLogger.debug as (...args: unknown[]) => void;
