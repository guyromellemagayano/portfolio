import { logger as defaultLogger } from "./logger";
import {
  type ILogger,
  type LogContext,
  type LogEntry,
  LogLevel,
  type Transport,
} from "./types";
import { getLogLevelName, sanitizeData, shouldLog } from "./utils";

const DEFAULT_REPLAYS_ON_ERROR_SAMPLE_RATE = 1.0;
const DEFAULT_REPLAYS_SESSION_SAMPLE_RATE = 0.1;
const DEFAULT_SENTRY_TRANSPORT_NAME = "sentry-sdk";
const DEFAULT_TRACES_SAMPLE_RATE = 1.0;

export type SentryRuntimeConfig = {
  readonly dsn?: string;
  readonly environment?: string;
  readonly release?: string;
  readonly sendDefaultPii?: boolean;
  readonly tags?: Record<string, string>;
  readonly tracesSampleRate?: number | string;
};

type SentryLog = {
  attributes?: Record<string, unknown>;
};

type SentryLogMethodName =
  | "debug"
  | "error"
  | "fatal"
  | "info"
  | "trace"
  | "warn";

type SentryLogMethod = (
  message: string,
  attributes?: Record<string, unknown>
) => void;

export type SentrySdkBridge = {
  readonly captureException?: (
    exception: unknown,
    captureContext?: Record<string, unknown>
  ) => unknown;
  readonly captureMessage?: (
    message: string,
    captureContext?: Record<string, unknown>
  ) => unknown;
  readonly logger?: Partial<Record<SentryLogMethodName, SentryLogMethod>>;
};

export type SentryReplayRuntimeOptions = {
  readonly replaysOnErrorSampleRate?: number | string;
  readonly replaysSessionSampleRate?: number | string;
};

export type SentrySdkTransportOptions = {
  readonly captureExceptions?: boolean;
  readonly captureLogs?: boolean;
  readonly minLevel?: LogLevel;
  readonly name?: string;
  readonly tags?: Record<string, string>;
};

export type ConfigureSentryLoggerOptions = SentrySdkTransportOptions & {
  readonly context?: Partial<LogContext>;
  readonly logger?: ILogger;
};

function readRuntimeValue(value: string | undefined) {
  return value?.trim() || undefined;
}

function resolveSampleRate(
  value: number | string | undefined,
  fallback: number
) {
  const rawValue =
    typeof value === "number" ? String(value) : readRuntimeValue(value);

  if (!rawValue) {
    return fallback;
  }

  const sampleRate = Number(rawValue);

  return Number.isFinite(sampleRate) && sampleRate >= 0 && sampleRate <= 1
    ? sampleRate
    : fallback;
}

function enrichSentryLog<TLog extends SentryLog>(
  log: TLog,
  tags: Record<string, string>
) {
  return {
    ...log,
    attributes: {
      ...tags,
      ...log.attributes,
    },
  };
}

export function getSentryBaseRuntimeOptions(config: SentryRuntimeConfig) {
  const dsn = readRuntimeValue(config.dsn);
  const tags = config.tags ?? {};

  if (!dsn) {
    return undefined;
  }

  return {
    beforeSendLog: <TLog extends SentryLog>(log: TLog) =>
      enrichSentryLog(log, tags),
    dsn,
    enableLogs: true,
    environment: readRuntimeValue(config.environment),
    initialScope: {
      tags,
    },
    release: readRuntimeValue(config.release),
    sendDefaultPii: config.sendDefaultPii ?? true,
    tracesSampleRate: resolveSampleRate(
      config.tracesSampleRate,
      DEFAULT_TRACES_SAMPLE_RATE
    ),
  };
}

export function getSentryReplayRuntimeOptions(
  options: SentryReplayRuntimeOptions = {}
) {
  return {
    replaysOnErrorSampleRate: resolveSampleRate(
      options.replaysOnErrorSampleRate,
      DEFAULT_REPLAYS_ON_ERROR_SAMPLE_RATE
    ),
    replaysSessionSampleRate: resolveSampleRate(
      options.replaysSessionSampleRate,
      DEFAULT_REPLAYS_SESSION_SAMPLE_RATE
    ),
  };
}

