const DEFAULT_REPLAYS_ON_ERROR_SAMPLE_RATE = 1.0;
const DEFAULT_REPLAYS_SESSION_SAMPLE_RATE = 0.1;
const DEFAULT_TRACES_SAMPLE_RATE = 1.0;

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

export function getSentryBaseRuntimeOptions() {
  const dsn = readRuntimeValue(import.meta.env.PUBLIC_SENTRY_DSN);

  if (!dsn) {
    return undefined;
  }

  return {
    dsn,
    enableLogs: true,
    environment: readRuntimeValue(import.meta.env.PUBLIC_VERCEL_ENV),
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
