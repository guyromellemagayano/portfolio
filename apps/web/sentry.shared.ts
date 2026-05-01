const DEFAULT_REPLAYS_ON_ERROR_SAMPLE_RATE = 1.0;
const DEFAULT_REPLAYS_SESSION_SAMPLE_RATE = 0.1;
const DEFAULT_TRACES_SAMPLE_RATE = 1.0;
const SENTRY_APP_TAGS = {
  "app.framework": "astro",
  "app.name": "portfolio-web",
  "hosting.platform": "vercel",
};

export const SENTRY_CONSOLE_LOG_LEVELS = ["warn", "error"] as const;

function readRuntimeValue(value: string | undefined) {
  return value?.trim() || undefined;
}

function resolveSampleRate(value: string | undefined, fallback: number) {
  const rawValue = readRuntimeValue(value);

  if (!rawValue) {
    return fallback;
  }

  const sampleRate = Number(rawValue);

  return Number.isFinite(sampleRate) && sampleRate >= 0 && sampleRate <= 1
    ? sampleRate
    : fallback;
}

function enrichSentryLog<TLog extends { attributes?: Record<string, unknown> }>(
  log: TLog
) {
  return {
    ...log,
    attributes: {
      ...SENTRY_APP_TAGS,
      ...log.attributes,
    },
  };
}

export function getSentryBaseRuntimeOptions() {
  const dsn = readRuntimeValue(import.meta.env.PUBLIC_SENTRY_DSN);

  if (!dsn) {
    return undefined;
  }

  return {
    beforeSendLog: enrichSentryLog,
    dsn,
    enableLogs: true,
    environment: readRuntimeValue(import.meta.env.PUBLIC_VERCEL_ENV),
    initialScope: {
      tags: SENTRY_APP_TAGS,
    },
    release: readRuntimeValue(import.meta.env.PUBLIC_SENTRY_RELEASE),
    sendDefaultPii: true,
    tracesSampleRate: resolveSampleRate(
      import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
      DEFAULT_TRACES_SAMPLE_RATE
    ),
  };
}

export function getSentryReplayRuntimeOptions() {
  return {
    replaysOnErrorSampleRate: resolveSampleRate(
      import.meta.env.PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE,
      DEFAULT_REPLAYS_ON_ERROR_SAMPLE_RATE
    ),
    replaysSessionSampleRate: resolveSampleRate(
      import.meta.env.PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      DEFAULT_REPLAYS_SESSION_SAMPLE_RATE
    ),
  };
}