export function createSentrySdkTransport(
  sentry: SentrySdkBridge,
  options: SentrySdkTransportOptions = {}
): Transport {
  const captureExceptions = options.captureExceptions ?? true;
  const captureLogs = options.captureLogs ?? true;
  const minLevel = options.minLevel ?? LogLevel.WARN;
  const name = options.name ?? DEFAULT_SENTRY_TRANSPORT_NAME;
  const tags = options.tags ?? {};

  return {
    name,
    isReady: () =>
      Boolean(
        captureLogs &&
        sentry.logger &&
        Object.values(sentry.logger).some(
          (method) => typeof method === "function"
        )
      ) ||
      Boolean(captureExceptions && sentry.captureException) ||
      Boolean(sentry.captureMessage),
    write: async (entry) => {
      if (!shouldLog(minLevel, entry.level)) {
        return;
      }

      const attributes = createSentryAttributes(entry, tags);
      const captureContext = {
        extra: attributes,
        level: mapLogLevelToSentrySeverity(entry.level),
        tags,
      };

      if (captureLogs) {
        captureSentryLog(sentry, entry, attributes, captureContext);
      }

      if (captureExceptions && entry.error && sentry.captureException) {
        sentry.captureException(entry.error, captureContext);
      }
    },
  };
}

export function configureSentryLogger(
  sentry: SentrySdkBridge,
  options: ConfigureSentryLoggerOptions = {}
) {
  const logger = options.logger ?? defaultLogger;
  const name = options.name ?? DEFAULT_SENTRY_TRANSPORT_NAME;

  logger.removeTransport(name);
  logger.addTransport(createSentrySdkTransport(sentry, options));

  if (options.context) {
    logger.setContext(options.context);
  }

  return logger;
}

function captureSentryLog(
  sentry: SentrySdkBridge,
  entry: LogEntry,
  attributes: Record<string, unknown>,
  captureContext: Record<string, unknown>
) {
  const methodName = mapLogLevelToSentryLoggerMethod(entry.level);
  const logMethod = sentry.logger?.[methodName];

  if (typeof logMethod === "function") {
    logMethod(entry.message, attributes);

    return;
  }

  if (!entry.error && sentry.captureMessage) {
    sentry.captureMessage(entry.message, captureContext);
  }
}

function createSentryAttributes(entry: LogEntry, tags: Record<string, string>) {
  const data = toRecord(entry.data);
  const metadata = toRecord(entry.context?.metadata);
  const sanitizedData = toRecord(sanitizeData({ ...data, ...metadata })) ?? {};

  return compactRecord({
    ...tags,
    ...sanitizedData,
    "log.component": entry.context?.component,
    "log.environment": entry.environment,
    "log.id": entry.id,
    "log.level": getLogLevelName(entry.level).toLowerCase(),
    "log.operation": entry.context?.operation,
    "log.request_id": entry.context?.requestId,
    "log.session_id": entry.context?.sessionId,
    "log.source.column": entry.source?.column,
    "log.source.file": entry.source?.file,
    "log.source.function": entry.source?.function,
    "log.source.line": entry.source?.line,
    "log.user_id": entry.context?.userId,
    "error.message": entry.error?.message,
    "error.name": entry.error?.name,
    "error.stack": entry.error?.stack,
  });
}

function compactRecord(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record).filter(([, value]) => value !== undefined)
  );
}

function toRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}

function mapLogLevelToSentryLoggerMethod(level: LogLevel): SentryLogMethodName {
  switch (level) {
    case LogLevel.ERROR:
      return "error";
    case LogLevel.WARN:
      return "warn";
    case LogLevel.DEBUG:
    case LogLevel.VERBOSE:
    case LogLevel.SILLY:
      return "debug";
    case LogLevel.HTTP:
    case LogLevel.INFO:
    default:
      return "info";
  }
}

function mapLogLevelToSentrySeverity(level: LogLevel) {
  switch (level) {
    case LogLevel.ERROR:
      return "error";
    case LogLevel.WARN:
      return "warning";
    case LogLevel.DEBUG:
    case LogLevel.VERBOSE:
    case LogLevel.SILLY:
      return "debug";
    case LogLevel.HTTP:
    case LogLevel.INFO:
    default:
      return "info";
  }
}
