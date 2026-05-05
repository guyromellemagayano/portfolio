/**
 * @file packages/vitest-presets/__mocks__/@guyromellemagayano/logger/index.ts
 * @author Guy Romelle Magayano
 * @description Centralized Vitest logger mocks exposing default and named logging utilities.
 */

import { type Mock, vi } from "vitest";

// ============================================================================
// CENTRALIZED LOGGER MOCKS
// ============================================================================

type LoggerMock = {
  addTransport: Mock<(...args: unknown[]) => void>;
  debug: Mock<(...args: unknown[]) => void>;
  error: Mock<(...args: unknown[]) => void>;
  info: Mock<(...args: unknown[]) => void>;
  log: Mock<(...args: unknown[]) => void>;
  removeTransport: Mock<(...args: unknown[]) => void>;
  setContext: Mock<(...args: unknown[]) => LoggerMock>;
  warn: Mock<(...args: unknown[]) => void>;
};

type SentryTransportMock = {
  isReady: Mock<() => boolean>;
  name: string;
  write: Mock<(...args: unknown[]) => Promise<void>>;
};

type SentryRuntimeOptionsMock = {
  dsn?: string;
  environment?: string;
  release?: string;
  tags?: Record<string, string>;
  tracesSampleRate?: number | string;
};

type SentryBaseRuntimeOptionsMock = {
  beforeSendLog: <TLog extends { attributes?: Record<string, unknown> }>(
    log: TLog
  ) => TLog & { attributes: Record<string, unknown> };
  dsn: string;
  enableLogs: true;
  initialScope: {
    tags: Record<string, string>;
  };
};

/** Mock logger with consistent behavior */
const mockLogger: LoggerMock = {
  info: vi.fn<(...args: unknown[]) => void>(),
  warn: vi.fn<(...args: unknown[]) => void>(),
  error: vi.fn<(...args: unknown[]) => void>(),
  debug: vi.fn<(...args: unknown[]) => void>(),
  log: vi.fn<(...args: unknown[]) => void>(),
  addTransport: vi.fn<(...args: unknown[]) => void>(),
  removeTransport: vi.fn<(...args: unknown[]) => void>(),
  setContext: vi.fn<(...args: unknown[]) => LoggerMock>(),
};

mockLogger.setContext.mockImplementation(() => mockLogger);

/** Default export for logger */
export default mockLogger;

/** Named export for logger */
export const logger = mockLogger;

/** Named exports for individual log functions */
export const logInfo = mockLogger.info as (...args: unknown[]) => void;
export const logWarn = mockLogger.warn as (...args: unknown[]) => void;
export const logError = mockLogger.error as (...args: unknown[]) => void;
export const logDebug = mockLogger.debug as (...args: unknown[]) => void;

export const createSentrySdkTransport: Mock<
  (_sentry: unknown, options?: { name?: string }) => SentryTransportMock
> = vi.fn((_sentry: unknown, options: { name?: string } = {}) => ({
  isReady: vi.fn<() => boolean>(() => true),
  name: options.name ?? "sentry-sdk",
  write: vi.fn<(...args: unknown[]) => Promise<void>>(async () => undefined),
}));

export const configureSentryLogger: Mock<
  (_sentry: unknown, options?: { logger?: LoggerMock }) => LoggerMock
> = vi.fn((_sentry: unknown, options: { logger?: typeof mockLogger } = {}) => {
  const logger = options.logger ?? mockLogger;
  logger.removeTransport("sentry-sdk");
  logger.addTransport(createSentrySdkTransport(_sentry));

  return logger;
});

export const getSentryBaseRuntimeOptions: Mock<
  (
    config?: SentryRuntimeOptionsMock
  ) => SentryBaseRuntimeOptionsMock | undefined
> = vi.fn((config: SentryRuntimeOptionsMock = {}) => {
  const dsn = config.dsn?.trim();
  const tags = config.tags ?? {};

  if (!dsn) {
    return undefined;
  }

  return {
    beforeSendLog: <TLog extends { attributes?: Record<string, unknown> }>(
      log: TLog
    ) => ({
      ...log,
      attributes: {
        ...tags,
        ...log.attributes,
      },
    }),
    dsn,
    enableLogs: true,
    initialScope: {
      tags,
    },
  };
});

export const getSentryReplayRuntimeOptions: Mock<
  () => {
    replaysOnErrorSampleRate: number;
    replaysSessionSampleRate: number;
  }
> = vi.fn(() => ({
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0.1,
}));
