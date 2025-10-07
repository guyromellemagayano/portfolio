import { vi } from "vitest";

// ============================================================================
// CENTRALIZED LOGGER MOCKS
// ============================================================================

/**
 * Mock logger with consistent behavior
 */
const mockLogger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

/**
 * Default export for logger
 */
export default mockLogger;

/**
 * Named export for logger
 */
export const logger = mockLogger;
